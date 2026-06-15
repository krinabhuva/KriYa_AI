from fastapi import APIRouter, HTTPException, Depends, status, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app import models, schemas, security

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


@router.post("/predict")
async def make_prediction(
    input_data: dict,
    prediction_id: Optional[int] = None,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """
    Make a prediction using a model.
    This is a generic endpoint - in production, you'd integrate with actual ML models.
    """
    if prediction_id:
        prediction = db.query(models.Prediction).filter(
            models.Prediction.id == prediction_id
        ).first()

        if not prediction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Prediction model not found",
            )
    
    # Placeholder: In production, integrate with actual ML model
    # For now, return a mock prediction
    return {
        "predicted_value": 100.5,
        "confidence": 0.85,
        "model_type": "linear_regression",
        "timestamp": "2024-01-15T10:30:00Z",
    }
