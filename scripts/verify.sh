#!/usr/bin/env sh
set -eu

sh ./scripts/validate-architecture.sh
sh ./scripts/validate-domain-purity.sh
sh ./scripts/check-domain-invariants.sh
sh ./scripts/run-contract-tests.sh
