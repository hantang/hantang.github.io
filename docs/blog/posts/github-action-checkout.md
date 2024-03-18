---
title: GitHub Action之Checkout
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

主要解决`actions/checkout@v4`中可能拉取的分支不是最新的问题。

<!-- more -->

## 修正`checkout`最新提交

### 场景

网站部署，但是前置依赖有更新文档并自动提交git，结果网站发布的不是最新提交的（即没有包含git自动提交的内容）。

```yaml
# ...
jobs:
  process:
    permissions:
      contents: write
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: something ... # 这里执行执行同时自动提交
      - name: Git auto commit
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: Automated Change

  deploy:
    needs: process
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.ref }} # 这是改正后的，没有这个就是次新提交，和process阶段一样的版本
      - name: Latest git log
        run: git log -1 --pretty=format:"%h %s (%an, %ar)"

      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: "./site"
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 解决

增加`ref: ${{ github.ref }}`或者是分支名`ref: main`

```yaml
# 见 https://github.com/actions/checkout/issues/439#issuecomment-1464126822
- name: Checkout
  uses: actions/checkout@v4
  with:
    ref: ${{ github.ref }}
```

### 参考

- [checkout@v2 not getting recent commits #439](https://github.com/actions/checkout/issues/439)
