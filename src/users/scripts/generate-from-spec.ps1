$ErrorActionPreference = 'Stop'
Write-Host '[users] Generating artifacts from OpenSpec...'
$generated = Join-Path $PSScriptRoot '..\specs\generated\index.ts'
$timestamp = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
"// generated at $timestamp" | Set-Content -Path $generated -Encoding utf8
Write-Host '[users] Generation completed'
