# Python Exception

[TOC]

## assert

Python assert（断言）用于判断一个表达式，在表达式条件为 false 的时候触发异常。

```python
assert expression
```

等价于

```python
if not expression:
    raise AssertionError
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