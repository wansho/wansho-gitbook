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

https://github.com/matiassingers/awesome-readme

https://github.com/zalando/zalando-howto-open-source/blob/master/READMEtemplate.md

## Creating GIFs

[gif工具集](<https://github.com/matiassingers/awesome-readme#creating-gifs>)

[gif图床](<https://giphy.com/>)

[gif压缩](<https://ezgif.com/>) 选择 resize 和 optimize 两个选项进行压缩，其中 resize 效果最好

[gif软件 Screen to Gif ](<https://www.screentogif.com/>)

## 超链接功能

正常的超链接语法为: `[desc](url)`

需要注意的是 desc 并不只限于文本，也可以插入一个图片，GitHub badge 的原理就是这样的。

```
[![Build Status](https://travis-ci.org/chinese-poetry/chinese-poetry.svg?branch=master)](https://travis-ci.org/chinese-poetry/chinese-poetry)
```

## 常见的二级标题

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

## 插入图片

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

## 生成 TOC

For Linux, https://github.com/ekalinin/github-markdown-toc

```shell
$ wget https://raw.githubusercontent.com/ekalinin/github-markdown-toc/master/gh-md-toc
$ chmod a+x gh-md-toc
$ ./gh-md-toc README.md # 结果是生成一个 TOC，把该 TOC 粘贴到 markdown 中即可
```

## 图床

腾讯云对象存储 cos，赠送免费 50G 容量

https://console.cloud.tencent.com/cos5/bucket/setting?type=filelist&bucketName=blog-pic-1258744409&path=&region=ap-chengdu

图片上传到云端的接口软件：https://github.com/Molunerfinn/PicGo

腾讯只免费赠送 6 个月，不实惠，改用阿里云的OSS存储：

> 您可以使用阿里云提供的API、SDK接口或者OSS迁移工具轻松地将海量数据移入或移出阿里云OSS。数据存储到阿里云OSS以后，您可以选择标准类型（Standard）的阿里云OSS服务作为移动应用、大型网站、图片分享或热点音视频的主要存储方式，也可以选择成本更低、存储期限更长的低频访问类型（Infrequent Access）和归档类型（Archive）的阿里云OSS服务作为不经常访问数据的备份和归档。

阿里云有专属的客户端：[ossbrowser](http://gosspublic.alicdn.com/oss-browser/1.9.1/oss-browser-win32-x64.zip?spm=a2c4g.11186623.2.10.42741144jhrm9W&file=oss-browser-win32-x64.zip)

## 项目徽章

Demos：

```
https://img.shields.io/github/stars/yzhao062/anomaly-detection-resources.svg
https://img.shields.io/github/forks/yzhao062/anomaly-detection-resources.svg
https://img.shields.io/github/license/yzhao062/anomaly-detection-resources.svg
https://img.shields.io/badge/link-996.icu-red.svg

[![Build Status](https://travis-ci.org/chinese-poetry/chinese-poetry.svg?branch=master)](https://travis-ci.org/chinese-poetry/chinese-poetry)
[![License](http://img.shields.io/badge/license-mit-blue.svg?style=flat-square)](https://github.com/jackeyGao/chinese-poetry/blob/master/LICENSE)
[![](https://img.shields.io/github/contributors/chinese-poetry/chinese-poetry.svg)](https://github.com/chinese-poetry/chinese-poetry/graphs/contributors)
```

![项目徽章举例](https://img.shields.io/github/license/wansho/Last-Statement-of-Death-Row.svg)

https://shields.io/

