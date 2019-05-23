# 优雅锋利的 GitBook

首先抛结论，GitBook 目前满足了我对记笔记的所有幻想，它没有 Hexo 那么多花里胡哨的功能，它就像一把锋利的小刀，简单克制，完美解决了我使用 Hexo 中的一些痛点，满足了笔记创作者和读者最原始的需求，让创作者专注于创作，让读者专注于阅读。

![&#x4F18;&#x96C5;&#x514B;&#x5236;&#x7684; GitBook](../../.gitbook/assets/1558619487053.png)

先总结一下 GitBook 的优点：

* 实时同步 Github 仓库中的笔记
* 支持自定义域名
* GitBook + Typora + GitHub 完美解决图床问题，采用 github 仓库作为图床
* 界面优雅克制，让内容创作者专注于内容创作，让读者专注于阅读

注意，我这里写的 GitBook 是指 GitBook 提供的新版在线服务：[https://www.gitbook.com/，而不是自己根据开源代码搭建的服务，也不是](https://www.gitbook.com/，而不是自己根据开源代码搭建的服务，也不是) GitBook 的老版服务：[https://legacy.gitbook.com/](https://legacy.gitbook.com/) \(已停止新用户注册\)。下面详细介绍以下新版 GitBook 服务的优点。

## GitBook 界面优雅克制

如无必要，勿增实体。GitBook 的 UI 简洁优雅，功能也很克制，其更专注于内容创作，更专注于满足笔记创作者和读者最原始的需求，而不是其他博客框架那样，搞出各种花里胡哨的功能，但是对创作者和读者来说，实际体验并不会很好。

## 实时同步 GitHub 仓库中的笔记

**解决的痛点**：只需要在本地编辑完笔记并 push 到 GitHub，web 端立刻同步，不需要任何花里胡哨的操作，一步到位。还有一个优点，采用 Github 作为笔记仓库，可以实现笔记的版本控制。

在将 GitBook 中的 space 和 GitHub 中的仓库\(指定的笔记仓库\) 绑定\([how to bind](https://docs.gitbook.com/integrations/github>)\)后，GitBook 会自动地同步仓库中存储的笔记。当我们本地对笔记进行编辑后并 push 到 Github 仓库后，GitBook 会立即与 GitHub 仓库进行同步。

## GitBook 支持自定义域名

[How to](https://docs.gitbook.com/hosting/custom-domains>)

只需要配置一个二级域名，然后配置 CNAME 指向 GitBook，即可通过我们自己的域名访问笔记。我在阿里云上配置了一个二级域名 [https://gitbook.wansho.cn/，并配置](https://gitbook.wansho.cn/，并配置) CNAME 指向 GitBook。

## GitBook 采用 Github 仓库作为图床

**解决的痛点**：采用 GitHub 作为图床，本地 markdown 编辑完毕后，把 文本 + 图片 一同 push 到 GitHub 仓库，GitBook 能够完美解析 markdown 中嵌入的图片，不需要寻找其他不靠谱的图床。

使用 Hexo 搭建过博客的同学应该都有过找图床的经历。通常需要将图片上传到云上，然后拿到图片链接再嵌入到 markdown 笔记中，过程十分繁琐，令人倒胃口。但是使用 Typora\(markdown 编辑器 [Download](https://typora.io/#windows>)\) + GitHub + GitBook 就可以完美的解决这个痛点！步骤如下：

1. 利用 Typora 编辑器，在本地仓库建立图床，markdown 中插入的图片，链接到本仓库图床

   配置 Typora 中图片插入的模式为：`复制图片到 .assets 文件夹`\(即为图床\)，然后我们可以直接复制想要插入的图片到编辑器中，插入的图片会被复制到新建的 `.assets` 文件夹中，并且图片的链接为相对链接，链接到 `.assets` 的图片。

2. 将 markdown文本 + 本地仓库图床 push 到 GitHub

   由于图片在仓库中，并且 markdown 中的链接为相对链接，所以 markdown 在 GitHub 上的显示是正常的，但是也仅限于在 Github 上显示正常。如果想要发布到 Hexo 上，还是需要图片的绝对路径，这个时候就不可避免的需要再存储一份图片到云端图床。

3. GitBook 自动同步 GitHub 仓库，对 markdown 中嵌入的相对路径图片地址进行解析，加载 GitHub 仓库图床中的图片

   如此 GitBook 就可以完美利用 GitHub 仓库作为图床，完美的解决图床问题。

## Tips for GitBook

* 不要在 GitBook 上进行在线编辑，因为在线编辑的内容会同步到 GitHub 上，如果本地也进行了相同文件的编辑，则可能会产生冲突，导致 GitBook 因为冲突而不能同步 GitHub 上的最新笔记。
* 每一个二级目录下，都必须存放一个 README.md 用于解释该文件夹内的笔记
* 如果内容不能和 GitHub 及时同步，那么最简单有效的方法是重新绑定 GitHub 的仓库
* 如果有一个页面在 GitBook 端显示为空，那原因多半出在 SUMMARY.md 的笔记配置上，一定要注意笔记的路径

## GitBook 服务的不足

* 小白上手比较难：[DOC](https://docs.gitbook.com/>) 没有汉化，Github 有学习成本
* 没有免费的评论系统
* GitHub 同步偶尔会有小毛病

