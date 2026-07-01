@echo off
setlocal
cd /d "%~dp0"

echo MIRRORME development server reset
echo.
set "NODE_DIR=C:\Program Files\nodejs"
set "PATH=%NODE_DIR%;%PATH%"

if not exist "%NODE_DIR%\node.exe" (
  echo Node.js was not found at "%NODE_DIR%\node.exe".
  echo Please install Node.js LTS, then run this file again.
  pause
  exit /b 1
)

if not exist "%NODE_DIR%\npm.cmd" (
  echo npm was not found at "%NODE_DIR%\npm.cmd".
  echo Please reinstall Node.js LTS, then run this file again.
  pause
  exit /b 1
)

echo Stopping old server on port 3000 if it exists...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
  taskkill /PID %%a /F >nul 2>nul
)

echo Stopping old server on port 3001 if it exists...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001" ^| findstr "LISTENING"') do (
  taskkill /PID %%a /F >nul 2>nul
)

echo.
echo Building a fresh preview...
call "%NODE_DIR%\npm.cmd" run build
if errorlevel 1 (
  echo.
  echo Build failed. Please send this screen to Codex.
  pause
  exit /b 1
)

echo.
echo Starting MIRRORME preview on http://localhost:3000
echo Keep this window open while checking the site.
echo.
call "%NODE_DIR%\npm.cmd" run start -- -p 3000

echo.
echo The server stopped or failed to start.
pause
