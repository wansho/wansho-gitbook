# javascript 兼容 IE11



IE 11 只兼容到 ES5。



下面的 ES6 的新特性，都要删除：

* let, const
* 解构赋值
* 模板字符串
* 简化对象的写法
* 箭头函数 -> 改成 function
* *`Array.prototype.find()`* 不兼容
* Map, Set
* class
* Object.values
* Object.entries
* Array.prototype.includes
* for of
* 



注意，以下特性 IE11（ES5）都支持

* forEach
* map, filter
* 