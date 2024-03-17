---
title: MkDocs（Material）配置表格
date: 2024-03-17T21:34:40
draft: false
authors:
  - hantang
categories:
  - tech
tags:
  - mkdocs
comments: true
---

记录mkdocs中实现（优化）表格排序和搜索。原先采用官方文档提供的`tablesort.js`，后来自己该用`datatables`库，可是实现排序，分页和搜索。整体改动不大。

<!-- more -->

## 表格：排序和搜索

Material for Mkdocs 文档参考：

- [从文件导入表格 Import table from file](https://squidfunk.github.io/mkdocs-material/reference/data-tables/?h=table#import-table-from-file): 插件`mkdocs-table-reader-plugin`
- [可排序表格 Sortable tables](https://squidfunk.github.io/mkdocs-material/reference/data-tables/?h=table#sortable-tables): 通过`tablesort.js` 【功能比较有限】

改进方案：改用[`datatables` :fontawesome-solid-link:](https://datatables.net)库，需要依赖`jquery`。其中的`i18n/zh.json`文件是语言翻译。

实现示例：[Cinéphile-豆瓣电影 Top250 :fontawesome-solid-link:](https://hantang.fun/cinephile/top250/douban/#完整榜单){ .md-button }

=== ":octicons-file-code-16: `docs/assets/js/datatables.js`"

    ```js
    $(document).ready(function () {
      const tables = document.querySelectorAll("article table:not([class])");
      tables.forEach(function (table) {
        $(table).DataTable({
          language: {
              url: '//cdn.datatables.net/plug-ins/2.0.2/i18n/zh.json',
          },
        })
      });
    });
    ```

=== ":octicons-file-code-16: `mkdocs.yml`"

    ``` yaml
    extra_javascript:
      - https://code.jquery.com/jquery-3.7.1.min.js
      - https://cdn.datatables.net/2.0.2/js/dataTables.min.js
      - https://cdn.datatables.net/plug-ins/2.0.2/i18n/zh.json
      - assets/js/datatables.js

    extra_css:
      - https://cdn.datatables.net/2.0.2/css/dataTables.dataTables.min.css
    ```
