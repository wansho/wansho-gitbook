# Mybatis

[TOC]

## mybatis hibernate 比较

hibernate 是全自动框架，mybatis 是半自动轻量级框架。

全自动框架的缺点：黑箱操作，无法优化 sql 语句。

mybatis：sql 语句交给开发人员编写（将与数据库交互的命脉，交给开发人员，而不是全自动框架）。



## mybatis 编程注意事项

* selectBatchIds 会被映射成 where id in ()，所以传入的查询参数 list 不能为空，否则会报异常



