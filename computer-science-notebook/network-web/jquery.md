# jQuery

**jQuery 是一个 JavaScript 库。**

**jQuery 极大地简化了 JavaScript 编程。**

**jQuery 很容易学习。**

[TOC]

## How to Learn

现用现学：https://www.w3school.com.cn/jquery/index.asp

## jQuery 与油猴脚本

一个网页本身，会嵌入很多 JavaScript 脚本。我们可以利用油猴，植入自己的 JavaScript 代码，直接对原脚本中的函数进行调用。自己植入的代码，和网页源代码，是处于同一个环境下的，可以相互调用。

Demo：

```javascript
// myPlayer 是网页源码中的播放器对象，我们可以植入脚本，直接对 myPlayer 对象进行操作，从而对播放状态进行控制

function detectPlaybackStatus() {
    const date = new Date();
    console.info(date.toLocaleString() + ' 检测播放状态...')
    if (myPlayer.getState() == 'playing') {
        console.log("播放中...啥也不操作了");
    } else if (myPlayer.getState() == 'paused') { //暂停
        console.log("暂停啦！！！");
        myPlayer.play(); 
        console.log("开始播放~");
    } else if (myPlayer.getState() == 'complete') {
        console.log($('#lblTitle').text() + "播放完成！！！");
        //返回上一级
        GoBack();
    }
}
```



## jQuery 选择器

