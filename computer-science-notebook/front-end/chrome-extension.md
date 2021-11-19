# Chrome-Extension

[TOC]

## Tutorial

* 官方Tutorial: https://developer.chrome.com/extensions
* How to debug: https://developer.chrome.com/tut_debugging
* API: https://developer.chrome.com/apps/api_index
* [360翻译的中文文档](http://open.chrome.360.cn/)
* [中文 Blog 教程](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)

## Chrome Extension Introduction

Chrome extension 是由 HTML, CSS, JavaScript 开发的在浏览器上运行的轻量级 Web 程序, 本质上是一个 web page, 其可以使用浏览器提供的 API.

一个 Chrome 扩展应该是一把锋利的小刀，就像 Linux 系统的一个命令一样，只完成一件或一类任务。

### 扩展工作方式

1. 和网页交互

   Extension 可以使用 content-scripts 和网页进行读写交互

2. 和服务器交互

   可以使用 cross-origin XMLHttpRequests 和服务器进行交互

### API 种类

有两类可用的 API

#### Browser API

浏览器本身自带的 API

#### Extension Specific API

Chrome 为扩展定制的API

#### Asynchronous vs. synchronous methods 

大多数的 Chrome API 都是异步的。如果 Extension 想要获取一个异步方法的结果，其可以往方法中传入一个回调方法（callback function），callback function 可能要执行很久。异步方法往往不需要加入返回值，因为异步方法会马上执行并返回一个返回值，但是这个返回值往往是空的，因为 callback function 还没有执行，真正想要获取异步方法的返回值，应该在 callback 中获取。

一个标准的异步方法：

```javascript
// Signature for an asynchronous method
chrome.tabs.query(object queryInfo , function callback )
```

异步方法往往没有返回值，返回值的处理放在了 callback 方法中

同步方法通常是有返回值的。

## 代码 Architecture 

```
-- app
   -- Manifest
   -- Background Script # extension's event handler 事件处理
   -- UI Elements # Chrome Extension 的 UI 包括 html 和 js事件处理
   -- Content Script # 和前端页面进行交互
   -- Options Page
```

![框架](http://assets.processon.com/chart_image/5c98d6b5e4b0f88919bbbfd0.png)

### Background Script 

* background.js 是整个应用的事件处理器，里面包含了对浏览器事件的监听器
* Background Script 相当于整个 app 的基类，貌似除了 content-script 不能调用其中的方法外，其他所有的 js  脚本都继承自该基类（个人理解）

### UI Elements

#### UI 分类

* browser actions

  如果 extension 和绝大多数的页面都有关，则选用 browser actions

* page actions

  如果 extension 仅和少数页面相关，则选用 page actions

* context menus

* Other UI

#### popup 设计

[官方文档](https://developer.chrome.com/extensions/user_interface) [官方Demos](https://developer.chrome.com/extensions/samples)

如何设计 popup.html ？看官网 Demo ！

注意：

* popup.html 中不能加入 JavaScript 代码，HTML 和 Javascript 必须分离开。
* popup.js 中的 console.log 需要对 popup 页面右击点击查看才能看到。
* popup.html 中的超链接 `<a>` 不会生效，不知为何。 

### Content Scripts

By using the standard [Document Object Model](http://www.w3.org/TR/DOM-Level-2-HTML/) (DOM), they are able to read details of the web pages the browser visits, make changes to them and pass information to their parent extension.

Extension 使用 content script 和前端网页进行读写交互（也只有content script 可以和前端页面进行交互），content script 利用 DOM 和网页进行交互，可以对前端进行改动。Content-Script 在页面加载的时候会自动执行。Content-Script 是一个相对隔离的脚本，只与前端页面进行交互。

* Content script 可以利用 [Messaging](https://developer.chrome.com/extensions/messaging) 和 background.js / popup.js 进行交互。
* Content Script 已经在 manifest 中设置了 在页面加载完成后执行.
* Content Script 只限于 DOM 操作，做 html，css，js 的相关操作，不能完成与服务器交互的操作，事实上，Google 对 Content Script 的限制非常严格，因为 Content-Script 可以轻而易举的获取到用户的隐私
* Content Script 中的 log 会打印在其操作的页面上，也就是 Web page 上，F12

#### ContentScript 前端注入 HTML 代码

[demo](https://developer.chrome.com/extensions/examples/api/eventPage/basic/content.js)

添加 DOM 的三种方式。

```JavaScript
function appendText()
{
    var txt1="<p>文本。</p>";              // 使用 HTML 标签创建文本
    var txt2=$("<p></p>").text("文本。");  // 使用 jQuery 创建文本
    var txt3=document.createElement("p");
    txt3.innerHTML="文本。";               // 使用 DOM 创建文本 text with DOM
    $("body").append(txt1,txt2,txt3);        // 追加新元素
}
```

### Option page

option page 可以对 extension 进行个性化定制。

## 其他功能

### Communication between pages 通信功能

Different components in an extension often need to communicate with each other. Different HTML pages can find each other by using the [`chrome.extension`](https://developer.chrome.com/extensions/extension) methods, such as `getViews()` and `getBackgroundPage()`. Once a page has a reference to other extension pages the first one can invoke functions on the other pages and manipulate their DOMs. Additionally, all components of the extension can access values stored using the [storage](https://developer.chrome.com/extensions/storage) API and communicate through [message passing](https://developer.chrome.com/extensions/messaging).

所有的组件，都可以获取存储到本地的数据，也可以互相通信。

#### sendMessage 方法

[官方文档](https://developer.chrome.com/apps/runtime#method-sendMessage)

sendMessage 方法用于 extension 中不同的模块进行通信，当我们发送了一条消息时，所有的模块的runtime.onMessage 都会响应。但是，runtime.sendMessage 不能发送 message 到 content-script，要想和 content-script 进行通信，就要使用 [tabs.sendMessage](https://developer.chrome.com/extensions/tabs#method-sendMessage) 发消息，content-script 才能收到。tabs.sendMessage 是专门设计用来和指定的 content-script 进行通信的。

注意，对于 tabs.sendMessage 方法，如果我们打开了 DevTools，那么返回的 tabs 数组将为空 [StackOverflow](https://stackoverflow.com/questions/29681477/background-script-messaging-with-javascript)

```JavaScript
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, {command: "start_rendering"});
   }
);
```

### 数据存储  storage

[storage tutorial](https://developer.chrome.com/storage)

#### 本地少量数据存储 sync

```JavaScript
chrome.storage.sync.set({color: '#3aa757'}, function() {
	console.log("The color is green.");
});
```

#### 本地大量数据存储 local

```JavaScript
chrome.storage.local.set({color: '#3aa757'}, function() {
	console.log("The color is green.");
});
```

#### 两种存储方式的异同点

* 本地存储的对象不仅限于 string 类型，也可以存储字典

* `sync` 存储的数据有大小限制，最大为 8k，`local` 能存储的比较大，为 5M
* `sync` 方式存储的数据，会存储到用户的云上，并且会在所有的 Chrome 客户端进行同步，而 `local` 方式只局限于本地的存储

### 权限控制

大多数 API，包括 存储 / 外域访问 / 前端代码注入，都需要在 manifest 中注册，用于权限管理。

当我们发现程序怎么调试都有问题的时候，往往是我们忽略了权限的配置。

### 开发注意事项

- Background scripts 和 其他重要的 components 必须在 manifest 中注册
- 要实现外域（外网）访问，需要在 permission 中加入要访问的 域名，用通配符

## Chrome Extension 国际化

[Tutorial](https://developer.chrome.com/webstore/i18n)

[Doc](https://developer.chrome.com/extensions/i18n)

## bootstrap-material-design + Chrome Extension

注意，在导入 bootstrap 的过程中，js 应该按照以下的顺序导入（不能乱序）：

```html
<script src="static/js/jquery-2.0.3.min.js"></script>
<script src="static/js/popper.min.js"></script>
<script src="static/js/bootstrap-material-design.js"></script>
```

另外，由于 Chrome Extension 规定了 html 代码中不能有动态执行的 js 代码，所以我们需要在 popup.js 加入以下的代码，使得 bootstrap 起作用：

```JavaScript
$(document).ready(function() { $('body').bootstrapMaterialDesign(); });
```

## Chrome 插件收藏

* [NSFW](https://github.com/nsfw-filter/nsfw-filter) 过滤 Not Safe for Work 的图片

