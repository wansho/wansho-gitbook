# Questions

创建 Questions 的目的：用来快速回顾 Python 的重点。

[TOC]

## Python 总结

Python 是一种动态强类型的语言，采用鸭子类型来实现多态。

## Chapter1. The Python Data Model

* Python 语言最大的特性
* 魔法方法的优点 — 3个
* 魔法方法 `in` 和 `__contains__()` 的关系
* 魔法方法 `bool()` 和 `__bool__()`,  `__len__()` 的关系
* `__repr__()` 和 `__str__()` 的区别，`__repr__()` 和 `%r` 的关系
* 解释 Duck Typing（鸭子模型），鸭子类型与多态的关系

## Chapter2. An Array of Sequences

* Builted-in Sequence 的两种分类
* Slice 不包含最后一个元素的原因
* 通过 Slice 进行逆序 sequence 的方法
* Slice Object 及其作用（Slice 对象）
* Sequence 的 Slice 赋值及其妙用
* `+ *` 和 `+=, *=` 的区别
* 生成器表达式 和 列表推导式 的区别
* 生成器表达式的语法
* tuple 的两个作用
* tuple 的两种定义方式，有一种特殊的定义方式
* tuple 是否完全是 immutable，是否任意 tuple 都可以 hash
* tuple 的拆包（unpacking）和 常见的应用场景
* namedtuple 和 tuple 的区别，namedtuple 的使用场景
* `*` 的作用
* 字符串格式化的两种方式，解释 `%r` 和 `{!r}`
* 解释字符串格式化的三种特殊的格式化标记: `%r`,`%s`,`%a`
* 解释 `enumerate()` 及其作用
* `lst.sort()` 和 `sorted()` 的区别
* inplace 方法的优点和缺点
* `bisect` 模块的使用场景
* `array.array` 的特性及其优点
* `deque` 的特性及其使用场景
* Python 哑变量

## Chapter3. Dictionaries and Sets

* 可以 hashable 的类型
* hash 表的原理
* 为什么 list 不能 hash
* dict 的特点和使用情境
* dict 的常见构造方法 / 弹出数据 / 随机弹出数据的方法
* 如何创建带有默认 value 的 dict 
* dict 的 `update()` 方法具体步骤
* dict 如何对 key-value 同时遍历
* dict 查找时，处理 missing key 的 几种方式，哪两种方式更高效？原理是什么
* dict 的变体：OrderDict / Counter 的特性，如何对字符串中的字符进行统计
* Set 有哪些特性
* Set 的比较运算符/算数运算符/ inplace operator
* Set 和 Dict 的区别在哪里，速度上有差距吗，差在哪里
* dict in JSON Style 的弊端，如果只是想用 dict 单纯的存储数据，那么用什么来替代 dict

## Chapter4. Text versus Bytes

* byte，unicode 的定义，Unicode sequence 和 byte sequence 的区别是什么
* byte 和 Unicode 如何互相转换
* Python2/Python3 默认的字符串类型，Python 2如何定义 Unicode 字符串
* Python3 如何定义 Byte sequence
* Python 默认的编码器
* Python 如何判断文本的编码格式，如何对文本进行 byte 字节流的读写
* Python 为何要 Encode
* 解释 大端和小端，BOM，utf-8 和 utf-8 BOM，Unicode Sandwich
* 正则表达式对 byte 进行匹配

## Chapter5. First-Class Functions

* 解释 First-Class Functions
* 解释 High-Order Functions，有哪些常用的 High-Order Function
* reduce 的思想，Python 中有哪些可以取代 reduce 的 built-in function ？
* Function Object 有哪些重要的 attribute 和 method
* map/filter 的思想，其返回的类型是什么，是否可以被替换
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
* 如何用 sorted function 对 list 进行不同要求的排序，例如按照长度/首字母/元组的第 n 个元素
* instance，internal state 在 Python 中指代什么

## Chapter6. Design-Patterns with Functions

* 设计模式一书中一共定义了多少种设计模式，有多少种设计模式在动态语言中可能被重构
* 解释 Strategy Pattern，策略模式的经典例子是什么
* 策略模式在 Python 中可以怎么重构，其核心思想是什么
* Python 中创建抽象基类的步骤
* Python 中判断类中是否包含某属性的方法
* Python 中对象和 None 怎么比较
* Python 中小于 1 的小数，可以怎么写
* Python 类中如何获取类中的符号表，包括属性和方法

## Chapter7. Function Decorators and Closures

* number 是 immutable 类型还是 mutable 类型
* Python 输出小数的方式，print 中 %r 被解释成哪一个函数
* 解释 abc module 
* 不需要函数名的函数，可以取什么样的函数名
* 解释一下装饰器，装饰器和 first-class function / 闭包的关系，装饰器可以分成哪两类
* 如何用装饰器对策略设计模式进行优化
* 介绍装饰器的几个特征
* 装饰器在实际工程中，通常如何应用
* Python function 内变量的作用域，function 如何界定局部变量，如何对 function 外的变量进行赋值引用
* Python local variable 和 Javascript 的区别
* 解释一下闭包，闭包的作用
* 如何查看闭包函数绑定的 free variable
* 闭包如何对绑定的变量进行重新赋值
* 解释 Python 自带的三个装饰器 functools.wraps, functools.lru_cache, functools.singledispatch
* Python 如何实现 function 的重载，其和 Java 重载，if/else 的区别
* 解释 stack decorator
* 解释装饰器工厂

## Chapter8. Object Reference, Multability, and Recycling

* 解释 dir() 方法
* 解释 `==` 符号，其被解释成什么方法，其与 is 的区别是什么，两者速度谁更快
* list 浅拷贝的三种方式
* 任意 object 如何进行深拷贝和浅拷贝
* 解释 Python 浅拷贝和深拷贝
* 为什么要避免将 mutable objects 作为函数参数的默认值
* 当类的构造函数参数需要传入 mutable sequence 时，如何使得该类有良好的封装性，进而减小对传入参数的影响
* 解释 del 的作用和 垃圾回收机制
* 解释一个 Python 字符串和数值驻留现象，驻留现象带来了什么启发

## Chapter9. A Pythonic Object

* 如何实现一个 Pythonic 风格的对象
* Python 如何实现一个对象内部的迭代
* Python 如何定义类的静态方法，staticmethod 和 classmethod 有什么区别
* Python 自定义类型如何实现 hashable
* Python 如何实现成员变量的私有，其原理是什么，能否实现真正的私有，能否进行写操作
* Python 成员变量私有化是否能实现真正的私有化
* 如何查看 Python 类的成员变量
* Python 如何实现成员变量的 protect，这种方法是否是官方规定的
* 单下划线在 Python  中一个官方规定的作用是什么
* Python 是如何存储成员变量的，有何缺陷

## Chapter11. Interfaces: From Protocols to ABCs

* Python 有哪两种接口（协议）
* 解释一下魔法方法定义的协议
* 为什么 isinstance 和 issubclass 两个方法比较鸡肋，是什么原因导致的
* Monkey-Patching 是什么，有什么作用
* 自定义的 sequence 想要 shuffle，需要实现哪一个魔法方法
* Python 内置的 ABCs 大多位于哪两个 module
* 如何定义自己的 ABCs
* Python 是强类型语言还是弱类型语言

## Other Questions

* all() 的复杂逻辑实现方法，with 是否可以用于 for / while
* 如何编写地道的带有 index 的遍历（enumerate）