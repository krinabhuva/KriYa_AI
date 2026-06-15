# KriyaAI Backend API Guide

Comprehensive guide with examples for all API endpoints.

## Table of Contents

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Inventory Management](#inventory-management)
4. [Predictions](#predictions)
5. [Analytics](#analytics)
6. [System Endpoints](#system-endpoints)

## Authentication

All endpoints except `/api/auth/register`, `/api/auth/login`, and system endpoints require an `Authorization` header with a Bearer token.

### Register User

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "password": "SecurePassword123!"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "role": "viewer",
  "created_at": "2024-01-15T10:30:00"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "detail": "Email or username already registered",
  "status_code": 400
}
```

### Login

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "username": "john_doe",
  "password": "SecurePassword123!"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "is_active": true,
    "role": "viewer",
    "created_at": "2024-01-15T10:30:00"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Refresh Token

**Endpoint:** `POST /api/auth/refresh`

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Get Current User

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "role": "viewer",
  "created_at": "2024-01-15T10:30:00"
}
```

### Update Current User

**Endpoint:** `PUT /api/auth/me`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Request:**
```json
{
  "full_name": "John Updated",
  "password": "NewPassword123!"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "full_name": "John Updated",
  "is_active": true,
  "role": "viewer",
  "created_at": "2024-01-15T10:30:00"
}
```

## User Management

**Requires:** Admin role

### List All Users

**Endpoint:** `GET /api/users/?skip=0&limit=20&role=admin`

**Headers:**
```
Authorization: Bearer ADMIN_TOKEN
```

**Query Parameters:**
- `skip`: Offset (default: 0)
- `limit`: Limit (default: 20, max: 100)
- `role`: Filter by role (optional)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "username": "admin",
    "email": "admin@kriya.ai",
    "full_name": "Admin User",
    "is_active": true,
    "role": "admin",
    "created_at": "2024-01-15T10:00:00"
  }
]
```

### Get User

**Endpoint:** `GET /api/users/{user_id}`

**Response:** `200 OK`
```json
{
  "id": 2,
  "username": "analyst",
  "email": "analyst@kriya.ai",
  "full_name": "Analyst User",
  "is_active": true,
  "role": "analyst",
  "created_at": "2024-01-15T10:05:00"
}
```

### Update User

**Endpoint:** `PUT /api/users/{user_id}`

**Request:**
```json
{
  "full_name": "Updated Name",
  "password": "NewPassword123!"
}
```

**Response:** `200 OK`
```json
{
  "id": 2,
  "username": "analyst",
  "email": "analyst@kriya.ai",
  "full_name": "Updated Name",
  "is_active": true,
  "role": "analyst",
  "created_at": "2024-01-15T10:05:00"
}
```

### Update User Role

**Endpoint:** `PUT /api/users/{user_id}/role`

**Query Parameters:**
- `role`: New role (admin, analyst, viewer)

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User role updated to admin"
}
```

### Deactivate User

**Endpoint:** `POST /api/users/{user_id}/deactivate`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User deactivated"
}
```

### Activate User

**Endpoint:** `POST /api/users/{user_id}/activate`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User activated"
}
```

### Delete User

**Endpoint:** `DELETE /api/users/{user_id}`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

## Inventory Management

**Requires:** Analyst or Admin role (for create/update/delete)

### Create Inventory Item

**Endpoint:** `POST /api/inventory/items`

**Headers:**
```
Authorization: Bearer ANALYST_TOKEN
```

**Request:**
```json
{
  "sku": "SKU001",
  "name": "Premium Product",
  "description": "High quality product",
  "category": "Electronics",
  "quantity": 100,
  "price": 99.99,
  "cost": 50.00,
  "reorder_level": 20,
  "supplier": "Supplier A",
  "location": "Warehouse A"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "sku": "SKU001",
  "name": "Premium Product",
  "description": "High quality product",
  "category": "Electronics",
  "quantity": 100,
  "price": 99.99,
  "cost": 50.00,
  "reorder_level": 20,
  "supplier": "Supplier A",
  "location": "Warehouse A",
  "is_active": true,
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

### Get Inventory Items

**Endpoint:** `GET /api/inventory/items?skip=0&limit=20&category=Electronics`

**Query Parameters:**
- `skip`: Offset
- `limit`: Limit
- `category`: Filter by category (optional)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "sku": "SKU001",
    "name": "Premium Product",
    "category": "Electronics",
    "quantity": 100,
    "price": 99.99,
    "cost": 50.00,
    "reorder_level": 20,
    "is_active": true,
    "created_at": "2024-01-15T10:30:00",
    "updated_at": "2024-01-15T10:30:00"
  }
]
```

