# Makefile for KriyaAI Backend

.PHONY: help venv install install-dev run test clean lint format docker-build docker-run docker-stop db-init

help:
	@echo "KriyaAI Backend - Available Commands"
	@echo "===================================="
	@echo "make venv           - Create virtual environment"
	@echo "make install        - Install dependencies"
	@echo "make install-dev    - Install dev dependencies"
	@echo "make run            - Run development server"
	@echo "make test           - Run tests"
	@echo "make clean          - Clean up cache and temp files"
	@echo "make lint           - Run linting checks"
	@echo "make format         - Format code with black"
	@echo "make db-init        - Initialize database with sample data"
	@echo "make docker-build   - Build Docker image"
	@echo "make docker-run     - Run with Docker Compose"
	@echo "make docker-stop    - Stop Docker containers"

venv:
	python -m venv venv

install:
	pip install -r requirements.txt

install-dev:
	pip install -r requirements.txt
	pip install pytest pytest-asyncio black flake8 isort

run:
	python init_db.py
	uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

test:
	pytest -v

clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
	find . -type d -name ".pytest_cache" -delete
	rm -rf .coverage htmlcov dist build *.egg-info

lint:
	flake8 app tests --exclude __pycache__

format:
	black app tests --line-length=100
	isort app tests

db-init:
	python init_db.py

docker-build:
	docker build -t kriya_ai_backend:latest .

docker-run:
	docker-compose up -d

docker-stop:
	docker-compose down
