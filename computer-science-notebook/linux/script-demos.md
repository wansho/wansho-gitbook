# Shell 脚本 Demos

[TOC]

## 学习资源

* [[一篇教会你写90%的shell脚本]](https://zhuanlan.zhihu.com/p/264346586?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
* [完善的 Bash 脚本的最简单形式](https://betterdev.blog/minimal-safe-bash-script-template/)
* 



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

## 磁盘分区 Demo

```shell
# 有问题的脚本
#!/bin/bash

# 输入 raid 盘的名字，以 sd 开头
read -p "please input raid name:" raid_name

# 对输入的 raid 盘名进行校验
# todo

# 判断 raid 是否已自动挂载，如果已挂载，则取消对 raid 盘的挂载，否则无法进行分区操纵
# todo

# 对 raid 盘进行分区
# 注意，分区的时候设置的文件系统类型关系不大，后面要对其进行格式化的
# 可选的文件系统类型为：ext2fat16, fat32 hfs, hfs+, hfsx linux-swap NTFS reiserfs ufs btrfs
parted -s "/dev/"${raid_name} \
    mklabel gpt \
    mkpart part-efi fat32 0GB 1GB \
    mkpart part-boot xfs 1GB 2GB \
    mkpart part-biosboot xfs 2GB 3GB \
    mkpart part-swap linuxswap 3GB 19GB \
    mkpart part-other xfs 19GB 100%

# 对 U 盘进行测试分区
#parted -s "/dev/"${raid_name} \
#    mklabel gpt \
#    mkpart part-efi xfs 0GB 1GB \
#    mkpart part-boot xfs 1GB 2GB \
#    mkpart part-other xfs 2GB 100%

# 对分区进行格式化
mkfs.fat "/dev/"${raid_name}"1"
mkfs.xfs "/dev/"${raid_name}"2"
mkfs.xfs "/dev/"${raid_name}"3"
mkfs.xfs "/dev/"${raid_name}"4"
mkfs.xfs "/dev/"${raid_name}"5"

# 挂载
mkdir  /boot/efi
mount "/dev/"${raid_name}"1" /boot/efi
mount "/dev/"${raid_name}"2" /boot
mount "/dev/"${raid_name}"3" /biosboot
# swap 分区挂载并激活
mkswap "/dev/"${raid_name}"4"
swapon "/dev/"${raid_name}"4"
mount "/dev/"${raid_name}"5" /

echo "over"

```

