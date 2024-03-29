# hantang's blog

## mkdocs

Powered by [mkdocs](https://github.com/mkdocs/mkdocs), theme is [mkdocs-material](https://github.com/squidfunk/mkdocs-material)

步骤：

```shell
# 安装
pip install mkdocs mkdocs-material
mkdocs new .

# 启动
mkdocs serve 
# mkdocs serve -a :8080
# mkdocs build

# 部署
mkdocs gh-deploy --force
```

配置`mkdocs.yml`

```yaml
theme:
  name: material
```

## ~~next.js~~

~~Powered By [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)~~

安装步骤：

```shell
npx degit 'timlrx/tailwind-nextjs-starter-blog'
```

配置文件说明：

```
网站基本信息：siteMetadata.js
配置：next.config.js
作者：authors/default.md
项目展示页面：projectsData.js
导航栏：headerNavLinks.js
图片和图标：public/static
```

执行服务：

```shell
# develop
yarn
yarn dev

# deploy
yarn build
npx serve out
```

## 问题

- 【~~next.js~~】`data/`目录中只能识别`.mdx`文件，无法识别`.md`文件。

修改`contentlayer.config.ts`：

```javascript
export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  // ...
}))

// 修改
filePathPattern: 'blog/**/*.{mdx,md}',
```

- 【mkdocs】, markdown列表缩进异常，使用插件`mdx_truly_sane_lists`

参见：[mkdocs/mkdocs - [BUG] Invalid list indentation #3063](https://github.com/mkdocs/mkdocs/discussions/3063)
