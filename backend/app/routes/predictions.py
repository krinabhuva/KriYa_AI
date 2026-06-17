from fastapi import APIRouter, HTTPException, Depends, status, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app import models, schemas, security
from app.audit import log_audit_event

router = APIRouter(prefix="/api/predictions", tags=["predictions"])


@router.get("/models", response_model=list[schemas.PredictionResponse])
async def get_predictions(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status_filter: Optional[str] = None,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get all prediction models"""
    query = db.query(models.Prediction)

    if status_filter:
        query = query.filter(models.Prediction.status == status_filter)

    predictions = query.offset(skip).limit(limit).all()
    return predictions


@router.get("/models/{prediction_id}", response_model=schemas.PredictionResponse)
async def get_prediction(
    prediction_id: int,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get a specific prediction model"""
    prediction = db.query(models.Prediction).filter(
        models.Prediction.id == prediction_id
    ).first()

    if not prediction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prediction model not found",
        )

    return prediction


@router.post("/models", response_model=schemas.PredictionResponse)
async def create_prediction(
    prediction_create: schemas.PredictionCreate,
    current_user: models.User = Depends(security.get_current_analyst),
    db: Session = Depends(get_db),
):
    """Create a new prediction model"""
    prediction = models.Prediction(
        name=prediction_create.name,
        model_type=prediction_create.model_type,
        description=prediction_create.description,
        target_variable=prediction_create.target_variable,
        features=prediction_create.features,
        accuracy=prediction_create.accuracy,
        created_by=current_user.id,
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)
    log_audit_event(
        db=db,
        user_id=current_user.id,
        action="CREATE_PREDICTION_MODEL",
        resource_type="predictions",
        resource_id=prediction.id,
        changes=prediction_create.dict()
    )
    return prediction


@router.put("/models/{prediction_id}", response_model=schemas.PredictionResponse)
async def update_prediction(
    prediction_id: int,
    prediction_update: schemas.PredictionUpdate,
    current_user: models.User = Depends(security.get_current_analyst),
    db: Session = Depends(get_db),
):
    """Update a prediction model"""
    prediction = db.query(models.Prediction).filter(
        models.Prediction.id == prediction_id
    ).first()

    if not prediction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prediction model not found",
        )

    # Update fields if provided
    update_data = prediction_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(prediction, field, value)

    db.add(prediction)
    db.commit()
    db.refresh(prediction)
    log_audit_event(
        db=db,
        user_id=current_user.id,
        action="UPDATE_PREDICTION_MODEL",
        resource_type="predictions",
        resource_id=prediction.id,
        changes=update_data
    )
    return prediction


@router.post("/models/{prediction_id}/activate")
async def activate_prediction(
    prediction_id: int,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Activate a prediction model"""
    prediction = db.query(models.Prediction).filter(
        models.Prediction.id == prediction_id
    ).first()

    if not prediction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prediction model not found",
        )

    prediction.status = "active"
    db.add(prediction)
    db.commit()
    log_audit_event(
        db=db,
        user_id=current_user.id,
        action="ACTIVATE_PREDICTION_MODEL",
        resource_type="predictions",
        resource_id=prediction.id,
        changes={"status": "active"}
    )

    return {"success": True, "message": "Model activated"}


@router.post("/models/{prediction_id}/archive")
async def archive_prediction(
    prediction_id: int,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Archive a prediction model"""
    prediction = db.query(models.Prediction).filter(
        models.Prediction.id == prediction_id
    ).first()

    if not prediction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prediction model not found",
        )

    prediction.status = "archived"
    db.add(prediction)
    db.commit()
    log_audit_event(
        db=db,
        user_id=current_user.id,
        action="ARCHIVE_PREDICTION_MODEL",
        resource_type="predictions",
        resource_id=prediction.id,
        changes={"status": "archived"}
    )

    return {"success": True, "message": "Model archived"}


