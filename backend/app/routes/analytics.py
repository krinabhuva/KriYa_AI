from fastapi import APIRouter, HTTPException, Depends, status, Query
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional

from app.database import get_db
from app import models, schemas, security

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/reports", response_model=list[schemas.AnalyticsResponse])
async def get_analytics_reports(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    data_type: Optional[str] = None,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get all analytics reports"""
    query = db.query(models.Analytics)

    if data_type:
        query = query.filter(models.Analytics.data_type == data_type)

    reports = query.offset(skip).limit(limit).all()
    return reports


@router.get("/reports/{report_id}", response_model=schemas.AnalyticsResponse)
async def get_analytics_report(
    report_id: int,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get a specific analytics report"""
    report = db.query(models.Analytics).filter(models.Analytics.id == report_id).first()

    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analytics report not found",
        )

    return report


@router.post("/reports", response_model=schemas.AnalyticsResponse)
async def create_analytics_report(
    report_create: schemas.AnalyticsCreate,
    current_user: models.User = Depends(security.get_current_analyst),
    db: Session = Depends(get_db),
):
    """Create a new analytics report"""
    report = models.Analytics(
        name=report_create.name,
        description=report_create.description,
        data_type=report_create.data_type,
        metrics=report_create.metrics,
        filters_applied=report_create.filters_applied or {},
        period=report_create.period,
        start_date=report_create.start_date,
        end_date=report_create.end_date,
        created_by=current_user.id,
    )

    db.add(report)
    db.commit()
    db.refresh(report)
    return report


@router.put("/reports/{report_id}", response_model=schemas.AnalyticsResponse)
async def update_analytics_report(
    report_id: int,
    report_update: schemas.AnalyticsUpdate,
    current_user: models.User = Depends(security.get_current_analyst),
    db: Session = Depends(get_db),
):
    """Update an analytics report"""
    report = db.query(models.Analytics).filter(models.Analytics.id == report_id).first()

    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analytics report not found",
        )

    # Update fields if provided
    update_data = report_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(report, field, value)

    db.add(report)
    db.commit()
    db.refresh(report)
    return report


@router.delete("/reports/{report_id}")
async def delete_analytics_report(
    report_id: int,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Delete an analytics report"""
    report = db.query(models.Analytics).filter(models.Analytics.id == report_id).first()

    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analytics report not found",
        )

    db.delete(report)
    db.commit()
    return {"success": True, "message": "Report deleted successfully"}


@router.get("/dashboard/summary")
async def get_dashboard_summary(
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get dashboard summary with key metrics"""
    # Get inventory stats
    total_items = db.query(models.InventoryItem).filter(
        models.InventoryItem.is_active == True
    ).count()
    low_stock_items = db.query(models.InventoryItem).filter(
        (models.InventoryItem.quantity <= models.InventoryItem.reorder_level)
        & (models.InventoryItem.is_active == True)
    ).count()

    # Get prediction stats
    active_models = db.query(models.Prediction).filter(
        models.Prediction.status == "active"
    ).count()

    # Get user stats
    total_users = db.query(models.User).count()

    return {
        "inventory": {
            "total_items": total_items,
            "low_stock_items": low_stock_items,
        },
        "predictions": {
            "active_models": active_models,
        },
        "users": {
            "total": total_users,
        },
        "timestamp": datetime.utcnow().isoformat(),
    }


@router.get("/inventory/by-category")
async def get_inventory_by_category(
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get inventory statistics by category"""
    from sqlalchemy import func

    results = (
        db.query(
            models.InventoryItem.category,
            func.count(models.InventoryItem.id).label("count"),
            func.sum(models.InventoryItem.quantity).label("total_quantity"),
        )
        .filter(models.InventoryItem.is_active == True)
        .group_by(models.InventoryItem.category)
        .all()
    )

    return [
        {"category": r[0], "count": r[1], "total_quantity": r[2]} for r in results
    ]


@router.get("/inventory/valuation")
async def get_inventory_valuation(
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get total inventory valuation"""
    from sqlalchemy import func

    total_value = db.query(
        func.sum(models.InventoryItem.quantity * models.InventoryItem.cost)
    ).filter(models.InventoryItem.is_active == True).scalar()

    total_retail_value = db.query(
        func.sum(models.InventoryItem.quantity * models.InventoryItem.price)
    ).filter(models.InventoryItem.is_active == True).scalar()

    return {
        "cost_value": total_value or 0,
        "retail_value": total_retail_value or 0,
        "potential_margin": (total_retail_value or 0) - (total_value or 0),
    }
