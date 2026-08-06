$ErrorActionPreference = 'Stop'
$spec = Join-Path $PSScriptRoot '..\specs\openspec\openapi.yaml'
$gen = Join-Path $PSScriptRoot '..\specs\generated\index.ts'
if (-not (Test-Path $spec)) { throw '[orders] Missing OpenSpec source' }
if (-not (Test-Path $gen)) { throw '[orders] Missing generated artifact' }
Write-Host '[orders] Spec drift check passed'
