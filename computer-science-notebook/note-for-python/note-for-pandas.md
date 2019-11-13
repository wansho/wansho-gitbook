# Pandas

[TOC]

## Learning Pandas

1. 官方文档1：http://pandas.pydata.org/pandas-docs/stable/
2. 官网文档2：https://pandas.pydata.org/pandas-docs/stable/user_guide/index.html
3. [《利用 Python 进行数据分析》](<https://book.douban.com/subject/25779298/>)

## Pandas Introduction

Pandas 是 Excel 和 SQL 的结合体。Excel 和 SQL 中实现的数据处理功能，Pandas 基本上都能实现。

## Pandas 特征

* pandas 能够替换一些非常复杂的嵌套 for 循环，或者 if 的嵌套，能用 pandas 简化，就尽量用 pandas 简化，包括将 pandas 的所有值转换成一个 字典 list
* pandas 能够简化大多数的数据处理，能用 pandas，就尽量不要用其他逻辑
* 很多时候，是需要什么功能，去找 pandas 的功能，而不是学会了再去用，这种思想要转变过来
* 学习 pandas 一定要有开放的心态，我们不可能把所有的方法都记住的，我们需要具备的能力，是能敏锐的观察到 pandas 会提供一种解决这个问题的方法，然后我们再去快速的找出来；其实学习其他技术也是如此。
* Pandas 几乎所有的方法，都是级联的，cascade，在方法处理完后，都会返回一个 pandas 对象

## Pandas Series

Series 是一个类数组的数据结构，同时带有标签（lable）或者说索引（index）。

### Init a Pandas Series

新建 Series 对象，有三种常见方法

```python
from pandas import Series
ser1 = Series([1,2,3,4]) # 直接用 list 生成，index 默认从 0 开始

ser1 = Series([1,2,3,4], index=[0,1,2,3]) # 指定 index，values 值不支持 关键字参数

sdata = {'Ohio': 35000, 'Texas': 71000, 'Oregon': 16000, 'Utah': 5000} # 用字典生成，key 作为 index，value 作为 value，采用此种生成方式，比较耗费内存
ser3 = Series(sdata)
```

### Series 查找/赋值

Series 查找的时间复杂度为 O(1)，可以按照元素在 series 中的位置进行查找，也可以按照标签进行查找

```Python
series_demo[0]
series["name"]

# DataFrame Demo
for index, row in pd_data.iterrows():
    print row[0] # 按照位置查找
    print row["name"] # 按照标签查找
    
# 对 Series 的 index 重新赋值
pd_series.index = ["1","2", "3", "4"]
```

### Series 特有的方法

#### value_counts()

统计每个 value 出现的次数

```Python
pd_demo = pd.Series([1,2,3,4,5,5,2,3])
pd_demo.value_counts() # 返回一个 pandas.Series 对象，index为value 集合，value 为每一个index的频数，按照降序排列
```

#### 计算分位数 / 获取中位数

```Python
# 计算分位数
pd_series.quantile(0.5) # 将 pd_series 中的数先排序，然后获取 0.9 分位的数
```

#### Series 去重

```Python
# unique 方法，获取去重后的值，其功能等价于 set()
pd_series = pd_series.unique()
```

## Pandas DataFrame

### DataFrame Attention !!!

* DataFrame 的算数运算/函数运算等各种运算，其都是按照 index 进行匹配，我们在计算的时候，不能忽略 index 这个潜藏的因素



### DataFrame 构造

一个 DataFrame 对象就是一张数据库中的表。

DataFrame 构造方式：

* 第一种：传入一个 元素为 dict 的 sequence
* 第二种：传入一个元素为 tuple 的 sequence，并指定 column
* 第三种：传入一个 dict
* 第四种：传入一个 DataFrame (浅拷贝)
* 指定 index，column，构建一个空的 DataFrame

**注意，对于没有指定 index 的 DataFrame，其 Index 为 [0, 1, 2, 3, ……]**

```python
import pandas as pd

# 第一种：dict in list
my_list = [{"name1":"wanshuo","age":"11"}, {"name1":"wangyanan","age":"13"}]
pd_data = pd.DataFrame(my_list) # 传入一个 list 

# 第二种：tuple in list + column
my_list = [("wansho", 11), ("wandongxin", 12)]
pd_data = pd.DataFrame(my_list, columns=["name", "age"])

# 第三种：dict
data = {'name' : ['万朔', '王雅楠'], 'age' : [12,13]}
pd_data = pd.DataFrame(data)

# 第四种：传入一个 DataFrame
pd.DataFrame(dataframe)

# 构建空的 DataFrame，但是有 columns，有 index
pd_result = pd.DataFrame(index=["index1", "index2"], columns=["timelist", "type", "name", "refer"]) # pd_result 仍然是空的 pd_result.empty
```

### empty 判空

empty 适用于 Pandas 中的任何对象，包括 DataFrame， Series

```Python
# empty 判空
pandas_data = pd.DataFrame()
if pandas_data.empty:
    continue
```

### DataFrame 元素查找与替换

#### replace() 元素替换

```python
# replace 替换方法
pd_data.replace([100, 101], 1) # 把所有的 100 和 101 替换成 1
pd_data.replace([100, 101], [1, 2]) # 把 100 替换成 1，101 替换成 2
```

#### loc() 元素查找

```Python
pd_hour_statistics.loc[run_id_period, cid] += 1 # loc 的第一个值为 index，第二个值就是 column 的名字
```

### iterrows() 遍历每行

```python
# 遍历 DataFrame 每行
for index, row in pandas_data_deployed.iterrows():
    deploy_plat = row['deploy_plat'] # 直接传入
    source = row['source']
    module = row['module']
    
# 上面的代码可以用这个代替
data['rows'] = pandas_data.T.to_dict().values()
```

### concat() 数据连接

cancat 分为横向连接，纵向连接

```Python
# 纵向的连接，相当于给表中加入更多的元组
pd_deployed = [pd_863, pd_noah, pd_beehive, pd_dfp]
pd_deployed = pd.concat(pd_deployed).fillna("") # 连接并且填充空值为 ""

# 横线连接
pd.concat([pd1, pd2], axis=1)
```

###drop_duplicates() 去重

**参数**

```
subset: 
	column label or sequence of labels, optional 
	用来指定特定的列，默认所有列
keep: 
	{‘first’, ‘last’, False}, default ‘first’ 
	删除重复项并保留第一次出现的项
inplace: 
	boolean, default False 
	是直接在原来数据上修改还是保留一个副本
```

**Demo**

```Python
DataFrame.drop_duplicates(["", "", ""], keep='first', inplace=True) # 对 DataFrame 格式的数据，去除特定列的重复行，重复数据保留第一次出现的数据，就地去重

import pandas as pd
data = pd.DataFrame({'A' : [1,2,3,4], 'B' : ['a', 'b', 'a', 'b']}) 
data.drop_duplicates('B',  keep='first', inplace = True)
"""
print data
结果
 A B
 0 1 a
 1 2 b
"""
```

### index, column 设置

#### 设置 column 和 index 的 name

```Python
# 设置 index 或 columns 的 name
frame.index.name = xxx # 可以在 reset_index 的时候用到，给 index 起一个名字，然后就可以把 index 变成一个 column
frame.columns.name = yyy
```

#### reindex()

注意：reindex 只是改变 pandas 数据按照 index 的排列顺序，并不是更改 index

```Python
frame.reindex(columns = [...], index=[...])
# 如果没有指定 index 和 column，那么默认修改 index
frame.reindex(['a', 'b', 'c'], fill_value=0) # 如果 'c' 无对应的值，则为 Nan
```

#### 导出 index 和 column

注意，pd_data.index 和 pd_data.column 返回的都是一个 Iterable 对象，这样可以在适当的情况下节省内存

```Python
index_list = pd_data.index.tolist()
column_list = pd_data.column.tolist()
```

#### 重命名 rename()

可以通过 rename 重命名 column 和 index，需要注意的是，rename 默认并不是一个 inplace 函数，其仍然符合 cascade 法则，会开辟一块新的内存，最好加上 `inplace=True` 的参数。

```Python
# 修改 column
pd_whitelist = pd_whitelist.rename(columns = {"deploy_module": "module", "monitor_whitelist": "idc" }, inplace=True)
```

#### 重置 index / index 对齐

当我们对多个 DataFrame 进行计算时，往往需要两个 DataFrame 进行 Index 对齐，目前我发现的最简单的方法是：

```Python
pd_data = pd_data.reset_index().drop("index", axis=1) # index 为 index name

# reset_index() 用于将 index 转成 column，然后 index 重新设置为 0,1,2,3
```

#### column 转 index: set_index

```Python
# 将某几列转成行索引
pd_frame = pd_frame.set_index(["column1", "column2"])
```

### 导出某列的值

```Python
# 获取字段对应的列的所有值，转成 list
name = pd_data['姓名'] # 这里返回了 姓名 的Series
name = pd_data.姓名.tolist()
name_list = pd_data['姓名'].tolist()
```

### 获取元组个数

```Python
pd_size = len(pd_data)
```

### sort_values 排序

sort_values 已经替换了 sort_index 的功能，其可以对 index 和 column 进行排序。默认情况下，该方法对 index 进行排序，但是该方法已经可以根据 `by` 自动识别 index 和 column，我们不需要显式的指定 index 还是 value，但是为了严谨一点，我们还是加入 axis = 1，表示是对 column 进行排序

```Python
pandas_data = pandas_data.sort_values(by = ["created_time", "age"], ascending = [False,True], axis=1) 	
```

### append / concat 添加行列 

axis = 1: 添加列; axis = 0: 添加行

注意，如果我们合并的行列与 index 无关的话，那么最好加上 `ignore_index` ，否则 index 在合并的时候，可能会带来问题。

```Python
# 添加 行，
pd_result = pd.concat([pd_result, pd_new_data], ignore_index=True, axis=1)

# 添加列
pd_result = pd.concat([pd_result, pd_new_data], ignore_index=True, axis=1)
```

```Python
# append 只能用来添加元组，并返回一个新的对象
pd_vote_tor_train.append(pd_vote_for_test, ignore_index=True)
```

### drop 删除数据

Drop specified labels from rows or columns. 返回 drop 之后的 pandas

```Python
# 删除两列
pd_data = pd_data.drop(["vote_result", "score"], axis=1)

# 删除行数据，
frame.drop([index1, index2]) # 默认 drop 删除行数据 axis = 0 就是行
```

### 矩阵转置

```Python
# 矩阵和图标的转置
pd_demo = pd_demo.T
```

## 空值 / missing value处理

### 判断空值, isnull(), notnull()

```python
# isnull, notnull 检测缺失值
pd.isnull(obj)
pd.notnull(obj)
```

## Pandas 科学计算 / 函数 / 映射

### 科学计算

```python
# 引入 numpy 的科学计算函数
import numpy as np
np.log2(pd_data)
np.log10(pd_data)
np.exp(pd_data)

# 求最大值最小值
pd_demo.max()
# 如果 pd_demo 是 DataFrame，则默认对列进行操作，获取每列的最大值，形成一个 series
# 如果 pd_demo 是 Series，则返回最大值

# Series 可以直接进行算术运算
(pd_statistics_daycount * pd_sum_statistics).sort_values(ascending=False)
# Series 在进行算术运算时可以自动对齐不同索引的数据，而笛卡尔积式的索引

# apply
pd_data["meddle_time"] = (pd_data["meddle_end"].apply(
            lambda x: datetime.datetime.strptime(str(x), "%Y-%m-%d %H:%M:%S")) - \
                            pd_data["meddle_start"].apply(
            lambda x: datetime.datetime.strptime(str(x), "%Y-%m-%d %H:%M:%S")))


```

### map 方法实现映射

map 方法需要传入一个 func，该 func 可以是 built-in function ，也可以是 lambda expression

```Python
pd_frame["animal"] = data["food"].map(str.lower).map(food_to_animal_dict)
```

### 排序

```Python
# 对 Series 进行排序
pd_statistics_daycount = pd.Series(statistics_daycount_dict).sort_values(ascending=False) # 按值进行排序
pd_statistics_daycount = pd.Series(statistics_daycount_dict).sort_index(ascending=False) # 按索引进行排序
```

### 集合运算

#### index 扩展/差集/交集/并集

```
append 连接另一个index对象，返回一个新的index

diff 计算差集
intersection 计算交集
union 计算并集
```

## Pandas 内存优化

### 深拷贝与浅拷贝

```python
pd_demo_copy= pd.DataFrame(pd_demo) # pd_demo_copy 其实是 pd_demo 的一个浅拷贝，对 pd_demo_copy 的任何操作，当相当于直接对 pd_demo_copy 进行操作
pd_demo_copy = pd_demo.copy(deep=True) # 这才是深拷贝
```

### Iterable objects

如果我们想要对 iterable objects 进行变换，那么就不需要将其先转成 list `to_list()` 再变换

```Python
obj.index # 返回 RangeIndex类型的可迭代的对象
obj.values # 返回 numpy.ndarray 类型的可迭代的对象
```

### inplace 选项

大多数方法都有 inplace 选项，如果 inplace = True，就不会开辟额外的内存。例如 drop_duplicates 方法，就有 inplace 选项，下面列举一下带有 inplace 选项的方法：

```
rename
drop_duplicates
```

## Pandas Index and Select

pandas 数据筛选，其功能等价于 sql 语句的 where 条件筛选。

官网文档：<https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html>

### Tips

* Python 的 index operator `[]` 和 attribute operator `.`在 pandas 中同样通用。但是在不知道传入数据的数据类型的情况下，使用 index/attribute 操作符往往会出现一些意想不到的问题，例如`chained assignment`。所以我们要尽量用 Pandas 提供的 API 写 Pandasic 的代码，而不是 Pythonic。

  总的来说，在系统报 `SettingWithCopy` 的错误时，我们应该将 chained assignment 改成 loc 的模式。 

  | Object Type | Selection(Chained assignment) | Return Value Type                 |
  | ----------- | ----------------------------- | --------------------------------- |
  | Series      | `series[label]`               | scalar value                      |
  | DataFrame   | `frame[colname]`              | `Series` corresponding to colname |

* Pandas 的数据筛选的大部分 API，都是 Series/DataFrame 通用的，所以同样一个 API，以下的示例通常有两个Demo

* Pandas 中的 label-based slice 是包含尾部元素的

* ix 已经被 iloc 和 loc 替换

### `[].` Operator Synx

#### 添加新列

注意，不能使用 attribute 的方式创建新列

```Python
# 添加新列
pd_data["flag"] = "defaut_value"
df.two = [4, 5, 6] # 会报 UserWarning

```

#### select

```Python
df1[lambda df: df.columns[0]] # 选取第一列
```

### `[].` Operator 和 loc 的优缺点分析

|                | 优点     | 缺点                                  |
| -------------- | -------- | ------------------------------------- |
| `[] .`         | 简洁明了 | 1. 不能 slice 2. 会导致很多奇怪的问题 |
| `loc(),iloc()` | 准确规范 | 不够简洁                              |

### Slice for DataFrame

DataFrame 的 slice 是对行进行 slice。

```Python
df[:3] # 对前三行进行 slice
df[::-1] # 按行逆置
```

### loc (label-based index)

loc 是根据 label 进行查找，label 包括 index 和 column。

| Object Type | Indexers                             |
| ----------- | ------------------------------------ |
| Series      | `s.loc[indexer]`                     |
| DataFrame   | `df.loc[row_indexer,column_indexer]` |

**Series**

```Python
# 对 Series 进行切片
s1 = pd.Series(np.random.randn(6), index=list('abcdef'))
"""
a    1.431256
b    1.340309
c   -1.170299
d   -0.226169
e    0.410835
f    0.813850
dtype: float64
"""
s1.loc['c':] # 从 c slice 到最后
s1.loc['b'] # 获取 index 为 b 对应的值
s1.loc['c':] = 0 # slice 后统一赋值

# slice slice 是对 3 到 5 之间的元素进行 slice，并不是 对 3，4，5进行 slice，slice 是按照 index 顺序的
s = pd.Series(list('abcde'), index=[0, 3, 2, 5, 4])
s.loc[3:5] # 3,2,5
s.sort_index() # 对数据按照 index 进行排序
```

**DataFrame**

```Python
df1 = pd.DataFrame(np.random.randn(6, 4),
                     index=list('abcdef'),
                     columns=list('ABCD'))
df1.loc[['a', 'b', 'd'], :] # sample index 为 a,b,d 的 dataframe
df1.loc['d':, 'A':'C'] # sample index 为 d, column 为 ABC 的 dataframe
df1.loc['a'] # sample index 为 a 的 series
df1.loc['a', 'A'] # get a value in df1["a"]["A"]

dfi.loc[:, 'C'] = dfi.loc[:, 'A'] # 新建 C 列，并将 A 列的数据赋值给 C 列
```

### iloc (postion-based index)

loc 是根据 position 进行 index 的。

**Series**

```Python
s1 = pd.Series(np.random.randn(5), index=list(range(0, 10, 2)))
s1.iloc[:3] # 获取前三个数据
s1.iloc[3] # 获取第四个数据
s1.iloc[:3] = 0 # 对前三个数据进行赋值

```

**DataFrame**

```Python
df1 = pd.DataFrame(np.random.randn(6, 4),
                       index=list(range(0, 12, 2)),
                       columns=list(range(0, 8, 2)))
df1.iloc[:3] # 获取前三行的 df
df1.iloc[1:5, 2:4] # 获取第二行到第五行，第三列到第四列的 df
df1.iloc[[1, 3, 5], [1, 3]] # 获取第 2，4，6 行，第2，4列的 df
df1.iloc[1:3, :]
df1.iloc[1] # 获取第二行的 series

# assign a dict to a row of a DataFrame
x = pd.DataFrame({'x': [1, 2, 3], 'y': [3, 4, 5]})
x.iloc[1] = {'x': 9, 'y': 99}
```

注意，当 slice 的界限超出了 pandas 的界限时，pandas 的处理方式 和 Python 的处理方式一样，都返回空，但是对于指定的 index，如果超出了界限，就会报 `IndexError`

### Selection By Callable

在 select 的时候加入函数，实现更复杂的 select

```Python
df1 = pd.DataFrame(np.random.randn(6, 4),
                       index=list('abcdef'),
                       columns=list('ABCD'))
"""
 	A         B         C         D
a -0.023688  2.410179  1.450520  0.206053
b -0.251905 -2.213588  1.063327  1.266143
c  0.299368 -0.863838  0.408204 -1.048089
d -0.025747 -0.988387  0.094055  1.262731
e  1.289997  0.082423 -0.055758  0.536580
f -0.489682  0.369374 -0.034571 -2.484478
"""
df1.loc[lambda df: df.A > 0, :] # 对 row 进行 select，条件为 列 A 的值 > 0
"""
 	A         B         C         D
c  0.299368 -0.863838  0.408204 -1.048089
e  1.289997  0.082423 -0.055758  0.536580
"""
df1.loc[:, lambda df: ['A', 'B']] # 选取 A，B 列
df1.iloc[:, lambda df: [0, 1]] # 选取第一列和第二列
df1[lambda df: df.columns[0]] # 选取第一列
df1.A.loc[lambda s: s > 0] # 选取第一列中大于0的元素

# 两列进行比较
pd_candidate[pd_candidate.label != pd_candidate.predicted_label]
```

### sample() / head()

```Python
df_sample = df1.sample(n=5) # 随机采样 5 个元素
df.head(n=10) # 选取头几个元素
```

### at / iat 快速 index

`[] .` ，和 `loc,iloc` 都是先进行查找，再进行列查找，查找效率很低。如果想要快速定位到某一个位置的值，可以使用 `at/iat`

```Python
df1 = pd.DataFrame({'A':list("avb")})
df1.iat[0,0] # 返回 a
df1.iat[0,0] = "s" # 赋值
```

### Boolean Selecting

Operators: |`for `or`, `&` for `and`, and `~` for `not`

注意，这些操作符必须被 `()` 圈起来。

```Python
# series
s = pd.Series(range(-3, 4))
s[s > 0] # 返回大于 0 的 series
s[(s < -1) | (s > 0.5)] # 返回一定范围的 series

# dataframe
df[df['A'] > 0] 
df2 = pd.DataFrame({'a': ['one', 'one', 'two', 'three', 'two', 'one', 'six'],
                       'b': ['x', 'y', 'y', 'x', 'y', 'x', 'x'],
                       'c': np.random.randn(7)})
criterion = df2['a'].map(lambda x: x.startswith('t'))
df2[criterion]
"""
       a  b         c
2    two  y  0.041290
3  three  x  0.361719
4    two  y -0.238075
"""
df2[criterion & (df2['b'] == 'x')] # 多个条件
"""
 	a  	  b       c
3  three  x  0.361719
"""
df2.loc[criterion & (df2['b'] == 'x'), 'b':'c'] # 多多个条件
"""
 	b         c
3  x  0.361719
"""

pandas_selected = pandas_data[(pandas_data.status == 'fail') \
                            & ((pandas_data.reason == 'online') \
                               | (pandas_data.reason == 'known_online') \
                               | (pandas_data.reason == 'deploy')
                              )]

# 否定的使用
pandas_selected = pandas_data[~(pandas_data.status == 'fail')]
```

### select with isin()

```Python
s = pd.Series(np.arange(5), index=np.arange(5)[::-1], dtype='int64')
s.isin([2, 4, 6])
"""
4    False
3    False
2     True
1    False
0     True
dtype: bool
"""
s[s.isin([2, 4, 6])]
"""
2    2
0    4
dtype: int64
"""
s[s.index.isin([2, 4, 6])] # 判断 index isin

# df
pd_vote_for_test = pd_training_data[pd_training_data.hash_id.isin(test_hash_id)]

# not in 
pd_vote_for_test = pd_training_data[~(pd_training_data.hash_id.isin(test_hash_id))]
```

### `where()` method for select

where 和 boolen select 的区别：

Boolean select 出来的数据，通常是原 pandas 的子集，而 where 可以保留原 pandas 的结构。

```Python
s.where(s > 0)
"""
4    NaN
3    1.0
2    2.0
1    3.0
0    4.0
dtype: float64
"""
```

### `query()` method for select

[`DataFrame`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html#pandas.DataFrame) objects have a [`query()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.query.html#pandas.DataFrame.query) method that allows selection using an expression.

query() 的优点：

* 兼容 Python 的语法，更接近自然语言表达，例如其兼容 and/or/in/not in
* `DataFrame.query()` using `numexpr` is slightly faster than Python for large frames.

```Python
df[(df.a < df.b) & (df.b < df.c)] # 等价于
df.query('(a < b) & (b < c)') # 等价于
df.query('a < b & b < c') # 等价于
df.query('a < b and b < c')

df.query('a in b') # 等价于
df[df.a.isin(df.b)]

df.query('a not in b') # 等价于
df[~df.a.isin(df.b)] 

df.query('a in b and c < d')

df.query('b == ["a", "b", "c"]') # simlilar to in ，等价于
df[df.b.isin(["a", "b", "c"])]

df.query('[1, 2] in c')
df.query('[1, 2] not in c')
```

### Returning a view versus a copy

`SettingWithCopy` warning !!! 的原因：

```Python
dfmi = pd.DataFrame([list('abcd'),
                      list('efgh'),
                      list('ijkl'),
                      list('mnop')],
                      columns=pd.MultiIndex.from_product([['one', 'two'],
                                                        ['first', 'second']]))
"""
    one          two       
  first second first second
0     a      b     c      d
1     e      f     g      h
2     i      j     k      l
3     m      n     o      p
"""

dfmi.loc[:, ('one', 'second')] = value 
# 等价于
dfmi.loc.__setitem__((slice(None), ('one', 'second')), value) # 一步到位

dfmi['one']['second'] = value 
# 等价于
dfmi.__getitem__('one').__setitem__('second', value) # 由于不确定 getitem 返回的对象是原对象还是新 copy 的对象，所以才会抛出 SettingWithCopy 的警告
```



## Pandas 数据重塑和透视表

**stack， unstack**

**stack**: 将 dataframe 转成 多重索引的 series

**unstack**: 将 多重索引的 series 转成 dataframe

```python
pd_series.unstack("index1") # 将 index1 转成以 index1 为 column 的 dataframe
```

**pivot**

```python
# pivot 用于将 信息量很大的长表（例如从数据库中读取的一张表），透视成一张宽表
pd_frame.pivot("index_column", "column_column", "value")
# 参数一：Column to use to make new frame’s index. If None, uses existing index.
# 参数二：Column to use to make new frame’s columns.
# 参数三：Column(s) to use for populating new frame’s values. If not specified, all remaining columns will be used and the result will have hierarchically indexed columns.
# raise: When there are any index, columns combinations with multiple values. DataFrame.pivot_table when you need to aggregate.
```

**pivot_table**

用于将长表变短表

http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.pivot_table.html#pandas.DataFrame.pivot_table

```python
df = pd.DataFrame({"A": ["foo", "foo", "foo", "foo", "foo",
                          "bar", "bar", "bar", "bar"],
                   "B": ["one", "one", "one", "two", "two",
                         "one", "one", "two", "two"],
                   "C": ["small", "large", "large", "small",
                         "small", "large", "small", "small",
                         "large"],
                   "D": [1, 2, 2, 3, 3, 4, 5, 6, 7]})
'''         
df
     A    B      C  D
0  foo  one  small  1
1  foo  one  large  2
2  foo  one  large  2
3  foo  two  small  3
4  foo  two  small  3
5  bar  one  large  4
6  bar  one  small  5
7  bar  two  small  6
8  bar  two  large  7
'''    

table = pivot_table(df, values='D', index=['A', 'B'],
                     columns=['C'], aggfunc=np.sum)
''' 
table
C        large  small
A   B
bar one    4.0    5.0
    two    7.0    6.0
foo one    4.0    1.0
    two    NaN    6.0
'''    

table = pivot_table(df, values=['D', 'E'], index=['A', 'C'],
                   aggfunc={'D': np.mean, 'E': [min, max, np.mean]})
'''
table
                  D   E
               mean max median min
A   C
bar large  5.500000  16   14.5  13
    small  5.500000  15   14.5  14
foo large  2.000000  10    9.5   9
    small  2.333333  12   11.0   8
'''
```

## pandas 字符串处理函数

[Index with Str](<https://pandas.pydata.org/pandas-docs/stable/user_guide/text.html#indexing-with-str>)

```python
# 过滤出 name 列包含有 pandas 的数据
pd_frame = pd_frame[pd_frame.name.str.contains("pandas")] # 类似的进行判断的字符串方法还有 endswith, startswith

# 对 name 列进行正则表达式的匹配，返回的是匹配到的 series
pd_series = pd_frame.name.str.match(pattern)
"""
index0 ["wansho", "wangkai"]
index2 ["libohan", "guandonghai"]
"""
# 获取元素的第 几个 字符
pd_series = pd_series.str.get(0)
# join 元素列表 
pd_series = pd_series.str.join("-")

# 判断 name 列的所有名字，某个字符串的出现次数
pd_series = pd_frame.name.str.count("love")

# 对某列的长度进行筛选
df = df[df.A.str.len() > 2]

# 其他函数
lower(), upper()
center() # 在字符串左右两边添加空白符
repeat(3) # 字符串重复 3 次
replace(pattern, str, regex=True) # 用 str 替换 pattern 匹配的模式
split() # 根据分隔符或正则表达式对字符串进行拆分
strip(), lstrip(), rstrip()
len() 

```

## pandas merge/concat 详解

```python
* merge 等价于数据库上的外连接，merge 是横向的连接
* 等值连接的时候，如果按照左边为主，就是左外连接，如果按照右边为主，就是右外连接
* 没有内连接
* 自然连接 没有 how 属性
* 外连接一共有三种：（都是等值连接）
    1. 外连接 how = 'out'
    2. 左外连接 how = 'left'
    3. 右外连接 how = 'right'
* 参数 on 就是设置按照哪一列进行等值连接

参考：
https://blog.csdn.net/zhouwenyuan1015/article/details/77334889
https://blog.csdn.net/starter_____/article/details/79198137

Code Demo1：
loss_data = pd.merge(pandas_data_deployed, pandas_data_called, how = 'left', on = columnsOfCoverageMerge)
pandas_data_deployed_columns_len = len(pandas_data_deployed.columns) # 获取字段数 22 个
col_y = loss_data.columns[pandas_data_deployed_columns_len] # 获取某个字段

loss_data = loss_data[loss_data[col_y].isnull()] # 如果该字段为空（NaN），那么选取该组数据，该方法经常用来获取两张表关于 某一 字段 的差集
如果是左连接，那么 isnull() 得到的就是关于某一字段的 A - B 的差集  
如果是右连接，那么 isnull() 得到的就是关于某一字段的 B - A 的差集  
注意如果是左连接，那么字段判空选择的字段 X 肯定是右边的那个表的非等值连接的某个字段，也就是可能会产生 空值 的字段。

loss_data = loss_data[columnsOfCoverageMerge]

Code Demo2：
data1 = {
        'A': ['a1', 'a1', 'a2', 'a2'],
        'B': ['b1', 'b2', 'b3', 'b4'],
        'C': [5, 6, 8, 12]
        }
data2 = {
        'B': ['b1', 'b2', 'b3', 'b3', 'b5'],
        'E': [3, 7, 10, 2, 2]
        }

pandas_data1 = pd.DataFrame(data1)
pandas_data2 = pd.DataFrame(data2)

merge_data1 = pd.merge(pandas_data1, pandas_data2, 
                 how = 'left', on = ['B'])
merge_data2 = pd.merge(pandas_data1, pandas_data2, how = 'outer', 
                 on = ['B']).fillna(0)
print merge_data1[merge_data1['A'].isnull()]
print merge_data1
print merge_data2

# left_on, right_on
pd.merge(pd_left, pd_right, left_on=["name"], right_on=["姓名"])

# suffixes 对于重复的字段，添加后缀
pd.merge(pd_left, pd_right, on=[], how="left", suffixes=["_left", "_right"])

# left_index, right_index, 将索引作为连接的键，类似于 left_on, right_on, 这四个参数可以混用
pd.merge(pd_left, pd_right, left_on="key1", right_index=True)

# how 参数的默认值为 inner，即内连接，其 merge 后的字段为两个 dataframe 的交集，left, right, outer 的字段为两个 dataframe 字段的并集

# 多个 pandas 横向纵向连接
pd.concat([pd1, pd2, pd3], axis=1, keys=["one", "two", "three"], ignore_index=True， names=["upper", "lower"])
axis： 1 为横向连接，0 为纵向连接，默认纵向连接
keys： 连接后，新加的二层索引
ignore_index：是否不加入 index
names: 给多层索引从上到下起名称
pd.concat({"level1": pd1, "level2": pd2}) # 加入第二层索引的另一种方式
```

## groupby 详解

groupby 分两个步骤

1. 分组
2. 计算

```python
################################### step1: 分组 #####################################
* groupby 通过 某几列 进行分组
pg_data = pandas_data.groupby(["status", "reason"], as_index=False) # 返回一个 DataFrameGroupBy 对象, 如果 as_index 为 False，则不会将 staus 和 reason 变成 index
groupby 不会删除数据，只是对数据按照 N = |status| * |reason| 分成 N 组。分组后的数据条数不会变化。
demo:
pd_times_statistics = pandas_data_deployed[["deploy_plat", "module", "deploy_times"]].groupby(["deploy_plat", "module"]).count() # 生成一个 frame
# 解析 pd_times_statistics 获取 key:deploy_plat + module, value: times 的字典
module2times_dict = {','.join(index): row["deploy_times"] for index, row in pd_times_statistics.iterrows()}

# 通过 字典 进行分组
mapping = {"图搜": "大搜", "分级": "大搜", "人脸识别": "AI"}
pd_data = pd_data.group(mapping).count()
pd_data = pd_data.group(mapping, axis=1).count()

# 通过多级索引的索引级别进行分组 level
import pandas as pd
import numpy as np
columns = pd.MultiIndex.from_arrays([["US", "US", "US", "JP", "JP"], [1,2,3,4,5]], names=["country", "number"])
pd_data = pd.DataFrame(np.random.randn(4, 5), columns=columns)
print(pd_data)
pd_data = pd_data.groupby(level="country", axis=1).sum()
print(pd_data)
'''
country        US                            JP          
number          1         2         3         4         5
0        0.014945  0.498798  0.939967  1.053238  2.689140
1       -0.092643  0.671471  0.255130 -0.035580 -1.422467
2       -1.594973  0.753659 -0.983928  0.341066  0.999692
3       -0.590248 -0.339360 -0.706315  0.277258 -1.921277

country        JP        US
0        3.742378  1.453709
1       -1.458048  0.833959
2        1.340759 -1.825242
3       -1.644020 -1.635923
'''

################################### step2: 计算 #####################################

# groupby 后的方法
count()
sum()
mean()
medain()
std() # 标准差
var() # 方差
min() 
max()
first(), last()
quantile(num) # 获取分位数 0 <= num <= 1

# groupby 自定义计算方法
def peak_2_peak(series):
    return series.max() - series.min()
grouped.agg(peak_2_peak)

# groupby 后进行多函数计算
grouped.agg(["mean", "count", "std"])
# groupby 后对不同的列进行不同的计算方法
grouped.agg({"age": "mean", "sex": ["sum", "count"]})

# groupby 遍历
for module, idc_group in dfp_pandas_data_called.groupby(["module"]): # module 是单个值或元组，idc_group 是 pandas dataframe 格式
    idcs = list(set(idc_group["idc"].tolist()))
    dfp_module2idcs_dict[module] = idcs 
group 后的group 其实是一个 pandas dataframe 对象，其中存放了除 module属性 外的所有属于 module 组的属性，如果只选取一部分属性，可以直接 
idc_group[["A", "B"]]  # 这是 pandas 的一个语法糖

# 注意
groupby 后，groupby 的对象是唯一的，可以当 key 使用

# Demo
import pandas as pd
data1 = {
        'A': ['a1', 'a1', 'a2', 'a2', 'a3'],
        'B': ['b1', 'b1', 'b2', 'b2', 'b3'],
        'C': [5, 6, 8, 12, 1]
        }
pd_frame = pd.DataFrame(data1)
pd_statistics = pd_frame.groupby(['A','B']).count() # 注意结果是一个 DataFrame，有两个 index：A 和 B。C 变成了 count 字段。
结果：
      C
 A B    
a1 b1 2
a2 b2 2
a3 b3 1
上述结果得到的是一个 DataFrame，但是其得到的是一个有两个 index 的dataframe，实际上，按照那几个参数进行了groupby，那么index就有几个，如果想要将 index 转换成列信息，那么可以用：
pd_statistics.reset_index() # 将 两级 index 转成 列数据
那么结果就变成了：
     A B C
 0 a1 b1 2
 1 a2 b2 2
 2 a3 b3 1
 其中，index 变成了 数字
```

## pandas IO

### pandas 读写 MySQL

**官方文档**

http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.to_sql.html?highlight=to_sql#pandas.DataFrame.to_sql

**环境依赖**

```shell
pip install sqlalchemy
pip install pymysql
```

**写数据库Demo**

```python
# 写入 MySQL
from sqlalchemy import create_engine
# test 是 dbname ，localhost 指的是 IP
engine = create_engine('mysql+pymysql://user1:123456@localhost:3306/test')
# index 参数用于判断是否将 index 写入数据库
pd_conf.to_sql(table_name, con=engine, if_exists="append", index=False)
```

**注意**

1. pandas 写入数据库时，如果数据表不存在，则会建立数据库，但是不会指定数据表的主键

**读数据库Demo**

http://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_sql.html#pandas.read_sql

http://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_sql_table.html?highlight=read_sql#pandas.read_sql_table

http://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_sql_query.html?highlight=read_sql#pandas.read_sql_query

read_sql 是 对 read_sql_table 和 read_sql_query 的封装。

### pandas 读写 excel

对于非文本的文件的读取，excel 中存储的是什么格式，pandas 就读取的什么格式，如果一串数字以字符串的形式存储，其读到pandas中就是一个字符串，如果一列单元格存储的是时间，那么 pandas 读取后就是 datetime。

```python
from openpyxl import load_workbook
def init_excel(self):
    """创建一个空的 Excel 文件"""
    pd_empty = pd.DataFrame()
    try:
        pd_empty.to_excel(self.excel_path)
    except Exception as e:
        logging.error("init excel failed, because {e}".format(e=e))
    logging.info("init excel success")

def to_excel(self, pd_data, sheet_name):
    """将 pandas 写入 Excel 的指定的 sheet 中"""
    excel_writer = pd.ExcelWriter(self.excel_path, engine='openpyxl')
    # 写入 Excel
    try:
        book = load_workbook(excel_writer.path)
        excel_writer.book = book
        pd_data.to_excel(excel_writer=excel_writer, sheet_name=sheet_name, index=False)
        excel_writer.close()
    except Exception as e:
        logging.error("pandas into excel failed, because {e}".format(e=e))
    logging.info("pandas into excel success")
    
# 读取 excel
pd_demo = pd.read_excel(path)
```

### pandas 读写 csv 文件

pandas 读取文本文件时，对于所有的数字内容，读取后都会转成数字，不管其读取之前是否为字符串

```python
# 读取 csv 文件
pd.read_csv(path, header=None, index_col=["col1", "col2"]) # 不读取列名，并选择两列作为索引
pd.read_csv(path, error_bad_lines=False) # 跳过错误行
# 注意 如果文件中有数字类型的数据，那么统一转成 long 类型，即使存储前是 str 类型，那么读取出来也是 数字类型

# to_csv()
# 将 DataFrame 表存储成 csv 格式
deploy_cfg.to_csv("file.csv", encoding = 'utf_8_sig') # 注意文件名不要写中文
pd_data.to_csv("test.csv", mode="a", header="False") # 增量模式，不加 header
```

## pandas 时间序列

### 时间戳作为 index

**TimeSeries初始化**

```python
import pandas as pd
import numpy as np
from datetime import datetime
# TimeSeries 初始化，传入的 index 必须是 datetime 类型的 list
index = [datetime(2019, 1, 1), datetime(2019, 2, 2), datetime(2019, 3, 3), datetime(2021, 1, 3)] # DatetimeIndex 类型
pd_time = pd.Series(range(len(index)), index=index)
pd_time.index
```

```
DatetimeIndex(['2019-01-01', '2019-02-02', '2019-03-03', '2021-01-03'], dtype='datetime64[ns]', freq=None)
```

**TimeSeries切片、选取、索引**

```python
# 模糊选取
pd_time["2019"]
```

```
2019-01-01    0
2019-02-02    1
2019-03-03    2
dtype: int64
```

```python
# 精确获取某个 index 对应的值
pd_time[datetime(2019,1,1)]
```

```
0
```

```python
# 按照给定时间范围切片
pd_time["2019-01-01": "2019-03-01"] 
```

```
2019-01-01    0
2019-02-02    1
dtype: int64
```



**生成指定长度的 DatetimeIndex: date_range**

```python
pd.date_range("2019-01", "2020-01") # 默认的时间间隔是 天，注意：date_range 生成的是时间戳，而不是时间段
```

```
DatetimeIndex(['2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04',
               '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08',
               '2019-01-09', '2019-01-10',
               ...
               '2019-12-23', '2019-12-24', '2019-12-25', '2019-12-26',
               '2019-12-27', '2019-12-28', '2019-12-29', '2019-12-30',
               '2019-12-31', '2020-01-01'],
              dtype='datetime64[ns]', length=366, freq='D')
```

```python
# 生成由每月最后一个工作日组成的日期索引
pd.date_range(start="2019-01", end="2019-12", freq="BM")
```

```
DatetimeIndex(['2019-01-31', '2019-02-28', '2019-03-29', '2019-04-30',
               '2019-05-31', '2019-06-28', '2019-07-31', '2019-08-30',
               '2019-09-30', '2019-10-31', '2019-11-29'],
              dtype='datetime64[ns]', freq='BM')
```

```python
# 由开始时间和持续时间生成的 index
pd.date_range(start="2019-01", periods=10) # period 指定了按照默认的 freq天级生成 10 组数据
```

```
DatetimeIndex(['2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04',
               '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08',
               '2019-01-09', '2019-01-10'],
              dtype='datetime64[ns]', freq='D')
```

```python
# 频率和日期偏移量
# 按照 6hmin 的间隔生成 10 组时间戳, 注意： freq 可以写成任意时间间隔，P314  
pd.date_range(start="2019-01", periods=10, freq="6h20min") 
```

```
DatetimeIndex(['2019-01-01 00:00:00', '2019-01-01 06:20:00',
               '2019-01-01 12:40:00', '2019-01-01 19:00:00',
               '2019-01-02 01:20:00', '2019-01-02 07:40:00',
               '2019-01-02 14:00:00', '2019-01-02 20:20:00',
               '2019-01-03 02:40:00', '2019-01-03 09:00:00'],
              dtype='datetime64[ns]', freq='380T')
```

### 时间段作为 index

**period_range**

```python
# PeriodIndex 类型
index_period = pd.period_range("2019-01-01", "2019-01-12", freq="D")
pd.period_range("2019-01-01", "2019-01-12", freq="D")
```

```
PeriodIndex(['2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04',
             '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08',
             '2019-01-09', '2019-01-10', '2019-01-11', '2019-01-12'],
            dtype='period[D]', freq='D')
```

```python
# index 为 period 的 timeseries 的构造
pd_period = pd.Series(range(len(index_period)), index=index_period)
pd.Series(range(len(index_period)), index=index_period)
```

```
2019-01-01     0
2019-01-02     1
2019-01-03     2
2019-01-04     3
2019-01-05     4
2019-01-06     5
2019-01-07     6
2019-01-08     7
2019-01-09     8
2019-01-10     9
2019-01-11    10
2019-01-12    11
Freq: D, dtype: int64
```

```python
# 一时间段内的任意时间都可以作为 时间戳，化为 index
pd_period["2019-01-01 19:23:00"] = 100
pd_period
```

```
2019-01-01    100
2019-01-02      1
2019-01-03      2
2019-01-04      3
2019-01-05      4
2019-01-06      5
2019-01-07      6
2019-01-08      7
2019-01-09      8
2019-01-10      9
2019-01-11     10
2019-01-12     11
Freq: D, dtype: int64
```

### 重采样 resample

**时间戳重采样**

```python
pd_time.resample("Y").sum()
```

```
2019-12-31    3
2020-12-31    3
Freq: A-DEC, dtype: int64
```

```python
# 时间戳重采样
index_timestamp = pd.date_range("2019-01-01", periods=12, freq="T")
pd_time = pd.Series(range(len(index_timestamp)), index=index_timestamp) # 时间戳最细粒度的数据
pd_time.resample("5min").sum().index
```

```
DatetimeIndex(['2019-01-01 00:00:00', '2019-01-01 00:05:00',
               '2019-01-01 00:10:00'],
              dtype='datetime64[ns]', freq='5T')
```

```python
# 通过 groupby 和 lambda 函数进行重采样
index_range = pd.date_range("2019-01-01", periods=100, freq="D") 
pd_time = pd.Series(range(len(index_range)), index=index_range)
pd_time.groupby(lambda x: x.month).sum()
```

```
1     465
2    1246
3    2294
4     945
dtype: int64
```

**时间段重采样**

```python
pd_frame = pd.DataFrame(np.random.randn(12, 4),
                        index=pd.period_range("2010-01", "2011-12", freq="2M"), 
                        columns=["Colorado", "Texas", "New York", "Ohio"])
pd_frame.resample("D").mean().index # 升采样
```

```
PeriodIndex(['2010-01-01', '2010-01-02', '2010-01-03', '2010-01-04',
             '2010-01-05', '2010-01-06', '2010-01-07', '2010-01-08',
             '2010-01-09', '2010-01-10',
             ...
             '2011-12-22', '2011-12-23', '2011-12-24', '2011-12-25',
             '2011-12-26', '2011-12-27', '2011-12-28', '2011-12-29',
             '2011-12-30', '2011-12-31'],
            dtype='period[D]', length=730, freq='D')
```

**重采样参数**

```python
A year
M month
W week
D day
H hour
T minute
S second

Demo:
resample_time = "5min" # 5 分钟采样一次
resample_time = "1H" # 1 hour 采样一次
resample_time = "1D" # 1 天采样一次
pd_result = pd_result.resample(resample_time, how="sum")
```

## Pandas Error

### Only integers accepted as n values

```Python
pd_data.sample(n) # n 一定要是非负整数，否则会报该错误
```