### Get Item Details

**Endpoint:** `GET /api/inventory/items/{item_id}`

**Response:** `200 OK`
```json
{
  "id": 1,
  "sku": "SKU001",
  "name": "Premium Product",
  "description": "High quality product",
  "category": "Electronics",
  "quantity": 100,
  "price": 99.99,
  "cost": 50.00,
  "reorder_level": 20,
  "supplier": "Supplier A",
  "location": "Warehouse A",
  "is_active": true,
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

### Update Inventory Item

**Endpoint:** `PUT /api/inventory/items/{item_id}`

**Request:**
```json
{
  "quantity": 150,
  "price": 109.99,
  "reorder_level": 25
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "sku": "SKU001",
  "name": "Premium Product",
  "quantity": 150,
  "price": 109.99,
  "reorder_level": 25,
  "is_active": true,
  "updated_at": "2024-01-15T11:00:00"
}
```

### Record Inventory Movement

**Endpoint:** `POST /api/inventory/movements`

**Request:**
```json
{
  "item_id": 1,
  "movement_type": "IN",
  "quantity": 50,
  "reference": "PO-2024-001",
  "notes": "Received from supplier A"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "item_id": 1,
  "movement_type": "IN",
  "quantity": 50,
  "reference": "PO-2024-001",
  "notes": "Received from supplier A",
  "created_at": "2024-01-15T11:00:00"
}
```

**Movement Types:**
- `IN`: Inventory received/added
- `OUT`: Inventory sold/removed
- `ADJUSTMENT`: Inventory adjustment

### Get Item Movements

**Endpoint:** `GET /api/inventory/movements/{item_id}?skip=0&limit=50`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "item_id": 1,
    "movement_type": "IN",
    "quantity": 50,
    "reference": "PO-2024-001",
    "notes": "Received from supplier A",
    "created_at": "2024-01-15T11:00:00"
  }
]
```

### Get Low Stock Items

**Endpoint:** `GET /api/inventory/low-stock`

**Response:** `200 OK`
```json
[
  {
    "id": 2,
    "sku": "SKU002",
    "name": "Standard Product",
    "quantity": 15,
    "reorder_level": 30,
    "category": "Electronics"
  }
]
```

## Predictions

### Create Prediction Model

**Endpoint:** `POST /api/predictions/models`

**Headers:**
```
Authorization: Bearer ANALYST_TOKEN
```

**Request:**
```json
{
  "name": "Sales Forecast",
  "model_type": "arima",
  "description": "Forecast sales for next month",
  "target_variable": "sales",
  "features": ["month", "day_of_week", "promotion", "price"],
  "accuracy": 0.87
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Sales Forecast",
  "model_type": "arima",
  "description": "Forecast sales for next month",
  "target_variable": "sales",
  "features": ["month", "day_of_week", "promotion", "price"],
  "accuracy": 0.87,
  "status": "draft",
  "created_at": "2024-01-15T12:00:00",
  "updated_at": "2024-01-15T12:00:00"
}
```

### List Prediction Models

