# 调研 Django 1.4 版本升级

[TOC]

**主要参考文献**

Django 版本升级 API 调整记录：

https://docs.djangoproject.com/en/1.11/internals/deprecation/

**升级目的**

新版本的 Django ，稳定性和效率都有一定的增强，高版本的Django应该对 Models 数据库的增删改查进行一定的优化，从而减小数据库的压力。

**Django 版本升级调研**

当前版本： 1.4

打算升级到的版本：2.0

**版本问题**

Django 从 2.0 版本后不再支持 python 2.7，所以改用支持 python2.7 的最新 Django 版本：1.11

**最终方案**

1.4 ——> 1.11

**升级测试**

```
# 测试环境搭建
pip install virtualenv # 安装该包
cd dir # cd 到一个空目录，创建虚拟环境
virtualenv --no-site-packages venv  # 创建一个虚拟的 python 开发环境，名字为 venv，其中默认不包含任何原环境的包，只有几个必要的包
source venv/bin/activate # 进入该虚拟环境
deactivate # 退出该虚拟环境
```

**升级遇到的问题**

1. 错误一：

   ```shell
   django.core.exceptions.ImproperlyConfigured:
   The TEMPLATE_DIRS setting must be a tuple. Please fix your settings.
   ```

   解决：



```python
   # settings.py 
   PROJECT_PATH = os.path.dirname(os.path.realpath(__file__))
   TEMPLATE_DIRS = (os.path.join(PROJECT_PATH, 'templates'),)
   # https://stackoverflow.com/questions/25909833/django-core-exceptions-improperly-configured
```

   实际上导致这个异常的原因是，直接使用了字符串绝对路径，而测试环境是在另一个文件夹下的，所以此处是一个bug，后期如果文件夹对不上的话，会有问题，统一改用程序获得绝对路径。

1. 错误二：

   ```
   raise IOError("No translation files found for default language %s." % settings.LANGUAGE_CODE)；
   IOError: No translation files found for default language zh-cn.
   ```

   解决：

   Django 升级后中文包升级成了 zh-Hans，在 settings.py 中将 LANGUAGE_CODE = 'zh-cn' 改为 LANGUAGE_CODE = 'zh-Hans' 即可

2. 错误三：

   ```
   File "/home/work/test/django_update_test/se_monitor/seMonitorAPI/urls.py", line 1, in <module>
   from django.conf.urls import patterns, include, url
   ImportError: cannot import name patterns
   ```

   解决：

   https://stackoverflow.com/questions/38786036/importerror-cannot-import-name-patterns

   在Django1.10版本中，patterns方法已经被移除了，换成url即可。在 urls.py 中删除 patterns

   ```python
   from django.conf.urls import include, url
   
   urlpatterns=[
       url(r'^admin/', include(admin.site.urls)),
       url(........),
   ]
   ```

3. 错误四：

   ```
   File "/home/work/test/django_update_test/venv/lib/python2.7/site-packages/django/conf/urls/__init__.py", line 85, in url
       raise TypeError('view must be a callable or a list/tuple in the case of include().')
   TypeError: view must be a callable or a list/tuple in the case of include().
   ```

   解决：

   https://stackoverflow.com/questions/38744285/django-urls-typeerror-view-must-be-a-callable-or-a-list-tuple-in-the-case-of-in

   Django 1.10 版本后，url(r'^accounts/login/$', 'django_cas.views.login'), 后的重定向 views 不需要加引号了，改为 引入 views.py 。例如：

   ```
   from django.conf.urls import include, url
   
   from django.contrib.auth import views as auth_views
   from myapp import views as myapp_views # 引入 views
   
   urlpatterns = [ # 注意删除之前的 ''
       url(r'^$', myapp_views.home),
       url(r'^contact/$', myapp_views.contact),
       url(r'^login/$', auth_views.login),
   ]
   ```

