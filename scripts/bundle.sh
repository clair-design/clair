#!/bin/sh
set -e
DIR_NAME=${0%/*}
export PATH=./node_modules/.bin:$PATH
export NODE_ENV=production

echo '✂️ Delete old files...'
rm -rf ./dist/*
echo '✅ Dist folder is cleaned.'

# rollup
${DIR_NAME}/rollup/rollup.sh
# postcss
${DIR_NAME}/postcss/postcss.sh
