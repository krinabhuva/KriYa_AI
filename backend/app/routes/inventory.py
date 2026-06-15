from fastapi import APIRouter, HTTPException, Depends, status, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app import models, schemas, security

router = APIRouter(prefix="/api/inventory", tags=["inventory"])


@router.get("/items", response_model=list[schemas.InventoryItemResponse])
async def get_inventory_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get all inventory items with optional filtering"""
    query = db.query(models.InventoryItem).filter(models.InventoryItem.is_active == True)

    if category:
        query = query.filter(models.InventoryItem.category == category)

    items = query.offset(skip).limit(limit).all()
    return items


@router.get("/items/{item_id}", response_model=schemas.InventoryItemResponse)
async def get_inventory_item(
    item_id: int,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get a specific inventory item"""
    item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found",
        )

    return item


@router.post("/items", response_model=schemas.InventoryItemResponse)
async def create_inventory_item(
    item_create: schemas.InventoryItemCreate,
    current_user: models.User = Depends(security.get_current_analyst),
    db: Session = Depends(get_db),
):
    """Create a new inventory item"""
    # Check if SKU already exists
    existing = db.query(models.InventoryItem).filter(
        models.InventoryItem.sku == item_create.sku
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Item with this SKU already exists",
        )

    item = models.InventoryItem(
        sku=item_create.sku,
        name=item_create.name,
        description=item_create.description,
        category=item_create.category,
        quantity=item_create.quantity,
        price=item_create.price,
        cost=item_create.cost,
        reorder_level=item_create.reorder_level,
        supplier=item_create.supplier,
        location=item_create.location,
        created_by=current_user.id,
    )

    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/items/{item_id}", response_model=schemas.InventoryItemResponse)
async def update_inventory_item(
    item_id: int,
    item_update: schemas.InventoryItemUpdate,
    current_user: models.User = Depends(security.get_current_analyst),
    db: Session = Depends(get_db),
):
    """Update an inventory item"""
    item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found",
        )

    # Update fields if provided
    update_data = item_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)

    item.updated_at = item.updated_at  # Trigger update
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/items/{item_id}")
async def delete_inventory_item(
    item_id: int,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Soft delete an inventory item"""
    item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found",
        )

    item.is_active = False
    db.add(item)
    db.commit()

    return {"success": True, "message": "Item deleted successfully"}


@router.post("/movements", response_model=schemas.InventoryMovementResponse)
async def record_inventory_movement(
    movement: schemas.InventoryMovementCreate,
    current_user: models.User = Depends(security.get_current_analyst),
    db: Session = Depends(get_db),
):
    """Record an inventory movement/transaction"""
    # Verify item exists
    item = db.query(models.InventoryItem).filter(
        models.InventoryItem.id == movement.item_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found",
        )

    # Create movement record
    db_movement = models.InventoryMovement(
        item_id=movement.item_id,
        movement_type=movement.movement_type,
        quantity=movement.quantity,
        reference=movement.reference,
        notes=movement.notes,
    )

    # Update item quantity based on movement type
    if movement.movement_type == "IN":
        item.quantity += movement.quantity
    elif movement.movement_type == "OUT":
        if item.quantity < movement.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Insufficient quantity",
            )
        item.quantity -= movement.quantity
    elif movement.movement_type == "ADJUSTMENT":
        item.quantity = movement.quantity

    db.add(db_movement)
    db.add(item)
    db.commit()
    db.refresh(db_movement)
    return db_movement


@router.get("/movements/{item_id}", response_model=list[schemas.InventoryMovementResponse])
async def get_item_movements(
    item_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=500),
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Get all movements for a specific inventory item"""
    movements = (
        db.query(models.InventoryMovement)
        .filter(models.InventoryMovement.item_id == item_id)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return movements


@router.get("/low-stock", response_model=list[schemas.InventoryItemResponse])
async def get_low_stock_items(
    current_user: models.User = Depends(security.get_current_analyst),
    db: Session = Depends(get_db),
):
    """Get items with quantity below reorder level"""
    items = (
        db.query(models.InventoryItem)
        .filter(
            (models.InventoryItem.quantity <= models.InventoryItem.reorder_level)
            & (models.InventoryItem.is_active == True)
        )
        .all()
    )
    return items
