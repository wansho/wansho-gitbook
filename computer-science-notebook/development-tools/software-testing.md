# 软件测试

[TOC]

## Books

* [软件测试的艺术](<https://book.douban.com/subject/1445661/>) 软件测试领域必读圣经
* [Google软件测试之道](<https://book.douban.com/subject/25742200/>) 



## 测试经验总结

熟练使用 postman，不要使用 chrome 进行 get 请求的测试，不可靠。

熟练使用 postman 的 environment 进行不同环境下相同服务的测试，例如本机环境下和线上环境的搜索服务的测试



## 持续集成 / 自动化

Jenkins

使用 Jenkins 之前，首先要有一个自动化的需求 

## 测试开放性问题

* 某城市部分移动用户反馈无法刷新今日头条的信息流， 并且总是提示网络错误。 可能是什么原因导致的？

  可以从用户和公司两个角度来解答：

  用户: 用户手机欠费，用户所在地区网络不好，用户手机没有联网

  公司：服务该地区的机房出现问题，大概率是上线导致的问题

* 如何测试一个消息系统，这个消息系统包含了：今日头条的评论消息、点赞消息、关注提醒、头条号提醒、问答邀请和系统消息（比如头条活动）

  Kafka

## Jenkins + SpringBoot + Docker + GitHub

https://zhuanlan.zhihu.com/p/78396471