# 持续集成



## 基本流程

* git push
* gitlab wekhook
* jenkins 拉取 gitlab 代码
* jenkins 编译代码生成 jar 包
* jenkins 上传 jar 包到服务器
* jenkins 重启 jar 包