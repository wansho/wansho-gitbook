# Python Packages

[TOC]

## Packages and Module Tutorial

[官方文档](https://docs.python.org/3/tutorial/modules.html#packages)

### Demo

层级关系：package —> subpackage —> module —> (class/function/static variable)

import 只能 import 到 module 层级

而 from xxx import xxx 可以 import 最底层

```
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py        # module
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

### `__init__.py 作用`

The `__init__.py` files are required to make Python treat the directories as containing packages; this is done to prevent directories with a common name, such as `string`, from unintentionally hiding valid modules that occur later on the module search path. In the simplest case, `__init__.py` can just be an empty file, but it can also **execute initialization code for the package** or set the `__all__` variable, described later.

`__init__.py`会在包被导入的时候进行初始化。

### 如何导包

Users of the package can import individual modules from the package, for example:

```python
import sound.effects.echo # echo 可以是一个 subpackage 或者是 module(.py),不能是一个类，方法或者变量
```

This loads the submodule `sound.effects.echo`. It must be referenced with its full name.

```python
sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)
```

An alternative way of importing the submodule is:

```python
from sound.effects import echo
```

This also loads the submodule `echo`, and makes it available without its package prefix, so it can be used as follows:

```python
echo.echofilter(input, output, delay=0.7, atten=4)
```

Yet another variation is to import the desired function or variable directly:

```python
from sound.effects.echo import echofilter # echofilter 可以是一个 subpackage, submodule，也可以是一个方法，一个类，或者一个变量
```

Again, this loads the submodule `echo`, but this makes its function `echofilter()` directly available:

```python
echofilter(input, output, delay=0.7, atten=4)
```

Note that when using `from package import item`, the item can be either a submodule (or subpackage) of the package, or some other name defined in the package, like a function, class or variable. The `import` statement first tests whether the item is defined in the package; if not, it assumes it is a module and attempts to load it. If it fails to find it, an [`ImportError`](https://docs.python.org/3/library/exceptions.html#ImportError) exception is raised.

Contrarily, when using syntax like `import item.subitem.subsubitem`, each item except for the last must be a package; the last item can be a module or a package but can’t be a class or function or variable defined in the previous item.

### `__all__`

**all 用来限定我  `from <module> import *`  时，对外暴露哪些模块和变量，起到隐私保护的作用。**

It is a list of strings defining what symbols in a module will be exported when `from <module> import *` is used on the module.

For example, the following code in a `foo.py` explicitly exports the symbols `bar` and `baz`:

```py
__all__ = ['bar', 'baz']

waz = 5
bar = 10
def baz(): return 'baz'
```

These symbols can then be imported like so:

```py
from foo import *

print(bar)
print(baz)

