#  Stream

[TOC]

## on java 

在大多数情况下，将对象存储在集合中就是为了处理它们，因此你会发现你把编程的主要焦点从集合转移到了流上。
流的一个核心好处是，它使得程序更加短小并且更易理解。  

流的知识可以分成三种：流的创建，流的中间操作，流的终端操作

### 流支持

在接口中添加被 default（默认）修饰的方法。通过这种方案，设计者们可以将流式（stream）方法平滑地嵌入到现有类中  

### 创建流

#### Stream.of

```java
public static<T> Stream<T> of(T... values) {
    return Arrays.stream(values); // 其实是调用了 Arrays.stream 静态泛型方法
}
```

```java
Stream.of("It's ", "a ", "wonderful ", "day ", "for ", "pie!")
```

#### Arrays.stream

将数组转换成流。

```java
public static <T> Stream<T> stream(T[] array) {
    return stream(array, 0, array.length);
}
```

#### collection.stream

```java
list.stream();
m.entrySet().stream().map(e -> e.getKey() + ": " + e.getValue())
```

#### 随机数流

```java
Random rand = new Random(47); // 47 是种子
rand.ints().boxed().limit(4).forEach(System.out::println);
rand.longs()...;
rand.doubles()...;
rand.ints(10, 20)...; // 上限和下限
rand.ints(2)...; // 流的大小
rand.longs(3, 12, 22)...; // 流的大小和边界
```

#### Stream.generate + Supplier  

Stream.generate() 的用法，它可以把任意Supplier<T> 用于生成 T 类型的流。

```java
Stream.generate(new RandomWords("Cheese.dat"))
    .limit(10)
    .collect(Collectors.joining(" ")));

Stream.generate(() -> "duplicate")
    .limit(3)
    .forEach(System.out::println);
// duplicate  duplicate  duplicate
```

  #### IntStream.range

```java
IntStream.range(0, 10).sum()
```

#### Stream.iterate

Stream.iterate() 产生的流的第一个元素是种子（iterate 方法的第一个参数），然后将种子传递给方法（iterate 方法的第二个参数）。方法运行的结果被添加到流（作为流的下一个元素），并被存储起来，作为下次调用 iterate() 方法时的第一个参数，以此类推。  

#### pattern.splitAsStream 

Java 8 在 java.util.regex.Pattern 中增加了一个新的方法 splitAsStream()。这个方法可以根据传入的公式将字符序列转化为流。  

```java
Pattern.compile("[ .,?]+").splitAsStream(str);
```



### 中间操作

#### peak

peek() 操作的目的是帮助调试。它允许你无修改地查看流中的元素。

```java
Arrays.asList(1,2,3)
                .stream()
                .peek(System.out::println)
                .skip(1)
                .peek(System.out::println)
                .forEach(System.out::println);
```

#### sort

```java
 Arrays.asList(1,2,3,6,3,6,8,9,1,0,0)
                .stream()
                .skip(1)
                .sorted(Comparator.reverseOrder())
                .forEach(System.out::println);
```

sorted() 预设了一些默认的比较器。这里我们使用的是反转 “自然排序”。当然你也可以把 Lambda 函数作为参数传递给 sorted()。  

```java
Arrays.asList(1,2,3,6,3,6,8,9,1,0,0)
                .stream()
                .sorted((x, y) -> x - y)
                .forEach(System.out::println);
```

#### distinct

相比创建一个 Set 集合来消除重复，该方法的工作量要少得多。  

```java
Arrays.asList(1,2,3,6,3,6,8,9,1,0,0)
                .stream()
                .sorted((x, y) -> x - y)
                .distinct()
                .forEach(System.out::println);
```

#### filter



#### map

* map(Function)：将函数操作应用在输入流的元素中，并将返回值传递到输出流中。
* mapToInt(ToIntFunction)：操作同上，但结果是 IntStream。
* mapToLong(ToLongFunction)：操作同上，但结果是 LongStream。
* mapToDouble(ToDoubleFunction)：操作同上，但结果是 DoubleStream。  



