# javascript 102

[TOC]



## 单线程和 event-loop

http://www.ruanyifeng.com/blog/2014/10/event-loop.html

javascript 是单线程，不可以在程序中写多线程。

JavaScript 把异步的任务，单独管理，如果异步任务完成，则往任务队列中添加一个事件。JavaScript 执行完所有同步任务后，就会去执行任务队列中的异步任务。



## 模块化编程

ES5 https://www.liaoxuefeng.com/wiki/1022910821149312/1023027697415616



## ES6 

### 解构赋值

```javascript
let point={x: 1, y: 3, z: 5};
const {x, y} = point; 
console.log(x);
```



### backtick 反引号



### 块级作用域

**块语句**（或其他语言的**复合语句**）用于组合零个或多个语句。该块由一对大括号界定。只要出现大括号，就是一个块级作用域。

`let` 和 `const` 声明的变量，其作用域只局限于其所处的块级作用域。

```js
const c = 1;
{
  const c = 2;
}
console.log(c); // 输出1, 而且不会报错
```

注意，位于块范围之内的 `const c = 2` 并不会抛出`SyntaxError: Identifier 'c' has already been declared`这样的语法错误，因为在它自己的块中它可能是唯一一个被声明的常量。

```js
var a = [];
for (var i = 0; i < 10; i++) {
      a[i] = function () {console.log(i);};
}
a[0]();                // 10
a[1]();                // 10
a[6]();                // 10

/********************/

var a = [];
for (let i = 0; i < 10; i++) {
      a[i] = function () {console.log(i);};
}
a[0]();                // 0
a[1]();                // 1
a[6]();                // 6
```



### let, const, var

var 声明的变量，其作用域是函数内，其存在变量提升现象；let 声明的变量，其作用域是代码块内，不存在变量提升现象。

在程序和方法的最顶端，**`let`**不像 **`var`** 一样，**`let`**不会在全局对象里新建一个属性。比如：

位于函数或代码顶部的**`var`**声明会给全局对象新增属性, 而**`let`**不会。例如:

```
var x = 'global';
let y = 'global';
console.log(this.x); // "global"
console.log(this.y); // undefined
```

let 和 const 唯一的区别，就是 const 用来表示常量，let 用来表示变量



### export

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export

多行暴露

```javascript
//a.js
export function aa1(){
    console.log('分别导出1');
}
export function aa2(){
    console.log('分别导出2');
}

//index.js
//解构赋值
import { aa1 , aa2 } from 'a.js'

```



统一暴露

```javascript
//b.js
function bb1(){
    console.log('综合导出1');
}
function bb2(){
    console.log('综合导出2');
}
export {bb1,bb2}


//index.js
//解构赋值
import {aa1,aa2} from 'b.js'
```



默认暴露

默认暴露只能暴露一次。

```javascript
//c.js
export default function cc(){
    console.log('默认导出');
}

//index.js
//使用自定义变量
import c from 'c.js'
c.cc()
```





## window 对象

所有浏览器都支持 window 对象。它表示浏览器窗口。

所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。

全局变量是 window 对象的属性。

全局函数是 window 对象的方法。

甚至 HTML DOM 的 document 也是 window 对象的属性之一：

`window.document.getElementById("header");`

与此相同：

`document.getElementById("header");`



## JS 边学边记

* 语句可以不加分号，VUE 的源码就不带分号
* window 对象

