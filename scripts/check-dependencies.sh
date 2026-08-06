#!/usr/bin/env sh
set -eu

node architecture/validation-engine/generate-dependency-graph.mjs
node architecture/validation-engine/check-dependencies.mjs
