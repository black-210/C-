#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CGT="$ROOT_DIR/bin/cgt"

echo "=== Running All C> Examples ==="

for example in "$ROOT_DIR"/examples/*.cgt; do
    fname=$(basename "$example")
    echo -n "Testing $fname... "
    "$CGT" "$example" -r > /tmp/cgt_example_out.log 2>&1
    echo "OK"
done

echo -n "Testing translator/cgt_self_translator.cgt... "
"$CGT" "$ROOT_DIR/translator/cgt_self_translator.cgt" -r > /tmp/cgt_self_trans.log 2>&1
echo "OK"

echo "=== All C> Examples and Self-Translator Compiled and Ran Successfully! ==="
