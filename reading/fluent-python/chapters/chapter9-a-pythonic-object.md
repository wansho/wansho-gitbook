# A Pythonic Object

[TOC]

第九章衔接第一章，介绍如何实现一个 Python 风格的对象。本章会重点介绍 Python 的魔法方法。

##How to Implement a Pythonic Object

Python 并不是通过继承来实现某一个对象的特征，而是通过实现具体的魔法方法，来使一个对象具有某些特征。这就是 Python 的鸭子类型，实现了鸭子走和叫两个魔法方法，那么我们就拥有了鸭子的特征；实现了 `__len__()` 和 `__getitem__()` 这两个魔法方法，那么我们就拥有了 list 的特征，就可以调用 list 相关的标准库。

简单来说，我们想要我们自定义的类拥有什么样的特征，那么直接去实现去对应的魔法方法即可。

## Object Representation

### `__repr__()`

`print()` 方法会被 Python 解释器解释成 `__repr__()`，`__repr__()` 是**面向开发者**的

### `__str__()`

`str()` 方法会被 Python 解释器解释成 `__str__()`，`__str__()` 是**面向用户**的，如果 `__str__()` 没有被实现，那么就会调用 `__repr__()` 方法

## 特征 ——> 魔法方法

| 语法                      | 魔法方法                                        |
| ------------------------- | ----------------------------------------------- |
| ==                        | `__eq__()`                                      |
| print()                   | `__repr__（）`                                  |
| str()                     | `__str__()`                                     |
| bool()                    | `__bool__()`                                    |
| format(), str.format()    | `__format__()`                                  |
| list                      | `__len__()` + `__getitem__()`                   |
| Iterable (单个对象可迭代) | `__iter__()`                                    |
| hashable (可 hash)        | 1. 私有化成员变量 2. `__hash__()` 3. `__eq__()` |
| hash()                    | `__hash__()`                                    |
|                           |                                                 |

## staticmethod and classmethod

Python 用两个内置的装饰器来实现静态方法。静态方法随着类的加载而加载，可以通过类名直接调用。

上面两个静态方法，不同点在于，classmethod 的第一个参数是类。Demos:

```Python
@staticmethod
def count(nums):
    return len(nums)

@classmethod
def frombytes(cls, octets):
    typecode = chr(octets[0])
    memv = memoryview(octets[1:]).cast(typecode)
    return cls(*memv)
```

当我们在静态方法中，需要用到类时，就可以用 `@classmethod` 来修饰

## Hashable

一个自定义的类型，如何才能 hashable？

1. 首先要实现 `__hash__()` 的魔法方法
2. 如果实现了 `__eq__()` 方法，那么需要私有化成员变量

### 私有化成员变量 / hash

通过加双下划线，实现成员变量的私有化；通过 @property 装饰器，用来装饰只读方法。

Demo:

```Python
class Vector2d:
    typecode = 'd'

    def __init__(self, x, y):
        self.__x = float(x)
        self.__y = float(y)

    @property
    def x(self):
        return self.__x

    @property
    def y(self):
        return self.__y

    def __iter__(self):
        return (i for i in (self.x, self.y))  # 虽然私有化，但是内部仍然可以直接通过 self.x, self.y 调用

    def __hash__(self):
        return hash(self.x) ^ hash(self.y)
```

从上面这个例子可以看出，装饰器可以用来隐藏一些实现的细节，简化 function，使得语法更加简练，装饰器也可以用来表明一个 function 的作用。

## private attributes in Python

截止到本章本知识点，本书没有提及私有方法的实现，只在本章提到了私有属性。

```Python
vector = Vector2d(3, 4)
print(vector.__dict__)
vector._Vector2d__x = 6
print(vector.__dict__)
vector.y = 8
"""
{'_Vector2d__x': 3.0, '_Vector2d__y': 4.0}
{'_Vector2d__x': 6, '_Vector2d__y': 4.0}
Traceback (most recent call last):
  File "D:/Github-Code/test/hashable.py", line 29, in <module>
    vector.y = 8
AttributeError: can't set attribute
"""
```

从上面的例子我们可以看出，虽然我们已经设置了 Python 对象成员变量的私有，但是我们还是可以在该类对象的 `__dict__` 中看到该对象的私有变量，并且对其进行修改。

实际上，Python 不能实现真正的变量私有化，Python 的私有变量并不是 Java 的 private。我们从上面的例子可以看到，在进行 Python 所谓的私有化之后，Python 对私有变量加入了 `_classname` 的前缀，从而使得外部的写操作因为找不到真正的变量而失效，但是我们仍然可以通过加入前缀进行写的操作，这个无法避免，也是 Python 私有化和 Java 私有化的一个很大的区别。

## protected attribute in Python 

在 Python 的编码传统里，习惯将单下划线 `_` 作为 protect 标记，表示我们不能在类外获取该属性，即该属性是类私有的，只能在类或者字类中使用。但是单下划线对于 Python 解释器来说，没有任何意义，只是一个约定俗成的规定。

另外，单下划线前缀在 module 的最上层变量确实有一个作用，如果我们通过 `from my_module import *`，那么以单下划线 `_` 为前缀的变量并不会被导入。

## saving space with `__slots__` class attribute

Python 默认将类的成员变量存储在 `__dict__` 中，其实际上是将属性存储了字典中，那么如果属性太多，那么就会占用太多的空间，`__slots__` 可以对其进行优化，不再详述。