#!/bin/sh
set -e
export PATH=./node_modules/.bin:$PATH

# SEE https://stackoverflow.com/questions/192319
DIR_NAME=${0%/*}

echo '⏳ Start rolling up JavaScript...'
rollup -c ${DIR_NAME}/config.js
echo '✅ Rollup done.'
