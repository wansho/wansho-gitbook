# GitHub

[TOC]

Long Live GitHub.

## github 经验总结

* github-pages 必须公开仓库，才能生效。

* 白嫖 License

  可以使用 github 进行免费 license 查询，有很多粗心的程序员，会把一些 license 上传到公共仓库

  例如我想获取 http://ig507.com/data/time/real/xxx?licence=xxx  的 license，可以直接去 github 中搜索 `http://ig507.com/data/time/real/ licence`，然后去 code 中查询！

## github 高级搜索

### in

Demo: 查找秒杀

```
seckill in:name # 项目名包含秒杀
seckill in:description # 项目描述包含秒杀
seckill in:readme # 项目 readme 包含秒杀

seckill in:readme,name,description # 组合搜索
```

### stars / forks 

demo:

```
springboot stars:>=5000 # 注意不要有空格
springboot forks:>=5000 # 
springboot forks:100..200 stars:80..100 # 之间
```

### 代码高亮 #L

63 行到 82 行代码高亮

```
https://github.com/wansho/DASFAA2020/blob/master/samplepaper.tex#L63-L82
```

### 项目内搜索 t

在 GitHub 仓库页面，按 `t` 键，在项目内进行搜索

### 常用搜索关键字

#### awesome

```
awesome springboot
awesome 南航计算机考研
```







## github 官方信息

信息源：https://github.com/github/roadmap

### Feature Areas

The following is a list of our current product areas:

- **code:** Code experiences (Repositories, Pull Requests, Gists)
- **planning:** Planning and tracking tools (Issues, Projects)
- **code-to-cloud:** Code-to-cloud DevOps (Actions, Packages)
- **collaboration:** Collaboration features (Pages, Wikis, Discussions)
- **security & compliance:** Code security and compliance features
- **admin-server:** Administrative features specific to GitHub Enterprise Server
- **admin-cloud:** Administrative features specific to GitHub Cloud
- **community:** Community and social features
- **ecosystem:** Ecosystem and API features
- **learning:** Education and learning features
- **insights:** Continuous learning and insights features
- **client-apps:** Client applications (Desktop, Mobile)
- **other:** Other features

### Feature

The following is a list of our current features and products, with distinct labels for filtering:

- **actions:** GitHub Actions
- **docs:** GitHub Docs
- **packages:** GitHub Packages
- **pages:** GitHub Pages

### 我的分析

当前，Github Actions 是 Github 的重点，GitHub Actions 是 Code-to-Cloud 的一种实现。



## Webhooks

Webhooks allow external services to be notified when certain events happen. When the specified events happen, we’ll send a POST request to each of the URLs you provide. Learn more in our [Webhooks Guide](https://developer.github.com/webhooks/).

当仓库发生某些动作的时候，就发起外部请求。

## GitHub 周边软件

* [Gitpod](https://github.com/gitpod-io/gitpod)

  Gitpod is an open-source Kubernetes application providing fully-baked, collaborative development environments in your browser - powered by VS Code. Tightly integrated with GitLab, GitHub, and Bitbucket, Gitpod automatically and continuously prebuilds dev environments for all your branches. 

  一个在线的 VSCode，与 Github 紧密集成在一起。缺点：加载很慢，不太好用。





## 仓库收藏

* 尝试对加密过的文本，进行解密：[Ciphey](https://github.com/Ciphey/Ciphey) 

* 开源项目讲解：[Article](https://github.com/HelloGitHub-Team/Article)

* 软件测试：[how they test](https://github.com/abhivaikar/howtheytest)

* 黑客帝国终端模拟器特效：[edex-ui](https://github.com/GitSquared/edex-ui)

* [running_page](https://github.com/yihong0618/running_page)

  国产的跑步数据管理软件，可以备份 Nike、Runtastic（Adidas Run）、佳明的 gpx 跑步数据，生成个人的跑步主页。

  这个老哥，两年学成，而且很有想法，真的佩服，感觉很惭愧

* [react-chrono](https://github.com/prabhuignoto/react-chrono)

  React 的时间轴组件
  
* [socialify](https://github.com/wei/socialify)

  generating a beautiful project image
