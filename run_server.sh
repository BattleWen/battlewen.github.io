#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"

echo "Starting Jekyll at http://127.0.0.1:4000"

exec bundle _2.2.22_ exec jekyll serve --livereload --host 127.0.0.1 --port 4000
