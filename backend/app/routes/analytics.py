from fastapi import APIRouter, HTTPException, Depends, status, Query
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional

from app.database import get_db
from app import models, schemas, security
from app.audit import log_audit_event

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
    log_audit_event(
        db=db,
        user_id=current_user.id,
        action="CREATE_REPORT",
        resource_type="analytics",
        resource_id=report.id,
        changes=report_create.dict()
    )
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
    log_audit_event(
        db=db,
        user_id=current_user.id,
        action="UPDATE_REPORT",
        resource_type="analytics",
        resource_id=report.id,
        changes=update_data
    )
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

    report_id_saved = report.id
    db.delete(report)
    db.commit()
    log_audit_event(
        db=db,
        user_id=current_user.id,
        action="DELETE_REPORT",
        resource_type="analytics",
        resource_id=report_id_saved,
        changes={}
    )
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


@router.get("/sales/daily")
async def get_sales_daily(
    days: int = Query(30, ge=1),
    sku: Optional[str] = None,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db)
):
    """Get daily sales aggregation in the last N days"""
    start_date = datetime.utcnow() - timedelta(days=days)
    query = db.query(models.SalesRecord).filter(models.SalesRecord.date >= start_date)
    if sku:
        query = query.filter(models.SalesRecord.product_sku == sku)
    records = query.order_by(models.SalesRecord.date.asc()).all()
    
    from collections import defaultdict
    daily_data = defaultdict(lambda: {"revenue": 0.0, "quantity": 0})
    
    for r in records:
        date_str = r.date.strftime("%Y-%m-%d")
        daily_data[date_str]["revenue"] += r.revenue
        daily_data[date_str]["quantity"] += r.quantity_sold
        
    return [
        {"date": d, "revenue": val["revenue"], "quantity": val["quantity"]}
        for d, val in sorted(daily_data.items())
    ]


@router.get("/sales/by-category")
async def get_sales_by_category(
    days: int = Query(30, ge=1),
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db)
):
    """Get sales performance by category in the last N days"""
    start_date = datetime.utcnow() - timedelta(days=days)
    records = db.query(
        models.InventoryItem.category,
        models.SalesRecord.revenue,
        models.SalesRecord.quantity_sold
    ).join(
        models.SalesRecord, models.InventoryItem.sku == models.SalesRecord.product_sku
    ).filter(
        models.SalesRecord.date >= start_date
    ).all()

    from collections import defaultdict
    cat_data = defaultdict(lambda: {"revenue": 0.0, "quantity": 0})
    
    items = db.query(models.InventoryItem).filter(models.InventoryItem.is_active == True).all()
    item_counts = defaultdict(int)
    for it in items:
        item_counts[it.category] += 1

    for category, revenue, qty in records:
        cat_data[category]["revenue"] += revenue
        cat_data[category]["quantity"] += qty

    result = []
    # Include all categories that have active items, even if sales are zero
    for cat, item_count in item_counts.items():
        val = cat_data.get(cat, {"revenue": 0.0, "quantity": 0})
        result.append({
            "category": cat,
            "revenue": val["revenue"],
            "quantity": val["quantity"],
            "item_count": item_count
        })
    return result


@router.get("/kpis")
async def get_analytics_kpis(
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db)
):
    """Get high-level business performance KPIs"""
    from sqlalchemy import func
    
    now = datetime.utcnow()
    t30 = now - timedelta(days=30)
    t60 = now - timedelta(days=60)
    
    rev_30d = db.query(func.sum(models.SalesRecord.revenue)).filter(
        models.SalesRecord.date >= t30
    ).scalar() or 0.0
    
    rev_prior_30d = db.query(func.sum(models.SalesRecord.revenue)).filter(
        (models.SalesRecord.date >= t60) & (models.SalesRecord.date < t30)
    ).scalar() or 0.0
    
    if rev_prior_30d > 0:
        rev_change = ((rev_30d - rev_prior_30d) / rev_prior_30d) * 100.0
    else:
        rev_change = 0.0
        
    orders_30d = db.query(models.SalesRecord).filter(
        models.SalesRecord.date >= t30
    ).count()
    
    orders_prior_30d = db.query(models.SalesRecord).filter(
        (models.SalesRecord.date >= t60) & (models.SalesRecord.date < t30)
    ).count()
    
    avg_val = rev_30d / orders_30d if orders_30d > 0 else 0.0
    avg_val_prior = rev_prior_30d / orders_prior_30d if orders_prior_30d > 0 else 0.0
    
    if avg_val_prior > 0:
        avg_val_change = ((avg_val - avg_val_prior) / avg_val_prior) * 100.0
    else:
        avg_val_change = 0.0
        
    top_prod_query = db.query(
        models.SalesRecord.product_sku,
        func.sum(models.SalesRecord.revenue).label("total_revenue")
    ).filter(
        models.SalesRecord.date >= t30
    ).group_by(models.SalesRecord.product_sku).order_by(func.sum(models.SalesRecord.revenue).desc()).first()
    
    top_product = {"sku": "N/A", "name": "None", "revenue": 0.0}
    if top_prod_query:
        sku = top_prod_query[0]
        rev = top_prod_query[1]
        item = db.query(models.InventoryItem).filter(models.InventoryItem.sku == sku).first()
        if item:
            top_product = {"sku": sku, "name": item.name, "revenue": float(rev)}
            
    # Calculate revenue forecast 7d using get_forecast_summary logic
    from app.routes.predictions import get_forecast_summary
    forecast_summary = await get_forecast_summary(current_user=current_user, db=db)
    forecast_7d = forecast_summary.get("revenue_forecast_7d", 0.0)
    
    total_active = db.query(models.InventoryItem).filter(models.InventoryItem.is_active == True).count()
    low_stock = db.query(models.InventoryItem).filter(
        (models.InventoryItem.quantity <= models.InventoryItem.reorder_level) & (models.InventoryItem.is_active == True)
    ).count()
    
    health_score = 100.0
    if total_active > 0:
        health_score = (1.0 - (low_stock / total_active)) * 100.0
        
    return {
        "total_revenue_30d": float(rev_30d),
        "total_revenue_30d_change_pct": float(rev_change),
        "total_orders_30d": int(orders_30d),
        "avg_order_value": float(avg_val),
        "avg_order_value_change_pct": float(avg_val_change),
        "top_product": top_product,
        "revenue_forecast_7d": float(forecast_7d),
        "inventory_health_score": float(health_score)
    }

