# Java Log

[TOC]

## 参考文献

* [廖雪峰 log 教学](https://www.liaoxuefeng.com/wiki/1252599548343744/1264738568571776)
* [logback doc](http://logback.qos.ch/)

## jdk Logging

jdk 自带的日志系统，不常用。

```java
// logging
import java.util.logging.Level;
import java.util.logging.Logger;

public class Hello {
    public static void main(String[] args) {
        Logger logger = Logger.getGlobal();
        logger.info("start process...");
        logger.warning("memory is running out...");
        logger.fine("ignored.");
        logger.severe("process will be terminated...");
    }
}

/*
Mar 02, 2019 6:32:13 PM Hello main
INFO: start process...
Mar 02, 2019 6:32:13 PM Hello main
WARNING: memory is running out...
Mar 02, 2019 6:32:13 PM Hello main
SEVERE: process will be terminated...
*/
```

7 个日志级别

```
SEVERE
WARNING
INFO
CONFIG
FINE
FINER
FINEST
```



## Commons Logging / Log4j

### Commons Logging

第三方日志库，Apache创建的日志模块。

Commons Logging 是接口，Log4J 是实现。

```java
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class Main {
    public static void main(String[] args) {
        Log log = LogFactory.getLog(Main.class);
        log.info("start...");
        log.warn("end.");
    }
}
```

6 个日志级别：

```
FATAL
ERROR
WARNING
INFO
DEBUG
TRACE
```

在实例方法中定义 Log

```java
// 在实例方法中引用Log:
public class Person {
    protected final Log log = LogFactory.getLog(getClass()); // 注意此处的 getClass()，这么写的好处是，子类也可以直接使用该 Log 实例
    void foo() {
        log.info("foo");
    }
}
```

记录异常：

```java
try {
    ...
} catch (Exception e) {
    log.error("got exception!", e);
}
```

### Log4j

Log4j 是 Commons Logging 的实现，其功能类似于 Django Logging。

Commons Logging 会自动发现并使用 Log4j。



## SLF4J / Logback

SLF4J类似于Commons Logging，也是一个日志接口，而Logback类似于Log4j，是一个日志的实现。

SLF4J + logback 是现在最常用的日志系统。

logback 会自动扫描 classpath 中的 `logback.xml` 文件。

### Maven 配置

```xml
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.1.7</version>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.20</version>
</dependency>
```

### logback

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <file>log/jqx-message-push.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <fileNamePattern>log/output.log.%i</fileNamePattern>
        </rollingPolicy>
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>10MB</MaxFileSize>
        </triggeringPolicy>
    </appender>

    <!-- INFO 表示只输出 INFO 级别及以上的日志，FILE 和 CONSOLE 表示该日志配置有两个输出，一个输出到控制台，一个输出到 FILE -->
    <root level="INFO">
        <appender-ref ref="FILE" />
        <appender-ref ref="CONSOLE" />
    </root>
</configuration>
```

**Demo**

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class Main {
    final Logger logger = LoggerFactory.getLogger(getClass());
    logger.info("Set score {} for Person {} ok.", score, p.getName());
}

```

```java
try{
    entityItemRepo.save(entityItem);
}catch (IllegalArgumentException e){
    log.error("save {} failed", "entityItem", e);
}
```
