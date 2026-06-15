# KriyaAI Backend

A complete, production-ready FastAPI backend for institutional-grade predictive analytics platform.

## Features

- ✅ **User Authentication & Authorization** - JWT-based with role-based access control (admin, analyst, viewer)
- ✅ **Inventory Management** - Complete CRUD operations with stock tracking and movements
- ✅ **Predictive Analytics** - Model creation, management, and prediction execution
- ✅ **Analytics & Reporting** - Dashboard, inventory analysis, and reporting
- ✅ **Database Integration** - SQLAlchemy ORM with support for SQLite and PostgreSQL
- ✅ **Data Validation** - Pydantic schemas for all request/response data
- ✅ **CORS Configuration** - Pre-configured for frontend integration
- ✅ **Error Handling** - Comprehensive exception handling and logging
- ✅ **RESTful API** - Well-organized, documented endpoints

## Project Structure

```
backend/
├── app/
│   ├── __init__.py                 # Package initialization
│   ├── main.py                     # FastAPI application setup
│   ├── config.py                   # Settings and configuration
│   ├── database.py                 # Database setup and session
│   ├── models.py                   # SQLAlchemy ORM models
│   ├── schemas.py                  # Pydantic validation schemas
│   ├── security.py                 # Authentication and security utilities
│   └── routes/                     # API route handlers
│       ├── __init__.py
│       ├── auth.py                 # Authentication endpoints
│       ├── users.py                # User management endpoints
│       ├── inventory.py            # Inventory management endpoints
│       ├── predictions.py          # Predictions endpoints
│       └── analytics.py            # Analytics and reporting endpoints
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore file
└── README.md                       # This file
```

## Installation

### Prerequisites

- Python 3.10 or higher
- pip (Python package manager)
- SQLite (included with Python) or PostgreSQL

### Setup Steps

1. **Clone/Navigate to the project:**
   ```bash
   cd backend
   ```

2. **Create a Python virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   **On Windows:**
   ```bash
   venv\Scripts\activate
   ```

   **On macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create .env file from template:**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration if needed.

6. **Start the development server:**
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

The API will be available at `http://127.0.0.1:8000`

## API Documentation

Once the server is running, visit:

- **Interactive API Docs (Swagger UI):** http://127.0.0.1:8000/docs
- **Alternative API Docs (ReDoc):** http://127.0.0.1:8000/redoc

## Core Endpoints

### Authentication (`/api/auth`)

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get tokens
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/me` - Update current user info

### Users (`/api/users`) - Admin Only

- `GET /api/users/` - List all users
- `GET /api/users/{user_id}` - Get user details
- `PUT /api/users/{user_id}` - Update user
- `POST /api/users/{user_id}/deactivate` - Deactivate user
- `POST /api/users/{user_id}/activate` - Activate user
- `PUT /api/users/{user_id}/role` - Update user role
- `DELETE /api/users/{user_id}` - Delete user

### Inventory (`/api/inventory`)

- `GET /api/inventory/items` - List inventory items
- `GET /api/inventory/items/{item_id}` - Get item details
- `POST /api/inventory/items` - Create inventory item (requires analyst role)
- `PUT /api/inventory/items/{item_id}` - Update item (requires analyst role)
- `DELETE /api/inventory/items/{item_id}` - Delete item (requires admin role)
- `POST /api/inventory/movements` - Record inventory movement (requires analyst role)
- `GET /api/inventory/movements/{item_id}` - Get item movements history
- `GET /api/inventory/low-stock` - Get low stock items

### Predictions (`/api/predictions`)

- `GET /api/predictions/models` - List prediction models
- `GET /api/predictions/models/{prediction_id}` - Get model details
- `POST /api/predictions/models` - Create prediction model (requires analyst role)
- `PUT /api/predictions/models/{prediction_id}` - Update model (requires analyst role)
- `POST /api/predictions/models/{prediction_id}/activate` - Activate model (requires admin role)
- `POST /api/predictions/models/{prediction_id}/archive` - Archive model (requires admin role)
- `POST /api/predictions/data` - Record prediction data
- `GET /api/predictions/data/{prediction_id}` - Get prediction data
- `POST /api/predictions/predict` - Make a prediction

### Analytics (`/api/analytics`)

- `GET /api/analytics/reports` - List analytics reports
- `GET /api/analytics/reports/{report_id}` - Get report details
- `POST /api/analytics/reports` - Create report (requires analyst role)
- `PUT /api/analytics/reports/{report_id}` - Update report (requires analyst role)
- `DELETE /api/analytics/reports/{report_id}` - Delete report (requires admin role)
- `GET /api/analytics/dashboard/summary` - Get dashboard summary
- `GET /api/analytics/inventory/by-category` - Get inventory by category
- `GET /api/analytics/inventory/valuation` - Get inventory valuation

### System

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/about` - About the application
- `GET /api/endpoints` - List all available endpoints

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register or Login** to get access and refresh tokens
2. **Include the token** in request header:
   ```
   Authorization: Bearer <your_access_token>
   ```
