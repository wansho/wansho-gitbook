# PEP

[TOC]

## PEP-8 Coding style 

[[PEP8]](https://www.python.org/dev/peps/pep-0008)

**PEP8 标准已经被封装成一个工具**

```shell
pip install pep8
```

```shell
pep8 hello.py
```

```
pycodestyle ...

  warnings.warn(
method.py:8:1: E302 expected 2 blank lines, found 1
method.py:11:5: E301 expected 1 blank line, found 0
```

其他 Python 静态代码检测工具：pyflakes, pylint  

**代码长度**

一行代码长度：79 chars

**操作符**

```python
# Wrong:
# operators sit far away from their operands
income = (gross_wages +
          taxable_interest +
          (dividends - qualified_dividends) -
          ira_deduction -
          student_loan_interest)

# Correct:
# easy to match operators with operands
income = (gross_wages
          + taxable_interest
          + (dividends - qualified_dividends)
          - ira_deduction
          - student_loan_interest)
```

**import**

Imports should be grouped in the following order:

1. Standard library imports.
2. Related third party imports.
3. Local application/library specific imports.

You should put a blank line between each group of imports.

**模块级 dunder names**

Module level "dunders" (i.e. names with two leading and two trailing underscores) such as `__all__`, `__author__`, `__version__`, etc. should be placed after the module docstring but before any import statements *except* `from __future__` imports. Python mandates that future-imports must appear in the module before any other code except docstrings:

```python
"""This is the example module.

This module does stuff.
"""

from __future__ import barry_as_FLUFL

__all__ = ['a', 'b', 'c']
__version__ = '0.1'
__author__ = 'Cardinal Biggles'

import os
import sys
```

**whitespace 的使用惯例**

```python
# Correct:
foo = (0,)

# Wrong:
bar = (0, )
```

```python
# Correct:
i = i + 1
submitted += 1
x = x*2 - 1
hypot2 = x*x + y*y
c = (a+b) * (a-b)

# Wrong:
i=i+1
submitted +=1
x = x * 2 - 1
hypot2 = x * x + y * y
c = (a + b) * (a - b)
```

```python
# Correct:
def complex(real, imag=0.0):
    return magic(r=real, i=imag)

# Wrong:
def complex(real, imag = 0.0):
    return magic(r = real, i = imag)
```

**逗号的使用**

```python
# Correct:
FILES = [
    'setup.cfg',
    'tox.ini', # 可能在后期进行扩展
    ]
initialize(FILES,
           error=True,
           )
# Wrong:
FILES = ['setup.cfg', 'tox.ini',]
initialize(FILES, error=True,)
```

## PEP-343 The "with" Statement  

[[with statement in Python]](https://www.geeksforgeeks.org/with-statement-in-python/)

Author: Guido van Rossum, Nick Coghlan 

Created: 13-May-2005  

### Abstract

 **with 用于异常发生时，及时释放异常涉及的资源**。

**`with`** statement in Python is used in exception handling to make the code cleaner and much more readable. It simplifies the management of common resources like file streams. 

```python
# file handling 
  
# 1) without using with statement 
file = open('file_path', 'w') 
file.write('hello world !') 
file.close() 
  
# 2) without using with statement 
file = open('file_path', 'w') 
try: 
    file.write('hello world') 
finally: 
    file.close() 
    
# using with statement 
with open('file_path', 'w') as file: 
    file.write('hello world !')
    
```

Notice that unlike the first two implementations, there is no need to call `file.close()` when using `with` statement. The `with` statement itself **ensures proper acquisition and release of resources**. An exception during the `file.write()` call in the first implementation can prevent the file from closing properly which may introduce several bugs in the code, i.e. many changes in files do not go into effect until the file is properly closed.

The second approach in the above example takes care of all the exceptions but using the `with` statement **makes the code compact and much more readable**. Thus, `with` statement helps avoiding bugs and leaks by ensuring that a resource is properly released when the code using the resource is completely executed. The `with` statement is **popularly used with file streams**, as shown above and with **Locks, sockets, subprocesses and telnets** etc.

### 兼容 Python2.x

In Python 2.5, the new syntax will only be recognized if a future statement is present:

```python
from __future__ import with_statement
```

This will make both 'with' and 'as' keywords. Without the future statement, using 'with' or 'as' as an identifier will cause a Warning to be issued to stderr.

In Python 2.6, the new syntax will always be recognized; 'with' and 'as' are always keywords.

### Supporting the “with” statement in user defined objects

[[with statement in Python]](https://www.geeksforgeeks.org/with-statement-in-python/)

## PEP-440 Software Version

PEP 440 introduces a version format that every Python package, and ideally everyapplication, should follow.   	

### 一些官方定义

| 名词          | 解释                                                         |
| ------------- | ------------------------------------------------------------ |
| Projects      | "Projects" are software components that are made available for integration. Projects include Python libraries, frameworks, scripts, plugins, applications, collections of data or other resources, and various combinations thereof. Public Python projects are typically registered on the [Python Package Index](https://pypi.python.org/). |
| Releases      | "Releases" are uniquely identified snapshots of a project.   |
| Distributions | "Distributions" are the packaged files which are used to publish and distribute a release. |

