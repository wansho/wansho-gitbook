# 其他数据库产品

[TOC]



## 国产数据库



### 高斯

高斯数据库，基于 *PostgreSQL* 开发



### 达梦

达梦数据库类似 Oracle



### 金仓

类似 PostgreSQL



## 开源数据库

### PostgreSQL

*PostgreSQL* 是应用最广泛的开源数据库

PostgreSQL 不允许创建名为 user 的表，user 在 PostgreSQL 中是一个保留字……



## 内存数据库

### redis





## 数据库比较

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
