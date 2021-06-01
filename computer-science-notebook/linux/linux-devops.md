# Linux Devops

[TOC]

## 部署守护进程/服务

[参考教程](https://note.youdao.com/ynoteshare1/index.html?id=86167cd8f6731a3614380427e047c3f7&type=note)

1. 创建服务启动脚本 auth.sh

   ```shell
   #!/bin/csh
   source /users/ems/.cshrc
   cd $WEBSOPHIC_HOME/nr_cloud/service/auth
   java -jar -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -Xms1024m -Xmx1024m -Xmn256m -Xss256k -XX:SurvivorRatio=8 -XX:+UseConcMarkSweepGC auth-service.jar
   ```

2. 在 `/usr/lib/systemd/system` 中新建系统运行脚本 `auth.service`，`.service` 只是一种命名方式

   ```
   [Unit]
   Description=auth service
   After=src.service           # 指定要在哪个服务之后开启
   
   [Service]
   Type=simple
   EnvironmentFile=/users/xxx/xxx/etc/web-env # 指定环境变量所在文件
   ExecStart=/users/xxx/xxx/xxx/bin/auth.sh # 启动脚本绝对路径
   ExecReload=/bin/kill -s HUP $MAINPID
   ExecStop=/bin/kill -s QUIT $MAINPID
   Restart=always # 服务挂掉后，立即重启
   PrivateTmp=true
   
   [Install]
   WantedBy=multi-user.target
   ```

3. 重新加载系统运行脚本：`systemctl daemon-reload`
4. 启动服务：`systemctl start auth.service`，也可以简写成 `systemctl start auth`
5. 配置服务开机自启：`systemctl enable auth`



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

### 