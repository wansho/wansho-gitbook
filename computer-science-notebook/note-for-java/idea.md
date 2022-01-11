# IDEA

[TOC]

## 快捷键 shortcut

https://www.jetbrains.com/help/idea/mastering-keyboard-shortcuts.html

[知乎：IntelliJ IDEA 中有什么让你相见恨晚的技巧?](https://www.zhihu.com/question/300830746/answer/672248406)

### windows

| 功能                                            | 快捷键                 |
| ----------------------------------------------- | ---------------------- |
| 查看类的继承树                                  | ctrl + H（Hierarchy）  |
| 查看当前类的结构                                | ctrl + F12             |
| 搜索类文件                                      | ctrl + N               |
| 自动补全变量名称                                | ctrl + alt + V         |
| 代码格式化                                      | ctrl + alt + L         |
| 手动导包                                        | alt + enter            |
| 删除当前行                                      | ctrl + Y               |
| 查看最近看了改了哪些代码                        | ctrl + shift + E       |
| 给插入提示，例如生成 getter, setter, test，例如 | alt + insert           |
| 提示参数类型                                    | ctrl + P               |
| 跳到下一个相同的内容(变量 / 方法)               | alt + J                |
| 在所有的相同的内容后添加光标(批量修改)          | ctrl + shift + alt + J |
| 加载导入的依赖                                  | ctrl + alt + O         |
| 在指定位置添加光标                              | alt + shift + 鼠标左键 |
| 实现接口方法                                    | ctrl + i               |
| 代码上移下移                                    | alt + shift + 上下     |
| 查找文件，包括依赖中的类文件                    | ctrl + shift + N       |



### macOS

| 功能         | 快捷键      |
| ------------ | ----------- |
| 查看代码结构 | command + 7 |
|              |             |
|              |             |



## 代码模板

自动代码片的生成快捷键：ctrl + j

| 模板代码                  | 快捷键   |
| ------------------------- | -------- |
| main 函数                 | psvm     |
| System.out.println()      | sout     |
| 生成 for 循环             | fori     |
| 生成普通 for 循环         | itar     |
| 生成增强 for 循环         | iter     |
| 生成集合 list 的 for 循环 | list.for |
| private static final      | prsf     |
| 快速生成变量              | .var     |
| 打印当前对象              | .sout    |
|                           | .if      |
|                           | .for     |



## 安装 [**IntelliJ IDEA**](https://www.jetbrains.com/idea/)

2020.2 版本后的 IDEA 暂时无法破解，所以使用历史版本：2019.3.5 [[download]](https://download.jetbrains.com/idea/ideaIU-2019.3.5.exe?_ga=2.167713214.1472044068.1599574265-921529009.1596531522) [[破解教程]](https://my.oschina.net/u/4330928/blog/3230470) [[jar包在网盘中]](链接：https://pan.baidu.com/s/1opYMrq1HpDtBUP-1lAnmFQ  提取码：i26t)

需要安装的插件 Plugins：

* [Lombok](https://projectlombok.org/) 简化 Java 代码 （读作：lang bao ke）
* [Alibaba Java Coding Guidelines](https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines/) 阿里巴巴 Java 代码规范

可以使用 edu 邮箱到 Jet brain 官网上申请免费使用 jetbrain 的产品，不过得一年激活一次



## 必装插件

* Alibaba Java Coding Guidelines
* SonarLint
* Lombok



## 小惊喜

* todo 功能

  ```
  // todo todo-content
  ```

* 下边栏的 Problems 可以提供代码规范检查功能

