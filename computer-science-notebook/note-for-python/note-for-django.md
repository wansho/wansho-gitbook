# Note-for-Django

[TOC]

## Django 学习资源

[[HelloDjango - django REST framework 教程]](https://www.zmrenwu.com/courses/django-rest-framework-tutorial/)

## Django Philosophy

* Django 的 app 是即插即用的，我们可以将 app 打包，用在多个 project 中，并不只和一个 project 捆绑在一起

## Django Tutorial

官方教程：https://docs.djangoproject.com/en/2.1/

- [Quick install guide](https://docs.djangoproject.com/en/2.1/intro/install/)

- [Writing your first Django app, part 1](https://docs.djangoproject.com/en/2.1/intro/tutorial01/)
- [Writing your first Django app, part 2](https://docs.djangoproject.com/en/2.1/intro/tutorial02/)
- [Writing your first Django app, part 3](https://docs.djangoproject.com/en/2.1/intro/tutorial03/)
- [Writing your first Django app, part 4](https://docs.djangoproject.com/en/2.1/intro/tutorial04/)
- [Writing your first Django app, part 5](https://docs.djangoproject.com/en/2.1/intro/tutorial05/)
- [Writing your first Django app, part 6](https://docs.djangoproject.com/en/2.1/intro/tutorial06/)
- [Writing your first Django app, part 7](https://docs.djangoproject.com/en/2.1/intro/tutorial07/)
- [Advanced tutorial: How to write reusable apps](https://docs.djangoproject.com/en/2.1/intro/reusable-apps/)
- [What to read next](https://docs.djangoproject.com/en/2.1/intro/whatsnext/)
- [Writing your first patch for Django](https://docs.djangoproject.com/en/2.1/intro/contributing/)

### Quick install guide

* get_version() 

  ```python
  import django
  print(django.get_version())
  ```

* get version in shell

  ```shell
  $ python -m django --version
  # 2.1.7
  ```

###Writing your first Django app, part 1

#### Django 和 Python 版本选择

Python 和 Django 版本的对应关系

| Django version | Python versions                            |
| -------------- | ------------------------------------------ |
| 1.11           | 2.7, 3.4, 3.5, 3.6, 3.7 (added in 1.11.17) |
| 2.0            | 3.4, 3.5, 3.6, 3.7                         |
| 2.1, 2.2       | 3.5, 3.6, 3.7                              |

- Django1.11 是兼容 Python2.7 的最后一个版本，一直提供支持到 2020 年，2020年以后，Python2.7 对应的所有 Django 版本将不再提供技术支持。

#### Create a Django Project

```shell
$ django-admin startproject mysite
# 运行后，就会创建一个 mysite 文件夹，结构为：

########################
# mysite/
#     manage.py
#     mysite/
#         __init__.py
#         settings.py
#         urls.py
#         wsgi.py
########################
```

* mysite 

  只是 project 的容器，我们可以随意修改它的名字

* manage.py 

  是一个命令行工具，用于和 django project 进行交互，详细说明请参考： [django-admin and manage.py](https://docs.djangoproject.com/en/2.1/ref/django-admin/)

* inner `mysite/`

  actual **Python package** for your project. 

* `mysite/__init__.py`

  用于告诉 Python， mysite/ 应该被当作一个 Python 的 package

* mysite/settings.py

  网站的配置，more detial: [Django settings](https://docs.djangoproject.com/en/2.1/topics/settings/) 

* mysite/urls.py

  url 路由, for more: [URL dispatcher](https://docs.djangoproject.com/en/2.1/topics/http/urls/)

* mysite/wsgi.py

  WSGI-compatible 的 Web 服务器的入口，more detail:  [How to deploy with WSGI](https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/)

#### Run the Server

```shell
# start the Django development server,
python manage.py runserver
```

**runserver** 这个命令会调起一个 development server, 是一个轻量级的，完全用 Python 实现的 Web Server，只用于测试用。

其他可用的 Server：Apache，uWSGI。

runserver 默认占用 8000 端口，我们可以指定 IP 和端口：

```shell
python manage.py runserver 0:8888
```

0 表示所有的 Host 都可以访问，是 0.0.0.0 的缩写，8888 表示 Django 监听 8888 端口

**注意：**

* 不要在任何线上环境中使用这个轻量级的 web Server，Django 是一个 Web 框架，并且集成了一个方便测试的 Web Server.
* 每一次请求，development server 都会重新加载并运行 python 代码，所以 python 代码修改后，不需要重启服务器

Reference：[runserver](https://docs.djangoproject.com/en/2.1/ref/django-admin/#django-admin-runserver)

#### Write your first view

##### 在主路由中配置子路由

```python
# polls/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

```python
# mysite/urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

其中 include() 方法是将对 polls 的流量分发到 polls.urls 的路由上，其匹配到 polls/，然后将 polls 后面的字符串发送到 polls 下的子路由进行进一步的路由。

##### path() 方法

path 方法用于路由，可以传入四个参数，两个必传参数: route (str), view (function)，两个 optional: kwargs, name

* route 

  route 是一个 url pattern 字符串参数, url pattern 并不会匹配 get 或 post 参数，也不会匹配域名

* view

  view 是一个 function 参数，当 route 匹配到一个 pattern 后，其会调用 view 中指定的 function，并且传入 function 参数，第一个参数是一个 HttpRequest, 第二个参数是 route 匹配到的 pattern 的后面的参数。

* kwargs （optional）

  字典参数，可以传入任意的 dictionary to the target view，通常用于复杂的业务处理。

* name （optional）

  字符串参数，暂时没有搞懂，其值为 function 的名字

  

### Writing your first Django app, part 2 - models

#### 数据库配置

Django 默认采用 SqLite 数据库，SqLite 是 Python 自带的数据库。

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': "senti_weibo",
        'USER': 'root',         # 数据库用户名
        'PASSWORD': 'ws6226067',     # 密码
        'HOST': '47.92.253.60',    # 主机
        'PORT': '3306',         # 数据库默认使用的端口
    }
}
```

* NAME 参数

  NAME 是数据库的名字，如果我们使用 SQLite 数据库，那么数据库就是一个文件，那么NAME的值就应该是一个包含文件名的绝对路径，default value 是 `os.path.join(BASE_DIR,'db.sqlite3')`

注意，要确保访问数据库的用于拥有创建数据库的权限。

#### 时区和语言配置

```
LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'
```

https://docs.djangoproject.com/en/2.1/ref/settings/#std:setting-TIME_ZONE

#### INSTALLED_APPS 解析

除了最后一个 app 是用户创建的，其他的 app 都是 Django 自带的 app，

```python
INSTALLED_APPS = [
    'django.contrib.admin', # The admin site
    'django.contrib.auth', # An authentication system
    'django.contrib.contenttypes', # A framework for content types.
    'django.contrib.sessions', # A session framework.
    'django.contrib.messages', # A messaging framework.
    'django.contrib.staticfiles', # A framework for managing static files.
    'senti_weibo.apps.SentiWeiboConfig',
]
```

上面这些 app 会从数据库中的表中读写数据，所以，我们需要在数据库中初始化这些表格，然后才能使用上面 app 提供到的功能。

```
python manage.py migrate
```

migrate 命令会为预安装的 app 创建必要的表。

#### Creating models

* models 的哲学

  一个 model 是对数据库中一张表的映射，其中有对表字段的映射，也包含了表方法。

* 实际应用中，由于数据库表的定义相对复杂，涉及到编码问题和各种其他的问题，所以我们默认是直接写 sql 语句生成表格，然后到 models.py 中写相应的数据模型

* Models 中 表定义的注意事项：

  * CharField 需要传入一个 max_length
  * django 默认采用 id 为主键，所以所有的表在手动定义的时候，都需要以 id 为主键，另外 models 中不需要再对 id 重复声明
  * Django 的数据库表的表名规则：`appname_tablename`

* 要想在 admin 界面对表格进行编辑，必须在 admin.py 中对表格进行注册

* models 的作用并不止于其到数据库的映射，其还可以构建更高层次的数据抽象，例如性别的可选值，年龄的可选值等

* 数据库建库时，一定要设置其兼容的字符集，否则默认是不兼容中文的

  `create database django_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; `

  这是 Django 能使用 models 操作数据库的前提，否则后期会带来无穷无尽的麻烦。

### Writing your first Django app, part 3 - views

Django 中，每一个 views 都对应一个 function，Django 会根据 url 请求来匹配 view。Django 使用 `URLconf` 来实现 url 到 view 的映射。

#### views 的两个职责

All Django wants is that [`HttpResponse`](https://docs.djangoproject.com/en/2.1/ref/request-response/#django.http.HttpResponse). Or an exception.

1. 返回一个 [`HttpResponse`](https://docs.djangoproject.com/en/2.1/ref/request-response/#django.http.HttpResponse)，其中包含了这次请求的内容
2. 返回一个异常，例如 [`Http404`](https://docs.djangoproject.com/en/2.1/topics/http/views/#django.http.Http404)

#### views 的处理逻辑

1. 通过 models 获取数据
2. 通过 loader 加载 template
3. 将数据加载进 template
4. 将渲染后的结果通过 HttpResponse 返回

其中 2，3 步骤可以用 render 简化，render可以 一次性实现模板的加载和数据的填装。

标准的代码：

```python
from django.http import HttpResponse
from django.template import loader

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))
```

可以简化成：

```python
from django.shortcuts import render

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)
```

####  404 error / get_object_or_404 / get_list_or_404

Demo

```python
from django.http import Http404

# 在找不到其所请求的内容的时候，返回 404 异常
raise Http404("Question does not exist")
```

get_object_or_404  Demo:

get_object_or_404 将获取数据和处理异常放在了一起

```python
from django.shortcuts import get_object_or_404, render

from .models import Question
# ...
def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})
```

get_list_or_404 Demo:

get_list_or_404 会在 list 为空时，返回一个 404

#### Generic views 对共同的 views 进行抽象



#### url 变量匹配规则

Demo:

`path('<int:question_id>/results/', views.results, name='results')`

`<>` 用于表示 `<>` 中的内容是一个变量，该变量的 name 为 `question_id`，该变量的类型是 `int` 类型。该变量会传入`views` 的 `results` 方法中，传入的参数就是变量 `question_id`。

| Demo                | 解释 |      |
| ------------------- | ---- | ---- |
| `<int:question_id>` |      |      |
|                     |      |      |
|                     |      |      |



### Writing your first Django app, part 4 - form

#### get / post

form 与服务器进行交互的两种方式：

1. get: 从 server 获取数据
2. post: 向 server 提交数据

#### Ajax

https://blog.csdn.net/Jayden_Gu/article/details/82386565

https://code.ziqiangxuetang.com/django/django-ajax.html

### Writing your first Django app, part 5 - test

#### 为什么要创建 test



## Model 增删改查

### 多数据库 Multi-DB

[Multi-DB](https://docs.djangoproject.com/en/2.2/topics/db/multi-db/#manually-selecting-a-database)

### Query Demos

```python
# 导入 models 文件
from . import models

# 参考文档
# https://docs.djangoproject.com/en/2.1/ref/models/
# https://docs.djangoproject.com/en/2.1/topics/db/queries/

# 同步模型到数据库
python manage.py makemigrations # 针对 models 的更新生成 migrations
python manage.py migrate # 将 migrations 同步到数据库

# 插入数据
statistics = models.student(name="wansho", age=25, score=100)
statistics.save()

# 批量插入
sql1 = models.account(name="wansho", passwd="hehe") # new 一个插入对象
sql2 = models.account(name="love", passwd="123")
bulk_list = [sql1, sql2]
models.student.objects.bulk_create(bulk_list) # 返回 bulk_list

# 查找数据 
get：只返回一条元组，可直接编辑
filter：返回一个元组列表
# 官方文档：https://docs.djangoproject.com/en/2.1/topics/db/queries/
taskconf = models.taskconf.objects.filter(product_line = product_line, effective = True).exclude(source = "sample").exclude(idc__in = ["se-offline", "template", "ipad_page"]).exclude(module = "debug") # 返回一个集合
models.functions.objects.get(function = function, module = module) # 查找唯一数据
pd_olddata = pd.DataFrame(list(models.functions.objects.all().
       exclude(card_id = 0).values())) # 所有数据
# 注意，Django 接口返回的数据，要使用 .values() 遍历
>>> Blog.objects.filter(name__startswith='Beatles').values()
<QuerySet [{'id': 1, 'name': 'Beatles Blog', 'tagline': 'All the latest Beatles news.'}]>  # .values() 返回一个 list，其中元素是字典

* 改
    m = Model.objects.get(id=1)
    m.name = 'new_name'
    m.save()
    直接更新，filter 返回一个 list，get 只返回一条元组
    models.functions.objects.filter(module = module, 
                function = function).update(
                        pv = pv,
                        product_form = product_form,
                        cid = cid,
                        jiaotu_need = jiaotu_need,
                        jiaotu_coverage = jiaotu_coverage,
                        description = description)

* 删
    m = Model.objects.get(id=1)
    m.delete()

* Django 数据库初始化 Model 
null 是针对数据库而言，如果 null=True, 表示数据库的该字段可以为空，即在Null字段显示为YES。
blank 是针对表单的，如果 blank=True，表示你的表单填写该字段的时候可以不填，但是对数据库来说，没有任何影响
class deploydetail(models.Model): # deploydetail 为表名
    product_line = models.CharField(max_length=32, blank=True, null=False)
    statistics_time = models.DateTimeField()

* 获取所有数据，除去一些数据，并转成 pandas
pd.DataFrame(list(models.functions.objects.exclude(card_id = "0").values()))
```

### limit Query

```python
#  This is the equivalent of SQL’s LIMIT and OFFSET clauses.
Entry.objects.all()[:5]
```

### 直接执行 sql 语句

[Tutorial](<https://docs.djangoproject.com/en/2.2/topics/db/sql/>)

Demo:

```sql
negative_sql = """
                select 
                    seged_weibo, label, id  
                from 
                    senti_weibo_train_data 
                where  
                    label = "__label__negative" and 
                    is_duplicated = "N" and 
                    length(seged_weibo) >= 15
                limit 5;
        """
negative_weibos = models.train_data.objects.raw(negative_sql)[: 3]
print(negative_weibos[0].label)
```

此种方式，在 sql 语句中必须加入主键，否则会报异常：`Raw query must include the primary key`

## Django Test



## Django 前端

Tutorial:

* [Tutorial 加入静态文件，加入背景图片](https://docs.djangoproject.com/en/2.1/intro/tutorial06/)
* [管理静态文件](https://docs.djangoproject.com/en/2.1/howto/static-files/)
* [The Django template language](https://docs.djangoproject.com/en/2.1/ref/templates/language/)
* [静态文件 Nginx 部署](https://docs.djangoproject.com/en/2.1/howto/static-files/deployment/)

Django 已经预安装了 `django.contrib.staticfiles` 来管理静态文件，其从各个 app 中获取各自的静态文件，并统一管理。

### 静态文件管理

负责的 app：django.contrib.staticfiles

### Template 

[Template](https://docs.djangoproject.com/en/2.1/ref/templates/)

Template 基础语法;

1. 变量

   `{{ student.name }}`

   从上下文中获取变量，注意两边带有空格。这样的语法意思是从 context 中获取变量。

2. 逻辑语句

   `{% for name in students.names %}`

template 使用 dot 来获取变量的属性，对于 `{{ question.question_text }}`， Django 会首先判断，question 是否是一个 字典，如果不是的话，再判断 question 是否为一个对象，question_text 是否为对象的

#### Tags

| Tag                              | 作用                    |      |
| -------------------------------- | ----------------------- | ---- |
| `{% static %}`                   | w为静态文件生成绝对路径 |      |
| `{% url 'detail' question.id %}` | 匹配到指定的 view       |      |
|                                  |                         |      |

#### 移除模板中的url硬编码

一句话解释：从匹配 url 到匹配 view。

之前的模板中的 url 为：

```html
<li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
```

其中的 href 会重定向到 /polls/question_id, 但是我们的 url 规则会经常变化，例如我们可能会修改 API 接口为 /polls/specifics/question_id，对 url 进行硬编码匹配，可维护性很差。

所以，在模板中，要从匹配 url ，转换到匹配 view。

```html
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

其中，detail 是 view 中的 function name，question.id 是传入 detail 方法的参数，以上的规则就是跳过路由，直接匹配到 views 中的 detail 方法。

然而，还有一个问题，Django 如何判定到底匹配到哪个 app 中的 detail 方法？

所以，最正确的做法，是在 方法前指定 app 名字

```html
<li><a href="{% url 'polls:detail' question.id %}">{{ question.question_text }}</a></li>
```

其中，polls 就是 app_name，另外，还要在 polls/urls.py 中加入 `app_name = 'polls'`

### static files

**静态文件位置**

在 app 目录下创建 static 文件夹，并在该文件夹下创建 app_name 目录，然后再存放静态文件。之所以要在 static 下再创建一个 app_name 目录，是因为 Django 在根据名称查找第一个匹配到的静态文件，如果在其他 app 中有相同的 静态文件名称，那么 Django 就会混淆。

引用

对于只属于某个 app 的静态文件，我们需要把该静态文件放入该 app 下，如果某些静态文件是 app 公用的静态文件，例如 Bootstrap 框架，那么其位置就有所变动，我们可以自己定义这些公用静态文件的位置，Django 会自动去这些文件夹中找公用的静态文件。

```python
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"), # BASE_DIR 是与 manage.py 所在的文件夹
    '/var/www/static/',
]
```

引用公共的静态文件，例如引用 `static/js/echarts.min.js`：

```html
{% load static %}
<link rel="stylesheet" href="{% static 'js/echarts.min.js' %}" >
```

The `{% static %}` template tag generates the absolute URL of static files.

### Bootstrap 4

* [Bootstrap 4 Doc](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

* [Github Django-Bootstrap](https://github.com/zostera/django-bootstrap4)

* [Django-Bootstrap Doc](https://django-bootstrap4.readthedocs.io/en/latest/)

Bootstrap 4 只兼容 HTML5，其 JavaScript 部分依赖于 JQuery。

#### Bootstrap3 兼容性

* bootstrap4 自带了 loader/spinner，bootstrap3 没有，可以用 [loader.css](https://github.com/ConnorAtherton/loaders.css) 替代，注意在使用的时候，可能要修改一部分 css 源码

#### Bootstrap4 Contents



## Django 常用命令

```python
# 1. 新建一个 project
django-admin.py startproject project-name

# 新建一个 app
python manage.py startapp bilibili_helper

# 2. 数据模型相关命令
python manage.py makemigrations app_name 
# 告诉 django, models 模型有所改动，对变动生成 migrations，本质上是将 models 转成 SQL
# 会在 app_name/migrations/ 下生成临时文件，例如 0001_initial.py，如果我们想要查看该命令到底把 models 转成了什么 SQL，可以使用 sqlmigrate 命令查看：
python manage.py sqlmigrate student 0001

python manage.py migrate
# 将 models.py 视图的变动同步到数据库，本质上是在 DBMS 上执行 SQL 

# 3. 调试运行单个 py 文件
python manage.py coverage # 在 Django 的根目录下

# 4. 设置端口号
python manage.py runserver 192.168.1.50:8080
    
# 5. 进入 django　的 shell 命令行
python manage.py shell 

# 创建管理员
python manage.py createsuperuser
```

## Django 安装


## 异常

    * models.py 有中文报异常
    SyntaxError: Non-ASCII character '\xe8' in file /home/work/test/measure_site/measure_site/run_case/models.py on line 238, but no encoding declared; see http://www.python.org/peps/pep-0263.html for details

   ## Django 自定义命令

https://docs.djangoproject.com/en/2.1/howto/custom-management-commands/

https://www.cnblogs.com/fuhuixiang/p/4176656.html

option_list 的替代：

## Django Timezone

Django 中默认所有的 datetime 都要加上时区，否则会警告，并且 Django 中的时间存储到数据库中会有 8 小时时差。解决的方法是将 settings.py 中的 USE_TZ = True 注释掉。

## Django 日志

https://docs.djangoproject.com/en/2.1/topics/logging/

### How to configure a awesome logger

Python 提供了配置 Logger 的多种方式，可以编程配置，也可以在字典中进行配置。Django 选择了在字典中进行配置的方法（[dictConfig format](https://docs.python.org/3/library/logging.config.html#logging-config-dictschema)），具体是在 settings.py 中进行配置。

## Django API 汇总

| module             | model 作用              | class/function/variable | 解释                                                         |
| ------------------ | ----------------------- | ----------------------- | ------------------------------------------------------------ |
| django.http        |                         | HttpResponse 类         |                                                              |
|                    |                         | Http404 类              | `raise Http404("Question does not exist")`                   |
| `django.shortcuts` | 提供一些 shortcuts 方法 | render 方法             | 渲染模板，填充数据，并返回一个 HTTPReponse 对象              |
|                    |                         | get_list_or_404         |                                                              |
|                    |                         | get_object_or_404       |                                                              |
| `django.template`  | 模板管理模块            | loader 方法             | 加载模板 `loader.get_template('polls/index.html')`           |
|                    |                         |                         |                                                              |
| `django.urls`      | 路由管理模块            | path 方法               | `path('<int:question_id>/', views.detail, name='detail')` 对 url 进行路由 |
|                    |                         |                         |                                                              |
| `django.db`        | 数据管理模块            | models                  |                                                              |
|                    |                         | migrations              |                                                              |









