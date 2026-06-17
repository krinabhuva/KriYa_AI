from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import List, Optional

from app.database import get_db
from app import models, security
from app.config import get_settings
import anthropic

router = APIRouter(prefix="/api/ai", tags=["ai"])


class ChatMessage(BaseModel):
    role: str  # user or assistant
    content: str


class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = []


@router.post("/chat")
async def chat_ai(
    request_data: ChatRequest,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db)
):
    """Chat with the AI business assistant using Claude, receiving real-time business context."""
    settings = get_settings()
    if not settings.anthropic_api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Anthropic API key is not configured on the server."
        )

    # 1. Total inventory details
    total_items = db.query(models.InventoryItem).filter(models.InventoryItem.is_active == True).count()
    low_stock = db.query(models.InventoryItem).filter(
        (models.InventoryItem.quantity <= models.InventoryItem.reorder_level) & (models.InventoryItem.is_active == True)
    ).count()
    total_value = db.query(
        func.sum(models.InventoryItem.quantity * models.InventoryItem.cost)
    ).filter(models.InventoryItem.is_active == True).scalar() or 0.0

    # 2. Sales totals last 30 days
    t30 = datetime.utcnow() - timedelta(days=30)
    sales_by_category = db.query(
        models.InventoryItem.category,
        func.sum(models.SalesRecord.revenue)
    ).join(
        models.SalesRecord, models.InventoryItem.sku == models.SalesRecord.product_sku
    ).filter(
        models.SalesRecord.date >= t30
    ).group_by(models.InventoryItem.category).all()

    sales_summary_parts = []
    for cat, rev in sales_by_category:
        sales_summary_parts.append(f"{cat}: ${rev:,.0f}")
    sales_summary = ", ".join(sales_summary_parts) if sales_summary_parts else "No sales in the last 30 days"

    # 3. Model predictions stats
    active_predictions = db.query(models.Prediction).filter(models.Prediction.status == "active").all()
    model_count = len(active_predictions)
    avg_accuracy = sum(p.accuracy for p in active_predictions) / model_count if model_count > 0 else 0.85

    # System prompt templates
    system_prompt = (
        "You are KriYa AI's business intelligence assistant. You have access to real-time business data:\n"
        f"Inventory: {total_items} items, {low_stock} items below reorder level, total value ${total_value:,.0f}\n"
        f"Sales (last 30 days): {sales_summary}\n"
        f"Active ML models: {model_count} with average {avg_accuracy:.1%} accuracy\n\n"
        "Answer the user's business questions concisely. When relevant, suggest actionable insights.\n"
        "Always cite specific numbers from the data provided."
    )

    # Format history for Anthropic message schema
    messages_payload = []
    for h in request_data.history:
        messages_payload.append({"role": h.role, "content": h.content})
    messages_payload.append({"role": "user", "content": request_data.message})

    async def event_generator():
        client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)
        try:
            async with client.messages.stream(
                model="claude-3-haiku-20240307",
                max_tokens=1024,
                system=system_prompt,
                messages=messages_payload
            ) as stream:
                async for event in stream:
                    if event.type == "content_block_delta":
                        yield f"data: {event.delta.text}\n\n"
        except Exception as e:
            yield f"data: Error: {str(e)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
