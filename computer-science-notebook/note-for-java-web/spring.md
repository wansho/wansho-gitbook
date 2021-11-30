# Spring

[TOC]

该笔记记录 Spring 的底层知识。



## 学习教程

* [廖雪峰 Java 教程](https://www.liaoxuefeng.com/wiki/1252599548343744/1309301178105890)



## Aspect Oriented Programming

### 动态代理

aop 的核心机制是动态代理，有两种动态代理机制：

* JDK：基于接口（兄弟关系）
* cglib：基于父类（父子关系）

### 几个概念

![image-20210902090011382](assets/image-20210902090011382.png)

AOP 有 Python 装饰器的味道。

Aspect Oriented Programming 面向切面编程。AOP 是一种和 OOP 不同的新的编程范式。OOP 把系统看作多个对象的交互，AOP 把系统分解为不同的关注点，或者称之为切面（Aspect）。

切面实际上是代理设计模式。



## 注解

| Annotation                                     | 作用对象   | 解释                                                         | 备注                                                         |
| ---------------------------------------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| @Component                                     | 类         | 表示该类为一个组件                                           | 定义了一个 Bean，单例                                        |
| @Autowired                                     | 字段和方法 | 将指定类型的 Bean 注入到字段或者方法上                       | required = false 如果找不到对应的 Bean，就忽略，防止报错。通常用于字段 |
| @Resource                                      | 字段       | @Resource默认按照byName方式进行bean匹配 @Resource(name = "tiger") |                                                              |
| @Service                                       | 类         | 声明该类是一个bean，这点很重要，因为该类是一个bean，其他的类才可以使用@Autowired将该类作为一个成员变量自动注入 |                                                              |
| @Configuration                                 | 类         | 告诉 Spring 这个类是一个配置类，等同于配置文件。配置类通常用于装配组件 |                                                              |
| @ComponentScan                                 | 类         | 告诉容器，自动搜索当前类所在的包以及子包，把所有标注为`@Component`的Bean自动创建出来，并根据`@Autowired`进行装配 |                                                              |
| @Order                                         | 类         | Component 注入 list 时指定 Bean 的顺序                       | 从 @Order(1) 开始                                            |
| @Bean                                          | 方法       | Bean 不在我们的包中，就在@Configuration 类中编写一个 Java 方法创建并返回它，并且给该方法标记一个 @Bean 注解。给容器中添加组件。以方法名作为组件的id。返回类型就是组件类型。返回的值，就是组件在容器中的实例 | 单例。                                                       |
| @Qualifier                                     | 方法       | `@Qualifier("utc8")` 给 Bean 起名字，破解单例                |                                                              |
| @Primary                                       | 方法       | 表示默认注入的 Bean                                          | 主从数据库，配置默认数据库                                   |
| @Scope                                         | 类         | @Scope(ConfigurableBeanFactory.<br />SCOPE_PROTOTYPE) 表示多例，每次调用返回一个新的实例 |                                                              |
| @PostConstruct                                 | 方法       | 标记 `init()` 方法，表示 Bean 初始化时执行的动作             |                                                              |
| @PreDestroy                                    | 方法       | 标记 `shutdown()` 方法，表示 Bean 被销毁时执行的动作         |                                                              |
| @Value                                         | 字段       | 加载配置文件中的属性进行注入                                 | `@Value("classpath:/logo.txt")` 注入 Resource                |
| @PropertySource                                | 类         | 配置自动读取配置文件 @PropertySource("application.yml") 表示从 application.yml 中读取配置 | `@Value("${app.zone:Z}")` 提取 app.zone 的 value，默认为 Z   |
| @Profile                                       | 方法       | 用来表示不同的环境，不同的环境创建不同的 Bean。@Profile("!test") 非 test 环境 |                                                              |
| @Conditional                                   | 类/方法    | 根据`@Conditional`决定是否创建并注入某个Bean到 IoC 中        |                                                              |
| @Aspect                                        | 类         | 声明该类为切面类                                             |                                                              |
| 拦截器                                         |            |                                                              |                                                              |
| @Before                                        | 方法       | 在……之前执行该切面                                           |                                                              |
| @After                                         | 方法       |                                                              |                                                              |
| @Around                                        | 方法       | 在……前后执行该切面                                           |                                                              |
| @AfterReturning                                | 方法       | 和@After不同的是，只有当目标代码正常返回时，才执行拦截器代码； |                                                              |
| @AfterThrowing                                 | 方法       | 和@After不同的是，只有当目标代码抛出了异常时，才执行拦截器代码； |                                                              |
| @EnableAspectJAutoProxy                        | 类         | Spring的IoC容器看到这个注解，就会自动查找带有`@Aspect`的Bean，然后根据每个方法的`@Before`、`@Around`等注解把AOP注入到特定的Bean中 |                                                              |
| @EnableTransactionManagement                   | 类         | 启用声明式事务                                               |                                                              |
| @Transactional                                 | 类/方法    | 表示类中所有  public 方法都支持事务 / 表示该方法支持事务     |                                                              |
| @Entity                                        | 类         | 如果一个JavaBean被用于映射，我们就标记一个`@Entity`          |                                                              |
| @Table                                         | 类         | `@Table(name="users")` 指定映射的表名                        |                                                              |
| @Column                                        | 方法       | 属性到数据库列的映射                                         |                                                              |
| @Id                                            | 方法       | 表示主键                                                     |                                                              |
| @GeneratedValue                                | 方法       | 表示自增                                                     |                                                              |
| @MappedSuperclass                              | 类         | 表示用于继承                                                 |                                                              |
| @Transient                                     | 方法       | 表示方法返回一个“虚拟”的属性                                 |                                                              |
| @PrePersist                                    | 方法       | 在我们将一个JavaBean持久化到数据库之前（即执行INSERT语句），Hibernate会先执行该方法 |                                                              |
| @Select                                        | 方法       | 表示 sql 语句                                                |                                                              |
| @Param()                                       | 参数       |                                                              |                                                              |
| @MapperScan                                    | 类         | 让MyBatis自动扫描指定包的所有Mapper并创建实现类              |                                                              |
| @EnableWebMvc                                  | 类         | 启用 Spring MVC                                              |                                                              |
| @Entity                                        | 类         | 用来注解该类是一个实体类用来进行和数据库中的表建立关联关系，首次启动项目的时候，默认会在数据中生成一个同实体类相同名字的表（table），也可以通过注解中的 name 属性来修改表（table）名称， 如@Entity(name=“user”) , 这样数据库中表的名称则是 user 。该注解十分重要，如果没有该注解首次启动项目的时候你会发现数据库没有生成对应的表。 |                                                              |
| @Table                                         | 类         | 该注解可以用来修改表的名字，该注解完全可以忽略掉不用，@Entity 注解已具备该注解的功能。 |                                                              |
| @Import                                        | 类         | 给容器中注入一个组件                                         |                                                              |
| @ImportResource                                | 类         | 从 xml 文件中导入 bean 配置                                  |                                                              |
| @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss") |            | 入参是字符串时间，接收类型是 date 类型，则自动转换成 date 类型（入参格式化） |                                                              |
| @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")   |            | 出参格式化 与 DateTimeFormat 相反，将 date 类型转为字符串    |                                                              |

