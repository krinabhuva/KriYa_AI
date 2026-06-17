@echo off
REM ========================================
REM  KriyaAI - Start Full Application
REM  Backend (FastAPI) + Frontend (Vite)
REM ========================================

echo.
echo  =============================================
echo   KriyaAI - Starting Full Application
echo  =============================================
echo.

REM --- Start Backend in a new window ---
echo [1/2] Starting Backend Server (port 8000)...
start "KriyaAI Backend" cmd /k "cd /d d:\KriYa_AI\backend && call venv\Scripts\activate.bat && uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

REM Give backend 3 seconds to boot up
timeout /t 3 /noq >nul

REM --- Start Frontend in a new window ---
echo [2/2] Starting Frontend Dev Server (port 3000)...
start "KriyaAI Frontend" cmd /k "cd /d d:\KriYa_AI\frontend && npm run dev"

echo.
echo  =============================================
echo   Both servers are starting!
echo  =============================================
echo.
echo   Backend:  http://127.0.0.1:8000
echo   API Docs: http://127.0.0.1:8000/docs
echo   Frontend: http://localhost:3000
echo.
echo   Login Credentials:
echo   ------------------
echo   Admin:   admin / admin123
echo   Analyst: analyst / analyst123
echo   Viewer:  viewer / viewer123
echo.
echo   You can close this window. The servers
echo   run in their own windows.
echo  =============================================
echo.
pause
