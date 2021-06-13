# HTML & CSS & DOM

[TOC]

HTML 和 CSS 是前端解耦的产物。HTML 负责展示的内容（文本和标签），CSS 负责展示的效果。

网上各种花里胡哨的网页，其本质上还是 HTML 标签加上 CSS 样式做出来的。HTML 是网页显示基础，花里胡哨是 CSS 的功劳。

## HTML

### Introduction

1. HTML 代码由标记组成，代码不区分大小写

2. HTML 代码的标准格式

   ```html
   <html>
       <head></head> <!--head部分中放一些初始化和配置信息，head 中的内容会先加载-->
       <body></body>
   </html>
   ```

3. HTML 标签就是一个**容器**，对容器中的内容进行操作，实际上就是在改变容器的属性值。

4. 特殊字符的格式: `&name;`

### Common Markup

| mark                                                  | Explanation                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| `<li> </li>`                                          | 无序列表                                                     |
| `<br/>`                                               | 换行                                                         |
| `<h1> </h1>1,2,3,4,5,6`                               | 标题                                                         |
| `&nbsp;`                                              | 空格                                                         |
| `<!-- -->`                                            | 注释                                                         |
| `<a href=""></a>`                                     | 超链接标签，用来链接资源，href 的值的不同，解析方式也不同，可以解析 url, Email, file 资源(文本，图片), |
| `<iframe src="http://www.xxx.xx.com/1.js"> </iframe>` | 画中画标签                                                   |
| `<form></form>`                                       | 用于创建供用户输入的 HTML 表单。实际上是一个**表单容器**form 标签包含一个或多个如下的表单: `<input>`, `textarea`,`button`,`select`, `option`, `optgroup`, `fieldset`, `label` |
| `<textarea>`                                          | 一个大的 input                                               |
| `<select>`                                            | 下拉选项                                                     |
| `<div>`                                               | 用来封装整行区域(换行)                                       |
| `<span>`                                              | 用来封装行内区域(不换行)                                     |
| `<p>`                                                 | 段落标签                                                     |
|                                                       |                                                              |
|                                                       |                                                              |

### 标签的分类

1. 块级标签（元素）

   标签结束后都有换行

2. 行内标签（元素）

   标签结束后无换行

### 超链接标签详解

超链接标签的作用：链接资源（注意其并不只是用来链接到其他网页）

超链接标签当有了 href 属性，才会有点击效果；

href 属性中协议的不同，其解析方式也不同

**href 协议**

```html
<!--http协议，表示链接到网址-->
<a href="http://www.sohu.com.cn" target="_blank">新浪网站</a> 

<!--图片协议，表示链接到图片-->
<a href="imgs/1.jpg">美女图片</a>

<!--邮箱协议，表示链接到邮箱-->
<a href="mailto:abs@sina.com">联系我们</a>

<!--迅雷协议，表示链接到迅雷-->
<a href="thunder://wertyuioasdfghjklwertyuio==">复仇者联盟</a>

<!--自定义超链接点击效果-->
<a href="javascript:void(0)" onclick="alert('我弹')">这是一个超链接</a>
```

**取消超链接效果**

```html
<a href="javascript:void(0)">这是一个超链接</a>
```

**利用超链接实现锚**

```html
<a name=top>顶部位置</a>
<hr/>
<img src="111.jpg" height=900 width=400 border=10/>
<hr/>
<a name=center>中间位置</a>
<hr/>
<img src="111.jpg" height=900 width=400 border=10/>
<a href="#top">回到顶部位置</a>
<a href="#center">回到中间位置</a>
```

**表单详解**

```html
<!--
如果要给服务端提交数据，表单中的组件必须有name和value属性。
否则服务器不知道这些标签中的值究竟是什么
-->
<form>
	输入名称： <input type="text" name="user" value="" /><br/>
	输入密码： <input type="password" name="psw" /><br/>
	选择性别： <!--单选，必须放在一个组里，name 是一样的-->
	<input type="radio" name="sex" value="nan" />男
	<input type="radio" name="sex" value="nv" checked="checked" />女
	<br/>
	选择技术： <!--复选-->
	<input type="checkbox" name="tech" value="java"/>JAVA
	<input type="checkbox" name="tech" value="html"/>HTML
	<input type="checkbox" name="tech" value="css"/>CSS
    <BR/>
    选择文件： 
    <input type="file" name="file"/>
    <br/>
    一个图片： <!--图片具备 submit button 的功能，可以替代 submit-->
    <input type="image" src="11.jpg"/>
    <br/>
    隐藏组件： <!--数据不需要客户端知道，但是可以将其提交服务端。 -->
    <input type="hidden" name="myke" value="myvalue"/><br/>
    一个按钮： 
    <input type="button" value="有个按钮" onclick="alert('有个阿牛')"/>
    <br/>
    <select name="country">
        <option value="none">--选择国家--</option>
        <option value="usa">美国</option>
        <option value="en">英国</option>
        <option value="cn" selected="selected">中国</option>
    </select>
    <textarea name="text"></textarea>
    <br/>
    <!--重置表单-->
    <input type="reset" value="清除数据"/>
    <!--提交数据-->
    <input type="submit" value="提交数据"/>
</form>
```



