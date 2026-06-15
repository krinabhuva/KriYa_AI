from fastapi import APIRouter, HTTPException, Depends, status, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app import models, schemas, security

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/", response_model=list[schemas.UserResponse])
async def get_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    role: Optional[str] = None,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Get all users (admin only)"""
    query = db.query(models.User)

    if role:
        query = query.filter(models.User.role == role)

    users = query.offset(skip).limit(limit).all()
    return users


@router.get("/{user_id}", response_model=schemas.UserResponse)
async def get_user(
    user_id: int,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Get a specific user (admin only)"""
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user


@router.put("/{user_id}", response_model=schemas.UserResponse)
async def update_user(
    user_id: int,
    user_update: schemas.UserUpdate,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Update user information (admin only)"""
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/{user_id}/deactivate")
async def deactivate_user(
    user_id: int,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Deactivate a user"""
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot deactivate yourself",
        )

    user.is_active = False
    db.add(user)
    db.commit()

    return {"success": True, "message": "User deactivated"}


@router.post("/{user_id}/activate")
async def activate_user(
    user_id: int,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Activate a user"""
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    user.is_active = True
    db.add(user)
    db.commit()

    return {"success": True, "message": "User activated"}


@router.put("/{user_id}/role")
async def update_user_role(
    user_id: int,
    role: str,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Update user role (admin only)"""
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Validate role
    valid_roles = [r.value for r in models.UserRole]
    if role not in valid_roles:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid role. Must be one of: {', '.join(valid_roles)}",
        )

    user.role = role
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"success": True, "message": f"User role updated to {role}"}


@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    current_user: models.User = Depends(security.get_current_admin),
    db: Session = Depends(get_db),
):
    """Delete a user (admin only)"""
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete yourself",
        )

    db.delete(user)
    db.commit()

    return {"success": True, "message": "User deleted successfully"}
