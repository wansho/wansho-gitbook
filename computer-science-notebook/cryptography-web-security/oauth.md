# OAuth

[TOC]

## 学习资料

* [[Wiki-OAuth]](https://en.wikipedia.org/wiki/OAuth)
* [[阮一峰 - OAuth 2.0 的一个简单解释]](http://www.ruanyifeng.com/blog/2019/04/oauth_design.html)
* [[阮一峰 - OAuth 2.0 的四种方式]](http://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)
* [阮一峰 - 理解OAuth 2.0](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)



## 学习笔记

OAuth 不能解决所有的验证问题，只能解决第三方客户端获取用户信息的问题。

现实中遇到 OAuth 问题，只需要代入几种角色，对号入座，问题即可迎刃而解。



### OAuth 中的几个概念

1. **Third-party application**：第三方应用程序，本文中又称"客户端"（client），即上一节例子中的"云冲印"。

2. **HTTP service**：HTTP服务提供商，本文中简称"服务提供商"，即上一节例子中的Google。

3. **Resource Owner**：资源所有者，本文中又称"用户"（user）。

4. **User Agent**：用户代理，本文中就是指浏览器。

5. **Authorization server**：认证服务器，即服务提供商专门用来处理认证的服务器。

6. **Resource server**：资源服务器，即服务提供商存放用户生成的资源的服务器。它与认证服务器，可以是同一台服务器，也可以是不同的服务器。



### OAuth 实例

* 第三方应用导向 GitHub，微信，QQ 进行认证，实际上就是为了获取授权码
* Strava 案例分析
* 对于常见的 web 系统来说，web 前端和 app 客户端，相对于后端服务来说，都是第三方客户端



### wiki

**OAuth** is an [open standard](https://en.wikipedia.org/wiki/Open_standard) for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords.

OAuth essentially allows [access tokens](https://en.wikipedia.org/wiki/Access_token) to be issued to third-party clients by an authorization server, with the approval of the resource owner. The third party then uses the access token to access the protected resources hosted by the resource server.

OAuth 有 1.0 和 2.0，2.0 不兼容 1.0



### 阮一峰 - 什么是 OAuth2

简单说，OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。

令牌（token）与密码（password）的作用是一样的，都可以进入系统，但是有三点差异。

（1）令牌是短期的，到期会自动失效，用户自己无法修改。密码一般长期有效，用户不修改，就不会发生变化。

（2）令牌可以被数据所有者撤销，会立即失效。以上例而言，屋主可以随时取消快递员的令牌。密码一般不允许被他人撤销。

（3）令牌有权限范围（scope），比如只能进小区的二号门。对于网络服务来说，只读令牌就比读写令牌更安全。密码一般是完整权限。

上面这些设计，保证了令牌既可以让第三方应用获得权限，同时又随时可控，不会危及系统安全。这就是 OAuth 2.0 的优点。

注意，只要知道了令牌，就能进入系统。系统一般不会再次确认身份，所以**令牌必须保密，泄漏令牌与泄漏密码的后果是一样的。** 这也是为什么令牌的有效期，一般都设置得很短的原因。



### 阮一峰 - OAuth 2.0 的四种方式

OAuth 2.0 的标准是 [RFC 6749](https://tools.ietf.org/html/rfc6749) 文件。该文件先解释了 OAuth 是什么。

> OAuth 引入了一个授权层，用来分离两种不同的角色：客户端和资源所有者。......资源所有者同意以后，资源服务器可以向客户端颁发令牌。客户端通过令牌，去请求数据。

这段话的意思就是，**OAuth 的核心就是向第三方应用颁发令牌。**然后，RFC 6749 接着写道：

> （由于互联网有多种场景，）本标准定义了获得令牌的四种授权方式（authorization grant ）。

也就是说，**OAuth 2.0 规定了四种获得令牌的流程。你可以选择最适合自己的那一种，向第三方应用颁发令牌。**下面就是这四种授权方式。

> - 授权码（authorization-code）
> - 隐藏式（implicit）
> - 密码式（password）：
> - 客户端凭证（client credentials）

注意，不管哪一种授权方式，第三方应用申请令牌之前，都必须先到系统备案，说明自己的身份，然后会拿到两个身份识别码：客户端 ID（client ID）和客户端密钥（client secret）。这是为了防止令牌被滥用，没有备案过的第三方应用，是不会拿到令牌的。



#### 授权码

**授权码（authorization code）方式，指的是第三方应用先申请一个授权码，然后再用该码获取令牌。**

这种方式是最常用的流程，安全性也最高，它适用于那些有后端的 Web 应用。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。

注意：A 网站是我们的网站！我们在 B 网站（例如微信！）上已经注册了一个用户，我们不想再在其他网站上注册新用户，想直接用 B 网站的用户！

第一步，A 网站（我们自己的网站，想用微信的用户登录）提供一个链接，用户点击后就会跳转到 B 网站（微信），授权用户数据给 A 网站使用。下面就是 A 网站跳转 B 网站的一个示意链接。

> ```javascript
> https://b.com/oauth/authorize?
>   response_type=code&
>   client_id=CLIENT_ID&
>   redirect_uri=CALLBACK_URL&
>   scope=read
> ```

上面 URL 中，`response_type`参数表示要求返回授权码（`code`），`client_id`参数让 B 知道是谁在请求，`redirect_uri`参数是 B 接受或拒绝请求后的跳转网址，`scope`参数表示要求的授权范围（这里是只读）。

![img](https://www.wangbase.com/blogimg/asset/201904/bg2019040902.jpg)

第二步，用户跳转后，B 网站会要求用户登录（我们也是 B 网站的用户！），然后询问是否同意给予 A 网站授权。用户表示同意，这时 B 网站就会跳回`redirect_uri`参数指定的网址（这个网址 A 网站后端的端点！）。跳转时，会传回一个授权码，就像下面这样。

> ```javascript
> https://a.com/callback?code=AUTHORIZATION_CODE
> ```

上面 URL 中，`code`参数就是授权码。

![img](https://www.wangbase.com/blogimg/asset/201904/bg2019040907.jpg)

第三步，A 网站拿到授权码以后，就可以在后端（注意，这里 A 向 B 请求令牌，是在后端发生的！），向 B 网站请求令牌。

> ```javascript
> https://b.com/oauth/token?
>  client_id=CLIENT_ID&
>  client_secret=CLIENT_SECRET&
>  grant_type=authorization_code&
>  code=AUTHORIZATION_CODE&
>  redirect_uri=CALLBACK_URL
> ```

上面 URL 中，`client_id`参数和`client_secret`参数用来让 B 确认 A 的身份（`client_secret`参数是保密的，因此只能在后端发请求），`grant_type`参数的值是`AUTHORIZATION_CODE`，表示采用的授权方式是授权码，`code`参数是上一步拿到的授权码，`redirect_uri`参数是令牌颁发后的回调网址。

![img](https://www.wangbase.com/blogimg/asset/201904/bg2019040904.jpg)

第四步，B 网站收到请求以后，就会颁发令牌。具体做法是向`redirect_uri`指定的网址，发送一段 JSON 数据。

> ```javascript
> {    
>   "access_token":"ACCESS_TOKEN",
>   "token_type":"bearer",
>   "expires_in":2592000,
>   "refresh_token":"REFRESH_TOKEN",
>   "scope":"read",
>   "uid":100101,
>   "info":{...}
> }
> ```

上面 JSON 数据中，`access_token`字段就是令牌，A 网站在后端拿到了。

![img](https://www.wangbase.com/blogimg/asset/201904/bg2019040905.jpg)

#### 简化模式



#### 密码模式 

resource owner password credentials



#### 客户端模式

client credentials