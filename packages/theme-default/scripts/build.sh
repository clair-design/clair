#!/bin/bash
set -e

work_dir=.

files=$(
  cd styles && find . -maxdepth 1 -type f |\
    awk -F '/' '{print $2 }' |\
    grep -v '^_' |\
    grep 'scss$' |\
    sed 's/\.scss$//' |\
    xargs -I {} echo "${work_dir}/styles/{}.scss:${work_dir}/dist/{}.css"
  )

# compiled version
eval `npx sass --no-source-map $files`
npx postcss dist/*.css --no-map --dir dist

