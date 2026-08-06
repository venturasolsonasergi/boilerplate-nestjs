$ErrorActionPreference = 'Stop'
$archiveDir = Join-Path $PSScriptRoot '..\archive'
New-Item -ItemType Directory -Force -Path $archiveDir | Out-Null
$target = Join-Path $archiveDir ("architecture-" + (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ'))
Copy-Item -Path (Join-Path $PSScriptRoot '..\architecture') -Destination $target -Recurse
Write-Host 'archive completed'
