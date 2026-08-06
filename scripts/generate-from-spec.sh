#!/usr/bin/env sh
set -eu

( cd src/users/scripts && sh ./generate-from-spec.sh )
( cd src/orders/scripts && sh ./generate-from-spec.sh )
