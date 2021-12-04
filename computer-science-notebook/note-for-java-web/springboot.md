# SpringBoot

[TOC]

## SpringBoot 开发经验

* **Controller层是不允许直接操作数据库**

  Controller 层是负责调用 Service 的。一般的，一个Controller对应一个Service，一个Service对应一个Dao，一个Dao对应一个数据库表，当然根据项目或业务复杂程度，一个Controller可以调用多个Service，而一个Service也可以调用多个Dao，但是Controller层不允许互调

* Tomcat10 不再支持 javax，转为支持 jakarta



### @Resource @Autowired 区别

1.  @Autowired 与 @Resource都可以用来装配bean. 都可以写在字段上,或写在setter方法上。

2.  @Autowired 默认按类型装配（这个注解属于 spring），默认情况下必须要求依赖对象必须存在，如果要允许null值，可以设置它的required属性为false，如：@Autowired(required=false) ，如果我们想使用名称装配可以结合@Qualifier注解进行使用

3.  @Resource（这个注解属于J2EE的），默认按照名称进行装配，名称可以通过name属性进行指定，如果没有指定name属性，当注解写在字段上时，默认取字段名进行安装名称查找，如果注解写在setter方法上默认取属性名进行装配。当找不到与名称匹配的bean时才按照类型进行装配。但是需要注意的是，如果name属性一旦指定，就只会按照名称进行装配。



## SpringBoot AOP

springboot aop 具体实现：https://blog.csdn.net/qq_33257527/article/details/82561635



## SpringBoot 项目代码结构

```
entity: entity 对应数据库中的表的映射
model
	dto: Data Transfer Object 数据传输对象， Service 向外传输的对象，命名规则 XxxDTO
	qo: 数据查询对象，controller 层接收上层的查询请求时的参数，命名规则 XxxQo
task: 存放定时任务，命名规则：XxxSchedule
```



## SpringBoot 自定义 starter

SpringBoot四大核心之starter——自定义starter - 贺贺学编程的文章 - 知乎 https://zhuanlan.zhihu.com/p/343094626

组件开发经验：不通组件，包路径可以一样，但是类名不能一样，如果冲突了，会报 bean 注入失败的错误。



## SpringBoot Scheduling

https://juejin.cn/post/6844904047237955592

https://spring.io/guides/gs/scheduling-tasks/

Cron expression must consist of 6 fields！没有年！！！

` [秒] [分] [时] [日] [月] [周]`

| 域   | 是否必填 | 值以及范围      | 通配符        |
| ---- | -------- | --------------- | ------------- |
| 秒   | 是       | 0-59            | , - * /       |
| 分   | 是       | 0-59            | , - * /       |
| 时   | 是       | 0-23            | , - * /       |
| 日   | 是       | 1-31            | , - * ? / L W |
| 月   | 是       | 1-12 或 JAN-DEC | , - * /       |
| 周   | 是       | 1-7 或 SUN-SAT  | , - * ? / L # |

通配符：

```
,  这里指的是在两个以上的时间点中都执行，如果我们在 “分” 这个域中定义为 8,12,35 ，则表示分别在第8分，第12分 第35分执行该定时任务。
-  这个比较好理解就是指定在某个域的连续范围，如果我们在 “时” 这个域中定义 1-6，则表示在1到6点之间每小时都触发一次，用 , 表示 1,2,3,4,5,6
*  表示所有值，可解读为 “每”。 如果在“日”这个域中设置 *,表示每一天都会触发。
?  表示不指定值。使用的场景为不需要关心当前设置这个字段的值。例如:要在每月的8号触发一个操作，但不关心是周几，我们可以这么设置 0 0 0 8 * ?
/  在某个域上周期性触发，该符号将其所在域中的表达式分为两个部分，其中第一部分是起始值，除了秒以外都会降低一个单位，比如 在 “秒” 上定义 5/10 表示从 第 5 秒开始 每 10 秒执行一次，而在 “分” 上则表示从 第 5 秒开始 每 10 分钟执行一次。
L  表示英文中的LAST 的意思，只能在 “日”和“周”中使用。在“日”中设置，表示当月的最后一天(依据当前月份，如果是二月还会依据是否是润年), 在“周”上表示周六，相当于”7”或”SAT”。如果在”L”前加上数字，则表示该数据的最后一个。例如在“周”上设置”7L”这样的格式,则表示“本月最后一个周六”
W  表示离指定日期的最近那个工作日(周一至周五)触发，只能在 “日” 中使用且只能用在具体的数字之后。若在“日”上置”15W”，表示离每月15号最近的那个工作日触发。假如15号正好是周六，则找最近的周五(14号)触发, 如果15号是周未，则找最近的下周一(16号)触发.如果15号正好在工作日(周一至周五)，则就在该天触发。如果是 “1W” 就只能往本月的下一个最近的工作日推不能跨月往上一个月推。
#  表示每月的第几个周几，只能作用于 “周” 上。例如 ”2#3” 表示在每月的第三个周二。
```

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



