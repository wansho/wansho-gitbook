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

| 名词                       | 解释                                                         | 备注                                                         |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| jar                        | Java ARchive                                                 |                                                              |
| war                        | Java Web Application ARchive                                 |                                                              |
| jsp                        | Java Server Pages，html + `<% ... %>`，jsp 最终会被转换成 Servlet |                                                              |
| Java Servlet               | 能处理HTTP请求，发送HTTP响应的小程序                         |                                                              |
| Tomcat                     | JSP 程序运行容器                                             | Servlet容器                                                  |
| POM                        | Project Object Model                                         | 胖母                                                         |
| Maven                      | 项目配置                                                     | 中文译名：专家，读作 妹文                                    |
| Gradle                     | 功能和 Maven 类似                                            |                                                              |
| CRUD                       | create retrieve update delete                                |                                                              |
| self-contained application | 把环境依赖一起打包到程序中的应用，例如 electron 应用         |                                                              |
| JDBC                       | Java Database Connectivity is an [application programming interface](https://en.wikipedia.org/wiki/Application_programming_interface) (API) for Java |                                                              |
| JavaBean                   | 若干`private`实例字段； 通过`public`方法来读写实例字段。     | 就是对一个对象的封装                                         |
| component                  | 组件                                                         |                                                              |
| DAO                        | Data Access Object                                           |                                                              |
| ORM                        | Object-Relational Mapping                                    | [Hibernate](https://hibernate.org/) 就是一个 ORM 框架        |
| JPA                        | Java Persistence API                                         | JPA 也是一个 Java 的 ORM 框架                                |
| MyBatis                    |                                                              | 半自动化ORM框架                                              |
| POJO                       | Plain Old Java Object                                        |                                                              |
| YAML                       | Yet Anohter Markup Language                                  | yaml 中单引号会转义，双引号不会转义，单引号会将 `\n` 作为字符串输出，双引号会将 `\n` 作为换行输出 |

### Spring

Spring 是一整套解决方案，包含了 Spring Boot，Spring Cloud。

### Servlet

A servlet is a small Java program that runs within a Web server. Servlets receive and respond to requests from Web clients.

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

* **Controller层是不允许直接操作数据库**，Controller 层是负责调用 Service 的。一般的，一个Controller对应一个Service，一个Service对应一个Dao，一个Dao对应一个数据库表，当然根据项目或业务复杂程度，一个Controller可以调用多个Service，而一个Service也可以调用多个Dao，但是Controller层不允许互调，Service层也不允许互调，意思就是AController不能直接调用BController，AService也不能直接去调用BService，遵循高内聚低耦合原则！

## 廖雪峰 Java 教程

### Servlet 开发

Tomcat10 不再支持 javax，转为支持 jakarta

通过 maven 继承 Tomcat：https://www.liaoxuefeng.com/wiki/1252599548343744/1266264743830016

## 廖雪峰 Spring 教程

IoC 和 AOP 都是为了抽象少写代码。

### IoC 容器

Inversion of Control。Spring的核心就是提供了一个IoC容器，它可以管理所有轻量级的JavaBean组件，提供的底层服务包括组件的生命周期管理、配置和组装服务、AOP支持，以及建立在AOP基础上的声明式事务服务等。

IoC又称为依赖注入（DI：Dependency Injection），它解决了一个最主要的问题：将组件的创建+配置与组件的使用相分离，并且，由 IoC 容器负责管理组件的生命周期。

在Spring的IoC容器中，**我们把所有组件统称为JavaBean，即配置一个组件就是配置一个Bean**。

使用Annotation配合自动扫描能大幅简化Spring的配置，我们只需要保证：

- 每个Bean被标注为`@Component`并正确使用`@Autowired`注入；
- 配置类被标注为`@Configuration`和`@ComponentScan`；
- 所有Bean均在指定包以及子包内。

### AOP

![image-20210902090011382](assets/image-20210902090011382.png)

AOP 有 Python 装饰器的味道。

Aspect Oriented Programming 面向切面编程。AOP 是一种和 OOP 不同的新的编程范式。OOP 把系统看作多个对象的交互，AOP 把系统分解为不同的关注点，或者称之为切面（Aspect）。

切面实际上是代理设计模式。

如果我们以AOP的视角来编写上述业务，可以依次实现：

1. 核心逻辑，即BookService；
2. 切面逻辑，即：
3. 权限检查的Aspect；
4. 日志的Aspect；
5. 事务的Aspect。

然后，以某种方式，让框架来把上述3个 Aspect 以 Proxy 的方式“织入”到 `BookService` 中，这样一来，就不必编写复杂而冗长的Proxy模式。

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

### SpringCloud

Spring Cloud顾名思义是跟云相关的，云程序实际上就是指分布式应用程序，所以Spring Cloud就是为了让分布式应用程序编写更方便，更容易而提供的一组基础设施，它的核心是Spring框架，利用Spring Boot的自动配置，力图实现最简化的分布式应用程序开发。



## Annotations

| Annotation                   | 作用对象   | 解释                                                         | 备注                                                         |
| ---------------------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| @Component                   | 类         | 表示该类为一个组件                                           | 定义了一个 Bean，单例                                        |
| @Autowired                   | 字段和方法 | 将指定类型的 Bean 注入到字段或者方法上                       | required = false 如果找不到对应的 Bean，就忽略，防止报错。通常用于字段 |
| @Resource                    | 字段       | @Resource默认按照byName方式进行bean匹配 @Resource(name = "tiger") |                                                              |
| @Service                     | 类         | 声明该类是一个bean，这点很重要，因为该类是一个bean，其他的类才可以使用@Autowired将该类作为一个成员变量自动注入 |                                                              |
| @Configuration               | 类         | 告诉 Spring 这个类是一个配置类，等同于配置文件。配置类通常用于装配组件 |                                                              |
| @ComponentScan               | 类         | 告诉容器，自动搜索当前类所在的包以及子包，把所有标注为`@Component`的Bean自动创建出来，并根据`@Autowired`进行装配 |                                                              |
| @Order                       | 类         | Component 注入 list 时指定 Bean 的顺序                       | 从 @Order(1) 开始                                            |
| @Bean                        | 方法       | Bean 不在我们的包中，就在@Configuration 类中编写一个 Java 方法创建并返回它，并且给该方法标记一个 @Bean 注解。给容器中添加组件。以方法名作为组件的id。返回类型就是组件类型。返回的值，就是组件在容器中的实例 | 单例。                                                       |
| @Qualifier                   | 方法       | `@Qualifier("utc8")` 给 Bean 起名字，破解单例                |                                                              |
| @Primary                     | 方法       | 表示默认注入的 Bean                                          | 主从数据库，配置默认数据库                                   |
| @Scope                       | 类         | @Scope(ConfigurableBeanFactory.<br />SCOPE_PROTOTYPE) 表示多例，每次调用返回一个新的实例 |                                                              |
| @PostConstruct               | 方法       | 标记 `init()` 方法，表示 Bean 初始化时执行的动作             |                                                              |
| @PreDestroy                  | 方法       | 标记 `shutdown()` 方法，表示 Bean 被销毁时执行的动作         |                                                              |
| @Value                       | 字段       | 加载配置文件中的属性进行注入                                 | `@Value("classpath:/logo.txt")` 注入 Resource                |
| @PropertySource              | 类         | 配置自动读取配置文件 @PropertySource("application.yml") 表示从 application.yml 中读取配置 | `@Value("${app.zone:Z}")` 提取 app.zone 的 value，默认为 Z   |
| @Profile                     | 方法       | 用来表示不同的环境，不同的环境创建不同的 Bean。@Profile("!test") 非 test 环境 |                                                              |
| @Conditional                 | 类/方法    | 根据`@Conditional`决定是否创建并注入某个Bean到 IoC 中        |                                                              |
| @Aspect                      | 类         | 声明该类为切面类                                             |                                                              |
| 拦截器                       |            |                                                              |                                                              |
| @Before                      | 方法       | 在……之前执行该切面                                           |                                                              |
| @After                       | 方法       |                                                              |                                                              |
| @Around                      | 方法       | 在……前后执行该切面                                           |                                                              |
| @AfterReturning              | 方法       | 和@After不同的是，只有当目标代码正常返回时，才执行拦截器代码； |                                                              |
| @AfterThrowing               | 方法       | 和@After不同的是，只有当目标代码抛出了异常时，才执行拦截器代码； |                                                              |
| @EnableAspectJAutoProxy      | 类         | Spring的IoC容器看到这个注解，就会自动查找带有`@Aspect`的Bean，然后根据每个方法的`@Before`、`@Around`等注解把AOP注入到特定的Bean中 |                                                              |
| @EnableTransactionManagement | 类         | 启用声明式事务                                               |                                                              |
| @Transactional               | 类/方法    | 表示类中所有  public 方法都支持事务 / 表示该方法支持事务     |                                                              |
| @Entity                      | 类         | 如果一个JavaBean被用于映射，我们就标记一个`@Entity`          |                                                              |
| @Table                       | 类         | `@Table(name="users")` 指定映射的表名                        |                                                              |
| @Column                      | 方法       | 属性到数据库列的映射                                         |                                                              |
| @Id                          | 方法       | 表示主键                                                     |                                                              |
| @GeneratedValue              | 方法       | 表示自增                                                     |                                                              |
| @MappedSuperclass            | 类         | 表示用于继承                                                 |                                                              |
| @Transient                   | 方法       | 表示方法返回一个“虚拟”的属性                                 |                                                              |
| @PrePersist                  | 方法       | 在我们将一个JavaBean持久化到数据库之前（即执行INSERT语句），Hibernate会先执行该方法 |                                                              |
| @Select                      | 方法       | 表示 sql 语句                                                |                                                              |
| @Param()                     | 参数       |                                                              |                                                              |
| @MapperScan                  | 类         | 让MyBatis自动扫描指定包的所有Mapper并创建实现类              |                                                              |
| @EnableWebMvc                | 类         | 启用 Spring MVC                                              |                                                              |
| @Entity                      | 类         | 用来注解该类是一个实体类用来进行和数据库中的表建立关联关系，首次启动项目的时候，默认会在数据中生成一个同实体类相同名字的表（table），也可以通过注解中的 name 属性来修改表（table）名称， 如@Entity(name=“user”) , 这样数据库中表的名称则是 user 。该注解十分重要，如果没有该注解首次启动项目的时候你会发现数据库没有生成对应的表。 |                                                              |
| @Table                       | 类         | 该注解可以用来修改表的名字，该注解完全可以忽略掉不用，@Entity 注解已具备该注解的功能。 |                                                              |
| @Import                      | 类         | 给容器中注入一个组件                                         |                                                              |
| @ImportResource              | 类         | 从 xml 文件中导入 bean 配置                                  |                                                              |

## Dependencies

| Dependency                   | 作用                      | 备注                       |
| ---------------------------- | ------------------------- | -------------------------- |
| spring-boot-maven-plugin     | 打包                      |                            |
| spring-boot-devtools         | 开发者工具                | 代码和配置更新后，自动更新 |
| spring-boot-starter-actuator | SpringBoot 内置的监控系统 |                            |

## project structure

```
DTO(Data Transfer Object)：数据传输对象， Service 或 Manager 向外传输的对象
QO(Query Object)：数据查询对象，controller 层接收上层的查询请求时的参数
entity: entity 对应数据库中的表
domain: pojo plain ordinary java object，可以存放不需要入库的对象模型
```



## 问题记录

### IDEA 的 cmd 不能执行 maven 命令

以管理员权限运行 IDEA。



## 组件

### Swagger

Swagger是一款RESTFUL接口的文档在线自动生成 + 功能测试功能软件。

**Spring 配置 Swagger**

在 `config/` 文件夹下，增加 swagger 的配置，文件名可以任意指定，通常设置为 `Swagger2Config`

```java
/**
 * 生成swagger2 API文档
 * @author 
 */
@Configuration
@EnableSwagger2
public class Swagger2Config {

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.xxx"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Swagger RESTful API")
                .contact(new Contact("author", "", "email"))
                .description("demo Server API")
                .termsOfServiceUrl("")
                .version("1.0")
                .build();
    }

}
```

 **使用 Swagger Annotations**

```java
@GetMapping("")
@ApiOperation(value = "测试数据库同步") // 注解接口名称
public long getNameByID(@ApiParam("查询的 ID") int id){ // 注解参数
    return 1;
}
```

**测试**

```
http://localhost:port/xxx/doc.html
```



其实可以用 PostMan 替代 Swagger……



### easypoi

Excel导出,Excel模板导出,Excel导入,Word模板导出。

### spring-boot-maven-plugin

用于简化部署！

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
```

用于创建一个可执行的 jar 包。fat jar。clean —> package

```
java -jar xxx.jar
```

注意，如果我们只是做依赖包，那么就不需要留着 main 方法，删除 main 文件后，会报错找不到主类，这个时候就需要删除这个组件了。

### lombok

lang bao k

lombok的主要作用是通过一些注解，消除样板式代码。简化 JavaBean 开发。在编译的时候生成 Java 代码。

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.10</version>
</dependency>
```

Demo:

```java
@ToString // 生成 toString 方法
@Data // 生成 Mountain 的 getter setter 
@AllArgsConstructor // 生成有参构造器
@NoArgsConstructor // 无参构造器
@EqualsAndHashCode // 用这些参数生成 hashcode
public class Mountain{
    private String name;
    private double longitude;
    private String country;
}
```

```java
@Slf4j
// 等价于
private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(LogExample.class);
```

注意：需要在 IDEA 中安装 lombok 插件。setting - plugins 

### devtools

用于代码热更新，不用频繁重启 spring 项目了

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

代码配置更新后，ctrl + f9（build project），dev-tools 就会自动热更新了，不用重启服务器。

实际上，静态页面不需要重启，但是 Java 代码更新后，还是需要重启的

### spring-boot-configuration-processor

自定义类绑定的配置提示

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

注意打包的时候不要加进去：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <excludes>
                    <exclude>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-configuration-processor</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```



## SpringBoot Scheduling

https://spring.io/guides/gs/scheduling-tasks/

创建 `scheduledtask` 包，然后在该包下新建定时任务。

java 的 crontab 可以精确到秒。

```java
@Component // 必须要加该注解，表示这是一个组件，这样 IoC 容器才会自动生成该对象
@EnableScheduling
public class SyncSchedule {

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Scheduled(cron = "*/3 * * * * *") // 每 3 秒执行一次
    public void schedulingDemo(){
        System.out.println("The time is now {}", dateFormat.format(new Date()));
    }
}
```

在分布式环境中，还要为 Schedule 配置分布式锁：

```java
@Component
@EnableScheduling
@Slf4j
@PropertySource("application.yml")
public class SyncSchedule {

    public SyncSchedule(@Value("${cron}")String cron) throws NoSuchMethodException, NoSuchFieldException, IllegalAccessException {
        // 动态修改定时器注解的定时任务
        Method method = SyncSchedule.class.getDeclaredMethod("schedulingDemo");
        if ( method != null ) {
            Scheduled scheduledAnnotation = method.getAnnotation(Scheduled.class);
            InvocationHandler handler = Proxy.getInvocationHandler(scheduledAnnotation);
            Field hField = handler.getClass().getDeclaredField("memberValues");
            hField.setAccessible(true);
            Map memberValues = (Map) hField.get(handler);
            memberValues.put("cron", cron);
        }
    }

    /**
    * 定时程序，触发频率可以在 application.yml 中修改
    * @param
    * @return
    */
    @Scheduled(cron = "*/3 * * * * *")
    @SchedulerLock(name = "res_schedulingDemo", lockAtMostFor = "10m", lockAtLeastFor = "10m")
    public void schedulingDemo(){
        log.info("schedulingDemo run...");
    }
}
```

其中 `name` 必须要取，`lockAtMostFor` 表示加锁时间不能超过 10m，超过 10m 就释放锁，`lockAtLeastFor` 表示加锁至少 10m。

By setting `lockAtMostFor` we make sure that the lock is released even if the node dies and by setting `lockAtLeastFor` we make sure it's not executed more than once in fifteen minutes. Please note that **`lockAtMostFor` is just a safety net in case that the node executing the task dies, so set it to a time that is significantly larger than maximum estimated execution time.** If the task takes longer than `lockAtMostFor`, it may be executed again and the results will be unpredictable (more processes will hold the lock).



Reference：

* https://note.youdao.com/ynoteshare1/index.html?id=fe2f77731cd2b9196f1184a093989488&type=note
* https://github.com/lukas-krecan/ShedLock#jdbctemplate



## SpringBoot 自定义 starter

SpringBoot四大核心之starter——自定义starter - 贺贺学编程的文章 - 知乎 https://zhuanlan.zhihu.com/p/343094626

## POM 文件

https://maven.apache.org/pom.html

## 高级特性

### Profile

环境切换

profile 还可以用作条件装配

配合 snakeyml 可以实现   `active: @profile.env@` 动态配置

每一次切换配置文件，都要 reload 一下 maven，否则会报下面这个错误：

```
found character '@' that cannot start any token. (Do not use @ for indentation)
 in 'reader', line 6, column 13:
        active: @profile.env@
```

<img align="left" src="assets/image-20210630081937810.png" alt="image-20210630081937810" style="zoom:80%;" />

```xml
<profiles>
    <!-- 开发/测试环境，默认激活 -->
    <profile>
        <id>test</id> <!-- 此处的 test 对应上图中的 test -->
        <properties> <!-- 定义该 profile 持有的三个变量 -->
            <application.exclude>-pro</application.exclude>
            <bootstrap.exclude>pro</bootstrap.exclude>
            <profile.env>test</profile.env>
        </properties>
    </profile>

    <!-- 生产环境 -->
    <profile>
        <id>pro</id>
        <properties>
            <!-- 支持通配符，这里表示在选中 pro 进行打包的时候，排除掉所有以 application-开头的配置，也就是排除掉了所有的 application yml 文件 -->
            <application.exclude>-*</application.exclude>
            <bootstrap.exclude>test</bootstrap.exclude>
            <profile.env>pro</profile.env>
        </properties>
        <activation>
            <!--默认启用的是pro环境配置 -->
            <activeByDefault>true</activeByDefault>
        </activation>
    </profile>
</profiles>

<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <excludes> <!-- 在打包的时候，IDE 会看我们勾选了哪一个环境，加入勾选了 test 环境，那么下面这两个 exclude 就把  application-pro.yml 和 bootstrap-pro.yml 屏蔽掉，这两个变量指向的是 test 环境配置的变量 -->
                <exclude>application${application.exclude}.yml</exclude> 
                <exclude>bootstrap-${bootstrap.exclude}.yml</exclude>
            </excludes>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

### bootstrap.yml

bootstrap.yml 比 application.yml 先加载，具有更高的优先级，并且不会被覆盖。

bootstrap.yml 用来程序引导时执行，应用于更加早期配置信息读取。可以理解成系统级别的一些参数配置，这些参数一般是不会变动的。一旦bootStrap.yml 被加载，则内容不会被覆盖。

application.yml 可以用来定义应用级别的， 应用程序特有配置信息，可以用来配置后续各个模块中需使用的公共参数等。

bootstrap 主要用于配置 SpringCloud 微服务。

## SpringBoot 全局异常处理

SpringBoot中有一个`ControllerAdvice`的注解，使用该注解表示开启了全局异常的捕获，我们只需在自定义一个方法使用`ExceptionHandler` 注解然后定义捕获异常的类型即可对这些捕获的异常进行统一的处理。

https://www.cnblogs.com/xuwujing/p/10933082.html

## yml 文件

yml 文件中的配置，如果是数字的配置，可以用 int 来接。
