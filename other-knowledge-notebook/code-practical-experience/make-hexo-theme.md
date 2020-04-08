# Hexo Theme

[TOC]

## 开发步骤

[awesome-hexo](https://github.com/hexojs/awesome-hexo)

1. 找到标准的 学术主题 简历模板

   参考：

   https://nlp.stanford.edu/people/

   https://cs.stanford.edu/~danqi/

   http://parnec.nuaa.edu.cn/huangsj/

   http://lotabout.me/hexo-theme-noise/

2. 主题制作教程

   https://segmentfault.com/a/1190000008040387

   https://molunerfinn.com/make-a-hexo-theme/#%E5%89%8D%E8%A8%80

   http://chensd.com/2016-06/hexo-theme-guide.html

   http://theme-next.iissnan.com/faqs.html

3. 模仿的主题

   https://github.com/ahonn/theme-example

4. 辅助工具

   https://blog.cofess.com/2017/08/16/comon-plug-in-and-usage-of-hexo-blog.html

## 技术栈

### ejs

https://ejs.bootcss.com/

"E" 代表 "effective"，即【高效】。EJS 是一套简单的模板语言，帮你利用普通的 JavaScript 代码生成 HTML 页面。 实际上是一种嵌入 html 的 JavaScript 扩展动态语言。

代码格式：

```
<%= EJS %>
```

### JavaScript

## Hexo CMD

| CMD                 | Explanation             |
| ------------------- | ----------------------- |
| hexo server --debug | 开发中的 debug 调试模式 |
| hexo new ""         |                         |
|                     |                         |

## 开发教程

### 代码框架生成器

https://github.com/tcrowe/generator-hexo-theme

### 永久链接

https://hexo.io/zh-cn/docs/permalinks.html

用于格式化网站的链接。编辑 hexo 文件夹下的 permalink 选项，即可更改网站的链接格式。

### 新建主题

https://hexo.io/zh-cn/docs/themes

```
.
├── _config.yml 该主题的配置文件
├── languages	配置语言，用于国际化
├── layout		存放模板文件，hexo 根据模板文件的扩展名来决定所使用的模板引擎
├── scripts		在启动时，Hexo 会载入此文件夹内的 JavaScript 文件
└── source
```

### 辅助函数

| Func                       | Explanation     |
| -------------------------- | --------------- |
| `<%= __('index.title') %>` | __() 国际化函数 |
|                            |                 |
|                            |                 |

### 模板

**hexo 支持的模板引擎**

EJS / Jade / Swig，选用 EJS

**hexo 支持的 css 预处理器**

SASS / LESS / Stylus，选用 Stylus

**六大基础模板**

| Template   | Fallback  | Page Description                                             |
| ---------- | --------- | ------------------------------------------------------------ |
| `index`    | None      | This the home page of the blog, the main entry point. In our case it will display a list of blog excerpts. |
| `post`     | `index`   | This is the detail page for posts. Here we will display only one post in full, with a comment section. |
| `page`     | `index`   | This is the detail page for pages. Same as post but for ‘page type’ posts. |
| `archive`  | `index`   | This is the archive page. It will display a list of all the posts in our blog with just titles and links to the detail page. |
| `category` | `archive` | This is the category page. Similar to the archive page but filtered for one category. |
| `tag`      | `archive` | This is the tag page. Similar to the archive page page but filtered for one tag. |

**Common layout**

每一个模板都会去渲染这个 layout，layout中包含了通用的 header, footer, menu, sidebar 等元素。

`layout.ejs`

**_partial**

_partial 文件夹中存放着可以被各个模板复用的 模块。其调用语法为：

`partial('path' [, arguments]) `

### EJS

https://ejs.bootcss.com/

### Stylus

http://stylus-lang.com/

## 调试工具

1. hexo-browsersync

   https://github.com/hexojs/hexo-browsersync

   能够在你修改了主题文件的时候自动帮你刷新浏览器，省去刷新的动作。


## 调试问题

1. 之前写好的主题，样式出错

   尝试 `hexo clean`

## To Do

1. 代码高亮
2. about 页面制作
3. 文章标题下面加入标签 tags
4. 汇总页面制作

## Hexo-Theme-xoxo

由于时间有限，不能短时间内速成一个简约又不缺核心功能的主题，所以只能退而求其次，找一个自己满意的主题，然后修改。

主题地址：[Github Hexo-Theme-xoxo](https://github.com/KevinOfNeu/hexo-theme-xoxo)

主题Demo: https://blog.0xff000000.com/

注意：要实现 tags 和 search 两个功能，需要进行如下配置：

```
step1:
	hexo new page tags
	
step2:
	编辑 /source/tags/index.md，增加 type
	---
    title: tags
    date: 2016-06-08 16:19:38
    type: "tags"
    ---

search 同理，只需要将 tags 改成 search
	
参考：https://github.com/iissnan/hexo-theme-next/issues/339
```

## Hexo-Theme-Cactus

https://github.com/wansho/hexo-theme-cactus

## 搜索引擎SEO

https://hjptriplebee.github.io/hexo%E7%9A%84SEO%E6%96%B9%E6%B3%95.html/

### sitemap 生成

```
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
```

### Google 网站收录

Google 站长工具：[Google Search Consle](https://search.google.com/search-console?resource_id=http%3A%2F%2Fwansho.cn%2F)

在 `<head></head>` 中加入 `<meta name="google-site-verification" content="kbZW7brfuXT60agTnG6EdltkfF13JGQ55M4qOr_ZbA8" />`

### Baidu 网站收录

Baidu 站长工具：https://ziyuan.baidu.com/

同上加入：`<meta name="baidu-site-verification" content="JDQZRxjUWp" />`



