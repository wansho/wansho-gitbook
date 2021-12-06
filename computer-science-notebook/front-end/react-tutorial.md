# React Tutorial

[TOC]

https://www.bilibili.com/video/BV1wy4y1D7JT

版本：旧16.8

## 1. React 入门

### React 简介

**为什么要学 React**

* 原生 JS 操作 DOM 繁琐，效率低（DOM-API 操作 UI）
* 使用 JS 直接操作 DOM，浏览器会进行大量的重绘重排
* 原生 JS 没有组件化编码方案，代码复用低（组件化：html + css + js 一起复用）

**React 的优点**

* 采用组件化模式，声明式编码，提高开发效率及组件复用率
* 在 React Native 中可以使用 React 语法进行移动端开发
* 使用虚拟 DOM + 优秀的 Diffing 算法，尽量减少与真实 DOM 的交互（增量渲染）

### React 的核心

React 只负责操作 DOM 呈现页面。

使用虚拟 DOM 技术，Diff 算法，增量渲染。React 只关注数据渲染，不负责数据获取和数据处理。

jsx 的作用：方便创建虚拟 DOM，是 `React.createElement()` 的语法糖

**React js 库**

1. react.js：React 核心库，引入后，全局j。

2. react-dom.js：提供操作 DOM 的 react 扩展库。

3. babel.min.js：解析 JSX 语法代码转为 JS 代码的库（另外一个功能 ES6 -> ES5）。

### 学习 React 的前提

* 判断 this 的指向
* class
* ES6 语法规范
* npm 包管理器
* 原型 - 原型链
* 数组常用方法
* 模块化

### jsx

JavaScript XML

**为什么要写 jsx**

jsx 语法可以让编码人员更加简单地创建虚拟 DOM。

可以用 js 面向对象的方式创建虚拟 DOM，也可以直接写 jsx 创建虚拟 DOM。

jsx 是为了避免用 js 创建虚拟 DOM 而产生的语法糖。



**jsx 语法规则**

```
1. 定义虚拟DOM时，不要写引号。
2. 标签中混入JS表达式时要用{}。
3. 样式的类名指定不要用class，要用className。
4. 内联样式，要用style=\{\{key:value\}\}的形式去写，外层{}表示 js 表达式，内层{}表示 json。
5. 只有一个根标签
6. 标签必须闭合
7. 标签首字母
(1).若小写字母开头，则将该标签转为 html 中同名元素，若 html 中无该标签对应的同名元素，则报错。
(2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
8. 其他重写规则：
	onclick -> onClick
```

**js 语句和 js 表达式**

{} 中只能写 js 表达式。

```
一定注意区分：【js语句(代码)】与【js表达式】
1.表达式：一个表达式会产生返回值，可以放在任何一个需要值的地方
    下面这些都是表达式：
    (1). a
    (2). a+b
    (3). demo(1)
    (4). arr.map() 
    (5). function test () {}
2.语句(代码)：
    下面这些都是语句(代码)：
    (1).if(){}
    (2).for(){}
    (3).switch(){case:xxxx}
```

**jsx 示例代码**

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>jsx小练习</title>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>
	
	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持 react 操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将 jsx 转为js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

	<script type="text/babel" >
		//模拟一些数据
		const data = ['Angular','React','Vue']
		//1.创建虚拟DOM
		const VDOM = (
			<div>
				<h1>前端js框架列表</h1>
				<ul>
					{
						data.map((item,index)=>{
							return <li key={index}>{item}</li>
						})
					}
				</ul>
			</div>
		)
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
</body>
</html>
```

## 2. 面向组件编程

### 模块与组件，模块化与组件化

模块：完成特定功能的 js 程序，通常就是一个 js 文件

组件：代码和资源的集合（html, css, js, img, video, font）

模块化：复用 js 代码

组件化：复用各种代码和资源

### 面向组件编程

* 函数式组件 (适用于**无状态**的简单组件)
* 类式组件 (适用于**有状态**的复杂组件)

#### 函数式组件编程

```jsx
<script type="text/babel">
    //1.创建函数式组件
    function MyComponent(){
        console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
        return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
    }
    //2.渲染组件到页面
    ReactDOM.render(<MyComponent/>,document.getElementById('test'))
    /* 
    执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
    1.React解析组件标签，找到了 MyComponent 组件。
    2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    */
