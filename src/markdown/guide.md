# 入门概览

## Page.js 是什么

Page.js，即前端标签页框架，是一套提供给前端开发者快速搭建桌面级标签页应用的成熟框架。

Page.js 具有部署方便、可自由扩展、可针对需求二次开发的优点，内置的 api 满足大部分项目需求。

## 安装

Page.js 包括两个 js 和两个 css 文件组成，父页面和子页面分别引入对应的 js、css 资源。

### npm

npm 安装方式适合 webpack 搭建的前端工程化项目，首先安装 Page.js

```bash
npm i -S @styzy/page-js
```

然后分别在父级页面和子页面引入对应的资源

```javascript
// 父页面
import Page from '@styzy/page-js/dist/js/page.parent.min.js'
import '@styzy/page-js/dist/css/page.parent.css'

// 子页面
import Page from '@styzy/page-js/dist/js/page.child.min.js'
import '@styzy/page-js/dist/css/page.child.css'
```

### CDN

目前可以通过 [unpkg.com/@styzy/page-js](https://unpkg.com/@styzy/page-js/) 的方式获取最新版本的资源。

```html
<!-- 父页面 -->
<link rel="stylesheet" href="https://unpkg.com/@styzy/page-js/dist/css/page.parent.css" />
<script type="text/javascript" src="https://unpkg.com/@styzy/page-js/dist/js/page.parent.min.js"></script>

<!-- 子页面 -->
<link rel="stylesheet" href="https://unpkg.com/@styzy/page-js/dist/css/page.child.css" />
<script type="text/javascript" src="https://unpkg.com/@styzy/page-js/dist/js/page.child.min.js"></script>
```

我们建议使用 CDN 引入 Page.js 的用户在链接地址上锁定版本，以免将来 Page.js 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com/#/)。

## 快速上手

安装好之后，让我们一起了解框架的基本功能，创建标签页

```javascript
var page = new Page({
    // 设定标题容器
    titleContainer: '#titleContainer',
    // 设定页面容器
    viewContainer: '#viewContainer'
})

page.open('http://baidu.com')
```

这样，我们就成功创建了标签页!
