"""Tests for health and system endpoints"""
from fastapi import status


def test_root_endpoint(client):
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "name" in data
    assert "status" in data
    assert data["status"] == "running"


def test_health_endpoint(client):
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "ok"


def test_about_endpoint(client):
    """Test about endpoint"""
    response = client.get("/api/about")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "name" in data
    assert "mission" in data
    assert "features" in data
    assert isinstance(data["features"], list)


def test_endpoints_list(client):
    """Test endpoints list endpoint"""
    response = client.get("/api/endpoints")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "endpoints" in data
    assert "total" in data
    assert isinstance(data["endpoints"], list)
