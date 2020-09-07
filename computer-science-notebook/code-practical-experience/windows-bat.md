# Windows 批处理命令

[TOC]

## 批处理命令的作用

将重复的事情自动化批处理，常用于开机时的一些系统配置。

## Windows 开启自启设置

将写好的 bat 脚本扔到 Windows 开启自启文件夹中，Win10 的地址为： `C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Start
Menu\Programs\Startup` 中即可。

## Fixed Problems

1. 您需要管理员权限才能移动到此文件夹

   把杀毒软件关掉，包括火绒

## Syntax

### echo

如果在批处理文件第一行加上echo off 命令，那么批处理文件中的cmd就不会出现在命令行窗口中，只会显示结果。

注意：

1. echo 不能叠加在一行中，否则把echo也打印出来
2. echo off 如果想有效果，必须放在第一行！其有效范围是该命令之后的命令

使用场景：

如果该批处理文件是提供给别人用的，而且你不像使用者知道你用了什么命令，例如病毒，那么就可以使用echo off 来屏蔽这些命令的显示，只显示结果。

### @

@作用和echo类似，同样用于屏蔽命令，不同的是，该命令只能一行一行的屏蔽。但是其能屏蔽echo off 命令！

```powershell
@echo off
```

### pause

该命令起到暂停执行的作用，可以使DOS窗口暂停关闭

pause在敲回车后，程序继续执行

### goto

跳转执行命令，跳转的位置必须有一个标识符。例如下面的命令中，1 就是一个标志，以: 开头。

使用场景：往往配合if 语句使用，或者用goto实现循环效果

```powershell
echo off
: 1
echo 万东鑫
goto 1
```

### call

1. 调用另外一个bat文件
2. 调用指定标记后面的所有命令

使用场景：打开另一个bat文件，或者调用其他的命令

### start

该命令是异步执行的。

```powershell
rem 新开一个窗口，然后执行 cmd
start "窗口名" cmd 
```

### rem

注释。注意：要在脚本开头加上 `echo off` 否则注释会出现在命令行中

## Demos

### 启动某些软件

```powershell
rem 酷Q
start "" "E:\酷Q Air\CQA.exe"  
rem "" 是新打开的cmd的窗口名
rem Chrome
start "" "C:\Users\Administrator\AppData\Local\Google\Chrome\Application\chrome.exe"
rem 百度云
start "" "E:\百度云管家\BaiduNetdisk\BaiduNetdisk.exe"
rem 搜索
start "" "C:\Program Files\Everything\Everything.exe"
rem 文件管理器
start explorer
rem 打开OneNote
start "" "C:\Program Files (x86)\Microsoft Office\root\Office16\ONENOTE.exe"
```

### 循环删除某个文件夹

```powershell
@echo off
rem 不断的检测，循环删除一个文件
: 1
if exist "H:\代码\批处理文件\你好" (
rd /s /q "H:\代码\批处理文件\你好" 
goto 1 )  else (
echo 没有发现该文件
goto 1
)
```

### 拨号上网

```powershell
rem 注意拨号上网的名称要用 ASCII 字符
rasdial name SZ1716029 300059 
```

