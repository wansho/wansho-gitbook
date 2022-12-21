# 应用层

[TOC]



## Socket API

传输层向应用层提供的服务，就是 Socket API，分为 TCP 和 UDP 两种 Socket。



## Socket 和 HTTP 的区别

HTTP 是应用层协议，其底层是 TCP 协议。

Socket 是传输层向应用层提供的网络服务 API。应用层的协议都依赖于 Socket。

HTTP 可以理解为在 Socket 提供连接的基础上，传输 HTTP 报文。



## 分布式进程通信需要解决的问题

在计算机网络中，两个进程的通信，其实是分布式的。我在浏览器(进程)上，访问百度(进程)的资源，是一种分布式的形式。

如果两个进程在同一台机器上，那么就不需要依靠计算机网络来通信了，可以通过操作系统提供的 API，或者管道，共享缓存，来实现进程通信。

分布式进程通信，需要解决的问题：

* 进程标识，寻址问题（主机IP，TCP/UDP，端口号 ）
* 传输层是如何向应用层的应用提供服务的 Socket API
* 应用之间如何实现报文交换



## 分布式应用通信模式

* Client Server 模式
* Peer to Peer 模式 



## 端口号的作用

区分同一台主机上的不同的应用。

在 TCP 和 UDP 的规范中，端口号占 16 个比特，一共有 65536 个端口号。



## 应用层向传输层传输的数据

* 谁发的：主机的 IP 和 端口号
* 谁收的：目标主机的 IP 和端口号
* 货物



## TCP Socket

包含源 IP，源端口，目标 IP，目标端口（四元组）的一个会话关系本地标识。

是应用层和传输层的一个约定，可以用一个整数（句柄，指针）来表示，应用层在和传输层发消息的时候，传给传输层一个整数标识，传输层看到这个标志，就找到了约定好的四元组。这样就避免了每一次向传输层传递信息的时候，都携带四元组的麻烦。便于管理，而且穿过层间的数据最小。

是应用层和传输层之间的一个约定。



对于使用面向连接服务（TCP）的应用而言，套接字是4元组的一个具有本地意义的标示

* 4元组：(源IP，源port，目标IP，目标port)

* 唯一的指定了一个会话（2个进程之间的会话关系）

* 应用使用这个标示，与远程的应用进程通信

* 不必在每一个报文的发送都要指定这4元组

就像使用操作系统打开一个文件，OS返回一个文件句柄一样，以后使用这个文件句柄，而不是使用这个文件的目录名、文件名

![image-20220425202603238](assets/image-20220425202603238.png)

通俗的解释，就是我们有一个稳定的生意伙伴，经常互发文件快递。那么我去顺丰快递那里，把我的大楼（IP），第几层（Port），伙伴的大楼（IP），伙伴第几层（Port）登记下来，顺丰快递返回给我们一个号码，下次寄件的时候，直接把号码和文件告诉顺丰就行了。



## UDP Socket

对于使用无连接服务（UDP）的应用而言，套接字是2元组的一个具有本地意义的标示

* 2元组：IP，port（源端指定）
* UDP套接字指定了应用所在的一个端节点（endpoint）
* 在发送数据报时，采用创建好的本地套接字（标示ID），就不必在发送每个报文中指明自己所采用的ip和port
* 但是在发送报文时，必须要指定对方的 ip 和 udp port(另外一个段节点)

![image-20220425203837380](assets/image-20220425203837380.png)

通俗地解释，就是我们有一个不稳定的伙伴，偶尔会寄文件，我去顺丰快递那里，只登记了我的大楼和楼层，顺丰返回给我一个号码。后面每一次寄文件的时候，我要给顺丰三样东西：我的号码，文件，对方的 ip 和 udp port。



## 应用层协议分类

* 公开协议

  由 RFC 文档定义，允许互操作，如 HTTP，SMTP

* 私有协议

  协议不公开，如 Skype 



## 应用层应用使用的传输层协议

![image-20220425210543707](assets/image-20220425210543707.png)



## 安全性 / SSL

TCP 和 UDP 都没有加密，明文通过互联网传输。



*Secure Sockets Layer* 

SSL 在 TCP 上面实现，提供加密的 TCP 连接。SSL 在应用层。https 跑在 ssl 之上。



## URL 格式

```
Prot://user:password@www.oldschool.edu/someDept/pic.gif:port
```



## HTTP 协议

客户端发起一个与服务器的 TCP 连接（建立套接字），端口号为 TCP-80。

服务端起来后，建立一个守候 Socket，监听 TCP-80 端口，有客户端发起请求后，则建立 socket1，socket2，与客户端进行通信，守候 Socket 不变。



## HTTP 请求报文

HTTP 请求报文都是 ASCII，可读



## HTTP Head 请求

只获取头部，通常用于搜索引擎构建索引。



## Cookie

第一次访问一个网站，没有 Cookie，服务端会返回一个 Cookie，浏览器会存储下来，第二次访问的时候，浏览器就会自动带上这个 Cookie，实现了用户的分辨（有状态）。