# The following will trigger an exception, as "waz" is not exported by the module
print(waz)
```

If the `__all__` above is commented out, this code will then execute to completion, as the default behaviour of `import *` is to import all symbols that do not begin with an underscore, from the given namespace.

Reference: https://docs.python.org/tutorial/modules.html#importing-from-a-package

**NOTE:** `__all__` affects the `from <module> import *` behavior only. Members that are not mentioned in `__all__` are still accessible from outside the module and can be imported with `from <module> import <member>`.

### import * from a package

最终结论：不要使用 `import * `

```python
from sound.effects import *
```

实际上，import * 并不会把所有的 submodule 全部导入，真正的导入规则如下：

1. 如果 sub-package: effects 下的 `__init__.py` 文件定义了一个 ist called  `__all__`:

   ```python
   __all__ = ["echo", "surround", "reverse"]
   ```

   那么只会导入 `__all__` 中指定的包，也就是所， `from sound.effects import *` 只会导入 effects 下的三个 submodule.

2. 如果没有定义 `__all__`变量，那么就会导入 effects 中的所有包

### intra-import, relative import 

如果 `sound.filters.vocoder` module 想要使用 `sound.effects.echo`模块，因为他们都在 sound package 下，所以可以直接引用: `from sound.effects import echo`

也可以使用相对地址的引用方式

```python
from . import echo
from .. import formats
from ..filters import equalizer
```

Note that relative imports are based on the name of the current module.



## Python 打包发布

[官方教程](https://packaging.python.org/tutorials/packaging-projects/)

[官方详细教程](<https://packaging.python.org/guides/distributing-packages-using-setuptools/>)

[Setup 教程](<https://docs.python.org/3.7/distutils/setupscript.html>)

[Github Demo](https://github.com/pypa/sampleproject)

上传到官方库的命令：

```shell
pip install wheel
python setup.py sdist bdist_wheel # 生成 package
twine upload dist/* # 上传到官方库
```



## Python Pip Tutorial

### Note

用 pip 导包的时候，可能报名并不是 import 名称，例如 dateutil 包，pip 的时候就要导入 `pip install python-dateutil`

### pip install

```shell
pip install django # 会安装最新的包
pip install django==1.8.2 # 安装特定版本的包

pip install -r requirement.txt # 根据环境配置文件导包
```

### pip list

```shell
pip list # 输出所有的包
```

### pip freeze

```shell
pip freeze > requirement.txt # 导出所有的包
```

### pip 升级

```shell
pip install --upgrade 包名 # 升级包
pip install --upgrade django==1.11 # 升级到指定保本
```

### pip uninstall

```shell
pip uninstall xxx
```



## Python 虚拟环境

### pipenv

官方介绍：https://pypi.org/project/pipenv/

是 pip 和 virtualenv 的组合。

### virtualenv

[廖雪峰教程](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001432712108300322c61f256c74803b43bfd65c6f8d0d0000)

virtualenv 用来创建一个虚拟的 python 开发环境

```shell
pip install virtualenv # 安装该包

# 前提系统应该已经安装了 Python3.7，如果没有安装，则需要 apt-get install python3.7
virtualenv venv --python=python3.7 # 创建一个虚拟的 python 环境，指定 python3.7 的版本
# venv 是 环境所在的文件夹，--python 用于指定 python 版本

source venv/bin/activate # 进入该虚拟环境
deactivate # 退出该虚拟环境

# 删除一个虚拟环境，只需要删除其文件夹即可

# windows 版本：
venv\Scripts\activate 
deactivate
```

## Python Packages

### Selenium 

Windows Anaconda conf:

    1. conda install selenium 或者 pip
    2. 下载 chromedriver.exe ,在附件中
    3. 将 chromedriver.exe 放到 Anaconda 的目录下，就是第一层目录
    4. 将 Chrome 浏览器的目录放在 PATH 变量里，目录可以右击图标链接找到：C:\Users\wanshuo\AppData\Local\Google\Chrome\Application
    5. 将 chromedriver.exe 放到 Chrome 浏览器所在目录中，即 Application 中
    
    Chrome 版本 要和 ChromeDriver 版本匹配：https://blog.csdn.net/ezreal_tao/article/details/80808729

Linux conf:

```
1. pip install selenium==2.48.0
2. 安装Chrome
```

### dateutil parser

将时间字符串解析成 datetime

    安装
        pip install python-dateutil
    
    导包
        from dateutil import parser
    
    使用
        dateStruct = parser.parse(date_str)

### json

**加载 json 文件**

    import json
    def load_json(path):
        try:
            with open(path) as json_file:
                my_dict = json.load(json_file)
        except Exception as e:
            print 'load_dict', e
        finally:
            return my_dict

**写入 json 文件**

    def store_dict(path, data):
        result = True
        try:
            with open(path, 'w') as json_file:
                json_file.write(json.dumps(data))
        except Exception as e:
            print 'store_dict', e
            result = False
        finally:
            return result

**json dumps** 将字典转成 json 字符串，一行 dumps2string

    import json
    data = {
        'name' : 'ACME',
        'shares' : 100,
        'price' : 542.23
    }
    
    json_str = json.dumps(data)
    # '{"price": 542.23, "name": "ACME", "shares": 100}'

**json loads** loads2dict

    将 json 编码的字符串转换成一个 python 的数据结构，往往是 dict

**json dump, load**  用于 读取 和 写入 json 文件。

    如果你要处理的是文件而不是字符串，你可以使用 json.dump() 和 json.load() 来编码和解码JSON数据。
    # Writing JSON data
    with open('data.json', 'w') as f:
        json.dump(data, f)
    
    # Reading data back
    with open('data.json', 'r') as f:
        data = json.load(f)

### 汉字转拼音 pinyin

```
pip install pinyin

https://pypi.org/project/pinyin/

import pinyin
pinyin.get("你好") # nǐhǎo
```

### wordcloud 词云

生成词云

```python
# pip install wordcloud
import matplotlib.pyplot as plt
from wordcloud import WordCloud
# 读取整个文本
text = open(path.join(d, 'constitution.txt')).read()
# 生成一个词云图像
wordcloud = WordCloud(max_font_size=66).generate(text)
plt.figure()
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.show()

# 参考：https://blog.csdn.net/qq_34337272/article/details/79552929
```

### BeautifulSoup4

官方文档：[BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/)

**fixed problems**

1. 解析出文档树出问题

   这可能是因为 html 源码存在不规范的地方，而 html.parser 解析器的容错率不高，所以导致了解析出错

   解决的方法：

   ```python
   # 注意 pip instal lxml
   soup = BeautifulSoup(html, "lxml")
   ```


### commands, subprocess

**commands**

```python
import commands
cmd = "mkdir test" # 建立 test 文件夹
commands.getstatusoutput(cmd) # 获取 cmd 执行结果的 status 和 output，返回一个元组(status, output)，如果执行成功，则 status 为0，如果命令执行失败，则返回一个非 0 的数字，output 为程序执行完的结果。
```

Python3.0 以后，commands 被 [`subprocess`](https://docs.python.org/2/library/subprocess.html#module-subprocess) 取代。

**subprocess**

The [`subprocess`](https://docs.python.org/2/library/subprocess.html#module-subprocess) module allows you to spawn new processes, connect to their input/output/error pipes, and obtain their return codes. This module intends to replace several older modules and functions:

```
os.system
os.spawn*
os.popen*
popen2.*
commands.*
```

Demo:

```python
subprocess.getstatusoutput("cmd") # 返回 0 表示运行成功，返回 非0 表示失败
```

实际上，在代码上，subprocess 可以直接替代 commands