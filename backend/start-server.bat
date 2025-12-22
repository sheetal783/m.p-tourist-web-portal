@echo off
echo Starting Backend Server...
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Checking dependencies...
call npm list --depth=0 >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies...
    call npm install
)
echo.
echo Starting server...
call npm run dev
pause