4. 错误五

   ```
   File "/home/work/test/django_update_test/se_monitor/django_cas/views.py", line 6, in <module>
       from django.http import get_host, HttpResponseRedirect, HttpResponseForbidden
   ImportError: cannot import name get_host
   ```

   解决：

   https://stackoverflow.com/questions/15664951/improperlyconfigured-error-importing-middleware-app-middleware-cannot-import

   将 django_cas/views.py 中所有的 from django.http import get_host 改为 from django.http import HttpRequest 然后在程序中 HttpRequest.get_host()

5. 错误六

   ```
   File "/home/work/test/django_update_test/se_monitor/seMonitorAPI/run_case/management/commands/get_result.py", line 37, in Command
       option_list = BaseCommand.option_list + (
   AttributeError: type object 'BaseCommand' has no attribute 'option_list'
   ```

   解决：

   https://docs.djangoproject.com/en/1.11/releases/1.8/#custom-test-management-command-arguments-through-test-runner

   https://docs.djangoproject.com/en/1.11/howto/custom-management-commands/#accepting-optional-arguments

   option_list 是 Command 的参数，从 Django1.8 开始被弃用，

6. 错误七

   ```
   File "/home/work/test/django_update_test/se_monitor/seMonitorAPI/urls.py", line 26, in <module>
       url(r'^run-case/', seMonitorAPI_views.run_case),
   AttributeError: 'module' object has no attribute 'run_case'
   ```

   解决：urls.py 中有部分旧的API已经弃用，包括 views_zqc.py 和 views_sample.py 的所有API，还有部分 views.py 中的部分API

7. 错误八（存疑）

   ```
   Invalid HTTP_HOST header: '10.99.117.55:8999'. You may need to add u'10.99.117.55' to ALLOWED_HOSTS.
   ```

   解决：

   https://docs.djangoproject.com/en/1.11/ref/settings/#allowed-hosts

   ```
   # settings.py 中加入以下规则，其中 10.99.117.55 为代码部署机器的 IP
   ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '10.99.117.55']
   ```

   存疑：

   ALLOWED_HOSTS 字面意义上是允许访问的机器，为什么要把本机的 host 加入其中呢？

8. 错误九（到此 运行 python manage.py 0:8999 已可以正常运行，但是并不能保证所有 views.py 中的所有 API 都能正常运行，因为还没有调用）

   ```
   File "/home/work/test/django_update_test/se_monitor/seMonitorAPI/views.py", line 110, in get_result
       if "job_id" not in request.REQUEST:
   AttributeError: 'WSGIRequest' object has no attribute 'REQUEST'
   ```

   解决：

   https://docs.djangoproject.com/en/1.11/ref/request-response/#django.http.HttpRequest.POST

   从 Django 1.11 开始已经开始弃用 request.REQUEST， REQUEST 对 GET 和 POST 进行了封装，从 1.11 开始，GET 和 POST 开始区分开。

   把 views.py 中的 request.REQUEST 统一改为 request.GET

9. 错误十（measure_site 独有，多数据库配置问题）

   ```
   TypeError: allow_migrate() got an unexpected keyword argument 'model_name'
   ```

   解决：

   https://stackoverflow.com/questions/39282860/django-typeerror-allow-migrate-got-an-unexpected-keyword-argument-model-name

   measure_site 中配置了两个数据库，default 和 bugzilla

**API Test**

从 Nginx 的 log 中挑访问最频繁的 接口进行测试

