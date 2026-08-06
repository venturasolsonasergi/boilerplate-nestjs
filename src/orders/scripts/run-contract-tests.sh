#!/usr/bin/env sh
set -eu

pnpm jest src/orders/tests --runInBand
