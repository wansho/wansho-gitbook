# Java 开发工具

[TOC]

## JDK

Open-JDK

版本：Java8 (Lambda 特性) ，可以使用最新版本

下载地址：[Open-JDK](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=hotspot)



## Apache Maven

[[download]](https://maven.apache.org/download.cgi)

Java 的包管理器，类似于 JS 的 npm，yarn，Python 的 pip

Maven 是免安装的，没有安装包，下载下来解压就能用

## PostMan

测试工具，可以保存设置。



## Mock 数据

伪造后端数据。

https://zhuanlan.zhihu.com/p/77199413

在实际的项目研发过程中，我们经常会遇到如下的尴尬场景：

前端开发依赖于后端接口数据，但是后台人员不足或者无法立即到位，前端迟迟不能开工，或者前端小伙子自己参照ui设计图，完成对应的静态页面（没有数据交互），待后台人员到位，再进行二次开发，协助完成接口对接。

可以用来 mock 数据的工具：rap2 http://rap2.taobao.org/

## 技术栈

### Front-End

[AntDesign (based on React)](https://ant.design/)

前端打包工具：webpack，相当于 C++ 中的 Makefile 工具

### Back-End

#### Abstract

[[Wiki Microservices]](https://en.wikipedia.org/wiki/Microservices) 微服务是一个软件架构形式。在这个架构中，复杂的应用程序是由多个小而独立的进程组成，每一个 进程通过独立于语言的接口进行相互交流。这些服务较小、高度解耦且专注于完成一个小任务，使得 用模块化方法建设系统更加容易。

容器化，将不同的服务相互隔离，采用统一的网关进行流量管理（类似百度的 BFE）：

* 服务发现：注册 + 心跳
* 服务通信
  * 同步调用：REST，RPC
  * 异步调用：消息队列（Kafka，RocketMQ，ActiveMQ），Redis
* 服务部署
  * WAR包形式基于tomcat部署
  * JAR包形式基于自带独立web容器部署（需占用独立端口）
  * Docker镜像方式部署，由 k8s 管理
* 应用服务框架：Spring Boot
* 微服务框架：Spring cloud
* 负载均衡：haproxy
* 注册中心，配置中心：nacos，eureka
* Web 服务器：tomcat
* 认证：Spring Security Oauth2

#### Nacos

[Nacos](https://nacos.io/en-us/docs/what-is-nacos.html) is committed to help you **discover**, **configure**, and **manage** your **microservices**. It provides a set of simple and useful features enabling you to realize dynamic service discovery, service configuration, service metadata and traffic management.

### Microservices

[[什么是微服务架构？- 老刘的回答]](https://www.zhihu.com/question/65502802/answer/802678798)

[[什么是微服务架构？]](https://www.zhihu.com/question/65502802)

### ORM

ORM（Object Relational Mapping）, ORM 举例：Django ORM，Java Mybatis puls

优点：替换 SQL 语句，提供获取数据的标准化，避免因为 SQL 查询导致的各种问题，例如 SQL 注入等问题

### RPC

gRPC is a modern, open source **remote procedure call** (RPC) framework that can run anywhere. It enables client and server applications to communicate transparently, and makes it easier to build connected systems. 

<img align="left" src="assets/image-20201106091824908.png" alt="image-20201106091824908" style="zoom:50%;" />

### 负载均衡

**haproxy**

[[haproxy]](http://www.haproxy.org/) The Reliable, High Performance TCP/HTTP **Load Balancer**. 

haproxy 的主要功能就是负载均衡。

HAProxy is a free, very fast and reliable solution offering [high availability](http://en.wikipedia.org/wiki/High_availability), [load balancing](http://en.wikipedia.org/wiki/Load_balancer), and proxying for TCP and HTTP-based applications. It is particularly suited for very high traffic web sites and powers quite a number of the world's most visited ones. Over the years it has become the de-facto standard opensource load balancer, is now shipped with most mainstream Linux distributions, and is often deployed by default in cloud platforms.

**nginx**

nginx 的主要功能是 web 服务器。兼职负载均衡和反向代理。

**keepalived**

[[keepalived]](https://www.keepalived.org/) 是一款路由软件。

反向代理