# Chapter1. The Python Data Model

[TOC]

## special / magic / dunder methods

Python 最大的特性，在于其语言的一致性。其定义了大量的与自然语言相近的魔法方法，用来保证语言的统一和一致性。当我们接触一个新的 Python 包时，我们能根据这些魔法方法，快速上手这个 Python 包。

魔法方法分为两类：

* magic method 

  | magic method | built-in method |
  | ------------ | --------------- |
  | `__str__`    | `str()`         |
  | `__len__`    | `len()`         |
  | `__int__`    | `int()`         |

* magic method for operators

  | magic method for operators | built-in operator |
  | -------------------------- | ----------------- |
  | `__and__`                  | `and`             |
  | `__or__`                   | `or`              |
  | `__add__`                  | `+`               |

**魔法方法的优点**：

* 魔法方法统一了常见的语法规则

  用户不需要再去记忆，对于获取一个对象的长度，究竟是用 .length() 还是 .size()

* 实现了魔法方法的类可以方便的调用 Python 的标准库（不需要自己重复造轮子）

  例如，通过实现 `__len__` 和 `__getitem__` 这两个魔法方法，该类就拥有了 list 特性，几乎所有 list 的方法都能适用

* 魔法方法的执行速度很快（其由 Python 解释器直接执行）

  Python 解释器会将 built-in 方法解释成其对应的 `__method__`魔法实现，然后执行这些魔法方法，Python解释器是这些魔法方法最频繁的执行者。

通过实现这些魔法方法，使得我们自定义的类，能够像 Python 的 built-in 类型一样用起来很方便。当我们想要创建一个新的类时，我们不仅要考虑其继承自哪些类，更要考虑，要实现哪些魔法方法。

通常情况下，我们应该去实现魔法方法，而不是去直接调用这些方法，尽管我们可以直接调用。只有一个魔法方法比较特殊：`__init__`用来调用父类的 init 方法

### Magic methods Demo：构造向量

```python
import math

class Vector():

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __bool__(self):
        return bool(abs(self))

    def __abs__(self):
        return math.hypot(self.x, self.y)

    def __mul__(self, other):
        return Vector(self.x * other, self.y * other)

    def __repr__(self):
        return "vector(" + str(vector.x) + ", " + str(vector.y) + ")"

    def __str__(self):
        """
        __str__ 定义后，print(object) 会被 Python 解释器解释成 print(str(object))
        如果没有定义 __str__，那么 print(object) 和 str(object) 会被解释成 __repr__(object)
        如果连 __repr__ 也没有定义，那么就会打印一个对象 0x 值
        通常情况下，只需要定义 __repr__ 即可
        :return:
        """
        return "hehe"
    
vector = Vector(3, 4)
print(abs(vector))
print(str(vector))
print(vector)
print(bool(vector))

5.0
hehe
hehe
True
```



## Duck Typing

> **Duck typing** in computer programming is an application of the [duck test](https://en.wikipedia.org/wiki/Duck_test)—"If it walks like a duck and it quacks like a duck, then it must be a duck"—to determine if an [object](https://en.wikipedia.org/wiki/Object_(computer_science)) can be used for a particular purpose. With normal typing, suitability is determined by an object's type. In duck typing, an object's suitability is determined by the presence of certain [methods](https://en.wikipedia.org/wiki/Method_(computer_programming)) and properties, rather than the type of the object itself.[[1\]](https://en.wikipedia.org/wiki/Duck_typing#cite_note-1)
>
> 如果它走起来像一只鸭子，叫声也想一只鸭子，那么它就是一个鸭子。

**Duck Typing** is used to to determine if an object can be used for a particular purpose. 鸭子模型通常用于实现动态语言的多态。

大多数面向对象的编程语言，其多态的实现是因为某一类的对象都继承自一个 father，某一个类的特征也取决于该类的继承、接口及其自身的特征。而 Python 这一类语言不同，其多态的实现，可能是因为其类中实现了某一个特定的方法，使得该类拥有某一类特性。例如：

* 通过实现 `__len__` 和 `__getitem__` 这两个魔法方法，我们自定义的类，就可以拥有 list 的全部特性

* 字典的 `update()` 方法，其接受任何有 mapping 或 iterating 特性的对象

  首先判断接收的对象是否有 `keys()` 方法，如果有，则把它当成一只鸭子(mapping)，否则再尝试 iterate 该对象，如果可以 iterate，那么就假定该对象中的元素为 元组对(key, value)。

* `lst.extend()` 方法可以接受任何 iterating 的对象

## Tips

### `in` 与 `_contains__()` 的关系

如果不实现 `__contains__` 方法，那么 in 的操作，就会在 list 中做一个顺序遍历

### `__repr__` 和 `__str__` 的区别

* `__repr__` 是对 object 的字符串描述，`__str__` 是 `str()`的魔法方法，并且 `print(object)`会默认被解释成 `print(__repr__(object))`
* 如果没有实现 `__str__`，那么 Python 解释器会默认调用 `__repr__` 方法，所以 `__repr__` 方法更通用
* `__repr__` 在 debugging 和 logging 时会调用，`__str__` 通常用于终端用户的字符描述
* `__str__` 更多的与 `str()` 有关，而 `__repr__` 更多的与 `print()` 有关

### `__bool__` 方法与 `__len__` 的关系

`bool(object)` 会被解释成 `object.__bool__()`，如果 `__bool__()` 方法没有被定义，那么 Python 解释器会尝试调用 `object.__len__()`方法，如果返回结果为0，则为 false.

