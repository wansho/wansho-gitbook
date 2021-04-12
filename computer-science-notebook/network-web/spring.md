# Spring

[TOC]

## 教程

学习 Spring 最好的教程应该是廖雪峰的教程

* [廖雪峰 Java 教程](https://www.liaoxuefeng.com/wiki/1252599548343744/1309301178105890)
* [官方教程](https://spring.io/guides/gs/rest-service/)

## 概念

* 可以不学 spring 其他，直接学spring boot吗？ - 陈龙的回答 - 知乎 https://www.zhihu.com/question/303235503/answer/537538561
* Spring、SpringMVC和SpringBoot看这一篇就够了！ - 刘文正的文章 - 知乎 https://zhuanlan.zhihu.com/p/63117304

### JavaWeb 基本概念

| 名词                       | 解释                                                         | 备注                                                  |
| -------------------------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| jar                        | Java ARchive                                                 |                                                       |
| war                        | Java Web Application ARchive                                 |                                                       |
| jsp                        | Java Server Pages，html + `<% ... %>`，jsp 最终会被转换成 Servlet |                                                       |
| Java Servlet               | 能处理HTTP请求，发送HTTP响应的小程序                         |                                                       |
| Tomcat                     | JSP 程序运行容器                                             | Servlet容器                                           |
| POM                        | Project Object Model                                         | 胖母                                                  |
| Maven                      | 项目配置                                                     | 中文译名：专家，读作 妹文                             |
| Gradle                     | 功能和 Maven 类似                                            |                                                       |
| CRUD                       | create retrieve update delete                                |                                                       |
| self-contained application | 把环境依赖一起打包到程序中的应用，例如 electron 应用         |                                                       |
| JDBC                       | Java Database Connectivity is an [application programming interface](https://en.wikipedia.org/wiki/Application_programming_interface) (API) for Java |                                                       |
| JavaBean                   | 若干`private`实例字段； 通过`public`方法来读写实例字段。     | 就是对一个对象的封装                                  |
| component                  | 组件                                                         |                                                       |
| DAO                        | Data Access Object                                           |                                                       |
| ORM                        | Object-Relational Mapping                                    | [Hibernate](https://hibernate.org/) 就是一个 ORM 框架 |
| JPA                        | Java Persistence API                                         | JPA 也是一个 Java 的 ORM 框架                         |
| MyBatis                    |                                                              | 半自动化ORM框架                                       |

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

## Tutorial

* 使用 [Spring Initializr](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=2.4.3.RELEASE&packaging=jar&jvmVersion=1.8&groupId=com.example&artifactId=rest-service&name=rest-service&description=Demo project for Spring Boot&packageName=com.example.rest-service&dependencies=web) 新建 Spring 项目
* 使用 [https://start.spring.io](https://start.spring.io/) 手动搭建 Spring 项目

## Spring 学习路线

1. https://spring.io/quickstart
2. https://spring.io/guides/gs/rest-service/
3. https://spring.io/guides/gs/accessing-data-mysql/
4. https://spring.io/guides/gs/consuming-rest/
5. https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html
6. https://docs.spring.io/spring-boot/docs/2.4.4/reference/htmlsingle/
7. 廖雪峰 Spring 教程 https://www.liaoxuefeng.com/wiki/1252599548343744/1266263217140032

## 打包运行

打包：`mvnw clean package`，在 target 文件夹中生成 jar 包

运行：`java -jar xx.jar`

带参运行：

```shell
$ DB_HOST=10.0.1.123 DB_USER=prod DB_PASSWORD=xxxx java -jar xxx.jar
```



## Spring 学习笔记

* Spring 项目代码变更后，要重启服务器，新代码才能生效，不能代码热更新

* MVC 和 RESTful web 的区别

  A key difference between a traditional MVC controller and the RESTful web service controller shown earlier is the way that the HTTP response body is created. Rather than relying on a view technology to perform server-side rendering of the greeting data to HTML, this RESTful web service controller populates and returns a `Greeting` object. The object data will be written directly to the HTTP response as JSON.
  
  以前网页是前后端融合在一块的（我之前写的 Senti-weibo 网页，就是前后端融合在一块的，类似 JSP），Restful 标准是实现前后端分离的标准，一个后端服务就可以服务 Web、app 等多个前端平台。

## 廖雪峰 Spring 教程

IoC 和 AOP 都是为了抽象少写代码。

### IoC 容器

Inversion of Control。Spring的核心就是提供了一个IoC容器，它可以管理所有轻量级的JavaBean组件，提供的底层服务包括组件的生命周期管理、配置和组装服务、AOP支持，以及建立在AOP基础上的声明式事务服务等。

IoC又称为依赖注入（DI：Dependency Injection），它解决了一个最主要的问题：将组件的创建+配置与组件的使用相分离，并且，由 IoC 容器负责管理组件的生命周期。

在Spring的IoC容器中，我们把所有组件统称为JavaBean，即配置一个组件就是配置一个Bean。

### AOP

AOP 有 Python 装饰器的味道。

Aspect Oriented Programming 面向切面编程。AOP 是一种和 OOP 不同的新的编程范式。OOP 把系统看作多个对象的交互，AOP 把系统分解为不同的关注点，或者称之为切面（Aspect）。

切面实际上是代理设计模式。

如果我们以AOP的视角来编写上述业务，可以依次实现：

1. 核心逻辑，即BookService；
2. 切面逻辑，即：
3. 权限检查的Aspect；
4. 日志的Aspect；
5. 事务的Aspect。

然后，以某种方式，让框架来把上述3个Aspect以Proxy的方式“织入”到`BookService`中，这样一来，就不必编写复杂而冗长的Proxy模式。

如何把切面织入到核心逻辑中？这正是AOP需要解决的问题。换句话说，如果客户端获得了`BookService`的引用，当调用`bookService.createBook()`时，如何对调用方法进行拦截，并在拦截前后进行安全检查、日志、事务等处理，就相当于完成了所有业务功能。

AOP技术看上去比较神秘，但实际上，它本质就是一个动态代理，让我们把一些常用功能如权限检查、日志、事务等，从每个业务方法中剥离出来。

需要特别指出的是，AOP对于解决特定问题，例如事务管理非常有用，这是因为分散在各处的事务代码几乎是完全相同的，并且它们需要的参数（JDBC的Connection）也是固定的。另一些特定问题，如日志，就不那么容易实现，因为日志虽然简单，但打印日志的时候，经常需要捕获局部变量，如果使用AOP实现日志，我们只能输出固定格式的日志，因此，使用AOP时，必须适合特定的场景。

可见，虽然Spring容器内部实现AOP的逻辑比较复杂（需要使用AspectJ解析注解，并通过CGLIB实现代理类），但我们使用AOP非常简单，一共需要三步：

1. 定义执行方法，并在方法上通过AspectJ的注解告诉Spring应该在何处调用此方法；
2. 标记`@Component`和`@Aspect`；
3. 在`@Configuration`类上标注`@EnableAspectJAutoProxy`。

至于AspectJ的注入语法则比较复杂，请参考[Spring文档](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#aop-pointcuts-examples)。

无论是使用AspectJ语法，还是配合Annotation，使用AOP，实际上就是让Spring自动为我们创建一个Proxy，使得调用方能无感知地调用指定方法，但运行期却动态“织入”了其他逻辑，因此，AOP本质上就是一个[代理模式](https://www.liaoxuefeng.com/wiki/1252599548343744/1281319432618017)。（感觉就是 Python 的装饰器）

### Spring 访问数据库

[HSQLDB](http://hsqldb.org/)，一个用Java编写的关系数据库，可以以内存模式或者文件模式运行，本身只有一个jar包，非常适合演示代码或者测试代码。

介于全自动ORM如Hibernate和手写全部如JdbcTemplate之间，还有一种半自动的ORM，它只负责把ResultSet自动映射到Java Bean，或者自动填充Java Bean参数，但仍需自己写出SQL。[MyBatis](https://mybatis.org/)就是这样一种半自动化ORM框架。

使用MyBatis最大的问题是所有SQL都需要全部手写，优点是执行的SQL就是我们自己写的SQL，对SQL进行优化非常简单，也可以编写任意复杂的SQL，或者使用数据库的特定语法，但切换数据库可能就不太容易。好消息是大部分项目并没有切换数据库的需求，完全可以针对某个数据库编写尽可能优化的SQL。

### Spring Boot

Spring Boot是一个基于Spring的套件，它帮我们预组装了Spring的一系列组件，以便以尽可能少的代码和配置来开发基于Spring的Java应用程序。因此，Spring Boot和Spring的关系就是整车和零部件的关系，它们不是取代关系，试图跳过Spring直接学习Spring Boot是不可能的。

Spring Boot大量使用`XxxAutoConfiguration`来使得许多组件被自动化配置并创建，而这些创建过程又大量使用了Spring的Conditional功能。

Spring Boot自动装配功能是通过自动扫描+条件装配实现的。

开发者工具，只要源码或配置文件发生修改，Spring Boot应用可以自动重启：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
</dependency>
```





## Annotations

| Annotation                   | 作用对象   | 解释                                                         | 参数                                                       | 备注                       |
| ---------------------------- | ---------- | ------------------------------------------------------------ | ---------------------------------------------------------- | -------------------------- |
| @Component                   | 类         | 表示该类为一个组件                                           |                                                            | 定义了一个 Bean，单例      |
| @Autowired                   | 字段和方法 | 将指定类型的 Bean 注入到字段或者方法上                       | required = false 如果找不到对应的 Bean，就忽略，防止报错   | 通常用于字段               |
| @Configuration               | 类         | 配置类                                                       |                                                            |                            |
| @ComponentScan               | 类         | 告诉容器，自动搜索当前类所在的包以及子包，把所有标注为`@Component`的Bean自动创建出来，并根据`@Autowired`进行装配 |                                                            |                            |
| @Order                       | 类         | Component 注入 list 时指定 Bean 的顺序                       |                                                            | 从 @Order(1) 开始          |
| @Bean                        | 方法       | Bean 不在我们的包中，就在@Configuration 类中编写一个 Java 方法创建并返回它，并且给该方法标记一个 @Bean 注解 | @Bean("z") 给 Bean 起名字，从而创建多个实例                | 单例                       |
| @Qualifier                   | 方法       | `@Qualifier("utc8")` 给 Bean 起名字，破解单例                |                                                            |                            |
| @Primary                     | 方法       | 表示默认注入的 Bean                                          |                                                            | 主从数据库，配置默认数据库 |
| @Scope                       | 类         | @Scope(ConfigurableBeanFactory.<br />SCOPE_PROTOTYPE) 表示多例，每次调用返回一个新的实例 |                                                            |                            |
| @PostConstruct               | 方法       | 标记 `init()` 方法，表示 Bean 初始化时执行的动作             |                                                            |                            |
| @PreDestroy                  | 方法       | 标记 `shutdown()` 方法，表示 Bean 被销毁时执行的动作         |                                                            |                            |
| @Value                       | 字段       |                                                              | `@Value("classpath:/logo.txt")` 注入 Resource              |                            |
| @PropertySource              | 类         | 自动读取配置文件                                             | `@Value("${app.zone:Z}")` 提取 app.zone 的 value，默认为 Z |                            |
| @Profile                     | 方法       | 用来表示不同的环境，不同的环境创建不同的 Bean                | @Profile("!test") 非 test 环境                             |                            |
| @Conditional                 | 类         | 根据`@Conditional`决定是否创建某个Bean                       |                                                            |                            |
| @Aspect                      | 类         | 声明该类为切面类                                             |                                                            |                            |
| 拦截器                       |            |                                                              |                                                            |                            |
| @Before                      | 方法       | 在……之前执行该切面                                           |                                                            |                            |
| @After                       | 方法       |                                                              |                                                            |                            |
| @Around                      | 方法       | 在……前后执行该切面                                           |                                                            |                            |
| @AfterReturning              | 方法       | 和@After不同的是，只有当目标代码正常返回时，才执行拦截器代码； |                                                            |                            |
| @AfterThrowing               | 方法       | 和@After不同的是，只有当目标代码抛出了异常时，才执行拦截器代码； |                                                            |                            |
| @EnableAspectJAutoProxy      | 类         | Spring的IoC容器看到这个注解，就会自动查找带有`@Aspect`的Bean，然后根据每个方法的`@Before`、`@Around`等注解把AOP注入到特定的Bean中 |                                                            |                            |
| @EnableTransactionManagement | 类         | 启用声明式事务                                               |                                                            |                            |
| @Transactional               | 类/方法    | 表示类中所有  public 方法都支持事务 / 表示该方法支持事务     |                                                            |                            |
| @Entity                      | 类         | 如果一个JavaBean被用于映射，我们就标记一个`@Entity`          |                                                            |                            |
| @Table                       | 类         |                                                              | `@Table(name="users")` 指定映射的表名                      |                            |
| @Column                      | 方法       | 属性到数据库列的映射                                         |                                                            |                            |
| @Id                          | 方法       | 表示主键                                                     |                                                            |                            |
| @GeneratedValue              | 方法       | 表示自增                                                     |                                                            |                            |
| @MappedSuperclass            | 类         | 表示用于继承                                                 |                                                            |                            |
| @Transient                   | 方法       | 表示方法返回一个“虚拟”的属性                                 |                                                            |                            |
| @PrePersist                  | 方法       | 在我们将一个JavaBean持久化到数据库之前（即执行INSERT语句），Hibernate会先执行该方法 |                                                            |                            |
| @Select                      | 方法       | 表示 sql 语句                                                |                                                            |                            |
| @Param()                     | 参数       |                                                              |                                                            |                            |
| @MapperScan                  | 类         | 让MyBatis自动扫描指定包的所有Mapper并创建实现类              |                                                            |                            |
| @EnableWebMvc                | 类         | 启用 Spring MVC                                              |                                                            |                            |
|                              |            |                                                              |                                                            |                            |

## Dependencies

| Dependency               | 作用       | 备注                       |
| ------------------------ | ---------- | -------------------------- |
| spring-boot-maven-plugin | 打包       |                            |
| spring-boot-devtools     | 开发者工具 | 代码和配置更新后，自动更新 |
|                          |            |                            |



## 问题记录

### IDEA 的 cmd 不能执行 maven 命令

以管理员权限运行 IDEA。







