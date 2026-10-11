@echo off
title KisanVision AI - Application Launcher
echo ============================================================
echo   KisanVision AI - Starting Backend and Frontend Servers
echo ============================================================
echo.

:: Check for virtual environment
if not exist "venv\Scripts\python.exe" (
    echo [ERROR] Virtual environment not found at .\venv\
    echo Please create it first: python -m venv venv
    pause
    exit /b 1
)

:: Check for node_modules
if not exist "frontend\node_modules" (
    echo [INFO] Installing frontend dependencies...
    cd frontend && npm.cmd install && cd ..
)

echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "KisanVision Backend" cmd /k "title KisanVision Backend && venv\Scripts\python.exe -m uvicorn ai_api.api:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Starting React Frontend on http://localhost:3000 ...
start "KisanVision Frontend" cmd /k "title KisanVision Frontend && cd frontend && npm.cmd start"

echo.
echo ============================================================
echo   Both services are launching in separate windows!
echo   Frontend : http://localhost:3000
echo   Backend  : http://127.0.0.1:8000
echo   API Docs : http://127.0.0.1:8000/docs
echo ============================================================
echo.
pause
