#!/usr/bin/env sh
set -eu

echo "[users] Generating artifacts from OpenSpec..."
mkdir -p ../specs/generated
printf "// generated at %s\n" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > ../specs/generated/index.ts
echo "[users] Generation completed"
