# Spring

[TOC]

## 教程

[廖雪峰 Java 教程](https://www.liaoxuefeng.com/wiki/1252599548343744/1309301178105890)

## 概念

* 可以不学 spring 其他，直接学spring boot吗？ - 陈龙的回答 - 知乎 https://www.zhihu.com/question/303235503/answer/537538561
* Spring、SpringMVC和SpringBoot看这一篇就够了！ - 刘文正的文章 - 知乎 https://zhuanlan.zhihu.com/p/63117304

### JavaWeb 基本概念

| 名词         | 解释                                                         | 备注 |
| ------------ | ------------------------------------------------------------ | ---- |
| jar          | Java ARchive                                                 |      |
| war          | Java Web Application ARchive                                 |      |
| jsp          | Java Server Pages，html + `<% ... %>`，jsp 最终会被转换成 Servlet |      |
| Java Servlet | 能处理HTTP请求，发送HTTP响应的小程序                         |      |
| Tomcat       | JSP 程序运行容器                                             |      |



### Spring

Spring 是一整套解决方案，包含了 Spring Boot，Spring Cloud。

### SpringBoot

SpringBoot 是

### Maven

Java项目管理和构建工具，主要功能是依赖管理和项目打包，Maven 于 Java 就是 Python 的 pip

一个标准的 Java 项目：

```
a-maven-project
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   └── resources
│   └── test
│       ├── java
│       └── resources
└── target
```

A Project Object Model or POM is the fundamental unit of work in Maven. It is an XML file that contains information about the project and configuration details used by Maven to build the project. It contains default values for most projects. 

编译项目的命令：`mvn clean package` ，clean 是先执行 clean 周期并运行到 clean 这个phase，package 是执行 default 周期并运行到 package 这个 phase。先执行 clean 周期，再执行 package 周期。



mvnw: Maven Wrapper 就是给一个项目提供一个独立的，指定版本的Maven给它使用。

mvn 下载的依赖都放在了 `/.m2` 文件夹下了

war 包：`<packaging>war</packaging>` 打包生成 war （Java Web Application ARchive）包，有别于 jar（Java ARchive）包。



## 问题记录

### IDEA 的 cmd 不能执行 maven 命令

以管理员权限运行 IDEA。







