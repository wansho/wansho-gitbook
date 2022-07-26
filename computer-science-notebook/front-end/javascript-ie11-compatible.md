# javascript 兼容 IE11



IE 11 只兼容到 ES5。



## IE11 不兼容的特性

* let
* 解构赋值
* 模板字符串
* 简化对象的写法
* 箭头函数 => 改成 function
* *`Array.prototype.find()`* 不兼容
* Map, Set
* class
* Object.values
* Object.entries
* Array.prototype.includes
* for of
* Array.fill
* Object.assign
* String.prototype.replaceAll()



## IE11 兼容的特性

注意，以下特性 IE11（ES5）都支持

* forEach
* map, filter
* key in Object
* Object.keys({})
* const