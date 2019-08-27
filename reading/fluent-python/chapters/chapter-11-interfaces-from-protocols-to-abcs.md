# Interfaces: From Protocols to ABCs

> An abstract class represents an interface. —— Bjarne Stroustrup Creator of C++

[TOC]

## Protocols

Python 有两种协议（协议），一种是**隐式**的：魔法方法协议，一种是**显式**的：ABCs。

## 隐式：魔法方法协议

只要某一个类型走起路来像一直鸭子，叫声也像一只鸭子，那么这个类型就是鸭子的字类，即使这个类型并没有显式的继承自鸭子类。例如：

```python
class Struggle:
    def __len__(self): return 23
    
isinstance(Struggle(), abc.Sized)
True
```

只要实现了 `__len__` 的魔法方法，那么其就是 `abc.sized` 的子类，即使该类并没有显式的进行继承。这也从侧面反映出，`isinstance` 和 `issubclass` 这两个个方法在 Python 中是一个比较**鸡肋**的存在。

实际上，Python 很多的协议都是根据魔法方法来体现的。我实现了某个魔法方法，就相当于继承了某个类，拥有了该类的特性。

### Monkey-Patching 猴子补丁

Monkey-Patching 用于在**运行时**修改类或者模块，其并不会改变源码。

Demo:

对于一个自定义的 Sequence，只有实现了 `__setitem__()` 方法，才能实现 shuffle，有时候我们在源码中可能会忘记加这一方法，在交互式 Console 中执行时，我们意识到了需要实现该方法时，我们可以不需要改动源码，通过动态加入该方法的方式，完成补丁。

 ```Python
>>> from random import shuffle
>>> from frenchdeck import FrenchDeck
>>> deck = FrenchDeck()
>>> shuffle(deck)
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
File ".../python3.3/random.py", line 265, in shuffle
x[i], x[j] = x[j], x[i]
TypeError: 'FrenchDeck' object does not support item assignment

>>> def set_card(deck, position, card): # 动态的创建出一个 function
... 	deck._cards[position] = card
...
>>> FrenchDeck.__setitem__ = set_card # 将补丁赋值给该类
>>> shuffle(deck)
>>> deck[:5]
 ```



## 显式：ABCs

 当 ABCs(Abstract Base Classes) 被引入 Python 的时候，Python 已经 15 岁了。

### Python 内置的 ABCs 及使用

Python 内置的 ABCs 主要分布在两个 module 中：

* collections.abc
  * collections.abc.Sequence
  * collections.abc.Size
  * ……
* numbers
  * Complex
  * Real
  * Integral
  * ……

####collections.abc

```python
from collections.abc import Sequence
```

#### numbers

```Python
import numbers
isinstance(3, numbers.Real) # True
isinstance(3.3, numbers.Real) # True
isinstance(True, numbers.Real) # True
isinstance(3, numbers.Integral) # True
```



### 如何定义自己的 ABCs 并使用

继承 abc.ABC，然后抽象函数用装饰器：`@abstractmethod` 来装饰

策略设计模式的例子：

```Python

from abc import ABC, abstractmethod

class Promotion(ABC): # The Strategy: an abstract base class，抽象基类
    """促销基类，定下契约"""
    @abstractmethod
    def discount(self, order):
        """折扣"""
        pass


class FidelityPromotion(Promotion): # concrete strategy
    """5% discount for customers with 1000 or more fidelity points"""

    def discount(self, order):
        return 0 if order.customer.fidelity < 1000 else order.total() * .05


class BulkItemPromotion(Promotion): # concrete strategy
    """10% discount for each LineItem with 20 or more units"""

    def discount(self, order):
        discount = 0
        for item in order.cart:
            if item.quantity >= 20:
                discount += item.total() * .1 # Python 的小数可以不写 0
        return discount
```

注意：abc.ABC 是 Python3.4 以后才引入的，Python3.4 之前要创建 ABCs，应该使用 metaclass

