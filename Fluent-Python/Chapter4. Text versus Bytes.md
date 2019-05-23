# Chapter4. Text versus Bytes

[TOC]

## Text and Bytes

### String Sequence

**String is a sequence of unicode characters.**

每一个 Unicode char 有一个 identity: code point，code point is a number from 0 to 111411.

```python
# get unicode code point
print(ord("a")) # 97
print(ord('€')) # 8364
```

### Byte Sequence

```python
ss = b"nihao, i'm wansho" # 仅支持 ASCII 字符
ss = bytes(u"你好", encoding="utf-8")
```

### 区别

```Python
# in python3 
ss = "1" # unicode
s = b"1" # byte

ss == s
# false
```



|         | unicode sequence 定义 | byte sequence定义                 |
| ------- | --------------------- | --------------------------------- |
| Python2 | `u("你好")`           | ```"nihao" ```                    |
| Python3 | `"你好"`              | `bytes("你好", encoding="utf-8")` |

**Tips**:

* Python2 的字符串**默认为 Byte 类型**，如果输入非 ASCII 字符，则自动编码为 byte 

  ```python
  ss = "你好"
  print(ss) # \xe4\xbd\xa0\xe5\xa5\xbd
  ```

* Python3 中的字符串默认为 Unicode Sequence

### Python3 中定义 byte sequence

## Encode and Decode

### 框架