| API                            | Demo                                                         | Result | Project      |
| ------------------------------ | ------------------------------------------------------------ | ------ | ------------ |
| get-result                     | http://10.99.117.55:8999/get-result/?job_id=search@wise@program@dbl@@@system@@@20181204155129818949 | pass   | seMonitor    |
| selfcheck                      | http://10.99.117.55:8999/selfcheck/                          | pass   | seMonitor    |
| source_list                    | http://10.99.117.55:8999/source_list/                        | pass   | seMonitor    |
| config_tasklist_groupby_source | http://10.99.117.55:8998/config_tasklist_groupby_source/?conditions=[{%22t%22%3A%22chained%22%2C%22k%22%3A%22product_info%22%2C%22v%22%3A%22search%2Cwise%22}]&showx_token=gr-release&showx_user=wanshuo | pass   | measure_site |
| config_tasklist_groupby_module | http://10.99.117.55:8998/config_tasklist_groupby_module/?conditions=%5B%7B%22t%22%3A%22chained%22%2C%22k%22%3A%22product_info%22%2C%22v%22%3A%22search%2Cwise%22%7D%5D&showx_token=gr-release&showx_user=wanshuo | pass   | measure_site |
| config_monitortype_ismodule    | http://10.99.117.55:8998/config_monitortype_ismodule/?conditions=%5B%7B%22t%22%3A%22chained%22%2C%22k%22%3A%22product_info%22%2C%22v%22%3A%22search%2Cwise%22%7D%5D&showx_token=gr-release&showx_user=wanshuo | pass   | measure_site |
| dashboard_last_detail          | http://10.99.117.55:8998/dashboard_last_detail/?conditions=%5B%7B%22x%22%3A%22det%22%2C%22t%22%3A%22multiSelect%22%2C%22k%22%3A%22product_info%22%2C%22v%22%3A%22search%2Ccambrian%2Cimage%22%7D%2C%7B%22t%22%3A%22daterange%22%2C%22k%22%3A%22daterange%22%2C%22v%22%3A%222018-11-28%2C2018-12-04%22%2C%22x%22%3A%22week%22%7D%2C%7B%22x%22%3A%22det%22%2C%22t%22%3A%22select%22%2C%22k%22%3A%22statistics_type%22%2C%22v%22%3A%22case_coverage%22%7D%2C%7B%22x%22%3A%22det%22%2C%22t%22%3A%22select%22%2C%22k%22%3A%22key%22%2C%22v%22%3A%22manager%22%7D%2C%7B%22x%22%3A%22det%22%2C%22t%22%3A%22select%22%2C%22k%22%3A%22cycle%22%2C%22v%22%3A%22day%22%7D%5D&showx_token=gr-release&showx_user=wanshuo | pass   | measure_site |
| result_debug_env_info          | http://10.99.117.55:8998/result_debug_env_info/?conditions=%5B%7B%22t%22%3A%22text%22%2C%22k%22%3A%22job_id%22%2C%22v%22%3A%22search%40wise%40dict%40nj%40%40%40system%40%40%4020181205110513977020%22%7D%5D&showx_token=gr-release&showx_user=wanshuo | pass   | measure_site |
| result_detail                  | http://10.99.117.55:8998/result_detail/?conditions=%5B%7B%22t%22%3A%22text%22%2C%22k%22%3A%22job_id%22%2C%22v%22%3A%22search%40wise%40dict%40nj%40%40%40system%40%40%4020181205110513977020%22%7D%5D&showx_token=gr-release&showx_user=wanshuo | pass   | measure_site |
| result_debug_mod_info          | http://10.99.117.55:8998/result_debug_mod_info/?conditions=%5B%7B%22t%22%3A%22text%22%2C%22k%22%3A%22job_id%22%2C%22v%22%3A%22search%40wise%40dict%40nj%40%40%40system%40%40%4020181205110513977020%22%7D%5D&showx_token=gr-release&showx_user=wanshuo | pass   | measure_site |
| sendHigroup                    | http://10.99.117.55:8998/sendHigroup/?start=20181205135700000000&end=20181205140200000000 | pass   | measure_site |
| dashboard_trend                | http://10.99.117.55:8998/dashboard_trend/?conditions=%5B%7B%22t%22%3A%22multiSelect%22%2C%22k%22%3A%22product_info%22%2C%22v%22%3A%22search%2Ccambrian%2Cimage%22%7D%2C%7B%22t%22%3A%22daterange%22%2C%22k%22%3A%22daterange%22%2C%22v%22%3A%222018-11-28%2C2018-12-04%22%7D%2C%7B%22t%22%3A%22select%22%2C%22k%22%3A%22statistics_type%22%2C%22v%22%3A%22deploy_coverage%22%7D%2C%7B%22t%22%3A%22select%22%2C%22k%22%3A%22key%22%2C%22v%22%3A%22value1%22%7D%2C%7B%22t%22%3A%22select%22%2C%22k%22%3A%22cycle%22%2C%22v%22%3A%22day%22%7D%5D&showx_token=gr-release&showx_user=wanshuo | pass   | measure_site |

