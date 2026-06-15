#!/bin/bash

# KriyaAI Backend Startup Script for Unix/Linux/Mac

echo "======================================"
echo " KriyaAI Backend - Unix Startup"
echo "======================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install/upgrade dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Initialize database
echo "Initializing database..."
python init_db.py

# Start the server
echo ""
echo "======================================"
echo " Starting KriyaAI Backend Server"
echo "======================================"
echo ""
echo "Server will be available at: http://127.0.0.1:8000"
echo "API Documentation: http://127.0.0.1:8000/docs"
echo ""

uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
