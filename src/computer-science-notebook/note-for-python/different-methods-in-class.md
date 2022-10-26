# Different methods in class

[TOC]

* [[The definitive guide on how to use static, class or abstract methods in Python]](https://julien.danjou.info/guide-python-static-class-abstract-methods/)
* [[Instance methods]](https://docs.python.org/3/reference/datamodel.html)

## How methods work in Python

A method is a function that is stored as a class attribute. 

**method 也是对象，也是类的属性：**


```python
class Pizza(object):
    def __init__(self, size):
        self.size = size
    def get_size(self):
        return self.size
```


```python
Pizza.get_size
```


    <function __main__.Pizza.get_size(self)>

在 python2.x 中，上面的输出结果是 `<unbound method Pizza.get_size>`, 也就是说这个方法并没有被绑定到一个 object 对象上。所以其不能单独执行。其应该绑定一个 Pizza 的对象（传入 Pizza 对象参数），然后执行。



**self 的显式传递：**


```python
Pizza.get_size(Pizza(24)) # Pizza(24) 就是 self，显示传递
```


    24

上面的写法有很多缺点，不够直观，而且很多时候我们并不知到一个类的全名。

Python 进行了优化：**其将类中的所有方法都绑定到了该类的实例上**:


```python
Pizza(42).get_size
```


    <bound method Pizza.get_size of <__main__.Pizza object at 0x06EBD958>>

从上面的结果可以看出，对象和对象方法是绑定的，`Pizza.get_size` 被绑定到了新建的对象上。

**self 的隐式传递：**


```python
Pizza(42).get_size() # 等价于 Pizza.get_size(Pizza(24))
```


    42

我们不需要再传入任何参数给 `get_size()` 方法，因为它的 `self` 参数已经自动被设置成了 Pizza 的实例(Pizza 实例已经被隐式的传递给 `get_size` 方法)


```python
m = Pizza(24).get_size
m()
```


    24

从上可看出，`get_size` 这个方法已经绑定到了 Pizza 实例上，绑定后我们获取方法名就足够了

Indeed, you don't even have to keep a reference to your Pizza object. Its method is bound to the object, so the method is sufficient to itself.

如果我们想要知道这个方法绑定到哪个实例上了，也就是说我们想要**通过方法获取绑定的实例**，我们可以通过以下的操作：


```python
m = Pizza(24).get_size
m.__self__ # 获取 method 绑定的实例
```


    <__main__.Pizza at 0x6ece970>


```python
m.__self__.get_size() # 获取实例后调用该实例绑定的方法
```


    24

## Static methods

You'll write code that belongs to a class, but that doesn't use the object itself at all. 这样我们就不需要先实例化一个对象，再去调用该方法。


```python
class Pizza(object):
    @staticmethod # 用装饰器 staticmethod 修饰
    def mix_ingredients(x, y):
        return x + y

    def cook(self):
        return self.mix_ingredients(self.cheese, self.vegetables)
```


```python
Pizza().cook is Pizza().cook
```


    False

实例化两个不同的对象，其绑定的 instancemethod 对象(instancemethod 也是对象，first-class function)也不同。


```python
Pizza().mix_ingredients is Pizza.mix_ingredients
```


    True


```python
Pizza().mix_ingredients is Pizza().mix_ingredients
```


    True

staticmethod 并不依赖于对象而存在，在 Java 中，其随着类的加载而加载，其在类的整个声明周期中只有一个实例。
但是 instancemethod 不同，其绑定在每一个不同的 object 上，所以每一个 instancemethod object 都不相同

## Class methods

Class methods are methods that are not bound to an object, but to… a class!


```python
class Pizza(object):
    radius = 42
    @classmethod
    def get_radius(cls):
        return cls.radius
```


```python
Pizza.get_radius
```


    <bound method Pizza.get_radius of <class '__main__.Pizza'>>


```python
Pizza().get_radius
```


    <bound method Pizza.get_radius of <class '__main__.Pizza'>>


```python
Pizza.get_radius == Pizza().get_radius
```


    True

从上面可以看出，classmethod 是和 class 绑定在一块的，其和 staticmethod 类似，在 class 的生命周期内只有一个实例。唯一不同的是，classmethod 要显式的传入一个 class 对象。

**classmethod 的使用场景**


一个原则：在 method 内如果碰到使用 cls 而又想避免硬编码类名，则使用 classmethod。
例如：工厂设计模式
在 classmethod 内调用传入的对象进行 class 类的实例化，直接使用 cls() 而不需要对类名进行硬编码 Pizza()：


```python
class Pizza(object):
    def __init__(self, ingredients):
        self.ingredients = ingredients

    @classmethod
    def from_fridge(cls, fridge):
        return cls(fridge.get_cheese() + fridge.get_vegetables())
```

## Abstract methods

Python 中的 Abstract methods 就是 Java 中的接口。

Python 中最简单的 Abstract method 实现：


```python
class Pizza(object):
    def get_radius(self):
        raise NotImplementedError
```

任何从继承自 Pizza 的类，都要重写或者实现 `get_radius` 方法，否则就会抛出异常。但是问题是，如果我们在继承类中忘记实现该方法，那么当我们调用该方法的时候，就会抛出异常。

我们可以使用 `abc` module 使得异常抛出得更早一些，在类创建的时候，就报错，而不是等待使用该方法时才报错。


```python
import abc

class BasePizza(object):
    __metaclass__  = abc.ABCMeta

    @abc.abstractmethod
    def get_radius(self):
         """Method that should do something."""
```

有了 `abstractmethod` 的装饰器，一旦我们想要对 baseclass 或者继承自 baseclass 但是没有实现 abstractmethod 的类进行实例化时，就会报错

## Mixing static, class and abstract methods

抽象方法可以被包含不同参数的方法所实现：


```python
import abc

class BasePizza(object):
    __metaclass__  = abc.ABCMeta

    @abc.abstractmethod
    def get_ingredients(self): # 不要把参数定死了
         """Returns the ingredient list."""

class Calzone(BasePizza):
    def get_ingredients(self, with_egg=False):
        egg = Egg() if with_egg else None
        return self.ingredients + egg
```

可以用静态方法实现抽象方法：


```python
import abc

class BasePizza(object):
    __metaclass__  = abc.ABCMeta

    @abc.abstractmethod
    def get_ingredients(self):
         """Returns the ingredient list."""

class DietPizza(BasePizza):
    @staticmethod
    def get_ingredients():
        return None
```

`classmethod` 和 `staticmethod` 都可以装饰抽象方法。In Python, contrary to methods in Java interfaces, you can have code in your abstract methods and call it via super():


```python
import abc

class BasePizza(object):
    __metaclass__  = abc.ABCMeta

    default_ingredients = ['cheese']

    @classmethod
    @abc.abstractmethod
    def get_ingredients(cls):
         """Returns the ingredient list."""
         return cls.default_ingredients

class DietPizza(BasePizza):
    def get_ingredients(self):
        return ['egg'] + super(DietPizza, self).get_ingredients()
```

## Instance methods

[[Instance methods]](https://docs.python.org/3/reference/datamodel.html) 实例方法

**class 中定义的实例方法，也是一个对象，其属性中包含了方法所在类，方法绑定的实例：**


```python
pizza = Pizza(24)
dir(pizza.get_size)
```


    ['__call__',
     '__class__',
     '__delattr__',
     '__dir__',
     '__doc__',
     '__eq__',
     '__format__',
     '__func__',
     '__ge__',
     '__get__',
     '__getattribute__',
     '__gt__',
     '__hash__',
     '__init__',
     '__init_subclass__',
     '__le__',
     '__lt__',
     '__ne__',
     '__new__',
     '__reduce__',
     '__reduce_ex__',
     '__repr__',
     '__self__',
     '__setattr__',
     '__sizeof__',
     '__str__',
     '__subclasshook__']

**获取实例方法绑定的class实例：**


```python
instance_method = pizza.get_size
instance_method.__self__
```


    <__main__.Pizza at 0x7114f70>


```python
instance_method.__self__.get_size()
```


    24

**获取实例方法的名称：**


```python
instance_method.__name__
```


    'get_size'

**获取实例方法的 doc:**


```python
instance_method.__doc__
```

**获取实例方法所在的 module：**


```python
instance_method.__module__
```


    '__main__'

**获取实例方法对象本身：**


```python
instance_method.__func__
```


    <function __main__.Pizza.get_size(self)>


```python
instance_method.__func__(Pizza(25))
```


    25

