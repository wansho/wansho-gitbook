# Linux 使用心得

[TOC]

## Linux 版本

我最常用的 Linux 版本是 Ubuntu16.04，使用了 Ubuntu18 后，我发现 18 有很多兼容性问题，所以我又切换到 14。

Ubuntu16.04 自带了 Python2.7 和 Python3.5，Git 等软件。

## Linux 系统的理解

### Linux 最常用的几个目录

* **/etc** 

  系统配置

* **/usr/bin**

  下载安装的软件的位置，例如 Python，Mysql

* **/home**

  用户目录

* **/bin**

  存放用户级别的 Linux 工具，例如 cat, ls, chown

* **/sbin**

  存放 root 用户才能用的 Linux 工具

### 忘记了命令怎么使用怎么办？

如果忘记了某个命令的使用，我们有两个方法：

```bash
cmd --help

man cmd
```

而不是去百度！

## Ubuntu 初始化

### 切换软件仓库源

Ubuntu 安装软件是统一从一个软件仓库进行安装，但是该仓库源的速度非常慢，所以通常会切换成国内的源：

[中科大 ubuntu 源](http://mirrors.ustc.edu.cn/help/ubuntu.html )

### 新建用户，给用户配置 sudo

Ubuntu 安装软件的命令是 apt-get，普通用户使用的画，需要加 sudo，为了方便普通用户的使用，需要授予用户  sudo 的权限：

```bash
# 新建 work 用户
useradd -m -c "for work" -u 8888 -p passwd? -s /bin/bash work
# 授予 work 用户 sudo 权限
visudo
# 在最后一行添加：work ALL=(ALL:ALL) NOPASSWD:ALL
```

### Python 初始化

ubuntu16.04 自带了两个 Python 版本：Python2.7 和 Python3.5 (从 /usr/bin 中可以看出)，和 apt-get 一样，Python 的包管理器的仓库源速度也非常慢，也需要切换到国内的源：

```bash
mkdir -p ~/.config/pip/ && cd $_
touch pip.conf
echo -e [global]\\nindex-url = https://pypi.tuna.tsinghua.edu.cn/simple > pip.conf
```

Python 要配合 virtualenv 来使用：

```bash
pip install virtualenv
virtualenv -p python3 venv # python3.5
source venv/bin/activate
deactivate
```

## 常见问题

### 虚拟机 buff/cache 占用内存太大

<https://www.tecmint.com/clear-ram-memory-cache-buffer-and-swap-space-on-linux/>

buff 是准备写入磁盘的缓存，cache 是从磁盘读出内容的缓存。 buff/cache 占用过高的原因在于，频繁的从磁盘读写文件，例如读取模型文件，读写文本文件。

如果我们释放了缓存，那么会增加磁盘的读写压力，所以还是小心为妙。

释放缓存的命令：

```shell
sync; echo 1 > /proc/sys/vm/drop_caches # 效果最好 Clear PageCache， 只推荐用这一种方式
sync; echo 2 > /proc/sys/vm/drop_caches # Clear dentries and inodes
sync; echo 3 > /proc/sys/vm/drop_caches # Clear PageCache, dentries and inodes
# sync 用于将 buff 写入磁盘
```

如果非要释放缓存不可，我们可以用 crontab 定期在深夜进行缓存的释放，并且在释放前，要先 sync，再释放.