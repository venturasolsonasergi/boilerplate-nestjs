#!/usr/bin/env sh
set -eu

pnpm jest src/users/tests --runInBand
