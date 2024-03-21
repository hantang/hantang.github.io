---
title: Git仓库重置历史提交者和邮箱
date: 2024-03-17T22:45:26
draft: false
authors:
  - hantang
categories:
  - tech
tags:
  - github
comments: true
---

主要解决Git修改用户名，将历史提交中提交者的名字和邮箱也一并修改。

<!-- more -->

## 记录

### 准备

查看日志中已有的用户名和邮箱

```shell
# %aN -> name, %aE -> email
git log --format='%aN <%aE>' | sort -u
```

几种方式：都会修改提交的commit-id。

### `git filter-branch` 方式

``` shell
#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="your-new-name"
CORRECT_EMAIL="your-new-email@example.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

### `git-filter-repo`方式

需要先安装git-filter-repo。
参见<https://github.com/newren/git-filter-repo>

!!! warning 注意点

    这个会清空远程仓库信息，需要重新添加。

* 远程仓库地址恢复

```shell
URL=$(git remote get-url origin)
# 清理……
git remote add origin $URL
git push --all --force
```

* 修改步骤

```shell
# 修改邮箱
git filter-repo --email-callback '
    if email in [
        b"your-old-email@example.com",
        b"your-old-email2@example.com",
    ]:
        return b"your-new-email@example.com"
    else:
        return email
'

# 非英文的字符需要使用 .encode('utf-8')
# 修改用户名
git filter-repo --name-callback '
    if name in ["旧的名字".encode("utf-8"), b"old-name"]:
        return b"new-name"
    else:
        return name
'
```
