# JPA

[TOC]

## reference

* [Spring Data JPA - Reference Documentation](https://docs.spring.io/spring-data/jpa/docs/2.5.0/reference/html/#preface)
* [Java Persistence API - Oracle Software Downloads](http://download.oracle.com/otn-pub/jcp/persistence-2_1-fr-eval-spec/JavaPersistence.pdf)
* [Advanced Spring Data JPA - Specifications and Querydsl](https://spring.io/blog/2011/04/26/advanced-spring-data-jpa-specifications-and-querydsl)
* [JPA Criteria Queries](https://www.baeldung.com/hibernate-criteria-queries)
* [Using the Criteria API and Metamodel API to Create Basic Typesafe Queries](https://docs.oracle.com/javaee/6/tutorial/doc/gjivm.html)
* [@JoinColumn Annotation Explained](https://www.baeldung.com/jpa-join-column)
* [廖雪峰 jpa 介绍](https://www.liaoxuefeng.com/wiki/1252599548343744/1282383789686817)

## Intro

Java Persistence API 是 Sun 官方提出的 Java 持久化规范。

JPA 和 Hibernate 的关系：JPA 是规范（类似于 JDBC），Hibernate 是 JPA 的实现

## annotations

| Annotation                     | Desc                                     |        |
| ------------------------------ | ---------------------------------------- | ------ |
| `@Entity`                      | 表示该类为实体类，将映射到指定的数据库表 |        |
| `@Table(name="table_name")`    | 指定该类映射表的表名                     |        |
| `@Id`                          | 映射主键                                 |        |
| `@GeneratedValue(strategy="")` | 主键生成策略                             |        |
| `@Basic`                       | 字段的默认注解，如果没有，会自动添加     |        |
| `@Column`                      | 指定字段详细属性                         |        |
| `@Transient`                   | 表示不作映射，可以作用于成员变量和方法   | 暂时的 |
| `@Temporal`                    | 指定时间格式                             | 时间的 |

### @GeneratedValue

几个 strategy：

* IDENTITY：ID 自增上，Oracle 不支持
* AUTO：啥也不填，JPA 自动选择合适的策略，默认选项
* SEQUENCE：通过序列产生主键，MySQL 不支持
* TABLE：通过表产生主键

### @Basic

```java
@Basic(fetch = FetchType.EAGER, optional = true)
private String email;
```

如果一个属性没有加任何注解，那么就会默认加上 basic 注解。

两个参数：

* fetch: 属性读取策略，EAGER vs LAZY ，饿汉式和懒汉式，默认是 EAGER
* optional：属性是否允许为 null，默认式 null

### @Column

几个参数：

* name: 指定列名
* length：指定长度
* nullable：是否允许为 null
* unique：是否 unique
* columnDefinition：表示该属性在数据库中的实际类型，JPA 无法判断 Date 要转成数据库的 Date，Time 还是 TIMESTAMP

String 类型默认映射成 varchar，如果要映射成特定数据库的 BLOB 或 TEXT，则需要指定 columnDefinition

### @Temporal

```
@Temporal(value=)
```

接受一个枚举类型，可选值有三个：

* DATE 年月日
* TIME 年月日 时分秒
* TIMESTAMP 兼容前两个

## hibernate-criteria-queries

### maven

```xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>   
    <version>5.3.2.Final</version>
</dependency>
```

### example using criteria

```java

public class Item implements Serializable {

    private Integer itemId;
    private String itemName;
    private String itemDescription;
    private Integer itemPrice;

   // standard setters and getters
}


Session session = HibernateUtil.getHibernateSession();
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery<Item> cr = cb.createQuery(Item.class);
Root<Item> root = cr.from(Item.class);
cr.select(root);

Query<Item> query = session.createQuery(cr);
List<Item> results = query.getResultList();
```

#### Using Expressions

To get items having a price of more than 1000:

```java
cr.select(root).where(cb.gt(root.get("itemPrice"), 1000));
```

Next, getting items having *itemPrice* less than 1000:

```java
cr.select(root).where(cb.lt(root.get("itemPrice"), 1000));
```

Items having *itemName* contain *Chair*:

```java
cr.select(root).where(cb.like(root.get("itemName"), "%chair%"));
```

Records having *itemPrice* in between 100 and 200:

```java
cr.select(root).where(cb.between(root.get("itemPrice"), 100, 200));
```

Items having *itemName* in *Skate Board, Paint* and *Glue*:

```java
cr.select(root).where(root.get("itemName").in("Skate Board", "Paint", "Glue"));
```

To check if the given property is null:

```java
cr.select(root).where(cb.isNull(root.get("itemDescription")));
```

To check if the given property is not null:

```java
cr.select(root).where(cb.isNotNull(root.get("itemDescription")));
```

 **chain expressions**:

```java
Predicate[] predicates = new Predicate[2];
predicates[0] = cb.isNull(root.get("itemDescription"));
predicates[1] = cb.like(root.get("itemName"), "chair%");
cr.select(root).where(predicates);
```

To add two expressions with logical operations:

```java
Predicate greaterThanPrice = cb.gt(root.get("itemPrice"), 1000);
Predicate chairItems = cb.like(root.get("itemName"), "Chair%");
```

Items with the above-defined conditions joined with *Logical OR*:

```java
cr.select(root).where(cb.or(greaterThanPrice, chairItems));
```

To get items matching with the above-defined conditions joined with *Logical AND*:

```java
cr.select(root).where(cb.and(greaterThanPrice, chairItems));
```

#### sorting

```java
cr.orderBy(
  cb.asc(root.get("itemName")), 
  cb.desc(root.get("itemPrice")));
```

#### projections, aggregates, and grouping functions

**count**

```java
CriteriaQuery<Long> cr = cb.createQuery(Long.class);
Root<Item> root = cr.from(Item.class);
cr.select(cb.count(root));
Query<Long> query = session.createQuery(cr);
List<Long> itemProjected = query.getResultList();
```

***Aggregate* function for Average**

```java
CriteriaQuery<Double> cr = cb.createQuery(Double.class);
Root<Item> root = cr.from(Item.class);
cr.select(cb.avg(root.get("itemPrice")));
Query<Double> query = session.createQuery(cr);
List avgItemPriceList = query.getResultList();
```

Other useful aggregate methods that are available are *sum()*, *max()*, *min()* **,** *count()* etc.

## Specifications

Specification 是 Spring 框架的一部分，是 Spring 对 Criteria API （root，criteria）的封装

JPA 2 introduces a criteria API that you can use to build queries programmatically. By writing a `criteria`, you define the **where clause** of a query for a domain class. Taking another step back, these criteria can be regarded as a **predicate** over the entity that is described by the JPA criteria API constraints.

The **power of specifications** really shines when you combine them to create new `Specification` objects.

`Specification` offers some “glue-code” default methods to chain and combine `Specification` instances. These methods let you extend your data access layer by creating new `Specification` implementations and combining them with already existing implementations.

Although this approach（直接按照规则写接口，不实现的方式） is really convenient (you don’t even have to write a single line of implementation code to get the queries executed) it has two drawbacks: first, the number of query methods might grow for larger applications because of - and that’s the second point - the queries define a fixed set of criterias. To avoid these two drawbacks, wouldn’t it be cool if you could come up with a set of atomic predicates that you could combine dynamically to build your query?

想要引入 Specifications 特性，必须继承 `JpaSpecificationExecutor` 接口。

**Specification** 是一个函数式接口

```java
public interface Specification<T> {
  Predicate toPredicate(Root<T> root, CriteriaQuery<?> query,
            CriteriaBuilder builder);
}
```

Demo: Specifications for a Customer

```java
public class CustomerSpecs {

  public static Specification<Customer> isLongTermCustomer() {
    return (root, query, builder) -> {
      LocalDate date = LocalDate.now().minusYears(2);
      return builder.lessThan(root.get(Customer_.createdAt), date);
    };
  }

  public static Specification<Customer> hasSalesOfMoreThan(MonetaryAmount value) {
    return (root, query, builder) -> {
      // build query here
    };
  }
}
```

```java
// Using a simple Specification
List<Customer> customers = customerRepository.findAll(isLongTermCustomer());

// Combined Specifications
MonetaryAmount amount = new MonetaryAmount(200.0, Currencies.DOLLAR);
List<Customer> customers = customerRepository.findAll(
  isLongTermCustomer().or(hasSalesOfMoreThan(amount)));
```

Another Demo：

```java
private Specification<EntityGraph> getSpecification(PageBean pageBean) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicateList = new ArrayList<>();
            if(StringUtils.isNotEmpty(pageBean.getFilterValue())){
                predicateList.add(criteriaBuilder.equal(root.get(DEFAULT_FILTER_FIELD), pageBean.getFilterValue()));
            }
            return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
        };
    }
```

root 负责取成员变量，query 是 CriteriaQuery 类型，负责生成 root，criteriaBuilder 是 CriteriaBuilder 类型

## jpa 实现

### Hibernate

常见配置：

```yml
jpa:
    database: mysql
    show-sql: true
    properties:
      hibernate:
        hbm2ddl:
          # 自动更新维护表结构
          auto: update
        dialect: org.hibernate.dialect.MySQL55Dialect
        format_sql: true # 对 sql 进行格式化
    open-in-view: false
```

## join in jpa



