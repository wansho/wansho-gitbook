# Chapter7. Function Decorators and Closures

[TOC]

##Introduction

装饰器是装饰设计模式的 Python 实现。

装饰器本质上是一个 High-Order Function，其输入是被装饰的 function（**First-Class Object 思想**），输出也是一个 function。装饰器根据返回的 function 可以分成如下两类装饰器：

1. 返回的 function 为输入的 function：装饰器不影响原 function，只是对原 function 进行一些计算，例如 PySnooper 就是这种类型的装饰器，其只是将 function 内的计算结果打印出来，并不会影响原 function
2. 返回的 function 是新的 function：装饰器内创建一个新的 function （**闭包**）

> A decorator is a callable that takes another function as argument (the decorated function). The decorator may perform some processing with decorated function, and returns it or replaces it with another function or callable object. —— Fluent-Python

## Demo and Characteristic

**decorator_demo.py**

```Python
# -*- coding: utf-8 -*-


def decorator_without_inner(func):
    print("print without inner")
    return func


def decorator_with_inner(func):
    def inner():
        print("print inner")
    return inner


@decorator_without_inner
def target1():
    print("target1")


@decorator_with_inner
def target2():
    print("target2")


if __name__ == "__main__":
    print(target1)
    target1()
    print(target2)
    target2()

   
"""
<function target1 at 0x000001E01B8F9A60>
target1
<function decorator_with_inner.<locals>.inner at 0x000001E01B8F9F28>
print inner
"""
```

### 返回的 function 为输入的 function

function 没有改变，那么先执行装饰器，再执行原 function。注意：如果返回的 function 还是输入的 function，那么被装饰的 function 的引用仍然指向原 function。

#### 策略设计模式的优化

Chapter6 中策略设计模式(function-oriented) 的缺点：

1. 所有策略必须用统一的后缀，进而获取所有的策略

用装饰器优化后的策略设计模式的优点：

1. 策略 function 不需要使用统一的后缀
2. 装饰器的名称可以清晰地表明该 function 的功能

```python
from collections import namedtuple
from operator import itemgetter

Customer = namedtuple("Customer", "name fidelity")


class LineItem:
    """商品"""
    def __init__(self, product, quantity, price):
        self.product = product
        self.quantity = quantity
        self.price = price

    def total(self):
        return self.price * self.quantity


class Order: # the Context
    """订单"""
    def __init__(self, customer, cart, promotion=None): # promotion 是可选参数，默认为 None
        self.customer = customer
        self.cart = cart
        self.promotion = promotion

    def total(self):
        """计算商品总额"""
        if not hasattr(self, "__total"): # 判断是否有该属性，防止重复计算
            self.__total = sum(item.total() for item in self.cart)
        return self.__total

    def due(self):
        """应付额"""
        if self.promotion is None:
            discount = 0
        else:
            discount = self.promotion(self)
        return self.total() - discount

    def __repr__(self):
        return "<Order tota:{:.2f} due:{:.2f}>".format(self.total(), self.due())


promotions = []

  
def promotion_strategy(promotion):
    promotions.append(promotion)
    return promotion


@promotion_strategy
def fidelity_promotion(order): # concrete strategy
    """5% discount for customers with 1000 or more fidelity points"""
    return 0 if order.customer.fidelity < 1000 else order.total() * .05


@promotion_strategy
def bulk_item_promotion(order): # concrate strategy
    """10% discount for each LineItem with 20 or more units"""
    discount = 0
    for item in order.cart:
        if item.quantity >= 20:
            discount += item.total() * .1
    return discount


@promotion_strategy
def large_order_promotion(order): # concrate strategy
    """7% discount for orders with 10 or more distinct items"""
    discount = 0
    distinct_items = {item.product for item in order.cart}
    if len(distinct_items) >= 10:
        discount = order.total() * .07
    return discount


def get_best_promotion(order):
    """获取最大的 promotion"""
    promotion2discount = [(promotion, promotion(order)) for promotion in promotions]
    sorted_promotion2discount = sorted(promotion2discount, key=itemgetter(1))
    return sorted_promotion2discount[-1][0]


if __name__ == "__main__":

    joe = Customer("John Doe", 0)
    ann = Customer("Ann Smith", 1100)
    cart = [
        LineItem("banana", 4, .5),
        LineItem("apple", 40, 1.5),
        LineItem("orange", 5, 5.0),
    ]

    order1 = Order(ann, cart)
    order1.promotion = get_best_promotion(order1)
    print(order1.total())
    print(order1.due())  # <Order tota:42.00 due:39.90>
    
```