#### flatMap

flatMap 用于将多个 collection 合并成一个 collection。flat: 降维，将二维降为一维，扁平化合并多个流为一个流。

demo:

```java
List<String> collection1 = new ArrayList<>(Arrays.asList("str1", "str2"));
List<String> collection2 = new ArrayList<>(Arrays.asList("str3", "str4"));
List<List<String>> collectionList = Arrays.asList(collection1, collection2);
collectionList
    .stream()
    .flatMap(lst -> lst.stream())
    .collect(Collectors.toList());
// 返回的 list 内容是 [str1, str2, str3, str4]
```

### 终端操作

#### 数组

* toArray()：将流转换成适当类型的数组。
* toArray(generator)：在特殊情况下，生成自定义类型的数组。  

```java
int[] rints = new Random(47).ints(0, 1000).limit(100).toArray();
```

#### 循环

* forEach(Consumer) 常见如 System.out::println 作为 Consumer 函数。
* forEachOrdered(Consumer)：保证 forEach 按照原始流顺序操作。  

#### 集合

* collect(Collector)：使用 Collector 收集流元素到结果集合中。
* collect(Supplier, BiConsumer, BiConsumer)：同上，第一个参数 Supplier 创建了一个新的结果集合，第二个参数 BiConsumer 将下一个元素收集到结果集合中，第三个参数 BiConsumer 用于将两个结果集合合并起来。

#### 组合

* reduce(BinaryOperator)：使用 BinaryOperator 来组合所有流中的元素。因为流可能为空，其返回值为 Optional。
* reduce(identity, BinaryOperator)：功能同上，但是使用 identity 作为其组合的初始值。因此如果流为空， identity 就是结果。
* reduce(identity, BiFunction, BinaryOperator)：更复杂的使用形式（暂不介绍），这里把它包含在内，因为它可以提高效率。通常，我们可以显式地组合 map()和 reduce() 来更简单的表达它。

#### 匹配

* allMatch(Predicate) ：如果流的每个元素提供给 Predicate 都返回 true ，结果返回为 true。在第一个 false 时，则停止执行计算。
* anyMatch(Predicate)：如果流的任意一个元素提供给 Predicate 返回 true ，结果返回为 true。在第一个 true 是停止执行计算。
* noneMatch(Predicate)：如果流的每个元素提供给 Predicate 都返回 false 时，结果返回为 true。在第一个 true 时停止执行计算。

#### 查找

