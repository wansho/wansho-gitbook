# Linux
[TOC]

## Linux 文档

### man

```shell
# man 是一个 Linux 命令手册大全
man ls
man head
man man
man -k keyword # 按照关键字查找相关的命令手册
```

### --help

```shell
# 大多数命令都支持 --help 参数， --help 相当于手册的精简版，会列出几个重要的命令参数
ls --help
cat --help
```

## Linux 术语

### console，terminal，tty，shell

[知乎解答](<https://www.zhihu.com/question/21711307>)

**console** 是电脑的控制台，一台电脑只有一个 console；

一台大型主机往往需要支持许多用户同时使用，每个用户所使用操作的设备，叫做 **Terminal**；

tty（Teletypewriter）电传打字机，是最流行的 Terminal；

shell 是一个交互式软件，用于用户和操作系统进行交互，用户在 Terminal 上登陆后，就会进入 shell；

## shell Tricks

```shell
# 换行
/ + 回车

# 显示当前时间
date

# 展示所有的命令可能
tab + tab 

# 终端快捷键
tab # 自动补全
ctrl + a # 光标移到行首 head
ctrl + e # 光标移到行末 end
esc + . # 复用上一条命令的参数 
ctrl + r # 从 history 中模糊匹配执行的命令 键入 ctrl + r 后，输入相关的命令，一边输入，会一边进行匹配 research 
ctrl + w # 删除 cmd 的最后一个单词 word 
ctrl + u # 从头删除 cmd 到光标处(不包括光标)
ctrl + k # 删除从光标处(包括光标)到 cmd 的末尾
ctrl + l # 清屏

# 快速取消 bash 终端中的输入，另起一行的做法
ctrl + a, 输入 #，如果后期还想用到这个命令，可以直接在 history 中查找

# 在终端中键入空格，应该加反斜杠进行转义
\ 
```

### history

```shell
# bash 运行中的 history 记录是记录在内存中的，只有在推出 bash 时，才会将新的记录写入 $HOME/.bash_history
history # 查看运行过的命令
!num # 运行 history 中的编号为 num 的命令
history 100  # 列出最近的100条
!! # 执行上一条命令
```

## 文本和字符串处理相关命令

### 通配符

```
常用通配符
?: 一个字符
*: 零个或多个字符
[a-z]: 匹配 a-z
[abc]: 匹配 abc

Demos:
ls -l /bin/c* # 列出系统中以 c 开头的命令
rm /home/work/odp/log/* # 删除 log 目录下所有文件
ls -lF lin[a-z]x # 查看所有 lin[]x 文件的详情 
```

### cat / tac

```shell
cat -n file # 打印出行号 -n number
cat -b file # 只给有文本的行加上行号, -b: --number-nonblank

tac # 从后往前看日志
tac log.txt | more
```

### echo

```shell
man echo # echo 手册
# echo 换行
echo -e [global]\\nindex-url = https://pypi.tuna.tsinghua.edu.cn/simple > pip.conf # -e 表示对反斜线进行转义， \\ 表示反斜线，\\n 就等价于 \n 换行，结果就是：
# [global]
# index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

### more

```
# 分页显示文件内容，显示内容百分比
# 敲回车查看下边的内容，不支持回看
# 敲空格可以翻页 

# 停止：q
# 搜索（向下搜索）：/要搜索的内容  
```

### less  

```
# 分页显示文件内容

# 向下搜索：/要搜索的内容
# 向上搜索：?要搜索的内容
# n 重复前一个搜索
# less 支持回看，支持上下键翻看

# 停止：q
```

### head    

```
# -n number
# 查看文件前n行内容，默认显示头 10 行
head -n 20 file # 200 显示头 200 行, 可以简写成 head -20 file
```

### tail   

```
# 实现 log 文件的实时监控
tail -f file # -f: follow

# 查看后 20 行的内容
tail -n 20 file # 可以简写成 tail -20 file
```

### wc  计算文件行数

```
参数：
-c: 打印字节的个数
-m: 打印字符的个数
-l：打印行数
-w: 打印单词的个数

wc file # 行数 + 单词数 + 字节数
wc -l file # 行数
```

### sort

```
参数
-n --numeric-sort 
-f --ignore-case
-c check if it has been sorted
-u unique # 去除重复行
-r reverse
-b --ignore-leading-blanks # 会忽略每一行前面的所有空白部分，从第一个可见字符开始比较。
-k # --key=KEYDEF KEYDEF gives location and type 指定按照第几列进行排序，从 1 开始数，
-t # --field-separator=SEP # 分隔符

Demo：
sort -u data.txt > test.txt # 去除重复行
sort -r number.txt > num.txt # 降序排列（默认升序）
sort -n number.txt 按照数值进行排序（而不是字符串）

# 按照指定列进行排序，用 -k 来指定列数 第4列，-t ',' 设置间隔符为逗号
sort -k 4 -t ',' 微博数据_valid.csv > sorted.csv
```

### grep

```shell
全称：
global search regular expression(RE) and print out the line

参数：
-i, --ignore-case         ignore case distinctions
-o, --only-matching       show only the part of a line matching PATTERN
-v, --invert-match        select non-matching lines 反向匹配



Demos:
grep match_pattern file # 输出 file 中匹配到 pattern 的行

# grep 命令从后往前查找
tac log.txt | grep "regx"

# 反向匹配，不匹配包含 match_pattern 的数据，把 grep 这个进程过滤掉
ps -fe | grep java | grep -v grep 
```

### awk 命令

awk 是一个强大的文本处理工具，通常用于生成格式化的日志文件，其本质上更像是一个管道中的文本处理器。

awk 会自动给一行中的每个数据元素分配一个变量，默认情况下，awk 会将如下变量分配给其在文本行中发现的字段：

```
$0 代表整个文本行
$1 代表文本行中的第一个数据字段
$2 代表文本行中的第二个数据字段
$n 代表文本行中的第n个数据字段
```

awk 中内置很多函数，例如算数函数:  `int()`，字符串函数: `substr(), length()`等，具体参考: [awk内置函数](<http://www.runoob.com/w3cnote/awk-built-in-functions.html>)

**语法**

```shell
echo "Hello linux" | awk '{awk_cmd}' # 必须是 单引号 + 大括号
```

**常见命令选项**

| 选项      | 描述                           |
| --------- | ------------------------------ |
| `-F`      | 指定划分数据字段的分隔符       |
| `-f file` | c从指定文件中读取 awk 脚本程序 |

**Demo**

```shell
# 不管输入什么，输出都是 nihao, linux
echo "hello" | awk '{print "nihao, linux"}'

# 从文件输入文本进行处理，输出每行的第一个字符串
awk '{print $1}' data.txt

# 指定分隔符为 :
awk -F: '{print $1}' data.txt

# 执行多个命令: 将名称替换成 dongxin，然后打印全行
echo "hello my name is wansho" | awk '{$5="dongxin"; print $0}'

# 获取缓存的大小
buff_cache=`free -h | grep Mem: | awk '{print int(substr($6,0,length($6)))}'`

# 将 awk 命令存储到文件中
cat script.awk
{print $1 "'s home directory is " $6}
awk -F: -f script.awk /etc/passwd
```

### sed 命令

```shell
# 常见的 sed 替换字符串的语法，全局替换某个字符串
sed -i 's/Search_String/Replacement_String/g' Input_File
```



### diff 命令

用于比较同一文件，两个版本的区别。

### 输入输出重定向

#### > < >> <<

Linux 有三个标准文件描述符：

| 描述符 | 描述   | 作用                 |
| ------ | ------ | -------------------- |
| 0      | stdin  | 标准输入，默认是键盘 |
| 1      | stdout | 标准输出，默认是屏幕 |
| 2      | stderr | 标准错误，默认是屏幕 |

数据流重定向符：

| 符号 | 作用                                                   | Demo                                            |
| ---- | ------------------------------------------------------ | ----------------------------------------------- |
| >    | 对输出进行重定向，也就是不输出到屏幕，改输出目的地     | `ls -al test1 1> file ` #将标准输出重定向号file |
| <    | 对输入进行重定向，也就是不再从键盘输入，改从其他源输入 |                                                 |

Demos

```shell
# 将 standard output 写入到 file 中
echo content > filename # 将输出覆盖到 filename 中，等价于 echo content 1> filename
echo 内容 >> filename     # 给文件追加内容

# 将 standard error 写入到文件中
cmd 2> file # 

# 将日志分开存储
ls -al test test2 test3 2> err.log 1> info.log
ls -al test test2 test3 2>> err.log 1>> info.log # 日志追加

# 所有输出都重定向到一个文件
ls -al test test2 test3 &> info.log

# 重定向到 null device，null device 是 Linux 系统的垃圾桶，可以把任何垃圾丢到这里，并且返回一个操作成功的返回码
echo "demo" > /dev/null
# https://en.wikipedia.org/wiki/Null_device
```

#### tee cmd

tee 命令相当于管道的一个 T 型接头，它可以将输出发往两处：一个是 stdout，一个是指定的文件名。

相当于我之前在 django 中定义的既可以将 log 写入文件，又可以将 log 打印到控制台的功能。

Demo:

```shell
date | tee log.log 
date | tee -a log.log # -a：--append 追加
python demo.py | tee -a log.log
```



### 创建临时文件和目录 mktemp

```shell
# /tmp 文件夹，大多数 Linux 发行版会默认在系统启动时删除 /tmp 目录的所有文件
mktemp log.XXXXXX # 在本地目录下创建一个临时文件，log 为文件名，mktemp 会用六个随机字符替换后面的六个X，该命令返回创建的临时文件的 name
mktemp -t log.XXXXXX # 强制在系统的临时目录(/tmp)来创建该文件，并返回该临时文件的全路径
mktemp -d tempdir.XXXXXX # 创建临时目录
```

## 文件与设备管理

### tree

```shell
生成目录树
tree -I dir # 忽略某一个文件夹
```

### cd

```shell
cd # 切换到 home 目录，等价于 cd ~
cd . # 当前的文件夹
cd - # 回到刚才的文件夹  重点！！！
cd ~ # 回到当前用户的主文件夹
cd ~user # 到某个用户的家目录
cd .. # 转到上一级文件夹
```

 ### ls

```shell
ls -h # human  人类易读的方式，文件大小会转成人易读的方式，加上单位
ls -t # 将文件按照最新修改的时间进行排序

ls -l # long 详细信息
    文件详细信息展示后，按照信息开头的字母，可以分成如下文件：
    1. d 目录
    2. - 文件
    3. l 连接文件
    4. c 设备文件中的串行端口设备，例如键盘、鼠标

ls -a # all, 包含隐藏的文件
ls -F # --classify，使输出文件的文件类型可分辨。（文件夹带上/, 可执行文件加上*）
ls -i # 显示文件的 id (inode 编号，第一个属性)
ls --group-directories-first # 优先显示文件夹
```

### mv

```bash
-i: --interactive

mv oldname newname # 更改文件名字
mv olddir/ newdir # 更改文件夹名称

mv file directory # 将文件移动到 directory 中
mv file_oldname dir/file_newname # 将文件移动到 dir 中并改名字
mv -i oldname newname # 加 -i 会在 newname 文件已经存在的情况下得到提示 
mv dir new_path # 不加参数的移动整个文件夹

# Note:
# 移动过后的文件夹，其文件的属性不会有任何改变，时间戳和 inode 编号也不会有改变。
```

### cp

```shell
cp 源文件 复制文件
cp -R/-r 目录  目标目录  # 递归复制"目录"需要添加参数-R
cp *.sh dir # 复制所有的 sh 文件到某个文件夹
```

### file

```
file 文件 # 查看文件是什么文件
```

### mkdir

```shell
mkdir -p /home/work/odp/app/bq # no error if existing, make parent directories as needed
# 创建文件夹后并进入该文件夹
cd $_ # $_ 记录了上一个命令最后一个参数
```

### tar / zip

```bash
# 打包压缩
tar -czvf haha.tar.gz file1 file2

# 拆包解压缩
tar -xzvf haha.tar.gz
tar -xzvf haha.tar.gz -C path # 解压到指定文件夹
# tar 命令解压的文件，会覆盖原文件

# zip
zip
unzip
```

### 查找命令 which, find, locate, whereis

**which** 在 path 变量中查找命令

```shell
# which 用来在所有的 PATH 路径中查找 某个命令 所在地址，例如查找 ls, cat 命令所在地址，注意每一个用户的 PATH 命令可能是不一样的，不同用户使用 which 查找某个命令的结果可能有所区别，有的用户可能找不到某个命令的地址
which cat
which ls
which -a ls # 查找所有的 ls 命令所在地址，可能 ls 不止一个
```

**find**

```shell
find -name ./ 文件名 # 在当前目录下查找某个文件

find -type f ./  # 查找当前文件夹下的 一般文件

# 注意 \; 用来告诉 find 命令查询已结束，The \; part is basically telling find "okay, I'm done with the command I wanted to execute".
# 注意: -exec 并不是管道命令，其是 find 自带的参数，xargs 是管道命令，应该和管道一起使用 
find ./ -type f -name "*.txt" -exec cp {} /test \;
find ./ -type f -name "*.txt" -exec ls -l {}  \; # 查看当前文件夹下的 txt 文件的详细信息
find ./ -type f -name "*.txt" -print | xargs ls -l # 不需要加 \; 因为是管道命令
```

**whereis 和 locate**

```
whereis 和 locate 是使用数据库来搜寻数据，类似于 everything。但是 whereis 和 locate 命令有一个缺点，对于新生成的文件和已删除的文件，不能及时的更新和维护数据库，所以可能导致新的文件查不到。
实际情况下，locate 的效果要优于 whereis

# locate 依据 /var/lib/mlocate 内癿数据库记载，找出用户输入癿关键词文件名
locate -i passwd # 查找包含文件名包含 passwd 字符串的文件，忽略大小写

# 及时更新文件数据库的命令。根据 /etc/updatedb.conf 的设定去搜寻系统硬盘内的文件名
updatedb # 更新db,比较耗时
```

### ln

```bash
# make links between files. 默认创建 硬链接

# 参数：
# -s: --symbolic, make symbolic links instead of hard links

# Demos:
# 创建硬链接，本质上是同一个文件，共享 inode 编号，而且文件显示并非链接文件，而实正常的文件，如果把源文件删除，硬链接仍然有效！注意，硬链接可执行文件复制到 PATH 变量包含的目录后，可以直接通过命令运行。
ln file link_file
ln file dir/
# 创建符号 (symbolic) 软件链接，生成一个链接类型的文件，文件大小很小，文件类型为 l
ln -s file file_link 
```

## 文件权限

### 用户增删改查

**增加用户, useradd**

```shell
参数:
-u --uid UID                 user ID of the new account
-p --password PASSWORD       encrypted password of the new account
-D --defaults print or change default useradd configuration
-m --create-home             create the user's home directory
-c --comment COMMENT         GECOS field of the new account
-g --gid GROUP               name or ID of the primary group of the new account
-s --shell 				login shell of the new account

Demos:
useradd -m -c "for work" -u 8888 -p ws6226067 -s /bin/bash work

# 注意：
# 1. 默认情况下，useradd 不会创建用户目录 
# 2. useradd 在创建用户主目录后，会将 /etc/skel/ 下的文件复制到用户目录下，这些文件时 shell 下的标准启动文件，用于用户级别的初始化
```

**删除用户，userdel**

```shell
# 删除用户，当并没有删除属于该账户的任何文件
userdel wansho

# 删除用户，并删除该用户相关的文件
userdel -r wansho # -r --remove
```

**修改用户，usermod, passwd**

```shell
usermod 参数
-c, --comment COMMENT         new value of the GECOS field
-G, --groups GROUPS           new list of supplementary GROUPS
-a, --append	append the user to the supplemental GROUPS, mentioned by the -G option without removing him/her from other groups
-l, --login NEW_LOGIN         new value of the login name
-L, --lock                    lock the user account
-U, --unlock                  unlock the user account
-p, --password PASSWORD       use encrypted password for the new password

passwd 参数
-a, --all                     report password status on all accounts
-d, --delete                  delete the password for the named account

Demos:
usermod -c "wansho test" wansho # 修改用户说明
usermod -G work wansho # 将用户 wansho 加入 work 用户组 (wansho 只属于 work 组)
usermod -a -G work wansho # 把用户 wansho 添加到 work 组，之前所属组不影响
usermod -p xxxxxx wansho # 修改 wansho 的密码为 xxxxxx

passwd wansho # 修改 wansho 用户的密码

# 注意：
# 1. 对组关系进行更改后，需要登出系统再登陆，组关系变更才会生效
# 2. 当一个用户在 /etc/passwd 中制定了某个组作为默认组后，该用户账户就不会作为该组成员在 /etc/group
```

**查看所有用户 whoami, /etc/passwd, /etc/shadow**

```shell
# 存储用户信息的文件: /etc/passwd
# 注意，该文件中有很多账户，但是大多数都是系统账户，Linux 系统会为各种各样的功能创建不同的用户账户，这些账户并不是真正的用户
# Linux 为系统账户预留了 500 以下的 UID
# /etc/passwd 中每行记录的具体内容，例如：
work:x:1001:1001::/home/work:/bin/bash
账户名:密码:UID:GroupID:备注:用户家目录:用户默认的shell类型

# /etc/passwd 中存储着每个用户的加密后的密码

# whoami 命令可以查看目前登陆的用户是谁
```

### 用户组增删该查

**增加用户组 groupadd**

```shell
Demos:
groupadd test_group # 新建一个用户组
usermod -G test_group wansho # 将 wansho 加入该用户组
```

**删除用户组 groupdel**

```
Demo:
groupdel group_name # 删除一个用户组
```

**修改用户组 groupmod**

```shell
参数：
-n, --new-name NEW_GROUP      change the name to NEW_GROUP

Demo:
groupmod -n test_group new_group 

# 注意，更改了用户组的组名后，不会影响该用户组里的用户，因为是对于用户组的引用都是基于编号的
```

**查看所有用户组 /etc/group**

```shell
Demo:
cat /etc/group # 查看所有用户组
```

###文件权限管理

**修改读写和执行的权限 chmod**

```shell
r  用4表示 
w  用2表示
x  用1表示

u user
g group
o other
a all

-R 选项: 递归修改文件内的权限

Demos
chmod 755 file
7 111 表示所有者的权限是 可读可写可运行
5 101 表示所有组的权限是 可读不可写可执行
1 001 表示其他人的权限是 可执行 

chmod 755 -R dir # 递归修改 dir 的权限

chomod -R g+rwx dir # 递归地对 dir 加上对于用户组的 rwx 权限
```

**修改文件所属用户 chown**

```shell
chown owner file # 修改 file 的 所有者 为 owner
chown owner -R dir # 递归修改
```

**修改文件所属用户组 chgrp**

```shell
chgrp grp file # 修改 file 的组为 grp
chgrp grp -R dir # 递归修改
```

**实现文件的组内共享**

```
需求：配置 wansho 的某个文件夹在 work 用户组中共享
实现：
1. 配置该文件对于用户组的权限：可读可写可执行 chmod g+r
2. 配置该文件所属用户(wansho)属于用户组(work)：usermod -a -G group work
```

## 进程管理和磁盘管理

### 进程层次图

![进程层次图](assets/1559723349422.png)

### top

```
top
显示当前系统中耗费资源最多的进程 
查看各个进程的资源占用情况，提供当前进程的快照，即时查看最活跃的进程。

top 命令的 %CPU 显示的实际上是该进程占用的单个 CPU 的大小
而 CPU(s) 显示的才是 总的 CPU 的占比。按 1 键可以切换 CPU，查看其他 CPU 的情况。
```

![Top 命令详解](assets/1559723252567.png)

### ps

process snapshot.

```
# 参数
-a 不与 terminal 相关的所有进程
-u 有效用户
-x 与 a 使用，可列出完整信息

-f --full-format listing,类似于 -l
-e 选择所有的进程
--forest 显示进程树，列出父子进程的关系

# demo
ps -fe # 等价于 ps aux
ps -ef | grep vim

ps -l # 查看自己 bash 相关的进程
ps -e # 查看所有的进程， 如果不加 e，那么只会列出该 bash 下的进程


查看所有进程的所有信息，通常与 grep 命令组合使用。查不出来进程所占用的资源量。
```

### kill

```shell
kill -9 PID # 无条件杀死某个进程
kill -HUP pid # 重新加载配置文件
ps -fe | grep Aug.*python | grep -v grep | awk '{print $2}' | xargs kill -9 # 批量杀死包含某个关键字的进程

killall http* # 结束所有以 http 开头的进程
```

### free

```
命令参数
-b 　以Byte为单位显示内存使用情况。 
-k 　以KB为单位显示内存使用情况。 
-m 　以MB为单位显示内存使用情况。
-g   以GB为单位显示内存使用情况。 
-o 　不显示缓冲区调节列。 
-s<间隔秒数> 　持续观察内存使用状况。 
-t 　显示内存总和列。 
-V 　显示版本信息。**

Demos:
free -h # 结果中的 Mem 行就是内存的使用情况
```

### df

```shell
disk free

df -h path # 查看某个文件夹所挂在的磁盘的使用情况
df -h # 查看所有挂在的磁盘的使用情况
```

### du (disk usage)

```shell
# disk usage 列出指定的文件占用的磁盘空间

du -hs file|path|* # 列出文件占用磁盘的空间
du -h --max-depth=1 # 查看当前一级目录下的文件或者文件夹占用磁盘的大小
```

### pgrep, pkill

```shell
# find or signal process by name 

pgrep -l mysql  # 返回 MySQL 的 pid
pkill -x mysql # 
```

### systemctl

system-control

```shell
systemctl stop firewalld # 关闭防火墙
```

## 网络相关

### ifconfig

```shell
ifconfig # 查看网卡信息，注意是查看已经配置好的网卡信息

ifconfig -a # 查看所有的网卡信息，没有配置的也是
```

### netstat

**介绍**

netstat 用于显示网络相关信息，可以用于查看端口被那个进程占用了

```shell
netstat -tunpl | grep 端口号
```

### 1024以下的端口

```
# Linux 系统的 1024 以下的端口只有 root 用户才能占用。
```

### lsof

lsof - list open files

```shell
lsof -i:port # 查看指定端口被哪个进程占用，功能类似于 netstat -tunpl | grep 端口号
```

### wget, curl

```shell
curl 域名 # 在终端中打印 HTML 源码，注意这里只是域名，不是完整的URL链接
curl -O http://man.linuxde.net/text.iso # O 大写，下载文件
curl -o tmp.iso http://man.linuxde.net/text.iso # 下载文件并重命名
wget http://man.linuxde.net/text.iso # 不加任何参数，直接下载文件
wget -O /home/work/temp/tmp.iso http://man.linuxde.net/text.iso # 下载文件到指定文件夹下并重命名
wget http://man.linuxde.net/text.iso -P /home/work/test  # 下载文件到指定文件夹
注意 wget 命令的 -O 参数功能包含了 -P 参数，所以两个参数不需要重复出现，demo:
wget -O /home/work/test/measure_site/measure_site/data/tmp/deploy_value_diff/baidu_ps-se-fe-tpl_aladdin-atom-1.0.362.1-53707.tar.gz ftp://getprod:getprod@getprod.scm.baidu.com/data/prod-aos/prod-64/baidu/ps-se-fe-tpl/aladdin-atom/aladdin-atom_1-0-362-1_PD_BL/aladdin-atom_1.0.362.1.tar.gz 

下载文件夹，即递归下载一个文件夹
wget -r url

重点:
wget url
curl -o rename url
```

wget 和 curl 的区别：

- `wget` is a tool to download files from servers。wget 用来从服务器下载文件
- `curl` is a tool that let's you exchange requests/responses with a server。curl 用来和服务器进行交互，其更像是一个类似浏览器的客户端。curl 支持多种应用层协议。

### ssh

ssh(secured shell) 用来远程登录访问。

ssh (SSH client) is a program for logging into a remote machine and for executing commands on a remote machine.  It is intended to provide secure en‐crypted communications between two untrusted hosts over an insecure network.  X11 connections, arbitrary TCP ports and UNIX-domain sockets can also be forwarded over the secure channel.

ssh connects and logs into the specified destination, which may be specified as either [user@]hostname or a URI of the form ssh://[user@]hostname[:port]. The user must prove his/her identity to the remote machine using one of several methods (see below).

[[ssh 实例讲解]](https://www.jianshu.com/p/b10c2b163100)

命令格式：`ssh [-p port] user@remote`，Demo：`ssh -p 22 deepin2@192.168.56.132` 

### route

多网络间路由配置（配置静态路由）

route:

<img align="left" src="assets/image-20201029085228873.png" alt="image-20201029085228873" style="zoom:80%;" />

<img align="left" src="assets/image-20201029085638645.png" alt="image-20201029085638645" style="zoom:80%;" />

Demo:

```
Linux1:
	10.0.0.128
	
Linux2:
	10.0.0.129
	192.168.1.129
	
Linux3:
	192.168.1.130
	192.168.2.130

其中 Linux2 作为路由器

添加静态路由常用参数：

add 增加路由
del 删除路由
-net 设置到某个网段的路由
-host 设置到某台主机的路由
gw     出口网关 IP地址
dev 出口网关 物理设备名

设置到某个网段的路由:
	route add -net 目标网段 gw 网关(路由器)
	例如：
	从 1 到 3，经过路由 2：route add –net 192.168.1.0/24 gw 10.0.0.129
	从 3 到 1，经过路由 2：route add -net 10.0.0.0/24 gw 10.0.0.129
```

注意，直接在 shell 中通过 route 增加静态路由，是临时的，系统重启后，则失效，如果想开启生效的话，需要在开机脚本中进行配置。

### telnet

一个与其他主机进行通信的工具集。

The telnet command is used for interactive communication with another host using the TELNET protocol. It begins in command mode, where it prints a telnet prompt ("telnet> "). If telnet is invoked with a host argument, it performs an open command implicitly; see the description below.

**测试远程主机的端口是否打开**

```shell
telnet ip port
# 退出 telnet：ctrl + ]，然后 quit
```

### 防火墙

关闭防火墙：

```shell
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --reload
```

```shell
systemctl stop firewalld # 关闭防火墙 system-control
```

能 ping 通，但是访问不了，netstat 看一下端口，可能是防火墙的问题

## 硬件相关

### ethtool 

需要 root 权限

```shell
ethtool -p 网口名字 秒数 # 让某个网口亮多少秒，服务器上的网口是可以亮的，因为服务器上通常有很多网口，不好分辨
```

### crontab 

crontab 命令用于定义循环执行的工作。

注意，crontab 一定是准时准点运行的。

crontab 命令 由 系统的 cron 系统服务控制。linux 系统上有很多例行性工作，所以 cront 系统服务是默认启动的。
crontab 如果设置每隔 半小时 执行一次，它会在 crontab 设置成功的那一刻开始计时，而不是在标准的 10.00 10.30 执行。

配置可以使用 crontab 命令的账户：`/etc/cron.allow`
配置不可以使用 crontab 命令的账户：`/etc/cron.deny`
默认情况下，只要用户不被列入 `/etc/cron.deny`，就可以执行 crontab 命令。

Summary
​    1. crontab 最小的执行单位是 分钟，所以是 年月日时分 五个时间参数。
​    2. * * * * * 分别代表 分 时 日 月 年
​    3. crontab 用于定时执行一些重复的工作，例如每天定时发一封邮件，定时备份，每天定时提醒自己做什么事，都可以在 linux 中执行
​    4. crontab 类似 linux 下的 shell 脚本，其中的注释 为 # 

crontab 命令的参数

```
-l 查阅所有的 crontab 任务
-e 进入 vim 编辑crontab命令
-r 删除所有的 crontab 命令
```

crontab 时间参数

```shell
* * * * * 分别代表 分 时 日 月 年
* 代表任意时刻都可以
, 表示或者的关系，例如 0 3,5 * * * command 表示 凌晨 3 点 和 5 点 执行命令
- 表示一段时间，例如 0-10 * * * * command 表示每小时的 0 — 10 分执行 command 命令
/n n 代表数字，即每隔 n 时间间隔执行一次，例如 */5 * * * * command 用 * 与 /5 进行搭配，表示每隔 5 分钟执行一次，也可以写成 0-59/5 * * * * * command，意思相同
 /n n 代表数字，即每隔 n 时间间隔执行一次，例如 * */1 * * * command 用 * 与 /5 进行搭配，表示每隔 一小时 执行一次
```

Demo

```shell
* * * * * date >> /home/work/tmp # 每过一分钟，将日期存储到 tmp 文件中
* * * * * python /home/work/test/crontab_test/crontab_test.py >> /home/work/test/crontab_test/log.txt # 将标准输出 1 打印的日志存储到 log.txt 中
* * * * * python /home/work/test/crontab_test/crontab_test.py >> /home/work/test/crontab_test/log.txt 2>&1 # 将标准错误输出 2 写入到 log 文件中，并且借助了 1 的管道，注意此处的 2>&1 不能改成 2>>&1
* * * * * python /home/work/test/crontab_test/crontab_test.py >> /home/work/test/crontab_test/log.txt 2>> /home/work/test/crontab_test/err_log.txt # 将正确输出信息写入 log 文件，将错误输出信息写入 error_log 文件
0 12 * * * command # 每年每月每天的中午 12:00 执行 command
* * * * * mail dmtsai -s "at"
```

注意，我们在使用 crontab 运行 Linux shell script 时，一定要指定脚本的 shell，并且尽量使用绝对路径，否则容易因为环境的原因，出现各种乱七八糟的问题：

```shell
*/5 * * * * /bin/bash /home/work/wansho_webservice/wansho_webservice/shell_scripts/buff-cache-monitor.sh >> /home/work/wansho_webservice/log/buff-cache-monitor.log 2>> /home/work/wansho_webservice/log/buff-cache-monitor.log
# 其中 /bin/bash 制定了运行的 shell
```

### rz, sz

**安装 rz sz 命令**

```
sudo apt-get install lrzsz
```

**rz**

```
rz 将本地文件上传到 linux 当天文件夹
参数如下：

-b 以二进制方式，默认为文本方式。（Binary (tell it like it is) file transfer override.）
-e 对所有控制字符转义。（Force sender to escape all control characters; normally XON, XOFF, DLE, CR-@-CR, and Ctrl-X are escaped.）

如果要保证上传的文件内容在服务器端保存之后与原始文件一致，最好同时设置这两个标志，如下所示方式使用：
rz -be
```

**sz**

```
sz 从线上机器拉取文件到本地 
参数如下：

-a 以文本方式传输（ascii）。
-b 以二进制方式传输（binary）。
-e 对控制字符转义（escape），这可以保证文件传输正确。

如果能够确定所传输的文件是文本格式的，使用 sz -a files
如果是二进制文件，使用 sz -be files

sz 好像默认不能下载文件夹，先在 服务端把文件夹打包，然后下载比较好
```

### reboot, halt, shutdown

```shell
shutdown -r +5 # 5分钟后关机

reboot # 重启

halt # 关机
```

### init

```
进入完全命令模式 init 3
进入图形化界面   init 5
重启           init 6

0 停机（千万不能把initdefault 设置为0）
1 单用户模式
2 多用户，没有 NFS(和级别3相似，会停止部分服务)
3 完全多用户模式，进入命令行界面
4 没有用到
5 x11(Xwindow) 进入图形化界面
6 重新启动（千万不要把initdefault 设置为6）
```

### sudo

```
既然切换到 root 用户需要 root 密码，那么 root 用户的密码难免被各个用户知道，为了防止 root 密码外漏，给出了 sudo 方法。并不是所有的用户都可以执行 sudo 命令，必须经过 root 用户的配置。配置完后，被配置的用户就可以使用 sudo 命令短暂的用 root 的身份执行命令，而且 sudo 后输入的密码是 用户自己的密码，这样就防止了 root 用户密码的泄漏。

在 root 下配置 sudo 命令的教程：
visudo
    在文件最后一样加入：
    work ALL=(ALL) ALL # 其中 work 是赋予 sudo 权限的普通用户，后面模式固定
    work ALL=(ALL:ALL) NOPASSWD:ALL # 该命令是赋予 work 用户 root 的权利，不需要密码
```

### su 命令

```
switch user

su - root # 等价于 su -
su - user # 切换到某个用户的家目录
su root 也可以切换到root用户，但是没有管理员权限
```

## Shell 详解 和 环境变量

### 基础知识

```
1. shell 是 Linux 系统上的一个软件，是 Linux 系统和用户进行交互的接口。
2. Bash 是 shell 的一种，是一个可执行文件 /bin/bash, (ls -alF /bin/bash)
3. 有的系统，其系统内核的 shell 和默认的交互式 shell 是不一样的，例如 ubuntu 的的默认系统 shell 为 /bin/dash
```

**zsh**

目前 geek 使用最多的 shell，是 Z Shell(zsh)，zsh 已经成为了 Mac OS 的默认 shell，[[install]](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH) [[change shell]](https://www.cyberciti.biz/faq/how-to-change-shell-to-bash/)

```shell
# 查看当前 shell
echo $SHELL

# 查看系统支持的 shell
echo /etc/shells
```



### 父 shell 和 子 shell、后台模式、jobs、coproc

**概念**

```shell
# 父shell 和 子shell 的关系，是父进程和子进程的关系，子shell 并不是真正的多进程处理，因为终端控制着 子shell 的 IO

# 开启一个 子shell，也就是一个子bash，这个子shell，也是一个子进程
bash # 由于 /bin/ 在 PATH 环境变量中进行了配置，所以可以直接输入 bash，等价于 /bin/bash

# 注意，生成 子shell 后，只有在 父shell 中 export 的变量，才会被复制到 子shell 环境中，而且 子shell 对于 父shell 的变量只有 可读 的权力
```

**命令列表**

```
# 作用：在 本shell 中批量执行命令
pwd; ls; date; sleep 10
```

**进程列表 (cmd1;cmd2;cmd3)**

```shell
# 进程列表是用括号包围起来的一组命令，其能够创建 子shell（子bash）来执行这些命令，注意，进程列表执行仍然会阻塞 父shell

# 进程列表的功能：
# 1. 在 子shell 中批量执行命令

# 在 子shell(子bash) 中执行命令列表
(date;pwd;ls) # 括号的加入使得命令列表变成了进程列表，并生成了一个 子shell 来执行对应的命令

# 查看当前 bash 的进程数
ps --forest
```

**后台模式 & 、jobs 命令、coproc**

```shell
# 进程列表的运行仍然会阻塞父shell，在后台模式中运行命令可以在处理命令的同时，让出 CLI(Command Line Interface)，以供他用。开启后台模式运行的命令，其就是一个后台作业，可以用 jobs 命令查看后台作业的详情
# 后台模式的进程就是一个 daemon，守护进程

# 开启后台模式
cmd& # 可以理解成，从前台进程转为后台守护进程
# 运行结果：[num] pid，其中 num 为 jobs 号，pid 后台作业的 进程id。

# 查看当前运行在后台模式中的所有作业
jobs
jobs -l # 查看所有后台作业的详情

# 杀死 jobs
kill -9 pid

# 将进程列表置于后台运行
(cmd1;cmd2;cmd3)& # 这么做的好处是，在 子shell 中进行繁重的处理工作，同时不会让 子shell 的 IO 受制于终端

# coproc （cop process）在后台模式执行 cmd。等价于（后台模式）
# https://www.gnu.org/software/bash/manual/html_node/Coprocesses.html
coproc cmd # 在后台模式中执行 cmd
coproc (cmd1;cmd2) # 创建一个 子shell，并在 子shell 中执行命令列表
type coproc # coproc is a shell keyword

```

**后台模式和进程列表的关系**

进程列表会进入一个子bash，并在该bash中运行命令

```
(sleep 100; echo "hehe")
bash
\_ bash
  \_ sleep
```

后台模式是创建了一个job，这个job是父bash直接创建的子进程，并且在后台运行，不会影响到父bash

```
sleep 100&
bash
\_ sleep
```



### type, 外部命令和内建命令

```shell
# shell 中执行的命令分为 外部命令 和 内部命令，外部命令通常位于 /bin, /usr/bin/,/sbin/,/usr/sbin 中
# 注意：当外部命令执行时，会创建一个 子进程(不是子shell)，这种操作叫做 forking(衍生)
# Demo: ps 是一个外部命令，所以其在 bash 中运行时，会被 bash 创建一个 子进程，其父进程就是 bash
ps -f 
UID        PID  PPID  C STIME TTY          TIME CMD
work     31967 31966  0 09:43 pts/0    00:00:00 -bash
work     32418 31967  0 10:08 pts/0    00:00:00 ps -f

# 外部命令和内部命令的区别
内部命令是 bash 中集成的命令，与 bash 编译成一体，不需要 new 一个 子进程 来运行

# 如何判断一个命令是外部命令还是内建命令
type cmd
type -a echo # --all, 有的命令有内建和外部命令两种实现方式，通过 -a 可以都显示出来

# 注意，如果一个命令的结果返回的是 xxx is hashed (/bin/xxx),那么该命令就是一个外部命令，为了加快命令的查找速度，将其路径进行 hash.
```

### 环境变量

Linux 的环境变量指的是系统中的各种重要的变量，环境变量并不是 PATH ！环境变量是一系列 key-value 的键值对。我们可以使用 `printenv` 来查看所有的环境变量。

**printenv, env, set**

```shell
# 定义：bash 用一种叫做环境变量的特性来存储有关 shell 会话和工作环境的信息。
环境变量
\_全局环境变量
\_局部环境变量
\_用户定义变量
  \_用户定义局部环境变量
  \_用户定义全局环境变量

# 全局环境变量
printenv # 查看全局环境变量
env # 同上
printenv PATH # 查看个别全局环境变量
printenv HOME # 同上
echo $PATH # 查看环境变量的值

# 让变量作为命令行参数
ls $HOME # 变量可以直接在命令行中使用

# 局部环境变量
# Linux 中没有一个只显示局部变量的命令，set 命令会显示所有变量
set # 显示所有的变量
```

**创建和删除环境变量**

```shell
# 定义一个局部环境变量,局部环境变量只在 父shell 中生效，不能传递给 子shell，也不能在 exit 后保存
my_para="wansho"
echo $my_para

# export
# 定义全局环境变量，在 父shell 中生效后，可以传递给 子shell，但是也不能在 exit 后保存；子shell 对于 父shell 的全局环境变量只具有 可读性，无法进行修改、删除的操作，即使修改了，也无法向上传递给 父shell  
my_para="wansho"
export my_para 

# 删除环境变量
unset my_para
```

### PATH：一个特殊的环境变量

```shell
# PATH 首先是一个环境变量，然后才是一个特殊的环境变量（全局），其定义了用于进行命令和程序查找的目录。

# 修改 PATH，加入新的路径
PATH=$PATH:new_way # PATH 中的路径都用 : 隔开，通过这种方式修改的环境变量，其效果只能维持到退出或重启系统，不能永久保持环境变量

# 想要修改后的 path 变量每次开机都生效，就得将 path 的改动写入 $HOME/.profile or /etc/profile (for a system-wide installation)
```

### 系统环境变量所在地址、固化环境变量、开机启动项

**/etc/profile 全局级配置文件**

```shell
# /etc/profile 文件（全系统全局的配置文件）
# /etc/profile 文件是系统上默认的 bash shell 的主启动文件。每个用户登陆，都会执行该文件。
# 正常情况下，我们可以在该脚本中配置一些全局的环境变量和开机启动项。脚本的内容如下：
if [ "$PS1" ]; then
  if [ "$BASH" ] && [ "$BASH" != "/bin/sh" ]; then
    # The file bash.bashrc already sets the default PS1.
    # PS1='\h:\w\$ '
    if [ -f /etc/bash.bashrc ]; then
      . /etc/bash.bashrc
    fi
  else
    if [ "`id -u`" -eq 0 ]; then
      PS1='# '
    else
      PS1='$ '
    fi
  fi
fi

if [ -d /etc/profile.d ]; then
  for i in /etc/profile.d/*.sh; do # 遍历 /etc/profile.d/文件夹中的 sh脚本
    if [ -r $i ]; then
      . $i
    fi
  done
  unset i
fi

# 如果升级了 Linux，那么 /etc/profile 文件也可能 update,那么我们之前在该文件中加入的环境变量和启动项都会被覆盖掉
# 综上，配置全局持久化变量的做法为：
# 在 /etc/profile.d/ 文件夹中建立一个 sh脚本，然后进行环境变量和开机启动的配置
# 我在 profile.d 文件夹下创建了一个 sophic_start.sh 脚本，其内容为
cd /users/ems
./linux_sophic.sh
# 然后授予该脚本执行权限：chmod +x sophic_start.sh
```

**$HOME下的用户级文件**

```shell
# 用户级的配置文件
# shell 会按照以下顺序查找文件，并运行第一个被找到的文件，其余的则被忽略（三个文件不一定全都存在）
$HOME/.bash_profile # .bash_profile 会去执行 .bashrc 文件
$HOME/.bash_login
$HOME/.profile

# 交互式 shell
在 CLI 下输入 bash，就会进入交互式shell，此 shell 访问 /etc/profile，只会去访问 $HOME/.bashrc # 没有 .bashrc 则创建该文件

# 综上，配置用户级别的环境变量和开启启动方法为：
配置 $HOME/.bashrc

# 注意，每次登陆 Linux 系统，bash 都会访问 /etc/profile 和 用户目录下的三个隐藏文件
```

### source，dot，sh

**区别：**

* `source`, `. `： Execute commands from a file in the current shell. 注意：是 **current shell**

* sh 是 new 一个子 shell，然后在子 shell 中执行脚本，不会污染当前 shell

**详细解释**：

`source script`命令只是简单的运行了脚本中的命令，并且是在当前的 shell 进程中运行，并不会 new 一个 子shell 来运行。运行完后，所有的变量都会保留在当前的 shell 进程中。

例如，当我们修改完环境变量时，我们可以用 source 命令运行这个脚本，使新配置的环境变量在当前的 shell 中生效。

`. script等价于 `source`，是 `source` 的 alias，但是 ubuntu 的 crontab 不支持 `source` 命令，所以以后用到 `source` 的地方，都用 `.` 代替。

`sh script` 是 new 了一个子 shell，然后在这个子shell中执行脚本，执行结果不会影响父shell。



## 软件程序安装

### 包管理器安装

**PMS**

```
Package Manage System 利用一个数据库来记录软件安装的相关信息：

1. Linux 系统安装了什么软件包
2. 每个包安装了什么文件
3. 每个已安装包的版本

两个常见的 PMS 工具：dpkg, rpm
基于 Debian 的发行版(ubuntu,Mint)使用 dpkg 命令
基于 RedHat 的发行版(Fdeora, opensuse) 使用 rpm 命令

dpkg 和 rpm 都是 PMS 的核心。
核心    前端接口
dpkg   apt-get
rpm	   yum

# 方便记忆
debian dpkg apt-get
redhat rpm  yum
```

### dpkg / apt-get / apt

apt-get is a **command line** **interface** for retrieval of packagesand information about them from authenticated sources and
for installation, upgrade and removal of packages together with their dependencies.

apt is a **commandline package manager** and provides commands forsearching and managing as well as querying information about packages. It provides the same functionality as the specialized APT tools, like apt-get and apt-cache, but enables options more suitable for interactive use by default.

apt-get 是一个接口，apt 是一个包管理器。

```shell
# dpkg 是 PMS 的核心，其前端实现中最常用的命令是 apt-get 命令

# apt-get 命令 Demos
sudo apt-get update # 更换源后的更新命令
sudo apt-get install packagename # 安装一个新的软件
sudo apt-get install git # 例如安装 git
sudo apt-get remove packagename # 卸载一个已安装的软件包（保留配置文件）
sudo apt-get -purge remove packagename # 卸载一个已安装的软件包（删除配置文件）
sudo apt-get upgrade # 更新所有已经安装的软件
sudo apt-get dist-upgrade # 将系统升级到最新版本

# dpkg 命令 Demos
dpkg -l # 查看所有已安装的软件
dpkg -L vim # 查看 vim 所安装的全部文件
dpkg --search /usr/bin/xxx # 查找某个文件始属于哪个软件包，必须是绝对路径
dpkg -r packagename
```

### rpm 和 yum

```shell
# rpm 是 PMS 的核心，其前端实现中最常用的命令是 yum 命令

# yum 命令 Demos
yum list installed 
yum provides file_name # 查看 file_name 属于哪个软件包
yum install pakcage_name
yum install package_name.rpm # 安装下载好的 rpm 安装文件，进行本地安装
yum list update # 列出所有的更新
yum update package_name 
yum update # 更新所有软件
yum remove pakcage_name
yum erase package_name # 卸载软件，删除文件
```

```shell
# 查询软件包：
rpm -qa          # 查询系统中安装的所有RPM软件包
rpm -q 软件名    # 查询指定的软件包是否被安装    
rpm -qi 软件名    # 查询系统中已安装的软件包的详细信息
rpm -ql 软件名    # 查询已安装软件包包含的文件
rpm -qf 文件名    # 查询指定的文件所属的软件包是哪个

# 如你要查你的mysql的版本可以用下面的命令：
rpm -qa | grep mysql
# 然后下面就会出来一些mysql的软件，你就可以看到它的版本
```



## Linux 运维

### 磁盘挂载 mount / mkfs / blkid / fstab

将新盘或者多余的盘，挂在到某一个目录下，并实现开机的自动化挂载

```shell
fdisk -l # 查看分区的符号
mkfs.xfs /dev/sdb # 格式化新盘
mount /dev/sdb /mysqldata # 将某块盘挂载到某一个目录下

# 实现开机自动化挂载
blkid # 查看分区的 UUID 并复制
# 编辑 /etc/fstab，增加一行：
UUID=上面查看的字符串 /mysqldata  xfs  defaults 0  0
```

### Raid

Raid 分为软 Raid 和硬 Raid。

raid0 可以提高读写速度，但并不能提供数据冗余（单纯的把数据分散到多个磁盘中，并行读取）；

raid1 可以实现数据冗余，但是空间利用率是 50%（raid 1 在 raid 0 的基础上，加上了数据冗余）；

raid5 兼顾存储性能和存储成本，是 raid0 和 raid1 的折中方案；

### 远程连接协议

#### XDMCP

远程桌面，端口号：177

#### SFTP

端口号：22

#### SSH

端口号：22

### Swap 交换空间

交换空间，就是以磁盘空间换内存空间，内存不够用的时候，把一部分内存挪到磁盘里，腾出一部分内存。

## Linux 发行版

### lsb_release

查看当前 Linux 系统是哪个发行版

lsb_release - print distribution-specific information

### uname

unix name

输出系统信息

uname - print system information

```shell
uname -a # 查看所有信息
```

另外 `/proc/version` 文件中也有系统信息

如果查看 redhat 版本的话，还有一个文件可以查看版本号：`cat /etc/redhat-release`

