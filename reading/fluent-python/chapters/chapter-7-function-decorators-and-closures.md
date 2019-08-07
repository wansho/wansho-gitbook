# Chapter7. Function Decorators and Closures

##Introduction

装饰器是一个 High-Order Function，其输入是被装饰的 function（**First-Class Object 思想**），输出也是一个 function。装饰器可以分成如下两种装饰器：

1. 不改变旧 function：装饰器不影响原 function，只是对原 function 进行一些计算，例如 PySnooper 就是这种类型的装饰器，其不会改变原来的 function
2. 新 function 替代旧 function：装饰器内创建一个新的 function （**闭包的思想**）

## Demo and Characteristic

## Variable Scope Rules(Python 变量作用域)

## Closures(闭包)

## 