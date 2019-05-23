# Python-30-Seconds

[TOC]

## Introduction

Note for python knowledges that you may not know, or you may not really know.

Inspired by [30-seconds-of-code](<https://github.com/30-seconds/30-seconds-of-code>)

## You May not Know

### built-in methods

#### ord()

get the unicode code point of given char. [DOC](https://docs.python.org/3/library/functions.html?highlight=ord#ord)

```python
print(ord("a")) # 97
print(ord('€')) # 8364
```

#### divmod()

除法，返回倍数和余数。

```python
divmod(20, 8) # return (2, 4)
divmod(21.2, 8) # return (2.0, 5.199999999999999)
```

#### enumerate()

enumerate() 用于给 sequence 生成 index

```python
# enumerate 方法会对 sequence 进行封装，并返回一个可迭代的对象，其中的每一个 item 都是 tuple (index, sequence[index])
for index, value in enumerate(["a", "b", "c"]):
    print(index, value)
    
"""
0 a
1 b
2 c
"""
```

#### functools.reduce(), all(), any()

The common idea of **reduce**  is to apply some operation to successive items in a sequence, accumulating previous result, thus reducing a sequence of values to a single value.

reduce 用于对一个 sequence 进行 successive compute，从而得到一个 single value。

![reduce](assets/1558443265331.png)

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



### built-in operators

#### 指数^: **

```python
print(10 ** 2) # 10^2 = 100
print(2 ** 10) # 2^10 = 1024
```

### built-in modules

#### array.array

array.array is a mutable, flat sequence sequence in python. 其适合用来存储数值。

```python
from array import array
from random import random

# 用生成表达式生成一个双精度的 float 类型 array, 其中包含有 1000 万个元素
# array 接受两个参数，第一个参数是存储的数据类型，第二个参数是存储的数据
# array 目前接受的存储类型为：
# I: integer 整形
# u: unicode 类型
# d: double 类型
floats = array("d", (random() for i in range(10**7))) 
print("the last number: " + str(floats[-1]))
fw = open("array.bin", "wb")
floats.tofile(fw) # 讲数据写入二进制文件中
fw.close()

# 构建一个空的 array，然后从二进制文件中读取数据
floats2 = array("d") 
fr = open("array.bin", "rb")
floats2.fromfile(fr, 10**7) # 读取的时候，指定读取多少个数据
fr.close()
print("the last number: " + str(floats2[-1]))

print(id(floats))
print(id(floats2))
print(floats == floats2)

"""
the last number: 0.40830065649386416
the last number: 0.40830065649386416
1547450711472
1547450138096
True
"""
```

#### collections.deque

Python 内置的双端队列

```python
from collections import deque
dq = deque(range(10), maxlen=10) # 初始化一个 双端队列，可以不给出 maxlen
print(dq) # deque([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], maxlen=10)

# rotate(n) 当 n > 0 时，其功能为从 deque 的右边取出 n 个数，移动到左边，当 n<0时，其功能为从左边取出 -n 个数，移动到右边
dq.rotate(3) 
print(dq) # deque([7, 8, 9, 0, 1, 2, 3, 4, 5, 6], maxlen=10)
dq.rotate(-4)
print(dq) # deque([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], maxlen=10)

# 从左端插入，append() 是默认右端插入
dq.appendleft(-1) 
print(dq) # deque([-1, 1, 2, 3, 4, 5, 6, 7, 8, 9], maxlen=10)
# 默认从右端扩展
dq.extend([11,12,13,14])
print(dq) # deque([4, 5, 6, 7, 8, 9, 11, 12, 13, 14], maxlen=10)

# 从左端扩展，要注意的是，extendleft 是 iterate 的操作，所以插入后是逆序的
dq.extendleft([10,20,30,40])
print(dq) # deque([40, 30, 20, 10, 4, 5, 6, 7, 8, 9], maxlen=10)

# 双端弹出数据的操作，
print(dq.pop()) # 右端弹出数据
print(dq.popleft()) # 左端弹出数据

"""
deque([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], maxlen=10)
deque([7, 8, 9, 0, 1, 2, 3, 4, 5, 6], maxlen=10)
deque([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], maxlen=10)
deque([-1, 1, 2, 3, 4, 5, 6, 7, 8, 9], maxlen=10)
deque([4, 5, 6, 7, 8, 9, 11, 12, 13, 14], maxlen=10)
deque([40, 30, 20, 10, 4, 5, 6, 7, 8, 9], maxlen=10)
9
40
"""
```

#### operator

operator 通常用于 reduce, 详见 [functools.reduce()](#functools.reduce())

#### json

json module 用于处理 json 字符串和 json 文件。下面解释一下 json 包几个常见的方法：load()/dump()/loads()/dumps()

dumps(): 将 dict 转成 json 字符串, dumps2string

```python
import json
data = {
    'name' : 'ACME',
    'shares' : 100,
    'price' : 542.23
}

json_str = json.dumps(data)
# '{"price": 542.23, "name": "ACME", "shares": 100}'
```

loads(): 将 json 字符串转成 dict, loads2dict

```
# 将 json 编码的字符串转换成一个 python 的数据结构，往往是 dict
```

dump(), load():  用于 读取 和 写入 json 文件。

```python
# 如果你要处理的是文件而不是字符串，你可以使用 json.dump() 和 json.load() 来编码和解码JSON数据。
# Writing JSON data
with open('data.json', 'w') as f:
    json.dump(data, f)

# Reading data back
with open('data.json', 'r') as f:
    data = json.load(f)
```

## You May not Really Konw

### built-in methods

#### strip()

strip() 方法并不是整个字符串进行前缀后缀的匹配，其更像是正则匹配的 [abcd] 规则。[DOC](<https://docs.python.org/3/library/stdtypes.html?highlight=strip#str.strip>)

```python
print('www.example.com'.strip('cmowz.'))
print('#....... Section 3.2.1 Issue #32 .......'.strip('.#! '))

"""
example
Section 3.2.1 Issue #32
"""
```

### built-in modules

### built-in operators

