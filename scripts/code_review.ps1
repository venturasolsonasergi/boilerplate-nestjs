$ErrorActionPreference = 'Stop'
pnpm lint
& "$PSScriptRoot\verify.ps1"