</script>
```

#### 类式组件编程

class 复习

```javascript
<script type="text/javascript" >
    /* 
			总结：
				1.类中的构造器不是必须要写的，要对实例进行一些初始化的操作，如添加指定属性时才写。
				2.如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须要调用的。
				3.类中所定义的方法，都放在了类的原型对象上，供实例去使用。
		*/
    //创建一个Person类
    class Person {
        //构造器方法
        constructor(name,age){
            //构造器中的this是谁？—— 类的实例对象
            this.name = name
            this.age = age
        }
        //一般方法
        speak(){
            //speak方法放在了哪里？——类的原型对象上，供实例使用
            //通过Person实例调用speak时，speak中的this就是Person实例
            console.log(`我叫${this.name}，我年龄是${this.age}`);
        }
    }

//创建一个Student类，继承于Person类
class Student extends Person {
    constructor(name,age,grade){
        super(name,age)
        this.grade = grade
        this.school = '尚硅谷'
    }
    //重写从父类继承过来的方法
    speak(){
        console.log(`我叫${this.name}，我年龄是${this.age},我读的是${this.grade}年级`);
        this.study()
    }
    study(){
        //study方法放在了哪里？——类的原型对象上，供实例使用
        //通过Student实例调用study时，study中的this就是Student实例
        console.log('我很努力的学习');
    }
}

class Car {
    constructor(name,price){
        this.name = name
        this.price = price
        // this.wheel = 4
    }
    //类中可以直接写赋值语句,如下代码的含义是：给Car的实例对象添加一个属性，名为a，值为1
    a = 1
wheel = 4
static demo = 100
}
const c1 = new Car('奔驰c63',199)
console.log(c1);
console.log(Car.demo);
</script>
```

类式组件编程的要求：

* 继承自 `React.Component`
* 有 `render` 函数
* `render` 有返回值

```jsx
<script type="text/babel">
    //1.创建类式组件
    class MyComponent extends React.Component {
        render(){
            //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
            //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
            console.log('render中的this:',this);
            return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
        }
    }
    //2.渲染组件到页面
    ReactDOM.render(<MyComponent/>,document.getElementById('test'))
    /* 
    执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
    1.React解析组件标签，找到了MyComponent组件。
    2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
    3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    */
</script>
```

### 组件实例的三大核心属性-1: state

补充知识点（原生事件绑定的三种方式）：

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Document</title>
	</head>
	<body>
		<button id="btn1">按钮1</button>
		<button id="btn2">按钮2</button>
		<button onclick="demo()">按钮3</button>

		<script type="text/javascript" >
			const btn1 = document.getElementById('btn1')
			btn1.addEventListener('click',()=>{
				alert('按钮1被点击了')
			})

			const btn2 = document.getElementById('btn2')
			btn2.onclick = ()=>{
				alert('按钮2被点击了')
			}

			function demo(){
				alert('按钮3被点击了')
			}

		</script>
	</body>
</html>
```

补充知识点（类方法中的this指向）：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Document</title>
	</head>
	<body>
		<script type="text/javascript" >
			class Person {
				constructor(name,age){
					this.name = name
					this.age = age
				}
				study(){
					// study方法放在了哪里？——类的原型对象上，供实例使用
					// 通过Person实例调用study时，study中的this就是Person实例
					console.log(this);
				}
			}

			const p1 = new Person('tom',18)
			p1.study() //通过实例调用study方法
			const x = p1.study
			x() // undefined

		</script>
	</body>
</html>
```

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>state</title>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>
	
	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

	<script type="text/babel">
		//1.创建组件
		class Weather extends React.Component{
			
			//构造器调用几次？ ———— 1次
			constructor(props){
				console.log('constructor');
				super(props)
				//初始化状态
				this.state = {isHot:false,wind:'微风'}
				//解决changeWeather中this指向问题
				this.changeWeather = this.changeWeather.bind(this)
			}

			//render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
			render(){
				console.log('render');
				//读取状态
				const {isHot,wind} = this.state
				return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
			}

			//changeWeather调用几次？ ———— 点几次调几次
			changeWeather(){
				//changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
				//由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
				//类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
				
				console.log('changeWeather');
				//获取原来的isHot值
				const isHot = this.state.isHot
				//严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
				this.setState({isHot:!isHot})
				console.log(this);

				//严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
				//this.state.isHot = !isHot //这是错误的写法
			}
		}
		//2.渲染组件到页面
		ReactDOM.render(<Weather/>,document.getElementById('test'))
				
	</script>
</body>
</html>
```

组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)



## Redux
