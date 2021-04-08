# Linux 初始化
1991 年， Linux 诞生。

[TOC]

## 1. 系统安装

先到 中科大镜像网站下载 Ubuntu 17.10 版本的ISO镜像文件，然后解压到U盘里面

此为下载链接：
http://mirrors.ustc.edu.cn/ubuntu-releases/17.10/ubuntu-17.10.1-desktop-amd64.iso

常用软件的下载链接（Google Chrome、为知笔记、坚果云、markdown编辑器、搜狗输入法、Anaconda、Lantern）
链接：https://pan.baidu.com/s/1w1Cy8JNGvmqEnJtl-lH4aA 密码：t2dv

系统安装教程
https://jingyan.baidu.com/article/e3c78d6460e6893c4c85f5b1.html

在安装的时候，把软件更新和另外一个选项都勾选

## 2. 切换Ubuntu的源地址

**安装好linux后，第一件事，就是先切换源。**

**安装好linux后，第一件事，就是先切换源。**

**安装好linux后，第一件事，就是先切换源。**

在软件更新（update）中，直接切换成中科大的镜像源就好
http://mirrors.ustc.edu.cn/help/ubuntu.html 

切换完后，记得更新一下：`sudo apt-get update`

在update源信息的过程中，如果出现error，记住这个链接，然后打开software和更新，到`Other Software`中将对应的链接源删除。就不会再报错。

## 安装经验
1. 没用的软件不要乱删除
2. 系统不要随便更新

## 3. 安装中文输入法

不建议安装搜狗输入法和rime输入法，

先安装 **fcitx** 框架，然后再安装**sunpinyin** 输入法

切换 fcitx 的步骤：
系统设置 ——> 区域和语言 ——> Manage Installed Languages ——> 切换键盘输入法系统为 fcitx

添加sunpinyin输入法的步骤：
sudo apt-get install fcitx-sunpinyin
系统设置 ——> 区域和语言 ——> 点击左下角的加号 ——> 点击**汉语**(注意汉语里面还有选项) ——> 选择 sunpinyin 输入法

## 4. 安装 .sh 格式的软件 

举例：Anaconda

下载好Anaconda后，先设置Anaconda.sh文件可执行（`chmod 777 anaconda.sh`），然后再 `./ anaconda.sh ` 安装

安装的时候，不要离开安装的窗口，否则Anaconda的path不会被引入，导致Spyder不能被打开，如果确实打不开Spyder，那么参考如下的方法：http://blog.csdn.net/x_lock/article/details/53170321

## 5. 安装deb软件的命令

` sudo dpkg -i name.deb `

如果出现包依赖的问题，那么fix一下：

` sudo apt-get install -f `

 -f 是 --fix-broken  的简写

通常安装某一个deb软件的标准流程就是：
```
sudo dpkg -i name.deb
sudo apt-get install -f
```

此方法适用于安装所有的deb软件

## 6. 安装AppImage的软件

举例：安装  为知笔记

为知笔记的安装包是 AppImage 格式的，该要设置该文件为可执行，然后直接双击执行就好了。

## 7. apt-get 命令介绍

apt advance package tools

首先 apt-get 是一个命令，它和 ls 等命令一样，都是命令。

命令详解：

### 更换源后的更新命令

`sudo apt-get update`

### 安装一个新的软件
直接查看apt工具集里有没有该软件

`sudo apt-get install packagename`

例如安装 git

`sudo apt-get install git`

### 卸载一个已安装的软件包（保留配置文件）

`sudo apt-get remove packagename`

### 卸载一个已安装的软件包（删除配置文件）

`sudo apt-get --purge remove packagename`

### 更新所有已经安装的软件

`sudo apt-get upgrade`

### 将系统升级到最新版本

`sudo apt-get dist-upgrade`

## Linux 磁盘分区



## 修改主题

```
安装Gnome-tweak-tool
sudo apt-get install gnome-tweak-tool
打开软件商城，分别安装如下几个插件：
user themes
dash to dock

安装 Numix 主题和图标
sudo add-apt-repository ppa:numix/ppa
sudo apt-get update
sudo apt-get install numix-gtk-theme numix-icon-theme-circle

打开 Utilities中的Tweaks，开始设置
```

## 适配Hexo

https://blog.csdn.net/lyb3b3b/article/details/78706077

## 小知识
ubuntu 17.10截图命令：shift + printSc键

## SDKMan

利用 https://sdkman.io/ SDKMAN 来安装开发环境。

DEMO：

```shell
sdk install java
sdk install scala 2.12.1
sdk list # 查看当前仓库有哪些开发环境
sdk install spring
sdk current # 查看当前安装了哪些开发环境
```

SDKMan 安装的各种软件，其目录都在 `$HOME/.sdkman/` 下，可以用 which java 查看安装目录。

