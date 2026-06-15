# KriYaAI Backend (FastAPI)

This is a minimal FastAPI scaffold for local development.

Run locally:

```bash
cd backend
python3 -m pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Endpoints:
- `GET /health` - health check
- `GET /api/about` - basic about info

CORS is configured to allow the frontend dev server at `http://localhost:3000`.
