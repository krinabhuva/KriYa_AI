@echo off
REM KriyaAI Backend Startup Script for Windows

echo ======================================
echo  KriyaAI Backend - Windows Startup
echo ======================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install/upgrade dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Initialize database
echo Initializing database...
python init_db.py

REM Start the server
echo.
echo ======================================
echo  Starting KriyaAI Backend Server
echo ======================================
echo.
echo Server will be available at: http://127.0.0.1:8000
echo API Documentation: http://127.0.0.1:8000/docs
echo.

uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

pause
