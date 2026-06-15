# KriyaAI Backend - Quick Reference Guide

## ⚡ Quick Start (60 seconds)

### Windows
```bash
cd backend
run.bat
```

### macOS/Linux
```bash
cd backend
bash run.sh
```

### Docker
```bash
cd backend
docker-compose up
```

**Server ready at:** http://127.0.0.1:8000

---

## 🔑 Default Credentials

```
admin    / admin123      (Admin role)
analyst  / analyst123    (Analyst role)
viewer   / viewer123     (Viewer role)
```

---

## 📚 Important URLs

| URL | Purpose |
|-----|---------|
| http://127.0.0.1:8000/ | API Root |
| http://127.0.0.1:8000/docs | Swagger UI |
| http://127.0.0.1:8000/redoc | ReDoc |
| http://127.0.0.1:8000/health | Health Check |
| http://127.0.0.1:8000/api/endpoints | List All Endpoints |

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `.env` | Environment configuration |
| `app/main.py` | Application entry point |
| `app/models.py` | Database models |
| `app/routes/` | API endpoints |
| `requirements.txt` | Python dependencies |
| `init_db.py` | Database initialization |

---

## 🔨 Common Commands

### Setup
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python init_db.py
```

### Development
```bash
# Start dev server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# Or use Makefile
make run

# Run tests
pytest

# Or with Makefile
make test
```

### Maintenance
```bash
# Clean cache
make clean

# Format code
make format

# Lint code
make lint

# List commands
make help
```

### Docker
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f backend

# Rebuild
docker-compose build
```

---

## 🌐 API Authentication

### Get Token (Login)
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Use Token in Request
```bash
curl -X GET http://127.0.0.1:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 Common API Calls

### Get Inventory Items
```bash
curl http://127.0.0.1:8000/api/inventory/items \
  -H "Authorization: Bearer TOKEN"
```

### Create Inventory Item
```bash
curl -X POST http://127.0.0.1:8000/api/inventory/items \
  -H "Authorization: Bearer ANALYST_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sku":"SKU001",
    "name":"Product",
    "category":"Electronics",
    "quantity":100,
    "price":99.99,
    "cost":50.00
  }'
```

### Record Inventory Movement
```bash
curl -X POST http://127.0.0.1:8000/api/inventory/movements \
  -H "Authorization: Bearer ANALYST_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "item_id":1,
    "movement_type":"IN",
    "quantity":50,
    "reference":"PO-001"
  }'
```

### Get Low Stock Items
```bash
curl http://127.0.0.1:8000/api/inventory/low-stock \
  -H "Authorization: Bearer TOKEN"
```

### Dashboard Summary
```bash
curl http://127.0.0.1:8000/api/analytics/dashboard/summary \
  -H "Authorization: Bearer TOKEN"
```

---

## 🗂️ Database

### Initialize with Sample Data
```bash
python init_db.py
```

### Reset Database
```bash
# Delete database file
rm kriya_ai.db

# Reinitialize
python init_db.py
```

### View Database (SQLite)
- Use DB Browser for SQLite (https://sqlitebrowser.org/)
- File: `kriya_ai.db`

---

## 🛠️ Troubleshooting

### Port 8000 Already in Use
```bash
uvicorn app.main:app --port 8001
```

### ModuleNotFoundError
```bash
# Make sure venv is activated
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

pip install -r requirements.txt
```

### Database Lock (SQLite)
```bash
rm kriya_ai.db
python init_db.py
```

### Clear Python Cache
```bash
find . -type d -name __pycache__ -exec rm -r {} +
find . -type f -name "*.pyc" -delete
```

---

## 📋 Environment Variables

### Create/Edit `.env`
```env
DEBUG=True
DATABASE_URL=sqlite:///./kriya_ai.db
SECRET_KEY=your-secret-key
SERVER_PORT=8000
```

---

## 🧪 Testing

### Run All Tests
```bash
pytest
```

### Run Specific Test File
```bash
pytest tests/test_auth.py
```

### Run with Verbose Output
```bash
pytest -v
```

### Run with Coverage
```bash
pytest --cov=app
```

---

## 📖 Documentation

| File | Content |
|------|---------|
| README.md | Overview & setup |
| SETUP.md | Detailed setup guide |
| API_GUIDE.md | Endpoint examples |
| DEPLOYMENT.md | Production setup |
| FEATURES.md | Complete features list |
| COMPLETION_SUMMARY.md | What's built |

---

## 🚀 Deployment Quick Steps

### Docker Production
```bash
docker build -t kriya_ai:latest .
docker run -d -p 8000:8000 kriya_ai:latest
```

### PostgreSQL Connection
```env
DATABASE_URL=postgresql://user:password@localhost:5432/kriya_ai
```

---

## 🔒 Security Checklist

Before production:
- [ ] Change `SECRET_KEY` in `.env`
- [ ] Set `DEBUG=False`
- [ ] Use PostgreSQL instead of SQLite
- [ ] Configure CORS origins
- [ ] Setup HTTPS/SSL
- [ ] Enable logging
- [ ] Review user roles
- [ ] Backup database setup

---

## 📊 API Endpoints Quick List

### Auth (5)
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- GET /api/auth/me
- PUT /api/auth/me

### Users (7)
- GET /api/users/
- POST, PUT, DELETE operations on users

### Inventory (8)
- GET /api/inventory/items
- POST /api/inventory/items
- GET /api/inventory/low-stock
- POST /api/inventory/movements
- GET /api/inventory/movements/{item_id}

### Predictions (8)
- GET /api/predictions/models
- POST /api/predictions/models
- POST /api/predictions/data
- GET /api/predictions/data/{id}
- POST /api/predictions/predict

### Analytics (7)
- GET /api/analytics/reports
- POST /api/analytics/reports
- GET /api/analytics/dashboard/summary
- GET /api/analytics/inventory/by-category
- GET /api/analytics/inventory/valuation

### System (4)
- GET / (root)
- GET /health
- GET /api/about
- GET /api/endpoints

---

## 💡 Tips

1. **Use Swagger UI** for interactive endpoint testing: http://localhost:8000/docs
2. **Save token** from login response for subsequent requests
3. **Use Makefile** for common commands: `make help`
4. **Check .env** for all configuration options
5. **Read docstrings** in code for detailed explanations
6. **Monitor logs** for errors and debugging

---

## ✅ Health Check

Test if server is running:
```bash
curl http://127.0.0.1:8000/health
```

Expected response:
```json
{"status":"ok","service":"KriyaAI","version":"1.0.0"}
```

---

## 📞 Need Help?

1. Check terminal for error messages
2. Review SETUP.md for installation issues
3. Review API_GUIDE.md for endpoint questions
4. Check DEPLOYMENT.md for production issues
5. Review code comments and docstrings

---

**Everything is ready! Start building! 🎉**
