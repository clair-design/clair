#!/bin/sh

set -e

DIR_NAME=${0%/*}
CACHE_DIR=${DIR_NAME}/../node_modules/.build_cache

mkdir -p $CACHE_DIR

LOCAL_COMMIT_ID_HEAD=$(git rev-parse HEAD)

check_project() {
  if [[ -z $1 ]]; then
    exit
  fi

  cache=$CACHE_DIR/$1
  project_path=${DIR_NAME}/../packages/$1

  if [[ ! -d $project_path ]]; then
    echo "Project does not exist: packages/$1"
    exit
  fi

  if [[ -f $cache ]]; then
    commit_id_on_last_build=$(cat $cache)

    if [[ ! -d $project_path/dist ]]; then
      dist_removed="1"
    fi

    uncommitted_changes=$(git status -s $project_path)

    if [[ $commit_id_on_last_build == $LOCAL_COMMIT_ID_HEAD ]]; then
      is_same_commit="1"
    fi

    # 同一个 commit、dist 存在、且没有未提交的更改
    if [[ -n $is_same_commit && -z $dist_removed ]]; then
      if [[ -z "$uncommitted_changes" && -d $project_path/dist ]]; then
        echo 'Project unchanged since last build:' $1
        exit
      fi
    fi

    # 不同版本之间没有变化、dist 存在、且没有未提交的更改
    if [[ -z "$uncommitted_changes" && -z "$dist_removed" ]]; then
      changed_accross_version=$(git diff --name-only $commit_id_on_last_build $LOCAL_COMMIT_ID_HEAD $project_path)

      if [ -z "$changed_accross_version" ]; then
        echo 'Project unchanged:' $1
        exit
      fi
    fi
  fi

  touch $cache
}

join() {
  local IFS="$1"
  shift
  echo "$*"
}

make_scope() {
  case ${#@} in
  0)
    exit
    ;;
  1)
    echo "@clair/$1"
    ;;
  *)
    str=$(join , $@)
    echo "@clair/{$str}"
    ;;
  esac
}

build_project_done() {
  cache=$CACHE_DIR/$1
  echo $LOCAL_COMMIT_ID_HEAD >$cache
  echo $1 'build DONE'
}

array=()

for var in "$@"; do
  result=$(check_project $var)

  if [[ -z $result ]]; then
    array+=("$var")
  fi
done

scope=$(make_scope ${array[@]})

if [[ -n $scope ]]; then
  npx lerna run build --stream --parallel --scope=$(make_scope ${array[@]})

  for var in "${array[@]}"; do
    build_project_done $var
  done
else
  # echo 'Skip'
  echo
fi
