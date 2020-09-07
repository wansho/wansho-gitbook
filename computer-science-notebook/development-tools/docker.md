# Docker 

[TOC]

## Introduction

Docker 是一个和 Git 一样提高工程师效率的工具。

### Image and Container

An **image** is an **executable** package that includes everything needed to run an application: the code, a runtime, libraries, environment variables, and configuration files.

镜像是一个可以执行的包，包中打包了一个应用所需要的运行环境，运行库，环境变量，代码和配置文件等所有的依赖。这是一个静态的镜像，类似于创建的虚拟机的镜像。

A **container** is a runtime instance of an image.

一个镜像被加载运行后，就成了一个容器，容器是动态的，类似于正在运行的虚拟机。

### DockerHub

DockerHub 类似于 GitHub，我们可以在上面分享自己的 Docker 镜像。

### Container vs Virtual machine

### Dockerfile

Docker 镜像的配置 manifest 文件，包括：网络接口和存储设备的映射，要加入镜像的依赖/文件等配置。

### Docker and Kubernetes

Kubernetes can automate the whole container deployment process. 

Kubernetes 可以实现 Docker 管理，相当于 Dockers 的中控平台。

## Installation

### Windows

Docker Desktop for Windows 只支持 Windows 10 Professional or Enterprise 64-bit，不符合的 Windows 版本，例如 Win10 教育版/家庭版或者Win7 的版本，需要安装 [Docker Toolbox](<https://github.com/docker/toolbox/releases>) 来进行 Docker 的兼容。

Docker Toolbox 包含以下组件：

* Docker CLI client for running Docker Engine to create images and containers
* Docker Machine so you can run Docker Engine commands from Windows terminals
* Docker Compose for running the `docker-compose` command
* Kitematic, the Docker GUI
* the Docker QuickStart shell preconfigured for a Docker command-line environment
* Oracle VM VirtualBox

注意，如果 Git 已经安装过了，那么 Docker 的 CLI 就打不开，因为其依赖于 Git 的 Bash，此时需要修改 Docker CLI 的打开路径，将其默认路径替换成 Git 中 bash.exe 的路径：`/Git/bin/bash.exe`

如果 WIndows 开启了 Hyper-V，则需要关闭 Hyper-V。

## Docker Doc

[Docker Doc](https://docs.docker.com/) 文档学习。

![Docker Architecture Diagram](https://docs.docker.com/engine/images/architecture.svg)

### Get started

Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.

### Installation

[Installation for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)



```shell
sudo docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

```



## CLI

### docker ps 查看当前正在运行的容器

### docker version 查看版本

```shell
docker --version
```

### docker image

```shell
# ls all images in local
docker image ls
```

### docker container

```shell
# ls all container in local
docker container ls # running
docker container ls --all # all
docker container ls -aq # all in quiet mode
```









