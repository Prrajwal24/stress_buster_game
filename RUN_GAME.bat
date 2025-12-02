@echo off
title Sea Horse Adventure Game
color 0A
echo.
echo ========================================
echo   Sea Horse Adventure Game
echo ========================================
echo.

REM Check for Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Go to: https://nodejs.org/
    echo 2. Download the LTS version
    echo 3. Run the installer
    echo 4. Restart this window
    echo 5. Run this file again
    echo.
    echo Opening Node.js website...
    start https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found!
node --version
npm --version
echo.

REM Check for dependencies
if not exist "node_modules" (
    echo Installing dependencies (first time only)...
    echo This may take a minute...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencies installed!
    echo.
) else (
    echo [OK] Dependencies already installed
    echo.
)

echo ========================================
echo   Starting Game Server...
echo ========================================
echo.
echo Server will be available at:
echo   http://localhost:8000
echo.
echo Open your browser and go to the URL above
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

call npm start

pause


