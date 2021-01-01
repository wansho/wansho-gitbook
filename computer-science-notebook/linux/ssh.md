# SSH

[TOC]

[阮一峰 SSH 教程](https://wangdoc.com/ssh/)

## 基本知识

SSH（**Secure** Shell 的缩写）是一种网络协议，用于**加密**两台计算机之间的**通信**，并且支持各种**身份验证**机制。SSH 是协议，ssh 是基于 SSH 实现的软件。

**SSH 协议的开源实现**：**OpenSSH**

**SSH 架构**：CS 架构

**OpenSSH**：client-ssh，server-sshd，辅助工具：ssh-keygen, ssh-agent，客户端工具：scp，sftp

## ssh 客户端

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

# 在登录完服务器后，直接执行命令
ssh foo@server.example.com cat /etc/hosts
```

### 连接流程

1. 第一次连接，保存服务器的指纹

   ```
   The authenticity of host 'foo.com (192.168.121.111)' can't be established.
   ECDSA key fingerprint is SHA256:Vybt22mVXuNuB5unE++yowF7lgA/9/2bLSiO3qmYWBY.
   Are you sure you want to continue connecting (yes/no)?
   ```

   查看服务器指纹的命令：

   ```shell
   ssh-keygen -l -f /etc/ssh/ssh_host_ecdsa_key.pub
   ```

   指纹会被保存在 `~/.ssh/known_hosts` 文件中

2. 如果服务器指纹变了（例如重装系统），那么再次 ssh 连接服务器的时候，会报错：

   ```
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
   Someone could be eavesdropping on you right now (man-in-the-middle attack)!
   It is also possible that the RSA host key has just been changed.
   The fingerprint for the RSA key sent by the remote host is
   77:a5:69:81:9b:eb:40:76:7b:13:04:a9:6c:f4:9c:5d.
   Please contact your system administrator.
   Add correct host key in /home/me/.ssh/known_hosts to get rid of this message.
   Offending key in /home/me/.ssh/known_hosts:36
   ```

   意思是检测到的指纹，和本地 `~/.ssh/known_hosts` 存储的指纹不一样

   那么就需要将该服务器的指纹从本地文件中删除(其中 hostname 就是服务器的 hostname)：

   ```
   ssh-keygen -R hostname
   ```

   也可以直接清空 `~/.ssh/known_hosts` 文件，重新缓存服务器的指纹。

## SSH 密钥登录

SSH 默认采用密码登录，这种方法有很多缺点，简单的密码不安全，复杂的密码不容易记忆，每次手动输入也很麻烦。密钥登录是更好的解决方案。

### 什么是密钥

SSH 密钥登录采用的是非对称加密，每个用户通过自己的密钥登录。其中，私钥必须私密保存，不能泄漏；公钥则是公开的，可以对外发送。它们的关系是，公钥和私钥是一一对应的，每一个私钥都有且仅有一个对应的公钥，反之亦然。

如果数据使用公钥加密，那么只有使用对应的私钥才能解密，其他密钥都不行；反过来，如果使用私钥加密（这个过程一般称为“签名”），也只有使用对应的公钥解密。

### SSH 密钥登录过程

预备步骤，客户端通过`ssh-keygen`生成自己的公钥和私钥。

第一步，手动将客户端的公钥放入远程服务器的指定位置。

第二步，客户端向服务器发起 SSH 登录的请求。

第三步，服务器收到用户 SSH 登录的请求，发送一些随机数据给用户，要求用户证明自己的身份。

第四步，客户端收到服务器发来的数据，使用私钥对数据进行签名，然后再发还给服务器。

第五步，服务器收到客户端发来的加密签名后，使用对应的公钥解密，然后跟原始数据比较。如果一致，就允许用户登录。

### ssh-keygen 密钥生成

生成公钥和私钥

```shell
ssh-keygen

# 指定密钥的加密算法，通常会选择 dsa 或 rsa 算法
ssh-keygen -t dsa
```

生成的公钥和私钥文件：公钥 `~/.ssh/id_dsa.pub`，私钥 `~/.ssh/id_dsa`，如果选择 rsa 算法，那么生成的密钥文件就是：`~/.ssh/id_rsa.pub`

查看所有的公钥：`$ ls -l ~/.ssh/id_*.pub`

```shell
# -t 选择加密算法
# -b 设置密钥长度
# -C 设置密钥文件的注释
ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"

# -f 指定生成的文件名，生成 mykey 和 mykey.pub
ssh-keygen -t dsa -f mykey

# 检查某个主机名是否在 known_hosts 中
ssh-keygen -F example.com

# 将服务器的公钥指纹移出 known_hosts
ssh-keygen -R example.com
```

