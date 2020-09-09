# Java Web Env

[TOC]

## 开发环境配置

### IDE

[**IntelliJ IDEA**](https://www.jetbrains.com/idea/)

2020.2 版本后的 IDEA 暂时无法破解，所以使用历史版本：2019.3.5 [[download]](https://download.jetbrains.com/idea/ideaIU-2019.3.5.exe?_ga=2.167713214.1472044068.1599574265-921529009.1596531522) [[破解教程]](https://my.oschina.net/u/4330928/blog/3230470) [[jar包在网盘中]](链接：https://pan.baidu.com/s/1opYMrq1HpDtBUP-1lAnmFQ  提取码：i26t)

需要安装的插件 Plugins：

* [Lombok](https://projectlombok.org/) 简化 Java 代码 （读作：lang bao ke）
* [Alibaba Java Coding Guidelines](https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines/) 阿里巴巴 Java 代码规范

### Open-JDK

版本：Java8 (Lambda 特性) ，可以使用最新版本

下载地址：[Open-JDK](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=hotspot)

### Apache Maven

[[download]](https://maven.apache.org/download.cgi)

Java 的包管理器，类似于 JS 的 npm，yarn，Python 的 pip

Maven 是免安装的，没有安装包，下载下来解压就能用

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



## 其他软件

* [SourceTree](https://www.sourcetreeapp.com/) Git 的一个装饰器，提供了很多可视化工具

* [Postman](https://www.postman.com/downloads/) API 设计软件

  



