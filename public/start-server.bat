@echo off
chcp 65001 >nul
echo ========================================================
echo   KHỞI ĐỘNG SERVER HỆ THỐNG QUẢN LÝ SINH VIÊN
echo ========================================================
echo Đang kiểm tra và biên dịch Server.java...

javac -encoding UTF-8 "%~dp0Server.java"
if %errorlevel% neq 0 (
    echo [Lỗi] Biên dịch thất bại. Mở trực tiếp index.html bằng trình duyệt...
    start "" "%~dp0index.html"
    pause
    exit /b
)

echo Đang chạy Server tại http://localhost:8080 ...
java -cp "%~dp0." Server
pause
