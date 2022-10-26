# nodeJS

[TOC]

## 配置国内镜像

[教程](https://blog.csdn.net/qq_27022241/article/details/107251657)

```
npm config set registry "http://registry.npm.taobao.org/"
npm config set ELECTRON_MIRROR "https://npm.taobao.org/mirrors/electron/"
```

换回官方镜像：

```
npm config set registry "https://registry.npmjs.org/"

# 检查是否配置成功
npm config get ELECTRON_MIRROR
npm config get registry
```

`npm config delete ELECTRON_MIRROR`



## 代理

配置代理

```shell
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy=https://127.0.0.1:7890
```



取消代理

```shell
npm config delete proxy
npm config delete https-proxy
```



## npm install

`npm install` 默认将 `package.json` 的配置的环境依赖下载到当前目录下的 `node_modules` 中，如果想要复用这些环境依赖，可以直接加参数：`-g --global`。

`npm install -g`



## npm pack

```
npm run pack
# 或者
npm run dist
```



## electron 项目打包

[[electron-builder 打包失败]](https://zhuanlan.zhihu.com/p/266005043)

**`npm run dist` 打包失败 - 网络问题**

网络问题，不能把 GitHub 上面的资源拉下来，需要手动切换淘宝镜像：

```shell
npm config set electron_mirror=https://npm.taobao.org/mirrors/electron/
npm config set electron-builder-binaries_mirror=https://npm.taobao.org/mirrors/electron-builder-binaries/
```

**`npm run dist` 打包失败 - cannot move downloaded into final location (another process downloaded faster?)**

关闭火绒！！！



## nvm nodejs 版本管理

```shell
# 配置默认的版本
nvm alias default v14.15.5

# 安装指定版本的 nodejs
nvm install v14.15.5

# 切换到指定的版本
nvm use v14.15.5

# 查看当前安装的版本
nvm ls
```

