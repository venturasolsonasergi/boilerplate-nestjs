#!/usr/bin/env sh
set -eu

echo "enrich_us: collecting specification context"
sh ./scripts/generate-microservice-health-report.sh
