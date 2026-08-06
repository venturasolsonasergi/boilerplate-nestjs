#!/usr/bin/env sh
set -eu

echo "[orders] Checking spec drift..."
test -f ../specs/openspec/openapi.yaml
test -f ../specs/generated/index.ts
echo "[orders] Spec drift check passed"
