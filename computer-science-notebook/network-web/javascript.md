# Javascript

[TOC]

## JS Tutorial

[[A re-introduction to JavaScript]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

[JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript) is notorious for being [the world's most misunderstood programming language](http://crockford.com/javascript/javascript.html).

臭名昭著！

### Overview

1995 created, Brendan Eich, Netscape

远景公司将 JavaScript 托管给 ECMA(European standards organization)，ECMA 负责 JavaScript 的维护，所以 Javascript 又叫做 ECMAScript，最新的 JavaScript 版本是 ECMAScript edition 6 2015 (**ES2015**, **ES6**)。

JavaScript 没有输入输出的概念，其与外界通信取决于它运行在什么样的环境中：browser, Adobe Acrobat, Adobe Photoshop, SVG images, server-side environments such as [Node.js](http://nodejs.org/), embedded computers, GNOME，JavaScript 在这些环境下（**前端后端**）都可以运行，可以说是一门非常“万能”的语言了。

JavaScript 是一门**多范式**的**动态语言**，其语法基于 Java 和 C，支持**面向对象**编程范式，支持**函数式编程**。

JavaScript 采用 object prototypes（**对象原型**）来实现面向对象的机制，而不是 class。

**数据类型**：

- [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (new in ES2015)
- `Object`
  - [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
  - [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  - [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
  - [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

### Number

#### JavaScript 只有浮点型数值

JavaScript 中 Number 的定义是："double-precision 64-bit format IEEE 754 values"，所有的 Number 都是 8 字节双精度的浮点数。**JavaScript 中的数值类型都是双精度浮点型类型，占 8 个字节，并没有整型数值类型**！

```javascript
console.log(3 / 2);             // 1.5, not 1
console.log(Math.floor(3 / 2)); // 1 An apparent integer is in fact implicitly a float.
```

#### parseInt 陷阱

parseInt 有一个可选参数，按照何种进制进行字符串到数字的转换。老的浏览器会将 0 开头的字符串解释成 8 进制数字，为了保证将我们的字符串转换成我们想要的数字，我们在用到 parseInt 时，一定要指定进制数。

```javascript
// new browser
parseInt('123', 10); // 123
parseInt('010', 10); // 10
parseInt('11', 2); // 3
parseInt('0x10'); // 16

// older browser
parseInt('010');  //  8
```

注意，`parseFloat()` always uses base 10.

#### parse string to number 的其他方式

```javascript
+ '42';   // 42
+ '010';  // 10
+ '0x10'; // 16
```

#### parseInt / parseFloat 与 `+`  比较，贪心算法

```javascript
parseFloat('12.3sss', 10) // 12.3
parseInt('123sss', 10) // 123

+ '12.3ss' // NaN
+ '123ss' // NaN
```

#### NaN

A special value called [`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) (short for "Not a Number") is returned if the string is non-numeric:

```javascript
parseInt('hello', 10); // NaN
```

NaN 有毒，如果将其作为一个运算符参与到任何运算，其结果都会是一个 NaN

```js
NaN + 5; // NaN
```

You can test for `NaN` using the built-in [`isNaN()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN) function:

```js
isNaN(NaN); // true
```

#### 无穷大 Infinity

```js
1 / 0; //  Infinity
-1 / 0; // -Infinity
```

You can test for `Infinity`, `-Infinity` and `NaN` values using the built-in [`isFinite()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite) function:

```js
isFinite(1 / 0); // false
isFinite(-Infinity); // false
isFinite(NaN); // false
```

### String

JavaScript 中的 String 是 Unicode(UTF-16)字符串（没有国际化的问题）。

JavaScript 默认用单引号来定义字符串。

JavaScript 中的字符串，是面向对象的字符串，每一个字符串都是一个对象，既然有对象，那么就有属性和方法：

```javascript
'hello'.length; // 5

'hello'.charAt(0); // "h"
'hello, world'.replace('world', 'mars'); // "hello, mars"
'hello'.toUpperCase(); // "HELLO"
```

### null, undefined, Boolean()

null, which is a value that indicates a deliberate non-value. null 是一个值

undefined, which is a value of type `undefined` that indicates an uninitialized variable — that is, a value hasn't even been assigned yet. undefined 是类型

如果我们在定义变量的时候没有声明变量的值，那么这个变量的类型就是 undefined. 

```js
var tmp;
typeof(tmp); // undefined
```

**true** or **false**（这两个值是 JavaScript 中的两个关键字）

1. `false`, `0`, empty strings (`""`), `NaN`, `null`, and `undefined` all become `false.`
2. All other values become `true.`

```js
Boolean('');  // false
Boolean(234); // true

Boolean(false) // false
Boolean('false') // true

typeof(true) // boolean
```

true 和 false 两个值同样支持 Boolean 运算符：`&& || !`

### Variables

变量声明的关键字：`let`,  `const`, `var`

关键字声明的变量的生效范围：`let` < `var`

如果我们在声明变量的时候，没有对其赋值，那么该变量的类型就是 `undefined`

#### let

ES6 引入

let 关键字声明的变量仅局限于代码块：

The following is an example of scope with a variable declared with `**let**`:

```js
// myLetVariable is *not* visible out here

for (let myLetVariable = 0; myLetVariable < 5; myLetVariable++) {
  // myLetVariable is only visible in here
}

// myLetVariable is *not* visible out here
```

#### const

ES6 引入

const 用于声明常量（常量声明后，不能再进行赋值，否则抛出异常）：

```js
const Pi = 3.14; // variable Pi is set 
Pi = 1; // will throw an error because you cannot change a constant variable.
```

#### var

var 是 JavaScript 中最常见的变量声明关键字。

An example of scope with a variable declared with **`var`:**

```js
// myVarVariable *is* visible out here

for (var myVarVariable = 0; myVarVariable < 5; myVarVariable++) { 
  // myVarVariable is visible to the whole function 
} 

// myVarVariable *is* visible out here 
```

上面这种现象的解释：

> An important difference between JavaScript and other languages like Java is that in JavaScript, blocks do not have scope; only functions have a scope. So if a variable is defined using `var` in a compound statement (for example inside an `if` control structure), it will be visible to the entire function. However, starting with ECMAScript 2015, `let` and `const` declarations allow you to create block-scoped variables.

正确的做法：

```js
for (let myVarVariable = 0; myVarVariable < 5; myVarVariable++) { 
  // myVarVariable is restricted to this block 
} 
```

### Operators

#### 数值运算符

```js
var x = 5;
x += 5;
x = x + 5; 
x ++;
x --;
'hello' + ' world'; // "hello world"
```

number 类型和 string 类型相加，number 类型会转成 string 类型

```js
'3' + 4 + 5;  // "345"
3 + 4 + '5'; // "75"

3.14 + 's'; // 3.14s
```

#### 布尔运算符

比较运算符：`>, <, >=, <=, ==, ===, !=, !==`

**强制类型转换的坑**：

```js
123 == '123'; // true
1 == true; // true

123 != '123' // false
1 != true // false
```

为了避免强制类型转换导致的意外，改用 `===` 进行比较：

```js
123 === '123'; // false
1 === true;    // false

123 !== '123'; // true
1 !== true;    // true
```

#### 位运算符

 [[bitwise operations]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)

### Control structures

#### if, for, while, of, in, switch case

JavaScript 兼容 C 语言的 if, while, for 等语法结构，同时还有自己独特的语法结构：

```js
for (let value of array) {
  // do something with value
}

for (let property in object) {
  // do something with object property
}
```

#### || &&

JavaScript 中的 || 和 && 是惰性求值，其会先检查操作符的前一部分，如果不符合要求，那么后一部分就不会执行运算检查。

The `&&` and `||` operators use short-circuit logic, which means whether they will execute their second operand is dependent on the first. This is useful for **checking for null objects** before accessing their attributes:

```js
var name = o && o.getName();
```

Or for caching values (when falsy values are invalid):

```js
var name = cachedName || (cachedName = getName()); // 妙啊
```

#### 三目运算符

```js
var allowed = (age > 18) ? 'yes' : 'no';
```

### Objects

1. JavaScript 中的任何元素都是对象！

2. JavaScript 中的对象都是键值对集合

3. JavaScript 的执行效率非常快！

   1, 2 —> 3



## JS History

[[JS-Third-Age]](https://www.swyx.io/writing/js-third-age/)

