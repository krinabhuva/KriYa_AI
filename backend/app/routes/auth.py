from fastapi import APIRouter, HTTPException, Depends, status, Request
from sqlalchemy.orm import Session
from datetime import timedelta

from app.database import get_db
from app import models, schemas, security
from app.config import get_settings
from app.limiter import limiter
from app.audit import log_audit_event

settings = get_settings()
router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post("/register", response_model=schemas.UserResponse)
@limiter.limit("3/minute")
async def register(request: Request, user_create: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Password validation: minimum 8 characters, at least 1 number
    if len(user_create.password) < 8 or not any(char.isdigit() for char in user_create.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long and contain at least one number",
        )

    # Check if user already exists
    existing_user = db.query(models.User).filter(
        (models.User.email == user_create.email)
        | (models.User.username == user_create.username)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or username already registered",
        )

    # Create new user
    user = models.User(
        email=user_create.email,
        username=user_create.username,
        full_name=user_create.full_name,
        hashed_password=security.hash_password(user_create.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    log_audit_event(
        db=db,
        user_id=user.id,
        action="REGISTER",
        resource_type="users",
        resource_id=user.id,
        changes={"username": user.username, "email": user.email}
    )

    return user


@router.post("/login", response_model=schemas.LoginResponse)
@limiter.limit("5/minute")
async def login(request: Request, login_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    """Login user and return tokens"""
    user = db.query(models.User).filter(models.User.username == login_data.username).first()

    if not user or not security.verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is not active",
        )

    # Create tokens
    access_token = security.create_access_token(data={"sub": str(user.id)})
    refresh_token = security.create_refresh_token(data={"sub": str(user.id)})

    log_audit_event(
        db=db,
        user_id=user.id,
        action="LOGIN",
        resource_type="users",
        resource_id=user.id,
        changes={}
    )

    return {
        "user": user,
        "access_token": access_token,
        "refresh_token": refresh_token,
    }


@router.post("/refresh", response_model=schemas.TokenResponse)
async def refresh_token(request: schemas.TokenRefreshRequest):
    """Refresh access token using refresh token"""
    payload = security.verify_token(request.refresh_token)

    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    user_id = payload.get("sub")
    access_token = security.create_access_token(data={"sub": user_id})

    return {
        "access_token": access_token,
        "refresh_token": request.refresh_token,
    }


@router.get("/me", response_model=schemas.UserResponse)
async def get_current_user_info(
    current_user: models.User = Depends(security.get_current_user),
):
    """Get current user information"""
    return current_user


@router.put("/me", response_model=schemas.UserResponse)
async def update_current_user(
    user_update: schemas.UserUpdate,
    current_user: models.User = Depends(security.get_current_user),
    db: Session = Depends(get_db),
):
    """Update current user information"""
    changes = {}
    if user_update.full_name:
        changes["full_name"] = user_update.full_name
        current_user.full_name = user_update.full_name

    if user_update.password:
        if len(user_update.password) < 8 or not any(char.isdigit() for char in user_update.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters long and contain at least one number",
            )
        changes["password"] = "updated"
        current_user.hashed_password = security.hash_password(user_update.password)

    if changes:
        db.add(current_user)
        db.commit()
        db.refresh(current_user)
        log_audit_event(
            db=db,
            user_id=current_user.id,
            action="UPDATE_USER",
            resource_type="users",
            resource_id=current_user.id,
            changes=changes
        )
    return current_user
