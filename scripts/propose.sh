#!/usr/bin/env sh
set -eu

echo "propose: preparing proposed changes from specs"
sh ./scripts/generate-from-spec.sh
