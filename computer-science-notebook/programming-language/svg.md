# SVG

[TOC]

## 我的思考

SVG 最本质的突破，是用纯文本来描述图像。

纯文本可以写论文：Latex

纯文本可以写 ppt：Marpit

纯文本可以画图：SVG

纯文本可以记笔记：Markdown

下一步：纯文本可以做视频？（其实已经实现了，机器学习用文本生成视频，只是没有形成一个通用的协议）

纯文本可以干这么多事情，本质上是制定了各种协议，然后由协议来实现的。



## Wiki

[SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics)

**Scalable Vector Graphics** (**SVG** 可缩放矢量图) is an [Extensible Markup Language](https://en.wikipedia.org/wiki/Extensible_Markup_Language) (XML)-based [vector image format](https://en.wikipedia.org/wiki/Vector_image_format) for [two-dimensional](https://en.wikipedia.org/wiki/Two-dimensional) graphics with support for interactivity and animation. The SVG specification is an [open standard](https://en.wikipedia.org/wiki/Open_standard) developed by the [World Wide Web Consortium](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium) (W3C) since 1999.

SVG images and their behaviors are defined in XML text files. This means that they can be [searched](https://en.wikipedia.org/wiki/Search_algorithm), [indexed](https://en.wikipedia.org/wiki/Subject_indexing), [scripted](https://en.wikipedia.org/wiki/Scripting_language), and [compressed](https://en.wikipedia.org/wiki/Data_compression). As XML files, SVG images can be created and edited with any [text editor](https://en.wikipedia.org/wiki/Text_editor), as well as with [drawing software](https://en.wikipedia.org/wiki/Drawing_software).

All major modern [web browsers](https://en.wikipedia.org/wiki/Web_browser)—including [Mozilla Firefox](https://en.wikipedia.org/wiki/Mozilla_Firefox), [Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer), [Google Chrome](https://en.wikipedia.org/wiki/Google_Chrome), [Opera](https://en.wikipedia.org/wiki/Opera_(web_browser)), [Safari](https://en.wikipedia.org/wiki/Safari_(web_browser)), and [Microsoft Edge](https://en.wikipedia.org/wiki/Microsoft_Edge)—have [SVG rendering support](https://en.wikipedia.org/wiki/Comparison_of_layout_engines_(Scalable_Vector_Graphics)).

SVG 图片的特点：

* 矢量图，放大不失真
* 可交互，支持动画
* 文本文件，采用 xml 语言定义，主流浏览器可渲染



## 阮一峰 SVG 入门教程

[link](http://www.ruanyifeng.com/blog/2018/08/svg.html)

SVG 是一种基于 XML 语法的图像格式，全称是可缩放矢量图（Scalable Vector Graphics）。其他图像格式都是基于像素处理的，SVG 则是属于对图像的形状描述，所以它本质上是文本文件，体积较小，且不管放大多少倍都不会失真。

SVG 文件可以直接插入网页，成为 DOM 的一部分，然后用 JavaScript 和 CSS 进行操作。

```html
<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <svg
             id="mysvg"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 800 600"
             preserveAspectRatio="xMidYMid meet"
             >
            <circle id="mycircle" cx="400" cy="300" r="50" />
        <svg>
    </body>
</html>
```

上面是 SVG 代码直接插入网页的例子。

SVG 代码也可以写在一个独立文件中，然后用

```html
<iframe> <embed> <object> <img>
```

等标签插入网页。

```html
<img src="circle.svg">
<object id="object" data="circle.svg" type="image/svg+xml"></object>
<embed id="embed" src="icon.svg" type="image/svg+xml">
<iframe id="iframe" src="icon.svg"></iframe>
```

CSS 也可以使用 SVG 文件。

```css
.logo {
background: url(icon.svg);
}
```



SVG 文件还可以转为 BASE64 编码，然后作为 Data URI 写入网页。

```html
<img src="data:image/svg+xml;base64,[data]">
```



## 用 JavaScript 生成 SVG 标签

实际应用中，我们不可能手写 SVG，可以由 JavaScript 生成的。



## 给 SVG 标签添加事件

给标签加标识，然后对标识添加事件。本质上是对 svg 标签添加点击事件。

```javascript
// 给所有的线和圆添加鼠标移到上面的事件
var lines = document.getElementsByClassName('lineStyle');
var circles = document.getElementsByClassName('circleStyle');
for(var i=0; i<circles.length; i++){
  // onmouseover 事件发生在鼠标指针移动到元素或它的子元素上时。
  circle[i].onmouseover = function(){
  
  }
  circle[i].onmouseleave = function(){
  
  }
}
for(var i=0; i<lines.length; i++){
  // onmouseover 事件发生在鼠标指针移动到元素或它的子元素上时。
  lines[i].onmouseover = function(){
  
  }
  lines[i].onmouseleave = function(){
  
  }
}
```



## 运动动画

* 原生 JS 操作 JQuery 的 animate
  * duration
  * easing
  * step
* svg 运动标签 animate
  * attributeName
  * dur
  * from
  * to
