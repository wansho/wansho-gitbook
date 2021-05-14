# SpringBoot-Reference

[TOC]

https://docs.spring.io/spring-boot/docs/2.4.4/reference/htmlsingle/

## Chapter2-Getting Started

Spring Boot 依赖：Maven > 3.3

安装 Spring：安装 sdkman，然后用 sdkman 安装 spring，需要配置 JAVA_HOME

### SpringBoot CLI

SpringBoot CLI 和 Django CLI 的定位类似。

Django CLI：

```shell
# 1. 新建一个 project
django-admin.py startproject project-name

# 新建一个 app
python manage.py startapp bilibili_helper

# 2. 数据模型相关命令
python manage.py makemigrations app_name 
# 告诉 django, models 模型有所改动，对变动生成 migrations，本质上是将 models 转成 SQL
# 会在 app_name/migrations/ 下生成临时文件，例如 0001_initial.py，如果我们想要查看该命令到底把 models 转成了什么 SQL，可以使用 sqlmigrate 命令查看：
python manage.py sqlmigrate student 0001

python manage.py migrate
# 将 models.py 视图的变动同步到数据库，本质上是在 DBMS 上执行 SQL 

# 3. 调试运行单个 py 文件
python manage.py coverage # 在 Django 的根目录下

# 4. 设置端口号
python manage.py runserver 192.168.1.50:8080
    
# 5. 进入 django　的 shell 命令行
python manage.py shell 

# 创建管理员
python manage.py createsuperuser
```

SpringBoot CLI：

```shell
spring run app.groovy
```

app.groovy:

```java
@RestController
class ThisWillActuallyRun {
    @RequestMapping("/")
    String home() {
        "Hello World!"
    }
}
```

## Annotations

### @RestController

The first annotation on our Example class is @RestController. This is known as a stereotype annotation. It provides hints for people reading the code and for Spring that the class plays a specific role. In this case, our class is a web @Controller, so Spring considers it when handling incoming web requests.

### @RequestMapping

The @RequestMapping annotation provides “routing” information. It tells Spring that any HTTP request with the / path should be mapped to the home method. The @RestController annotation tells Spring to render the resulting string directly back to the caller.    

### @EnableAutoConfiguration  

The second class-level annotation is @EnableAutoConfiguration. This annotation tells Spring Boot to“guess” how you want to configure Spring, based on the jar dependencies that you have added. Since spring-boot-starter-web added Tomcat and Spring MVC, the auto-configuration assumes that you are developing a web application and sets up Spring accordingly  