3. **Use refresh token** to get a new access token when expired

## User Roles

- **Admin** - Full access, can manage users and approve/archive models
- **Analyst** - Can create and manage data, predictions, and reports
- **Viewer** - Read-only access to data and reports

## Environment Variables

Key environment variables in `.env`:

| Variable | Default | Description |
|----------|---------|-------------|
| `DEBUG` | True | Enable debug mode |
| `DATABASE_URL` | sqlite:///./kriya_ai.db | Database connection string |
| `SECRET_KEY` | (required) | Secret key for JWT signing |
| `SERVER_HOST` | 127.0.0.1 | Server host |
| `SERVER_PORT` | 8000 | Server port |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | 30 | JWT token expiration time |

## Database

The backend supports:

- **SQLite** (default, for development): `sqlite:///./kriya_ai.db`
- **PostgreSQL** (for production): `postgresql://user:password@host/kriya_ai`

To use PostgreSQL, update `DATABASE_URL` in `.env`:
```
DATABASE_URL=postgresql://username:password@localhost:5432/kriya_ai
```

## Data Models

### User
- Email, username, full name
- Password (hashed with bcrypt)
- Role-based permissions
- Account status tracking

### InventoryItem
- SKU, name, description, category
- Price and cost tracking
- Quantity and reorder level
- Supplier and location info

### InventoryMovement
- Tracks all inventory transactions
- Movement types: IN, OUT, ADJUSTMENT
- References and notes for traceability

### Prediction
- Model name, type, description
- Target variable and features
- Model accuracy and status
- Can be archived or activated

### Analytics
- Configurable metrics and filters
- Time-period analysis
- Support for multiple data types
- Audit trail of creator

## Development

### Run with auto-reload:
```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Run tests (placeholder):
```bash
pytest
```

### Code style:
The project follows PEP 8 conventions.

## Production Deployment

For production:

1. **Update security:**
   - Change `SECRET_KEY` to a strong random value
   - Set `DEBUG=False`
   - Use HTTPS

2. **Use PostgreSQL** instead of SQLite

3. **Use environment variables** for all sensitive data

4. **Deploy with Gunicorn + Nginx:**
   ```bash
   gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
   ```

5. **Enable logging** for monitoring and debugging

## Dependencies

Key packages:
- **FastAPI** - Modern web framework
- **SQLAlchemy** - ORM for database
- **Pydantic** - Data validation
- **python-jose** - JWT handling
- **passlib** - Password hashing
- **uvicorn** - ASGI server
- **pandas/numpy** - Data processing

See `requirements.txt` for complete list.

## Troubleshooting

### Port already in use:
```bash
uvicorn app.main:app --host 127.0.0.1 --port 8001
```

### Database errors:
Delete `kriya_ai.db` and restart the server to reinitialize.

### Import errors:
Ensure virtual environment is activated and dependencies are installed:
```bash
pip install -r requirements.txt
```

## API Response Format

All API responses follow a consistent format:

**Success (200):**
```json
{
  "id": 1,
  "name": "Product A",
  "created_at": "2024-01-15T10:30:00"
}
```

**Error (4xx/5xx):**
```json
{
  "detail": "Error message",
  "status_code": 400
}
```

## Support

For issues or questions, please contact the development team or create an issue in the repository.

---

**Built with FastAPI | Powered by Python 3.10+**
