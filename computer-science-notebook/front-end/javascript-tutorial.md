# js-tutorial

[TOC]

[JavaScript 教程](https://wangdoc.com/javascript/index.html)

## 1. 入门篇

### 导论

JavaScript 是一种轻量级的**脚本语言**、**嵌入式语言**、**面向对象语言**、**解释型语言**、**动态类型语言**，支持**函数式编程**。

**脚本语言定义**：指的是它不具备开发操作系统的能力，而是只用来编写控制其他大型应用程序（比如浏览器）的“脚本”。

JavaScript 本身不提供任何与 I/O（输入/输出）相关的 API，都要靠宿主环境（host）提供，所以 JavaScript 只合适嵌入更大型的应用程序环境，去调用宿主环境提供的底层 API。目前，已经嵌入 JavaScript 的宿主环境有多种，最常见的环境就是浏览器，另外还有服务器环境，也就是 Node 项目。

JavaScript 的核心语法部分相当精简，只包括两个部分：基本的语法构造（比如操作符、控制结构、语句）和标准库（就是一系列具有各种功能的对象比如`Array`、`Date`、`Math`等）。除此之外，各种宿主环境提供额外的 API（即只能在该环境使用的接口），以便 JavaScript 调用。以浏览器为例，它提供的额外 API 可以分成三大类。

- 浏览器控制类：操作浏览器
- DOM 类：操作网页的各种元素
- Web 类：实现互联网的各种功能

JavaScript 能发挥什么作用，主要取决于它的宿主环境。如果宿主环境是服务器，则会提供各种操作系统的 API，比如文件操作 API、网络通信 API等等。这些你都可以在 Node 环境中找到。

JavaScript 语言本身是一种解释型语言，但是在现代浏览器中，JavaScript 都是**编译后运行**。程序会被高度优化，运行效率接近二进制程序。

### 历史 / 周边大事记

一句话总结：JavaScript 诞生于 Netscape，Google将其发扬光大。

1995 年，Netscape 公司的 Brendan Eich 开发了 JavaScript；（JavaScript 和我同岁 😂）

1996 年，微软推出竞品语言 JScript，内置于 IE3.0，Netscape 公司面临丧失浏览器脚本语言的主导权的局面。为了对抗微软，网景把 JavaScript 提交给 ECMA（European Computer Manufacturers Association），将 JavaScript 作为国际标准，所以 JavaScript 又叫做 ECMAScript。

1996 年，css 第一版发布

1997 年，DOM(Documen Object Model) 发布，允许动态改变网页内容

1998 年，网景开源了浏览器，Mozilla 项目诞生

2002 年，Mozilla 发布第一版浏览器，取名 Firefox

2004 年，Google 发布 Gmail，促成了互联网应用程序（Web app）概念的诞生

2005 年，苹果公司在 KHTML 引擎基础上，建立了 WebKit 引擎

2005 年，Ajax(Asynchronous JavaScript and XML) 诞生，标志着 Web2.0 到来

2005 年，Apache 发布 CouchDB，基于 JSON（JavaScript Object Notation） 格式的数据库，使用 JavaScript 定义视图和索引，标志着 NoSQL 的诞生

2006 年，JQuery 诞生，为操作 DOM 提供了强大易用的接口

2006 年，Google 推出 Google Web Toolkit（GWT），可以将 Java 编译成 JavaScript，开创了其他语言转为 JavaScript 的先河

2007 年，WebKit 引擎在 iPhone 中得到部署，标志着 JavaScript 可以在手机中使用

2007 年，Douglas Crockford 发表了名为《JavaScript: The good parts》的演讲，标志着软件行业开始严肃对待 JavaScript 语言

2008 年，V8 编译器诞生，加速了 JavaScript 的运行，改变了外界对 JavaScript 的不良印象

2009 年，Node.js 诞生，标志着 JavaScript 可以进行服务端编程

2010 年，NPM，BackboneJS，RequireJS 诞生，标志着 JavaScript 进入模块化开发的时代

2011 年，微软工程师[Scott Hanselman](https://www.hanselman.com/blog/JavaScriptIsAssemblyLanguageForTheWebSematicMarkupIsDeadCleanVsMachinecodedHTML.aspx)提出，JavaScript 将是互联网的汇编语言。因为它无所不在，而且正在变得越来越快。其他语言的程序可以被转成 JavaScript 语言，然后在浏览器中运行

2012 年，单页面应用程序框架(single-page app framework)开始崛起，AngularJS 和 Ember 都发布了 1.0 版本

2012 年，微软发布 TypeScript，兼容 JavaScript，添加了很多新特性，主要目的是为了开发大型程序

2013 年，ECMA 推出 JSON 国际标准，JSON 格式变得和 XML 一样重要

2013 年，Facebook 推出 UI 框架库 React

2014 年，微软推出 Javascript 的 Windows 库：WinJS，相当于将 JavaScript 嵌入 Windows 操作系统，标志着微软全力支持 JavaScript 与 Windows 系统的融合

2015 年，Facebook 公司发布了 React Native 项目，将 React 框架移植到了手机端。其将 JavaScript 代码转为 iOS 平台的 Objective-C 代码，或者 Android 平台的 Java 代码，为 JavaScript 语言开发高性能的原生 App 打开了一条道路

2015 年，ECMAScript 6 语言标准

2015 年，Mozilla 发布 WebAssembly(wasm) 项目，也能将 C / C++ 转成 JS 引擎可以运行的代码

2017 年，所有主流浏览器全部支持 WebAssembly，任何语言都可以编译成 JavaScript，在浏览器运行

### 基本语法



