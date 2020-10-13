# nodeJS

## 配置国内镜像

[教程](https://blog.csdn.net/qq_27022241/article/details/107251657)

`npm config set registry http://registry.npm.taobao.org/`
`npm config set ELECTRON_MIRROR "https://npm.taobao.org/mirrors/electron/"`

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

