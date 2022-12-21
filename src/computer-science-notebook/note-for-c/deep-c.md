# C 语言深度剖析

* [【C语言】深入剖析班（国嵌主讲）（直戳C语言的本质）](https://www.bilibili.com/video/BV1o741177Gv)
  * 书籍：C 语言深度剖析 链接：https://pan.baidu.com/s/1Ri87HP0PtudmgNWgdJwVZQ 提取码：xan1 

C 语言是一门静态的弱类型语言。

作者：陈正冲 毕业于长春光学精密机械学院（长春理工大学）数学系  

## 数据类型的本质

C 语言中的数据类型可以理解为**固定内存大小的别名**，是**创建变量的模子**。

C 语言是一种**弱类型语言**，其**一块内存可以叫做不同的类型**。**汇编时代**，程序员都是直接从内存中申请 1 个字节，两个字节，4 个字节的空间，后来为了方便使用，所以对固定大小的内存空间进行命名。

内存空间按照大小可以命名为：

| 字节数 | 命名  |
| ------ | ----- |
| 1      | char  |
| 2      | short |
| 4      | int   |

```c
int i; // 告诉编译器，申请一个 4 个字节大小的空间，将其叫做 i

sizeof(short); // 查找一下 short 是什么的别名，原来是两个字节的别名
```

```c
#include<stdio.h>

/*
1. typedef 顾名思义，类型定义，给数据类型起别名；
2. typedef 是一条语句，需要加 ;
3. typedef 自定义的类型，要全部大写；
4. 结构体就是一个类型，用 typedef 对结构体进行重命名
*/
typedef int INT32; 
typedef unsigned char BYTE; 
typedef struct _demo { // 8 个字节
	short s;
	BYTE b1;
	BYTE b2;
	INT32 i;
} DEMO;

int main() {
	// 创建变量后，并不一定要初始化
	INT32 i32;
	BYTE byte;
	DEMO d;

	printf("%d, %d \n", sizeof(INT32), sizeof(i32));
	printf("%d, %d \n", sizeof(BYTE), sizeof(byte));
	printf("%d, %d \n", sizeof(DEMO), sizeof(d));
	/*
	4, 4
	1, 1
	8, 8 
	从此处可以看出，结构体 struct 本身并不占用多余的空间，结构体只是多种数据类型组合而成的新的数据结构
	*/

	return 0;
}

```

## 变量名的本质

变量是一段实际连续存储空间的别名；程序中通过变量来申请并命名存储空间；通过变量的名字可以使用存储空间。

指针，指针也是变量。

## 变量的属性 / 属性关键字

**变量可以拥有自己的属性**：auto, register, static。在定义变量的时候，可以加上属性关键字，属性关键字表明了变量的特殊意义。

| 属性     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| auto     | 1. C 语言中**局部变量**的默认属性                            |
|          | 2. 指明在程序的**栈**上分配空间（也就是说，局部变量都是在栈上分配的空间） |
| static   | 1. static 修饰的**局部变量**存储在**程序静态区**             |
|          | 2.1. static 修饰的**全局变量**，其作用域只限于该文件（**声明作用域**） |
|          | 2.2. static 修饰的**函数**，其作用域只限于该文件             |
| register | 1. 声明变量存储在**寄存器**中（访问速度比内存更快）          |
|          | 1.1 register 修饰的变量，必须是 CPU 可以接受的类型，其长度应该 <= 整型 |
|          | 1.2 register 修饰的变量，不能对其用取址运算符 `&`，因为**取址运算符是用来去内存寻址的**，而 register 不是内存 |
|          | 1.3 register 只是**请求**将变量放在寄存器中，实际上**可能申请不到** |
|          | 2. 寄存器变量用在**讲究性能的实时系统**中                    |
