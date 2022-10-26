# 常用软件整理

[TOC]

## 软件开发

| 软件名     | Windows          | macOS              | 备注                      |
| ---------- | ---------------- | ------------------ | ------------------------- |
| jdk        |                  | zulu arm jdk       | 环境变量配置              |
| maven      |                  |                    |                           |
| git        |                  |                    | 配置 GitHub 账户密码      |
| sourceTree |                  |                    |                           |
| python     |                  |                    |                           |
| nodejs     |                  |                    |                           |
| IDEA       |                  |                    | 配置同步                  |
| PyCharm    |                  |                    | 配置同步                  |
| VSCode     |                  |                    | 配置同步                  |
| Notepad++  |                  | CotEditor / VSCode |                           |
| Terminal   | Windows Terminal | iTerm + oh-my-zsh  |                           |
| ssh        | MobaXterm        | shuttle            |                           |
| 包管理     |                  | homebrew           |                           |
| Typora     |                  |                    | github 主题，1.0 版本以下 |
| Clash      |                  |                    | tangtang.win              |
| Docker     |                  |                    |                           |
| DBeaver    |                  |                    |                           |
| Go         |                  |                    |                           |
| PostMan    |                  |                    |                           |
| MySQL      |                  | docker 安装        |                           |
| 开发文档   |                  | dash               |                           |



## Chrome 浏览器

账户同步

油猴脚本：

| 功能                       | 备注 |
| -------------------------- | ---- |
| 百度 / Google 搜索结果美化 |      |
| CSDN 广告屏蔽              |      |
| 百度网盘直链下载           |      |



## 办公 / 系统工具

| 软件名            | Windows      | macOS                   | 备注 |
| ----------------- | ------------ | ----------------------- | ---- |
| 压缩解压缩        | bandzip      | keka                    |      |
| Office            |              |                         |      |
| 视频播放          | potplayer    | IINA                    |      |
| 搜索              | everything   | locate / Alfred         |      |
| 输入法            | Windows 自带 | 手心输入法 / 自带输入法 |      |
| pdf 阅读器        | 福昕阅读器   | pdf export / 福昕阅读器 |      |
| 截图工具 Snipaste |              |                         |      |
| 下载器            | IDM          | Motrix                  |      |
| 视频下载器        | IDM          | Downie 4                |      |
| 百度网盘          |              |                         |      |
| 微信 / QQ / 钉钉  |              |                         |      |
| 坚果云            |              |                         |      |
| 腾讯会议          |              |                         |      |
| 向日葵            |              |                         |      |
| 系统管家          | 火绒         | lemon                   |      |
| 录屏 gif 工具     | screenToGif  | Kap                     |      |
| 视频格式转换      |              | HandBrake               |      |



## 创作

| 软件名            | Windows | macOS     | 备注 |
| ----------------- | ------- | --------- | ---- |
| OBSStudio         |         |           |      |
| bilibili 直播姬   |         |           |      |
| bilibili 投稿工具 |         |           |      |
| 视频格式转换      |         | handbrake |      |
| 视频剪辑          |         | iMovie    |      |



## 娱乐 放松

| 软件名     | Windows | macOS | 备注 |
| ---------- | ------- | ----- | ---- |
| 网易云音乐 |         |       |      |
| QQ 音乐    |         |       |      |
|            |         |       |      |
|            |         |       |      |



## macOS

https://github.com/jaywcjlove/awesome-mac



### todo

深入学习

- [ ] Alfred

  增加浏览器历史记录搜索

- [ ] Shuttle

- [ ] iTerm 



### 快捷键 / 触摸板操作

```
# 全屏
fn + f (fullscreen)
# 锁屏
电源键
# 关闭当前窗口
command + w
# 退出当前应用
command + q
# 把应用从一个屏幕移到另一个屏幕
退出全屏幕 -> 悬停全屏按钮 -> 移到另一个屏幕
# 显示隐藏的文件
command + shift + .
# 在相同应用的不同实例之间切换
command + `
# 三指拖动选中
三个手指选中，然后左右一根手指拖动
# 最小化
command + m

# chrome
# 打开一个 tab
command + t (tab)
# 关闭一个 tab
command + w
# 刷新
command + r (refresh)

# 输入表情包
ctrl + command + space

# 反撤销
shift + command + z

# Chrome 强制刷新
shift + command + R
```



### Alfred

Alfred 就是定义一些命令

```
# 搜索文件或者文件夹
space + xxx 或者 open + xxx

# 配置了百度搜索
dd xxx

# command + 回车
打开文件所在文件夹而不是打开文件
```



### iTerm

横竖向分屏：command + D，command + D + shift

[iTerm 实现 ssh X11 forwarding](https://www.cyberciti.biz/faq/apple-osx-mountain-lion-mavericks-install-xquartz-server/)



### shuttle 穿梭

在 macOS 中穿梭



### autojump

和 shuttle 类似，autojump 可以在命令行中穿梭。



### 经验总结

```
* 配置 clash 运行规则，兼容内网
* 配置 oh-my-zsh 和 zsh
* 能够通过 nvm 安装各种版本的 nodejs
* 支持 Java 开发，Springboot 的一个项目，从 8 秒减少到 4 秒
```





### 软件资源

https://macwk.com/



### Docker

docker 适合安装服务和中间件

* mysql
* redis
* nginx



### 特有软件

| 软件                                                     | 功能                                                         | 备注    |
| -------------------------------------------------------- | ------------------------------------------------------------ | ------- |
| homebrew                                                 | 用 homebrew 安装各种程序                                     |         |
| Easy New File                                            | 集成到Finder的插件，可以在finder的任意位置点击鼠标右键，新建文件夹、txt、word、xsl、ppt、markdown、html等格式文件 |         |
| Go2Shell                                                 | 集成到finder中的插件，在finder的任意路径下，点击该图标都可以快速的打开terminal，且将terminal的路径自动前进到该文件夹路径下 |         |
| iStat                                                    | 资源监控                                                     |         |
| Itsycal                                                  | 日历软件                                                     |         |
| Alfred 4                                                 | 全自动效率神器                                               |         |
| PopClip                                                  | 划词搜索                                                     | 70 块钱 |
| Moom                                                     | 屏幕分屏                                                     | 60 块钱 |
| mouse catch                                              | 多个屏幕间快速移动鼠标                                       |         |
| [Scroll Reverser](https://pilotmoon.com/scrollreverser/) | 插上鼠标后，滚轮自然切换                                     |         |



### 公司软件兼容

| 软件        | 是否兼容 |
| ----------- | -------- |
| VPN easyvpn | 兼容     |
| VDrive      |          |
| 连接内网    | 兼容     |



### 文件目录规划

```
softwares
code
	demo
		springboot/
		
nr-code
doc
	nr
	mydoc
docker
	config
	data
	
```



### homebrew

```bash
# 安装带有界面的软件
brew install --cask firefox
```
