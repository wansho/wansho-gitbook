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
    <version>1.6.1</version>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>1.7.21</version>
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