## CSS

**Cascading Style Sheets (层叠样式表)**

https://www.runoob.com/cssref/css-reference.htmlasp

### Common Style

| style   | Explanation | Demo                      | Reference                                                    |
| ------- | ----------- | ------------------------- | ------------------------------------------------------------ |
| padding | 内边距      | `padding: 20px 20px; `    |                                                              |
| margin  | 外边距      | `margin:2cm 4cm 3cm 4cm;` | [reference ](http://www.w3school.com.cn/cssref/pr_margin.asp) 上右下左（顺时针） |
|         |             |                           |                                                              |

### CSS 资源

* [Clikc to Copy](<https://cssfx.dev/>)

### CSS 开发技巧

* CSS 可以在 Chrome 浏览器中进行编辑，所见即所得，特别好用！
* GitHub 上有大量的 CSS 库，当我们需要什么特效时，直接去 Github 搜索即可，然后导入即可用
* 正常开发时，通常是需要什么特效，就去 Github 上找相应的 CSS 类库，然后加载进来直接使用即可

### CSS 代码格式

```css
div /*选择器名称*/
{
    属性名: 属性值; 
    属性名: 属性值; 
    属性名: 属性值;
}
```

### 选择器

选择器用于指定 css 要作用的标签，标签的名称就是选择器，意为：选择哪个容器。

选择器有三大类：

1. html 标签名选择器，即选择器名称为 html 的标签名

   ```css
   div /*选择所有 <div> 元素。*/
   {
       属性名: 属性值; 
   }
   ```

2. class 选择器，即选择器名称为标签中的 class 属性值

   ```css
   .intro{ /*选择 class="intro" 的所有元素。*/
       
   }
   ```

3. id 选择器，即选择器名称为标签中的 id 属性

   ```css
   #firstname{ /*选择 id="firstname" 的所有元素。*/
       
   }
   ```

每一个标签都可以定义 class 和 id 属性，用于对标签进行标识，方便对标签进行同意管理，多个标签的 class 属性值可以相同，而 id 要唯一。

### HTML 和 CSS 的两种结合方式

1. **同一个文件中的样式复用 ——> 将样式抽取到 head 标签中**

   每个 html 标签都可以定义 style 属性，该属性的值就是 css 代码；通常用 style 标签的方式对通用的 css 进行抽取，然后定义在 head标签中（head 最先加载）

   ```html
   <head>
       <style type="text/css"> <!-- text/css 表示内容是 css 代码 -->
           <!-- css 代码 -->
           div{ <!-- div 表示下列 css 样式只对 div 生效 -->
               background-color: #000;
               color: #F00;
           }  
           
           div.body{ /* 为 div 标签定义一个名叫 body 的 css样式，用于类加载 */
               background-color: #000;
               color: #FFF;
           }
   
           .body{ /* 定义一个名叫 body 的 css样式，用于类加载 */
               background-color: #000;
               color: #FFF;
           }
           
           /*关联选择器，选择器中的选择器；空格隔开*/
           span b{ /* 定义 span 中的 b 标签的样式，选择器嵌套 */
               
           }
           
           /*组合选择器，多个标签使用同一种样式, 逗号隔开*/
           .body, span b{ /* 定义 span 中的 b 标签的样式 */
               
           }
          
           
       </style> 
   </head>
   
   <body>
       
       <div style="background-color: #000; color: #F00;"> <!-- 最直接的 css -->  
       </div>
       
   	<div class="div.body"> <!-- 使用 div标签的类选择器来指定 css --> 
       </div>
       
       <span class="body"> <!-- 使用类选择器来指定 css -->
           <b></b>
       </span>
   
   </body>
   ```

2. **多个文件中的样式复用 ——> 将样式抽取到一个单独的 css 文件中**

   创建 div.css

   ```css
   @charset "utf-8";
   
   div{ /* 为 div 标签定义css样式，用于css加载 */
   	background-color: #000;
       color: #FFF;
   }
   ```

   在 head 标签中通过 css 代码导入该样式

   ```html
   <head>
       <style type="text/css"> /* text/css 表示内容是 css 代码 */
           @import url(div.css) /* 通过 css 代码导入*/
       </style> 
   </head>
   ```

   或者在 head 标签中通过 html 标签导入该样式

   ```html
   <head>
       <link rel="stylesheet" href="div.css" type="text/css" />
   </head>
   ```

### CSS 样式优先级

css 样式可以覆盖，其优先级为：

**由上到下，由外到内，优先级由低到高。**

**标签选择器 < 类选择器 < ID 选择器 < style 属性**

### 伪元素选择器

预定义好的选择器，常用于定义超链接的样式

```css
a:link{ /*超链接没点击之前的状态*/
    text-decoration: none; /*取消下划线*/
    color: #BABABA;
}

a:hover{ /*鼠标悬停*/   
}

a:active{ /*鼠标点击*/   
}

a:visited{ /*访问后*/   
}

p:first-letter{ /*定义段落首字母的样式*/    
}

p:first-letter{ /*定义段落首字母的样式*/    
}

input:focus{ /*定义段落首字母的样式*/    
    
}

/*注意，link, hover, first-letter 这些伪元素，对其他常用标签也起作用*/
```

### 盒子模型

盒子模型：div + css，一个 div 就是一个盒子

```css
.post {
  margin: 1em auto; /*外边距*/
  padding: 10px 10px; /*内边距*/
  background-color: #fff;
  border: 1px solid #ddd; /*盒子边框*/
  box-shadow: 0 0 2px #ddd;
}

.posts  {
  .post:first-child {
    margin-top: 0;
  }
  .post-title {
    font-size: 1.2em;

    .post-title-link {
      color: #368CCB;
      text-decoration: none;
    }
  }

  .post-sub-info {
    color: #BABABA;
    font-size: 0.7em;
    a {
      color: #BABABA;
      text-decoration: none;
      &:hover {
        color: #368CCB;
      }
    }
  }  
}
```

## GET & POST

**get 提交 和 post 提交 的区别**

```
表单向服务器提交数据有两种方式：get 提交 和 post 提交
1,
    get提交，提交的信息都显示在地址栏中。
    post提交，提交的信息不显示地址栏中。
2，
    get提交，对于敏感的数据信息不安全。
    post提交，对于敏感信息安全。
3，
    get提交，对于大数据不行，因为地址栏存储体积有限。
    post提交，可以提交大体积数据。
4，
    get提交，将信息封装到了请求消息的请求行中。
    post提交，将信息封装到了请求体中。
```

综上，表单提交数据到服务器应该采用 **post提交**

**Demo**

```html
<!--action 为服务器地址，method 定义提交方式-->
<form action="http://10.1.31.69:9090" method="post">
    <!--将所有的表单放入 table 中进行格式化-->
    <table border="1" bordercolor="#0000ff" cellpadding=10 cellspacing=0 width=600>
        <tr>
            <th colspan="2">注册表单</th>
        </tr>
        <tr>
            <td>用户名称： </td>
            <td>
                <input type="text" name="user" />
            </td>
        </tr>
        <tr>
            <td>输入密码： </td>
            <td>
                <input type="password" name="psw" />
            </td>
        </tr>
        <tr>
            <td>确认密码： </td>
            <td>
                <input type="password" name="repsw" />
            </td>
        </tr>
        <tr>
            <td>选择性别： </td>
            <td>
                <input type="radio" name="sex" value="nan" />男
                <input type="radio" name="sex" value="nv" />女
            </td>
        </tr>
        <tr>
            <td>选择技术： </td>
            <td>
                <input type="checkbox" name="tech" value="java" />JAVA
                <input type="checkbox" name="tech" value="html" />HTML
                <input type="checkbox" name="tech" value="css" />CSS
            </td>
        </tr>
        <tr>
            <td>选择国家： </td>
            <td>
                <select name="country">
                    <option value="none">--选择国家--</option>
                    <option value="usa">--美国--</option>
                    <option value="en">--英国--</option>
                    <option value="cn">--中国--</option>
                </select>
            </td>
        </tr>
        <tr>
            <th colspan="2">
                <input type="reset" value="清除数据" />
                <input type="submit" value="提交数据" />
            </th>
        </tr>
    </table>
</form>
```

## 和服务端交互的三种方式

1. 地址栏输入 url 访问 get
2. 超链接 get
3. 表单 get, post

## DOM

Document Object Model

HTML DOM 定义了所有 HTML 元素的*对象*和*属性*，以及访问它们的*方法*。

换言之，HTML DOM 是关于如何获取、修改、添加或删除 HTML 元素的标准。