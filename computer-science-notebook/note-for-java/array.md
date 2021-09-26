# Array

on-java 数组

[TOC]

## 数组的特性

数组一经定义，长度即固定；数组是线性序列，数据访问很快；数组只能存储一种类型的数据。

**Array 和 ArrayList 的区别**

* ArrayList 的效率不如数组： ArrayList将数组封装起来。必要时，它会自动分配更多的数组空间，创建新数组，并将旧数组中的引用移动到新数组。这种灵活性需要开销，所以一个 ArrayList 的效率不如数组
*  ArrayList 不能存储基本数据类型，Array 可以

## 打印数组

```java
String[] test = {"1", "2", "3"};
System.out.println(Arrays.toString(test));
// [1, 2, 3]

Arrays.deepToString() // 打印二维数组
```

## 创建数组

数组中的数据集实际上都是对堆中真正对象的引用。数组是保存指向其他对象的引用的对象，数组可以隐式地创建，作为数组初始化语
法的一部分，也可以显式地创建，比如使用一个 new 表达式。数组对象的一部分（事实上，你唯一可以使用的方法）就是只读的 length成员函数，它能告诉你数组对象中可以存储多少元素。 [ ] 语法是你访问数组对象的唯一方式。

```java
BerylliumSphere[] b = new BerylliumSphere[5];

BerylliumSphere[] d = {
    new BerylliumSphere(),
    new BerylliumSphere(),
    new BerylliumSphere()
};

// new 一个二维数组
int[][] a = {
    { 1, 2, 3, },
    { 4, 5, 6, },
};
Arrays.deepToString(a);

// 创建一个三位数组
int[][][] a = new int[2][2][4];
System.out.println(Arrays.deepToString(a));
```

你无法找出到底有多少元素存储在数组中，因为 length 只能告诉你数组可以存储多少元素；这就是说，数组对象的大小并不是真正存储在数组中对象的个数。然而，当你创建一个数组对象，其引用将自动初始化为 null，因此你可以通过检查特定数组元素中的引用是否为 null 来判断其中是否有对象。基元数组也有类似的机制，比如自动将数值类型初始化为 0， char 型初始化为 (char)0，布尔类型初始化为 false。  

## Arrays 工具类

Array 的工具类是 Arrays；Collection 的工具类是 Collections；String 的工具类是 StringUtils。

不管是数组，还是集合，最后统一转成流来处理。

| 方法           | 作用                                                         | 备注                            |
| -------------- | ------------------------------------------------------------ | ------------------------------- |
| toString       | 打印数组                                                     |                                 |
| deepToString   | 打印多维数组                                                 |                                 |
| setAll         | 使用一个生成器并生成不同的值并填充到数组                     | java8 引入                      |
| fill           | 将单个值复制到整个数组，或者在对象数组的情况下，将相同的引用复制到整个数组 |                                 |
| asList         | 获取任何序列或数组，并将其转换为一个 列表集合                |                                 |
| copyOf         | 以新的长度创建现有数组的新副本                               | 比for循环手动复制速度快；浅拷贝 |
| copyOfRange    | 创建现有数组的一部分的新副本                                 |                                 |
| equals         | 比较两个数组是否相等                                         |                                 |
| deepEquals     | 多维数组的相等性比较                                         |                                 |
| stream         | 生成数组元素的流                                             |                                 |
| sort           | 排序数组                                                     |                                 |
| binarySearch   | 在已排序的数组中查找元素                                     |                                 |
| parallelPrefix | 使用提供的函数并行累积 (以获得速度)。基本上，就是数组的 reduce() |                                 |
| stream         | 从数组生成流                                                 |                                 |

## 数组排序

```java
CompType[] a = new CompType[12];
Arrays.setAll(a, n -> CompType.get());
show("Before sorting", a);
Arrays.sort(a, Collections.reverseOrder());
show("After sorting", a);
```

