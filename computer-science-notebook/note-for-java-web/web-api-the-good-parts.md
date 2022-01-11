# WebAPI 的设计与实现



[TOC]



## 第一章 什么是 web api

* web api 与服务器返回的 html 的区别

  api 不是通过输入或点击链接来访问的，而是由程序进行调用的。HTML 是让人读的，api 是让机器读的。

* Web API 是计算机领域的 UGC（User Generated Content）

* 公开什么 api

  所有的在线服务，都可以公开 api，api 可以作为一个程序员的名片

* 公开 api 是否有风险

  即使不公开 api，真想要获取数据的话，用爬虫爬取 html 也可以获取

* api 设计有没的重要性

  * api 一经设计，就很少再更改，所以首次设计很重要
  * api 是程序员的名片
  * 设计良好的 api 可读性好，易于使用，易于传播

* api 的一种分类

  * LSUD：Large Set of Unknown Developers 面向大量的开发者，例如 Twitter 的 api
  * SSKD：Small Set of Known Developers 面向少量已知开发者，例如公司内部的 api

* api 的设计不必严格遵循 rest，尽信书不如无书



