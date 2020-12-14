# SSH

[TOC]

[阮一峰 SSH 教程](https://wangdoc.com/ssh/)

## 基本知识

SSH（**Secure** Shell 的缩写）是一种网络协议，用于**加密**两台计算机之间的**通信**，并且支持各种**身份验证**机制。SSH 是协议，ssh 是基于 SSH 实现的软件。

**SSH 协议的开源实现**：**OpenSSH**

**SSH 架构**：CS 架构

**OpenSSH**：client-ssh，server-sshd，辅助工具：ssh-keygen, ssh-agent，客户端工具：scp，sftp

## ssh

```shell
usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface]
           [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]
           [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]
           [-i identity_file] [-J [user@]host[:port]] [-L address]
           [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
           [-Q query_option] [-R address] [-S ctl_path] [-W host:port]
           [-w local_tun[:remote_tun]] destination [command]
```

### install

```shell
# ubuntu, debian
sudo apt install openssh-client

# centos, fedora
sudo dnf install openssh-clients
```

二进制程序所在位置：`/usr/local/bin/ssh`，`\Program Files\OpenSSH\bin\ssh.exe`

### 登录服务器

```shell
# 登录远程主机，默认使用当前的用户进行远程登录
ssh hostname/ip/ 

# 指定登录哪一个用户
ssh user@hostname
ssh -l username host

# 指定端口，默认 22 端口
ssh -p 8821 foo.com
```

### 连接流程

第一次连接：