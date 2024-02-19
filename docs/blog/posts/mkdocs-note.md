---
title: MkDocs 札记
date: 2024-02-18T22:55:17
draft: true
authors: 
  - hantang
categories:
  - tech
tags:
  - mkdocs
  - blog
description: mkdocs note
comments: true
# hide: [navigation, toc, footer, feedback]
# slug:
# icon:
# readtime:
# links:
---

> MkDocs 札记：记录建站过程中参考的资料和解决的问题。

<!-- more -->

# MkDocs 札记

## 文档和资源

- [MkDocs](https://www.mkdocs.org): Project documentation with Markdown.
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/): a powerful documentation framework (theme) on top of MkDocs
- [github.com, mkdocs/catalog](https://github.com/mkdocs/catalog): awesome MkDocs projects and plugins

## 示例


!!! note "Considering a pull request"

    Before deciding to spend effort on making changes and creating a pull
    request, please discuss what you intend to do. If you are responding to


``` mermaid
sequenceDiagram
  autonumber

  participant mkdocs-material
  participant PR
  participant fork
  participant local

  mkdocs-material ->> fork: fork on GitHub
  fork ->> local: clone to local
  local ->> local: branch
  loop prepare
    loop push
      loop edit
        local ->> local: commit
      end
      local ->> fork: push
    end
    mkdocs-material ->> fork: merge in any changes
    fork ->>+ PR: create draft PR
    PR ->> PR: review your changes
  end
```


## 增强

### 评论系统

`Giscus`参考资料：

- [Material for MkDocs: Adding a comment system](https://squidfunk.github.io/mkdocs-material/setup/adding-a-comment-system/)
- [Giscus](https://giscus.app/)
