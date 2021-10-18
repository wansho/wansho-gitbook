# React

[TOC]

**React** is a JavaScript library for building user interfaces. Learn what React is all about on [our homepage](https://reactjs.org/) or [in the tutorial](https://reactjs.org/tutorial/tutorial.html).

## React Dev

* VSCode（加各种插件）
* Chrome + React Developer Tools(插件)

## VSCode Snippet

| 缩写 | 功能             | 备注                     |
| ---- | ---------------- | ------------------------ |
| rcc  | 生成类组件代码   | react class component    |
| !    | 生成 html 代码   |                          |
| rfc  | 生成函数组件代码 | react function component |

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

