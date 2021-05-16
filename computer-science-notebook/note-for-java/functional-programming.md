# 函数式编程

[TOC]

## 函数式编程

面向对象编程是对数据进行抽象， 而函数式编程是对行为进行抽象。

## Lambda 表达式

Lambda expressions are not unknown to many of us who have worked on other popular programming languages like Scala. **In Java programming language, a Lambda expression (or function) is just an *anonymous function***, i.e., a function with no name and without being bounded to an identifier. They are written exactly in the place where it’s needed, typically *as a parameter to some other function*.

Lambda 表达式是一个函数，是对行为的抽象，是函数是一等公民的体现。

## 函数式接口

![image-20210511131843126](assets/image-20210511131843126.png)



| 函数式接口        | 方法        | 返回值类型 | 备注           |
| ----------------- | ----------- | ---------- | -------------- |
| Predicate<T>      | test(T)     | boolean    | 断言           |
| Consumer<T>       | accept(T)   | void       | 只吃不吐       |
| Function<T, R>    | apply(T)    | R          | 输入 T，输出 R |
| BinaryOperator<T> | apply(T, T) | T          | 双飞           |
| Supplier<T>       | get()       | T          | 只吐不吃       |

**所有的 lambda 表达式，其实际上都是以上函数式接口的实现**：

```java
Predicate<Integer> atLeast5 = x -> x >= 5;
// 两者等价
Predicate<Integer> atLeast6 = new Predicate<Integer>() {
    @Override
    public boolean test(Integer integer) {
        return integer >= 6;
    }
};
System.out.println(atLeast6.test(6));
System.out.println(atLeast5.test(5));
```



## Stream

Stream 是用函数式编程方式在集合类上进行复杂操作的工具。  

Stream 方法分为惰性求值方法和及早求值方法：

* 惰性求值：仍然返回 Stream 对象的就是惰性求值
* 及早求值：返回一个值或者为空

**学好了流，就相当于在 Java 中使用 Pandas，很舒服！**

### 惰性求值方法

| 方法    | 功能                             | 备注                                        |
| ------- | -------------------------------- | ------------------------------------------- |
| map     | 将一种类型的值转换成另外一种类型 | Lambda 表达式必须是 Function 接口的一个实例 |
| flatMap | 用于处理元素是集合的集合         | 用于映射双层 for 循环                       |
|         |                                  |                                             |

#### flatMap

```java
List<Integer> together = Stream.of(asList(1, 2), asList(3, 4))
    .flatMap(numbers -> numbers.stream())
    .collect(toList());
assertEquals(asList(1, 2, 3, 4), together);
```



### 及早求值方法

| 方法      | 功能                           | 备注     |
| --------- | ------------------------------ | -------- |
| collect   | 转为 List / Map                |          |
| toArray   | 转为 array                     |          |
| min / max |                                |          |
| reduce    | count/max/min 都是 reduce 操作 |          |
| forEach   |                                | 无返回值 |

#### collect

Performs a mutable reduction operation on the elements of this stream using a Collector. A Collector encapsulates the functions used as arguments to collect(Supplier, BiConsumer, BiConsumer), allowing for reuse of collection strategies and composition of collect operations such as multiple-level grouping or partitioning.

`<R, A> R collect(Collector<? super T, A, R> collector);`

```
Params: collector – the Collector describing the reduction

Type parameters:
<R> – the type of the result
<A> – the intermediate accumulation type of the Collector

Returns: the result of the reduction

API Note:
	The following will accumulate strings into an ArrayList:
     List<String> asList = stringStream.collect(Collectors.toList());
 
	The following will classify Person objects by city:
     Map<String, List<Person>> peopleByCity 
     		= personStream.collect(Collectors.groupingBy(Person::getCity));
 
	The following will classify Person objects by state and city, cascading two Collectors together:
     Map<String, Map<String, List<Person>>> peopleByStateAndCity
         = personStream.collect(Collectors.groupingBy(Person::getState,
                                                      Collectors.groupingBy(Person::getCity)));
```

传入一个 Collector 对象，Collector 对象封装了及早求值的规则。Collector 对象由 Collectors 工厂的静态方法生成。

