# JPA

[TOC]

## reference

* [Spring Data JPA - Reference Documentation](https://docs.spring.io/spring-data/jpa/docs/2.5.0/reference/html/#preface)
* [Java Persistence API - Oracle Software Downloads](http://download.oracle.com/otn-pub/jcp/persistence-2_1-fr-eval-spec/JavaPersistence.pdf)
* [廖雪峰 jpa 介绍](https://www.liaoxuefeng.com/wiki/1252599548343744/1282383789686817)

## Intro

Java Persistence API 是 Sun 官方提出的 Java 持久化规范。

## Specifications

JPA 2 introduces a criteria API that you can use to build queries programmatically. By writing a `criteria`, you define the **where clause** of a query for a domain class. Taking another step back, these criteria can be regarded as a **predicate** over the entity that is described by the JPA criteria API constraints.

The **power of specifications** really shines when you combine them to create new `Specification` objects.

`Specification` offers some “glue-code” default methods to chain and combine `Specification` instances. These methods let you extend your data access layer by creating new `Specification` implementations and combining them with already existing implementations.

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

