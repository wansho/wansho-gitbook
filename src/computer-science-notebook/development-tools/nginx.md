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

# 重启，热部署
nginx -s reload

# 关闭
nginx -s stop
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

多服务反向代理 https://www.cnblogs.com/panchanggui/p/12064427.html

一个代理多个子域名的 nginx 配置

```nginx
server{
	listen 80;    # 80为公网访问的端口
	server_name *.wansho.top;  # 填入公网的Ip地址
	
	if ($http_host ~* "^(.*?)\.wansho\.top$") {    #正则表达式
		set $sub_domain $1;                     #设置变量
		set $is_matched 0; 
	}

	location / {
		if ($sub_domain ~* "running|sentiweibo|www") {
		   proxy_pass http://127.0.0.1:8000;      #域名中有 running sentiweibo，转发到 8000 端口的 Django 服务
		   set $is_matched 1;
		}
		
		if ($sub_domain ~* "rss") {
		   proxy_pass http://127.0.0.1:1200;      #域名中有shop，转发到 1200 端口的 rss 服务
		   set $is_matched 1;
		}
    
    if ($sub_domain ~* "gitlab") {
		   proxy_pass http://127.0.0.1:10880;      #域名中有shop，转发到 1200 端口的 rss 服务
		   set $is_matched 1;
		}
    
		
		# 没有匹配到，跳转到默认页面
    if ($is_matched = 0) {
      proxy_pass https://127.0.0.1:8000;
    }
		
		tcp_nodelay     on;

		proxy_set_header Host            $host;
    
    # 配置上传文件大小限制
    client_max_body_size 100m;

		proxy_set_header X-Real-IP       $remote_addr;

		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		
		root html;
		
		index index.html index.htm;
	}
}

```

