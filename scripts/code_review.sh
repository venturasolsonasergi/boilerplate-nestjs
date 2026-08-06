#!/usr/bin/env sh
set -eu

pnpm lint
sh ./scripts/verify.sh
