$ErrorActionPreference = 'Stop'
$spec = Join-Path $PSScriptRoot '..\specs\openspec\openapi.yaml'
$gen = Join-Path $PSScriptRoot '..\specs\generated\index.ts'
if (-not (Test-Path $spec)) { throw '[users] Missing OpenSpec source' }
if (-not (Test-Path $gen)) { throw '[users] Missing generated artifact' }
Write-Host '[users] Spec drift check passed'