* findFirst()：返回第一个流元素的 Optional，如果流为空返回 Optional.empty。
* findAny(：返回含有任意流元素的 Optional，如果流为空返回 Optional.empty。  

#### 统计

对象流统计

* count()：流中的元素个数。
* max(Comparator)：根据所传入的 Comparator 所决定的 “最大” 元素。
* min(Comparator)：根据所传入的 Comparator 所决定的 “最小” 元素。  

数字流统计

* average() ：求取流元素平均值。
* max() 和 min()：数值流操作无需 Comparator。
* sum()：对所有流元素进行求和。
* summaryStatistics()：生成可能有用的数据。目前并不太清楚这个方法存在的必要性，因为我们其实可以用更直接的方法获得需要的数据。  

### Optional

为防止流中元素为空，引入 Optional 容器。

* findFirst() 返回一个包含第一个元素的 Optional 对象，如果流为空则返回 Optional.empty
* findAny() 返回包含任意元素的 Optional 对象，如果流为空则返回 Optional.empty
* max() 和 min() 返回一个包含最大值或者最小值的 Optional 对象，如果流为空，则返回 Optional.empty

#### 创建 Optional

三个静态方法用于创建 Optional：

* empty()：生成一个空 Optional。
* of(value)：将一个非空值包装到 Optional 里。
* ofNullable(value)：针对一个可能为空的值，为空时自动生成 Optional.empty，否则将值包装在 Optional 中。  

#### isPresent()  get()

#### 解包 Optional

* ifPresent(Consumer)：当值存在时调用 Consumer，否则什么也不做。
* orElse(otherObject)：如果值存在则直接返回，否则生成 otherObject。
* orElseGet(Supplier)：如果值存在则直接返回，否则使用 Supplier 函数生成一个可替代对象。
* orElseThrow(Supplier)：如果值存在直接返回，否则使用 Supplier 函数生成一个异常。  

## 介绍

Stream 是用函数式编程方式在集合类上进行复杂操作的工具。  

Stream 方法分为惰性求值方法和及早求值方法：

* 惰性求值：仍然返回 Stream 对象的就是惰性求值
* 及早求值：返回一个值或者为空

**学好了流，就相当于在 Java 中使用 Pandas，很舒服！**

**Interface Hierarchy**

```
java.lang.AutoCloseable
    java.util.stream.BaseStream<T,S>
        java.util.stream.DoubleStream
        java.util.stream.IntStream
        java.util.stream.LongStream
        java.util.stream.Stream<T>
```

## 惰性求值方法

| 方法    | 功能                             | 备注                                        |
| ------- | -------------------------------- | ------------------------------------------- |
| map     | 将一种类型的值转换成另外一种类型 | Lambda 表达式必须是 Function 接口的一个实例 |
| flatMap | 用于处理元素是集合的集合         | 用于映射双层 for 循环                       |
|         |                                  |                                             |

### flatMap

```java
List<Integer> together = Stream.of(asList(1, 2), asList(3, 4))
    .flatMap(numbers -> numbers.stream())
    .collect(toList());
assertEquals(asList(1, 2, 3, 4), together);
```



## 及早求值方法

| 方法      | 功能                           | 备注     |
| --------- | ------------------------------ | -------- |
| collect   | 转为 List / Map                |          |
| toArray   | 转为 array                     |          |
| min / max |                                |          |
| reduce    | count/max/min 都是 reduce 操作 |          |
| forEach   |                                | 无返回值 |

### collect

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

统计List中元素出现的次数
Map<Integer, Long> map = list.stream().collect(Collectors.groupingBy(p -> p,Collectors.counting()));                                                       
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

toMap:

```java
Map<String, String> nameToIdMap = conceptRepo.findSubConceptsByFid(fid)
                        .stream().collect(Collectors.toMap(Concept::getName, Concept::getId));
// toMap 第一个参数是 key，第二个参数是 value.

Map<String, String> fieldNameToAliasMap = Arrays.stream(fields)
                .filter(field -> field.isAnnotationPresent(org.springframework.data.elasticsearch.annotations.Field.class))
                .filter(field -> StringUtils.isNotEmpty(field.getAnnotation(org.springframework.data.elasticsearch.annotations.Field.class).name()))
                .collect(Collectors.toMap(
                        field -> CaseFormat.UPPER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, field.getName()),
                        field -> field.getAnnotation(org.springframework.data.elasticsearch.annotations.Field.class).name(),
                		(v1, v2) -> v2 // 添加 key 重复的策略
                ));
```



### min / max

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

### reduce

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

## IntStream

### range

range 是一个静态工厂方法，用于生成一个 IntStream。

代码重构：

```java
for (int i = 0; i < 4; i++) {
    System.out.println(i+"...");
}
// 重构后：
IntStream.range(0,4).forEach(i -> System.out.print(i +"..."));
```

Demo：

```java
/**
    * 并行打印，看看结果
    * @param
    * @return
    */
public void parallelPrint(){
    IntStream.range(0, 10).parallel().forEach(i -> {
        System.out.println(i);
    });
}
```

```
并行打印的结果
6
5
1
0
2
3
9
7
8
4
```



## Demo

### 函数式重构

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

### 求交集，差集

```java
List list=list1.stream().filter(t->list2.contains(t)).collect(Collectors.toList());

list=list1.stream().filter(t-> !list2.contains(t)).collect(Collectors.toList());

list=list.stream().distinct().collect(Collectors.toList());
```

