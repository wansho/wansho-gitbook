# SpringBoot Tutorial

https://www.bilibili.com/video/BV19K4y1L7MT

https://gitee.com/leifengyang/springboot2

https://www.yuque.com/atguigu/springboot

## 1. 基础入门

- Spring 2.0 + 要求 JDK 8 以上，Maven 3.3 以上。

- Spring5 重大升级，引入**响应式编程**，并借力 Java8 新特性。

- 响应式编程：使用少量的资源，实现大量的并发。 

- SpringBoot 的优点：

  - 创建独立 Spring 应用
  - 内嵌 Tomcat
  - 自动 starter（启动器）依赖，简化构建配置，**一个 starter 是一个依赖集合，包含了很多依赖**
  - 自动配置 Spring 以及第三方功能
  - 提供生产级别的监控、健康检查及外部化配置
  - 无代码生成、无需编写 xml

- 缺点

  - 人称版本帝，迭代快，需要时刻关注变化
  - 封装太深，内部原理复杂，不容易精通

- 时代背景

  - 微服务

    - 微服务是一种架构风格
    - 一个应用拆分为一组小型服务
    - 每个服务运行在自己的进程内，也就是可独立部署和升级
    - 服务之间使用轻量级HTTP交互
    - 服务围绕业务功能拆分
    - 可以由全自动部署机制独立部署
    - 去中心化，服务自治。服务可以使用不同的语言、不同的存储技术

  - 分布式

    SpringBoot + Spring Cloud

  - 云原生

    Cloud Native  上云

    服务自愈、弹性伸缩、服务隔离、自动化部署、灰度发布、流量治理

- First App

  - Maven: groupId 公司或组织名称，artifactId 项目名称，version 版本，三者合在一次作为唯一标志
  - 配置文件：`application.properties` 和 `application.yml` 优先加载 yml 文件

- 依赖管理

  pom.xml 中的 `<parent>` 的作用就是做依赖管理，几乎声明了所有开发中常用的 jar 包，parent 声明了版本号后，后面手动引入的 dependencies 都不需要写版本号了，parent 中都有

- Starters

  Starters are a set of convenient dependency descriptors that you can include in your application. You get a one-stop shop for all the Spring and related technologies that you need without having to hunt through sample code and copy-paste loads of dependency descriptors. For example, if you want to get started using Spring and JPA for database access, include the `spring-boot-starter-data-jpa` dependency in your project.

  The starters contain a lot of the dependencies that you need to get a project up and running quickly and with a consistent, supported set of managed transitive dependencies.

- 查看 IoC 容器中的组件

- 



