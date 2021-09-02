# Spring Aop

[TOC]

## 动态代理

aop 的核心机制是动态代理，有两种动态代理机制：

* JDK：基于接口（兄弟关系）
* cglib：基于父类（父子关系）

### jdk



### cglib

第三方的一个库，用于动态生成代理对象。

<img src="assets/image-20210902104906584.png" alt="image-20210902104906584" style="zoom:80%;" />



## spring aop 核心概念

![image-20210902090011382](assets/image-20210902090011382.png)

## AspectJ

aop 的一种实现框架，Spring 采用 aspectj 进行 aop 的开发配置。

### aspectj 基本配置

![image-20210902095453793](assets/image-20210902095453793.png)

### 切点表达式语法

![image-20210902095634442](assets/image-20210902095634442.png)

## 基于注解的 aop 开发

<img align="left" src="assets/image-20210902100956134.png" alt="image-20210902100956134" style="zoom:80%;" />