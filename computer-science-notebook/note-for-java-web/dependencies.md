# Dependencies

[TOC]



## Lombok

### Java 项目配置

对于普通的 Java8 项目，一个 lombok 依赖是不够的，还需要其他依赖。

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.10</version>
    <scope>compile</scope>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.20</version>
</dependency>
```

## JUnit5

测试框架。

### Java 项目配置

https://junit.org/junit5/docs/current/user-guide/#dependency-metadata

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.7.2</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-engine</artifactId>
    <version>5.7.2</version>
    <scope>test</scope>
</dependency>
```

## OVal

校验框架。

[OVal](https://sebthom.github.io/oval/USERGUIDE.html) - the object validation framework for Java.

[OVal Doc](https://javadoc.io/doc/net.sf.oval/oval/latest/index.html)  [汉化版参考文档](https://blog.csdn.net/neweastsun/article/details/49154337/)

```xml
<dependency>
  <groupId>net.sf.oval</groupId>
  <artifactId>oval</artifactId>
  <version>[VERSION_GOES_HERE]</version>
</dependency>
```

用正则表达式来检验内容 Demo:

```java
public class EntityGraphDto {

    @ApiModelProperty(name="画面ID", required = true)
    private String id;

    ...

    @MatchPattern(
            // 正则表达式：[a-zA-Z0-9\|\*\.\[\]\{\}\(\)\\,/:-]+
            pattern = {"[a-zA-Z0-9\\|\\*\\.\\[\\]\\{\\}\\(\\)\\\\,/:-]+"},
            message = "权限表达式格式有问题，不能包含中文和下划线，可以包含以下字符：| * . [] {} () \\ , / : -")
    @ApiModelProperty(name="画面权限表达式", required = true)
    private String expression;

    @ApiModelProperty(name="画面所属应用")
    private String app;
		
    ...

}
```



## Apache Commons BeanUtils

Bean 工具类

```yaml
<dependency>
    <groupId>commons-beanutils</groupId>
    <artifactId>commons-beanutils</artifactId>
    <version>1.9.3</version>
</dependency>
```

```java
BeanUtils.populate(userInfoDto, result.getData());
// b 拷贝到 a，浅拷贝
BeanUtils.copyProperties(a, b);
```

拷贝性能比较差，



## springframework BeanUtils

优先使用 Spring 提供的 BeanUtils

```java
// a 拷贝到 b，比较符合直接，把 a 复制到 b
BeanUtils.copyProperties(a, b);
```



