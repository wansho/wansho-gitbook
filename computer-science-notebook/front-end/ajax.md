# ajax

[TOC]

## introduction

Asynchronous JavaScript and XML.



ajax 诞生于 2005 年，标志着 web2.0 时代的到来。AJAX 不是指一种单一的技术，而是有机地利用了一系列相关的技术。虽然其名称包含XML，但实际上数据格式可以由[JSON](https://zh.wikipedia.org/wiki/JSON)代替以进一步减少数据量。而客户端与服务器也并不需要异步。

## ajax and jquery

jquery 是一个 JavaScript 工具包，集成了  ajax。

## ajax implements

* jQuery 很重，而且主要功能不是发送 Ajax 请求，是操作 DOM
* axios 轻量级，建议使用
  * 封装 XmlHttpRequest 对象的 ajax
  * promise 风格
  * 可以用在浏览器端和 node 服务器端  

## ajax concepts

### 跨域问题

[阮一峰：浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html) 

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

同源政策规定，AJAX请求只能发给同源的网址，否则就报错。可以通过架设服务器代理来避免这个问题。



## axios

### installation

```shell
yarn add axios
```

