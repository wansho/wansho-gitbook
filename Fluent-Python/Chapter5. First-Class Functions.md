# Chapter5. First-Class Functions

从第五章开始，一直到第七章，都是在研究函数。

[TOC]

## What is First-Class Functions

Functions are treated like any other variable. Treating functions as objects. 

函数也被作为一个对象，其和对象一样，是 Python语言中的第一公民。

Demo:

```python
def factorial(n):
    """return n!"""
    return 1 if n < 2 else n * factorial(n-1)

fact = factorial # function 作为变量传递给另外一个变量
# fact 作为变量传入 map 方法，其参数为 range 生成的数据，map 返回一个 iterated 的对象
list(map(fact, range(10))) 
# 等价于
list(map(factorial, range(10)))

```

## 函数的 attributes

Demo:

```python
print(factorial.__doc__) # return n!
# __doc__ 用于生成 help text of and object
print(help(factorial))
"""
Help on function factorial in module __main__:
factorial(n)
    return n!
None
"""
```

| attribute | 解释           |
| --------- | -------------- |
| `__doc__` | 函数的注释声明 |
|           |                |
|           |                |



## 函数的 functions



## Higer-Order Functions

A function that takes a function as argument or returns a function as the result is a higher-order function.

传入或者返回一个函数的函数叫做 higer-order-function。

Higer-Order Functions: **sort, map, filter, reduce**

### Demo: sort()

```python
de reverse(word):
    """逆置word"""
    return word[::-1]
fruits = ["straberry", "fig", "cherry", "apple", "banana"]
sorted(fruits, key=reverse) # key 为一个 function
# 结果为：["banana","apple", "fig", "straberry", "cherry"]
# 上述代码执行的步骤：
# 1. 根据传入的 key 函数，对 fruits 进行变换，得到变换后的 list
# 2. 对 fruits 按照变换后的规则进行排序

# 其他变换规则
sorted(fruits, key=len)
```

### Modern Replacements for map/filter/reduce

Chapter2 中已经指出，任何用到 map 和 filter 的地方，都可以用 列表推导式 和 生成器表达式来替换。Demo:

```python
list(map(factoria, filter(lambda n: n % 2, range(6)))) # list of factorial of odd numbers up to 5!, using both map and filter

from functools import reduce
from operator import add
reduce(add, range(100)) # 两者等价
sum(range(100))

all(iterable)
any(iterable)
```

![map/filter](assets/1558485596538.png)

**reduce**

The common idea of **reduce**  is to apply some operation to successive items in a sequence, accumulating previous result, thus reducing a sequence of values to a single value.

reduce 用于对一个 sequence 进行 successive compute，从而得到一个 single value。

![Reduce](assets/1558443265331.png)

```python
from functools import reduce
from operator import add, sub

reduce(add, range(10)) # 等价于 0 + 1 + 2 + ……  + 9
reduce(sub, [1,2,3]) # 等价于 1 - 2 - 3
```

Other reducing built-ins:

```python
all(iterable) # return true if all value is true
any(iterable) # return true if one value is true

all(["1", [1], (1), {1:2}]) # true
all(["1", [1], (1), {}]) # false

any(["1", [1], (1), {}]) # true 
```

注意：

* 在 Python3 中， **map** 和 **filter** 会返回一个 generator (iterable)对象，并不是一个 sequence

### Anonymous Functions

keyword lambda 用于创建一个匿名函数，其本质上是一个语法糖（syntactic sugar）。

**lambda expression 的优点和应用场景：**简洁，适合处理 sequence，通常用于 Higher-Order-Function 的函数参数

**lambda expression 的缺点：**不能处理复杂的逻辑，比较晦涩，unreadable

Demo:

```python
fruits = ["straberry", "fig", "cherry", "apple", "banana"]
sorted(fruits, key=lambda fruit: fruit[::-1])
# 其等价于
sorted(fruits, key=reverse) 
```

值得注意的是，lambda expression 除了应用在 High-Order-Function 中，其他地方使用得不多。

**去 lambda expression 的四个步骤**

如果我们发现一个 lambda expression 十分晦涩难懂，那么可以用如下步骤来解决：

1. 理解这个 lambda expression 的业务逻辑
2. 对业务逻辑进行重命名
3. 用步骤二的名字 def 一个 function，用 function 替代 lambda expression
4. 移除 lambda expression

## Callable Objects

### Definition

A *callable object* is an object that can accept some arguments (also called parameters) and possibly return an object (often a tuple containing multiple objects). A function is the simplest callable object in Python, but there are others, such as [classes](https://en.wikibooks.org/wiki/Python_Programming/Classes) or certain class instances. [From wikibooks](<https://en.wikibooks.org/wiki/Python_Programming/Functions>)