![encode and decode](http://assets.processon.com/chart_image/5cdf647ae4b00446dc68e782.png)

**Tips**:

* An encoding is an algorithm is an algorithm that converts code points to byte sequences and vice versa.

### 为何要 encode

encode 可以将内存中的数据进行压缩，提高存储和传输效率。

### Basic Encoders and Decoders

Python 中集成了 100+ 个 codec，实现 text 到 byte 的互相转换。常见的 codec 有：`utf-8, utf-16, gb2312`

每一个 codec 都有一个名字，通常还有一些别名，例如：`utf_8` 对应的别名有 `utf8, utf-8, U8`。 

**decode 出现乱码的问题**

decode 出现乱码，大概率是因为 decode 和 encode 的 codec 不匹配，那么 encoded byte 对于 decode 来说就是噪声，而恰巧负责 deocde 的 codec 能够 decode random noise，所以才会 decode 出一些乱码。

### Python 源码默认的 Encoder

|         | Encoder |
| ------- | ------- |
| Python2 | ASCII   |
| Python3 | UTF-8   |

这也是为什么，Python2 的源码，在文件开头需要加入 `# -*- coding: utf-8 -*-` 指定编码器。

Python3 允许 non-ASCII identifiers in source code，任何 Unicode 字符，都可以作为变量，也就是说，**中文也可以作为变量**！

### 如何判断一个 byte sequence 的编码器: chardet

结论：无法判断。

许多通信协议和文本的格式，例如 HTTP 和 XML，会在 headers 中明确指出其内容是如何 encode。大多数时候，我们能否判断 byte sequence 并不是 ASCII，因为其中有很多符号的 value > 127，但是我们可以通过经验，察觉到这些 byte sequence 是怎么编码得来的。

例如，如果 `\x00` 很常见，那么其很可能是 16bit 或 32bit 编码得来的，而不是 ASCII，因为 `\x00` 在 ASCII 中是一个 bug，当 byte sequence 中有较多的 b`\x20\x00` 时，那么这个符号很可能是编码规则 `utf-16le` 编码得到的空格。

所以，虽然理论上无法判断，但是我们还是可以通过经验来大概猜出来 byte sequence 的编码方式。package `chardet` 就是用来 detect codec 的。

### 大端/小端 — 有 BOM/无BOM

#### 大端/小端

大端小端是指机器对于多字节数据类型的在内存中的存储顺序。

如果是先存储有效位，则是小端，如果先存储无效位，则是大端。

拿 C  语言的数据类型 int 类型举例，一个 int 类型在内存中占 4 个字节，例如 `int num = 1;`，其在内存中，应该存储为：`0x00 00 00 01`那么这 4 个字节，是 `00` 在前，还是 `01` 在前？如果 `01` 在前，即其在内存中的存储顺序为：`01000000`，则为小端（大多数 x86 机器都是小端），如果 1 在内存中的存储顺序为 `00000001`，则为大端。

**如何判断一个机器是大端还是小端**

用 char 指针访问一个多字节的数值 1，例如 int 类型，然后访问该数在内存中的第一个字节，如果第一个字节的值为 1，则说明其在内存中存储的顺序为 `0100……`，为小端；如果第一个字节的值为 0，则说明其在内存中存储的顺序为 `00……01`，为大端。

```c
#include<stdio.h>
/**
 * 用于判断机器是大端机器还是小端机器
*/
void print_int(char* p){
    // 一个字节一个字节的按照内存顺序打印内容
    int len = sizeof(int); // 4 个字节
    int i;
    for(i = 0; i < len; i++){
        printf("%d", *p);
        p += 1;
    }
}

void main(){
    int num = 1; // int 占用4个字节
    // 获取 num 的地址，然后转成 char* 指针类型，这样就保证了一个一个字节的访问
    char* p = (char*)(&num);
    print_int(p);
    // 打印结果为 1000，其最先输出的是有效数字端，为小端
    return;
}
```

#### BOM (Byte Order Mark) / UTF-8 BOM 的由来

从大端和小端我们可以知道，内存存储顺序，对于不同的机器是不一样的。Python 在对 Unicode 字符进行 encode 进而转换成 byte 时，不同的机器，其产生的 byte 顺序是不一样的。这就导致了数据在存储和传输的时候，出现即使是相同的编码规则，也解析出乱码的问题。

为了解决机器带来的大端小端的问题，很多编码器会预先获取机器大小端顺序，然后在进行编码的时候，将顺序规则写入编码得到的 byte，这就是 BOM 的**由来**。由于只有在 encoder 为双字节编码的时候才会有顺序之分，所以照说 `utf-8` 生成的字节不需要加 BOM，但是很多 Windows 的应用(Notepad，Excel)会在编码的时候，将 BOM 加入 utf-8 编码的文件中，尤其是 Excel，其依赖于 BOM 来识别 utf-8 文件。由于 Windows 系统会在 utf-8 编码时，往文件中写入 BOM，所以 utf-8 编码才会衍生出：`utf-8 和 utf-8 BOM` 两种编码。

## Unicode Sandwich

Python 采用 Unicode 模型来进行文本的处理。实际上，该模型的思想适用于大都数的系统。在系统输入时，将 byte decode 为 Unicode，在系统输出时，再将 Unicode encode 进行存储或传输。

![Unicode Sandwich](assets/1558260080911.png)

注意：

* 当我们在读写文件的时候，如果没有指定编码，那么 Python 会默认使用系统的编码，类 Unix 系统的默认编码都是 utf-8，而 Windows 系统的默认编码并不是 utf-8.
* 由于不同的系统，默认的编码规则不同，所以我们应该在代码文件中明确指定编码

## Tips for 文件读写代码

见注释：

```python
ss = "hello万朔"
# 1. encoding 是为了指定存储的编码格式，编码后存储的文件，可以节省存储资源。
# 2. 读和写的 encoding 要一致
# 3. encoding 不能省略，否则 Python 会使用当前操作系统默认的编码，而不同的操作系统，其默认编码可能不同
fw = open("test.txt", "w", encoding="utf-8") 
print(fw.write(ss)) # write 和 read 会返回读取的长度，打印 7，表明写入了 7 个 Unicode 字符 
fw.close()

import os
print(os.stat("test.txt").st_size) # 返回 11，表示 test.txt 的内容(大小)为 11 个字节，也就是说 test.txt 为 11Byte，而实际上，该文件在 Windows 上显示也是 11 个字节大小。
fr = open("test.txt", "rb") # rb 为 read binary，该模式下读取的内容为字节流，也就是说，如果我们想要分析一个文件的字节组成，可以，另外，注意 binary 模式下，不需要指定 encoder
print(fr.read())
# b'hello\xe4\xb8\x87\xe6\x9c\x94'，就像结果一样，确实有 11 个字节，并且显示的确实是 byte 字节格式
```

注意：

* 如果我们想要探究一个文件的字节，在简单的情境下，可以使用 `binary` 模式进行读取，但是如果上升到了业务，就不需要自己动手造轮子了，应该使用现成的轮子 **Chardet**，Chardet 是探究文件 Byte 的利器。

## byte in RE

Python3 中，可以强制指定进行 byte 的匹配，这样只能匹配到 ASCII。

```python
import re
re.compile(rb"\d") # b 代表进行 byte匹配
```

## 本章学习感悟

本章学习的知识，让我把 

* C 语言的 char* 指针
* 计组的字节/大端小端
* Python 的字符和字节 / BOM 和无 BOM

等知识串在了一起。