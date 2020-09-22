# Python 工匠

[TOC]

ref: [[one-python-craftsman]](https://github.com/piglei/one-python-craftsman)

## myThink

* 这份小册子，传达的很多小技巧和思想，不仅仅适用于 Python

## 1. 使用好变量

### 用 dict 传参的缺点

* 无法用 `x, *y = foo()` 的方式来一次解包多个变量
* dict 老生常谈的问题，占用内存比较大，中庸的方法：namedtuple

### 定义临时变量提升可读性

有时，我们的代码里会出现一些复杂的表达式，像下面这样：

```python
# 为所有性别为女性，或者级别大于 3 的活跃用户发放 10000 个金币
if user.is_active and (user.sex == 'female' or user.level > 3):
    user.add_coins(10000)
    return
```

看见 `if` 后面那一长串了吗？有点难读对不对？但是如果我们把它赋值成一个临时变量，
就能给读者一个心理缓冲，提高可读性：

```
# 为所有性别为女性，或者级别大于 3 的活跃用户发放 10000 个金币
user_is_eligible = user.is_active and (user.sex == 'female' or user.level > 3):

if user_is_eligible:
    user.add_coins(10000)
    return
```

定义临时变量可以提高可读性。但有时，把不必要的东西赋值成临时变量反而会让代码显得啰嗦：

```python
def get_best_trip_by_user_id(user_id):

    # 心理活动：『嗯，这个值未来说不定会修改/二次使用』，让我们先把它定义成变量吧！
    user = get_user(user_id)
    trip = get_best_trip(user_id)
    result = {
        'user': user,
        'trip': trip
    }
    return result
```

其实，你所想的『未来』永远不会来，这段代码里的三个临时变量完全可以去掉，变成这样：

```python
def get_best_trip_by_user_id(user_id):
    return {
        'user': get_user(user_id),
        'trip': get_best_trip(user_id)
    }
```

没必要为了那些可能出现的变动，牺牲代码当前的可读性。如果以后有定义变量的需求，那就以后再加吧。

### 尽量不要使用 globals() 和 locals()

**global**


```python
a = 10
def foo():
    b = 10
    a = 5
    return a + b

foo()
```


    15


```python
a = 10
def foo():
    b = 10
    print(a)
    a = 5
    return a + b

foo()
```


    ---------------------------------------------------------------------------
    
    UnboundLocalError                         Traceback (most recent call last)
    
    <ipython-input-6-f16f46128f1b> in <module>
          6     return a + b
          7 
    ----> 8 foo()


    <ipython-input-6-f16f46128f1b> in foo()
          2 def foo():
          3     b = 10
    ----> 4     print(a)
          5     a = 5
          6     return a + b


    UnboundLocalError: local variable 'a' referenced before assignment


从上面两个例子可以看出，定义在 foo 内的 a 变量作用域只局限于 foo，是一个局部变量，foo 中的变量 a 并不是全局变量 a。所以才会没有初始化局部变量然后报异常的情况。

想要在 foo 中访问全局变量，就要用到 **global** 声明：


```python
a = 10
def foo():
    b = 10
    global a
    print(id(a))

print(id(a))
foo()
```

    1470015552
    1470015552

**locals()**

`locals()` 返回局部环境中的所有环境变量，存放在 dict 中返回。可以用于传参：


```python
def render_trip_page(request, user_id, trip_id):
    user = User.objects.get(id=user_id)
    trip = get_object_or_404(Trip, pk=trip_id)
    is_suggested = is_suggested(user, trip)
    # 利用 locals() 节约了三行代码，我是个天才！
    return render(request, 'trip.html', locals())
```

等价于：

```    
return render(request, 'trip.html', {
    'user': user,
    'trip': trip,
    'is_suggested': is_suggested
})
```

`locals()` 在实际开发中不推荐使用，因为代码可读性差，如果函数比较长，那么后面代码维护的时候，就很难快速弄清楚到底传入了什么参数。

**The Zen of Python**: **Explicit is better than implicit.（显式优于隐式）**

## 2. 条件分支

