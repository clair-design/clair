#!/bin/sh
set -e
msg="Running \`git pull\` before start is a good habit."
echo "\033[33m${msg}\033[0m"
echo ""
git pull
