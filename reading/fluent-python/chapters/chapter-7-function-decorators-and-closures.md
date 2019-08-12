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

### The nonlocal Declaration

由函数作用域，我们得知，变量一旦在函数中被赋值，就会被标记成局部变量，如此就会丧失闭包的特性，失去对free variable 的绑定。在 function 中，我们通过 **global** 关键字来绑定全局变量，在闭包中，我们使用 **nonlocal** 关键字对在闭包函数中进行赋值的 function 进行绑定。

Demo:

```Python
def make_average():
    sum = 0
    count = 0
    def avg(num):
        nonlocal sum, count
        sum += num
        count += 1
        return sum / count
    return avg
```

## A Simple Decorator

一个典型的装饰器逻辑是这样的：

> it replaces the decorated function with a new function that accepts the same arguments and (usually) returns whatever the decorated function was supposed to return, while also doing some extra processing. 

用新的函数覆盖旧函数后，旧函数的引用就会指向新的函数，导致旧函数的属性被隐藏，例如函数名 `__name__` 和注释 `__doc__` 都会变成新的函数。Python 提供了 `functools.wraps` 装饰器来将被装饰的 function 的属性 copy 到新的 function 上。

下面我们实现一个标准的装饰器，装饰器的目的是打印函数的执行时间：

```Python
import time
from functools import wraps


def clock(func):
    @wraps(func) # 解决被装饰函数属性被屏蔽的问题
    def clocked(*args): # 用 *args 来覆盖位置参数
        start = time.perf_counter()
        result = func(*args)
        elapsed = time.perf_counter() - start
        arg_str = ", ".join([repr(arg) for arg in args]) # 打印参数
        print("[%0.8fs] %s(%s) ——> %r" % (elapsed, func.__name__, arg_str, result))
        return result # 原函数返回什么，这里照常返回什么
    return clocked

@clock
def fibonacci(num):
    if num < 2:
        return num
    return fibonacci(num - 1) + fibonacci(num - 2)

# @clock 等价于 clock(fibonacci)

fibonacci(10) # 比较耗时的计算，违反了递归的重复计算准则

"""
……
……
[0.00004190s] fibonacci(4) ——> 3
[0.00013850s] fibonacci(6) ——> 8
[0.00039610s] fibonacci(8) ——> 21
[0.00363930s] fibonacci(10) ——> 55
"""

print(fibonacci.__name__) # test，因为装饰器 wraps 将被装饰函数的属性 copy 到了新的函数上，所以 test 函数的引用仍然指向 clocked，但是 clocked 的属性变成了 test 的属性，所以我们从表面上来看，还是指向了 test
```

## built-in Decorators

介绍几个 Python 标准库自带的装饰器函数

### functools.wraps

已经在上一节介绍，用于 copy 被装饰 function 的属性到新的 function 中。

### functools.lru_cache

存储 function 的计算结果，减少重复计算，可用于 Fibonacci 的优化。

lru_cache 是一个装饰器工厂，其可以接收参数，然后返回定制后的装饰器。lru_cache 可以传入两个参数：

* maxsize: 表示 cache 的 size，能存储的结果数
* typed: if true, 那么 cache 会区分不同的输入类型，例如区分 1 和 1.0，默认为 false

```Python
from functools import lru_cache

@lru_cache()
@clock
def fibonacci(num):
    if num < 2:
        return num
    return fibonacci(num - 1) + fibonacci(num - 2)

fibonacci(10)

"""
[0.00000030s] fibonacci(1) ——> 1
[0.00000020s] fibonacci(0) ——> 0
[0.00003770s] fibonacci(2) ——> 1
[0.00004400s] fibonacci(3) ——> 2
[0.00005280s] fibonacci(4) ——> 3
[0.00005840s] fibonacci(5) ——> 5
[0.00006450s] fibonacci(6) ——> 8
[0.00007010s] fibonacci(7) ——> 13
[0.00007620s] fibonacci(8) ——> 21
[0.00008190s] fibonacci(9) ——> 34
[0.00008800s] fibonacci(10) ——> 55
"""
```

### functools.singledispatch

Python 用 singledispatch 实现重载:

```Python
from functools import singledispatch
from collections import abc
import numbers
import html

@singledispatch
def htmlize(obj):
	content = html.escape(repr(obj))
	return '<pre>{}</pre>'.format(content)

@htmlize.register(str)
def _(text): # 函数名无关紧要，用 _ 表示即可
    content = html.escape(text).replace('\n', '<br>\n')
    return '<p>{0}</p>'.format(content)

@htmlize.register(numbers.Integral)
def _(n):
	return '<pre>{0} (0x{0:x})</pre>'.format(n)

@htmlize.register(tuple)
@htmlize.register(abc.MutableSequence)
def _(seq):
    inner = '</li>\n<li>'.join(htmlize(item) for item in seq)
    return '<ul>\n<li>' + inner + '</li>\n</ul>'
```

**Python 用 singledispatch 重载和 Java 重载， if/else 的区别**：

Java 的重载或者 if/else 是由缺陷的，其将更多的注意力放在了一个代码单元中，class 或者是 function，singledispatch 的优点是，其可以支持模块化的扩展，每一个 module 都可以注册一个专门的 function，其屏蔽了实现细节（不管用类还是用if/else），将更多的注意力放在了重载本身。实际上，Python 对于很多语言特性的实现，都进行了更高层次的逻辑抽取，更关注于特性本身特点的实现。

## Stacked Decorators

```Python
@d1
@d2
def func():
    print("test")
    
# 等价于 d1(d2(func))
```

## Decorator Factory

装饰器工厂，是传入装饰器参数，输入定制的装饰器，Demo:

```Python
import time
DEFAULT_FMT = '[{elapsed:0.8f}s] {name}({args}) -> {result}'
def clock(fmt=DEFAULT_FMT):
	def decorate(func):
		def clocked(*_args):
            t0 = time.time()
            _result = func(*_args)
            elapsed = time.time() - t0
            name = func.__name__
            args = ', '.join(repr(arg) for arg in _args)
            result = repr(_result)
            print(fmt.format(**locals()))
			return _result
		return clocked
	return decorate


if __name__ == '__main__':
    @clock() # 先返回一个装饰器：decorate,然后再传入 snooze: decorate(snooze)
    def snooze(seconds):
        time.sleep(seconds)
        for i in range(3):
        snooze(.123)
```





