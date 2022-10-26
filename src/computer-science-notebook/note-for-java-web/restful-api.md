# restful-api

[TOC]

## definition

**Representational state transfer** (**REST**) is a [software architectural style](https://en.wikipedia.org/wiki/Software_architecture) which uses a subset of [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).[[1\]](https://en.wikipedia.org/wiki/Representational_state_transfer#cite_note-Fielding-Ch5-1) It is commonly used to create [interactive](https://en.wikipedia.org/wiki/Interactivity) applications that use [Web services](https://en.wikipedia.org/wiki/Web_service). A Web service that follows these guidelines is called *RESTful*. Such a Web service must provide its [Web resources](https://en.wikipedia.org/wiki/Web_resource_framework) in a textual representation and allow them to be read and modified with a [stateless protocol](https://en.wikipedia.org/wiki/Stateless_protocol) and a predefined set of operations. 

REST 是一套用于构建 Web Service 的规范。

## restful vs mvc

MVC 和 RESTful web 的关键不同点：

A key difference between a traditional MVC controller and the RESTful web service controller shown earlier is the way that the HTTP response body is created. Rather than relying on a view technology to perform server-side rendering of the greeting data to HTML, this RESTful web service controller populates and returns a `Greeting` object. The object data will be written directly to the HTTP response as JSON.

以前网页是前后端融合在一块的（我之前写的 Senti-weibo 网页，就是前后端融合在一块的，类似 JSP），Restful 标准是实现前后端分离的标准，一个后端服务就可以服务 Web、app 等多个前端平台。

## 通俗解释

URL定位资源，用HTTP动词（GET,POST,DELETE,DETC）描述操作。

url 使用名词来指定资源，使用 HTTP 动词来描述动作。

```
server提供的RESTful API中，URL中只使用名词来指定资源，原则上不使用动词。“资源”是REST架构或者说整个网络处理的核心。比如：http://api.qc.com/v1/newsfeed: 获取某人的新鲜; 
http://api.qc.com/v1/friends: 获取某人的好友列表;
http://api.qc.com/v1/profile: 获取某人的详细信息;

用HTTP协议里的动词来实现资源的添加，修改，删除等操作。即通过HTTP动词来实现资源的状态扭转：
GET    用来获取资源
POST  用来新建资源（也可以用于更新资源）
PUT    用来更新资源
DELETE  用来删除资源

比如：
DELETE http://api.qc.com/v1/friends: 删除某人的好友 （在http parameter指定好友id）
POST http://api.qc.com/v1/friends: 添加好友
UPDATE http://api.qc.com/v1/profile: 更新个人资料
```

Demos

```
GET /zoos：列出所有动物园
POST /zoos：新建一个动物园
GET /zoos/ID：获取某个指定动物园的信息
PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
DELETE /zoos/ID：删除某个动物园
GET /zoos/ID/animals：列出某个指定动物园的所有动物
DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
```

## reference

* [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

