# 其他数据库产品

[TOC]



## 国产数据库

### 高斯

高斯数据库，基于 *PostgreSQL* 开发



## 开源数据库

### PostgreSQL

*PostgreSQL* 是应用最广泛的开源数据库

PostgreSQL 不允许创建名为 user 的表，user 在 PostgreSQL 中是一个保留字……



## 内存数据库



## 数据库比较

### MySQL vs PostgreSQL

对于 mysql 来说

* 数据库 varchar 能够接 Integer 类型，会自动做 cast
* 数据库 int 能够接 string 类型，就他妈离谱，传 3，3.1415926 都可以，mysql 会自动进行 cast

对于 postgresql 来说

* 数据库 varchar 能够接住 Integer 类型，会自动做 cast
* 数据库 int 不能接 string 类型
