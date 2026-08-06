#!/usr/bin/env sh
set -eu

mkdir -p archive
cp -R architecture archive/architecture-$(date -u +%Y%m%dT%H%M%SZ)
echo "archive completed"
