# Python-Code-Optimization

[TOC]

## 为什么要看 Fluent-Python

深入的学习 Python，才能了解这门语言的精髓，才能优雅的使用 Python。

Python 是一门高效的语言，但其也是一把双刃剑，使用不当的话，会耗费大量的内存和计算资源。

通过学习书中提高的指针和各种优化措施，我们能避免在编程中创建不必要的副本，帮助我们节约程序运行所占的内存。

例如，当我们想要扩展一个字符串时，我们应该

```python
ss = "Hello"
print(id(ss)) # 1746944705792
ss += "world" 
print(id(ss)) # 1746944705792
```

这样可以在 ss 原来所占内存的基础上进行内存的扩充，如果是图方便：

```python
ss = "Hello"
print(id(ss)) # 1746944705792
ss = ss + "world" 
print(id(ss)) # 1746961939120
```

那么就会重新开辟一块空间。这是一个小得不能再小的细节，很多人并不会很在意，毕竟一个小小的字符串并不会占用很大的内存空间。但是，如果我们在工作中，遇到了很长的 ss 呢（假设1KB）？而且需要频繁对 ss 进行扩展呢(一万次)？如果按照我们平时的第二种写法，那么我们每一次扩展，都是对原字符串的一次深拷贝，那么第一次拷贝内存成本都会上升，即使每次添加的字符并不多，那么拷贝一万次后，内存里至少会产生 10MB 的垃圾。如果这个脚本每隔 10 分钟就要跑一次，那么每隔 10 分钟就会产生 10MB 的垃圾（这里不考虑垃圾回收机制）。长此以往，计算机的内存就会被吃空。

## 内存优化

### Python 内存优化工具 memory_profiler

