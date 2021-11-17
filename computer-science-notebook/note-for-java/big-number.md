# 大数计算和存储

[TOC]

## 需求

Java long 类型是 64 位，第一位是符号位，其存储的最大值是 `2^64 - 1`，转成二进制是  63 个 1

```java
System.out.println(Long.toBinaryString(Long.MAX_VALUE));
// 111111111111111111111111111111111111111111111111111111111111111
```

现在我们需要存储的最大值是 64 个 1，所以考虑使用 Java 提供的 BigInteger。

有两个地方需要调研：

计算：BigInteger 是如何创建大数，如何计算大数的

存储：jpa 能否支持大数建模，主流数据库和国产数据库对于大数的支持

## 计算

BigInteger 对象构造函数：

```java
// Translates the decimal String representation of a BigInteger into a BigInteger.
BigInteger bigNum = new BigInteger("123456789");
```

加减乘除使用如下几个方法：add()，subtract()，mutiply()，divide()



## 存储

经过测试  jpa 不能实现 BigInteger 的建模，jpa 自动将 BigInteger 转换成了整数部分为 19 位的整数，其支持的最大值还是 Java Long 的最大值。

|        | BigInteger    |
| ------ | ------------- |
| Oracle | NUMBER(19,2)  |
| MySQL  | decimal(19,2) |
|        |               |

如果想让 jpa 将 BigInteger 转成更大的数，则需要 `@Column(columnDefinition="decimal(20,2)")` 但是这样就和具体的数据库强相关了，Oracle 则需要设置成 `@Column(columnDefinition="number(20,2)")`
