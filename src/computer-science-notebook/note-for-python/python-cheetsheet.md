# Python Cheetsheet

[TOC]

## Python 大佬 和 Python 学习资源

* 大佬
  * Guido van Rossum
  * Luciano Ramalho [[Fluent-Python]](https://github.com/fluentpython)
  * Julien Danjou  [[Blog]](https://julien.danjou.info/)，[[代表作：The Hacker's Guide To Python]](http://www.vimlinux.com/lipeng/tmpfile/the-hacker-guide-to-python.pdf)
  * Doug Hellmann  [[Python 3 Module of the Week]](https://pymotw.com/3/), [[Book: The Python Standard Library by Example]]() 
* 资源
  * [[Github: Python工匠]](https://github.com/piglei/one-python-craftsman)

## Python 中的一些特殊变量

### `__name__`

[[Desc of `__name__` in FreeCodeCamp]](https://www.freecodecamp.org/news/whats-in-a-python-s-name-506262fe61e8/)

`__name__` 是 Python 的一个变量，如果脚本是主动执行的，那么 `__name__` 的值就是 `__main__`，如果脚本是被 import 导入然后执行的，那么 `__name__` 的值就是脚本的名称。

```python
# script1
import script2
print(__name__)
print(script2.__name__)

# script2
print(__name__)


"""
执行 script2，得到结果：
script2
__main__
script2
"""
```



```python
if __name__ == "__main__":
    pass
```

这就解释了，为什么脚本在被导入的时候，上面的代码不会执行的原因。有了 `__name__`，就可以在脚本中进行代码测试而不污染 import。

## Python built-in functions

Python 所有的 built-in functions：

|                                                              |                                                              | Built-in Functions                                           |                                                              |                                                              |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| [`abs()`](https://docs.python.org/3/library/functions.html#abs) | [`delattr()`](https://docs.python.org/3/library/functions.html#delattr) | [`hash()`](https://docs.python.org/3/library/functions.html#hash) | [`memoryview()`](https://docs.python.org/3/library/functions.html#func-memoryview) | [`set()`](https://docs.python.org/3/library/functions.html#func-set) |
| [`all()`](https://docs.python.org/3/library/functions.html#all) | [`dict()`](https://docs.python.org/3/library/functions.html#func-dict) | [`help()`](https://docs.python.org/3/library/functions.html#help) | [`min()`](https://docs.python.org/3/library/functions.html#min) | [`setattr()`](https://docs.python.org/3/library/functions.html#setattr) |
| [`any()`](https://docs.python.org/3/library/functions.html#any) | [`dir()`](https://docs.python.org/3/library/functions.html#dir) | [`hex()`](https://docs.python.org/3/library/functions.html#hex) | [`next()`](https://docs.python.org/3/library/functions.html#next) | [`slice()`](https://docs.python.org/3/library/functions.html#slice) |
| [`ascii()`](https://docs.python.org/3/library/functions.html#ascii) | [`divmod()`](https://docs.python.org/3/library/functions.html#divmod) | [`id()`](https://docs.python.org/3/library/functions.html#id) | [`object()`](https://docs.python.org/3/library/functions.html#object) | [`sorted()`](https://docs.python.org/3/library/functions.html#sorted) |
| [`bin()`](https://docs.python.org/3/library/functions.html#bin) | [`enumerate()`](https://docs.python.org/3/library/functions.html#enumerate) | [`input()`](https://docs.python.org/3/library/functions.html#input) | [`oct()`](https://docs.python.org/3/library/functions.html#oct) | [`staticmethod()`](https://docs.python.org/3/library/functions.html#staticmethod) |
| [`bool()`](https://docs.python.org/3/library/functions.html#bool) | [`eval()`](https://docs.python.org/3/library/functions.html#eval) | [`int()`](https://docs.python.org/3/library/functions.html#int) | [`open()`](https://docs.python.org/3/library/functions.html#open) | [`str()`](https://docs.python.org/3/library/functions.html#func-str) |
| [`breakpoint()`](https://docs.python.org/3/library/functions.html#breakpoint) | [`exec()`](https://docs.python.org/3/library/functions.html#exec) | [`isinstance()`](https://docs.python.org/3/library/functions.html#isinstance) | [`ord()`](https://docs.python.org/3/library/functions.html#ord) | [`sum()`](https://docs.python.org/3/library/functions.html#sum) |
| [`bytearray()`](https://docs.python.org/3/library/functions.html#func-bytearray) | [`filter()`](https://docs.python.org/3/library/functions.html#filter) | [`issubclass()`](https://docs.python.org/3/library/functions.html#issubclass) | [`pow()`](https://docs.python.org/3/library/functions.html#pow) | [`super()`](https://docs.python.org/3/library/functions.html#super) |
| [`bytes()`](https://docs.python.org/3/library/functions.html#func-bytes) | [`float()`](https://docs.python.org/3/library/functions.html#float) | [`iter()`](https://docs.python.org/3/library/functions.html#iter) | [`print()`](https://docs.python.org/3/library/functions.html#print) | [`tuple()`](https://docs.python.org/3/library/functions.html#func-tuple) |
| [`callable()`](https://docs.python.org/3/library/functions.html#callable) | [`format()`](https://docs.python.org/3/library/functions.html#format) | [`len()`](https://docs.python.org/3/library/functions.html#len) | [`property()`](https://docs.python.org/3/library/functions.html#property) | [`type()`](https://docs.python.org/3/library/functions.html#type) |
| [`chr()`](https://docs.python.org/3/library/functions.html#chr) | [`frozenset()`](https://docs.python.org/3/library/functions.html#func-frozenset) | [`list()`](https://docs.python.org/3/library/functions.html#func-list) | [`range()`](https://docs.python.org/3/library/functions.html#func-range) | [`vars()`](https://docs.python.org/3/library/functions.html#vars) |
| [`classmethod()`](https://docs.python.org/3/library/functions.html#classmethod) | [`getattr()`](https://docs.python.org/3/library/functions.html#getattr) | [`locals()`](https://docs.python.org/3/library/functions.html#locals) | [`repr()`](https://docs.python.org/3/library/functions.html#repr) | [`zip()`](https://docs.python.org/3/library/functions.html#zip) |
| [`compile()`](https://docs.python.org/3/library/functions.html#compile) | [`globals()`](https://docs.python.org/3/library/functions.html#globals) | [`map()`](https://docs.python.org/3/library/functions.html#map) | [`reversed()`](https://docs.python.org/3/library/functions.html#reversed) | [`__import__()`](https://docs.python.org/3/library/functions.html#__import__) |
| [`complex()`](https://docs.python.org/3/library/functions.html#complex) | [`hasattr()`](https://docs.python.org/3/library/functions.html#hasattr) | [`max()`](https://docs.python.org/3/library/functions.html#max) | [`round()`](https://docs.python.org/3/library/functions.html#round) |                                                              |

### `eval()`

[[Python eval()]](https://www.programiz.com/python-programming/methods/built-in/eval)

Python has an eval() function which evaluates a string of Python code:

```python
assert eval("2 + 3 * len('hello')") == 17
```

eval 函数很危险：[[Eval really is dangerous]](https://nedbatchelder.com/blog/201206/eval_really_is_dangerous.html)

Consider a situation where you are using a Unix system (macOS, Linux etc) and you have imported the `os` module. The os module provides a portable way to use operating system functionalities like reading or writing to a file.

If you allow users to input a value using `eval(input())`, the user may issue commands to change file or even delete all the files using the command: `os.system('rm -rf *')`.

## Python 的几个短板

### 多线程与速度

* 速度慢：更关注编程速度，而不是运行速度
* 不支持多核多线程：Python 仅支持单核的多线程

### Python 打包与独立可执行文件

Python 很难进行打包部署

## Python 运算符

备忘几个不常用到的运算符

### 算数运算符

| 运算符 | 解释                            | Demo            |
| ------ | ------------------------------- | --------------- |
| **     | 幂                              | `2**10 == 1024` |
| /      | 除 (**结果一定是小数 python3**) | `8 / 2 == 4.0`  |
| //     | 取整除（**向下取整**）          | `9//2 == 4`     |

### 比较运算符

| 运算符           | 解释     | Demo     |
| ---------------- | -------- | -------- |
| <>               | 不等于   | `2 <> 1` |
| 10 <= num <= 100 | 链式比较 |          |

### 位运算符

| 运算符 | 解释                         | Demo           |
| ------ | ---------------------------- | -------------- |
| &      | 按位与                       |                |
| \|     | 按位或                       |                |
| ^      | 按位异或 (相同为0，不同为1） |                |
| ~      | 按位取反                     |                |
| <<     | 左移（地位补0）              | `3 << 2 == 12` |
| `>>`   | 右移                         | `15 >> 2 == 3` |

## Python 与 C 的语法差异

### 数值型 + 1

Python 不能通过 `++a` 实现自增。

```python
# C
int a = 1;
queue[++a] # == queue[2]
prinf("%d", a) # a == 2


# Python
a = 1
queue[++a] # == queue[2]
print(a) # 1
```



## 其他问题

### 指针和引用的区别

Pointer variable vs Reference variable

* 引用更像是一个**贴纸**，贴纸上写上内存地址空间的别名（非空），然后贴在这块地址空间上，是一次性的（不能重新赋值）

* 指针首先是一个**指针变量**，这个变量存储着一个地址空间，这个变量可以为空，也可以重新赋值

## Matplotlib 绘制矢量图

最通用的矢量图格式是 pdf 格式，不建议生成 svg 和 eps 格式的矢量图。

## Python Depolyment

[[BeeWare]](https://beeware.org/)

**Write once. Deploy everywhere.**

Write your apps in Python and release them on iOS, Android, Windows, MacOS, Linux, Web, and tvOS using rich, native user interfaces. Multiple apps, one codebase, with a fully native user experience on every platform.

## Python GUI

* Turn python cmd into GUI application: [Gooey](https://github.com/chriskiehl/Gooey)

  <img align="left" src="assets/image-20200828091512198.png" alt="image-20200828091512198" style="zoom:67%;" />