@echo off
echo ========================================
echo   Sea Horse Adventure - Auto Setup
echo ========================================
echo.

REM Check if PowerShell is available
powershell -ExecutionPolicy Bypass -File "%~dp0setup.ps1"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Setup failed. Please check the errors above.
    pause
    exit /b 1
)