@router.post("/data", response_model=schemas.PredictionDataResponse)
async def create_prediction_data(
    data: schemas.PredictionDataCreate,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Record prediction data/results"""
    # Verify prediction exists
    prediction = db.query(models.Prediction).filter(
        models.Prediction.id == data.prediction_id
    ).first()

    if not prediction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prediction model not found",
        )

    db_data = models.PredictionData(
        prediction_id=data.prediction_id,
        input_data=data.input_data,
        predicted_value=data.predicted_value,
        confidence=data.confidence,
    )

    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    log_audit_event(
        db=db,
        user_id=current_user.id,
        action="CREATE_PREDICTION_DATA",
        resource_type="prediction_data",
        resource_id=db_data.id,
        changes=data.dict()
    )
    return db_data


@router.get("/data/{prediction_id}", response_model=list[schemas.PredictionDataResponse])
async def get_prediction_data(
    prediction_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get all prediction data for a specific model"""
    data = (
        db.query(models.PredictionData)
        .filter(models.PredictionData.prediction_id == prediction_id)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return data


@router.get("/predict")
async def make_prediction(
    sku: str,
    days: int = Query(7, ge=1, le=90),
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """
    Make a prediction using a model.
    Loads SalesRecord for the SKU and fits a scikit-learn LinearRegression model.
    """
    import numpy as np
    from sklearn.linear_model import LinearRegression
    from datetime import timedelta

    sales = (
        db.query(models.SalesRecord)
        .filter(models.SalesRecord.product_sku == sku)
        .order_by(models.SalesRecord.date.asc())
        .all()
    )

    if len(sales) < 7:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient data, need at least 7 days of sales",
        )

    # Prepare features: date ordinal as X, revenue as y
    X = np.array([s.date.toordinal() for s in sales]).reshape(-1, 1)
    y = np.array([s.revenue for s in sales])

    # Fit LinearRegression model
    model = LinearRegression()
    model.fit(X, y)

    # R2 Score
    r2_score = float(model.score(X, y)) if len(set(y)) > 1 else 1.0

    # Residual standard deviation
    y_pred = model.predict(X)
    residuals = y - y_pred
    residual_std_dev = float(np.std(residuals)) if len(residuals) > 1 else 0.0

    last_date = sales[-1].date
    predictions = []
    for i in range(1, days + 1):
        pred_date = last_date + timedelta(days=i)
        pred_ordinal = pred_date.toordinal()
        pred_rev = float(model.predict([[pred_ordinal]])[0])
        pred_rev_clipped = max(0.0, pred_rev)

        low = pred_rev_clipped - 1.96 * residual_std_dev
        high = pred_rev_clipped + 1.96 * residual_std_dev

        predictions.append({
            "date": pred_date.strftime("%Y-%m-%d"),
            "predicted_revenue": pred_rev_clipped,
            "confidence_interval": [max(0.0, low), max(0.0, high)]
        })

    historical_data = [
        {"date": s.date.strftime("%Y-%m-%d"), "revenue": s.revenue}
        for s in sales
    ]

    return {
        "sku": sku,
        "model": "LinearRegression",
        "r2_score": r2_score,
        "predictions": predictions,
        "historical_data": historical_data
    }


@router.get("/forecast-summary")
async def get_forecast_summary(
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Returns aggregate 7-day and 30-day revenue forecast across all SKUs"""
    import numpy as np
    from sklearn.linear_model import LinearRegression
    from datetime import timedelta

    # Get all active items' SKUs
    skus = [
        item.sku
        for item in db.query(models.InventoryItem)
        .filter(models.InventoryItem.is_active == True)
        .all()
    ]

    total_7d_forecast = 0.0
    total_30d_forecast = 0.0

    for sku in skus:
        sales = (
            db.query(models.SalesRecord)
            .filter(models.SalesRecord.product_sku == sku)
            .order_by(models.SalesRecord.date.asc())
            .all()
        )

        if len(sales) >= 7:
            X = np.array([s.date.toordinal() for s in sales]).reshape(-1, 1)
            y = np.array([s.revenue for s in sales])
            model = LinearRegression()
            model.fit(X, y)

            last_date = sales[-1].date
            for i in range(1, 31):
                pred_date = last_date + timedelta(days=i)
                pred_ordinal = pred_date.toordinal()
                pred_rev = float(model.predict([[pred_ordinal]])[0])
                pred_rev = max(0.0, pred_rev)

                if i <= 7:
                    total_7d_forecast += pred_rev
                total_30d_forecast += pred_rev
        elif len(sales) > 0:
            avg_rev = sum(s.revenue for s in sales) / len(sales)
            total_7d_forecast += avg_rev * 7
            total_30d_forecast += avg_rev * 30

    return {
        "revenue_forecast_7d": total_7d_forecast,
        "revenue_forecast_30d": total_30d_forecast,
    }

