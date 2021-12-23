# HTTP 协议

[TOC]

[燕十八 HTTP 教程](https://www.bilibili.com/video/av28681865?from=search&seid=10684427334026635806)

## Abstract

* WebService == HTTP 协议（负责传输数据） + XML （数据）

  Rest == HTTP 协议 + json（使用Spring MVC开发Web应用程序的主要工作就是编写Controller逻辑。在Web应用中，除了需要使用MVC给用户显示页面外，还有一类API接口，我们称之为REST，通常输入输出都是JSON，便于第三方调用或者使用页面JavaScript与之交互。）

  各种 API，也一般是用 HTTP + XML/Json 来实现的

* 什么是协议

  计算机中的协议和生活中的 **合同**  是一样的，一式双份/多份，多方都遵从共同的规范，这个规范就可以称为协议。

  协议就是按照规矩说话：

  你来问，我来答；

  你怎么问，我怎么答。

  至于 HTTP 协议，就是客户端如何问，服务端如何答。

* 计算机网络中的各种协议

  HTTP，ftp，stmp，pop，tcp/ip，udp

* HTTP 只是一种协议，并不需要浏览器去发送，只要满足了这种协议，那么任何工具都可以发送 HTTP 协议 

![HTTP学习](http://assets.processon.com/chart_image/5c93aeade4b0f88919b7a567.png)

## HTTP Request

### 请求的信息

- **请求行**
  - 请求方法(区分大小写)
    - GET
    - POST
    - PUT
    - DELETE
    - TRACE
    - OPTIONS
  - 请求路径 (所请求的资源)
  - 请求协议 (HTTP/1.1)
- **请求头信息** (header key: value，内容最丰富)
- **请求主体信息** （非必须）

注意，头信息后有一个空行，用来与主体信息做区分，即使没有主体信息，也需要此空行

### get 请求 telnet-Demo

```shell
GET / HTTP/1.1
Host: localhost
csrftoken: Zr6Sy6DpRMjMYjDGjHavuS9lwc5JLCt2MxMiogaNhd7pueKHwR4tbOcvJa5smoaz


```

其中第一行分别是 请求方式/ 请求路径/ 请求所用协议

第二行和第三行都是请求头信息

第三方是一个空行，用来表示头信息已经输入完毕

### post 请求 telnet-Demo

```shell
POST / HTTP/1.1
Host: localhost
csrftoken: Zr6Sy6DpRMjMYjDGjHavuS9lwc5JLCt2MxMiogaNhd7pueKHwR4tbOcvJa5smoaz
Content-Length: 20 
Content-Type: application/x-www-form-urlencoded

oid=46810686&type=1
```

### get 和 post 区别

post 比 get 的 header 信息中，多了

* Content-Length，也就是主体内容长度的配置 ( POST 必须要加入的内容)
* Content-Type  ( POST 必须要加入的内容)
* 主体信息，也就是提交的内容

### query params / body params

query params: 查询参数

body params: 请求体（只有 post 才有！）

|              | get  | post |
| ------------ | ---- | ---- |
| query params | √    | √    |
| body params  | ×    | √    |

query params demo: `http://198.87.103.240:38080/app/mock/21/organization/v1/user/delete?id=1`

body params 通常是 json 格式的数据

### 请求方法详解

GET / POST / HEAD / PUT / TRACE / DELETE / OPTIONS

注意，这些方法，虽然 HTTP 协议里面规定了，但是并不是所有的 WebServer 都支持，例如 Django 的默认 runserver 就不支持 TRACE 方法。

#### HEAD 方法

HEAD 与 GET 基本一致，只是不返回内容. 使用情境 Demo:

比如我们只确认一个图片是否存在于服务器上，或者服务器是否正常，那么只需要服务器发给我状态码就够了，不需要服务器返回图片。

```
HEAD / HTTP/1.1
Host: localhost
csrftoken: Zr6Sy6DpRMjMYjDGjHavuS9lwc5JLCt2MxMiogaNhd7pueKHwR4tbOcvJa5smoaz

```

#### PUT 方法

往服务器写入内容。通常服务器不支持该方法

#### TRACE 方法

当我们用了代理进行上网的是否，如果我们想要看看代理有没有篡改我们发出的 HTTP 请求，就可以用 TRACE 来测试。通常服务器不支持该方法

```
TRACE / HTTP/1.1
Host: baidu.com

```

#### OPTIONS

测试服务器都支持哪些 HTTP 方法

```
OPTIONS / HTTP/1.1
Host: baidu.com

```

返回支持四个方法：

```
HTTP/1.1 200 OK
Date: Sun, 24 Mar 2019 09:21:56 GMT
Server: WSGIServer/0.2 CPython/3.7.0
Content-Type: text/html; charset=utf-8
Allow: GET, POST, HEAD, OPTIONS
Content-Length: 0
X-Frame-Options: SAMEORIGIN
```

### 常见 Headers

| key: value                                         | 含义                         |
| -------------------------------------------------- | ---------------------------- |
| `if-modified-since: Wed, 21 Jan 2004 19:51:30 GMT` | 判断文件在服务器端是否有变化 |
|                                                    |                              |
|                                                    |                              |

## HTTP Reponse

* 响应行
  * 协议版本
  * 状态码
  * 状态文字
* 响应头信息
* 响应主体信息（即返回的内容）



注意：响应行中的状态码，和响应体中的 code，是两个不同的 code，

* http 的状态码，描述的是 http 的响应状态

* 响应行中的状态码是固定格式的，但是响应体中的状态码，是服务端自定义的



### Http Reponse Demo

```
HTTP/1.1 200 OK
Date: Sun, 24 Mar 2019 08:56:37 GMT
Server: WSGIServer/0.2 CPython/3.7.0
Content-Type: text/html; charset=utf-8
X-Frame-Options: SAMEORIGIN
Vary: Cookie
Content-Length: 1570
Set-Cookie:  csrftoken=9G06qAdcE6H25HLTS7KpJJvQCTHjHsVZMk8KK7WZ118LhOeYWGVL31qotAVxSmRs; expires=Sun, 22 Mar 2020 08:56:37 GMT; Max-Age=31449600; Path=/; SameSite=Lax

<!DOCTYPE html>
<html lang="en">
……  
```

### 状态码

反映服务器的响应结果，状态文字用来描述状态码。

| 状态码  | 定义       | 说明                               |
| ------- | ---------- | ---------------------------------- |
| 1XX     | 信息       | 接受到请求，继续处理               |
| **2XX** | 成功       | 操作成功收到，理解为接受           |
| **3XX** | 重定向     | 为了完成请求，必须采取进一步的措施 |
| **4XX** | 客户端错误 | 请求的语法有错误，或不能完全被满足 |
| **5XX** | 服务端错误 | 服务器无法完成明显有效的请求       |

常见状态码

| 状态码  | 状态文字     | 解释                                                         |
| ------- | ------------ | ------------------------------------------------------------ |
| 200     | OK           | 成功                                                         |
| 301/302 |              | 永久/临时 重定向                                             |
| 304     | Not Modified | 指的是请求的内容在服务器中未修改，可以直接从浏览器的缓存中取缓存的内容。对于一张图片，服务器在返回图片资源的是否，会在 Response Header 中加入一个 标记 `last-modified: Wed, 21 Jan 2004 19:51:30 GMT`，当客户端进行下次请求时，其 request Header 会带上 `if-modified-since: Wed, 21 Jan 2004 19:51:30 GMT`，如果服务器返回 304，那么客户端就会默认从缓存中取出图片 |
| 302     | Found        | 将请求重定向到另一个地址，经常用于 SEO                       |
| 307     |              | 重定向中保持原有的 post 数据，例如通过 form 提交一组数据，如果提交处理的服务器将此请求进行了重定向，那么必须指定 307 来进行 post 数据的保持，否则重定后，post 请求会变成 get 请求，导致 form 数据丢失 |
| 404     | Not Found    | 没有找到该请求文件                                           |

## Cookie - 实现模拟登陆，灌水

### Cookie 的由来

HTTP 客户端每一次和 服务器进行连接，都是无状态连接，其连接结束后，服务器就不记得客户端了，为了让服务器能记住 HTTP 客户端，所以引入 Cookie。(相当于存储用户的上下文)

### Cookie 的原理

第一次请求服务器的时候，服务器发给客户端一个标记（cookie），用来标记这个客户，等到客户端下次访问服务端的时候，就会带上这个 cookie，用来表示客户端的身份。

Cookie 内的 key: value，往往和我们的头信息的内容有关，还有一些时间戳信息，用来防止 Cookie 被滥用。

## Headers 详解

| Key: Value      | 解释                                           |
| --------------- | ---------------------------------------------- |
| Referer         | 代表网页的来源和上一页的地址                   |
| Accept-Encoding | 支持的压缩协议，例如 gzip，deflate，compress， |
|                 |                                                |

## Referer 头与防盗链

### 几个问题

* 当我们在站内引用站外的图片时，经常出现不能引用的情况，例如引用百度或QQ空间的图片。那么服务器怎么知道这个请求是站外发送的请求呢？
* 百度统计，Google 统计，是如何知道其用户是从何而来的呢

### Referer

在 HTTP 协议的头信息里面，有一个重要的 Referer 选项，代表网页的来源。如果是直接在浏览器中敲入地址，则没有 Referer 选项，如果是从站外的网站来请求 QQ空间 站内的图片，那么由于 Referer 不是站内的地址，则不能实现引用，这就是 QQ空间 的 **防盗链**。所以不能拿 QQ空间，百度图片，百度贴吧 作为**图床**，不稳定。

### 配置 Apache 图片防盗链

作用：防止我们站内的图片被别人盗用。

原理：对 Referer 进行分析，如果不是来自本站，则拒绝服务。

## HTTP 内容压缩

**引出问题**：有时候我们发现 content-length 的值与响应主体的长度不一致

**原因**：我们请求的头信息中，往往有 `Accept-Encoding: gzip` 这个属性，用来表示客户端可以允许的压缩协议，服务器可以通过这些协议将 Reponse 的主体信息压缩，然后返回给客户端，content-length 是压缩后的长度。

**实战中需要注意的地方**：对于常见的爬虫程序，我们在构造 Headers 时，不要加入支持的压缩协议这个键值，否则返回的数据，可能是压缩的数据，还需要进行解压。

## HTTP 持久连接，分块传输 和 应用

客户端与服务器通过 HTTP协议通信，客户端在收到 Content-Length 长度的内容后，就会自动断开连接。

那么，我们如何实现持久的连接，从而减少资源的消耗，实现 在线聊天 的应用呢？

在 HTTP/1.1 中，允许我们不指定 Content-Length，比如我们不知道要发送的内容长度，这时候我们就需要一个特殊的 `Content-Type: chunked`

分块传输的原理：

```
123H \r\n
123H长度的内容传输给客户端 \r\n
……
41H \r\n
客户端继续接受 41H 长度的内容 \r\n
……
0\r\n (服务器说内容发完了)
```

Python urllib 连接池应该就是基于分块传输的原理。 

## 实战 — 用 HTTP Post 请求实现自动化注册

步骤1. 抓包分析

```
请求行：
    请求方法：POST
    请求地址：/
    请求协议：HTTP/1.1
请求Header：
	Host: 127.0.0.1:8000
	Content-Type: application/x-www-form-urlencoded
	Content-Length: 200
	Cookie: csrftoken=Ogosp1RUaFAUlorzmd58H2WwJ8KvFXDJy3ybWWmRd7YJBuAwryXBDGeLQld7nKk8; sessionid=hcws2297v37svsk0oliqvqd10vnrc054
	
请求（提交）主体：
	csrfmiddlewaretoken=4CcHhpsA0WQ0XhBd0wyHXQp1QFt14W5KOpmqOkXx3oePdnKa5RqaTuHgXSWDMJM9&name=%E4%B8%9C%E9%91%AB&sex=1&profession=%E5%AD%A6%E7%94%9F&email=949178872%40qq.com&qq=949178872&phone=18851876323 
```

步骤2. 在 telnet（xshell 上有 telnet 的实现） 上对协议进行测试：

```
POST / HTTP/1.1
Host: localhost
Content-Type: application/x-www-form-urlencoded
Content-Length: 200
Cookie: xxxxxxx

csrfmiddlewaretoken=4CcHhpsA0WQ0XhBd0wyHXQp1QFt14W5KOpmqOkXx3oePdnKa5RqaTuHgXSWDMJM9&name=%E4%B8%9C%E9%91%AB&sex=1&profession=%E5%AD%A6%E7%94%9F&email=949178872%40qq.com&qq=949178872&phone=18851876323

```

测试成功后，就可以在脚本中模拟 POST 请求

步骤三：用一门语言，将上面的协议实现。

## 我的理解

* 微博爬虫之所以被监测到，是因为我们没有按照微博网站说定的协议来访问他们，也就是协议没有达成。

* 我们编程的是否也应该按照请求行，请求头信息，请求主体信息三要素来进行编程

* 网络上对于网站的请求，大多数都是 get/post 请求，如果我们掌握了这些 get/post 请求，就可以自己写脚本发起 HTTP 请求，然后实现一些自动化的操作，例如

  * Get 请求
    * 爬虫
    * 网站内容监控
  * Post 请求
    * 批量账号注册
    * 批量发帖
    * 批量发微博
    * 自动化删帖

  等自动化操作。

  其实这也涉及到网络安全的问题，别人利用 HTTP 请求，很容易就可以往数据库里写入大量的信息，发起大量的请求。

* 理论上讲，所有的网页操作，都可以用 HTTP 协议进行模拟，进而实现自动化。浏览器作为 HTTP 客户端，进行 HTTP 请求的发送，和自己写的 HTTP 客户端，进行 HTTP 发送，本质上是没有区别的，只要两者发送的 HTTP 消息一致，那么服务器就无法进行拦截。

* 如果想要实现缓存/压缩等服务，需要在 Web 服务器上进行配置