## SpringBoot Boostrap

bootstrap.yml 比 application.yml 先加载，具有更高的优先级，并且不会被覆盖。

bootstrap.yml 用来程序引导时执行，应用于更加早期配置信息读取。可以理解成系统级别的一些参数配置，这些参数一般是不会变动的。一旦bootStrap.yml 被加载，则内容不会被覆盖。

application.yml 可以用来定义应用级别的， 应用程序特有配置信息，可以用来配置后续各个模块中需使用的公共参数等。

bootstrap 主要用于配置 SpringCloud 微服务。



## SpringBoot yml 配置文件

yml 文件中的配置，如果是数字的配置，可以用 int 或者 float 来接。



## SpringBoot 全局异常处理

SpringBoot中有一个`ControllerAdvice`的注解，使用该注解表示开启了全局异常的捕获，我们只需在自定义一个方法使用`ExceptionHandler` 注解然后定义捕获异常的类型即可对这些捕获的异常进行统一的处理。

https://www.cnblogs.com/xuwujing/p/10933082.html



## SpringBoot Profile 多开发环境 

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



## SpringBoot 程序版本控制

想要实现 jar 包程序的版本控制，可以在程序打包的时候，将 git commit 信息打到 jar 包中，然后通过 swagger 暴露出来。

这是一个公共的功能，可以抽取成公共组件！



## SpringBoot Controller HTTP 请求分类

### Get

```java
@GetMapping("/entity2groups/{groupId}/access")
@ApiOperation(value = "获取分组关联的实体ID集合")
public Result<List<String>> getEntitiesByGroup(@PathVariable("groupId") String groupId){
    List<String> entityIdList = entityToGroupService.findAllEntityByGroup(groupId);
    return Result.buildSuccess(entityIdList, "获取分组关联的实体集合");
}

@GetMapping("/get_id")
@ApiOperation(value = "测试 get_id")
public String findIdByName(@RequestParam(value = "name", defaultValue = "test_name") String name){
    return entityItemService.findIdByName(name);
}
```



### Post

```java
@PostMapping("/import")
@ApiOperation(value = "全量导入路由", notes = "全量导入，导入前路由库会清空")
public Result<Boolean> updateIndexRoute(@RequestBody List<RouteDTO> routeList) throws IOException, ClassNotFoundException {
    routeService.updateIndexRoute(routeList);
    return Result.buildSuccess();
}


// 注意这里配置了两个注解，@NotNull 和 @PathVariable，说明多个注解可以同时使用
// @NotNull 注解也有奇效，可以直接对传参进行控制
@PostMapping("/{tableName}/import")
@ApiOperation(value = "全量配置一张表的路由", notes = "全量导入，导入前该表的旧路由会被全部删除")
public Result<Boolean> updateIndexRouteByTableName(@PathVariable("tableName") @NotNull String tableName,
                                                   @RequestBody List<RouteDTO> routeList) throws IOException, ClassNotFoundException {
    routeService.updateIndexRouteByTableName(tableName, routeList);
    return Result.buildSuccess();
}
```





## SpringBoot 开发常用库

### Swagger

Swagger是一款RESTFUL接口的文档在线自动生成 + 功能测试功能软件。

配置：

在 `config/` 文件夹下，增加 swagger 的配置，文件名可以任意指定，通常设置为 `Swagger2Config`

 使用 Swagger Annotations

```java
@GetMapping("")
@ApiOperation(value = "测试数据库同步") // 注解接口名称
public long getNameByID(@ApiParam("查询的 ID") int id){ // 注解参数
    return 1;
}
```

