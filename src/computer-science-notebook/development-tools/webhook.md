# 部署自己的 webhook

[TOC]

## 源码

[webhook](https://github.com/adnanh/webhook)

## 环境部署

```shell
# 安装 go
# install tar.gz https://golang.org/doc/install
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.17.3.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
# 把 PATH=$PATH:/usr/local/go/bin 放入 /etc/profile
go version

# 安装部署 webhook
cd /home/work/webhook
git clone https://github.com/adnanh/webhook.git
cd webhook
go build
./webhook -hooks hooks.json -verbose
```

## hooks.json

在 hooks.json 中配置钩子

```
id: hook 的 id，与 http 请求 url 最后一个路径相同
execute-command: 该 hook 执行的脚本，支持 bash 和 sh
```

hooks.json 举例

```json
[
  {
    "id": "redeploy-gitbook",
    "execute-command": "/home/work/webhook/hook-scripts/redeploy-gitbook.sh"
  }
]
```

## 触发 webhook

get 请求和 post 请求都可以

```
http://yourserver:9000/hooks/redeploy-gitbook
```