Collectors 提供的静态方法（实际上 Collectors 中提供了各种函数写好的函数）：

```
Collectors
Collectors
averagingDouble
averagingInt
averagingLong
boxSupplier
castingIdentity
collectingAndThen
computeFinalSum
counting
groupingBy
groupingBy
groupingBy
groupingByConcurrent
groupingByConcurrent
groupingByConcurrent
joining
joining
joining
mapMerger
mapping
maxBy
minBy
partitioningBy
partitioningBy
reducing
reducing
reducing
summarizingDouble
summarizingInt
summarizingLong
summingDouble
summingInt
summingLong
sumWithCompensation
throwingMerger
toCollection
toConcurrentMap
toConcurrentMap
toConcurrentMap
toList
toMap
toMap
toMap
toSet
CH_CONCURRENT_ID
CH_CONCURRENT_NOID
CH_ID
CH_NOID
CH_UNORDERED_ID
CollectorImpl
Partition
```

Demo:

```java
Set<String> origins = album.getMusicians()
    .filter(artist -> artist.getName().startsWith("The"))
    .map(artist -> artist.getNationality())
    .collect(Collectors.toSet());
```

```java
// 找出成员最多的乐队
public Optional<Artist> biggestGroup(Stream<Artist> artists) {
    Function<Artist,Long> getCount = artist -> artist.getMembers().count();
    return artists.collect(Collectors.maxBy(Comparator.comparing(getCount)));
}
```



#### min / max

```java
Optional<T> max(Comparator<? super T> comparator);
```

Demo：

```java
List<Track> tracks = asList(new Track("Bakai", 524), 
                            new Track("Violets for Your Furs", 378),
                            new Track("Time Was", 451));
Track shortestTrack = tracks
    .stream()
    .min(Comparator.comparing(track -> track.getLength()))
    .get();
assertEquals(tracks.get(1), shortestTrack);
```

#### reduce

```java
T reduce(T identity, BinaryOperator<T> accumulator);
```

等价于：

```java
T result = identity;
for (T element : this stream)
    result = accumulator.apply(result, element)
return result;
```

Demo：

```java
int count = Stream.of(1, 2, 3)
    .reduce(0, (acc, element) -> acc + element);
assertEquals(6, count);
```

等价于：

```java
BinaryOperator<Integer> accumulator = (acc, element) -> acc + element;
int count = accumulator.apply(
    accumulator.apply(
        accumulator.apply(0, 1),
        2),
    3);
```

### Demo

原代码：

```java
public Set<String> findLongTracks(List<Album> albums) {
    Set<String> trackNames = new HashSet<>();
    for(Album album : albums) {
        for (Track track : album.getTrackList()) {
            if (track.getLength() > 60) {
                String name = track.getName();
                trackNames.add(name);
            }
        }
    } 
    return trackNames;
}
```

函数式重构：

```java
public Set<String> findLongTracks(List<Album> albums) {
    Set<String> trackNames = new HashSet<>();
    albums.stream().forEach(album -> {
        album.getTrackList.stream()
            .filter(track -> track.getLength() > 60)
            .map(track -> track.getName())
            .forEach(name -> trackNames.add(name));
    });
    return trackNames;
}
```

函数式重构 - 优化：

```java
public Set<String> findLongTracks(List<Album> albums) {
    return albums.stream()
        .flatMap(album -> album.getTrackList().stream())
        .filter(track -> track.getLength() > 60)
        .map(track -> track.getName())
        .collect(Collectors.toSet());
}
```

## Java8 接口新特性

### 默认方法

Collection 接口中增加了新的 stream 方法， 如何能让 MyCustomList 类在不知道该方法的情况下通过编译？ Java 8 通过如下方法解决该问题： Collection 接口告诉它所有的子类：“ 如果你没有实现 stream 方法， 就使用我的吧。” 接口中这样的方法叫作默认方法， 在任何接口中， 无论函数接口还是非函数接口， 都可以使用该方法。

Iterable 接口中也新增了一个默认方法： forEach， 该方法功能和 for 循环类似， 但是允许用户使用一个 Lambda 表达式作为循环体。   

