#!/bin/sh

set -e

DIR_NAME=${0%/*}

get_deps() {
  pkg=$DIR_NAME/../packages/$1/package.json

  if [[ -f $pkg ]]; then
    grep "^[[:space:]]*\"@clair\/" $pkg | awk -F '"|\/' '{print $3}'
  fi
}

run() {
  deps=$1
  result=""
  for var in "${deps//,/ }"; do
    result=$(echo $result $(get_deps $var))
  done

  echo $result | uniq
}

run $1
