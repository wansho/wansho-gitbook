# Docker 

[TOC]

## Introduction

Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. 

Docker provides the ability to package and run an application in a loosely isolated environment called a container. The isolation and security allow you to run many containers simultaneously on a given host. Containers are lightweight and contain everything needed to run the application, so you do not need to rely on what is currently installed on the host. You can easily share containers while you work, and be sure that everyone you share with gets the same container that works in the same way.

Docker 是一个和 Git 一样提高工程师效率的工具。

### Image and Container

An **image** is an **executable** package that includes everything needed to run an application: the code, a runtime, libraries, environment variables, and configuration files.

When running a container, it uses an isolated filesystem. This custom filesystem is provided by a **container image**. Since the image contains the container’s filesystem, it must contain everything needed to run an application - all dependencies, configuration, scripts, binaries, etc. The image also contains other configuration for the container, such as environment variables, a default command to run, and other metadata.

镜像是一个可以执行的包，包中打包了一个应用所需要的运行环境，运行库，环境变量，代码和配置文件等所有的依赖。这是一个静态的镜像，类似于创建的虚拟机的镜像。

A **container** is a runtime instance of an image.

一个镜像被加载运行后，就成了一个容器，容器是动态的，类似于正在运行的虚拟机。

Simply put, a container is simply another process on your machine that has been isolated from all other processes on the host machine. That isolation leverages [kernel namespaces and cgroups](https://medium.com/@saschagrunert/demystifying-containers-part-i-kernel-space-2c53d6979504), features that have been in Linux for a long time.

Container 就是一个进程。

### Container vs Virtual machine

### Dockerfile

Docker 镜像的配置 manifest 文件，包括：网络接口和存储设备的映射，要加入镜像的依赖/文件等配置。

### Docker and Kubernetes

Kubernetes can automate the whole container deployment process. 

Kubernetes 可以实现 Docker 管理，相当于 Dockers 的中控平台。

### Docker architecture

Docker uses a client-server architecture. The Docker *client* talks to the Docker *daemon*, which does the heavy lifting of building, running, and distributing your Docker containers. 

* The Docker daemon

  The Docker daemon (`dockerd`) listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes. A daemon can also communicate with other daemons to manage Docker services.

* The Docker client

  The Docker client (`docker`) is the primary way that many Docker users interact with Docker. When you use commands such as `docker run`, the client sends these commands to `dockerd`, which carries them out. The `docker` command uses the Docker API. The Docker client can communicate with more than one daemon.

* Docker registries

  A Docker *registry* stores Docker images. Docker Hub is a public registry that anyone can use, and Docker is configured to look for images on Docker Hub by default. You can even run your own private registry.

  When you use the `docker pull` or `docker run` commands, the required images are pulled from your configured registry. When you use the `docker push` command, your image is pushed to your configured registry.

  Docker 官方的 Registry: DockerHub，类似于 GitHub，我们可以在上面分享自己的 Docker 镜像。

* Docker images

  An *image* is a read-only template with instructions for creating a Docker container. Often, an image is *based on* another image, with some additional customization. For example, you may build an image which is based on the `ubuntu` image, but installs the Apache web server and your application, as well as the configuration details needed to make your application run.

  You might create your own images or you might only use those created by others and published in a registry. To build your own image, you create a *Dockerfile* with a simple syntax for defining the steps needed to create the image and run it. Each instruction in a Dockerfile creates a layer in the image. When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt. This is part of what makes images so lightweight, small, and fast, when compared to other virtualization technologies.

### The underlying technology

Docker is written in the [Go programming language](https://golang.org/) and takes advantage of several features of the Linux kernel to deliver its functionality. Docker uses a technology called `namespaces` to provide the isolated workspace called the *container*. When you run a container, Docker creates a set of *namespaces* for that container.

These namespaces provide a layer of isolation. Each aspect of a container runs in a separate namespace and its access is limited to that namespace.

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

## Dockerfile

Docker 的难点其实在 docker 的配置文件这里，docker 的命令迟早能熟悉的，难点在于怎么配置。

getting-started 模板：

```yaml
 # syntax=docker/dockerfile:1
 FROM node:12-alpine
 RUN apk add --no-cache python g++ make
 WORKDIR /app
 COPY . .
 RUN yarn install --production
 CMD ["node", "src/index.js"]
```



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

### docker run

```shell
docker run -d -p 80:80 docker/getting-started
```

You'll notice a few flags being used. Here's some more info on them:

- `-d` - run the container in detached mode (in the background)
- `-p 8000:80` - map port 8000 of the host to port 80 in the container
- `docker/getting-started` - the image to use

注意，docker run 以后就创建了一个 container（实体），在 container 关闭后，container 还是存在的，要 rm 掉原来的 container 然后重新编译。

如果本地没有这个 docker 镜像，就会从远程仓库里面找。

### docker build

This command used the Dockerfile to build a new container image. 

```shell
docker build -t getting-started .
```

This command used the Dockerfile to build a new container image. You might have noticed that a lot of “layers” were downloaded. This is because we instructed the builder that we wanted to start from the `node:12-alpine` image. But, since we didn’t have that on our machine, that image needed to be downloaded.

After the image was downloaded, we copied in our application and used `yarn` to install our application’s dependencies. The `CMD` directive specifies the default command to run when starting a container from this image.

Finally, the `-t` flag tags our image. Think of this simply as a human-readable name for the final image. Since we named the image `getting-started`, we can refer to that image when we run a container.

The `.` at the end of the `docker build` command tells that Docker should look for the `Dockerfile` in the current directory.

### Update

代码变更后，更新 Docker 的流程。

#### docker build 

先重新编译

```shell
docker build -t getting-started .
```

#### docker ps

Get the ID of the container by using the `docker ps` command.

```shell
 docker ps
```

#### docker stop

Use the `docker stop` command to stop the container.

```shell
 # Swap out <the-container-id> with the ID from docker ps
 docker stop <the-container-id>
```

#### docker rm

Once the container has stopped, you can remove it by using the `docker rm` command.

```shell
 docker rm <the-container-id>
```

You can stop and remove a container in a single command by adding the “force” flag to the `docker rm` command. For example: `docker rm -f <the-container-id>`

### docker login

登录 DockerHub：

```shell
docker login -u username
```

### docker tag

Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE

```shell
# docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
docker tag getting-started wansho/getting-started
```

### docker push

把本地的 docker 镜像 push 到远程仓库。默认推送到 dockerhub。

```shell
 docker push YOUR-USER-NAME/getting-started
```



### docker pull

从远程仓库拉取 docker image

```shell
docker pull wansho/getting-started:latest
```

## Docker 数据持久化 

While containers can create, update, and delete files, those changes are lost when the container is removed and all changes are isolated to that container. With volumes, we can change all of this.

[Volumes](https://docs.docker.com/storage/volumes/) provide the ability to connect specific filesystem paths of the container back to the host machine. If a directory in the container is mounted, changes in that directory are also seen on the host machine. If we mount that same directory across container restarts, we’d see the same files.

There are two main types of volumes. We will eventually use both, but we will start with **named volumes**.

### 1. named volumes

### docker volume create

```shell
docker volume create todo-db # 创建一个 named volumes
# 把 todo-db 作为镜像 getting-started 的 volume，并挂载 todo-db 到 /etc/todos 上(实际上并没有真正挂在到 /etc/todos 下面)
docker -dp 3000:3000 -v todo-db:/etc/todos getting-started 

# 查看 docker 实际把我们的数据存储到哪里了
docker volume inspect todo-db
```

```json
[
    {
        "CreatedAt": "2021-04-25T20:11:13+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/todo-db/_data",
        "Name": "todo-db",
        "Options": null,
        "Scope": "local"
    }
]
```

### 2. bind mounts

With **bind mounts**, we control the exact mountpoint on the host. We can use this to persist data, but it’s often used to provide additional data into containers. When working on an application, we can use a bind mount to mount our source code into the container to let it see code changes, respond, and let us see the changes right away.



## Multi container apps

Up to this point, we have been working with single container apps. But, we now want to add MySQL to the application stack. The following question often arises - “Where will MySQL run? Install it in the same container or run it separately?” In general, **each container should do one thing and do it well.** A few reasons:

- There’s a good chance you’d have to scale APIs and front-ends differently than databases
- Separate containers let you version and update versions in isolation
- While you may use a container for the database locally, you may want to use a managed service for the database in production. You don’t want to ship your database engine with your app then.
- Running multiple processes will require a process manager (the container only starts one process), which adds complexity to container startup/shutdown

### docker network

If two containers are on the same network, they can talk to each other. If they aren’t, they can’t.

```shell
# Create the network.
docker network create todo-app

# Start a MySQL container and attach it to the network. 
# You’ll notice we’re using a volume named todo-mysql-data here and mounting it at /var/lib/mysql, which is where MySQL stores its data. However, we never ran a docker volume create command. Docker recognizes we want to use a named volume and creates one automatically for us.
sudo docker run -d \
     --network todo-app --network-alias mysql \
     -v todo-mysql-data:/var/lib/mysql \
     -e MYSQL_ROOT_PASSWORD=secret \
     -e MYSQL_DATABASE=todos \
     mysql:5.7
     
# To confirm we have the database up and running, connect to the database and verify it connects.
docker exec -it <mysql-container-id> mysql -u root -p
```

Our app only simply needs to connect to a host named `mysql` and it’ll talk to the database! It doesn’t get much simpler than that!

重启 getting-started 容器：

```shell
#  # -w working dir; -v volume
sudo docker run -dp 3000:3000 \
   -w /app -v "$(pwd):/app" \
   --network todo-app \
   -e MYSQL_HOST=mysql \
   -e MYSQL_USER=root \
   -e MYSQL_PASSWORD=secret \
   -e MYSQL_DB=todos \
   node:12-alpine \
   sh -c "yarn install && yarn run dev"
```

### docker logs

```
docker logs container-id
```

```
 # Previous log messages omitted
 $ nodemon src/index.js
 [nodemon] 1.19.2
 [nodemon] to restart at any time, enter `rs`
 [nodemon] watching dir(s): *.*
 [nodemon] starting `node src/index.js`
 Connected to mysql db at host mysql
 Listening on port 3000
```

### docker exec

在容器中执行命令

```shell
# 在容器中连接 mysql
docker exec -it <mysql-container-id> mysql -u root -p
```

## Docker Compose



