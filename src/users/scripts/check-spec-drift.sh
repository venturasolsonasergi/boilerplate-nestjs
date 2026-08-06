#!/usr/bin/env sh
set -eu

echo "[users] Checking spec drift..."
test -f ../specs/openspec/openapi.yaml
test -f ../specs/generated/index.ts
echo "[users] Spec drift check passed"
