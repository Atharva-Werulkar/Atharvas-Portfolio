@echo off
echo Starting Portfolio Development Environment...
echo.

echo Starting Backend Server...
cd server
start "Portfolio Server" cmd /k "npm run dev"
cd ..

echo.
echo Waiting 3 seconds for server to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Client...
start "Portfolio Client" cmd /k "npm run dev"

echo.
echo Development environment started!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:8080
echo.
echo Press any key to exit...
pause > nul
