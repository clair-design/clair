## 一些有用的脚本

请先安装 `commitizen`，commit 代码时使用 `git cz` 命令替代 `git commit`：

```
npm install -g commitizen
```

注意：`v0.4.0` 之后的版本开发时，请删除本地代码后重新 clone 代码，或执行如下命令：

```bash
git fetch --all && git reset --hard origin/master && git pull
```

建议 fork 代码后，通过 Pull Request 提交代码。

Fork 仓库与源仓库同步代码，请参考[此文](https://www.zhihu.com/question/28676261)，或直接执行 scripts/sync-upstream.sh。
