#!/usr/bin/env powershell

Write-Host "=== CUDA Installation Verification ===" -ForegroundColor Green

# Check CUDA Compiler
Write-Host "`n1. Checking CUDA Compiler (nvcc):" -ForegroundColor Yellow
try {
    $nvccVersion = nvcc --version
    Write-Host "✅ CUDA Compiler found:" -ForegroundColor Green
    Write-Host $nvccVersion
} catch {
    Write-Host "❌ CUDA Compiler (nvcc) not found in PATH" -ForegroundColor Red
}

# Check Environment Variables
Write-Host "`n2. Checking Environment Variables:" -ForegroundColor Yellow
if ($env:CUDA_PATH) {
    Write-Host "✅ CUDA_PATH: $env:CUDA_PATH" -ForegroundColor Green
} else {
    Write-Host "❌ CUDA_PATH not set" -ForegroundColor Red
}

if ($env:PATH -match "cuda") {
    Write-Host "✅ CUDA found in PATH" -ForegroundColor Green
} else {
    Write-Host "❌ CUDA not found in PATH" -ForegroundColor Red
}

# Check CUDA Installation Directory
Write-Host "`n3. Checking Installation Directory:" -ForegroundColor Yellow
$cudaPath = "C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA"
if (Test-Path $cudaPath) {
    Write-Host "✅ CUDA installation directory exists: $cudaPath" -ForegroundColor Green
    $versions = Get-ChildItem $cudaPath -Directory | Select-Object -ExpandProperty Name
    Write-Host "   Installed versions: $($versions -join ', ')" -ForegroundColor Cyan
} else {
    Write-Host "❌ CUDA installation directory not found" -ForegroundColor Red
}

# Check GPU Driver
Write-Host "`n4. Checking GPU Driver:" -ForegroundColor Yellow
try {
    nvidia-smi | Select-String "CUDA Version"
    Write-Host "✅ GPU driver supports CUDA" -ForegroundColor Green
} catch {
    Write-Host "❌ nvidia-smi not available" -ForegroundColor Red
}

# Test simple CUDA compilation (if available)
Write-Host "`n5. Testing CUDA Compilation:" -ForegroundColor Yellow
$testCuda = @"
#include <stdio.h>
#include <cuda_runtime.h>

int main() {
    int deviceCount;
    cudaGetDeviceCount(&deviceCount);
    printf("CUDA devices found: %d\n", deviceCount);
    return 0;
}
"@

$tempFile = "$env:TEMP\test_cuda.cu"
$tempExe = "$env:TEMP\test_cuda.exe"

try {
    Set-Content -Path $tempFile -Value $testCuda
    nvcc $tempFile -o $tempExe
    if (Test-Path $tempExe) {
        Write-Host "✅ CUDA compilation successful" -ForegroundColor Green
        $result = & $tempExe
        Write-Host "   Result: $result" -ForegroundColor Cyan
        Remove-Item $tempExe -ErrorAction SilentlyContinue
    }
    Remove-Item $tempFile -ErrorAction SilentlyContinue
} catch {
    Write-Host "❌ CUDA compilation test failed" -ForegroundColor Red
}

Write-Host "`n=== Verification Complete ===" -ForegroundColor Green