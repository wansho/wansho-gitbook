# npm 库

[toc]





## 库

### create-react-app



react 脚手架



### lodash

Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。



```javascript
import '_' from 'lodash';
// 深拷贝
let data = _.cloneDeep(this.state.data);
```



### dayjs

时间处理的库。



### moment.js

和 dayjs 一样，是时间处理的库。



## 功能



### 代码格式化并在前端高亮展示

代码格式化：[sql-formatter](https://github.com/sql-formatter-org/sql-formatter)

前端高亮展示：[highlight.js](https://highlightjs.org/)

在 react 中引入 highlight.js：[在各种环境中使用 hightlight.js](https://juejin.cn/post/6969131238493782046)

react 中使用 highlight.js 会有如下警告，目前尚未解决：

```
One of your code blocks includes unescaped HTML. This is a potentially serious security risk.
```



## CDN



### cdnjs

https://cdnjs.com/



### unpkg

https://unpkg.com/



unpkg.com/:package@:version/:file



例如，查找 dayjs 的 js 库和插件库，可以来到这个文件夹内：https://unpkg.com/browse/dayjs@1.11.0/