默认方法示例： forEach 实现方式：

```java
default void forEach(Consumer<? super T> action) {
    for (T t : this) {
        action.accept(t);
    }
}
```

重点就在于代码段前面的新关键字 default。 这个关键字告诉 javac 用户真正需要的是为接口添加一个新方法。 除了添加了一个新的关键
字， 默认方法在继承规则上和普通方法也略有区别。

Java 8 允许在接口中加入默认方法（已实现）。

```java
// Demo
public interface Sized {
    // 普通抽象方法，默认是public abstract修饰的，没有方法体
    int size();

    /*
     * 默认方法，有方法体
     * 任何一个实现了Sized接口的类都会向动继承isEmpty的实现
     */
    default boolean isEmpty() {
        return this.size() == 0;
    }
}
```



如果对默认方法的工作原理， 特别是在多重继承下的行为还没有把握， 如下三条简单的定
律可以帮助大家。

1. 类胜于接口。 如果在继承链中有方法体或抽象的方法声明， 那么就可以忽略接口中定义
   的方法。
2. 子类胜于父类。 如果一个接口继承了另一个接口， 且两个接口都定义了一个默认方法，
   那么子类中定义的方法胜出。
3. 没有规则三。 如果上面两条规则不适用， 子类要么需要实现该方法， 要么将该方法声明
   为抽象方法。
   其中第一条规则是为了让代码向后兼容。  

### 静态方法

Java 8 允许在接口内定义静态的方法并实现。

Stream 是个接口，Stream.of 是接口的静态方法，of 方法是静态工厂方法，用于生成一个 Stream 对象 。

#### Optional  

A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value.

使用工厂方法 of， 可以从某个值创建出一个 Optional 对象。 Optional 对象相当于值的容器， 而该值可以通过 get 方法提取。  

Optional 是为核心类库新设计的一个数据类型， 用来替换 null 值。  

reduce 方法的一个重点尚未提及： reduce 方法有两种形式， 一种如前面出现的需要有一个初始值， 另一种变式则不需要有初始值。 没有初始值的情况下， reduce 的第一步使用Stream 中的前两个元素。 有时， reduce 操作不存在有意义的初始值， 这样做就是有意义
的， 此时， reduce 方法返回一个 Optional 对象。  

```
Optional
Optional
Optional
empty
equals
filter
flatMap
get
hashCode
ifPresent
isPresent
map
of
ofNullable
orElse
orElseGet
orElseThrow
toString
EMPTY 返回一个 Optional 容器，容器中没有值
value
```

使用 Optional 对象的方式之一是在调用 get() 方法前， 先使用 isPresent 检查 Optional对象是否有值。 使用 orElse 方法则更简洁， 当 Optional 对象为空时， 该方法提供了一个备选值。 如果计算备选值在计算上太过繁琐， 即可使用 orElseGet 方法。 该方法接受一个 Supplier 对象， 只有在 Optional 对象真正为空时才会调用。
使用 orElse 和 orElseGet 方法：

```java
assertEquals("b", emptyOptional.orElse("b"));
assertEquals("c", emptyOptional.orElseGet(() -> "c"));
```


Optional 对象不仅可以用于新的 Java 8 API， 也可用于具体领域类中， 和普通的类别无二致。 当试图避免空值相关的缺陷， 如未捕获的异常时， 可以考虑一下是否可使用 Optional 对象。  

## 高级集合类和收集器

### 方法引用 替代 lambda

方法引用的使用场景：在 lambda 表达式中调用方法的时候，可以使用方法引用替代 lambda 表达式

标准语法为: `Classname::methodName  `

lambda 表达式就是一个函数，是对行为的封装。

```java
artist -> artist.getName()
// 用方法引用重写上面的 Lambda 表达式
Artist::getName
```

构造函数语法：

```java
(name, nationality) -> new Artist(name, nationality)
// 方法引用形式    
Artist::new
```

创建数组：

```java
String[]::new
```

### 收集器 Collector Collectors

Collector, 一种通用的、 从流生成复杂值的结构  

## Reference

https://github.com/RichardWarburton/java-8-Lambdas-exercises  