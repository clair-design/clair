#!/bin/sh

set -e
export PATH=./node_modules/.bin:$PATH

# SEE https://stackoverflow.com/questions/192319
DIR_NAME=${0%/*}

echo '⏳ Start PostCSS bundling...'
# build clair.css
postcss --config postcss.config.js --map -o dist/clair.css src/styles/main.css
# minify clair.css to clair.min.css
cat dist/clair.css | postcss -u cssnano -m -o dist/clair.min.css
# build raw.css
postcss --config ${DIR_NAME}/raw  --map -o dist/clair.raw.css src/styles/main.css
echo '✅ PostCSS done.'
