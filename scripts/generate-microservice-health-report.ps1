$ErrorActionPreference = 'Stop'
$reportDir = Join-Path $PSScriptRoot '..\reports'
$reportFile = Join-Path $reportDir 'microservice-health-report.md'
New-Item -ItemType Directory -Force -Path $reportDir | Out-Null

function Get-SpecStatus([string]$service) {
  $spec = Join-Path $PSScriptRoot "..\src\$service\specs\openspec\openapi.yaml"
  $gen = Join-Path $PSScriptRoot "..\src\$service\specs\generated\index.ts"
  if ((Test-Path $spec) -and (Test-Path $gen)) { return 'ok' }
  return 'missing'
}

function Get-DomainStatus([string]$service) {
  $domain = Join-Path $PSScriptRoot "..\src\$service\domain"
  if (-not (Test-Path $domain)) { return 'missing' }
  $files = Get-ChildItem -Path $domain -Recurse -File -ErrorAction SilentlyContinue
  if ($files.Count -gt 0) { return 'ok' }
  return 'missing'
}

$lines = @()
$lines += '# Microservice Health Report'
$lines += ''
$lines += "Generated at: $((Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ'))"
$lines += ''

foreach ($service in @('users', 'orders')) {
  $lines += "## $service"
  $lines += "- spec: $(Get-SpecStatus $service)"
  $lines += "- domain: $(Get-DomainStatus $service)"

  node architecture/validation-engine/check-dependencies.mjs *> $null
  if ($LASTEXITCODE -eq 0) { $lines += '- dependencies: ok' } else { $lines += '- dependencies: failed' }

  node architecture/validation-engine/generate-dependency-graph.mjs *> $null
  node architecture/validation-engine/check-dependencies.mjs *> $null
  if ($LASTEXITCODE -eq 0) { $lines += '- architecture validation: ok' } else { $lines += '- architecture validation: failed' }

  $lines += ''
}

$lines | Set-Content -Path $reportFile -Encoding utf8
Write-Host "Report written to $reportFile"
