# GitHub Actions

Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and **share** actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow.

[TOC]

## 入门

* [官方文档](https://docs.github.com/en/actions)
* [阮一峰入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
* [定时发送天气邮件](https://www.ruanyifeng.com/blog/2019/12/github_actions.html)

## 我的笔记

* Action 有 crontab 机制，可以定时执行
* 从 [Github RoadMap](https://github.com/github/roadmap) 中可以了解到，Github Actions 是 Code-to-Cloud 的一种方式
* Github Action 可以作为主动获取信息的一种工具，当作爬虫，当作定时脚本，薅 Github 的羊毛
* Github Action 的运行环境在国外，着意味着，我们可以在国内写脚本，在国外的服务器上运行，这样就可以访问全球的服务
* Github Action 的 Crontab 时间，是国际标准时间

## 官方文档

### 基本信息

* GitHub Actions 不支持私人仓库
* GitHub Actions 默认对每一个仓库开启
* 查找公开的

### Workflows

Workflows are custom automated processes that you can set up in your repository to build, test, package, release, or deploy any code project on GitHub. （是什么？可以用来对仓库进行构建、测试、打包、发布、部署的脚本）

Workflows run in **Linux**, macOS, Windows, and containers on **GitHub-hosted machines**, called 'runners'. Alternatively, you can also host your own runners to run workflows on machines you own or manage.（可以理解为：在 Github 提供的计算资源上跑这个仓库对应的脚本，脚本语法由 Github 制定）

You can create workflows using actions defined in your repository, open source actions in a public repository on GitHub, or a published Docker container image. （Workflows 由 Actions 组成，actions 可以来源于其他仓库）

Github Marketplace. [Using actions from GitHub Marketplace in your workflow](https://docs.github.com/en/actions/automating-your-workflow-with-github-actions/using-actions-from-github-marketplace-in-your-workflow). （查找公开的 actions）

### Core-Concepts-for-GitHub-Actions

#### Action

Action 是 Workflow 的最小单位。我们可以创建自己的 action，也可以直接使用别人分享的 action，也可以修改别人公开的 action。

Action 在 Workflow 是一个 step。

#### Artifact

Artifacts are the files created when you build and test your code. For example, artifacts might include binary or package files, test results, screenshots, or log files. 

#### Continuous Integration CI

The software development practice of **frequently committing small code changes to a shared repository**. With GitHub Actions, **you can create custom CI workflows that automate building and testing your code**. From your repository, **you can view the status of your code changes and detailed logs for each action** in your workflow. **CI saves developers time by providing immediate feedback on code changes to detect and resolve bugs faster**.

#### Continuous Deployment CD

Continuous deployment **builds on continuous integration**. When new code is committed and **passes your CI tests**, the code is **automatically deployed to production**. With GitHub Actions, **you can create custom CD workflows to automatically deploy your code** to any cloud, self-hosted service, or platform from your repository. **CD saves developers time by automating the deployment process and deploys tested, stable code changes more quickly to your customers**.

#### Event

A specific activity that **triggers** a workflow run. For example, activity can originate from GitHub when someone **pushes a commit** to a repository or when an **issue** or **pull request** is created. You can also **configure a workflow to run when an external event occurs** using the repository dispatch **webhook**. (可以通过 Webhook 外部条件触发)

#### GitHub-hosted runner

Github 提供的执行 Actions 的虚拟环境：Linux，Windows，Mac。

#### Job

A set of steps that execute on the same runner. You can define the **dependency rules** for how jobs run in a workflow file. Jobs can run at the same time in **parallel** or run **sequentially** depending on the status of a previous job. For example, a workflow can have two sequential jobs that build and test code, where the test job is dependent on the status of the build job. If the build job fails, the test job will not run. For GitHub-hosted runners, each job in a workflow runs in a fresh instance of a virtual environment. （可以并行，也可以按指定顺序执行。每一个 Job 都是隔离的，这意味着一个 Job 的变量，只局限于 Job 的内部使用）

#### Step

A step is an individual task that can run commands or actions. **A job configures one or more steps**. Each step in a job executes on the same runner, allowing the actions in that job to share information using the filesystem. （一个 job 中的多个 steps 共享当前 job 的环境变量）

#### Workflow

Workflows are **made up of one or more jobs** and can be scheduled or activated by an event.

```yaml
.github/workflows
    workflow-1.yml
    
workflow
	job-1
		step-1
			action-1
			action-2
		step-2
	job-2
		step-1
		step-2
```

#### Secrets

Secrets are environment variables that are **encrypted** and only exposed to selected actions. Anyone with **collaborator** access to this repository can use these secrets in a workflow. （Secrets 中通常放一些用户名和密码）

Secrets are not passed to workflows that are triggered by a pull request from a fork. （为了保护 Secrets，GitHub 只允许仓库的 collaborator 访问 secrets 数据，fork 就不能使用）

## 我的 GitHub Actions 需求

* awesome-kaoyan 

  * 自动生成最新的文件树
  * 为每一个 markdown 文件自动生成 TOC：已找到 TOC 的 action
  * 做一个脚本，获取每天早上的信息一览：已做了一个发天气的 action
* 检测继保官网的新闻
  
  

## Reference

* [编写自己的 GitHub Action，体验自动化部署 - 张凯强的文章 - 知乎 ](https://zhuanlan.zhihu.com/p/103552188)