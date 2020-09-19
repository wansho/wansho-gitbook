# A Pythonic Object

[TOC]

第九章衔接第一章，介绍如何实现一个 Python 风格的对象。本章会重点介绍 Python 的魔法方法。

## How to Implement a Pythonic Object

Python 并不是通过继承来实现某一个对象的特征，而是通过实现具体的魔法方法，来使一个对象具有某些特征。这就是 Python 的鸭子类型，实现了鸭子走和叫两个魔法方法，那么我们就拥有了鸭子的特征；实现了 `__len__()` 和 `__getitem__()` 这两个魔法方法，那么我们就拥有了 list 的特征，就可以调用 list 相关的标准库。

简单来说，**我们想要我们自定义的类拥有什么样的特征，那么直接去实现去对应的魔法方法即可**。

## Object Representation 表示对象

print(object) 会打印出啥？

### `__repr__()`

`print()` 方法会被 Python 解释器解释成 `__repr__()`，`__repr__()` 是**面向开发者**的

### `__str__()`

`str()` 方法会被 Python 解释器解释成 `__str__()`，`__str__()` 是**面向用户**的，如果 `__str__()` 没有被实现，那么就会调用 `__repr__()` 方法

### `__bytes__()`

bytes() 会调用该魔法方法，返回 byte sequence

### `__format__()`

built-in function: `format()`

str method: `str.format()`

## 创建一个 vector2d 类

### 实现 Iterable

```python
def __iter__(self):
    """make a Vector2d iterable, make unpacking work
        vector = Vector2d(3, 4)
        x, y = vector
        iterable 是 tuple(this) 和 *self 的基础
        返回一个 生成器表达式
        """
    return (i for i in (self.x, self.y))
```

### 实现 Representation

实现 `__repr__()` 方法的准则：

Note that in our `__repr__` implementation we used `!r` to obtain the standard repre‐sentation of the attributes to be displayed. This is good practice, as it shows the crucialdifference between Vector(1, 2) and Vector('1', '2') — the latter would not work in the context of this example, because the constructors arguments must be numbers, not str. 

The string returned by `__repr__` should be unambiguous and, if possible, match the source code necessary to recreate the object being represented. That is why our chosen representation looks like calling the constructor of the class, e.g. Vector(3, 4).  

```python
def __repr__(self):
    """实现 print(vector) 的自定义"""
    class_name = type(self).__name__
    # __repr__ builds a string by interpolating the components with {!r} to get their
    # repr; because Vector2d is iterable, *self feeds the x and y components to
    # format
    return "{}({!r}, {!r})".format(class_name, *self)
```

判断 `__repr__()` 方法实现的效果：

```python
v1 = Vector2d(3, 4)
v1_clone = eval(repr(v1))
v1 == v1_clone
```

### 实现 print

```python
def __str__(self):
    """因为 Vector2d 是 iterable 的，所以其可以作为参数传入 tuple"""
    return str(tuple(self))
```

### 实现比较功能

```python
def __eq__(self, other):
    """实现两个 vector 的可比性"""
    return tuple(self) == tuple(other)
```



## 特征 ——> 魔法方法

| 语法                      | 魔法方法                                        |
| ------------------------- | ----------------------------------------------- |
| ==                        | `__eq__()`                                      |
| repr()                    | `__repr__()`                                    |
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
def frombytes(cls, octets): # 刚方法属于该类，而不是属于对象
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

通过加**双下划线**，实现成员变量的**私有化**；通过 @property 装饰器，用来装饰**只读方法**。

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

实际上，**Python 不能实现真正的变量私有化**，Python 的私有变量并不是 Java 的 private。我们从上面的例子可以看到，在进行 Python 所谓的私有化之后，**Python 对私有变量加入了 `_classname` 的前缀，从而使得外部的写操作因为找不到真正的变量而失效**，但是我们仍然可以通过加入前缀进行写的操作，这个无法避免，也是 Python 私有化和 Java 私有化的一个很大的区别。

## protected attribute in Python 

在 Python 的编码传统里，习惯将单下划线 `_` 作为 protect 标记，表示我们不能在类外获取该属性，即该属性是类私有的，只能在类或者子类中使用。但是单下划线对于 Python 解释器来说，没有任何意义，只是一个约定俗成的规定。

另外，单下划线前缀在 module 的最上层变量确实有一个作用，如果我们通过 `from my_module import *`，那么以单下划线 `_` 为前缀的变量并不会被导入。

## saving space with `__slots__` class attribute

Python 默认将类的成员变量存储在 `__dict__` 中，其实际上是将属性存储了字典中，那么如果属性太多，那么就会占用太多的空间，`__slots__` 可以对其进行优化，不再详述。