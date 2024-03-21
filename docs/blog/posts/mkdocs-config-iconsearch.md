---
title: MkDocs（Material）搜索图标
date: 2024-03-17T21:50:47
draft: false
authors:
  - hantang
categories:
  - tech
tags:
  - mkdocs
comments: true
---

记录实现搜索mkdocs material中提供的icon和emoji的功能，开始自己实现js，之后发现官方仓库已经有生成的js和css，直接使用，很方便了。

<!-- more -->

## Emoji和Icon搜索实现

实现目标：Material for MkDocs官方文档中[Icons, Emojis搜索](https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/?h=ico#search)

基本思想：从`iconsearch_index.json`读取图标名和对应图片位置信息，通过js搜索并展示响应结果。

实现示例：[hantang.github.io/search :fontawesome-solid-link:](https://hantang.github.io/search/#search){ .md-button }

### 方式1：使用官方资源【推荐】

直接使用官方提供的js和css：

1. 下载assets目录（[material/overrides/assets](https://github.com/squidfunk/mkdocs-material/tree/master/material/overrides/assets)），放到overrides目录。
2. 修改配置文件`mkdocs.yml`，添加javascript和css路径。
3. 新建`search.md`，内容截取自官方文档[icons-emojis.md](https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/docs/reference/icons-emojis.md).

=== ":octicons-file-code-16: `overrides/assets`目录"

    ``` { .sh .no-copy }
    .
    ├─ docs/
    │  └─ ...
    │     └─ extra.css
    ├─ overrides/
    │  └─ assets/ # 新增
    │     ├─ javascripts/
    │     │      ├─ custom.129bd6ad.min.js
    │     │      ├─ custom.129bd6ad.min.js.map
    │     │      └─ iconsearch_index.json
    │     └─ stylesheets/
    │            ├─ custom.00c04c01.min.css
    │            └─ custom.00c04c01.min.css.map
    └─ mkdocs.yml
    ```

=== ":octicons-file-code-16: `mkdocs.yml`"

    ```yaml
    theme:
      name: material
      custom_dir: overrides
    # ...

    extra_javascript:
      - assets/javascripts/custom.129bd6ad.min.js

    extra_css:
      - assets/stylesheets/custom.00c04c01.min.css
    ```

=== ":octicons-file-code-16: `docs/search.md`"

    ```markdown
    # Icons, Emojis

    ## Search

    <div class="mdx-iconsearch" data-mdx-component="iconsearch">
      <input
        class="md-input md-input--stretch mdx-iconsearch__input"
        placeholder="Search the icon and emoji database"
        data-mdx-component="iconsearch-query"
      />
      <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result">
        <div class="mdx-iconsearch-result__meta"></div>
        <ol class="mdx-iconsearch-result__list"></ol>
      </div>
    </div>
    <small>
      :octicons-light-bulb-16:
      **Tip:** Enter some keywords to find icons and emojis and click on the
      shortcode to copy it to your clipboard.
    </small>
    ```

### 方式2：自己实现JS

`iconsearch_index.json` 文件从官网页面的源代码中抽取下载，`search.md`中增加了3个HTML id，方便js中元素定位。之后同样在`mkdocs.yml`中添加css和javascript（js也可以在`search.md`中通过`<script src="iconsearch.js"></script>`的方式引入）。

=== ":octicons-file-code-16: `docs/assets/css/extra.css`"

    ``` css
    /* icon emoji search*/
    /* from: https://squidfunk.github.io/mkdocs-material/assets/stylesheets/custom.14cc6f30.min.css */

    .md-typeset .mdx-iconsearch {
      background-color: var(--md-default-bg-color);
      border-radius: .1rem;
      box-shadow: var(--md-shadow-z1);
      position: relative;
      transition: box-shadow 125ms
    }

    .md-typeset .mdx-iconsearch:focus-within,
    .md-typeset .mdx-iconsearch:hover {
      box-shadow: var(--md-shadow-z2)
    }

    .md-typeset .mdx-iconsearch .md-input {
      background: var(--md-default-bg-color);
      box-shadow: none
    }

    [data-md-color-scheme=slate] .md-typeset .mdx-iconsearch .md-input {
      background: var(--md-code-bg-color)
    }

    .md-typeset .mdx-iconsearch-result {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      max-height: 50vh;
      overflow-y: auto;
      scrollbar-color: var(--md-default-fg-color--lighter) #0000;
      scrollbar-width: thin;
      touch-action: pan-y
    }

    .md-tooltip .md-typeset .mdx-iconsearch-result {
      max-height: 10.25rem
    }

    .md-typeset .mdx-iconsearch-result::-webkit-scrollbar {
      height: .2rem;
      width: .2rem
    }

    .md-typeset .mdx-iconsearch-result::-webkit-scrollbar-thumb {
      background-color: var(--md-default-fg-color--lighter)
    }

    .md-typeset .mdx-iconsearch-result::-webkit-scrollbar-thumb:hover {
      background-color: var(--md-accent-fg-color)
    }

    .md-typeset .mdx-iconsearch-result__meta {
      color: var(--md-default-fg-color--lighter);
      font-size: .64rem;
      position: absolute;
      right: .6rem;
      top: .4rem
    }

    [dir=ltr] .md-typeset .mdx-iconsearch-result__list {
      margin-left: 0
    }

    [dir=rtl] .md-typeset .mdx-iconsearch-result__list {
      margin-right: 0
    }

    .md-typeset .mdx-iconsearch-result__list {
      list-style: none;
      margin: 0;
      padding: 0
    }

    [dir=ltr] .md-typeset .mdx-iconsearch-result__item {
      margin-left: 0
    }

    [dir=rtl] .md-typeset .mdx-iconsearch-result__item {
      margin-right: 0
    }

    .md-typeset .mdx-iconsearch-result__item {
      border-bottom: .05rem solid var(--md-default-fg-color--lightest);
      margin: 0;
      padding: .2rem .6rem
    }

    .md-typeset .mdx-iconsearch-result__item:last-child {
      border-bottom: none
    }

    .md-typeset .mdx-iconsearch-result__item>* {
      margin-right: .6rem
    }

    .md-typeset .mdx-iconsearch-result__item img {
      height: .9rem;
      width: .9rem
    }

    [data-md-color-scheme=slate] .md-typeset .mdx-iconsearch-result__item img[src*=squidfunk] {
      filter: invert(1)
    }

    .md-typeset ol:not([hidden]), .md-typeset ul:not([hidden]) {
      display: flow-root;
    }
    ```

=== ":octicons-file-code-16: `docs/assets/js/iconsearch.js`"

    ``` javascript
    // const searchInput = document.querySelector('.mdx-iconsearch__input');
    // const searchResultList = document.querySelector('.mdx-iconsearch-result__meta');
    // const searchResultMeta = document.querySelector('.mdx-iconsearch-result__list');

    const searchInput = document.getElementById('searchInput');
    const searchResultList = document.getElementById('searchResultList');
    const searchResultMeta = document.getElementById('searchResultMeta');

    const datafile = '../assets/js/iconsearch_index.json';
    const metaWords = "Type to start searching";
    const displayStep = 20;
    let searchData = null;
    let searchResults = [];
    let displayedResultCount = 0;

    searchResultMeta.textContent = metaWords;
    searchResultList.style.overflowY = 'scroll';
    searchResultList.style.maxHeight = '300px';

    fetch(datafile)
      .then(response => response.json())
      .then(data => {
        searchData = data;
      })
      .catch(error => console.error('Error loading icon data:', error));

    searchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase().replace(/\s+/g, '');
      searchResults = [];

      // match results by letters
      for (const category in searchData) {
        const base = searchData[category].base;
        for (const key in searchData[category].data) {
          const lowerCaseKey = key;
          let matchIndex = 0;
          let isMatch = true;

          for (const char of query) {
            const index = lowerCaseKey.indexOf(char, matchIndex);
            if (index === -1) {
              isMatch = false;
              break;
            }
            matchIndex = index + 1;
          }

          if (isMatch) {
            const value = searchData[category].data[key];
            const matchedText = key.substring(0, matchIndex);
            const highlightedKey = key.replace(new RegExp(matchedText, 'i'), `<b>${matchedText}</b>`);
            const resultText = `
              <li class="mdx-iconsearch-result__item">
              <span class="twemoji"><img src="${base}/${value}"></span>
              <button class="md-clipboard--inline" title="Copy to clipboard" data-clipboard-text=":${key}:">
                <code>${highlightedKey}</code>
              </button>
              </li>
              `;
            searchResults.push(resultText);
          }
        }
      }

      console.log("sort data", searchResults.length);
      // show results
      searchResults.sort((a, b) => {
        const textA = a.replace(/<\/?b>/g, '').toLowerCase();
        const textB = b.replace(/<\/?b>/g, '').toLowerCase();
        return textA.localeCompare(textB);
      });

      // clear then display
      displayedResultCount = 0;
      searchResultList.innerHTML = '';
      displaySearchResults();
    });

    searchInput.addEventListener('keyup', function (event) {
      if (event.key === 'Backspace' && this.value.trim() === '') {
        searchResults = [];
        displayedResultCount = 0;
        displaySearchResults();
        searchResultMeta.textContent = metaWords;
      }
    });

    function displaySearchResults() {
      console.log(displayedResultCount)
      const totalResults = searchResults.length;
      let html = '';
      let resultCount = '';

      if (totalResults > 0) {
        resultCount = totalResults > 1000 ? (totalResults / 1000).toFixed(1) + 'k' : totalResults;
        const results = searchResults.slice(displayedResultCount, displayedResultCount + displayStep);
        html = searchResultList.innerHTML + `${results.join('')}`;
        displayedResultCount += displayStep;
      } else {
        resultCount = 0;
      }

      searchResultMeta.textContent = `${resultCount} matches`;
      searchResultList.innerHTML = html;
    }

    searchResultList.addEventListener('scroll', function () {
      // const scrollTop = this.scrollTop;
      // const scrollHeight = this.scrollHeight;
      // const clientHeight = this.clientHeight;
      // if (scrollTop + clientHeight >= scrollHeight) {
      if( displayedResultCount <= searchResults.length) {
        displaySearchResults();
      }
    });
    ```

### 附录

- 相关issue/discussion: [A simple way to include the Icon search? #2822](https://github.com/squidfunk/mkdocs-material/discussions/2822)。
- 主题的源代码: [iconsearch/query](https://github.com/squidfunk/mkdocs-material/tree/master/src/overrides/assets/javascripts/components/iconsearch/query).