```java
public class AuthorityInfoReq {
    @ApiModelProperty(name="服务ID", required = true)
    @NotNull(message = "服务ID不能缺少")
    @NotEmpty(message = "服务ID不能为空")
    private String serviceId;

    @ApiModelProperty("动作")
    private String operation;

    @ApiModelProperty(name="资源列表", required = true)
    @NotNull(message = "资源列表不能缺少")
    private List<ObjectResourceDto> resource;
}
```

**测试**

```
http://localhost:port/service-name/doc.html
```



### easypoi

Office 文档处理，生成 word, excel 文档



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



### RestTemplate

发起 http 请求的库。

get 请求的两种请求方式：

```java
@Resource
private RestTemplate restTemplate;
	
// getForEntity 是 Spring 对 HTTP请求响应 的封装
entity = httpClientTemplate.getForEntity(casUrl, String.class);
entity.getStatusCodeValue();
entity.getBody();

// getForObject函数实际上是对getForEntity函数的进一步封装，是对消息体的进一步封装
IG507StockInfo responseStockInfo = restTemplate.getForObject(ig507Url, IG507StockInfo.class);
```



### FastJSON







## SpringBoot 项目测试

### 单元测试

#### 重要性

* 与 Maven 的配合，clean - test 会把所有的单元测试跑一遍
* Junit 类具有 Spring 的功能，@Autowired、比如 @Transactional 标注测试方法，测试完成后自动回滚

#### 注意事项

* 在单元测试中，要使用 Assert 断言机制，不要使用 sout
* 一个业务逻辑开发完后，一定要写单元测试类。



### SpringBoot 2.2+ JUnit5

Spring Boot 2.2.0 版本开始引入 JUnit 5 作为单元测试默认库。

JUnit5 的核心是 JUnit Jupiter。

JUnit5: https://junit.org/junit5/docs/current/user-guide/

需要引入的依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

增加测试用例的 IDEA 快捷键：在类中 alt + insert



### 兼容 JUnit4

SpringBoot 2.4 以上版本移除了默认对 Vintage 的依赖。如果需要兼容junit4需要自行引入（不能使用 junit4 的功能 @Test）  

