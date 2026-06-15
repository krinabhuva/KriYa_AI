"""Tests for inventory endpoints"""
from fastapi import status
from tests.conftest import get_auth_header


def test_create_inventory_item(client, analyst_user):
    """Test creating inventory item"""
    response = client.post(
        "/api/inventory/items",
        json={
            "sku": "TEST001",
            "name": "Test Product",
            "description": "Test Description",
            "category": "Electronics",
            "quantity": 100,
            "price": 99.99,
            "cost": 50.00,
            "reorder_level": 20,
        },
        headers=get_auth_header(analyst_user.id),
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["sku"] == "TEST001"
    assert data["quantity"] == 100


def test_get_inventory_items(client, analyst_user):
    """Test getting inventory items"""
    # Create an item first
    client.post(
        "/api/inventory/items",
        json={
            "sku": "TEST001",
            "name": "Test Product",
            "description": "Test Description",
            "category": "Electronics",
            "quantity": 100,
            "price": 99.99,
            "cost": 50.00,
        },
        headers=get_auth_header(analyst_user.id),
    )
    
    # Get items
    response = client.get(
        "/api/inventory/items",
        headers=get_auth_header(analyst_user.id),
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0


def test_get_low_stock_items(client, analyst_user):
    """Test getting low stock items"""
    # Create low stock item
    client.post(
        "/api/inventory/items",
        json={
            "sku": "LOW001",
            "name": "Low Stock Product",
            "description": "Test Description",
            "category": "Electronics",
            "quantity": 5,
            "price": 99.99,
            "cost": 50.00,
            "reorder_level": 20,
        },
        headers=get_auth_header(analyst_user.id),
    )
    
    # Get low stock items
    response = client.get(
        "/api/inventory/low-stock",
        headers=get_auth_header(analyst_user.id),
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert isinstance(data, list)
