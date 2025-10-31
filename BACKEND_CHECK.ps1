# Backend Health Check Script
Write-Host "🔍 Checking Backend Status..." -ForegroundColor Cyan
Write-Host ""

# Check if port 5000 is in use
Write-Host "1. Checking if port 5000 is in use..." -ForegroundColor Yellow
$port5000 = netstat -ano | findstr ":5000"
if ($port5000) {
    Write-Host "✅ Port 5000 is being used" -ForegroundColor Green
    Write-Host $port5000
} else {
    Write-Host "❌ Port 5000 is NOT in use - Backend NOT running!" -ForegroundColor Red
    Write-Host "   Please start backend with: cd backend && npm run dev" -ForegroundColor Yellow
}
Write-Host ""

# Check PostgreSQL
Write-Host "2. Checking if PostgreSQL is running..." -ForegroundColor Yellow
$postgres = Get-Service -Name "*postgresql*" -ErrorAction SilentlyContinue
if ($postgres) {
    Write-Host "✅ PostgreSQL service found: $($postgres.Status)" -ForegroundColor Green
    if ($postgres.Status -ne "Running") {
        Write-Host "⚠️  PostgreSQL is not running! Please start it." -ForegroundColor Red
    }
} else {
    Write-Host "❌ PostgreSQL service not found" -ForegroundColor Red
}
Write-Host ""

# Try to connect to backend
Write-Host "3. Trying to connect to http://localhost:5000 ..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Backend is responding!" -ForegroundColor Green
    Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Cyan
    Write-Host "   Response: $($response.Content)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Backend is NOT responding!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Please check backend console for errors." -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Yellow
Write-Host "- If backend NOT running → cd backend && npm run dev" -ForegroundColor White
Write-Host "- If PostgreSQL NOT running → Start PostgreSQL service" -ForegroundColor White
Write-Host "- After starting → Run this script again" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan

