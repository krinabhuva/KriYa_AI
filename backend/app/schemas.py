from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, EmailStr, Field


# User Schemas
class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    full_name: str = Field(..., min_length=1, max_length=100)


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    password: Optional[str] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


# Inventory Schemas
class InventoryItemBase(BaseModel):
    sku: str = Field(..., min_length=1)
    name: str
    description: Optional[str] = None
    category: str
    price: float = Field(..., gt=0)
    cost: float = Field(..., gt=0)
    reorder_level: int = Field(default=10, ge=0)
    supplier: Optional[str] = None
    location: Optional[str] = None


class InventoryItemCreate(InventoryItemBase):
    quantity: int = Field(default=0, ge=0)


class InventoryItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    cost: Optional[float] = None
    reorder_level: Optional[int] = None
    supplier: Optional[str] = None
    location: Optional[str] = None


class InventoryItemResponse(InventoryItemBase):
    id: int
    quantity: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Inventory Movement Schemas
class InventoryMovementBase(BaseModel):
    movement_type: str  # IN, OUT, ADJUSTMENT
    quantity: int
    reference: Optional[str] = None
    notes: Optional[str] = None


class InventoryMovementCreate(InventoryMovementBase):
    item_id: int


class InventoryMovementResponse(InventoryMovementBase):
    id: int
    item_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Prediction Schemas
class PredictionBase(BaseModel):
    name: str
    model_type: str
    description: Optional[str] = None
    target_variable: str
    features: list[str]
    accuracy: float


class PredictionCreate(PredictionBase):
    pass


class PredictionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    accuracy: Optional[float] = None


class PredictionResponse(PredictionBase):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Prediction Data Schemas
class PredictionDataBase(BaseModel):
    input_data: dict[str, Any]
    predicted_value: float
    confidence: float = Field(..., ge=0, le=1)


class PredictionDataCreate(PredictionDataBase):
    prediction_id: int


class PredictionDataResponse(PredictionDataBase):
    id: int
    prediction_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Analytics Schemas
class AnalyticsBase(BaseModel):
    name: str
    description: Optional[str] = None
    data_type: str
    metrics: dict[str, Any]
    period: str
    start_date: datetime
    end_date: datetime


class AnalyticsCreate(AnalyticsBase):
    filters_applied: Optional[dict] = None


class AnalyticsUpdate(BaseModel):
    name: Optional[str] = None
    metrics: Optional[dict] = None


class AnalyticsResponse(AnalyticsBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Auth Schemas
class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenRefreshRequest(BaseModel):
    refresh_token: str


# Login Schemas
class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    user: UserResponse
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


# Generic Response Schemas
class ErrorResponse(BaseModel):
    detail: str
    error_code: Optional[str] = None


class SuccessResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None


class PaginationParams(BaseModel):
    skip: int = Field(0, ge=0)
    limit: int = Field(20, ge=1, le=100)
