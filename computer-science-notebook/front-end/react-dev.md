# React

[TOC]

**React** is a JavaScript library for building user interfaces. Learn what React is all about on [our homepage](https://reactjs.org/) or [in the tutorial](https://reactjs.org/tutorial/tutorial.html).



## react 特点

* 组件化
* 用 jsx 写虚拟 DOM
* diff 算法，增量渲染
* React Native 移动端开发



## cheatsheet 备忘

* jsx 是创建虚拟 DOM 的语法糖
* 虚拟 DOM 实际上是一个对象



## vscode snippet

| 缩写     | 功能                       | 备注                     |
| -------- | -------------------------- | ------------------------ |
| rcc      | 生成类组件代码             | react class component    |
| !        | 生成 html 代码             |                          |
| rfc      | 生成函数组件代码           | react function component |
| dev#root | 生成一个 id 为 root 的 div |                          |



## react 基本库

1. react.js：React 核心库，引入后，全局就有了一个 React 变量。
2. react-dom.js：提供操作 DOM 的 react 扩展库，引入后，全局就有了一个 ReactDOM 变量。
3. babel.min.js：将 JSX 语法代码转为 JS 代码（另外一个功能 ES6 -> ES5）。



## react 基础





### hello react

```react
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>hello-react</title>
    </head>
    <body>
        <!--  引入 react 核心库，核心库一定要先引入，全局有了一个 React 变量 -->
        <script type="text/javascript" src="../js/react.development.js"></script>
        <!--    引入 react-dom，用于支持 react 操作 dom，全局有了一个 ReactDOM 变量 -->
        <script type="text/javascript" src="../js/react-dom.development.js"></script>
        <!--        引入 babel，用于将 jsx 转为 js -->
        <script type="text/javascript" src="../js/babel.min.js"></script>
        <!-- 准备一个容器-->
        <div id="test"></div>
        <script type="text/babel"> /* 此处一定要写 babel */
            // 1. 用 jsx 语法创建虚拟 dom，然后将 DOM 赋值给一个变量 （虚拟 DOM 实际上是一个变量！）
            const VDOM = <h1>hello, react</h1> /* 此处一定不要加单引号，因为不是字符串 */
            // 2. 渲染虚拟 dom 到容器种
            ReactDOM.render(VDOM, document.getElementById('test'))
        </script>
    </body>
</html>
```



### 创建虚拟 DOM 的两种方式

jsx: javascript xml

jsx 用于创建虚拟 DOM，jsx 是为了避免用 js 创建虚拟 DOM 而产生的语法糖。

可以使用 JavaScript 面向对象的方法，创建虚拟 DOM，也可以直接写 jsx 创建虚拟 DOM。

用 JavaScript 创建虚拟 DOM。

```react
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>hello-react</title>
    </head>
    <body>
        <script type="text/javascript" src="../js/react.development.js"></script>
        <script type="text/javascript" src="../js/react-dom.development.js"></script>
        <div id="test"></div>
        <script type="text/babel">
			// 用 JavaScript 创建虚拟 DOM
            const VDOM = React.createElement('h1', {id: 'title'}, React.createElement('span', {}, 'hello react'))
            // 2. 渲染虚拟 dom 到页面
            ReactDOM.render(VDOM, document.getElementById('test'))
        </script>

    </body>

</html>
```

用 jsx 语法创建虚拟 DOM

```react
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>hello-react</title>
    </head>
    <body>
        <script type="text/javascript" src="../js/react.development.js"></script>
        <script type="text/javascript" src="../js/react-dom.development.js"></script>
        <script type="text/javascript" src="../js/babel.min.js"></script>

        <!-- 准备一个容器-->
        <div id="test"></div>

        <script type="text/babel"> /* 此处一定要写 babel */
            // 1. 用 jsx 语法创建虚拟 dom
            const VDOM = (
            <h1 id="title">
                <span>hello, react</span>
            </h1>
            ) /* 此处一定不要加单引号，因为不是字符串 */
            // 2. 渲染虚拟 dom 到页面
            ReactDOM.render(VDOM, document.getElementById('test'))

            console.log('虚拟dom: ', VDOM)
            console.log('真实dom: ', document.getElementById('test'))
            console.log(typeof VDOM)
            console.log(typeof document.getElementById('test'))
            /*
            * 1. 虚拟 DOM 本质上是一个 object 对象
            * 2. 虚拟 dom 比较轻，真实 dom 比较重，因为虚拟 dom 是 react 内部用，不需要太多属性
            * 3. 虚拟 dom 最终会被 react 转化为真实 dom，呈现在页面上
            * */
        </script>
    </body>
</html>
```



### jsx 语法

jsx 语法

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

js 语句和 js 表达式，{ } 中只能写 js 表达式

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



### react 函数式组件

函数式组件相当于给 VDOM 进行组件化封装

```react
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>hello-react</title>
    </head>
    <body>
        <script type="text/javascript" src="../js/react.development.js"></script>
        <script type="text/javascript" src="../js/react-dom.development.js"></script>
        <script type="text/javascript" src="../js/babel.min.js"></script>

        <div id="test"></div>

        <script type="text/babel"> /* 此处一定要写 babel */
            // 1. 创建函数式组件，函数式组件相当于给 VDOM 进行组件化封装
            function MyComponent(){
                return <h2> 这是一个函数式组件！ </h2>
            }
            // 2. 渲染虚拟 dom 到页面
            ReactDOM.render(<MyComponent/>, document.getElementById('test'))
        </script>
    </body>
</html>
```



### react 类式组件

```react
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8"/>
	<title>2_类式组件</title>
</head>
<body>

	<div id="test"></div>

	<script type="text/javascript" src="../js/react.development.js"></script>
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<script type="text/javascript" src="../js/babel.min.js"></script>

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
</body>
</html>
```



### 类组件三大核心属性：state

```react
this.state; // 存储组件的数据（状态）
this.props; // 存储传给组件的数据
this.refs; // 存储组件内定义的标签的 id
```





在构造函数中初始化 state

```react
<script type="text/babel">
    // 1.创建类式组件
    class Weather extends React.Component {
        constructor(props) {
            super(props)
            this.state = { isHot: true, wind: '微风'}
            this.changeWeather = this.changeWeather.bind(this)
        }
        render() {
            // destructure-assignment
            const {isHot, wind} = this.state
            return <h2 onClick={this.changeWeather}>今天天气情况：{isHot ? '炎热' : '凉快'}, {wind}</h2>
        }
        changeWeather() {
            const isHot = this.state.isHot
            // 状态不能直接更改，要借助 React 的 api 进行更改
            this.setState({isHot: !isHot})
            console.log(this.state.isHot)
        }
    }
    // 2.渲染组件到页面
    ReactDOM.render(<Weather/>, document.getElementById('test'))
</script>
```



直接创建类的成员变量 state

```react
<script type="text/babel">
    // 1.创建类式组件
    class Weather extends React.Component {
        // 初始化状态
        // 给 weather 添加一个属性：state
        state = {isHot: true, wind: '微风'}

        render() {
            // destructure-assignment
            const { isHot, wind} = this.state
            return <h2 onClick={this.changeWeather}>今天天气情况：{isHot ? '炎热' : '凉快'}, {wind}</h2>
        }

        // 自定义方法: 要用赋值语句的形式 + 箭头函数
        // 给 weather 添加一个属性 changeWeather
        // 箭头函数内没有 this，找外部的 this 作为内部的 this 使用，也就是类的对象
        changeWeather = () =>{
            console.log(this)
            const isHot = this.state.isHot
            // 状态不能直接更改，要借助 React 的 api 进行更改，改完状态后，会调用 render 重新渲染
            this.setState({isHot: !isHot})
            console.log(this.state.isHot)
        }
    }
    // 2.渲染组件到页面
    ReactDOM.render(<Weather/>, document.getElementById('test'))
</script>
```



### 类组件三大核心属性：props

```react
<script type="text/babel">
    class Person extends React.Component{
        // 限定类型
        static propTypes = {
            name: PropTypes.string.isRequired,
            age: PropTypes.number,
            sex: PropTypes.string
        }
        // 设置默认值
        static defaultProps = {
            age: 18,
            sex: "男"
        }
        render(){
            const {name, age, sex} = this.props
            return (
                <ul>
                    <li>姓名：{name}</li>
                    <li>年龄：{age + 1}</li>
                    <li>性别：{sex}</li>
                </ul>
            )
        }
    }
    let data = {name: 'wansho'}
    ReactDOM.render(<Person {...data}/>, document.getElementById("test"))
</script>
```





### 类组件三大核心属性：refs

组件内的标签可以定义 ref 属性来标识自己。

1. 字符串形式的 ref

```react
<script type="text/babel">

    class Demo extends React.Component{
        showData1 = () => {
            console.log(this.refs)
            const {input1} = this.refs
            alert(input1.value)
        }
        showData2 = () => {
            const {input2} = this.refs
            alert(input2.value)
        }
        render(){
            return (
                <div>
                    { /* ref 传入一个字符串 */ }
                    <input ref="input1" placeholder="输入内容，点击按钮弹窗显示"/>
                    <button onClick={this.showData1}> 点我提示左侧的数据</button>
                    <input ref="input2" onBlur={this.showData2}/>
                </div>
            )
        }
    }

    ReactDOM.render(<Demo/>, document.getElementById("test"))

</script>
```



2. 回调形式的 ref

```react
<script type="text/babel">
    class Demo extends React.Component{
        showData1 = () => {
            alert(this.input1.value)
        }
        showData2 = () => {
            alert(this.input2.value)
        }
        render(){
            return (
                <div>
                    { /* ref 内传入一个回调函数，函数的输入是 currentNode，将其与实例进行绑定 */ }
                    <input ref={(currentNode) => this.input1 = currentNode} placeholder="输入内容，点击按钮弹窗显示"/>
                    <button onClick={this.showData1}> 点我提示左侧的数据 </button>
                    <input ref={(currentNode) => this.input2 = currentNode} onBlur={this.showData2}/>
                </div>
            )
        }
    }
    ReactDOM.render(<Demo/>, document.getElementById("test"))
</script>
```



3. createRef 创建 ref 容器

```react
<script type="text/babel">
    class Demo extends React.Component{
        /*
            React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点，该容器是“专人专用”的
        */
        myRef1 = React.createRef();
        myRef2 = React.createRef();
        showData1 = () => {
            alert(this.myRef1.current.value)
        }
        showData2 = () => {
            alert(this.myRef2.current.value)
        }
        render(){
            return (
                <div>
                    <input ref={this.myRef1} placeholder="输入内容，点击按钮弹窗显示"/>
                    <button onClick={this.showData1}> 点我提示左侧的数据</button>
                    <input ref={this.myRef2} onBlur={this.showData2}/>
                </div>
            )
        }
    }
    ReactDOM.render(<Demo/>, document.getElementById("test"))
</script>
```



事件处理 demo:

```react
<script type="text/babel">

    class Demo extends React.Component{
        myRef1 = React.createRef();
        showData1 = () => {
            alert(this.myRef1.current.value)
        }
        /***
         1. 通过 onXxx 属性指定事件处理函数(注意大小写)
            1) React 使用的是自定义(合成)事件, 而不是使用的原生 DOM 事件  —————— 为了更好的兼容性
            2) React 中的事件是通过事件委托方式处理的(委托给组件最外层的元素)  ————————为了的高效
         2. 通过 event.target 得到发生事件的 DOM 元素对象 ———————不要过度使用ref
        */
        showData2 = (event) => {
            alert(event.target.value)
        }
        render(){
            return (
                <div>
                    <input ref={this.myRef1} placeholder="输入内容，点击按钮弹窗显示"/>
                    <button onClick={this.showData1}> 点我提示左侧的数据</button>
                    { /* 这个 input 不需要设置 ref，可以直接给这个 input 绑定事件处理  */ }
                    <input onBlur={this.showData2} placeholder="输入内容，失去焦点后弹窗显示"/>
                </div>
            )
        }
    }
    ReactDOM.render(<Demo/>, document.getElementById("test"))
</script>

```



 

## react 代码结构

```
public 
	index.html
src
	components
		Footer/
			index.css
			index.jsx
		Header/
			index.css
			index.jsx
	App.css 
	App.js 
	index.js	// 入口文件
```





## react 打包发布

注意，要在 package.json 中配置 `"homepage": "."`，这样才能以相对路径进行打包。



## react + antd 开发流程

用脚手架创建 app

```
create-react-app hello-react
```

启动 app

```
npm start
```

安装 antd



## react 相关技术

### webpack

Webpack 是一个开源的前端打包工具。Webpack 提供了前端开发缺乏的模块化开发方式，将各种静态资源视为模块，并从它生成优化过的代码。

Webpack可以从终端、或是更改webpack.config.js 来设置各项功能。 要使用Webpack 前须先安装Node.js。
