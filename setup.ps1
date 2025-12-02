# Sea Horse Game - Automated Setup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Sea Horse Adventure - Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
$nodeInstalled = $false
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "Node.js found: $nodeVersion" -ForegroundColor Green
        $nodeInstalled = $true
    }
} catch {
    $nodeInstalled = $false
}

# If Node.js is not installed, try to install it
if (-not $nodeInstalled) {
    Write-Host "Node.js not found. Attempting to install..." -ForegroundColor Yellow
    Write-Host ""
    
    # Check for winget
    $wingetAvailable = $false
    try {
        $wingetCheck = winget --version 2>$null
        if ($wingetCheck) {
            $wingetAvailable = $true
            Write-Host "Found winget. Installing Node.js..." -ForegroundColor Yellow
            Write-Host "Please accept the license agreement when prompted..." -ForegroundColor Yellow
            Start-Process -FilePath "winget" -ArgumentList "install","OpenJS.NodeJS.LTS","--silent","--accept-package-agreements","--accept-source-agreements" -Wait -NoNewWindow
            Write-Host "Waiting for installation to complete..." -ForegroundColor Yellow
            Start-Sleep -Seconds 5
            
            # Refresh PATH
            $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
            
            # Check again
            try {
                $nodeVersion = node --version 2>$null
                if ($nodeVersion) {
                    Write-Host "Node.js installed successfully: $nodeVersion" -ForegroundColor Green
                    $nodeInstalled = $true
                }
            } catch {
                Write-Host "Node.js may need a terminal restart. Please close and reopen this terminal, then run this script again." -ForegroundColor Yellow
                Write-Host ""
                Write-Host "Or install manually from: https://nodejs.org/" -ForegroundColor Yellow
                exit 1
            }
        }
    } catch {
        $wingetAvailable = $false
    }
    
    if (-not $wingetAvailable -or -not $nodeInstalled) {
        Write-Host ""
        Write-Host "Could not automatically install Node.js." -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install Node.js manually:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://nodejs.org/" -ForegroundColor White
        Write-Host "2. Download the LTS version" -ForegroundColor White
        Write-Host "3. Run the installer" -ForegroundColor White
        Write-Host "4. Restart this terminal" -ForegroundColor White
        Write-Host "5. Run this script again" -ForegroundColor White
        Write-Host ""
        Write-Host "Opening Node.js download page..."
        Start-Process "https://nodejs.org/"
        Read-Host "Press Enter to continue after installing Node.js"
        exit 1
    }
}

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "Dependencies already installed. Skipping..." -ForegroundColor Gray
} else {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "Dependencies installed successfully" -ForegroundColor Green
}

# Start server
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server will be available at: http://localhost:8000" -ForegroundColor Green
Write-Host "Open your browser and navigate to the URL above" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm start
