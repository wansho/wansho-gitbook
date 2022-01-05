# 缓存

[TOC]



## 缓存组件



### caffeine

[Caffine Cache](https://www.cnblogs.com/rickiyang/p/11074158.html) 



### ehcache

[SpringBoot+SpringDataJPA使用Ehcache缓存](https://blog.csdn.net/w405722907/article/details/80517345) 测试可用

[教程](https://zhuanlan.zhihu.com/p/328919856)



## Spring Cache

Spring Cache 对 Cache 进行了统一化，类似于 Spring Data。

[Spring Cache 使用](https://juejin.cn/post/6844903966615011335) | [@Cacheable 使用详解](https://www.cnblogs.com/coding-one/p/12401630.html) | 



### CacheManager

在 Spring 3.1 中引入了多 Cache 的支持，在 spring-context 包中定义了`org.springframework.cache.Cache` 和 `org.springframework.cache.CacheManager` 两个接口来统一不同的缓存技术。Cache 接口包含缓存的常用操作：增加、删除、读取等。CacheManager 是 Spring 各种缓存的抽象接口。

Spring 支持的常用 CacheManager 如下：

| CacheManager              | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| SimpleCacheManager        | 使用简单的 Collection 来存储缓存                             |
| ConcurrentMapCacheManager | 使用 java.util.ConcurrentHashMap 来实现缓存                  |
| NoOpCacheManager          | 仅测试用，不会实际存储缓存                                   |
| EhCacheCacheManger        | 使用EhCache作为缓存技术。EhCache 是一个纯 Java 的进程内缓存框架，特点快速、精干，是 Hibernate 中默认的 CacheProvider，也是 Java 领域应用最为广泛的缓存 |
| JCacheCacheManager        | 支持JCache（JSR-107）标准的实现作为缓存技术                  |
| CaffeineCacheManager      | 使用 Caffeine 作为缓存技术。用于取代 Guava 缓存技术。        |
| RedisCacheManager         | 使用Redis作为缓存技术                                        |
| HazelcastCacheManager     | 使用Hazelcast作为缓存技术                                    |
| CompositeCacheManager     | 用于组合 CacheManager，可以从多个 CacheManager 中轮询得到相应的缓存 |



### 注解

Spring Cache 提供了 @Cacheable 、@CachePut 、@CacheEvict 、@Caching 等注解，在方法上使用。通过注解 Cache 可以实现类似事务一样、缓存逻辑透明的应用到我们的业务代码上，且只需要更少的代码。 核心思想：当我们调用一个方法时会把该方法的参数和返回结果最为一个键值对存放在缓存中，等下次利用同样的参数来调用该方法时将不会再执行，而是直接从缓存中获取结果进行返回。

* @EnableCaching

  开启缓存功能，一般放在启动类上。

* @CacheConfig

  当我们需要缓存的地方越来越多，你可以使用@CacheConfig(cacheNames = {"cacheName"})注解在 class 之上来统一指定value的值，这时可省略value，如果你在你的方法依旧写上了value，那么依然以方法的value值为准。

* @Cacheable （查）

  根据方法对其返回结果进行缓存，下次请求时，如果缓存存在，则直接读取缓存数据返回；如果缓存不存在，则执行方法，并把返回的结果存入缓存中。**一般用在查询方法上**。 查看源码，属性值如下：

  | 属性/方法名   | 解释                                             |
  | ------------- | ------------------------------------------------ |
  | value         | 缓存名，必填，它指定了你的缓存存放在哪块命名空间 |
  | cacheNames    | 与 value 差不多，二选一即可，用于关联多块缓存    |
  | key           | 可选属性，可以使用 SpEL 标签自定义缓存的 key     |
  | keyGenerator  | key的生成器。key/keyGenerator 二选一使用         |
  | cacheManager  | 指定缓存管理器                                   |
  | cacheResolver | 指定获取解析器                                   |
  | condition     | 条件符合则缓存                                   |
  | unless        | 条件符合则不缓存                                 |
  | sync          | 是否使用异步模式，默认为 false                   |

  @Cacheable 支持同一个方法关联多个缓存。这种情况下，当执行方法之前，这些关联的每一个缓存都会被检查，而且只要至少其中一个缓存命中了，那么这个缓存中的值就会被返回。

  一个缓存名对应一个被注解的方法，但是一个方法可能传入不同的参数，那么结果也就会不同，这应该如何区分呢？这就需要用到 key 。在 spring 中，key 的生成有两种方式：显式指定和使用 keyGenerator 自动生成。

* @CachePut （增）

  使用该注解标志的方法，每次都会执行，并将结果存入指定的缓存中。通常用于新增的方法上。

* @CacheEvict （删）

  每次调用被该注解标注的方法，都会执行，并且删除指定的缓存。通常用于删除的方法上。

  | 属性/方法名      | 解释                                                         |
  | ---------------- | ------------------------------------------------------------ |
  | value            | 缓存名，必填，它指定了你的缓存存放在哪块命名空间             |
  | cacheNames       | 与 value 差不多，二选一即可                                  |
  | key              | 可选属性，可以使用 SpEL 标签自定义缓存的key                  |
  | keyGenerator     | key的生成器。key/keyGenerator二选一使用                      |
  | cacheManager     | 指定缓存管理器                                               |
  | cacheResolver    | 指定获取解析器                                               |
  | condition        | 条件符合则缓存                                               |
  | allEntries       | 是否清空所有缓存，默认为 false。如果指定为 true，则方法调用后将立即清空所有的缓存 |
  | beforeInvocation | 是否在方法执行前就清空，默认为 false。如果指定为 true，则在方法执行前就会清空缓存 |



### 实战

spring cache + caffeine

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
  <groupId>com.github.ben-manes.caffeine</groupId>
  <artifactId>caffeine</artifactId>
  <version>2.8.5</version>
</dependency>
```

````yaml
spring:
	cache:
    multi:
      # 是否存储空值，默认true，防止缓存穿透
      cacheNullValues: true
      # 是否动态根据cacheName创建Cache的实现，默认true
      dynamic: true
      # 是否通过缓存rest接口组件清空其他服务缓存,如果为true，必需要引入缓存rest接口组件
      allow-sync: true
      caffeine:
        # 过期策略-访问后过期
        # 访问后过期时间，单位毫秒，默认不配置
        # 设置为<=0时，不生效
        # expireAfterAccess: 30000
        # 过期策略-写入后过期(优先使用该策略)
        # 写入后过期时间，单位毫秒，默认为30000
        # 写入后过期时间和访问后过期时间同时存在时，以写入后过期时间为准
        # 设置为<=0时，不生效
        # 数据写入缓存后，10 分钟失效
        expireAfterWrite: 600000
        # 初始化大小，默认为100
        initialCapacity: 3000
        # 最大缓存对象个数，超过此数量时之前放入的缓存将失效，默认为500
        maximumSize: 30000
````



## 缓存中间件



### Redis



