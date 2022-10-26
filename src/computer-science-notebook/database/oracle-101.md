# Oracle

[TOC]

## Getting Started

### Oracle 数据库远程登录

```
ip:
port:
服务名：
username:
passwd:
```

其中服务名就是数据库名。



## 数据库配置

### 查看数据库版本

```sql
select * from v$version;

-- Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production
```







## 建表语句

Oracle 不支持 id 自增的配置：auto_increment

也不支持 comment

以后写 SQL，尽量写兼容 Oracle 和 MySQL 的 SQL。

## 数据库 sql 差异性

* Oracle sql 语句结尾不能加 `;`

* 单引号和双引号的区别

  在 sql 标准中，单引号表示字符串，双引号表示 identifiers，例如表名或者列名

  ```sql
  delete from 
    table_a 
  where 
    id in (
      select 
        id 
      from 
        (select * from table_a) as table_a_copy 
        left join 
  	  (select *, 'flag' as "flag" from table_b) as table_b_copy 
  	  on 
  	  table_a_copy.id = table_b_copy.cc 
      where 
        table_b_copy.flag is NULL
    );
  ```

* Oracle 对 as 的兼容性不太好，不要用 as 了，as 类似于语法糖，不用也 ok 的

  ```sql
  select *, 'flag' flag from table_b
  ```

  