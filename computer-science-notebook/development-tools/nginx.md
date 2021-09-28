# nginx

## install

ubuntu

```shell
apt-get install nginx

# 查看是否安装成功
nginx -v

# 开启 nginx
systemctl start nginx
service nginx start

# 重启
nginx -s reload
```

安装后的文件位置

```
/usr/sbin/nginx：主程序
/etc/nginx：存放配置文件
/usr/share/nginx：存放静态文件
/var/log/nginx：存放日志
```

## config

```shell
# 找到服务器nginx路径下的default.conf文件，如没有可用vim命令创建一个，编辑这个文件
vim /etc/nginx/conf.d/default.conf

server{
    listen 80;    # 80为公网访问的端口
    server_name 104.*.*.*;  # 填入公网的Ip地址
    rewrite ^/$ / break;  
    location / {
    proxy_pass http://127.0.0.1:8000;  # django中的地址和端口
    }
}

# 检查语法是否正确
nginx -t
```