```xml
<dependency>
    <groupId>org.junit.vintage</groupId>
    <artifactId>junit-vintage-engine</artifactId>
    <scope>test</scope>
    <exclusions>
        <exclusion>
            <groupId>org.hamcrest</groupId>
            <artifactId>hamcrest-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

@SpringBootTest + @RunWith(SpringTest.class)



### JUnit5 注解

JUnit5 提供的一些注解：

| Annotation               | Description                                                  |
| :----------------------- | :----------------------------------------------------------- |
| `@Test`                  | Denotes that a method is a test method. Unlike JUnit 4’s `@Test` annotation, this annotation does not declare any attributes, since test extensions in JUnit Jupiter operate based on their own dedicated annotations. Such methods are *inherited* unless they are *overridden*. |
| `@ParameterizedTest`     | Denotes that a method is a [parameterized test](https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests). Such methods are *inherited* unless they are *overridden*. |
| `@RepeatedTest`          | Denotes that a method is a test template for a [repeated test](https://junit.org/junit5/docs/current/user-guide/#writing-tests-repeated-tests). Such methods are *inherited* unless they are *overridden*. |
| `@TestFactory`           | Denotes that a method is a test factory for [dynamic tests](https://junit.org/junit5/docs/current/user-guide/#writing-tests-dynamic-tests). Such methods are *inherited* unless they are *overridden*. |
| `@TestTemplate`          | Denotes that a method is a [template for test cases](https://junit.org/junit5/docs/current/user-guide/#writing-tests-test-templates) designed to be invoked multiple times depending on the number of invocation contexts returned by the registered [providers](https://junit.org/junit5/docs/current/user-guide/#extensions-test-templates). Such methods are *inherited* unless they are *overridden*. |
| `@TestMethodOrder`       | Used to configure the [test method execution order](https://junit.org/junit5/docs/current/user-guide/#writing-tests-test-execution-order) for the annotated test class; similar to JUnit 4’s `@FixMethodOrder`. Such annotations are *inherited*. |
| `@TestInstance`          | Used to configure the [test instance lifecycle](https://junit.org/junit5/docs/current/user-guide/#writing-tests-test-instance-lifecycle) for the annotated test class. Such annotations are *inherited*. |
| `@DisplayName`           | Declares a custom [display name](https://junit.org/junit5/docs/current/user-guide/#writing-tests-display-names) for the test class or test method. Such annotations are not *inherited*. |
| `@DisplayNameGeneration` | Declares a custom [display name generator](https://junit.org/junit5/docs/current/user-guide/#writing-tests-display-name-generator) for the test class. Such annotations are *inherited*. |
| `@BeforeEach`            | Denotes that the annotated method should be executed *before* **each** `@Test`, `@RepeatedTest`, `@ParameterizedTest`, or `@TestFactory` method in the current class; analogous to JUnit 4’s `@Before`. Such methods are *inherited* unless they are *overridden*. |
| `@AfterEach`             | Denotes that the annotated method should be executed *after* **each** `@Test`, `@RepeatedTest`, `@ParameterizedTest`, or `@TestFactory` method in the current class; analogous to JUnit 4’s `@After`. Such methods are *inherited* unless they are *overridden*. |
| `@BeforeAll`             | Denotes that the annotated method should be executed *before* **all** `@Test`, `@RepeatedTest`, `@ParameterizedTest`, and `@TestFactory` methods in the current class; analogous to JUnit 4’s `@BeforeClass`. Such methods are *inherited* (unless they are *hidden* or *overridden*) and must be `static` (unless the "per-class" [test instance lifecycle](https://junit.org/junit5/docs/current/user-guide/#writing-tests-test-instance-lifecycle) is used). |
| `@AfterAll`              | Denotes that the annotated method should be executed *after* **all** `@Test`, `@RepeatedTest`, `@ParameterizedTest`, and `@TestFactory` methods in the current class; analogous to JUnit 4’s `@AfterClass`. Such methods are *inherited* (unless they are *hidden* or *overridden*) and must be `static` (unless the "per-class" [test instance lifecycle](https://junit.org/junit5/docs/current/user-guide/#writing-tests-test-instance-lifecycle) is used). |
| `@Nested`                | Denotes that the annotated class is a non-static [nested test class](https://junit.org/junit5/docs/current/user-guide/#writing-tests-nested). `@BeforeAll` and `@AfterAll` methods cannot be used directly in a `@Nested` test class unless the "per-class" [test instance lifecycle](https://junit.org/junit5/docs/current/user-guide/#writing-tests-test-instance-lifecycle) is used. Such annotations are not *inherited*. |
| `@Tag`                   | Used to declare [tags for filtering tests](https://junit.org/junit5/docs/current/user-guide/#writing-tests-tagging-and-filtering), either at the class or method level; analogous to test groups in TestNG or Categories in JUnit 4. Such annotations are *inherited* at the class level but not at the method level. |
| `@Disabled`              | Used to [disable](https://junit.org/junit5/docs/current/user-guide/#writing-tests-disabling) a test class or test method; analogous to JUnit 4’s `@Ignore`. Such annotations are not *inherited*. |
| `@Timeout`               | Used to fail a test, test factory, test template, or lifecycle method if its execution exceeds a given duration. Such annotations are *inherited*. |
| `@ExtendWith`            | Used to [register extensions declaratively](https://junit.org/junit5/docs/current/user-guide/#extensions-registration-declarative). Such annotations are *inherited*. |
| `@RegisterExtension`     | Used to [register extensions programmatically](https://junit.org/junit5/docs/current/user-guide/#extensions-registration-programmatic) via fields. Such fields are *inherited* unless they are *shadowed*. |
| `@TempDir`               | Used to supply a [temporary directory](https://junit.org/junit5/docs/current/user-guide/#writing-tests-built-in-extensions-TempDirectory) via field injection or parameter injection in a lifecycle method or test method; located in the `org.junit.jupiter.api.io` package. |

代码Demo：https://junit.org/junit5/docs/current/user-guide/#writing-tests-assertions

注意 @Test 标注，需要使用junit5版本的注解（Jupiter）。



### 测试经验总结

#### @Transactional 回滚

想要数据库回到测试之前的情况，使用 `@Transactional` 进行回滚

```java
@Test
// Transactional 回滚该方法
@Transactional
void update() {
    assertNotNull(userService.update());
}
```

