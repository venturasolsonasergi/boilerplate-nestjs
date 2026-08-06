#!/usr/bin/env sh
set -eu

echo "apply: applying generated artifacts and checks"
sh ./scripts/generate-from-spec.sh
sh ./scripts/check-dependencies.sh
