# markdown & README

[TOC]

## markdown + latex

Typora  兼容 latex 的公式编辑，这里记录在 Typora 中 用 latex 语法可以打出 一些特殊符号。

| 符号       |            |
| ---------- | ---------- |
| 对勾       | `$\surd$`  |
| 叉号、乘号 | `$\times$` |

## Authentic README

如何写出纯正的 README

* https://github.com/matiassingers/awesome-readme

* https://github.com/zalando/zalando-howto-open-source/blob/master/READMEtemplate.md

* [anuraghazra](https://github.com/anuraghazra/anuraghazra)
* [Awesome-Profile-README-templates](https://github.com/kautukkundan/Awesome-Profile-README-templates)

## 语法

### 注释

```
<!--
**wansho/wansho** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
```

```
Project Name/Intro
Core Technical Concepts/Inspiration
Getting Started/Requirements/Prerequisites/Dependencies
More Specific Topics
Contributing
TODO
Contact
License
```

### 代码 diff

```diff
function addTwoNumbers (num1, num2) {
-  return 1 + 2
+  return num1 + num2
}
```

````
```diff
function addTwoNumbers (num1, num2) {
-  return 1 + 2
+  return num1 + num2
}
```
````

### 高级引用

定义一个引用：

[jpa mybatis比较]: https://www.zhihu.com/question/317183937/answer/1474629982

使用一个引用：

我最近正在看这篇技术技术文章：[jpa mybatis 比较][jpa mybatis比较]

语法：

```
定义一个引用：
[jpa mybatis比较]: https://www.zhihu.com/question/317183937/answer/1474629982

使用一个引用：注意是两个 [][]
[jpa mybatis 比较][jpa mybatis比较]
```

定义的引用相当于注释，生成 pdf 的时候会被删除。



### 页内引用

锚

```
[描述](#id)
```

### YAML front matter

*YFM is an* **optional** *section of valid YAML that is placed at the top of a page and is used for maintaining metadata for the page and its contents.*

其实对于 markdown 来说，就是注释，只是这注释

语法：

```
---
title: YAML Front Matter
description: A very simple way to add structured data to a page.
---
```

### 脚注

示例：

使用 Markdown[^1]可以效率的书写文档, 直接转换成 HTML[^2], 你可以使用 Typora[^T] 编辑器进行书写。
[^1]:Markdown是一种纯文本标记语言
[^2]:HyperText Markup Language 超文本标记语言
[^T]:NEW WAY TO READ & WRITE MARKDOWN.

语法：

```
使用 Markdown[^1]可以效率的书写文档, 直接转换成 HTML[^2], 你可以使用 Typora[^T] 编辑器进行书写。
[^1]:Markdown是一种纯文本标记语言
[^2]:HyperText Markup Language 超文本标记语言
[^T]:NEW WAY TO READ & WRITE MARKDOWN.
```

注意，在生成 pdf 的时候，脚注会自动添加到 pdf 的最后。

## 图片相关

### Creating GIFs

[gif工具集](<https://github.com/matiassingers/awesome-readme#creating-gifs>)

[gif图床](<https://giphy.com/>)

[gif压缩](<https://ezgif.com/>) 选择 resize 和 optimize 两个选项进行压缩，其中 resize 效果最好

[gif软件 Screen to Gif ](<https://www.screentogif.com/>)

### 超链接功能-图片超链接

正常的超链接语法为: `[desc](url)`

需要注意的是 **desc 并不只限于文本**，也可以插入一个图片，GitHub badge 的原理就是这样的。

```
[![Build Status](https://travis-ci.org/chinese-poetry/chinese-poetry.svg)](https://travis-ci.org/chinese-poetry/chinese-poetry)
```

[![Build Status](https://travis-ci.org/chinese-poetry/chinese-poetry.svg)](https://travis-ci.org/chinese-poetry/chinese-poetry)

Github Readme Stats 的原理也是这样的：



```
[![Wansho's github stats](https://github-readme-stats.vercel.app/api?username=wansho)](https://github.com/wansho)
```

[![wansho's github stats](https://github-readme-stats.vercel.app/api?username=wansho)](https://github.com/wansho)



### 插入图片

```html
<div align="left">
    
    <img src="/assets/321556185.jpg" width=20% height=20% />
    <img src="/assets/QQ群.jpg" width=20% height=20% />
    
</div>

<p align="center">
  <a href="https://evilmartians.com/?utm_source=size-limit">
    <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
         alt="Sponsored by Evil Martians" width="236" height="54">
  </a>
</p>

```

也可以通过图片超链接的方式插入

### 图床

腾讯云对象存储 cos，赠送免费 50G 容量

https://console.cloud.tencent.com/cos5/bucket/setting?type=filelist&bucketName=blog-pic-1258744409&path=&region=ap-chengdu

图片上传到云端的接口软件：https://github.com/Molunerfinn/PicGo

腾讯只免费赠送 6 个月，不实惠，改用阿里云的OSS存储：

> 您可以使用阿里云提供的API、SDK接口或者OSS迁移工具轻松地将海量数据移入或移出阿里云OSS。数据存储到阿里云OSS以后，您可以选择标准类型（Standard）的阿里云OSS服务作为移动应用、大型网站、图片分享或热点音视频的主要存储方式，也可以选择成本更低、存储期限更长的低频访问类型（Infrequent Access）和归档类型（Archive）的阿里云OSS服务作为不经常访问数据的备份和归档。

阿里云有专属的客户端：[ossbrowser](http://gosspublic.alicdn.com/oss-browser/1.9.1/oss-browser-win32-x64.zip?spm=a2c4g.11186623.2.10.42741144jhrm9W&file=oss-browser-win32-x64.zip)

### 项目徽章

Demos：

```
https://img.shields.io/github/stars/yzhao062/anomaly-detection-resources.svg
https://img.shields.io/github/forks/yzhao062/anomaly-detection-resources.svg
https://img.shields.io/github/license/yzhao062/anomaly-detection-resources.svg
https://img.shields.io/badge/link-996.icu-red.svg

[![Build Status](https://travis-ci.org/chinese-poetry/chinese-poetry.svg)](https://travis-ci.org/chinese-poetry/chinese-poetry)
[![License](http://img.shields.io/badge/license-mit-blue.svg?style=flat-square)](https://github.com/jackeyGao/chinese-poetry/blob/master/LICENSE)
[![](https://img.shields.io/github/contributors/chinese-poetry/chinese-poetry.svg)](https://github.com/chinese-poetry/chinese-poetry/graphs/contributors)![项目徽章举例](https://img.shields.io/github/license/wansho/Last-Statement-of-Death-Row.svg)
```

https://shields.io/

## Markdown 工具

### 生成 TOC - linux 工具

For Linux, https://github.com/ekalinin/github-markdown-toc

```shell
$ wget https://raw.githubusercontent.com/ekalinin/github-markdown-toc/master/gh-md-toc
$ chmod a+x gh-md-toc
$ ./gh-md-toc README.md # 结果是生成一个 TOC，把该 TOC 粘贴到 markdown 中即可
```

### 生成 TOC - nodejs

生成 TOC 的场景：在本地其实是用不到生成 TOC 的功能的，因为 Typora 提供了 TOC 功能，生成 TOC 功能主要是给其他人看的，主要用在 GitHub 和 gitlab 的开源项目上。

生成 toc 的工具：[doctoc](https://github.com/thlorenz/doctoc)

使用教程：

1. 指定要插入 TOC 的地方：

   <!-- START doctoc -->
   <!-- END doctoc -->

2. 指定 toc-title：一条水平分割线 `doctoc --title '**Table of Content**' file `

3. 给指定文件生成 toc: `doctoc file`，或者给所有文件生成 toc：`doctoc .`

目前 doctoc 生成出来的 toc 是兼容 GitHub 和 gitlab 的。

### Markdown 在线部署

* [mdBook](https://github.com/rust-lang/mdBook) rust 编写，兼容 gitbook，测试了一下，很优秀，暂时没有 bug

* [[GitBook]](https://www.gitbook.com/)

  完美支持 GitHub，唯一的缺点，就是国内加载太慢，认可度不高

* [[MkDoc]](https://github.com/mkdocs/mkdocs)

  MkDocs is a **fast**, **simple** and **downright gorgeous** static site generator that's geared towards building project documentation. 

  支持 GitHub 部署



### 用 Markdown 写微信公众号

https://doocs.github.io/md/



## typora

* 一个好用的主题：lark https://github.com/imageslr/typora-theme-lark