## web 缓存

缓存既是客户端，又是服务端，使用缓存的优点：

* 降低客户端的请求响应时间
* 大大降低网络链路的流量
* 使得请求在本地命中，降低了目标服务器的负担

互联网大量采用了缓存，可以使较弱的 ICP 也能提供有效内容（微博热点）

![image-20220428201703879](assets/image-20220428201703879.png)



## FTP 

服务端默认守护的端口：21

客户端的端口：20



## 邮件服务器

端口：25

三个主要组成部分：

* 用户代理（邮件客户端软件）
* 邮件服务器
* 简单邮件传输协议 SMTP

邮件服务器之间的 SMTP 协议：发送 email 报文

客户端：发送方邮件服务器

服务端：接收方邮件服务器

邮件服务器既作为客户端，又作为服务端。

用户代理把邮件发给自己的邮件服务器，使用 SMTP 协议，自己的邮件服务器，把邮件发到对方的邮件服务器，也使用 SMTP 协议。

![image-20220428203735317](assets/image-20220428203735317.png)

用户代理拉取邮件的协议：POP3，IMAP，HTTP。

![image-20220428204830542](assets/image-20220428204830542.png)

SMTP 协议负责推，HTTP/POP3/IMAP 负责拉取。



原始的 SMTP 协议只支持 ASCII 报文。中文一个字占两个字节，需要先经过 base64 编码成 ASCII，然后再传输。



## DNS 协议

Domain Name System

早期的 arpnet 维护了一张 hosts.txt 表，里面存储了域名到 IP 地址的映射。Hosts 文件就是源于此。

DNS 服务器，除了提供域名解析，还提供负载均衡的功能。例如我们访问 www.baidu.com，DNS 那边存储了 www.baidu.com 的不止一个机房的地址，DNS 会返回不同的 IP，进而实现负载均衡的功能。

![image-20220430190836374](assets/image-20220430190836374.png)

域名划分：

```
* 顶级域名
	* 通用域名 com / org / edu
	* 国家域名 cn / us / jp  	
```

全球有 13 个根名字服务器。查找的时候，从树根往下找，例如查找南航官网的 IP https://www.nuaa.edu.cn/ 先从 cn 往下找，再找 edu，再找 nuaa，再找 www，就找到了。



域名可以分成两种：

* 域的域名：可以用于表示一个域，一个域下面可能有多个子域或者主机，域管理其下的子域或者主机的划分。

  例如，.jp 划分了 .ac.jp，.co.jp 等若干个子域名，nuaa.edu.cn 划分了 www.nuaa.edu.cn 和 mail.nuaa.edu.cn 等若干个主机。

* 主机的域名：表示域里的一个主机



## 名字服务器 / 权威 DNS 服务器 / TTL

每个区域都有一个名字服务器（name server），维护着它所管辖区域的权威信息（authoritative record）。

权威 DNS 服务器：组织机构的 DNS 服务器，提供组织内的主机和 IP 的映射，组织机构可以选择自己实现并维护权威 DNS 服务器，或者交由服务提供商来维护。



ttl: time to live

如果我们查到的 IP 地址，是从权威 DNS 服务器上查到的，那么 ttl 就是无限大的，因为权威服务器维护的是该区域内的权威信息。

如果 IP 地址是从非权威 DNS 服务器查到的，而该条映射记录是非权威服务器从权威 DNS 服务器请求并缓存过来的，那么 TTL 就不是无限大了。因为 IP 地址可能会改变，权威服务器中的域名到 IP 的映射不是一成不变的，所以其他非权威 DNS 服务器上缓存的映射，是有有效期的，是会定期删除的，而 TTL 就是这个有效期，以秒为单位。

缓存是为了性能，删除是为了一致性。



name server 维护的资源记录，数据结构如下：

| name | ttl                                  | class                  | value   | type |
| ---- | ------------------------------------ | ---------------------- | ------- | ---- |
| 域名 | time to live(记录失效时间，单位为秒) | 类别，Internet 对应 IN | IP 地址 |      |

type 定义了 4 中 DNS 记录：

* type = A：表示 name 字段记录的是主机域名，value 字段记录的是 IP 地址
* type = CNAME(Canonical Name 真实名称): 表示 name 字段记录的是域名的别名，value 字段记录的是重定向到的最终域名，例如我想把 wansho.cn 域名定向到 wansho.top，那么 name 为 wansho.cn，value 为 wansho.top
* type = NS: 表示 name 字段记录的是域的名字，value 字段记录的是该域的 local name server 这台主机的名字

这种数据结构的设计方式，还是挺有意思的，有可取之处。



## 一个机器入网要配置的四个信息

* IP 地址
* 子网掩码
* DNS 服务器的 IP（通常配 local name server）
* default gateway 的 IP (我如果想要从子网内出去，要走哪个路由器，它的 IP 地址是什么)

