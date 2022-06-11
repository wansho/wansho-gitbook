# VSCode

[TOC]

## 我的理解

轻量高效的**代码编辑工具**，而不是代码编译工具。其作为一款工具的属性更为突出，而不是一款 IDE。

## 在 Windows 系统上进行 Linux 开发

想要实现在 Windows 上进行 Linux 开发，虚拟机太笨重，占用 Windows 系统太多的资源，Windows10 提供了一个 Linux 子系统，WSL：Windows Subsystem for Linux，与 Windows 深度融合，可以通过 VSCode + Remote-WSL 访问 Linux 子系统

[[Win10 使用WSL 配合VSCode 搭建C/C++开发环境]](https://blog.csdn.net/qq_36634690/article/details/108011872)

令我感到惊奇的是，两个系统的互通性极强，体现在：

* WSL 共享 Windows 的网络（网卡、IP 都共享），都可以互相 Ping 通，子系统的 IP 地址就是 `127.0.0.1`，也就是在 Windows 上，可以通过 `127.0.0.1` 访问 Linux 子系统

  <img align='left' src="assets/image-20200913111750152.png" alt="image-20200913111750152" style="zoom:67%;" />

* 通过 Remote-WSL + VSCode，我可以直接在 VSCode 上打开 Linux 上的 project 进行开发，Windows 的 VSCode 充当了 Linux 的图形化开发界面

  <img align='left' src="assets/image-20200913112611902.png" alt="image-20200913112611902" style="zoom:67%;" />

* 在测试 Python 的时候，我安装了 Django，由于 Linux 的子系统 IP 就是 `127.0.0.1`，所以我可以直接在 Windows 系统中访问 Django Web 服务

  <img align="left" src="assets/image-20200913112823735.png" alt="image-20200913112823735" style="zoom: 50%;" />

* 文件传输：可以直接右击 VSCode 的 project，选择 Reveal in Explorer 来打开 Linux 的文件，进行两个系统的文件传输

* 连接 WSL，不需要打开 WSL App，只需要在用 VSCode 的 Remote-WSL 插件连接就行了，WSL 应该有一个后台服务一直在跑

## 高效插件

* [Remote-SSH](https://www.cnblogs.com/liyufeia/p/11405779.html) 

  远程连接服务器，编写代码的工具，类似于 Samba

  **Secure Shell** (**SSH**) is a [cryptographic](https://en.wikipedia.org/wiki/Cryptography) [network protocol](https://en.wikipedia.org/wiki/Network_protocol) for operating network services securely over an unsecured network.[[1\]](https://en.wikipedia.org/wiki/Secure_Shell#cite_note-rfc4251-1) Typical applications include remote [command-line](https://en.wikipedia.org/wiki/Command-line_interface), [login](https://en.wikipedia.org/wiki/Login), and remote command execution, but any [network service](https://en.wikipedia.org/wiki/Network_service) can be **secured** with SSH.

  SSH provides a [secure channel](https://en.wikipedia.org/wiki/Secure_channel) over an unsecured network by using a **[client–server](https://en.wikipedia.org/wiki/Client–server_model)** architecture, connecting an [SSH client](https://en.wikipedia.org/wiki/SSH_client) application with an [SSH server](https://en.wikipedia.org/wiki/SSH_server).
  
  remote-ssh 会在远程服务器上部署一个 vscode-server，如果远程服务器无法联网，则会报 `Running the contributed command: ‘_workbench.downloadResource` 的错误，解决方案为：https://blog.csdn.net/ibless/article/details/118610776
  
* [Remote-WSL]()

  Open any folder in the Windows Subsystem for Linux (WSL) and take advantage of Visual Studio Code's full feature set.



## 快捷键

| cmd                   | desc             |
| --------------------- | ---------------- |
| F1 / ctrl + shift + p | 打开 vscode 命令 |
|                       |                  |
|                       |                  |



## snippet 生成快捷键

| 快捷键 | 效果                   |
| ------ | ---------------------- |
| rcc    | react 快速生成一个组件 |
| !      | 生成 html 模板代码     |
|        |                        |

