# Questions

创建 Questions 的目的：用来快速回顾 Python 的重点。

## Chapter1. The Python Data Model

* Python 语言最大的特性
* 魔法方法的优点 — 3个
* 魔法方法 `in` 和 `__contains__()` 的关系
* 魔法方法 `bool()` 和 `__bool__()`,  `__len__()` 的关系
* `__repr__()` 和 `__str__()` 的区别
* 解释 Duck Typing（鸭子模型），鸭子类型与多态的关系
* Python 实现多态的两种方法

## Chapter2. An Array of Sequences

* Builted-in Sequence 的两种分类
* Slice 不包含最后一个元素的原因
* 通过 Slice 进行逆序 sequence 的方法
* Slice Object 及其作用（Slice 对象）
* Sequence 的 Slice 赋值及其妙用
* `+ *` 和 `+=, *=` 的区别
* 生成器表达式 和 列表推导式 的区别
* 元组的两个作用
* 元组的拆包（unpacking）和 常见的应用场景
* namedtuple 和 tuple 的区别，namedtuple 的使用场景
* `enumerate()` 的作用
* `lst.sort()` 和 `sorted()` 的区别
* inplace 方法的优点和缺点
* `bisect` 模块的使用场景
* `array.array` 的特性及其优点
* `deque` 的特性及其使用场景

## Chapter3. Dictionaries and Sets

* 可以 hashable 的类型
* dict 的特点和使用情境
* dict 的常见构造方法 / 弹出数据 / 随机弹出数据的方法
* dict 的 `update()` 方法的原理
* dict 查找时，处理 missing key 的 几种方式，哪两种方式更高效？原理是什么
* dict 的变体：OrderDict / Counter 的特性
* Set 有哪些特性
* Set 的比较运算符/算数运算符/ inplace operator
* Set 和 Dict 的区别在哪里，速度上有差距吗，差在哪里
* dict in JSON Style 的弊端

## Chapter4. Text versus Bytes

* byte，unicode 的定义，Unicode sequence 和 byte sequence 的区别是什么
* byte 和 Unicode 如何互相转换
* Python2/Python3 默认的字符 sequence 类型
* Python3 如何定义 Byte sequence
* Python 默认的编码器
* Python 如何判断文本的编码格式，如何对文本进行 byte 字节流的读写
* Python 为何要 Encode
* 解释 大端和小端，BOM，utf-8 和 utf-8 BOM，Unicode Sandwich
* 正则表达式对 byte 进行匹配

## Chapter5. First-Class Functions

* 解释 First-Class Functions
* 解释 High-Order Functions，有哪些常用的 High-Order Function
* reduce 的思想，常见的 reduce 类型的方法
* Function Object 有哪些重要的 attribute 和 method
* map/filter 的思想，是否可以被替换
* Lambda 表达式本质上是什么，其优点有哪些
* 什么是 callable object，最简单的 callable object 是什么，如何判断一个对象是否是 callable object
* Python 中有哪几种 callable object
* 如何实现一个对象的 callable，要在该类中实现哪个方法
* Python 中 method 和 function 分别指代的是什么
* Python 中 built-in method/function 指的是什么，举个例子
* 如何获取一个函数对象的所有属性
* Python 的 函数能否赋予自定义的属性，该属性存储在哪里
* 关键字参数和位置参数
* 如何在只有函数接口的情况下，了解函数的所有参数和默认值情况，传统的方法是什么，最快速的方法是什么
* 如何预判断传入的参数，是否符合函数的要求？
* `functools` 和 `operator`两个 package 的作用和使用场景