**Command Test**

| Command                | Result           | Project      |
| ---------------------- | ---------------- | ------------ |
| self_check             | pass             | seMonitor    |
| trigger                | pass             | seMonitor    |
| get_result             | pass             | seMonitor    |
| sync_monster_cases     | pass             | seMonitor    |
| deploy_coverage_detail | pass             | measure_site |
| statistics_to_db       | pass             | measure_site |
| fenji_emulation_diff   | pass             | measure_site |
| get_fail_reason        | pass             | measure_site |
| backuptaskconf         | pass             | measure_site |
| fenji_completeness     | pass             | measure_site |
| get_noah_taskinfo      | pass(一直在运行) | measure_site |
| icafe_untreated        | pass             | measure_site |
|                        |                  |              |



**包含 command option 的 Command**

| Command                                      | Project      |
| -------------------------------------------- | ------------ |
| python manage.py sync_monster_cases day      | seMonitor    |
| python manage.py sync_monster_cases realtime | seMonitor    |
| python manage.py statistics_to_db all day    | measure_site |

**线上和测试环境测试切换步骤**

```
大部分的 command 和 接口都测了，我准备开始切了，按照你的思路，先在 21 机器上的 measure_site 进行测试，步骤如下：
1. 把测试有效的代码提交到一个新的分支
2. 在 21 机器上，搭一个 test 环境，把测试代码拉过去
3. 把 21 机器上的 measure_site 停掉，Nginx 流量打到 test 环境上
4. 线上环境升级 Django，拉取测试分支，对测试的代码进行部署
5. 线上环境部署完后，再把 Nginx 流量切到线上环境
6. 验证没问题后，把测试分支合到 master 分支，再切到 master 分支
```

**切流量后暴露的问题**

1. 问题一：

   对于 views.py 中提供的接口，

   measure_site 大部分接口返回的 json 串，是包含有 转义字符的 json 串。

   而 seMonitor 返回的 json 串，是正常的

   解决：

   比较 measure_site 的 sendHigroup（返回正常json alarm_notice_HiGroup） 和 result_debug_mod_info（异常json），发现 最后return 没有按照 Django 的 HttpResponse(json.dumps(return_list)) 正确规范。

   问题还是在于 REQUEST 没有清理替换干净。

2. 问题二：

   se_monitor 的 run_case/list/ 和 api-useinfo/ 不进行 template 的渲染，整个 template 失效。

3. 问题三：

   measure_site 中的 views_showx.py 中，有个别接口有异常：config_tasklist_groupby_module， case_compare

   ```
   File "/home/work/test/django_update_test/measure_site/measure_site/tools/tools.py", line 59, in decorator
       objects = func(request, *args, **kwargs)
     File "/home/work/test/django_update_test/measure_site/measure_site/views_showx.py", line 4130, in config_tasklist_groupby_module
       product_line = cond["product_info"].split(',')[0]
   KeyError: 'product_info'
   []
   {}
   
   ```

   ```
   File "/home/work/test/django_update_test/measure_site/measure_site/tools/tools.py", line 59, in decorator
       objects = func(request, *args, **kwargs)
     File "/home/work/test/django_update_test/measure_site/measure_site/views_showx.py", line 3832, in case_compare
       product_line = cond["product_info"].split(',')[0]
   KeyError: 'product_info'
   ```

   解决：

   已和 check，是 showx 端的机制问题，不会影响数据的获取