### 返回的 function 为新的 function

新的 function 会**替换**掉旧的 function，然后只执行新的 function，实际上，此时的被装饰后的 function 的引用已经指向了 新的 function。

### 装饰器的两大特征

* 可以替换被装饰的 function

* 在 module 被 import 的时候，就被执行，这一特性可以用于模块加载时候的初始化（类似于 Java 的静态代码块，随着类的加载而加载）

  ```python
  import decorator_demo
  
  """
  print without inner
  """
  ```

  被装饰的 function，在 import 之后就会执行装饰器function（注意并不会执行被装饰function）。

### 装饰器的实际应用

* 一个实际应用中的装饰器，通常被定义在与被装饰 function 不同的 module 中
* 一个实际应用中的装饰器，通常会定义一个 inner function 用来替代原 function

## Python function变量作用域

### function local variable

Demo:

```Python
b = 6
def test():
    a = 9
    print(a)
    print(b)
    b = 8
    
test()

"""
Traceback (most recent call last):
9
  File "<input>", line 1, in <module>
  File "<input>", line 4, in test
UnboundLocalError: local variable 'b' referenced before assignment
"""

###########################################################################

a = 6

def test():
    a = 7
    print(a)

test()
print(a)

"""
7
6
"""

###########################################################################

a = 6

def test():
    print(a)
"""
6
"""
```

Python 解释器在编译上面的代码时，其看到变量 b 在 test 中进行了**赋值**，则判断 b 为 test function 中的 local variable，Python 会将在 function 进行赋值的变量判定为 局部变量。并且这个局部变量，和全局变量虽然名字相似，但却是两个完全不相关的变量，只有当 function 中没有定义局部变量 a 时，function 才会去全局变量中找匹配的变量。

如何解决上面的报错：在 function 中使用 **global** 来引用全局变量

```Python
b = 6


def test():
    global b
    a = 9
    print(a)
    print(b)
    b = 8


test()
print(b) # 8

"""
9
6
8
"""
```

### function local variable in Python and Javascript

Python 和 Javascript 都不要求对变量的类型进行声明，但是不同的是，Python 会把 function 中赋值或定义的变量自动判定为局部变量，而 JavaScript 的 function 中如果声明了一个变量，则默认为 global variable，需要加上 `var` 才能表示为 function 内的局部变量。

## Closures(闭包)

### 闭包的介绍

A closure is a [record](https://en.wikipedia.org/wiki/Record_(computer_science)) storing a [function](https://en.wikipedia.org/wiki/Function_(computer_science))[[a\]](https://en.wikipedia.org/wiki/Closure_(computer_programming)#cite_note-1) together with an environment.

闭包是一个绑定了 free variable 的 function，其可以看成是对 (function + environment/contex) 的封装/绑定。闭包实现了 function 对定义在 function 外的 nonglobal variable 的访问，其拓展了 function 的范围，将 function 外的 free variable 绑定。闭包返回的是封装后的 function。	

### 闭包 Demo

```python

def get_average():
    nums = [] # environment / binded to avg
    
    def avg(num): # function
        nums.append(num)
        return sum(nums) / len(nums)
    return avg

# avg + nums 就是一个闭包

avg = get_average()
print(avg(10)) # 10
print(avg(8)) # 9
print(avg(6)) # 8

# 被绑定到 avg 上的 free variable: nums 可以通过 __closure__ 查看
print(avg.__closure__) # (<cell at 0x0000029DB8F007F8: list object at 0x0000029DB8DA6248>,)
print(avg.__closure__[0].cell_contents) # [10, 8, 6]
```

### 闭包的作用

* **装饰器返回新的 function**

  闭包经常用在装饰器中，用来返回一个新的 function。

* **异步编程**

* **函数式编程**

### 实现闭包



