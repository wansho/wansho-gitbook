# Redis

In-memory key-value database.

## Introduction

学习资源：

* [Redis.io](<https://redis.io/>)
* [Try-Redis](<http://try.redis.io/>)
* [Redis 30minutes](<https://www.openmymind.net/2011/11/8/Redis-Zero-To-Master-In-30-Minutes-Part-1/>)
* [Awesome Redis](<https://github.com/JamzyWang/awesome-redis>)

Redis 通常被描述为一个存储键值对的内存数据库。内存数据库的特性决定了其存取效率应该是非常高的。

Redis 的应用场景：用 Redis 替换频繁读取数据库稳定数据的逻辑，在 Web 服务与数据库之间充当缓存的功能。

## Redis Commands

### get / set / del / setnx / incr

```shell
set key-name value
get key-name

set name "wansho"
set age 13
get name
get age

# setnx set if not exists
setnx couple "someone"

# atomically increment
incr age # age 自增 1

# del key1, key2, key3 返回删除的键值对的数量，如果返回 0 则代表没有该键值对
```

### expire / ttl

```shell
set user-lock "wansho"
expire user-lock 120 # 120 秒后该变量失效

ttl user-lock # time-to-live 查看该变量距离失效还有几秒，如果返回 -2，则说明该变量已经不存在了，要么失效了，要么本身就不存在，如果返回 -1，则说明该变量是永久生效的
# 注意，如果我们重新 set 了某个变量，那么 ttl 就会被重置为初始值：120
```

### 高级数据结构

#### list

```shell
# list

lpush names "wansho" # 创建一个名为 names 的 list，并且从队尾加入值 "wansho"
rpush names "wangkai" # 从队首加入一个值，返回队列元素的个数

llen names # 返回 队列的长度

lpop names # 从队首弹出一个值，返回被弹出的值
rpop names # 从队尾弹出一个值，返回被弹出的值

lrange names 0 1 # get subset of list, 第 0，1 个元素，注意，redis 的 slice 是包含尾的
lrange names 0 -1 # 获取从第 0 个到最后一个元素
```

#### set / sorted set / hset

```shell
# set

sadd fruits "xigua" "orange"# 新建一个 set，并且加入 xigua，orange, 返回加入 set 成功的个数，注意，元素与元素之间，用空格隔开，如果用逗号隔开，那么 redis 会将逗号作为一个元素
srem fruits "xigua" # remove 

sismember fruits "xigua" # set is member: check 西瓜是否在 set 中，存在返回 1，不存在返回 0

smembers fruits # return a list of all values in set

sunion fruit1 fruit2 # 两个 set 求并集

# sorted set 有序的 set

# hset 存储的值为键值对
```

## Questions

1. Redis 是内存数据库，掉电后数据是否会被保存下来？