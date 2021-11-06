# Logstash

[TOC]

logstash 是一个管道！可以类比成 Linux 中的管道 `|`。

## Logstash Introduction

Logstash is an open source data collection engine with real-time pipelining capabilities. Logstash can dynamically unify data from disparate sources and normalize the data into destinations of your choice. Cleanse and democratize all your data for diverse advanced downstream analytics and visualization use cases.

While Logstash originally drove innovation in log collection, its capabilities extend well beyond that use case. Any type of event can be enriched and transformed with a broad array of input, filter, and output plugins, with many native codecs further simplifying the ingestion process. Logstash accelerates your insights by harnessing a greater volume and variety of data.

<img align="left" src="assets/image-20210812191337704.png" alt="image-20210812191337704" style="zoom:50%;" />

## Logstash 日志采集方案

程序中集成 Logback 插件 LogstashTcpSocketAppender，将日志通过 tcp socket 推送给 Logstash。

缺点：侵入式，与代码耦合在一块了。不合适！

<img align="left" src="assets/image-20211106221133108.png" alt="image-20211106221133108" style="zoom: 67%;" />

## FileBeat

elastic 开发的轻量级日志采集，非侵入式，可以直接配置对日志文件进行监听，不需要改源码，不和源码耦合。

FileBeat 顾名思义，文件的心跳，就是对文件进行监听！

FileBeat 的短板：只能有一个输出。

<img align="left" src="assets/image-20211106221756199.png" alt="image-20211106221756199" style="zoom: 80%;" />

解决 FileBeat 只能有一个输出的短板：FileBeat 把消息送给 Kafka，其他应用再订阅 Kafka

<img align="left" src="assets/image-20211106222101175.png" alt="image-20211106222101175" style="zoom:80%;" />

## Logstash vs Prometheus

Logstash 更倾向于日志采集，Prometheus 更倾向于指标监控。

Kibana 和 Grafana 也是如此，Kibana 倾向于日志采集和分析，Grafana 倾向于监控。
