#!/bin/sh
set -e
msg="Running \`git pull\` before start is a good habit."
echo "\033[33m${msg}\033[0m"
echo ""
git pull

DIR_NAME=${0%/*}

while true; do
  read -p "Do you want to sync local repo with upstream?" yn
  case $yn in
    [Yy]* ) ${DIR_NAME}/sync-upstream.sh; break;;
    [Nn]* ) exit;;
    * ) echo "Please answer yes or no.";;
  esac
done
