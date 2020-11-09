# 网络安全

[TOC]

## 公钥加密算法

### 对称加密

对称加密使用同一个密钥：甲方选择某一种加密规则，对信息进行加密；乙方使用同一种规则，对信息进行解密。

问题：无法安全地传递密钥。

### 非对称加密

加密和解密可以使用不同的规则，可以在不直接传递密钥的情况下，完成解密。

```
（1）乙方生成两把密钥（公钥和私钥）。公钥是公开的，任何人都可以获得，私钥则是保密的。

（2）甲方获取乙方的公钥，然后用它对信息加密。

（3）乙方得到加密后的信息，用私钥解密。
```

公钥加密的信息只有私钥解得开，那么只要私钥不泄漏，通信就是安全的。

最经典的非对称加密算法：RSA 算法。

## Hash 算法

input:  需要 hash 的对象

output: 一个唯一的确定的字符串 ID

比较经典的 Hash 算法：SHA-256(生成一个 64 位 16 进制字符串), SHA-1

## 数字签名

[阮一峰-数字签名介绍](https://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html)

## SSH key

[ssh key](https://www.ssh.com/ssh/keygen/)

### ssh-keygen

`Ssh-keygen` is a tool for creating new authentication key pairs for SSH. Such key pairs are used for automating logins, single sign-on, and for **authenticating hosts**.

### SSH Keys and Public Key Authentication

The [SSH protocol](https://www.ssh.com/ssh/protocol/) uses **public key cryptography** for authenticating hosts and users. The authentication keys, called [SSH keys](https://www.ssh.com/ssh/key/), are created using the `keygen` program.

SSH introduced [public key authentication](https://www.ssh.com/ssh/public-key-authentication) as a more secure alternative to the older `.rhosts` authentication. It improved security by avoiding the need to have password stored in files, and eliminated the possibility of a compromised server stealing the user's password.

However, SSH keys are authentication credentials just like passwords. Thus, they must be managed somewhat analogously(类似) to user names and passwords. They should have a proper termination process so that keys are removed when no longer needed.

### Creating an SSH Key Pair for User Authentication

The simplest way to generate a key pair is to run `ssh-keygen` without arguments. In this case, it will prompt(提示) for the file in which to store keys. Here's an example:

```
klar (11:39) ~>ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/ylo/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/ylo/.ssh/id_rsa.
Your public key has been saved in /home/ylo/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:Up6KjbnEV4Hgfo75YM393QdQsK3Z0aTNBz0DoirrW+c ylo@klar
The key's randomart image is:
+---[RSA 2048]----+
|    .      ..oo..|
|   . . .  . .o.X.|
|    . . o.  ..+ B|
|   .   o.o  .+ ..|
|    ..o.S   o..  |
|   . %o=      .  |
|    @.B...     . |
|   o.=. o. . .  .|
|    .oo  E. . .. |
+----[SHA256]-----+
klar (11:40) ~>
```

First, the tool asked where to save the file. SSH keys for user authentication are usually stored in the user's `.ssh` directory under the home directory. However, in enterprise environments, the location is often different. The default key file name depends on the algorithm, in this case `id_rsa` when using the default RSA algorithm. It could also be, for example, `id_dsa` or `id_ecdsa`.

Then it asks to enter a [passphrase](https://www.ssh.com/ssh/passphrase). The passphrase(密码短语) is used for encrypting the key, so that it cannot be used even if someone obtains the private key file. The passphrase should be cryptographically strong. Our [online random password generator](https://www.ssh.com/iam/password/generator) is one possible tool for generating strong passphrases.

### Choosing an Algorithm and Key Size

SSH supports several public key algorithms for authentication keys. These include:

- `rsa` - an old algorithm based on the difficulty of factoring large numbers. A key size of at least 2048 bits is recommended for RSA; 4096 bits is better. RSA is getting old and significant advances are being made in factoring. Choosing a different algorithm may be advisable. It is quite possible the RSA algorithm will become practically breakable in the foreseeable future. All SSH clients support this algorithm.
- `dsa` - an old US government Digital Signature Algorithm. It is based on the difficulty of computing discrete logarithms. A key size of 1024 would normally be used with it. DSA in its original form is no longer recommended.
- `ecdsa` - a new Digital Signature Algorithm standarized by the US government, using elliptic curves. This is probably a good algorithm for current applications. Only three key sizes are supported: 256, 384, and 521 (sic!) bits. We would recommend always using it with 521 bits, since the keys are still small and probably more secure than the smaller keys (even though they should be safe as well). Most SSH clients now support this algorithm.
- `ed25519` - this is a new algorithm added in OpenSSH. Support for it in clients is not yet universal. Thus its use in general purpose applications may not yet be advisable.

The algorithm is selected using the `-t` option and key size using the `-b` option. The following commands illustrate:

```
ssh-keygen -t rsa -b 4096
ssh-keygen -t dsa
ssh-keygen -t ecdsa -b 521
ssh-keygen -t ed25519
```

### Specifying the File Name

Normally, the tool prompts for the file in which to store the key. However, it can also be specified on the command line using the `-f <filename>` option.

```
ssh-keygen -f ~/tatu-key-ecdsa -t ecdsa -b 521
```

### Copying the Public Key to the Server

创建公钥后，把公钥配置到 GitHub 服务器上，就可以访问 GitHub。

To use public key authentication, the public key must be copied to a server and installed in an [authorized_keys](https://www.ssh.com/ssh/authorized_keys) file. This can be conveniently done using the [ssh-copy-id](https://www.ssh.com/ssh/copy-id) tool. Like this:

```
ssh-copy-id -i ~/.ssh/tatu-key-ecdsa user@host
```

Once the public key has been configured on the server, the server will allow any connecting user that has the private key to log in. During the login process, the client proves possession of the private key by digitally signing the key exchange.

### ssh

SSH provides a [secure channel](https://en.wikipedia.org/wiki/Secure_channel) over an unsecured network by using a **[client–server](https://en.wikipedia.org/wiki/Client–server_model)** architecture, connecting an [SSH client](https://en.wikipedia.org/wiki/SSH_client) application with an [SSH server](https://en.wikipedia.org/wiki/SSH_server).

ssh 是一个远程登陆服务器的命令：

```shell
ssh root@198.120.1.100
```



### 遇到的问题

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
51:82:00:1c:7e:6f:ac:ac:de:f1:53:08:1c:7d:55:68.
Please contact your system administrator.
Add correct host key in /Users/isaacalves/.ssh/known_hosts to get rid of this message.
Offending RSA key in /Users/isaacalves/.ssh/known_hosts:12
RSA host key for 104.131.16.158 has changed and you have requested strict checking.
Host key verification failed.

```

[解决思路](https://stackoverflow.com/questions/20840012/ssh-remote-host-identification-has-changed)

在本地客户端机器上，执行这个命令

```shell
ssh-keygen -R remote-IP # Remove all keys belonging to a hostname from a known_hosts file.
```

记得改之前备份 know_hosts 文件: `~/.ssh/known_hosts`

可能的原因：服务器中的配置文件中，IP 地址和公钥是配对的，现在 IP 地址没改，你公钥改了（可能是换了一台客户端），那么就无法访问服务器了。