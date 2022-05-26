# JSON Web Token

JSON Web Token（缩写 JWT）是目前最流行的跨域认证解决方案

[TOC]

## 阮一峰 jwt 的前世今生

### 跨域认证的问题

由于 http 是无状态的，所以常用的认证流程通常是这样的：

```
1、用户向服务器发送用户名和密码。

2、服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。

3、服务器向用户返回一个 session_id，写入用户的 Cookie。

4、用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。

5、服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。
```

单个服务，用 session 来存储登录状态没问题，但是如果有多个系统，需要跨域共用 session 的话，就不行了，因为 cookie 不能跨域。举例来说，A 网站和 B 网站是同一家公司的关联服务。现在要求，用户只要在其中一个网站登录，再访问另一个网站就会自动登录，请问怎么实现？

怎么把用户信息传给另一个网站呢？用户信息可以存储到 localStorage 中，要跨域的时候，从 localStorage 中取出来，通过 post 请求发送给其他网站。

### jwt 的原理

session 用户登录信息，是存储在服务端的，但是这需要服务端去维护 session，很麻烦。jwt 实现了服务端的无状态，不需要再保存 session，将登录状态的维护，交给了浏览器客户端。

jwt 的原理是，服务器认证以后，生成一个 JSON 对象，发回给用户，就像下面这样：

```json
{
  "姓名": "张三",
  "角色": "管理员",
  "到期时间": "2018年7月1日0点0分"
}
```

用户与服务端通信的时候，都要发回这个 JSON 对象。**服务器完全只靠这个对象认定用户身份**。

**那么用户如果篡改到期时间怎么办？这个好办？服务器给这个 json 签名就好了。**

### jwt 数据结构

