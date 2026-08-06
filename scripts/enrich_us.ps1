$ErrorActionPreference = 'Stop'
Write-Host 'enrich_us: collecting specification context'
& "$PSScriptRoot\generate-microservice-health-report.ps1"
