# SpringBoot Starter

[TOC]

## 教程

[知乎：自定义 starter](https://zhuanlan.zhihu.com/p/343094626)

[Baeldung: Creating a Custom Starter with Spring Boot](https://www.baeldung.com/spring-boot-custom-starter)



## 解密 SpringBoot 的自动装配

Springboot 在启动的时候，会扫描其依赖 jar 包里 `META-INF` 目录的 *spring.factories* 文件，这个文件里定义了自动配置类。

1. An auto-configure class for our library along with a properties class for custom configuration.
2. A starter *pom* to bring in the dependencies of the library and the autoconfigure project.



## SpringBoot 自定义 starter

SpringBoot四大核心之starter——自定义starter - 贺贺学编程的文章 - 知乎 https://zhuanlan.zhihu.com/p/343094626

组件开发经验：

1. 不同组件，包路径可以一样，但是类名不能一样，如果冲突了，会报 bean 注入失败的错误
2. 新的子组件写好了，要先 clean install 所有的父组件，再 clean install 这个子组件



## starter 开发心得

* starter autoconfig 是用来定义需要对外部暴露的 Bean，如果这个组件没有需要对外暴露的 Bean，则只写一个空类即可

  ```java
  @Configuration
  @ComponentScan(basePackages={"xx.xx.xx.xx"})
  public class XxxAutoConfiguration {
  
  
  }
  ```

* starter 中可以定义任何东西，Controller 也可以定义

* starter 在进行持久层操作的时候，不建议使用太重的持久层框架（Mybatis, JPA），建议使用 JdbcTemplate



## starter 开发步骤

1. 定义 META-INF 中的 spring.factories

   ```
   # Auto Configure
   org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
   com.xxx.xxx.xxx.autoconfig.XxxAutoConfiguration
   ```

2. 编写 autoconfig 类

   ```java
   @Configuration
   @ComponentScan(basePackages={"xx.xx.xx.xx"})
   public class XxxAutoConfiguration {
   
   }
   ```

3. 编写业务逻辑

   

4. 如果需要给自定义组件增加配置，则在 `properties` 目录中增加 XxxProperties 类

   ```java
   @Component
   @Data
   @ConfigurationProperties(prefix = "xxx.xxx")
   public class XxxProperties {
   
       private String config1;
   }
   ```

   