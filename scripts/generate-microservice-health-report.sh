#!/usr/bin/env sh
set -eu

REPORT_DIR="reports"
REPORT_FILE="$REPORT_DIR/microservice-health-report.md"
mkdir -p "$REPORT_DIR"

spec_status() {
  service="$1"
  if [ -f "src/$service/specs/openspec/openapi.yaml" ] && [ -f "src/$service/specs/generated/index.ts" ]; then
    echo "ok"
  else
    echo "missing"
  fi
}

domain_status() {
  service="$1"
  if [ -d "src/$service/domain" ] && [ "$(find "src/$service/domain" -type f | wc -l | tr -d ' ')" -gt 0 ]; then
    echo "ok"
  else
    echo "missing"
  fi
}

echo "# Microservice Health Report" > "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "Generated at: $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

for service in users orders; do
  echo "## $service" >> "$REPORT_FILE"
  echo "- spec: $(spec_status "$service")" >> "$REPORT_FILE"
  echo "- domain: $(domain_status "$service")" >> "$REPORT_FILE"
  if node architecture/validation-engine/check-dependencies.mjs >/dev/null 2>&1; then
    echo "- dependencies: ok" >> "$REPORT_FILE"
  else
    echo "- dependencies: failed" >> "$REPORT_FILE"
  fi
  if sh scripts/validate-architecture.sh >/dev/null 2>&1; then
    echo "- architecture validation: ok" >> "$REPORT_FILE"
  else
    echo "- architecture validation: failed" >> "$REPORT_FILE"
  fi
  echo "" >> "$REPORT_FILE"
done

echo "Report written to $REPORT_FILE"
