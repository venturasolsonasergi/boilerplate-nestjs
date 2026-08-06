$ErrorActionPreference = 'Stop'
& "$PSScriptRoot\validate-architecture.ps1"
& "$PSScriptRoot\validate-domain-purity.ps1"
& "$PSScriptRoot\check-domain-invariants.ps1"
& "$PSScriptRoot\run-contract-tests.ps1"
