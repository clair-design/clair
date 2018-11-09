#!/bin/bash
version=$1

replace () {
  file=$1
  echo "Writing version to: $file"
  # SEE https://stackoverflow.com/questions/16745988
  sed -i.bak "s/__RELEASE__VERSION__/$version/g" $file
  rm ${file}.bak
}

if [[ -z $version ]]; then
  echo "Incorrect Usage: version not specified!"
  exit 2
else
  for file in $(ls dist/*.js)
  do
    replace $file
  done
fi