| 选择器                                                       | 实例                       | 选取                                       |
| :----------------------------------------------------------- | :------------------------- | :----------------------------------------- |
| [*](https://www.w3school.com.cn/jquery/selector_all.asp)     | $("*")                     | 所有元素                                   |
| [#*id*](https://www.w3school.com.cn/jquery/selector_id.asp)  | $("#lastname")             | id="lastname" 的元素                       |
| [.*class*](https://www.w3school.com.cn/jquery/selector_class.asp) | $(".intro")                | 所有 class="intro" 的元素                  |
| [*element*](https://www.w3school.com.cn/jquery/selector_element.asp) | $("p")                     | 所有 <p> 元素                              |
| .*class*.*class*                                             | $(".intro.demo")           | 所有 class="intro" 且 class="demo" 的元素  |
|                                                              |                            |                                            |
| [:first](https://www.w3school.com.cn/jquery/selector_first.asp) | $("p:first")               | 第一个 <p> 元素                            |
| [:last](https://www.w3school.com.cn/jquery/selector_last.asp) | $("p:last")                | 最后一个 <p> 元素                          |
| [:even](https://www.w3school.com.cn/jquery/selector_even.asp) | $("tr:even")               | 所有偶数 <tr> 元素                         |
| [:odd](https://www.w3school.com.cn/jquery/selector_odd.asp)  | $("tr:odd")                | 所有奇数 <tr> 元素                         |
|                                                              |                            |                                            |
| [:eq(*index*)](https://www.w3school.com.cn/jquery/selector_eq.asp) | $("ul li:eq(3)")           | 列表中的第四个元素（index 从 0 开始）      |
| [:gt(*no*)](https://www.w3school.com.cn/jquery/selector_gt.asp) | $("ul li:gt(3)")           | 列出 index 大于 3 的元素                   |
| [:lt(*no*)](https://www.w3school.com.cn/jquery/selector_lt.asp) | $("ul li:lt(3)")           | 列出 index 小于 3 的元素                   |
| :not(*selector*)                                             | $("input:not(:empty)")     | 所有不为空的 input 元素                    |
|                                                              |                            |                                            |
| [:header](https://www.w3school.com.cn/jquery/selector_header.asp) | $(":header")               | 所有标题元素 <h1> - <h6>                   |
| [:animated](https://www.w3school.com.cn/jquery/selector_animated.asp) |                            | 所有动画元素                               |
|                                                              |                            |                                            |
| [:contains(*text*)](https://www.w3school.com.cn/jquery/selector_contains.asp) | $(":contains('W3School')") | 包含指定字符串的所有元素                   |
| [:empty](https://www.w3school.com.cn/jquery/selector_empty.asp) | $(":empty")                | 无子（元素）节点的所有元素                 |
| :hidden                                                      | $("p:hidden")              | 所有隐藏的 <p> 元素                        |
| [:visible](https://www.w3school.com.cn/jquery/selector_visible.asp) | $("table:visible")         | 所有可见的表格                             |
|                                                              |                            |                                            |
| s1,s2,s3                                                     | $("th,td,.intro")          | 所有带有匹配选择的元素                     |
|                                                              |                            |                                            |
| [[*attribute*\]](https://www.w3school.com.cn/jquery/selector_attribute.asp) | $("[href]")                | 所有带有 href 属性的元素                   |
| [[*attribute*=*value*\]](https://www.w3school.com.cn/jquery/selector_attribute_equal_value.asp) | $("[href='#']")            | 所有 href 属性的值等于 "#" 的元素          |
| [[*attribute*!=*value*\]](https://www.w3school.com.cn/jquery/selector_attribute_notequal_value.asp) | $("[href!='#']")           | 所有 href 属性的值不等于 "#" 的元素        |
| [[*attribute*$=*value*\]](https://www.w3school.com.cn/jquery/selector_attribute_end_value.asp) | $("[href$='.jpg']")        | 所有 href 属性的值包含以 ".jpg" 结尾的元素 |
|                                                              |                            |                                            |
| [:input](https://www.w3school.com.cn/jquery/selector_input.asp) | $(":input")                | 所有 <input> 元素                          |
| [:text](https://www.w3school.com.cn/jquery/selector_input_text.asp) | $(":text")                 | 所有 type="text" 的 <input> 元素           |
| [:password](https://www.w3school.com.cn/jquery/selector_input_password.asp) | $(":password")             | 所有 type="password" 的 <input> 元素       |
| [:radio](https://www.w3school.com.cn/jquery/selector_input_radio.asp) | $(":radio")                | 所有 type="radio" 的 <input> 元素          |
| [:checkbox](https://www.w3school.com.cn/jquery/selector_input_checkbox.asp) | $(":checkbox")             | 所有 type="checkbox" 的 <input> 元素       |
| [:submit](https://www.w3school.com.cn/jquery/selector_input_submit.asp) | $(":submit")               | 所有 type="submit" 的 <input> 元素         |
| [:reset](https://www.w3school.com.cn/jquery/selector_input_reset.asp) | $(":reset")                | 所有 type="reset" 的 <input> 元素          |
| [:button](https://www.w3school.com.cn/jquery/selector_input_button.asp) | $(":button")               | 所有 type="button" 的 <input> 元素         |
| [:image](https://www.w3school.com.cn/jquery/selector_input_image.asp) | $(":image")                | 所有 type="image" 的 <input> 元素          |
| [:file](https://www.w3school.com.cn/jquery/selector_input_file.asp) | $(":file")                 | 所有 type="file" 的 <input> 元素           |
|                                                              |                            |                                            |
| [:enabled](https://www.w3school.com.cn/jquery/selector_input_enabled.asp) | $(":enabled")              | 所有激活的 input 元素                      |
| [:disabled](https://www.w3school.com.cn/jquery/selector_input_disabled.asp) | $(":disabled")             | 所有禁用的 input 元素                      |
| [:selected](https://www.w3school.com.cn/jquery/selector_input_selected.asp) | $(":selected")             | 所有被选取的 input 元素                    |
| [:checked](https://www.w3school.com.cn/jquery/selector_input_checked.asp) | $(":checked")              | 所有被选中的 input 元素                    |

## 我用到 jQuery 的项目

* [yunxuetang-script](https://github.com/wansho/yunxuetang-script)

* [wansho_webservice](https://github.com/wansho/wansho_webservice)

* [bilibili-helper-chrome-extension](https://github.com/wansho/bilibili-helper-chrome-extension)