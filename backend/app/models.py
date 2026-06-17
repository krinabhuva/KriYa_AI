from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum

from app.database import Base


class UserRole(str, enum.Enum):
    """User role enumeration"""
    admin = "admin"
    analyst = "analyst"
    viewer = "viewer"


class User(Base):
    """User model"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    role = Column(Enum(UserRole), default=UserRole.viewer)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    inventory_items = relationship("InventoryItem", back_populates="created_by_user")
    predictions = relationship("Prediction", back_populates="created_by_user")
    analytics = relationship("Analytics", back_populates="created_by_user")

    def __repr__(self):
        return f"<User {self.username}>"


class InventoryItem(Base):
    """Inventory item model"""
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    category = Column(String, index=True)
    quantity = Column(Integer, default=0)
    price = Column(Float)
    cost = Column(Float)
    reorder_level = Column(Integer, default=10)
    supplier = Column(String)
    location = Column(String)
    last_restocked = Column(DateTime, default=datetime.utcnow)
    item_metadata = Column(JSON, default={})
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    created_by_user = relationship("User", back_populates="inventory_items")
    movements = relationship("InventoryMovement", back_populates="item")

    def __repr__(self):
        return f"<InventoryItem {self.sku}>"


class InventoryMovement(Base):
    """Inventory movement/transaction model"""
    __tablename__ = "inventory_movements"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("inventory_items.id"))
    movement_type = Column(String)  # IN, OUT, ADJUSTMENT
    quantity = Column(Integer)
    reference = Column(String)  # Purchase order, sales order, etc
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    item = relationship("InventoryItem", back_populates="movements")

    def __repr__(self):
        return f"<InventoryMovement {self.movement_type}>"


class Prediction(Base):
    """Prediction model"""
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    model_type = Column(String)  # linear_regression, arima, etc
    description = Column(Text)
    target_variable = Column(String)
    features = Column(JSON)  # List of features used
    accuracy = Column(Float)
    status = Column(String, default="draft")  # draft, active, archived
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    created_by_user = relationship("User", back_populates="predictions")
    predictions_data = relationship("PredictionData", back_populates="prediction")

    def __repr__(self):
        return f"<Prediction {self.name}>"


class PredictionData(Base):
    """Prediction results data"""
    __tablename__ = "prediction_data"

    id = Column(Integer, primary_key=True, index=True)
    prediction_id = Column(Integer, ForeignKey("predictions.id"))
    input_data = Column(JSON)
    predicted_value = Column(Float)
    confidence = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    prediction = relationship("Prediction", back_populates="predictions_data")

    def __repr__(self):
        return f"<PredictionData {self.predicted_value}>"


class Analytics(Base):
    """Analytics record model"""
    __tablename__ = "analytics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    data_type = Column(String)  # sales, inventory, performance, etc
    metrics = Column(JSON)  # Dictionary of metrics
    filters_applied = Column(JSON)
    period = Column(String)  # daily, weekly, monthly, yearly
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    created_by_user = relationship("User", back_populates="analytics")

    def __repr__(self):
        return f"<Analytics {self.name}>"


class AuditLog(Base):
    """Audit log for tracking changes"""
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String)
    resource_type = Column(String)
    resource_id = Column(Integer)
    changes = Column(JSON)
    ip_address = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<AuditLog {self.action}>"
