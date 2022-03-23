# 低代码



[TOC]



## 低代码 - 后端调研

Dataway[ https://www.hasor.net/doc/display/dataway](https://gitee.com/link?target=https%3A%2F%2Fwww.hasor.net%2Fdoc%2Fdisplay%2Fdataway)

Magic-API [https://ssssssss.org/guide/intro.html](https://gitee.com/link?target=https%3A%2F%2Fssssssss.org%2Fguide%2Fintro.html)

Rocket-API-Platform https://gitee.com/alenfive/rocket-api-platform

APIjson [http://apijson.org/](https://gitee.com/link?target=http%3A%2F%2Fapijson.org%2F)

Graphql [https://graphql.cn/](https://gitee.com/link?target=https%3A%2F%2Fgraphql.cn%2F)

mybatis-plus-generator-ui https://github.com/davidfantasy/mybatis-plus-generator-ui



### 流程

前端 json —> 脚本语言 —> 脚本引擎解释执行



## magic-api

https://gitee.com/ssssssss-team/magic-api

特性

* 支持自定义 web api —> 解放了后端，不再需要写胶水代码，允许工程人员自定义数据接口

* 支持自定义模块 —> 自定义数据源插件

* 支持多数据源 —> 符合我们前端多数据源的要求

* 脚本支持断点调试

* 可以通过 magic-script 脚本直接调用 Java —> 对 Java 方法的直接封装

* 提供了与 rest 对应的第三方开发的接口 —> 除了通过 rest 接口与 web api 进行交互外，magic-api 还暴露了第三方开发者接口

  

我的思考

* magic-editor 是面向我们开发者的 magic-script 调试工具，在实际的使用时，我们还要对 magic-api 进一步地封装，自动生成 magic-script



## magic-api 待优化

### 异常处理

在往数据库插入数据的时候，如果主键重复，会报告插入失败：

```json
{
    "code": -1,
    "message": "系统内部出现错误",
    "data": null,
    "timestamp": 1647393402831,
    "executeTime": 70
}
```

但是错误信息并没有将详细的信息打印出来，此处要修改一下。



## todo

- [x] 多数据源的配置，是否所有的数据源都需要在 yml 中配置？

  不需要，只需要在 application.yml 中配置一个主数据源，然后如果增加其他数据源的话，会生成到配置文件中

- [ ] 调研 mybatis-plus-generator-ui，学习怎么选列名

- [ ] 

- [ ] 接口信息写入默认的数据库，而不是写入配置文件