# week-27



### 主题图片生成器

自媒体在互联网上创作，最头疼的是莫过于文章的配图了。每次我写完一篇文章，都不知道该找一张什么样的图片来契合文章的主题。

有时候我会配上自己平时拍的一些照片，虽然文不对题，但是总比没有好。

所以我干脆找了一批可以自定义生成图片的网站。

[Profile Header Generator](https://agreeable-pond-087f7a90f.1.azurestaticapps.net/) | [github](https://github.com/leviarista/github-profile-header-generator) 自定义生成 profile 图片

![image-20220705084037108](assets/image-20220705084037108-6989534.png)



[capsule-render](https://github.com/kyechan99/capsule-render) |[github](https://github.com/kyechan99/capsule-render) 根据 url 参数自动生成 svg 图片链接

```
https://capsule-render.vercel.app/api?color=gradient&height=300&section=header&text=授人以鱼，也授人以渔&fontSize=40&type=waving
```

![image-20220705105537518](assets/image-20220705105537518.png)



[github social](https://www.bannerbear.com/demos/github-social-preview-generator-tool) 输入 GitHub 仓库，自动生成图片

![image-20220705105342046](assets/image-20220705105342046.png)





### rust 静态网站生成

分享一套 rust 静态网站生成的技术栈：

* [Zola](https://github.com/getzola/zola) A fast static site generator in a single binary with everything built-in.
* [adidoks](https://github.com/aaranxu/adidoks) AdiDoks is a mordern documentation theme, which is a port of the Hugo theme Doks for Zola.



## bug 的波粒二象性

![image-20220706072415271](assets/image-20220706072415271.png)



## 平原上的夏洛克

乡土浪漫

![image-20220706132516135](assets/image-20220706132516135.png)



## jackson 反序列化

fastjson 和 jackson 是最常用的序列化和反序列化工具。

SpringBoot 自带的是 jackson，如果要切换成 fastjson，则需要单独配置。

jackson 有一个巨坑，就是无法反序列化第二个字母大写的字段，举例：

将下面的 json 反序列化成 bean 的时

```json
{
  "eMail": "wanshojs@gmail.com"
}
```

得到的 eMail 字段是 null。需要强制指定来进行反序列化：

```java
@Data
public class User {

    private String name;

    @JsonProperty("eMail")
    private String eMail;
  
  	/***
     * 前端传过来的是 more-info，解析对应到 moreInfo 字段
     */
    @JsonProperty("more-info")
    private String moreInfo;

}
```

fastjson 不存在上述问题。

fastjson 中和 @JsonProperty 功能类似的注解是：`@JSONField(name="eMail")`。

