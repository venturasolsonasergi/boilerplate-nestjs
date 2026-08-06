$ErrorActionPreference = 'Stop'
Write-Host 'propose: preparing proposed changes from specs'
& "$PSScriptRoot\generate-from-spec.ps1"