一个典型的 jwt：

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOGU4M2E1MDlmYmU0YzNlOTAxMGM3YzVkYTk4NGRiMCIsInZlciI6IkRCMS4wIiwidXNlcl9uYW1lIjoid2Fuc2h1byIsInByaSI6WyJBRE1JTiJdLCJsYXN0X2xvZ2luIjoxNjM3NjUxODY2MDAwLCJzY29wZSI6WyJhbGwiXSwiaXNzIjoibnJlYyIsImV4cCI6MTYzNzczODI2NiwianRpIjoiNTEzZjk0MjctODFiMS00YzA5LThhMGYtMzYzZDAzMDUwMDU0IiwiY2xpZW50X2lkIjoiZnJvbnRlbmQifQ.gQv28a-m20LQBBx1U7yx_9qzoAGuP0ZqK9syop3wHqLFG_fUkWP2KD5AjaohSZ-x3ugiruGvDSrpa65PJvEeM3E1lVGSQHzFMMj_bv29saxqSIQotz4l808l_cgiVzCw57RftwisW4pMuGpRuhWXPwbAJOvLQ9EE58JKS7c6tXU
```

jwt 分为三段：

* **Header**（头部）：是一个 json 对象的 base64url 转码，json 对象存储了 jwt 元数据

  `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9` 解码后的数据

  ```json
  {"alg":"RS256","typ":"JWT"}
  ```

  `alg` 表示签名的算法，`typ` 表示令牌类型，统一为 jwt

* **Payload**（负载）

  `eyJzdWIiOiIwOGU4M2E1MDlmYmU0YzNlOTAxMGM3YzVkYTk4NGRiMCIsInZlciI6IkRCMS4wIiwidXNlcl9uYW1lIjoid2Fuc2h1byIsInByaSI6WyJBRE1JTiJdLCJsYXN0X2xvZ2luIjoxNjM3NjUxODY2MDAwLCJzY29wZSI6WyJhbGwiXSwiaXNzIjoibnJlYyIsImV4cCI6MTYzNzczODI2NiwianRpIjoiNTEzZjk0MjctODFiMS00YzA5LThhMGYtMzYzZDAzMDUwMDU0IiwiY2xpZW50X2lkIjoiZnJvbnRlbmQifQ` 经过 base64url 解码后得到：

  ```json
  {
  	"sub": "08e83a509fbe4c3e9010c7c5da984db0",
  	"ver": "DB1.0",
  	"user_name": "wanshuo",
  	"pri": ["xxx"],
  	"last_login": 1637651866000,
  	"iss": "nrec",
  	"exp": 1637738266,
  	"jti": "513f9427-81b1-4c09-8a0f-xxx",
  	"client_id": "xxx"
  }
  ```
  
  Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用。
  
  ```
  iss (issuer)：签发人
  exp (expiration time)：过期时间
  sub (subject)：主题
  aud (audience)：受众
  nbf (Not Before)：生效时间
  iat (Issued At)：签发时间
  jti (JWT ID)：编号
  ```
  
* **Signature**（签名）

  用服务端私钥对 header 和 payload 进行签名

  ```java
  HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), 私钥)
  ```

最后把三个部分用 `.` 号拼接起来，就形成了 jwt。

### jwt 的不可篡改性

1. 服务端生成 jwt 时，用私钥对 header 和 payload 进行签名
2. 用户与服务端交互时，带上 jwt，服务端对 header 和 payload 进行 base64url 解码，然后再用私钥生成对应的签名，如果两个签名没有匹配上，则说明 jwt 被篡改

### jwt 如何使用

1. 客户端收到 jwt 时，通常存入 localstorage
2. 客户端在向服务端发起请求时，通常把 jwt 放入 http 请求头的 Authorization 中
3. 客户端在向另一个网站发起跨域请求时，通常把 jwt 放入 POST 请求参数中

### 注意

* jwt 虽然不可篡改，但是并非是加密的，所以 payload 中不要放敏感信息
* jwt 一经生成，无法销毁，所以不建议填写很长的有效期
* JWT 设计最大的亮点是 理论上 JWT 是无状态自包含的，也就是 JWT 里面可以带有大量标明用户身份的元数据，但是问题是：
  * 如果要吊销或者续签就必然是有状态的，否则分发出去的 token 不到自身过期可能一直有效，存在安全问题，过期时间过短又有需要不断更换 token 的操作
  * 即使 token 校验本身通过，也只是完成 Authentication 阶段，对于 authorization 阶段仍然需要到后端数据库去查询用户允许做什么，不允许做什么，用 Stack Overflow 那个老哥的原话是： You are going to hit the database anyway.


​		

## IT 老齐 jwt 实战应用



### 前后端分离的 jwt 认证

方案一：网关统一校验

<img align="left" src="assets/image-20211123161342490.png" alt="image-20211123161342490" style="zoom:80%;" />



方案二：应用认证方案

<img align="left" src="assets/image-20211123161648504.png" alt="image-20211123161648504" style="zoom:80%;" />



可以通过自定义注解，利用 AOP 做验签。

```java
@GetMapping("/xxx")
@CheckJwt
public void xxx(){
    // controller 代码
}
```

两种方案比较：

* 方案一：jwt 校验无感知，验签过程无侵入，执行效率低（并不是所有的请求，都有权限控制，有的请求不需要验签），适用于低并发企业级应用
* 方案二：控制更加灵活，有一定代码入侵，代码可以灵活控制，适合追求性能的互联网应用

### jwt 续签

**为什么要续签**

jwt 因为有 expire 超时时间，所以必然会失效：

<img align="left" src="assets/image-20211123162826008.png" alt="image-20211123162826008" style="zoom:80%;" />

如果到期的时候，用户正在进行转账，怎么办？用户体验太差了！

那么 jwt 不设置超时时间行不行？不可以，会留下“太空垃圾”，后患无穷。例如 jwt 被泄露后，其他人就可以使用 jwt 来假冒我们的身份进行登录，转走我们的 money。

而且必须要有续签功能，延长 jwt 的使用时间。同时 jwt 也要有退出机制，不能有无限续签。

**续签方式：不改变 token 令牌实现续签**

<img align="left" src="assets/image-20211123164458187.png" alt="image-20211123164458187" style="zoom: 67%;" />

加入 Redis 后，jwt 中的过期时间就不需要校验了，转而校验 redis 中的过期时间。过期时间被放在 Redis 中，可以灵活控制。

在生成 md5 签名时加入环境特征，尽量避免了认为盗取。

这个方案意味着 jwt 在服务端是有状态的，但是这样保证了不改变 jwt 令牌。

**续签方式：允许改变 Token 令牌实现续签**

认证中心返回两个 token，一个 access_token，一个 refresh_token，refresh_token 决定了是否续签，是一个刷新的标识。

access_token 用于业务系统交互，是最核心的数据；refresh_token 只用于向认证中心获取新的 access_token 和 refresh_token。

<img align="left" src="assets/image-20211123165307202.png" alt="image-20211123165307202" style="zoom:67%;" />

<img align="left" src="assets/image-20211123165334932.png" alt="image-20211123165334932" style="zoom:67%;" />

<img align="left" src="assets/image-20211123165705986.png" alt="image-20211123165705986" style="zoom:67%;" />

两个 jwt 导致客户端变复杂了。
