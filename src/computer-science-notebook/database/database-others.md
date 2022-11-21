# 其他数据库产品

[TOC]



## 国产数据库



### 高斯

高斯数据库，基于 *PostgreSQL* 开发



### 达梦

达梦数据库类似 Oracle

达梦数据库低版本不支持 Java 的 LocalDateTime 



### 金仓

类似 PostgreSQL



## 开源数据库

### PostgreSQL

*PostgreSQL* 是应用最广泛的开源数据库

PostgreSQL 不允许创建名为 user 的表，user 在 PostgreSQL 中是一个保留字……

尽量不要将 column 重命名为 name，可以加 as

```sql
❎ select a.name name from people a;
✔️ select a.name as name from people a;
```



postgresql 保留字段：user, status



postgresql 除了定义了数据库这个概念以外，还定义了模式这个概念。模式比数据库更小，模式是表的集合，一个模式可以包含视图、索引、数据类型、函数和操作符等。一个数据库可以包含多个模式。引入模式，可以使得多个用户使用一个数据库，并且不会相互干扰。



postgresql 中的角色，可以当成用户。



一个典型的 postgresql 数据库连接：

```yaml
# 这里的 database 就是最顶层的 database
url: jdbc:postgresql://xxx.xxx.xxx.xxx:5432/database?useUnicode=true&characterEncoding=UTF-8
# 用户名就是角色名，通常我们在创建模式的时候，会指定模式的所有者，这样用户就会和模式绑定，而且，通常用户名和模式名是一样的
username: username
password: password
driver-class-name: org.postgresql.Driver
```



public schema

When a new database is created, PostgreSQL by default creates a schema named `public` and grants access on this schema to a backend role named `public`. All new users and roles are by default granted this `public` role, and therefore can create objects in the `public` schema.



## 内存数据库

### redis



### h2

h2 的访问路径：http://localhost:8080/h2-console/login.do



## 数据库比较

### MySQL 独有的特性

insert ignore: 主键重复则不插入

反引号：用来区分保留字



### MySQL vs PostgreSQL

 MySQL

* 数据库 varchar 能够接 Integer 类型
* 数据库 int 能够接 String 类型，传 3，3.1415926 都能自动接住，但是只能接住数字
* Boolean 类型可以和 0，1 进行比较，可以存储 0 1

PostgreSQL / 高斯数据库

* 数据库 varchar 能够接住 Integer 类型，会自动做 cast

* Boolean 类型不能和 0，1 进行比较

* 数据库 int 不能接 String 类型

  ![image-20211213080752162](assets/image-20211213080752162.png)



### 字符字段大小写敏感

用 mysql 碰到这个问题，大小写不敏感。

<img align="left" src="assets/image-20220425162817212.png" alt="image-20220425162817212" style="zoom: 33%;" />

查阅文档后 https://dev.mysql.com/doc/refman/8.0/en/case-sensitivity.html，发现 mysql 字符内容默认就是大小写不敏感，除非手动配置：

```sql
ALTER TABLE nrcloud.users modify name varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户登录名';
```



For nonbinary strings ([`CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html), [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html), [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html)), string searches use the collation of the comparison operands. For binary strings ([`BINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html), [`VARBINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html), [`BLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html)), comparisons use the numeric values of the bytes in the operands; this means that for alphabetic characters, comparisons are case-sensitive.



经测试，Oracle 和 Postgre 都是默认大小写敏感的，这好像是 mysql 独有的问题……



参考文献：

* https://dev.mysql.com/doc/refman/8.0/en/case-sensitivity.html
* https://dev.mysql.com/doc/refman/8.0/en/create-table.html



### postgresql，oracle 无法插入空字符串

如果插入空字符串，会被转成 null



## OLAP 数据库



### Databend

rust 开发的数据仓库，兼容 MySQL，国产



## 数据同步

### dataX

不支持分布式



### SeaTunnel

海量数据的管道

和 logstash 类似，通过配置的方式（低代码），实现海量数据的同步。分布式特性。

SeaTunnel 对 Spark 和 Flink 做了一层包装。SeaTunnel 的日常使用，就是编辑配置文件，然后配置文件被 SeaTunnel 转换成具体的 Spark 或 Flink 任务。

![image-20220421191506205](assets/image-20220421191506205.png)





## HTAP 数据库

*HTAP*（Hybrid Transaction Analytical Processing）

*HTAP*= OLTP +OLAP

HTAP 数据库代表：TiDB 全能数据库

[why-we-choose-tidb-to-support-ossinsight](https://ossinsight.io/blog/why-we-choose-tidb-to-support-ossinsight/)

![Simplified architecture after we use TiDB](assets/how-different-db-handle-github-data-097746b55085a93fa36a6bfb7af4cb0b.png)
