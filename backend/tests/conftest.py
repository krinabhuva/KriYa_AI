"""Test configuration and fixtures"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import app
from app import models, security

# Use SQLite in-memory database for tests
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture
def db():
    """Create test database"""
    Base.metadata.create_all(bind=engine)
    yield TestingSessionLocal()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client(db):
    """Create test client with test database"""
    def override_get_db():
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()


@pytest.fixture
def admin_user(db):
    """Create admin user for testing"""
    user = models.User(
        email="admin@test.com",
        username="admin",
        full_name="Admin User",
        hashed_password=security.hash_password("admin123"),
        is_active=True,
        role=models.UserRole.admin,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture
def analyst_user(db):
    """Create analyst user for testing"""
    user = models.User(
        email="analyst@test.com",
        username="analyst",
        full_name="Analyst User",
        hashed_password=security.hash_password("analyst123"),
        is_active=True,
        role=models.UserRole.analyst,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture
def viewer_user(db):
    """Create viewer user for testing"""
    user = models.User(
        email="viewer@test.com",
        username="viewer",
        full_name="Viewer User",
        hashed_password=security.hash_password("viewer123"),
        is_active=True,
        role=models.UserRole.viewer,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_auth_header(user_id: int) -> dict:
    """Generate authorization header for testing"""
    token = security.create_access_token(data={"sub": user_id})
    return {"Authorization": f"Bearer {token}"}
