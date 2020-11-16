#!/bin/bash
set -e

DIR_NAME=${0%/*}

make_scope() {
  str=$1
  arr=(${str//,/ })
  len=${#arr[*]}
  if [[ $len -gt 1 ]]; then
    echo @clair/{$1}
  else
    echo @clair/$1
  fi
}

prepare_internal_deps() {
  echo "Start building internal dependencies..."

  # 假定除了 vue/react 外其他包之间没有互相依赖
  deps=$(sh $DIR_NAME/deps.sh $1)
  bash $DIR_NAME/smarter-prepare.sh $deps
}

start_dev() {
  scope=$(make_scope $1)
  echo "Start developing $scope..."
  npx lerna run start \
    --stream \
    --parallel \
    --scope=$scope
}

type=$1
prebuild=0

read -p "Prebuild internal dependencies? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy1]$ ]]; then
  prebuild=1
fi

if [[ $type == "vue" ]] || [[ $type == "react" ]]; then
  [ $prebuild = "1" ] && prepare_internal_deps $type
  start_dev $type
else
  [ $prebuild = "1" ] && prepare_internal_deps vue,react
  start_dev vue,react
fi