[pypi](<https://pypi.org/project/memory-profiler/>)

**安装**

```
pip install memory_profiler
```

**使用**

[pypi](<https://pypi.org/project/memory-profiler/>) 上有详细介绍，这里记录一下最常用的方法: 在程序内导入该包，然后加 `@profile` 的 flag

```python
from memory_profiler import profile

@profile
def my_func():
    a = [1] * (10 ** 6)
    b = [2] * (2 * 10 ** 7)
    del b
    return a
```

执行完 `my_func` 后，就会将该函数的每一条语句的内存情况展示出来。

### 字符串 和 sequence 优化

字符串 和 sequence 的扩展，可以通过 `+` 或 `*` 实现，但是怎么用还是有讲究的。

**优化后**

```python
# 标准的字符串和 sequence 的扩展
ss = "hello"
ss += "world"
ss *= 5

list1 = [1, 2, 3]
list2 = [4, 5, 6]
list1.extend(list2)
# extend 等价于 +=
list1 += list2
list1 *= 5
```

**优化前**

```python
ss = "hello"
ss = ss + "world"
ss = ss * 5

list1 = [1, 2, 3]
list2 = [4, 5, 6]
list1 = list1 + list2
list1 = list1 * 2
```

注意：`+=`， `*=` 的优化，其只对于 mutable(可更改) 的 sequence 生效，对于 tuple 这样的 immutable sequence，`+=` 和 `+` 的效果是一样的。但是 `str` 是一个例外，由于 str 使用频率太高，所以 Python 专门针对 str 进行了优化。Fluent-Python的原文是：

> str instance are allocated in memory with room to spare, so that concatenation does not require copying the whole string every time.

**优化原理**

`+=`， `*=` 两个运算符在 Python 中被定义为 magic operator，其会被 Python 解释器解释成 `__iadd__()` 和 `__imul__()` （其中 i 是 in-place 的意思，也就是 `就地` 的意思）两个魔法方法，而普通的 `+` 和 `*` 两个运算符，则是被 Python 解释器解释成了 `__add__()` 和 `__mul__()`，所以本质上，两个被解释成了不同的魔法方法，然后执行。

### 用生成器(genexps)替换列表推导式(listcomp)

Demo: 生成一个 7000 万长度的 array。

```python
floats = array("d", (random() for i in range(10**7))) # 此处用生成器的好处在于，我们并不会直接生成一个 10**7 长度的数组，这样的话，相当于占用了 double 的内存，而改用生成器的话，在生成 array 的时候，就不需要占用多余的内存，因为元素是一个一个生成的。
```

### 用 tuple, namedtuple 替换 dict in JSON style

dict 的底层是 hashtable，其稀疏的存储会浪费大量的内存，如果我们只是暂存 record，对于查询效率没有特殊需求的话，就不能使用 dict，不仅是因为 hashtable 占用大量的内存，JSON Style 重复的 key 存储也会耗费很多不必要的空间，这种内存的消耗，在从数据库中读取数据存储成 dict in json style 时尤为明显。

事实上，当我们在使用 dict 的时候，就应该下意识地考虑内存问题，是不是应该用 tuple 来替代，而不是不假思索的使用 dict。在使用 mapping types 的时候，应该始终考虑内存的效率问题。Dict 是设计被用来高效查找的，其并不适合存储，在存储的时候，考虑用 tuple 来代替！

## 计算优化

### 频繁进行 containment check 的优化

如果我们需要频繁的检查某个元素是否在一个 list 中，我们可以用 set 来取代 list

**优化后**

```python
if to_check_str in set(["a", "b", "c"]):
```

**优化前**

```python
if to_check_str in ["a", "b", "c"]:
```

注意：set 并不是 sequence，实际上，这是利用空间来优化时间复杂度的一个算法。

### dict 查找为空的优化 setdefault() / defaultdict

Python 有三种通过 key 获取值的方式：

```python
# 第一种
my_dict["students"]
# 第二种
my_dict.get("students", [])
# 第三种
my_dict.setdefault("students", [])

# 第四种
import collections
my_dcit = collections.defaultdict(list) # 默认缺失值为 list，list 为 default_factory
my_dict["students"].append("wansho")
```

其中，第二种和第三种都有处理 missing key 的方式，第二种方式常见的代码逻辑为：

```python
student_list = my_dict.get("students", []) # 第一次搜索
student_list.append("wansho")
my_dict["students"] = student_list # 插入数据，实际上是第二次搜索
```

实际上，第二种方式进行了两次搜索，我们再来看一下第三种方式：

```python
my_dict.setdefault("students", []).append("wansho")
# setdefault 方法先按照 key 进行搜索 value，如果 key 不存在，则就地插入 (key, default_value)并返回 default_value 的引用，这样就避免了插入时的第二次搜索。
```

第四种方式的效率和第三种一样，不同的是其采用了 `collections.defalutdict` 来处理缺失值，下面拆解一下插入语句：

```python
my_dict["students"].append("wansho")
# 1. 执行一遍搜索，发现 students 是 missing key
# 2. 按照默认的缺失值类型，生成一个 list，并将 (key, default_value) 就地插入到 my_dict 中，然后返回 default_value 的引用
# 3. default_value 加入新的数据
```

### Set 算数运算符优化

灵活运用 Set 的算数运算符，比写 for 循环的效率高很多，Demo:

```python
found = len(needless & haystack)

for n in needless:
    if n in haystack:
        found += 1
```

以上的两个块代码，在效果上等价，但是前者运用了算数运算符，其速度远大于 for 循环。 

## 语法优化

### 换行

在括号 `[]{}()`类的换行，都不需要加入换行符 `\`，所以我们可以通过在括号内换行，写出更有层次感和可读性的列表推导式。

### 文件 IO

with 相对于传统的 IO 语法，其**优势**在于：

1. 无论文件打开是否成功，都会自动关闭文件流

```python
with open("file.txt", encoding="utf-8") as fr:
    content = fr.read()
```



## API Convention

### In-place method

Functions or methods that change an object in place should return None to make it clear to the caller that the object itself was changed and no new object was created. 这也是一个内存优化点。

For example:

```python
list1 = [2,3,5,7,7,8]
list1.sort()
list1.shuffle()
```

但是，inplace 方法有一个缺点，就是无法实现 cascade operation.

### Inplace Operations

对于数学运算符，例如:

```
+, -, *, &, |
```

都可以利用 inplace 实现内存的节约：

```python
lst1 = []
lst2 = []

lst1 += lst2

set1 = set()
set2 = set()

set1 |= set2
set1 &= set2
```

## 性能优化工具

### [Python 内存优化工具 memory_profiler](#Python 内存优化工具 memory_profiler)

### Python Bytecode disassember

**What is Bytecode**

> Python source code is compiled into bytecode. The bytecode is also cached in `.pyc` files so that executing the same file is faster the second time (recompilation from source to bytecode can be avoided). This “intermediate language” is said to run on a [virtual machine](https://docs.python.org/3/glossary.html#term-virtual-machine) that executes the machine code corresponding to each bytecode. Do note that bytecodes are not expected to work between different Python virtual machines, nor to be stable between Python releases.

Python 源码被编译成 bytecode，并缓存在 `.pyc` 文件中。我们在执行 Python 源码时，第二次执行往往比第一次执行要快，原因在于第二次执行的时候，不需要对源码重新编译了。Bytecode 是一个中间状态，其需要 Python 的虚拟机去翻译 Bytecode 为机器码。

需要注意的是，bytecode 并不是跨 python 虚拟机平台 和 跨 Python 版本的，也就是说，bytecode(.pyc) 一旦生成，就只能在当前环境下执行。换了一个 python 虚拟机，换了一个 python 版本，那么 bytecode 就会失效。

**Analysis bytecode: disassember**

disassmber(dis) 用来翻译 bytecode，了解一个 Python 解释器的执行过程。

Demo1:

```python
import dis

def myfunc(alist):
    return len(alist)

dis.dis(myfunc)
"""
  2           0 LOAD_GLOBAL              0 (len)
              2 LOAD_FAST                0 (alist)
              4 CALL_FUNCTION            1
              6 RETURN_VALUE
"""
```

Demo2:

```python
import dis
dis.dis("set([1])") # 单独的 Python 语句，需要用引号括起来

"""
  1           0 LOAD_NAME                0 (set)
              2 LOAD_CONST               0 (1)
              4 BUILD_LIST               1
              6 CALL_FUNCTION            1
              8 RETURN_VALUE
"""
```

dis 模块可以用来洞察 python 解释器对于程序的解释过程，进而优化代码。