**Endpoint:** `GET /api/predictions/models?skip=0&limit=20&status=active`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Sales Forecast",
    "model_type": "arima",
    "accuracy": 0.87,
    "status": "active"
  }
]
```

### Activate Prediction Model

**Endpoint:** `POST /api/predictions/models/{prediction_id}/activate`

**Headers:**
```
Authorization: Bearer ADMIN_TOKEN
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Model activated"
}
```

### Record Prediction Data

**Endpoint:** `POST /api/predictions/data`

**Request:**
```json
{
  "prediction_id": 1,
  "input_data": {
    "month": "january",
    "day_of_week": "monday",
    "promotion": true,
    "price": 99.99
  },
  "predicted_value": 15000.50,
  "confidence": 0.92
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "prediction_id": 1,
  "input_data": {
    "month": "january",
    "day_of_week": "monday",
    "promotion": true,
    "price": 99.99
  },
  "predicted_value": 15000.50,
  "confidence": 0.92,
  "created_at": "2024-01-15T12:30:00"
}
```

### Make Prediction

**Endpoint:** `POST /api/predictions/predict`

**Request:**
```json
{
  "prediction_id": 1,
  "input_data": {
    "month": "january",
    "day_of_week": "tuesday",
    "promotion": false,
    "price": 89.99
  }
}
```

**Response:** `200 OK`
```json
{
  "predicted_value": 12000.75,
  "confidence": 0.88,
  "model_type": "arima",
  "timestamp": "2024-01-15T12:45:00Z"
}
```

## Analytics

### Create Analytics Report

**Endpoint:** `POST /api/analytics/reports`

**Headers:**
```
Authorization: Bearer ANALYST_TOKEN
```

**Request:**
```json
{
  "name": "January Sales Report",
  "description": "Sales analysis for January 2024",
  "data_type": "sales",
  "metrics": {
    "total_sales": 50000,
    "average_order": 250,
    "order_count": 200
  },
  "filters_applied": {
    "month": "january",
    "region": "north"
  },
  "period": "monthly",
  "start_date": "2024-01-01T00:00:00",
  "end_date": "2024-01-31T23:59:59"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "January Sales Report",
  "description": "Sales analysis for January 2024",
  "data_type": "sales",
  "metrics": {
    "total_sales": 50000,
    "average_order": 250,
    "order_count": 200
  },
  "period": "monthly",
  "start_date": "2024-01-01T00:00:00",
  "end_date": "2024-01-31T23:59:59",
  "created_at": "2024-01-31T12:00:00"
}
```

### Get Dashboard Summary

**Endpoint:** `GET /api/analytics/dashboard/summary`

**Response:** `200 OK`
```json
{
  "inventory": {
    "total_items": 150,
    "low_stock_items": 5
  },
  "predictions": {
    "active_models": 3
  },
  "users": {
    "total": 10
  },
  "timestamp": "2024-01-15T13:00:00.123456"
}
```

### Get Inventory by Category

**Endpoint:** `GET /api/analytics/inventory/by-category`

**Response:** `200 OK`
```json
[
  {
    "category": "Electronics",
    "count": 45,
    "total_quantity": 1200
  },
  {
    "category": "Accessories",
    "count": 30,
    "total_quantity": 800
  }
]
```

### Get Inventory Valuation

**Endpoint:** `GET /api/analytics/inventory/valuation`

**Response:** `200 OK`
```json
{
  "cost_value": 50000.00,
  "retail_value": 120000.00,
  "potential_margin": 70000.00
}
```

## System Endpoints

### Root Endpoint

**Endpoint:** `GET /`

**Response:** `200 OK`
```json
{
  "name": "KriyaAI",
  "version": "1.0.0",
  "mission": "Democratize institutional-grade predictive analytics",
  "status": "running"
}
```

### Health Check

**Endpoint:** `GET /health`

**Response:** `200 OK`
```json
{
  "status": "ok",
  "service": "KriyaAI",
  "version": "1.0.0"
}
```

### Get About Info

**Endpoint:** `GET /api/about`

**Response:** `200 OK`
```json
{
  "name": "KriyaAI",
  "mission": "Democratize institutional-grade predictive analytics",
  "year": 2024,
  "version": "1.0.0",
  "features": [
    "User authentication with JWT",
    "Inventory management",
    "Predictive analytics",
    "Advanced analytics & reporting",
    "Role-based access control",
    "RESTful API"
  ]
}
```

### Get All Endpoints

**Endpoint:** `GET /api/endpoints`

**Response:** `200 OK`
```json
{
  "endpoints": [
    {
      "path": "/",
      "methods": ["GET"],
      "name": "root"
    },
    {
      "path": "/api/auth/login",
      "methods": ["POST"],
      "name": "login"
    }
  ],
  "total": 25
}
```

## Error Responses

All error responses follow this format:

```json
{
  "detail": "Error message describing what went wrong",
  "status_code": 400
}
```

### Common Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

Current implementation: No strict rate limits (can be added with `slowapi`)

Recommended limits:
- Authentication endpoints: 5 requests/minute
- Data endpoints: 100 requests/minute
- System endpoints: 1000 requests/minute

---

**For more details, visit:** http://localhost:8000/docs (Swagger UI)
