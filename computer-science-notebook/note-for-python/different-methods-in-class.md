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




```python

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

