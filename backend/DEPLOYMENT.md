# Deployment Guide for KriyaAI Backend

Complete guide for deploying KriyaAI Backend to production.

## Pre-Deployment Checklist

- [ ] Update `SECRET_KEY` in `.env` to a strong random value
- [ ] Set `DEBUG=False`
- [ ] Switch to PostgreSQL database
- [ ] Configure CORS origins for frontend URL
- [ ] Set up proper logging
- [ ] Run all tests: `pytest`
- [ ] Review security settings
- [ ] Backup database setup
- [ ] Plan monitoring and alerts

## Environment Setup

### 1. Generate Strong Secret Key

```python
# Run this in Python:
import secrets
print(secrets.token_urlsafe(32))
```

Add to `.env`:
```
SECRET_KEY=your_generated_secret_key_here
```

### 2. Production Environment Variables

```env
DEBUG=False
SERVER_HOST=0.0.0.0
SERVER_PORT=8000

# Database - Use PostgreSQL
DATABASE_URL=postgresql://user:password@db_host:5432/kriya_ai
DB_ECHO=False

# Security
SECRET_KEY=your_strong_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS - Set to your frontend domain
CORS_ORIGINS=["https://yourdomain.com","https://www.yourdomain.com"]

# File Upload
UPLOAD_DIR=/var/kriya_ai/uploads
MAX_UPLOAD_SIZE=52428800
```

## Deployment Options

### Option 1: Docker & Docker Compose (Recommended)

#### Build Image

```bash
docker build -t kriya_ai_backend:1.0.0 .
```

#### Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: kriya_ai_db_prod
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: kriya_ai
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: kriya_ai_backend:1.0.0
    container_name: kriya_ai_backend_prod
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/kriya_ai
      DEBUG: "False"
      SECRET_KEY: ${SECRET_KEY}
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - uploads:/app/uploads
    restart: always

  nginx:
    image: nginx:latest
    container_name: kriya_ai_nginx_prod
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
    restart: always

volumes:
  postgres_data:
  uploads:
```

#### Start Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Option 2: Gunicorn + Nginx

#### 1. Install Gunicorn

```bash
pip install gunicorn
```

#### 2. Create Gunicorn Config

`gunicorn_config.py`:
```python
import multiprocessing

bind = "127.0.0.1:8000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"
max_requests = 1000
max_requests_jitter = 50
timeout = 120
preload_app = True
```

#### 3. Start Gunicorn

```bash
gunicorn -c gunicorn_config.py app.main:app
```

#### 4. Nginx Configuration

`nginx.conf`:
```nginx
upstream kriya_api {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    client_max_body_size 50M;
    
    location / {
        proxy_pass http://kriya_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Option 3: Cloud Deployment

#### AWS (Elastic Beanstalk)

1. Install AWS CLI
2. Configure credentials: `aws configure`
3. Initialize EB: `eb init`
4. Deploy: `eb create kriya-ai-prod && eb deploy`

#### Heroku

```bash
heroku login
heroku create kriya-ai-backend
git push heroku main
```

## Database Setup

### PostgreSQL Production Setup

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE kriya_ai;
CREATE USER kriya_user WITH PASSWORD 'strong_password_here';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE kriya_ai TO kriya_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO kriya_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO kriya_user;

# Connect as new user to verify
psql -U kriya_user -d kriya_ai -h localhost
```

### Database Backups

```bash
# Backup database
pg_dump -U kriya_user -d kriya_ai -h localhost > backup.sql

# Restore database
psql -U kriya_user -d kriya_ai -h localhost < backup.sql
```

## SSL/TLS Certificate

### Using Let's Encrypt with Certbot

```bash
# Install certbot
apt-get install certbot python3-certbot-nginx

# Get certificate
certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Update Nginx config to use SSL
```

Updated `nginx.conf`:
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # Rest of configuration...
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## Monitoring

### Logging Setup

```python
# In app/main.py
import logging
from pythonjsonlogger import jsonlogger

# Configure JSON logging
handler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
handler.setFormatter(formatter)
logger = logging.getLogger()
logger.addHandler(handler)
```

### Health Monitoring

```bash
# Check service status
curl https://yourdomain.com/health

# Monitor with uptime services
# - UptimeRobot
# - Pingdom
# - StatusCake
```

## Performance Optimization

### 1. Database Connection Pool

In `database.py`:
```python
from sqlalchemy.pool import QueuePool

engine = create_engine(
    settings.database_url,
    poolclass=QueuePool,
    pool_size=20,
    max_overflow=40,
)
```

### 2. Caching

Add Redis for caching:
```bash
pip install redis aioredis
```

### 3. Rate Limiting

Add rate limiting:
```bash
pip install slowapi
```

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.get("/api/endpoint")
@limiter.limit("100/minute")
async def endpoint():
    pass
```

## Security Hardening

### 1. Security Headers

Add to `nginx.conf`:
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

### 2. CORS Configuration

In `.env`:
```
CORS_ORIGINS=["https://yourdomain.com"]
```

### 3. Rate Limiting

Already included in code above.

### 4. SQL Injection Prevention

Using SQLAlchemy ORM (already in place) prevents SQL injection.

## Health Checks & Alerts

### Automated Monitoring

```bash
# Using Prometheus
pip install prometheus-client

# Using Sentry for error tracking
pip install sentry-sdk
```

### Alerting

Set up alerts for:
- CPU usage > 80%
- Memory usage > 85%
- Database connection failures
- API response time > 1 second
- Error rate > 1%

## Scaling

### Horizontal Scaling

With Docker:
```bash
docker-compose up -d --scale backend=3
```

With load balancer (Nginx):
```nginx
upstream kriya_api {
    server backend1:8000;
    server backend2:8000;
    server backend3:8000;
}
```

## Maintenance

### Regular Tasks

- **Daily**: Monitor logs and health status
- **Weekly**: Run backups, review performance metrics
- **Monthly**: Update dependencies, security patches
- **Quarterly**: Review and optimize database indexes

### Zero-Downtime Deployment

```bash
# 1. Build new image
docker build -t kriya_ai_backend:v2.0.0 .

# 2. Update docker-compose.yml with new version

# 3. Deploy (Docker handles zero-downtime)
docker-compose up -d

# 4. Verify
curl https://yourdomain.com/health
```

## Troubleshooting

### High Memory Usage

```bash
# Monitor process
docker stats kriya_ai_backend_prod

# Restart container
docker restart kriya_ai_backend_prod
```

### Database Connection Issues

```bash
# Test database connection
psql -U kriya_user -d kriya_ai -h db_host -c "SELECT 1"

# Check connection pool
# In database.py, review pool settings
```

### Slow API Responses

```bash
# Add database query logging
DB_ECHO=True

# Review slow queries
# Use database indexes
```

## Rollback Plan

Keep previous version:
```bash
# Tag images
docker tag kriya_ai_backend:1.0.0 kriya_ai_backend:1.0.0-backup
docker tag kriya_ai_backend:v2.0.0 kriya_ai_backend:latest

# Rollback if needed
docker-compose down
docker-compose up -d  # Uses 1.0.0-backup
```

---

**Deployment completed! Monitor and maintain regularly.**
