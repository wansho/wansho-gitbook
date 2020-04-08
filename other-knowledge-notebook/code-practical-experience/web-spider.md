# 爬虫总结
[TOC]

## BeautifulSoup

### Beautifulsoup 版本问题

    BeautifulSoup 3 的 find_all 版本为 findAll # BeautifulSoup3 已经停止更新，被 4 取代
    BeautifulSoup 4 的 find_all 版本为 find_all
    两个版本其他方法还有很多的不同

### 导包
    from bs4 import BeautifulSoup

### 常见的用法

**模糊查询**

    # 获取包含 class 为 c ，存在id属性的 div 很重要
    microblog_soups = soup.find_all('div', attrs = {'class' : 'c'}, id = re.compile('.*'))
    comment = microblog_soup.find_all('a', attrs = {'class' : 'cc'}, href = re.compile(re_str))

**获取属性**

    # 获取用户主页 https://weibo.cn/a813689091
    index = microblog_soup.find('a',attrs = {'class' : 'nk'}).get('href')

**获取文本**

    content = microblog_soup.find('span',attrs = {'class' : 'ctt'}).get_text().strip()

**网页修补 & 保存**

    '''
    用beautifulsoap 修补一下网页，并存储，用来研究
    '''
    def fix_and_write_html(html_str,path):
        # 修补html
        soup = BeautifulSoup(html_str,'html.parser',from_encoding="gb18030")
        fixed_html = soup.prettify()
        writer = open(path, 'w', encoding='utf-8')
        writer.write(fixed_html)
        writer.close()
        return fixed_html


## 常用代码
```
def downloadHtml(url,headers):
    html = -1 # 如果返回 -1，说明爬取失败
    try:
        html = requests.get(url, headers=headers).text
    except Exception as e:
        print(e)
        return html
    return html
'''
用beautifulsoap 修补一下网页，并存储，用来研究
'''
def fix_and_write_html(html_str,path):
    # 修补html
    soup = BeautifulSoup(html_str,'html.parser',from_encoding="gb18030")
    fixed_html = soup.prettify()
    writer = open(path, 'w', encoding='utf-8')
    writer.write(fixed_html)
    writer.close()
    return fixed_html
```

## 解析xml
事实上，读取到的xml和HTML没啥区别，解析方式也与HTML没啥区别
```python
comment_url = 'https://comment.bilibili.com/' + cid + '.xml'
comment_text = requests.get(comment_url, headers=xml_headers).content
comment_selector = etree.HTML(comment_text)
comment_content = comment_selector.xpath('//i')
comment_list = []
for comment_each in comment_content:
comments = comment_each.xpath('//d/text()')
for comment in comments:
comment_list.append(comment)
```

## 下载网页的两种方式

### urllib.request

```
from urllib.request import urlopen
from urllib.request import Request

req = Request(url=url, headers=headers)
try: 
    # 这里read()后得到的其实是byte类型的数据，必须通过decode()转成字符型的，这个步骤经常出问题
    html = urlopen(req).read().decode('utf-8')
except Exception as e:
    print(e)
return html
```

### request
```
import requests

# 这个在B站上试了，没有出现问题
html = requests.get(url, headers=headers).text
```

##  爬虫的原网页分析（url构造分析与爬取内容分析）

有些时候，我们要爬取的内容在源代码中没有显示，目前知道有两个可能：
1. 网页内容是动态加载的
2. 网页内容存储在一个文件中

对于第一种可能，我暂时还不懂怎么爬取，但是第二种可能，其实是有迹可循的。这里以哔哩哔哩为例。

我们想要爬取哔哩哔哩的弹幕，但是根据文字搜索源码找不到弹幕，但是弹幕又是提前加载好的，动态加载的可能性很小，所以我们猜测弹幕应该是存储在一个文件中，从服务器发过来，然后再解析。

那么，如何分析服务器发过来的文件？ 这是有方法的。

通常步骤是，在浏览器的network中刷新，然后下面列表中内容就是从服务器返回的各种数据。通过分析，我们找到了一个可疑文件，打开后，就是我们要寻找的弹幕文件。




## 爬虫代码的健壮性

1. beautifulsoap 要进行判空处理

2. 要对断网的情况进行异常处理

3. 要对IO进行异常处理

4. 要小心测试反爬虫检测的频率

## Selenium 自动登陆，获取cookie 和 网页
```
import json
import urllib2

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def get_html(username, password):
    driver = webdriver.Chrome()
    driver.get('http://nmg-compass.baidu.com:8081/index')
    assert "INF DC COMPASS" in driver.title 
    login_link = driver.find_element_by_id("login-submit")
    ActionChains(driver).move_to_element(login_link).click().perform()
    login_name = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "username"))
    )
    login_password = driver.find_element_by_id("password")
    login_name.send_keys(username)
    login_password.send_keys(password)
    login_button = driver.find_element_by_id("login-submit")
    login_button.click()
    
    url = 'http://nmg-compass.baidu.com:8081/history?page=1&size=5000&advfilter=true&projcontain=image&flowcontain=&usercontain=&status=0&begin=07/20/2018 12:00 AM&end=07/21/2018 12:00 AM'
    driver.get(url)
    driver.refresh() # 有时候 get 不出来，要 刷新一下
    locator = ("id", "next")
    WebDriverWait(driver, 10).until(    
        EC.text_to_be_present_in_element(locator, "Next")
    )

    html = driver.page_source
    if 'Next' not in html: 
        print "采集的网页有问题"
        html = ''
      
    driver.close()
    
    return html

if __name__ == '__main__':
    WeiBoAccounts = [
            {'username': 'ws949178872@hotmail.com', 'password': 'ws6226067'}
            ]
    username = WeiBoAccounts[0].get('username')
    password = WeiBoAccounts[0].get('password')
    print(get_cookie_from_weibo(username, password))

```

## 经验总结

1. beautifulsoap 也可以解析xml文件

2. 如果不是对效率要求特别高,可以不需要进行断点存储或爬取,只需要继续从当天开始爬取,然后去重即可.

3. HTTP Error 403: Forbidden  是被服务器拒绝访问的异常,
  一旦一个账号被forbidden了,那么该账号就已经被列入了黑名单,成为了重点检测的对象.

4. 爬虫的代码设计过程充满了随机性，有些错误是不可控的，只能在bug出现的时候去及时修复bug

5. 爬取数据的时候,最好不要开启vpn,否则会出现意想不到的错误,例如爬取速度非常慢

6. Common Crawl 是一个非盈利的组织，他们爬取网站的数据并免费共享出去

7. 简单的页面内容解析用正则表达式足矣，复杂而且有规律的内容，才用到 bs 或者 xpath
