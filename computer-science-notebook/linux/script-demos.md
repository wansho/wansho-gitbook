# Shell 脚本 Demos

[TOC]

## `#!` 的作用

`#` 用于注释，`!` 用于指定用哪个 shell 来运行脚本。

通常是 `#!/bin/bash`

## 监控进程是否运行的脚本

```shell
#!/bin/bash
# -v 是排除 grep 进程本身， print $2 是获取第二个参数，也就是 PID，反引号是为了运行后面的脚本
pid=`ps -fe | grep "python /home/work/cpu_consume/cpu_consume.py" | grep -v grep | awk '{print $2}'`
if [ -z "$pid" ]; then # $ pid 字符串为空
    echo "無程序運行"
else
    echo "有程序運行"
    kill $pid
fi
exit 0
```

## 监控缓存，超过 300M，就释放

```shell
#!/usr/bin/env bash

buff_cache=`free -h | grep Mem: | awk '{print int(substr($6,0,length($6)))}'`
# 结果有两种，xxxM 或 x.xG
if (( $buff_cache <= 4 )); then
    buff_cache=1000
fi

# buff 和 cache 的阈值，超过阈值，则清理缓存
buff_cache_threshold=300
if (( $buff_cache > $buff_cache_threshold )); then
    sync; sync; sync; echo 1 > /proc/sys/vm/drop_caches
    date
    echo "release cache success"
else
    echo "do not need to release cache"
fi
```

