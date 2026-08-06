$ErrorActionPreference = 'Stop'
Write-Host 'apply: applying generated artifacts and checks'
& "$PSScriptRoot\generate-from-spec.ps1"
& "$PSScriptRoot\check-dependencies.ps1"
