# QT 

[TOC]

## 安装和环境配置

[[Download]](http://download.qt.io/archive/qt/) 版本 5.9.4 [[安装教程]](https://blog.csdn.net/qq_23473839/article/details/80523318)

选择安装的组件：

* MinGW (使用 MinGW 编译)
* 所有以 QT 开头的组件
* Tools 下的 Qt Creater 和 MinGW

## 入门资源

[[Qt Developer]](https://www.qt.io/developers)

* [Getting Started Programming with Qt Widgets](https://doc.qt.io/qt-5/qtwidgets-tutorials-notepad-example.html)
* [Getting Started Programming with Qt Quick](https://doc.qt.io/qt-5/qtdoc-tutorials-alarms-example.html)

## Tutorial

[[Tutorial]](https://doc.qt.io/qt-5/qtwidgets-tutorials-notepad-example.html) [[Qt Designer Manual]](https://doc.qt.io/qt-5/qtdesigner-manual.html) [[Qt Documentation]](https://doc.qt.io/qt-5.9/index.html)

### 工程文件

The **Qt Widgets Application** wizard creates a project that contains a main source file and a set of files that specify a user interface (Notepad widget):

- notepad.pro - the project file.
- main.cpp - the main source file for the application.
- notepad.cpp - the source file of the notepad class of the Notepad widget.
- notepad.h - the header file of the notepad class for the Notepad widget.
- notepad.ui - the UI form for the Notepad widget.

### UI Qt Designer

UI 文件实际上是一个 xml 文件。

When you build the application, Qt Creator launches the Qt [User Interface Compiler (uic)](https://doc.qt.io/qt-5/uic.html) that reads the .ui file and creates a corresponding C++ header file, ui_notepad.h.