这四个信息，要么自动配（DHCP协议），要么手动配。



## DNS 解析流程

输入一个主机的域名，hosts 文件中没有映射，则找 local name server（local name server 最好在子网内，这样就很快）来解析获取 IP，如果 local name server 缓存了我要访问的域名到 IP 的映射关系，那就最好了。

如果 local name server 缓存中没有这条 mapping，那么步骤如下（以访问 www.nuaa.edu.cn 为例）

先访问 cn DNS 服务器，再访问 edu.cn DNS 服务器，再访问 nuaa.edu.cn DNS服务器，最终查找到了主机名 www.nuaa.edu.cn 对应的 IP 地址为 xxx （顺着树根往下找，迭代查询）

一旦 name server 学到了一个映射，就将该映射缓存起来，提高查询效率，但是缓存还有一个过期时间。



## 添加一个域名的流程

在上级域的名字服务器中，增加两条记录：

* type = NS: 子域的名字，子域的 local name server 的主机域名
* type = A，子域的 local name server 的主机域名，子域的 local name server 的 IP 地址

至于子域内的各种应用，例如 ftp 应用对应的域名，邮箱应用对应的域名，都在子域的 local name server 维护就行了。



## P2P 架构

P2P 架构对比的是 C/S 架构。

P2P vs C/S：

* P2P 可以看成有无数个服务端，所以 P2P 很难被搞挂掉。

* P2P 没有服务端，不需要耗费服务器资源。



## CDN

Content Delivery Network 内容分发网络。

Netflix 和 YouTube 占据 37%，16% 的 ISP 下行流量。90% 的网络流量，是视频流量。服务器如何通过网络，向上百万用户同时流化视频内容？

视频是由一帧一帧的图片构成的，一秒 60 帧，就是一秒连续播放 60 张图片。



CDN 原理：

通过 CDN，全网部署缓存节点，存储服务内容，就近为用户提供服务，提高用户体验。CDN 分为两种：

* enter deep: 将 CDN 服务器深入到很多接入网

  更接近用户，数量多，离用户近，管理困难。Akamai 1700 多个 CDN 节点

* bing home: 部署少数（10个左右）关键位置，

在 CDN 节点中存储内容的多个拷贝，用户从 CDN 中请求内容，如果网络路径拥塞，可以选择不同的拷贝。

![image-20220504111022251](assets/image-20220504111022251.png)



案例：

| ![image-20220504112820633](assets/image-20220504112820633.png) | ![image-20220504113255400](assets/image-20220504113255400.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |





## 多媒体流化服务 DASH

DASH: Dynamic Adaptive Streaming over HTTP  流化播放  一边下，一边看。

服务器：

* 将视频文件切割成多个块
* 每个块独立存储，编码于不同码率（8 — 10 种）
* 告示文件（manifest file）：提供不同块的 url

客户端：

* 先获取告示文件
* 周期性地测量服务器到客户端的带宽
* 查询告示文件，在一个时刻请求一个块，HTTP 头部指定字节范围
  * 如果带宽足够，选择最大码率的视频块
  * 会话中的不同时刻，可以切换请求不同的编码块（取决于当时的可用带宽）

智能客户端（客户端自适应决定）：

* 什么时候去请求块（不至于缓存挨饿，或者溢出）
* 请求什么编码速率的视频快（当带宽够用时，请求高质量的视频块）
* 哪里去请求块（可以向离自己最近的服务器发送 url 请求，或者向高带宽可用服务器进行请求）



## Socket 编程

传输层提供两种传输协议，对应两种 Socket：

* TCP：可靠的字节流服务
* UDP：不可靠（数据UDP数据报）服务

从应用程序的角度，TCP 在客户端和服务器进程之间，提供了可靠的字节流管道服务。

服务器首先运行，等待连接建立：

1. 服务器进程必须先处于运行状态

   创建欢迎 socket，和本地端口捆绑，在欢迎 socket 上阻塞式等待接收用户的连接

客户端主动和服务器建立连接：

2. 创建客户端本地套接字（**隐式捆绑**到本地 Port）

   指定服务器进程的 IP 地址和端口号，与服务器进程连接。

3. 当与客户端连接请求到来时

   服务器接受来自客户端的请求，解除阻塞式等待，返回一个新的 socket（与欢迎 socket 不一样），与客户端通信

   允许服务器与多个客户端通信，使用源 IP 和源端口来区分不同的客户端

4. 连接 API 调用有效时，客户端 P 与服务器建立了 TCP 连接



## 浏览器和服务器打交道的过程

1. 主机上线，通过 DHCP 协议获得网络配置，通过 ISP 接入 Internet
2. 通过域名发起请求，经过 DNS 解析，获得 web 服务器的 IP 地址
3. 通过 TCP 协议建立连接，TCP 连接封装在 IP 分组中，一跳一跳地来传
4. 在 TCP 协议之上，两个应用进程之间通过 HTTP 报文进行交互