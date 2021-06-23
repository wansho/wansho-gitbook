# Linux Devops

[TOC]

## systemctl 部署守护进程/服务

[阮一峰 Systemd 入门教程：实战篇](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html)

1. 创建服务启动脚本 auth.sh

   ```shell
   #!/bin/csh
   source /users/ems/.cshrc
   cd $WEBSOPHIC_HOME/nr_cloud/service/auth
   java -jar -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -Xms1024m -Xmx1024m -Xmn256m -Xss256k -XX:SurvivorRatio=8 -XX:+UseConcMarkSweepGC auth-service.jar
   ```

2. 在 `/usr/lib/systemd/system` 中新建系统运行脚本 `auth.service`，`.service` 只是一种命名方式

   ```shell
   [Unit]
   Description=auth service
   After=src.service           # 指定要在哪个服务之后开启
   
   [Service]
   Type=simple
   EnvironmentFile=/users/xxx/xxx/etc/web-env # 指定环境变量所在文件
   ExecStart=/users/xxx/xxx/xxx/bin/auth.sh # 启动脚本绝对路径
   ExecReload=/bin/kill -s HUP $MAINPID # $MAINPI 是环境变量中的一些变量
   ExecStop=/bin/kill -s QUIT $MAINPID
   Restart=always # 服务挂掉后，立即重启
   PrivateTmp=true
   
   [Install]
   WantedBy=multi-user.target
   ```

3. 重新加载系统运行脚本：`systemctl daemon-reload`
4. 启动服务：`systemctl start auth.service`，也可以简写成 `systemctl start auth`
5. 配置服务开机自启：`systemctl enable auth`

服务部署完后，即使是服务被 kill 掉了，还是会马上自启！

## 网络问题

**测试远程主机的端口是否打开**

```shell
telnet ip port
# 退出 telnet：ctrl + ]，然后 quit
```

**关闭防火墙**

```shell
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --reload
```

```shell
systemctl stop firewalld # 关闭防火墙 system-control
```

能 ping 通，但是访问不了，netstat 看一下端口，可能是防火墙的问题

**查看端口被哪个进程占用**

netstat 用于显示网络相关信息，可以用于查看端口被那个进程占用了

```shell
netstat -tunpl | grep 端口号
```

lsof - list open files

```shell
lsof -i:port # 查看指定端口被哪个进程占用，功能类似于 netstat -tunpl | grep 端口号
```

## 开机自启

**全局-面向所有用户**

* `/etc/rc.local` 每次OS启动都会执行一次,所以一般放服务器管理方面的
* `/etc/profile` 每次login都会被执行一次,修改后,下次用户登录就会生效,不需要重启

**面向某个用户**

用户登录时，shell 会按照以下顺序查找文件，并运行第一个被找到的文件，其余的则被忽略（三个文件不一定全都存在）

* `$HOME/.bash_profile` # `.bash_profile` 会去执行 `.bashrc` 文件
* `$HOME/.bash_login`
* `$HOME/.profile`



## 脚本控制

基本思想：

**我们远程登陆的每一个终端，实际上都是一个 shell 进程，在该终端中运行的每个命令，都是new一个子进程（也叫作业），如果我们运行的是一个脚本，那么就会new一个子shell来运行该脚本我们在终端中输入的任何命令（或发送信号），实际上都是和 shell 进程进行交互。当我们退出终端时，那么该终端的所有子进程（包括后台模式的进程）都会结束。**

这解释了，为什么我们用 `&` 实现后端守护进程后，在关闭终端还是挂掉了，因为父 shell 结束了！如果想要在终端关闭时，保证后台进程不关闭，就要用 `nohup`

### 与 bash 交互 ctrl + C, ctrl + Z, kill -9

Ctrl + c 会生成 SIGINT(中止进程) 信号，并将其发送到 shell 中运行的所有进程，中止所有运行在该 shell 中的子进程。

Ctrl + z 会生成 SIGTSTP (暂停进程) 信号，并将其发送到 shell 中运行的所有进程，暂停所有子进程。

`kill -9 pid` 会发送一个 SIGKILL（无条件终止） 信号，并杀死指定 pid 的进程

### 后台模式详解 &

后台模式运行的进程，会将该进程与 bash shell 分离，将该进程作为系统中的一个独立的后台进程运行。

后台模式运行的进程，其仍然会将标准输出和标准错误输出打印到终端。

后台模式运行的进程，在终端 exit 的时候，同样会被杀死

### nohup 在 exit 时保留该进程

nohup 可以实现脚本一直运行，不管 shell 是否 exit。注意，nohup 会将脚本执行的所有输出，包括标准错误输出，都重定向到一个叫 `nohup.out` 的文件中。

Demo:

```shell
nohup python demo.py &
```

### 作业控制 jobs, kill, bg, fg

jobs 命令 和 kill 命令用于 shell 进程中所有子进程的作业控制。

Demo:

```shell
jobs # 查看所有后台进程，带 + 号的作业是默认作业，当前的默认作业完成后，带减号的成为下一个默认作业，任何时候，都只有一个带 + 号的作业和一个带 — 号的作业
jobs -l # 查看详细信息

kill pid # 默认发送一个 SIGHUP（挂起进程） 信号给 pid 进程

# bg 以后台模式重启停止的作业
python demo.py
ctrl + Z # 脚本暂停执行
bg # 以后台模式重启默认作业（带 + 号的作业）
bg job_id # # 按照作业 id 以后台模式重启指定的作业

# fg 以前台模式重启某作业 
fg job_id
```

### nice, renice 调整进程优先级

调度优先级是一个整数，从 -20 — +19，-20 优先级最高，+19 优先级最低。默认情况下， bash shell 中的子进程的 nice 值都是 0。注意：0 以下的优先级，只有 root 用户可以分配。

Demo

```shell
nice -n 0 python demo.py # 指定优先级 0 来运行脚本 demo.py

# renice 
# 注意：只能通过 renice 来降低进程优先级，如果想要通过 renice 提高优先级，只能使用 root 权限（sudo）
renice -n 10 -p pid 
```



