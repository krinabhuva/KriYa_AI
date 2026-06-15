# Detailed Setup Guide for KriyaAI Backend

## Prerequisites

Before setting up the backend, ensure you have:

- **Python 3.10+** - [Download](https://www.python.org/downloads/)
- **pip** - Usually comes with Python
- **Git** (optional) - For cloning the repository
- **PostgreSQL** (optional) - For production database

## Complete Setup Steps

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Create Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Configure Environment

Copy the example environment file:
```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

Edit `.env` and update if needed (for development, defaults are fine).

### Step 5: Initialize Database

```bash
python init_db.py
```

This will:
- Create database tables
- Add sample users (admin, analyst, viewer)
- Add sample inventory items
- Add sample prediction models

**Sample Credentials:**
- **Admin**: `admin` / `admin123`
- **Analyst**: `analyst` / `analyst123`
- **Viewer**: `viewer` / `viewer123`

### Step 6: Start Development Server

**Windows:**
```bash
run.bat
```

**macOS/Linux:**
```bash
bash run.sh
```

Or manually:
```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Step 7: Verify Installation

Open your browser and visit:
- **API Root**: http://127.0.0.1:8000/
- **Interactive Docs**: http://127.0.0.1:8000/docs
- **Alternative Docs**: http://127.0.0.1:8000/redoc
- **Health Check**: http://127.0.0.1:8000/health

You should see the Swagger UI with all available endpoints.

## Quick Start with Make

If you have `make` installed:

```bash
# Setup
make venv
make install
make db-init
make run
```

## Quick Start with Docker

If you have Docker and Docker Compose:

```bash
docker-compose up
```

This will:
- Start PostgreSQL database
- Start the backend API
- Initialize databases

Access at: http://localhost:8000

## Verify Everything Works

### 1. Check Health Status
```bash
curl http://127.0.0.1:8000/health
```

Expected response:
```json
{
  "status": "ok",
  "service": "KriyaAI",
  "version": "1.0.0"
}
```

### 2. Login to Get Token
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Expected response:
```json
{
  "user": {...},
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

### 3. Get Inventory Items
```bash
curl -X GET http://127.0.0.1:8000/api/inventory/items \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Database Management

### View Database (SQLite)

Use DB Browser for SQLite:
```bash
# Install
pip install db-browser-for-sqlite

# Or download from: https://sqlitebrowser.org/
```

File location: `kriya_ai.db`

### Reset Database

```bash
# Delete the database file
rm kriya_ai.db
# or on Windows: del kriya_ai.db

# Reinitialize
python init_db.py
```

### Use PostgreSQL

For production setup, use PostgreSQL:

1. Install PostgreSQL
2. Create database:
   ```sql
   CREATE DATABASE kriya_ai;
   CREATE USER kriya_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE kriya_ai TO kriya_user;
   ```

3. Update `.env`:
   ```
   DATABASE_URL=postgresql://kriya_user:your_password@localhost:5432/kriya_ai
   ```

4. Restart server

## Running Tests

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_auth.py

# Run with verbose output
pytest -v

# Run with coverage
pytest --cov=app
```

## Troubleshooting

### Port 8000 Already in Use

```bash
# Use different port
uvicorn app.main:app --reload --host 127.0.0.1 --port 8001
```

### ModuleNotFoundError

```bash
# Ensure virtual environment is activated
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Database Lock Error (SQLite)

```bash
# Delete the database file
rm kriya_ai.db

# Reinitialize
python init_db.py
```

### Import Errors

Clear Python cache:
```bash
# Remove cache
find . -type d -name __pycache__ -exec rm -r {} +
find . -type f -name "*.pyc" -delete
```

## Development Tips

### Auto-Reload on Changes

Already enabled with `--reload` flag. API restarts whenever you save a file.

### Interactive API Testing

Use the Swagger UI at http://127.0.0.1:8000/docs to:
- Test all endpoints
- See request/response examples
- Check required parameters
- View error responses

### Debug Mode

Set in `.env`:
```
DEBUG=True
```

This enables:
- Detailed error messages
- SQL query logging
- Request/response logging

### Working with Environment Variables

Add new variables to `.env`:
```
MY_VARIABLE=value
```

Access in code:
```python
from app.config import get_settings
settings = get_settings()
my_var = settings.my_variable
```

## Next Steps

1. Review [README.md](README.md) for API documentation
2. Check [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
3. Explore endpoints in Swagger UI at /docs
4. Read [API_GUIDE.md](API_GUIDE.md) for detailed endpoint examples

## Support

For issues:
1. Check error message in terminal
2. Review logs for details
3. Check that virtual environment is activated
4. Verify all dependencies installed: `pip list`
5. Try deleting cache: `find . -type d -name __pycache__ -exec rm -r {} +`

---

**Setup complete! Enjoy developing with KriyaAI Backend.**
