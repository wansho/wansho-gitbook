# Java

[TOC]

毕向东 Java 学习笔记

## 基础

* Java 先编译，再解释执行：
  1. `javac foo.java` 编译 Java 源文件生成字节码文件：`foo.class`
  2. `java foo.class` 用虚拟机解释执行字节码文件

### 命名规范

* 类名：`HelloJava`
* 类的成员变量、局部变量、成员方法：`firstDay`，`getName()`
* 常量：`MAX_VALUE`

### for 循环

**增强 for 循环**

```java
for( String name : names ) {
	System.out.print( name );
	System.out.print(",");
}
```

**for 的 while 实现**

```java
for(;;){
    
}
```

### 位运算

**>> 和 >>>**

`>>` ，正数高位补零，负数高位补一。`>>>` 正负数都强制高位补 0

### 基本数据类型

```
java.lang.Number
	Integer
	Short
	Long
	Float
	Double
	Byte
	BigInteger
	BigDecimal
	
```



## 数组

数组是**相同类型**数据的集合。

### 数组的初始化

```java
double[] myList;  // 定义一个数组的引用
```

```java
int[] integers = new int[10]; // 在堆内存中 new 一个数组，堆内存中创建的对象都有默认值
for(int integer : integers){ // 增强 for 循环
    System.out.println(integer);
}

dataType[] arrayRefVar = {value0, value1, ..., valuek};
String[] strings = new String[]{"a", "b", "c", "d", "d1", "a1"};
```

```java
// new 二维数组
int[][] arr = new int[3][2];
System.out.println(arr.length);
System.out.println(arr[1].length);
int[][] arr = new int[3][];

```

匿名数组：

```java
public class Test { 
    public static void printArray(int []arr){
        for (int i : arr) {
            System.out.print(i);
        }
    }
    public static void main(String[] args) {
        //Many code
        printArray(new int[]{1,2,3,4,5,6});
        //Many code
    }
}
```



### 常见方法

```java
System.arrayCopy(源数组，从哪开始，目标数组，从哪开始贴，粘几个);
Arrays.sort(被排序的数组);
Arrays.binarySearch(哪个数组，数组中的什么元素);
Arrays.fill(a， 2， 4, 100); //将数组a中2到4的索引的元素替换为100
```



### 内存分配

**栈内存**

存储的都是局部变量， 而且变量所属的作用域一旦结束，该变量就自动释放。  

**堆内存**

存储是数组和对象(其实数组就是对象) 凡是new建立在堆中。

特点：

1. 每一个实体都有首地址值
2. 堆内存中的每一个变量都有默认初始化值，根据类型的不同而不同。整数是0，小数0.0或者0.0f，boolean false char '\u0000'
3. 垃圾回收机制

堆内存的默认初始化值：

| 类型   | 默认初始化值 |
| ------ | ------------ |
| int    | 0            |
| float  | 0.0          |
| String | null         |



## 函数

### 构造函数

**特点**

* 函数名与类名相同

* 不用定义返回值类型

* 不可以 return

**作用**

* 给对象初始化

**注意**

* 构造函数是可以重载的，也就是可以有多种对象初始化方式

* 构造函数如果前面加了 void 就变成了一般函数。  

* 默认的构造函数，类可以没有构造函数

  当一个类中没有定义构造函数时，系统会默认给该类加入一个空参数的构造函数，例如 `Person(){}` 当自定义构造函数后，默认的构造函数就没了

  但是当一个类加入了有参的构造函数时，我们就需要手动加上无参的构造函数，否则会在初始化对象的时候，会因为找不到无参构造器报错

* 什么时候需要构造函数？

  分析事物时，该事物一开始就具备某些某些属性或行为，那么将这些 内容定义在构造函数中
  
* 可以通过私有化构造函数，进而禁止类进行初始化

### main 函数

```java
public static void main(String[] args){
    
}
```

* public 权限必须是最大的
* static 该函数并没有涉及到成员方法
* void 主函数没有具体的返回值
* main 不是关键字，是 JVM 识别的固定的名字
* String[] args 参数列表，是一个数组类型的参数，元素都是字符串

### 构造代码块

**作用**

* 定义所有对象的共性，给对象进行初始化，对象一建立就运行，而且先于构造函数执行
* 每 new 一个对象，构造代码块就运行一次

**构造代码块和构造函数的区别**

构造代码块是给所有对象进行统一初始化，而构造函数是给对应的对象初始化（对象也许有重载）

```java
// 构造代码块是定义每一个对象的共性
{
    System.out.println("person code run");
}
```

### 静态代码块

随着类的加载而执行。而且只执行一次。

作用：用于给类进行初始化。  

```java
static
{
    System.out.println("static code");
}
```



### void

如果函数没有具体返回值，那么返回值类型可以用 `void` 来表示，函数中 `return` 可以不写，也可以写成 `return;`

### 重载

**重载与返回值类型无关**，只看参数类型是否不一样，参数类型不一样并且函数名一样则重载。

java是严谨性语言，如果函数出现的调用的不确定性，会编译失败。

<img align='left' src="assets/clip_image001.png" alt="重载" style="zoom:90%;" />



## 类

### 定义

成员变量

* 成员变量随着对象的创建而存在，随着对象的消失而消失 
* 成员变量存在于堆内存的对象中，成员变量都有默认初始化值  

### 匿名对象

```java
new Car(); // 匿名对象。其实就是定义对象的简写格式。
Car c = new Car();
c.run();
new Car().run();

// 1，当对象对方法仅进行一次调用的时候，就可以简化成匿名对象。
new Car().num = 5;
new Car().color = "green";
new Car().run();33

// 2，匿名对象可以作为实际参数进行传递。
Car c1 = new Car();
show(c1); // 等价于：
show(new Car());
```

### private

私有的内容只在本类中有效，不在子类中生效。

Java 中的 `this` 对应 Python 中的 `self` 关键字。

### static

**static 的特点**

1. static 是一个修饰符，用于修饰成员，可以修饰变量，也可以修饰方法
2. **static 修饰的成员被所有的对象所共享**
3. static 优先于对象存在，因为static的成员随着类的加载就已经存在了
4. static 修饰的成员多了一种调用方式，就可以直接被类名所调用 【类名.静态成员】
5. static 修饰的数据是共享数据，对象中的存储的是特有数据

**静态成员变量的特点**

1. 静态变量随着类的加载而存在，随着类的消失而消失
2. 静态成员（函数和变量）既可以被对象调用（这种方式在 Java 高版本中不提倡），还可以被类名调用
3. 静态变量称为**类变量**  
4. 静态变量数据存储在方法区(共享数据区)的静态区，所以也叫对象的共享数据
5. 静态变量如果设置了 private，则通过类名的方式不能调用

**静态使用的注意事项**

1. 静态方法只能访问静态成员。 (**非静态既可以访问静态，又可以访问非静态**)  
2. 静态方法中不可以使用this或者super关键字  
3. 主函数是静态的  

**static 使用场景**

1. 静态变量

   当分析对象中所具备的成员变量的值都是相同的，这时这个成员就可以被静态修饰。

   只要数据在对象中都是不同的，就是对象的特有数据，必须存储在对象中，是非静态的。如果是相同的数据，对象不需要做修改，只需要使用即可，不需要存储在对象中，定义成静态的。 

2. 静态方法

   函数是否用静态修饰，就参考一点，就是该函数功能是否有访问到对象中的特有数据。
   简单点说，从源代码看，该功能是否需要访问非静态的成员变量，如果需要，该功能就是非静态的。如果不需要，就可以将该功能定义成静态的。当然，也可以定义成非静态，
   但是非静态需要被对象调用，而仅创建对象调用非静态的。没有访问特有数据的方法，该对象的创建是没有意义。  

### this

* 当成员变量和局部变量重名，可以用关键字this来区分
* this也可以用于在构造函数中调用其他构造函数
  注意：只能定义在构造函数的第一行。因为初始化动作要先执行

### 继承

**super 和 this**

当本类的成员和局部变量同名用this区分。当子父类中的成员变量同名用super区分父类。
this和super的用法很相似。this:代表一个本类对象的引用。super：代表一个父类空间。  

```java
// Demo
class Zi extends Fu{
    Zi(){
        super(); // Zi 的构造函数，一定会先执行 Fu 的构造函数
    }
}
```

**构造函数**

子类的实例化过程：子类中所有的构造函数默认都会访问父类中的空参数的构造函数。

* super() 显式调用

  如果父类中没有定义空参数构造函数，那么子类的构造函数必须用 super() 显式调用。明确要调用父类中哪个构造函数。

* super() 隐式调用

  如果父类定义了空参数构造函数，那么子类的构造函数不用显式 super()

其实不管怎么样，子类都会访问父类的构造函数，所以代码里最好还是显式的把 `super()` 写出来比较好。

supre语句必须要定义在子类构造函数的第一行。因为父类的初始化动作要先完成。

通过super初始化父类内容时，子类的成员变量并未显示初始化。等super()父类初始化完毕后，才进行子类的成员变量显示初始化。

**函数重写(覆盖)**

我个人倾向于叫重写。

当子父类中出现成员函数一模一样的情况，会运行子类的函数。
这种现象，称为重写操作。这时函数在子父类中的特性。
函数两个特性

1. 重载。同一个类中。 overload
2. 覆盖。子类中。覆盖也称为重写，覆写。 override

重写注意事项：

1. 子类方法覆盖父类方法时，子类权限必须要大于等于父类的权限
2. 静态只能覆盖静态，或被静态覆盖

重写的使用场景：

1. 当对一个类进行子类的扩展时，子类需要保留父类的功能声明，但是要定义子类中该功能的特有内容时，就使用覆盖操作完成.  

**单例设计模式**

```java
/*
设计模式：对问题行之有效的解决方式。其实它是一种思想。
1,单例设计模式。
解决的问题：就是可以保证一个类在内存中的对象唯一性。
必须对于多个程序使用同一个配置信息对象时，就需要保证该对象的唯一性。
如何保证对象唯一性呢？
1，不允许其他程序用new创建该类对象。
2，在该类创建一个本类实例。
3，对外提供一个方法让其他程序可以获取该对象。
步骤：
1，私有化该类构造函数。
2，通过new在本类中创建一个本类对象。
3，定义一个公有的方法，将创建的对象返回。
*/

//饿汉式
class Single //类一加载，对象就已经存在了。
{
    private static Single s = new Single();
    private Single(){}
    public static Single getInstance(){
    	return s;
    }
}

//懒汉式
class Single2 //类加载进来，没有对象，只有调用了getInstance方法时，才会创建对象。
//延迟加载形式。
{
    private static Single2 s = null;
    private Single2(){}
    public static Single2 getInstance(){
        if(s==null)
        	s = new Single2();
        return s;
    }
}

class SingleDemo{
    public static void main(String[] args){
        Single s1 = Single.getInstance();
        Single s2 = Single.getInstance();
        System.out.println(s1==s2);
    }
}
```

### 抽象类

**概述**

1. 方法只有声明没有实现时，该方法就是抽象方法，需要被abstract修饰
2. 抽象方法必须定义在抽象类中。该类必须也被abstract修饰
3. 抽象类不可以被实例化。为什么？因为调用抽象方法没意义。抽象类必须有其子类覆盖了所有的抽象方法后，该子类才可以实例化。
   否则，这个子类还是抽象类
4. 抽象类一定是一个父类，其生来就是要被继承的

注意，抽象类可以有构造函数，用于给子类进行初始化。抽象类也可以不定义抽象方法。

```java
abstract class Demo{
	Demo(){   
    }
    abstract public abstractFunc(); // 写一个接口协议，要求子类去实现
}
```

**abstract 关键字**

抽象关键字不可以和 private，static，final 同时存在：

1. private：抽象是定义了一个协议，要求子类去实现的，private 私有后，子类就访问不到了
2. static：抽象方法必须子类实现后才能访问，而 static 修饰后，可以直接通过类名进行访问，冲突了
3. final：final 定义的属性和方法，就不能修改了，而抽象关键字定义的函数是要被子类继承修改的

**抽象类和一般类的异同点**

1. 相同点

   抽象类和一般类都是用来描述事物的，都在内部定了成员  

2. 不同点

   1. 一般类有足够的信息描述事物，抽象类描述事物的信息有可能不足  
   2. 一般类中不能定义抽象方法，只能定非抽象方法，抽象类中可定义抽象方法，同时也可以定义非抽象方法
   3. 一般类可以被实例化，抽象类不可以被实例化

### 一个对象的实例化过程

一个对象的实例化过程 `Person p = new Person();`

1. JVM会读取指定的路径下的Person.class文件，并加载进内存，并会先加载Person的父类(如果有直接的父类的情况下)
2. 在堆内存中的开辟空间，分配地址。并在对象空间中，对对象中的属性进行默认初始化
3. 调用对应的构造函数进行初始化
4. 在构造函数中，第一行会先到调用父类中构造函数进行初始化
5. 父类初始化完毕后，在对子类的属性进行显示初始化
6. 在进行子类构造函数的特定初始化
7. 初始化完毕后，将地址值赋值给引用变量

### final

final 关键字的特点：

final关键字：

1. final是一个修饰符，可以修饰**类，方法，变量**。
2. final修饰的类不可以被继承。
3. final修饰的方法不可以被覆盖。
4. final修饰的变量是一个常量，只能赋值一次。

为什么要用final修饰变量?

其实在程序如果一个数据是固定的，那么直接使用这个数据就可以了，但是这样阅读性差，所以它该数据起个名称。
而且这个变量名称的值不能变化，所以加上final固定。
写法规范：常量所有字母都大写，多个单词，中间用_连接。  

```java
public static final double MY_PI = 3.14;
```

### 接口

接口有点类似鸭子🦆类型。

当一个抽象类中的方法都是抽象的时候，这时可以将该抽象类用另一种形式定义和表示，就是接口 interface。

接口中的成员都是公共的权限。

```java
interface Demo{
    public static final int NUM = 4;
    public abstract void show1();
    public abstract void show2();
}
```

只能由实现了接口的子类并覆盖了接口中所有的抽象方法后，该子类才可以实例化。否则，这个子类就是一个抽象类。  

**多实现**

在java中不直接支持多继承，因为会出现调用的不确定性。所以java将多继承机制进行改良，在java中变成了多实现。一个类可以实现多个接口。  

```java
// 多继承
interface A{
	public void show(); // abstract 可以省略不写
}

interface Z{
	public int add(int a,int b);
}

class Test implements A,Z{
	public int add(int a,int b){
		return a+b+3;
	}
    public void show(){}
}
```

**接口的多继承**

```java
interface CC{
	void show();
}

interface MM{
	void method();
}

interface QQ extends CC, MM //接口与接口之间是继承关系，而且接口可以多继承。
{
	void function();
}

class WW implements QQ{
    //覆盖3个方法。
    public void show(){}
    public void method(){}
    public void function(){}
}
```

**接口和抽象类比较**

1. 相同点

   都是不断向上抽取而来的。  

2. 不同点

   1. 抽象类需要被继承，而且只能单继承。
      接口需要被实现，而且可以多实现。
   2. 抽象类中可以定义抽象方法和非抽象方法，子类继承后，可以直接使用非抽象方法。
      接口中只能定义抽象方法，必须由子类去实现。
   3. 抽象类的继承，是 is a 关系，在定义该体系的基本共性内容。
      接口的实现是 like a 关系，在定义体系额外功能。  

### 多态

**什么是多态**

一个对象有多种特征。一个对象，走起路来像鸭子，叫声也像鸭子，那么这个对象就具有鸭子的特征；同时这个对象还是胎生的，那么其就有哺乳动物的特征。一个对象，多种状态。

多态的一个实际案例：

```
现实中，关于多态的例子不胜枚举。比方说按下 F1 键这个动作，如果当前在 Flash 界面下弹出的就是 AS 3 的帮助文档；如果当前在 Word 下弹出的就是 Word 帮助；在 Windows 下弹出的就是 Windows 帮助和支持。同一个事件发生在不同的对象上会产生不同的结果。
```



```java
class 动物
{}
class 猫 extends 动物
{}
class 狗 extends 动物
{}
猫 x = new 猫();
动物 x = new 猫(); //一个对象，多种形态。
```

猫这类事物即具备者猫的形态，又具备着动物的形态。这就是对象的多态性。
简单说：就是一个对象对应着不同类型。(因为实现了不同的接口)

多态在代码中的体现：父类或者接口的引用指向其子类的对象

多态的好处：提高了代码的扩展性，前期定义的代码可以使用后期的内容

多态的弊端：前期定义的内容不能使用(调用)后期子类的特有内容

多态的前提：1. 必须有关系，继承，实现。2. 要有覆盖。  

```java
abstract class Animal{
	abstract void eat();
}

class Dog extends Animal{
	void eat(){
    System.out.println("啃骨头");
    }
    void lookHome(){
        System.out.println("看家");
    }
}

class Cat extends Animal{
    void eat(){
    	System.out.println("吃鱼");
    }
    void catchMouse(){
    	System.out.println("抓老鼠");
    }
}

class Pig extends Animal{
    void eat(){
    	System.out.println("饲料");
    }
    void gongDi(){
    	System.out.println("拱地");
    }
}

class DuoTaiDemo{
    
    public static void main(String[] args){
        // Cat c = new Cat();
        // c.eat();
        // c.catchMouse();
        Animal a = new Cat(); //自动类型提升，猫对象提升了动物类型。但是特有功能无法s访问。
        //作用就是限制对特有功能的访问。
        //专业讲：向上转型。将子类型隐藏。就不用使用子类的特有方法。
        // a.eat();
        //如果还想用具体动物猫的特有功能。
        //你可以将该对象进行向下转型。
        // Cat c = (Cat)a;//向下转型的目的是为了使用子类中的特有方法。
        // c.eat();
        // c.catchMouse();
        // 注意：对于转型，自始自终都是子类对象在做着类型的变化。
        // Animal a1 = new Dog();
        // Cat c1 = (Cat)a1;//ClassCastException
        /*
        Cat c = new Cat();
        // Dog d = new Dog();
        // c.eat();
        method(c);
        // method(d);
        // method(new Pig());
        */
        method(new Dog());
    }
    public static void method(Animal a){ //Animal a = new Dog();
   		a.eat();
        if(a instanceof Cat){ //instanceof：用于判断对象的具体类型。只能用于引用数据类型判断
        	//通常在向下转型前用于健壮性的判断。
            Cat c = (Cat)a;
            c.catchMouse();
        }else if(a instanceof Dog){
            Dog d = (Dog)a;
            d.lookHome();
        }else{ 
        }
	}
}
```

**多态时各组成的发化**

多态时，成员的特点：

1. 成员变量
   编译时：参考引用型变量所属的类中的是否有调用的成员变量，有，编译通过，没有，编译失败。
   运行时：参考引用型变量所属的类中的是否有调用的成员变量，并运行该所属类中的成员变量。
   简单说：编译和运行都参考等号的左边。哦了。
2. 成员函数(非静态)
   编译时：参考引用型变量所属的类中的是否有调用的函数。有，编译通过，没有，编译失败。
   运行时：参考的是对象所属的类中是否有调用的函数。
   简单说：编译看左边，运行看**右边**。（其他都是左边）
   因为成员函数存在覆盖特性。
3. 静态函数
   编译时：参考引用型变量所属的类中的是否有调用的静态方法。
   运行时：参考引用型变量所属的类中的是否有调用的静态方法。
   简单说，编译和运行都看左边。
   其实对于静态方法，是不需要对象的。直接用类名调用即可。  

```java
package com.wansho.hellojava;

class Fu {
    static int num = 3;
    void show(){
        System.out.println("fu show");
    }

    static void method(){
        System.out.println("fu static method");
    }
}

class Zi extends Fu {
    static int num = 4;
    void show()
    {
        System.out.println("zi show");
    }
    static void method()
    {
        System.out.println("zi static method");
    }
}

class DuoTaiDemo3 {
    public static void main(String[] args)
    {
        Fu.method(); // fu static method
        Zi.method(); // zi static method
        Fu f = new Zi();
        System.out.println(f.num); // 可以通过对象访问静态的成员变量 3
        f.method(); // 可以通过对象访问静态的成员变量  fu static method
        f.show(); // zi show
    }
}
```

### 内部类

内部类感觉有点类似于闭包。

**内部类访问特点**

1. 内部类可以直接访问外部类中的成员。
2. 外部类要访问内部类，必须建立内部类的对象。

**使用场景**

一般用于类的设计。
分析事物时，发现该事物描述中还有事物，而且这个事物还在访问被描述事物的内容。
这时就是还有的事物定义成内部类来描述。
内部类能直接访问外部类中成员， 是因为内部类持有了外部类的引用，即外部类名.this。
内部类也可以存放在局部位置上，但是内部类在局部位置上只能访问局部中被final修饰的局部变量。  

```java
class Outer{
    private static int num = 31;
    class Inner{// 内部类。
        void show(){
            System.out.println("show run..."+num);
        }
        /*static void function()//如果内部类中定义了静态成员，该内部类也必须是静态的。
        {
        System.out.println("function run ...."+num);
        }
        */
    }
    public void method(){
        Inner in = new Inner();
        in.show();
    }
}

class InnerClassDemo
{
    public static void main(String[] args)
    {
        // Outer out = new Outer();
        // out.method();
        
        // 直接访问外部类中的内部类中的成员。
        // Outer.Inner in = new Outer().new Inner();
        // in.show();
        
        //如果内部类是静态的。 相当于一个外部类
        // Outer.Inner in = new Outer.Inner();
        // in.show();
        
        //如果内部类是静态的，成员是静态的。
        // Outer.Inner.function();
    }
}
```

### 匿名内部类

匿名内部类， 首先是一个类中类，其次是内部类的简写格式。其实就是一个匿名子类对象。
必须有前提：内部类必须继承或者实现一个外部类或者接口。
格式： new 父类or接口(){子类内容}  

```java
abstract class Demo{
    abstract void show();
}

class Outer{
    int num = 4;
    /*
    class Inner extends Demo{
        void show(){
        	System.out.println("show ..."+num);
        }
    }
    */
    public void method(){
        //new Inner().show();
        new Demo(){//匿名内部类。
            void show(){
                System.out.println("show ........"+num);
            }
        }.show();
    }
}

class InnerClassDemo4{
    public static void main(String[] args){
        new Outer().method();
    }
}
```

**使用范例**

场景一：

当函数参数是接口类型时，而且接口中的方法不超过三个。可以用匿名内部类作为实际参数进行传递  

```java
interface Inter
{
    void show1();
    void show2();
}

class Outer
{
    /*
    class Inner implements Inter
    {
        public void show1()
        { }
        public void show2()
        { }
    }
    */
    public void method()
    {
        // Inner in = new Inner();
        // in.show1();
        // in.show2();
        Inter in = new Inter(){
            public void show1()
            { }
            public void show2()
            { }
        };
        in.show1();
        in.show2();
    }
}

class InnerClassDemo5
{
    class Inner
    { }
    public static void main(String[] args)
    {
        System.out.println("Hello World!");
        /*
        show(new Inter()
        {
        public void show1(){}
        public void show2(){}
        });
        */
        // new Inner();
    }
    public void method()
    {
        new Inner();
    }
    public static void show(Inter in)
    {
        in.show1();
        in.show2();
    }
}
```

范例二：

```java
class Outer
{
    void method()
    {
        Object obj = new Object()
        {
            public void show()
            {
                System.out.println("show run");
            }
        };
        obj.show();//因为匿名内部类这个子类对象被向上转型为了Object类型。
        //这样就不能在使用子类特有的方法了。
    }
}

class InnerClassDemo6
{
    public static void main(String[] args)
    {
        new Outer().method();
    }
}
```

## 异常

### 定义

异常：是在**运行时期**发生的不正常情况。

注意是在运行期间，程序在运行时总会发生大大小小的问题，但是我们不能因为一个小问题就停止程序的运行，所以要引入叫做异常的容错机制，对异常进行容错。

在 java 中**用类的形式对不正常情况进行了描述和封装对象**。描述不正常的情况的类，就称为异常类。  

**以前正常流程代码和问题处理代码相结合，现在将正常流程代码和问题处理代码分离。提高阅读性。其实异常就是java通过面向对象的思想将问题封装成了对象。用异常类对其进行描述。不同的问题用不同的类进行具体的描述。 比如角标越界、 空指针等等。**
问题很多，意味着描述的类也很多，将其共性进行向上抽取，形成了异常体系。 

**异常的共性：Throwable**

无论是 error，还是异常，问题，问题发生就应该可以抛出，让调用者知道并处理。
//该体系的特点就在于Throwable及其所有的子类都具有可抛性。
可抛性到底指的是什么呢？怎么体现可抛性呢？其实是通过两个关键字来体现的。throws throw , 凡是可以被这两个关键字所操作的类和对象都具备可抛性.  

异常子类的后缀名都是用其父类名作为后缀，阅读性很强。  

**异常分为两类**

* Error  

  一般不可处理的。

  是由jvm抛出的严重性的问题。这种问题发生一般不针对性处理。直接修改程序  

* Exception  

  可以处理的。

```java
class ExceptionDemo
{
    public static void main(String[] args)
    {
        int[] arr = new int[1024*1024*800];//java.lang.OutOfMemoryError: Java heap

    }
    /**
    正常的问题代码的处理
    */
    public static void sleep2(int time)
    {
        if(time<0)
        {
            // 处理办法。
            // 处理办法。
            // 处理办法。

        }
        if(time>100000)
        {
            // 处理办法。
            // 处理办法。
        }
        System.out.println("我睡。。。 "+time);
    }
    
    /*
    引入异常机制后
    */
    public static void sleep(int time) 
    {
        if(time<0)
        {
            // 抛出 new FuTime();//就代码着时间为负的情况，这个对象中会包含着问题的名称，信息，位置等信息。
        }
        if(time>100000)
        {
            // 抛出 new BigTime();
        }
        System.out.println("我睡。。。 "+time);
    }
}
/*
class FuTime
{ }
class BigTime
{ }
*/
```

### 自定义异常

**一个需求**

对于角标是整数不存在，可以用角标越界表示，对于负数为角标的情况，准备用负数角标异常来表示。
负数角标这种异常在java中并没有定义过。那就按照java异常的创建思想，面向对象，将负数角标进行自定义描述。并封装成对象。

如果让一个类称为异常类，必须要继承异常体系，因为只有称为异常体系的子类才有资格具备可抛性。  

**异常的分类**

1. 编译时被检测的异常
2. 编译时不被检测的异常（运行时异常，必须要让程序停下来，修改之）

**throws 和 throw**

1. throws 使用在函数上，throw 使用在函数内
2. throws 抛出的是异常类，可以抛出多个，用逗号隔开。throw 抛出的是异常对象

Demo：

```java
class FuShuIndexException extends Exception
{
    FuShuIndexException()
    {}
    FuShuIndexException(String msg)
    {
        super(msg);
    }
}

class Demo
{
    public int method(int[] arr,int index) throws NullPointerException, FuShuIndexException
    {
        if(arr==null)
            throw new NullPointerException("数组的引用不能为空！ ");
        if(index>=arr.length)
        {
            throw new ArrayIndexOutOfBoundsException("数组的角标越界啦，哥们，你是不是疯了？： "+index);
        }
        if(index<0)
        {
            throw new FuShuIndexException("角标变成负数啦！！ ");
        }
        return arr[index];
    }
}

class ExceptionDemo3
{
    public static void main(String[] args) //throws FuShuIndexException
    {
        int[] arr = new int[3];
        Demo d = new Demo();
        int num = d.method(null,-30);
        System.out.println("num="+num);
        System.out.println("over");
    }
}
```

### 异常的捕捉

Demo：

```java
try
{
    //需要被检测异常的代码。
}
catch(异常类 变量)// 该变量用于接收发生的异常对象
{
    //处理异常的代码。
}
finally
{
    //一定会被执行的代码。
}
```

**异常处理的原则**

异常处理的原则：

1. 函数内容如果抛出需要检测的异常，那么函数上必须要声明。否则必须在函数内用trycatch捕捉，否则编译失败。
2. 如果调用到了声明异常的函数，要么try catch 要么 throws，否则编译失败。
3. 什么时候catch，什么时候throws 呢？功能内容可以解决，用catch。解决不了，用throws告诉调用者，由调用者解决 。
4. 一个功能如果抛出了多个异常，那么调用时，必须有对应多个catch进行针对性的处理。内部有几个需要检测的异常，就抛几个异常，抛出几个，就catch几个  

Demo：

```java
class FuShuIndexException extends Exception
{
    FuShuIndexException(String msg)
    {
        super(msg);
    }
}

class Demo
{
    public int method(int[] arr,int index) // throws NullPointerException,FuShuIndexException
    {
        if(arr==null)
            throw new NullPointerException("没有任何数组实体"); // throw 后，下面的代码就不执行了
        if(index<0)
            throw new FuShuIndexException();
        return arr[index];
    }
}

class ExceptionDemo4
{
    public static void main(String[] args)
    {
        int[] arr = new int[3];
        Demo d = new Demo();
        try
        {
            int num = d.method(null,-1);
            System.out.println("num="+num);
        }
        catch(NullPointerException e)
        {
            System.out.println(e.toString());
        }
        catch(FuShuIndexException e)
        {
            System.out.println("message:"+e.getMessage());
            System.out.println("string:"+e.toString());
            e.printStackTrace(); //jvm默认的异常处理机制就是调用异常对象的这个方法。
            System.out.println("负数角标异常!!!!");
        }
        /*
        catch(Exception e)//多catch父类的catch放在最下面。
        { }
        */
        System.out.println("over");
    }
}
```

**try catch finally**

try catch finally 代码块组合特点：

1. try catch finally
2. try catch(多个)当没有必要资源需要释放时，可以不用定义finally
3. try finally 异常无法直接 catch 处理，但是资源需要关闭

**异常注意事项**

1. 子类在覆盖父类方法时，父类的方法如果抛出了异常，那么子类的方法只能抛出父类的异常或者该异常的子类
2. 如果父类抛出多个异常，那么子类只能抛出父类异常的子集  

简单说：子类覆盖父类只能抛出父类的异常或者子类或者子集。
注意：如果父类的方法没有抛出异常，那么子类覆盖时绝对不能抛，就只能try  

### 异常 Demo

场景

```
毕老师用电脑上课。
问题领域中涉及两个对象。
毕老师，电脑。
分析其中的问题。
比如电脑蓝屏啦。冒烟啦。
```

```java
class LanPingException extends Exception
{
    LanPingException(String msg)
    {
        super(msg);
    }
}

class MaoYanException extends Exception
{
    MaoYanException(String msg)
    {
        super(msg);
    }
}

class NoPlanException extends Exception 
{
    NoPlanException(String msg)
    {
        super(msg);
    }
}


class Computer
{
    private int state = 2;
    public void run() throws LanPingException,MaoYanException
    {
        if(state==1)
            throw new LanPingException("电脑蓝屏啦！！ ");
        if(state==2)
            throw new MaoYanException("电脑冒烟啦！！ ");
        System.out.println("电脑运行");
    }
    public void reset()
    {
        state = 0;
        System.out.println("电脑重启");
    }
}

class Teacher
{
    private String name;
    private Computer comp;
    Teacher(String name)
    {
        this.name = name;
        comp = new Computer();
    }
    public void prelect() throws NoPlanException // 没有 catch 的异常则抛出
    {
        try
        {
            comp.run();
            System.out.println(name+"讲课");
        }
        catch (LanPingException e) // 异常处理
        {
            System.out.println(e.toString());
            comp.reset();
            prelect();
        }
        catch (MaoYanException e)
        {
            System.out.println(e.toString());
            test();
            //可以对电脑进行维修。
            // throw e;
            throw new NoPlanException("课时进度无法完成，原因： "+e.getMessage()); // 能解决的异常自己解决，不能解决的，抛出异常，让调用者来解决
        }
    }
    public void test()
    {
        System.out.println("大家练习");
    }
}

class ExceptionTest
{
    public static void main(String[] args)
    {
        Teacher t = new Teacher("毕老师");
        try
        {
            t.prelect();
        }
        catch (NoPlanException e)
        {
            System.out.println(e.toString()+"......");
            System.out.println("换人");
        }
    }
}

/*
com.wansho.hellojava.MaoYanException: 电脑冒烟啦！！ 
大家练习
com.wansho.hellojava.NoPlanException: 课时进度无法完成，原因： 电脑冒烟啦！！ ......
换人
*/
```

## 包机制

导包的原则：用到哪个类，就导入哪个类。包在文件系统上的作用体现在文件夹上。

包名的规范：所有字母都小写。

**包的重点**

1. 对类文件进行分类管理
2. 给类提供多层命名空间(namespace)，防止类太多命名冲突了
3. 写在程序文件第一行
4. **类名的全称**是：包名.类名
5. 包也是一种封装方式

### package Demo

```
|---mypack
|---|---PackageDemo.java  
```

```java
package mypack;

class PackageDemo{
    public static void main(String[] args){
        System.out.println("hello package");
    }
}
```

编译执行该 Java 文件：

```shell
javac PackageDemo.java # 生成 PackageDemo.class 文件

java PackageDemo # 执行 class 文件
#！！！错误: 找不到或无法加载主类 PackageDemo

java mypack.PackageDemo
# hello package
```

从上面的例子来看，一旦加入 package 机制后，Java 文件就应该在包名所在的文件夹下，而且类名的全称变成了 `包名.类名`，单独引用类名会找不到这个人。

javac 可以直接帮我们创建文件夹：

```shell
javac -d . PackageDemo.java
java mypack.PackageDemo
```

### classpath 的作用

编译 java 源文件生成的 class 文件，都放在 classpath 中，以起到**源文件与 class 文件隔离的作用**。

### 包的封装作用和四种权限

包是对类的进一步封装。既然封装了，那么就涉及到外部的访问问题。在包中，只有 `public class` 才是外部可以访问的 class，不是 public 的 class 都被包封装了。

注意：对外暴露的 public 的 class，其类名要与文件名保持一致。在 public class 中对外暴露的函数也应该是 public 的（默认权限也是封装！）

包与包之间的访问，通过 `public` 和 `protected` 关键字来约束。

不同包不允许访问，但如果你是我们的儿子，那么就可以网开一面：`protected`，**不叫爹不行！**提供给不同包中的子类。

 protected 关键字将对象保护在同包中，不同包无法调用 protected 的对象。

**java 四种权限**

|          | public | protected | default        | private |
| -------- | ------ | --------- | -------------- | ------- |
| 同一类中 | ok     | ok        | ok             | ok      |
| 同一包中 | ok     | ok        | ok             | 封装    |
| 子类中   | ok     | ok        | 封装(访问不到) | 封装    |
| 不同包中 | ok     | 封装      | 封装           | 封装    |

总结：包与包之间的类进行访问，被访问的包中的类必须是 public 的，被访问的包中的类的方法也必须是 public 的。 

protected：比 default 稍微宽松一点，包外的子类可以访问

default：同包能访问，包外的子类就不能访问了

private：吃独食，子类都访问不了

<img align="left" src="assets/image-20210503084531612.png" alt="image-20210503084531612" style="zoom:80%;" />



### import 的作用和规范

import 的作用：简化类名书写！

```java
// 没导入之前：
packa.PackageADemo demoA = new packa.PackageADemo();

// 导入后
import packa.PackageADemo; // 导入 packa 下的 PackageADemo 类
PackageADemo demoA = new PackageADemo();

// 导入 packa 中所有的类
import packa.*;
import packa.abc.*; // 两个性质完全不一样
```

注意：

1. `import *` 只导入文件夹下的所有类，并不会导入包中包（没有 recursive 的功能）
2. 导包原则：用哪个类，导入哪个类

### jar 包

**是什么**

`jar` 是 Java 的一个命令，用于 Java 程序打包。`jar, rar`，jar 包就是 Java 的压缩包。

```shell
javac -d . JarDemo.java
java pack.JarDemo
jar -cvf haha.jar pack # 压缩

jar -xvf haha.jar # 解压缩

# 以前：./pack
# 压缩后：./haha.jar/pack
```

注意：jar 包中打包的是 class 文件，没有必要对源码进行打包。

**如何使用 jar 包**

```shell
set classpath=./haha.jar
java pack.JarDemo
```

## 多线程

### 垃圾回收线程

JVM 启动的时候，就启动了多个线程，至少有两个线程是我们可以分析出来的：

1. main
2. 负责垃圾回收的线程

```java
class Demo4 extends Object
{
    @Override
    public void finalize() // 在垃圾回收前调用
    {
        System.out.println("demo ok");
    }
}
class ThreadDemo
{
    public static void main(String[] args)
    {
        new Demo4();
        new Demo4();
        new Demo4();
        System.gc(); // 进行垃圾回收
        System.out.println("Hello World!");
    }
}
```

运行结果：

垃圾回收线程，其执行结果每次都不太一样。

```
demo ok
demo ok
Hello World!
demo ok

-----------

demo ok
demo ok
demo ok
Hello World!

-----------

demo ok
Hello World!
demo ok
demo ok
```

### 创建线程-继承 Thread

创建线程方式一：继承Thread类。
步骤：

1. 定义一个类继承 Thread 类
2. 覆盖Thread类中的 run 方法
3. 直接创建Thread的子类对象创建线程
4. 调用start方法开启线程并调用线程的任务run方法执行

可以通过 Thread 的 getName 获取线程的名称 Thread-编号(从0开始)  

Demo：

```java
class Demo extends Thread
{
    private String name;
    Demo(String name)
    {
        super(name);
        this.name = name;
    }
    public void run()
    {
        for(int x=0; x<10; x++)
        {
            System.out.println(name+"....x="+x+".....name="+Thread.currentThread().getName());
        }
    }
}

class ThreadDemo2
{
    public static void main(String[] args)
    {
        /*
        创建线程的目的是为了开启一条执行路径，去运行指定的代码和其他代码实现同时运行。
        而运行的指定代码就是这个执行路径的任务。
        jvm创建的主线程的任务都定义在了主函数中。
        而自定义的线程它的任务在哪儿呢？
        Thread类用于描述线程，线程是需要任务的。所以Thread类也对任务的描述。
        这个任务就通过Thread类中的run方法来体现。也就是说， run方法就是封装自定义线程运行任务的函数。
        run方法中定义就是线程要运行的任务代码。
        开启线程是为了运行指定代码，所以只有继承Thread类，并复写run方法。
        将运行的代码定义在run方法中即可。
        */
        Demo d1 = new Demo("旺财");
        Demo d2 = new Demo("xiaoqiang");
        d1.start();//开启线程，调用run方法。
        d2.start();
        System.out.println("over...."+Thread.currentThread().getName());
    }
}

/**
over....main
小强....x=0.....name=小强
旺财....x=0.....name=旺财
小强....x=1.....name=小强
小强....x=2.....name=小强
旺财....x=1.....name=旺财
小强....x=3.....name=小强
小强....x=4.....name=小强
旺财....x=2.....name=旺财
小强....x=5.....name=小强
旺财....x=3.....name=旺财
小强....x=6.....name=小强
小强....x=7.....name=小强
小强....x=8.....name=小强
小强....x=9.....name=小强
旺财....x=4.....name=旺财
旺财....x=5.....name=旺财
旺财....x=6.....name=旺财
旺财....x=7.....name=旺财
旺财....x=8.....name=旺财
旺财....x=9.....name=旺财
*/
```

多线程的随机性，谁抢到 CPU，谁执行。

### 创建线程-实现 Runnable

步骤：

1. 定义类实现Runnable接口

2. 覆盖接口中的run方法，将线程的任务代码封装到run方法中

3. 通过Thread类创建线程对象，并将Runnable接口的子类对象作为Thread类的构造函数的参数进行传递。

   为什么？因为线程的任务都封装在Runnable接口子类对象的run方法中。所以要在线程对象创建时就必须明确要运行的任务。

4. 调用线程对象的start方法开启线程

实现Runnable接口的好处：

1. 将线程的任务从线程的子类中分离出来，进行了单独的封装
   按照面向对象的思想将任务的封装成对象

2. 避免了java单继承的局限性
   所以，创建线程的第二种方式较为常用

```java
class Demo implements Runnable{//extends Fu //准备扩展Demo类的功能，让其中的内容可以作为线程的任务执行。
    //通过接口的形式完成。
    public void run()
    {
        show();
    }
    public void show()
    {
        for(int x=0; x<20; x++)
        {
            System.out.println(Thread.currentThread().getName()+"....."+x);
        }
    }
}

class ThreadDemo
{
    public static void main(String[] args)
    {
        Demo d = new Demo();
        Thread t1 = new Thread(d);
        Thread t2 = new Thread(d);
        t1.start();
        t2.start();
    }
}
```



### 同步和互斥

**synchronized**

[[synchronized 讲解]](https://www.cnblogs.com/weibanggang/p/9470718.html)

synchronized，翻译过来，就是同步的意思，其是 Java 的关键字，是一种同步锁，其修饰的对象有以下几种：

1. 修饰一个代码块，被修饰的代码块称为同步语句块，其作用的范围是大括号{}括起来的代码，作用的对象是调用这个代码块的对象； 
2. 修饰一个方法，被修饰的方法称为同步方法，其作用的范围是整个方法，作用的对象是调用这个方法的对象； 
  3. 修改一个静态的方法，其作用的范围是整个静态方法，作用的对象是这个类的所有对象； 
  4. 修改一个类，其作用的范围是synchronized后面括号括起来的部分，作用主的对象是这个类的所有对象。

详细介绍：

1. 修饰代码块

   一个线程访问一个对象中的synchronized(this)同步代码块时，其他试图访问该对象的线程将被阻塞。

2. 修饰一个方法

   注意：synchronized 关键字不能被继承，如果在父类中的某个方法使用了synchronized关键字，而在子类中覆盖了这个方法，在子类中的这个方法默认情况下并不是同步的，而必须显式地在子类的这个方法中加上synchronized关键字才可以

3. 修饰静态方法

   我们知道静态方法是属于类的而不属于对象的。同样的，synchronized修饰的静态方法锁定的是这个类的所有对象。

**卖票问题**

线程安全问题产生的原因：

1. 多个线程在操作共享的数据
2. 操作共享数据的线程代码有多条
   当一个线程在执行操作共享数据的多条代码过程中，其他线程参与了运算。就会导致线程安全问题的产生。

解决思路:

就是将临界区封装起来，当有线程在执行这些代码的时候，其他线程时不可以参与运算的。必须要当前线程把这些代码都执行完毕后，其他线程才可以参与运算。在 java 中，用同步代码块就可以解决这个问题。同步代码块的格式：

```java
synchronized(对象)
{
	需要被同步的代码 ；
}
```

同步的好处：解决了线程的安全问题。
同步的弊端：相对降低了效率，因为同步外的线程的都会判断同步锁。
同步的前提：同步中必须有多个线程并使用同一个锁。

```java
class Ticket implements Runnable//extends Thread
{
    private int num = 100;
    Object obj = new Object();
    public void run()
    {
        while(true)
        {
            synchronized(obj)
            {
                if(num>0)
                {
                    try{Thread.sleep(10);}catch (InterruptedException e){}
                    System.out.println(Thread.currentThread().getName()+".....sale...."+num--);
                }
            }
        }
    }
}

class TicketDemo
{
    public static void main(String[] args)
    {
        Ticket t = new Ticket();//创建一个线程任务对象。
        Thread t1 = new Thread(t);
        Thread t2 = new Thread(t);
        Thread t3 = new Thread(t);
        Thread t4 = new Thread(t);
        t1.start();
        t2.start();
        t3.start();
        t4.start();
    }
}
```

**银行存钱案例**

需求:储户，两个，每个都到银行存钱每次存100，共存三次。  

```java
class Bank
{
    private int sum;
    public synchronized void add(int num) // 同步函数，临界区一次只允许一个进程访问
    {
        sum = sum + num;
        try{Thread.sleep(10);}catch(InterruptedException e){} // 当前进程睡 10 ms
        System.out.println("sum="+sum);
    }
}

class Cus implements Runnable // 线程的另一种实现方式
{
    private Bank b = new Bank();
    public void run()
    {
        for(int x=0; x<3; x++)
        {
            b.add(100);
        }
    }
}

class BankDemo
{
    public static void main(String[] args)
    {
        Cus c = new Cus(); // 注意 Cus 对象只创建了一次，也就是说银行这个对象只创建了一次！
        Thread t1 = new Thread(c);
        Thread t2 = new Thread(c);
        t1.start();
        t2.start();
    }
}

/*
sum=100
sum=200
sum=300
sum=400
sum=500
sum=600
*/
```

**多线程下的单例安全问题**

```java
/*
多线程下的单例
*/
// 饿汉式不存在多线程安全问题
class Single
{
    private static final Single s = new Single();
    private Single(){}
    public static Single getInstance()
    {
        return s;
    }
}

// 懒汉式
// 加入同步为了解决多线程安全问题。
// 加入双重判断是为了解决效率问题。
class Single
{
    private static Single s = null;
    private Single(){}
    public static Single getInstance()
    {
        if(s==null)
        {
            synchronized(Single.class) // 同步代码块
            {
                if(s==null)
                    // -->0 -->1
                    s = new Single();
            }
        }
     return s;
    }
}

class SingleDemo
{
    public static void main(String[] args)
    {
        System.out.println("Hello World!");
    }
}
```

注意：synchronized 关键字不能被继承，如果在父类中的某个方法使用了synchronized关键字，而在子类中覆盖了这个方法，在子类中的这个方法默认情况下并不是同步的，而必须显式地在子类的这个方法中加上synchronized关键字才可以。

**死锁 - 同步嵌套(没看懂)**

```java
class Ticket implements Runnable
{
    private int num = 100;
    Object obj = new Object();
    boolean flag = true;
    public void run()
    {
        if(flag)
            while(true)
            {
                synchronized(obj)
                {
                    show();
                }
            }
     else
         while(true)
             this.show();
    }
    public synchronized void show()
    {
        synchronized(obj)
        {
            if(num>0)
            {
                try{Thread.sleep(10);}catch (InterruptedException e){}
                System.out.println(Thread.currentThread().getName()+".....sale...."+num--);
            }
        }
    }
}
class DeadLockDemo
{
    public static void main(String[] args)
    {
        Ticket t = new Ticket();
        // System.out.println("t:"+t);
        Thread t1 = new Thread(t);
        Thread t2 = new Thread(t);
        t1.start();
        try{Thread.sleep(10);}catch(InterruptedException e){}
        t.flag = false;
        t2.start();
    }
}
```

**静态同步函数的锁**

静态的同步函数使用的锁是该函数所属字节码文件对象，可以用 getClass 方法获取，也可以用当前类名.class 表示。  

```java
class Ticket implements Runnable
{
    private static int num = 100;
    // Object obj = new Object();
    boolean flag = true;
    public void run()
    {
        // System.out.println("this:"+this.getClass());
        if(flag)
            while(true)
            {
                synchronized(Ticket.class)//(this.getClass()) 此处因为对静态变量进行访问，所以取得得锁是类
                {
                    if(num>0)
                    {
                        try{Thread.sleep(10);}catch (InterruptedException e){}
                        System.out.println(Thread.currentThread().getName()+".....obj...."+num--); // 此处非静态方法可以访问静态变量
                    }
                }
            }
        else
            while(true)
                this.show();
    }
    public static synchronized void show()
    {
        if(num>0)
        {
            try{Thread.sleep(10);}catch (InterruptedException e){}
            System.out.println(Thread.currentThread().getName()+".....function...."+num--);
        }
    }
}
class StaticSynFunctionLockDemo
{
    public static void main(String[] args)
    {
        Ticket t = new Ticket();
        // Class clazz = t.getClass();
        //
        // Class clazz = Ticket.class;
        // System.out.println("t:"+t.getClass());
        Thread t1 = new Thread(t);
        Thread t2 = new Thread(t);
        t1.start();
        try{Thread.sleep(10);}catch(InterruptedException e){}
        t.flag = false;
        t2.start();
    }
}
```

**同步函数 vs 同步代码块**

同步函数和同步代码块的区别：

1. 同步函数的锁是固定的this
2. 同步代码块的锁是任意的对象
3. 建议使用同步代码块  

```java
class Ticket implements Runnable
{
    private int num = 100;
    // Object obj = new Object();
    boolean flag = true;
    public void run()
    {
        // System.out.println("this:"+this);
        if(flag)
            while(true)
            {
                synchronized(this) // 此处因为对类变量进行访问，所以取得的锁是对象
                {
                    if(num>0)
                    {
                        try{Thread.sleep(10);}catch (InterruptedException e){}
                        System.out.println(Thread.currentThread().getName()+".....obj...."+num--);
                    }
                }
            }
        else
            while(true)
                this.show();
    }
    public synchronized void show()
    {
        if(num>0)
        {
            try{Thread.sleep(10);}catch (InterruptedException e){}
            System.out.println(Thread.currentThread().getName()+".....function...."+num--);
        }
    }
}

class SynFunctionLockDemo
{
    public static void main(String[] args)
    {
        Ticket t = new Ticket();
        // System.out.println("t:"+t);
        Thread t1 = new Thread(t);
        Thread t2 = new Thread(t);
        t1.start();
        try{Thread.sleep(10);}catch(InterruptedException e){}
        t.flag = false;
        t2.start();
    }
}
```

**总结**

1. 无论synchronized关键字加在方法上还是对象上，如果它作用的对象是非静态的，则它取得的锁是对象；如果synchronized作用的对象是一个静态变量或方法，则它取得的锁是对类，该类所有的对象同一把锁
2. 每个对象只有一个锁（lock）与之相关联，谁拿到这个锁谁就可以运行它所控制的那段代码 
3. 实现同步是要很大的系统开销作为代价的，甚至可能造成死锁，所以尽量避免无谓的同步控制

### join()

Java 官方解释：Waits for this thread to die.

当调用了 Thread.Join()方法后,当前线程会立即被执行,其他所有的线程会被暂停执行。当这个线程执行完后,其他线程才会继续执行。

```java
class Demo implements Runnable
{
    public void run()
    {
        for(int x=0; x<50; x++)
        {
            System.out.println(Thread.currentThread().toString()+"....."+x);
            Thread.yield(); // 线程进入就绪状态，让出 CPU 使用权
        }
    }
}

class JoinDemo
{
    public static void main(String[] args) throws Exception
    {
        Demo d = new Demo();
        Thread t1 = new Thread(d);
        Thread t2 = new Thread(d);
        t1.start();
        t2.start();
        t2.setPriority(Thread.MAX_PRIORITY); // 设置线程运行级别
        t1.join(); // t1 先执行完再说
        for(int x=0; x<50; x++)
        {
            System.out.println(Thread.currentThread()+"....."+x);
        }
    }
}
```

### 线程间通信

线程间通讯：多个线程在处理同一资源，但是任务却不同。

生产者和消费者，就是一种典型的线程间通信。

```java
//资源
class Resource
{
    String name;
    String sex;
}

//输入
class Input implements Runnable
{
    Resource r ;
    // Object obj = new Object();
    Input(Resource r)
    {
        this.r = r;
    }
    public void run()
    {
        int x = 0;
        while(true)
        {
            synchronized(r)
            {
                if(x==0)
                {
                    r.name = "mike";
                    r.sex = "nan";
                }
                else
                {
                    r.name = "丽丽";
                    r.sex = "女女女女女女";
                }
            }
            x = (x+1)%2;
        }
    }
}
//输出
class Output implements Runnable
{
    Resource r;
    // Object obj = new Object();
    Output(Resource r)
    {
        this.r = r;
    }
    public void run()
    {
        while(true)
        {
            synchronized(r)
            {
                System.out.println(r.name+"....."+r.sex);
            }
        }
    }
}
class ResourceDemo
{
    public static void main(String[] args)
    {
        //创建资源。
        Resource r = new Resource();
        //创建任务。
        Input in = new Input(r);
        Output out = new Output(r);
        //创建线程，执行路径。
        Thread t1 = new Thread(in);
        Thread t2 = new Thread(out);
        //开启线程
        t1.start();
        t2.start();
    }
}
```

上面的代码只是一个演示代码，没有进行线程间的同步，只是一种理想化的生产消费。下面加入 wait 和 notify 进行进程之间的协作。

### wait / notify

等待/唤醒机制。
涉及的方法：

1. wait(): 让线程处于冻结（阻塞）状态，被wait的线程会被存储到线程池中
2. notify(): Wakes up a single thread that is waiting on this object's monitor.
3. notifyAll(): Wakes up all threads that are waiting on this object's monitor.

这些方法都必须定义在同步中。因为这些方法是用于操作线程状态的方法。必须要明确到底操作的是哪个锁上的线程。

以上三个方法，都是定义在 Object 基类中的类方法。因为这些方法是监视器的方法。监视器其实就是锁。锁可以是任意的对象，任意的对象调用的方式一定定义在Object类中。  

**一个生产者和一个消费者**

```java
//资源
class Resource
{
    String name;
    String sex;
    boolean flag = false;
}

//输入
class Input implements Runnable
{
    Resource r ;
    // Object obj = new Object();
    Input(Resource r)
    {
        this.r = r;
    }
    public void run()
    {
        int x = 0;
        while(true) // 这个线程一直跑
        {
            synchronized(r) // r 当成一把 lock
            {
                if(r.flag) // 有资源了，就阻塞
                    try{r.wait();}catch(InterruptedException e){}
                if(x==0) // 生产者交替生产两个产品：mike 和 丽丽
                {
                    r.name = "mike";
                    r.sex = "man";
                }
                else
                {
                    r.name = "丽丽";
                    r.sex = "女女女女女女";
                }
                r.flag = true; // 标记有资源，然后环境消费者来消费
                r.notify();
            }
            x = (x+1)%2; 
        }
    }
}
//输出
class Output implements Runnable
{
    Resource r;
    // Object obj = new Object();
    Output(Resource r)
    {
        this.r = r;
    }
    public void run()
    {
        while(true)
        {
            synchronized(r)
            {
                if(!r.flag) // 没资源，就阻塞，等有资源再消费
                    try{r.wait();}catch(InterruptedException e){}
                System.out.println("消费：" + r.name+"....."+r.sex); // 有资源，消费 r
                r.flag = false; // 消费完后，置空，然后唤醒沉睡的生产者进程
                r.notify();
            }
        }
    }
}

class ResourceDemo2
{
    public static void main(String[] args)
    {
        //创建资源。
        Resource r = new Resource(); 
        //创建任务。
        Input in = new Input(r);
        Output out = new Output(r);
        //创建线程，执行路径。
        Thread t1 = new Thread(in);
        Thread t2 = new Thread(out);
        //开启线程
        t1.start();
        t2.start();
    }
}
```

**另一种实现**

```java
class Resource
{
    private String name;
    private String sex;
    private boolean flag = false;
    public synchronized void set(String name,String sex)
    {
        if(flag)
            try{this.wait();}catch(InterruptedException e){}
        this.name = name;
        this.sex = sex;
        flag = true;
        this.notify();
    }
    public synchronized void out()
    {
        if(!flag)
            try{this.wait();}catch(InterruptedException e){}
        System.out.println(name+"...+...."+sex);
        flag = false;
        notify();
    }
}
//输入
class Input implements Runnable
{
    Resource r ;
    // Object obj = new Object();
    Input(Resource r)
    {
        this.r = r;
    }
    public void run()
    {
        int x = 0;
        while(true)
        {
            if(x==0)
            {
                r.set("mike","nan");
            }
            else
            {
                r.set("丽丽","女女女女女女");
            }
            x = (x+1)%2;
        }
    }
}

//输出
class Output implements Runnable
{
    Resource r;
    // Object obj = new Object();
    Output(Resource r)
    {
        this.r = r;
    }
    public void run()
    {
        while(true)
        {
            r.out();
        }
    }
}

class ResourceDemo3
{
    public static void main(String[] args)
    {
        //创建资源。
        Resource r = new Resource();
        //创建任务。
        Input in = new Input(r);
        Output out = new Output(r);
        //创建线程，执行路径。
        Thread t1 = new Thread(in);
        Thread t2 = new Thread(out);
        //开启线程
        t1.start();
        t2.start();
    }
}
```

实际上，第一个例子才是最恰当的，生产和消费的行为被封装在了生产者和消费者上，而第二个例子，生产和消费的行为被绑定到了商品上，不符合常识。

**wait 和 sleep 的区别**

区别：

1. wait可以指定时间也可以不指定。sleep必须指定时间
2. 在同步中时，对cpu的执行权和锁的处理不同
   wait：释放执行权，释放锁。
   sleep:释放执行权，不释放锁。 （也就是不释放临界区，其他线程干等着，不符合让权等待）
3. 



### 多生产者与消费者

多生产者，多消费者的问题。
if 判断标记，只有一次，会导致不该运行的线程运行了。出现了数据错误的情况。
while 判断标记，解决了线程获取执行权后，是否要运行！
`notify`: 只能唤醒一个线程，如果本方唤醒了本方，没有意义。而且while判断标记+notify会导致死锁。
`notifyAll`: 解决了本方线程一定会唤醒对方线程的问题。  

```java
class Resource
{
    private String name;
    private int count = 1;
    private boolean flag = false;
    public synchronized void set(String name) // 生产
    {
        while(flag)
            try{this.wait();}catch(InterruptedException e){} // 有鸭子，就进入阻塞状态
        this.name = name + count;// 没鸭，生产 烤鸭1 烤鸭2 烤鸭3
        count++; //2 3 4
        System.out.println(Thread.currentThread().getName()+"... 生产者..."+this.name); // 生产烤鸭1 生产烤鸭2 生产烤鸭3
        flag = true; // 表示有鸭子
        notifyAll(); // 唤醒所有阻塞线程，生产者被唤醒则 wait，消费者被唤醒，则消费
    }
    public synchronized void out()// 消费
    {
        while(!flag)
            try{this.wait();}catch(InterruptedException e){} // 没鸭子，进入阻塞状态
        System.out.println(Thread.currentThread().getName()+"... 消费者........"+this.name);//消费烤鸭1
        flag = false;
        notifyAll(); // 唤醒了对方的所有线程
    }
}

class Producer implements Runnable
{
    private Resource r;
    Producer(Resource r)
    {
        this.r = r;
    }
    public void run()
    {
        while(true)
        {
            r.set("烤鸭");
        }
    }
}

class Consumer implements Runnable
{
    private Resource r;
    Consumer(Resource r)
    {
        this.r = r;
    }
    public void run()
    {
        while(true)
        {
            r.out();
        }
    }
}

class ProducerConsumerDemo
{
    public static void main(String[] args)
    {
        Resource r = new Resource();
        Producer pro = new Producer(r);
        Consumer con = new Consumer(r);
        Thread t0 = new Thread(pro);
        Thread t1 = new Thread(pro);
        Thread t2 = new Thread(con);
        Thread t3 = new Thread(con);
        t0.start();
        t1.start();
        t2.start();
        t3.start();
    }
}
```

上面这个例子，仍然还是一个简单的生产一个，消费一个的例子，只是加入了多个生产者和消费者。

### 停止线程

停止线程：

1. `interrupt` 方法
2. run 方法结束

怎么控制线程的任务结束呢?

任务中都会有循环结构，只要控制住循环就可以结束任务。控制循环通常就用定义标记来完成。
但是如果线程处于了阻塞状态，无法读取标记。如何结束呢？可以使用 `interrupt()` 方法将线程从冻结状态强制恢复到运行状态中来，让线程具备cpu的执行资格。强制动作会发生 InterruptedException，要处理。

```java
class StopThread implements Runnable
{
    private boolean flag = true;
    public synchronized void run()
    {
        while(flag)
        {
            try
            {
                wait(); //t0 t1
            }
            catch (InterruptedException e)
            {
                System.out.println(Thread.currentThread().getName()+"....."+e);
                flag = false;
            }
            System.out.println(Thread.currentThread().getName()+ "......++++"); // 被唤醒后，这句话还会执行
        }
    }
    public void setFlag()
    {
        flag = false;
    }
}

class StopThreadDemo
{
    public static void main(String[] args)
    {
       	 StopThread st = new StopThread();
         Thread t1 = new Thread(st);
         Thread t2 = new Thread(st);
         t1.start();
         t2.setDaemon(true); // t2 设置为守护进程，主线程 main 和 用户线程 t1 执行完后，自动结束
         t2.start();
         int num = 1;
         for(;;)
         {
             if(++num==50)
             {
                 // st.setFlag();
                 t1.interrupt();
                 // t2.interrupt();
                 break;
             }
             System.out.println("main...."+num);
         }
         System.out.println("over");
    }
}
```

 **守护线程和用户线程**

`setDaemon(true)`

Marks this thread as either a [daemon](https://docs.oracle.com/javase/8/docs/api/java/lang/Thread.html#isDaemon--) thread or a user thread. The Java Virtual Machine exits when the only threads running are all daemon threads.

守护线程类似于守护进程，优先级低于用户线程和用户进程。

### 多线程总结

```
多线程总结：
1，进程和线程的概念。
|--进程：
|--线程：
2， jvm中的多线程体现。
|--主线程，垃圾回收线程，自定义线程。以及他们运行的代码的位置。
3，什么时候使用多线程，多线程的好处是什么？创建线程的目的？
|--当需要多部分代码同时执行的时候，可以使用。
4，创建线程的两种方式。★★★★★
|--继承 Thread
|--步骤
|--实现 Runnable
|--步骤
|--两种方式的区别？
5，线程的5种状态。
对于执行资格和执行权在状态中的具体特点。
|--被创建：
|--运行：
|--冻结：
|--临时阻塞：
|--消亡：
6，线程的安全问题。★★★★★
|--安全问题的原因：
|--解决的思想：
|--解决的体现： synchronized
|--同步的前提：但是加上同步还出现安全问题，就需要用前提来思考。
|--同步的两种表现方法和区别：
|--同步的好处和弊端：
|--单例的懒汉式。
|--死锁。
7，线程间的通信。等待/唤醒机制。
|--概念：多个线程，不同任务，处理同一资源。
|--等待唤醒机制。使用了锁上的 wait notify notifyAll. ★★★★★
|--生产者/消费者的问题。并多生产和多消费的问题。 while判断标记。用notifyAll唤醒对方。 ★
★★★★
|--JDK1.5以后出现了更好的方案，★★★
Lock接口替代了synchronized
Condition接口替代了Object中的监视方法，并将监视器方法封装成了Condition
和以前不同的是，以前一个锁上只能有一组监视器方法。现在，一个Lock锁上可以多组监视器方法对
象。
可以实现一组负责生产者，一组负责消费者。
|--wait和sleep的区别。★★★★★
8，停止线程的方式。
|--原理：
|--表现： --中断。
9，线程常见的一些方法。
|--setDaemon()
|--join();
|--优先级
|--yield();
|--在开发时，可以使用匿名内部类来完成局部的路径开辟。
```

## 常用类 API

### String

**构造函数**

```java
public class StringConstructorDemo {
    /**
     * @param args
     */
    public static void main(String[] args) {
        /*
         * 将字节数组或者字符数组转成字符串可以通过String类的构造函数完成。
         */
        stringConstructorDemo2();
        stringConstructorDemo();
    }
    private static void stringConstructorDemo2() {
        char[] arr = {'w','a','p','q','x'};
        String s = new String(arr,1,3); // apq
        System.out.println("s="+s);
    }
    public static void stringConstructorDemo() {
        String s = new String(); // 等价于 String s = ""; 不等效String s = null;
        byte[] arr = {97,66,67,68}; // aBCD
        String s1 = new String(arr);
        System.out.println("s1="+s1);
    }
}
```

**字符串对象一旦被初始化就不会被改变**

字符串在内存中会存储到两个地方：

1. 常量池

   ```java
   String s = "abc"; // "abc"存储在字符串常量池中。
   String s1 = "abc";
   System.out.println(s==s1); // true
   ```

2. 堆内存

   ```java
   String s = "abc"; // 创建一个字符串对象在常量池中。
   String s1 = new String("abc"); // 创建两个对象一个new一个字符串对象在堆内存中。
   System.out.println(s==s1); // false
   System.out.println(s.equals(s1));
   ```

**String 类方法及使用**

```java
public class StringMethodDemo {
    /**
     * @param args
     */
    public static void main(String[] args) {
        /*
         * 按照面向对象的思想对字符串进行功能分类。
         * "abcd"
         *
         * 1,获取：
         * 1.1 获取字符串中字符的个数(长度).
         * int length();
         * 1.2 根据位置获取字符。
         * char charAt(int index);
         * 1.3 根据字符获取在字符串中的第一次出现的位置.
         * int indexOf(int ch)
         * int indexOf(int ch,int fromIndex):从指定位置进行ch的查找第一次出现位置
         * int indexOf(String str);
         * int indexOf(String str,int fromIndex);
         * 根据字符串获取在字符串中的第一次出现的位置.
         * int lastIndexOf(int ch)
         * int lastIndexOf(int ch,int fromIndex):从指定位置进行ch的查找第一次出现位置
         * int lastIndexOf(String str);
         * int lastIndexOf(String str,int fromIndex);
         * 1.4 获取字符串中一部分字符串。也叫子串.
         * String substring(int beginIndex, int endIndex)//包含begin 不包含end 。
         * String substring(int beginIndex);
         *
         *
         * 2，转换。
         * 2.1 将字符串变成字符串数组(字符串的切割)
         * String[] split(String regex):涉及到正则表达式.
         * 2.2 将字符串变成字符数组。
         * char[] toCharArray();
         * 2.3 将字符串变成字节数组。
         * byte[] getBytes();
         * 2.4 将字符串中的字母转成大小写。
         * String toUpperCase():大写
         * String toLowerCase():小写
         * 2.5 将字符串中的内容进行替换
         * String replace(char oldch,char newch);
         * String replace(String s1,String s2);
         * 2.6 将字符串两端的空格去除。
         * String trim();
         * 2.7 将字符串进行连接 。
         * String concat(string);
         *
         * 3，判断
         * 3.1 两个字符串内容是否相同啊？
         * boolean equals(Object obj);
         * boolean equalsIgnoreCase(string str);忽略大写比较字符串内容。
         * 3.2 字符串中是否包含指定字符串？
         * boolean contains(string str);
         * 3.3 字符串是否以指定字符串开头。是否以指定字符串结尾。
         * boolean startsWith(string);
         * boolean endsWith(string);
         *
         * 4，比较。
         *
         */
        stringMethodDemo_4();
        // System.out.println("abc".concat("kk"));
        // System.out.println("abc"+"kk");
        // System.out.println(String.valueOf(4)+1);
        // System.out.println(""+4+1);
    }
    private static void stringMethodDemo_4() {
        System.out.println("abc".compareTo("aqz")); // -15
        /*
        * int num = 'b' - 'q';
        * System.out.println(String.valueOf(num));
        * */
    }
    private static void stringMethodDemo_3() {
        String s = "abc";
        System.out.println(s.equals("ABC".toLowerCase()));
        System.out.println(s.equalsIgnoreCase("ABC"));
        System.out.println(s.contains("cc"));
        String str = "ArrayDemo.java";
        System.out.println(str.startsWith("Array"));
        System.out.println(str.endsWith(".java"));
        System.out.println(str.contains("Demo"));
    }
    private static void stringMethodDemo_2() {
        String s = "张三,李四,王五";
        String[] arr = s.split(",");
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }
        char[] chs = s.toCharArray();
        for (int i = 0; i < chs.length; i++) {
            System.out.println(chs[i]);
        }
        s = "ab你";
        byte[] bytes = s.getBytes();
        for (int i = 0; i < bytes.length; i++) {
            System.out.println(bytes[i]);
        }
        System.out.println("Abc".toUpperCase());
        String s1 = "java";
        String s2 = s1.replace('q', 'z');
        System.out.println(s1==s2);//true
        System.out.println("-"+" ab c ".trim()+"-");
    }
    private static void stringMethodDemo_1() {
        String s = "abcdae";
        System.out.println("length:"+s.length());//6
        System.out.println("char:"+s.charAt(2));//c//StringIndexOutOfBoundsException
        System.out.println("index:"+s.indexOf('k'));//0//-1 我们可以根据-1，来判断该字符或者字符串是否存在。
        System.out.println("lastIndex:"+s.lastIndexOf('a'));//4
        System.out.println("substring:"+s.substring(2,4));
    }
}

```

**字符串比较**

```java
/*
* 1，给定一个字符串数组。按照字典顺序进行从小到大的排序。
* {"nba","abc","cba","zz","qq","haha"}
*
* 思路：
* 1,对数组排序。可以用选择，冒泡都行。
* 2,for嵌套和比较以及换位。
* 3,问题：以前排的是整数，比较用的比较运算符，可是现在是字符串对象。
* 字符串对象怎么比较呢？爽了，对象中提供了用于字符串对象比较的功能。
*/
public class StringTest_1 {
    /**
    * @param args
    */
    public static void main(String[] args) {
        String[] arr = { "nba", "abc", "cba", "zz", "qq", "haha" };
        printArray(arr);
        sortString(arr);
        printArray(arr);
    }
    public static void sortString(String[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if(arr[i].compareTo(arr[j])>0) // 字符串比较用compareTo方法
                    swap(arr,i,j);
            }
                                                 }
    }
    private static void swap(String[] arr, int i, int j) {
        String temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    public static void printArray(String[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            if (i != arr.length - 1)
                System.out.print(arr[i] + ", ");
            else
                System.out.println(arr[i] + "]");
        }
    }
}
```

**字符串格式化** 

MessageFormat

```java
String deleteSql =
                "delete from \n" +
                "  {0} \n" +
                "where \n" +
                "  {1} in (\n" +
                "    select \n" +
                "      {1} \n" +
                "    from \n" +
                "      (select * from {0}) as {0}_copy \n" +
                "      left join \n" +
                "      (select *, \"{4}\" as \"{4}\" from {2}) as {2}_copy \n" +
                "      on \n" +
                "      {0}_copy.{1} = {2}_copy.{3} \n" +
                "    where \n" +
                "      {2}_copy.{4} is NULL\n" +
                "  );";
deleteSql = MessageFormat.format(deleteSql, mainTableName, mainPrKeyName, subTableName, subPrKeyName, joinNULLFlag);
```

jdk 的 bug，MessageFormat doesn't replace {0} if followed by word with apostrophe。对于单引号，需要用两个单引号来显示：

```java
String deleteSql =
                "delete from \n" +
                "  {0} \n" +
                "where \n" +
                "  {1} in (\n" +
                "    select \n" +
                "      {1} \n" +
                "    from \n" +
                "      (select * from {0}) {0}_copy \n" +
                "      left join \n" +
                "      (select {2}.*, ''{4}'' {4} from {2}) {2}_copy \n" +
                "      on \n" +
                "      {0}_copy.{1} = {2}_copy.{3} \n" +
                "    where \n" +
                "      {2}_copy.{4} is NULL\n" +
                "  );";
```

StringBuffer 可以传入 bool 值 和 数值，统一转成字符串再存入 StringBuffer.

```java
public class StringBufferDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        /*
        * StringBuffer:就是字符串缓冲区。
        * 用于存储数据的容器。
        * 特点：
        * 1，长度的可变的。
        * 2，可以存储不同类型数据。
        * 3，最终要转成字符串进行使用。
        * 4，可以对字符串进行修改。
        *
        * 既然是一个容器对象。应该具备什么功能呢？
        * 1，添加：
        * StringBuffer append(data);
        * StringBuffer insert(index,data);
        * 2，删除：
        * StringBuffer delete(start,end):包含头，不包含尾。
        * StringBuffer deleteCharAt(int index):删除指定位置的元素
        * 3，查找：
        * char charAt(index);
        * int indexOf(string);
        * int lastIndexOf(string);
        * 4， 修改：
        * StringBuffer replace(start,end,string);
        * void setCharAt(index,char);
        *
        * 增删改查 C(create)U(update)R(read)D(delete)
        */
        bufferMethodDemo();
    }
    private static void bufferMethodDemo_2() {
        StringBuffer sb = new StringBuffer("abce");
        // sb.delete(1, 3);//ae
        //清空缓冲区。
        // sb.delete(0,sb.length());
        // sb = new StringBuffer();
        // sb.replace(1, 3, "nba");
        // sb.setCharAt(2, 'q');
        // sb.setLength(10);
        // System.out.println("sb:"+sb);
        // System.out.println("len:"+sb.length());
        System.out.println(sb.reverse());
    }
    private static void bufferMethodDemo_1() {
        StringBuffer sb = new StringBuffer("abce");
        // sb.append("xixi");
        sb.insert(2, "qq");
        System.out.println(sb.toString());
    }
    public static void bufferMethodDemo(){
        //创建缓冲区对象。
        StringBuffer sb = new StringBuffer();
        sb.append(4).append(false); //.append("haha");
        sb.insert(1, "haha");
        // sb.append(true);
        System.out.println(sb);
    }
}
```

```java
/*
* jdk1.5以后出现了功能和StringBuffer一模一样的对象。就是StringBuilder
*
* 不同的是：
* StringBuffer 是线程同步的。通常用于多线程。
* StringBuilder是线程不同步的。通常用于单线程。 它的出现提高效率。
*
* jdk升级：
* 1，简化书写。
* 2，提高效率。
* 3，增加安全性。
*/
```

### 包装类

```java
package com.wansho.hellojava;

public class WrapperDemo {
    /**
     * @param args
     */
    public static void main(String[] args) {
        /*
         * 基本数据类型对象包装类。
         * 为了方便操作基本数据类型值，将其封装成了对象，在对象中定义了属性和行为丰富了该数据的操
         * 作。
         * 用于描述该对象的类就称为基本数据类型对象包装类。
         *
         * byte Byte
         * short Short
         * int Integer
         * long Long
         * float Float
         * double Double
         * char Character
         * booleanBoolean
         *
         * 该包装对象主要用基本类型和字符串之间的转换。
         *
         * 基本类型--->字符串
         * 1,基本类型数值 + ""
         * 2,用 String 类中的静态方法 valueOf(基本类型数值);
         * 3,用 Integer 的静态方法 valueOf(基本类型数值);
         *
         * 字符串--->基本类型
         * 1,使用包装类中的静态方法 xxx parseXxx("xxx类型的字符串");*****
         * int parseInt("intstring");
         * long parseLong("longstring");
         * boolean parseBoolean("booleanstring");
         * 只有Character没有parse方法
         * 2,如果字符串被Integer进行对象的封装。
         * 可使用另一个非静态的方法， intValue();
         * 将一个Integer对象转成基本数据类型值。
         */
         System.out.println(Integer.MAX_VALUE);
         System.out.println(Integer.toBinaryString(-6));
         int num = 4;
         Integer i = new Integer(5);
         int x = Integer.parseInt("123");
         System.out.println(Integer.parseInt("123")+1);
         i = new Integer("123");
         System.out.println(i.intValue());
        /*
         * 整数具备不同的进制体现。
         *
         * 十进制-->其他进制。
         * toBinaryString
         * toOctalString
         * toHexString
         *
         * 其他进制-->十进制。
         * parseInt("string",radix)
         *
         */
        // 十进制-->其他进制。
        System.out.println(Integer.toBinaryString(60));
        System.out.println(Integer.toOctalString(60));
        System.out.println(Integer.toHexString(60));
        // System.out.println(Integer.toString(60,16));
        // 其他进制-->十进制。
        // System.out.println(Integer.parseInt("3c",16));
        Integer a = new Integer("89");
        Integer b = new Integer(300);
        System.out.println(a==b);
        System.out.println(a.equals(b));
        // System.out.println(3>3);
        System.out.println(a.compareTo(b));

    }
}
```

**自动装箱拆箱**

```java
public class WrapperDemo2 {
    public static void main(String[] args) {
        int num = 4;
        num = num + 5;
        Integer i = 4; // i = new Integer(4); 自动装箱 简化书写。
        i = i + 6; // i = new Integer(i.intValue() + 6); // i.intValue() 自动拆箱
        // show(55);//
        Integer a = new Integer(128);
        Integer b = new Integer(128);
        System.out.println(a==b); // false 两个对象
        System.out.println(a.equals(b)); // true 值是相同的
        Integer x = 129; // jdk1.5以后，自动装箱，如果装箱的是一个字节，那么该数据会被共享不会重新开辟空间。
        Integer y = 129;
        System.out.println(x==y); // false
        System.out.println(x.equals(y)); //true
    }
}
```

```java
import java.util.Arrays;
/*
* 对一个字符串中的数值进行从小到大的排序。
*
* "20 78 9 -7 88 36 29"
*
* 思路：
* 1，排序， 我很熟。可是我只熟int。
* 2，如何获取到这个字符串中的这些需要排序的数值？
* 发现这个字符串中其实都是空格来对数值进行分隔的。
* 所以就想到用字符串对象的切割方法将大串变成多个小串。
* 3，数值最终变成小字符串，怎么变成一个int数呢？135
* 字符串-->基本类型 可以使用包装类。
*
*
*/
public class WrapperTest {
    private static final String SPACE_SEPARATOR = " ";
    /**
* @param args
*/
    public static void main(String[] args) {
        String numStr = "20 78 9 -7 88 36 29";
        System.out.println(numStr);
        numStr = sortStringNumber(numStr);
        System.out.println(numStr);
    }
    /**
*
* @param numStr
* @return
*/
    public static String sortStringNumber(String numStr) {
        //1,将字符串变成字符串数组。
        String[] str_arr = stringToArray(numStr);
        //2,将字符串数组变成int数组。
        int[] num_arr = toIntArray(str_arr);
        //3,对int数组排序。
        mySortArray(num_arr);
        //4,将排序后的int数组变成字符串。
        String temp = arrayToString(num_arr);
        return temp;
    }
    public static String arrayToString(int[] num_arr) {
        StringBuilder sb = new StringBuilder();136
            for(int x = 0; x<num_arr.length; x++){
                if(x!=num_arr.length-1)
                    sb.append(num_arr[x]+SPACE_SEPARATOR);
                else
                    sb.append(num_arr[x]);
            }
        return sb.toString();
    }
    public static void mySortArray(int[] num_arr) {
        Arrays.sort(num_arr);
    }
    public static int[] toIntArray(String[] str_arr) {
        int[] arr = new int[str_arr.length];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = Integer.parseInt(str_arr[i]);
        }
        return arr;
    }
    /**
* @param numStr
*/
    public static String[] stringToArray(String numStr) {
        String[] str_arr = numStr.split(SPACE_SEPARATOR);
        return str_arr;
    }
}
```

### 泛型

在jdk1.5后，使用泛型来接收类中要操作的引用数据类型。

**泛型的作用**

[Oracle 泛型：工作原理及其重要性](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html)

在学习容器依赖，我一直忽视了两个很重要的点：

1. 容器可以同时存储不同类型的数据，例如 String 类型，Integer 类型，如果一个容器存储了不同类型的对象，不就乱套了

   ```java
   ArrayList list = new ArrayList();
   list.add("abc");
   list.add(new Integer(19));
   Iterator it = list.iterator();
   while(it.hasNext()){
       System.out.println(it.next() + "");
   }
   /*
   abc
   19
   */
   ```

2. 在定义容器变量的时候，并没有定义该容器存储的对象类型，这不对劲

   在 C 语言中，我们定义结构体数组的时候，都会指定数组存储的对象类型，Java 的容器虽然不同于数组，但是其在定义容器的时候，不定义容器存储的数据类型，就感觉不对劲。

   泛型相当于是定义了容器的存储类型

Generics 的具体介绍，参考 [Detailed-Generics](detailed-generics.md)

```java
public class Tool<QQ>{ // 泛型类，类中操作的引用数据类型不确定的时候，就使用泛型来表示。 
    private QQ q;
    public QQ getObject() {
        return q;
    }
    public void setObject(QQ object) {
        this.q = object;
    }
    /**
    * 将泛型定义在方法上。
    * @param str
    */
    public <W> void show(W str){
        System.out.println("show : "+str.toString());
    }
    public void print(QQ str){
        System.out.println("print : "+str);
    }
    /**
    * 当方法静态时，不能访问类上定义的泛型。如果静态方法使用泛型，
    * 只能将泛型定义在方法上。
    * @param obj
    */
    public static <Y> void method(Y obj){
        System.out.println("method:"+obj);
    }
}
```

**<? super E> <? extend E>**

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import cn.itcast.p2.bean.Person;
import cn.itcast.p2.bean.Student;
import cn.itcast.p2.bean.Worker;
public class GenericAdvanceDemo2 {
    /**
    * @param args
    */
    public static void main(String[] args) {
        ArrayList<Person> al = new ArrayList<Person>();
        al.add(new Person("abc",30));
        al.add(new Person("abc4",34));
        ArrayList<Student> al2 = new ArrayList<Student>();
        al2.add(new Student("stu1",11));
        al2.add(new Student("stu2",22));
        ArrayList<String> al3 = new ArrayList<String>();
        al3.add("stu3331");
        al3.add("stu33332");
        printCollection(al2);
        printCollection(al);
    }
    /**
    * 迭代并打印集合中元素。
    *
    * 可以对类型进行限定：
    * ? extends E:接收E类型或者E的子类型对象。上限！
    *
    * ? super E ：接收E类型或者E的父类型。下限！
    * @param al
    */
        /*public static void printCollection(Collection<? extends Person> al)
    {//Collection<Dog> al = new ArrayList<Dog>()
    Iterator<? extends Person> it = al.iterator();
    while(it.hasNext()){
    // T str = it.next();
    // System.out.println(str);
    // System.out.println(it.next().toString());
    Person p = it.next();
    System.out.println(p.getName()+":"+p.getAge());
    }
    }*/
    public static void printCollection(Collection<? super Student> al){
        Iterator<? super Student> it = al.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
}



/*
* class TreeSet<Worker>
* {
* Tree(Comparator<? super Worker> comp);
* }
*
* 什么时候用下限呢？通常对集合中的元素进行取出操作时，可以是用下限。
*
*/
class CompByName implements Comparator<Person>{
    @Override
    public int compare(Person o1, Person o2) {
        int temp = o1.getName().compareTo(o2.getName());
        return temp==0? o1.getAge()-o2.getAge():temp;
    }
}
class CompByStuName implements Comparator<Student>{
    @Override
    public int compare(Student o1, Student o2) {
        int temp = o1.getName().compareTo(o2.getName());
            return temp==0? o1.getAge()-o2.getAge():temp;
    }
}
class CompByWorkerName implements Comparator<Worker>{
    @Override
    public int compare(Worker o1, Worker o2) {
        int temp = o1.getName().compareTo(o2.getName());
        return temp==0? o1.getAge()-o2.getAge():temp;
    }
}
```

存储用上限：

```java
package cn.itcast.p5.generic.advance.demo;
import java.util.ArrayList;
import cn.itcast.p2.bean.Person;
import cn.itcast.p2.bean.Student;
import cn.itcast.p2.bean.Worker;
public class GenericAdvanceDemo3 {
    public static void main(String[] args) {
        ArrayList<Person> al1 = new ArrayList<Person>();
        al1.add(new Person("abc", 30));
        al1.add(new Person("abc4", 34));
        ArrayList<Student> al2 = new ArrayList<Student>();
        al2.add(new Student("stu1", 11));
        al2.add(new Student("stu2", 22));
        ArrayList<Worker> al3 = new ArrayList<Worker>();
        al3.add(new Worker("stu1", 11));
        al3.add(new Worker("stu2", 22));
        ArrayList<String> al4 = new ArrayList<String>();
        al4.add("abcdeef");
        // al1.addAll(al4);//错误，类型不匹配。
        al1.addAll(al2);
        al1.addAll(al3);
        System.out.println(al1.size());
    }
}

/*
* 一般在存储元素的时候都是用上限，因为这样取出都是按照上限类型来运算的，不会出现类型安全隐患。
*/
class MyCollection<E> {
    public void add(E e) {
    }
    public void addAll(MyCollection<? extends E> e) {
    }
}
```

取出用下限：

```java
package cn.itcast.p5.generic.advance.demo;
import java.util.Comparator;
import java.util.Iterator;
import java.util.TreeSet;
import cn.itcast.p2.bean.Person;
import cn.itcast.p2.bean.Student;
import cn.itcast.p2.bean.Worker;
public class GenericAdvanceDemo4 {
    public static void main(String[] args) {
        TreeSet<Person> al1 = new TreeSet<Person>(new CompByName());
        al1.add(new Person("abc4",34));
        al1.add(new Person("abc1",30));
        al1.add(new Person("abc2",38));
        TreeSet<Student> al2 = new TreeSet<Student>(new CompByName());
        al2.add(new Student("stu1",11));
        al2.add(new Student("stu7",20));
        al2.add(new Student("stu2",22));
        TreeSet<Worker> al3 = new TreeSet<Worker>();
        al3.add(new Worker("stu1",11));
        al3.add(new Worker("stu2",22));
        TreeSet<String> al4 = new TreeSet<String>();
        al4.add("abcdeef");
        // al1.addAll(al4);//错误，类型不匹配。
        // al1.addAll(al2);
        // al1.addAll(al3);
        // System.out.println(al1.size());
        Iterator<Student> it = al2.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
}
```



#### 函数的可变参数

```java
public class ParamterDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        // int sum = add(4,5);
        // System.out.println("sum="+sum);
        // int sum1 = add(4,5,6);
        // System.out.println("sum1="+sum1);
        // int[] arr = {5,1,4,7,3};
        // int sum = add(arr);
        // System.out.println("sum="+sum);
        // int[] arr1 = {5,1,4,7,3,9,8,7,6};
        // int sum1 = add(arr1);
        // System.out.println("sum1="+sum1);
        int sum = newAdd(5,1,4,7,3);
        System.out.println("sum="+sum);
        int sum1 = newAdd(5,1,2,7,3,9,8,7,6);
        System.out.println("sum1="+sum1);
    }
    /*
    * 函数的可变参数。
    * 其实就是一个数组，但是接收的是数组的元素。
    * 自动将这些元素封装成数组。简化了调用者的书写。
    * 注意：可变参数类型，必须定义在参数列表的结尾。
    */
    public static int newAdd(int a,int... arr){
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum+=arr[i];
        }
        return sum;
        // System.out.println(arr);
        // return 0;
    }
    public static int add(int[] arr){
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum+=arr[i];
        }
        return sum;
    }
    public static int add(int a,int b){
        return a+b;
    }
    public static int add(int a,int b,int c){
        return a+b+c;
    }
}
```

#### 静态导入

```java
import java.util.ArrayList;
import java.util.List;
import static java.util.Collections.*;//静态导入，其实导入的是类中的静态成员。
//import static java.util.Collections.max;//静态导入，其实到入的是类中的静态成员。
import static java.lang.System.*;
public class StaticImportDemo {
    /**
* @param args
*/
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        list.add("abc3");
        list.add("abc7");
        list.add("abc1");
        out.println(list);
        sort(list);
        System.out.println(list);
        String max = max(list);
        System.out.println("max="+max);
    }
}
```

#### 日期类

Demo1

```java
package com.wansho.hellojava;

import java.util.Calendar;
public class CalendarDemo {
    public static void main(String[] args) {
        Calendar c = Calendar.getInstance();
        int year = 2012;
        showDays(year);
    }
    public static void showDays(int year) {
        Calendar c = Calendar.getInstance();
        c.set(year, 2, 1); // java Calendar 中的月数是从 0 开始计数，此处输入的时间是 3 月 1 日
        c.add(Calendar.DAY_OF_MONTH, -1);
        showDate(c);
    }
    public static void showDate(Calendar c) {
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH)+1;
        int day = c.get(Calendar.DAY_OF_MONTH);
        int week = c.get(Calendar.DAY_OF_WEEK);
        System.out.println(year+"年"+month+"月"+day+"日"+getWeek(week));
    }
    public static String getWeek(int i) {
        String[] weeks = {"","星期日","星期一","星期二","星期三","星期四","星期五","星期六"};
        return weeks[i];
    }
}

```

Demo2

```java
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateDemo {
    /**
    * @param args
    * @throws ParseException
    */
    public static void main(String[] args) throws ParseException {
        methodDemo_3();
    }
    /**
    * 将日期格式的字符串-->日期对象。
    * 使用的是 DateFormat 类中的 parse() 方法。
    *
    * @throws ParseException
    */
    public static void methodDemo_3() throws ParseException {
        String str_date = "2012年4月19日";
        str_date = "2011---8---17";
        DateFormat dateFormat = DateFormat.getDateInstance(DateFormat.LONG);
        dateFormat = new SimpleDateFormat("yyyy---MM---dd");
        Date date = dateFormat.parse(str_date);
        System.out.println(date);
    }
    /**
    * 对日期对象进行格式化。
    * 将日期对象-->日期格式的字符串。
    * 使用的是DateFormat类中的format方法。
    *
    */
    public static void methodDemo_2() {
        Date date = new Date();
        //获取日期格式对象。具体着默认的风格。 FULL LONG等可以指定风格。
        DateFormat dateFormat = DateFormat.getDateInstance(DateFormat.LONG);
        dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG,DateFormat.LONG);
        // System.out.println(dateFormat);
        //如果风格是自定义的如何解决呢？
        dateFormat = new SimpleDateFormat("yyyy--MM--dd");
        String str_date = dateFormat.format(date);
        System.out.println(str_date);
    }
    /**
    * 日期对象和毫秒值之间的转换。
    *
    * 毫秒值-->日期对象 ：
    * 1，通过Date对象的构造方法 new Date(timeMillis);
    * 2，还可以通过setTime设置。
    * 因为可以通过Date对象的方法对该日期中的各个字段(年月日等)进行操作。
    *
    * 日期对象-->毫秒值：
    * 2， getTime方法。
    * 因为可以通过具体的数值进行运算。
    */
    public static void methodDemo_1() {
        long time = System.currentTimeMillis();//
        // System.out.println(time);//1335671230671
        Date date = new Date();//将当前日期和时间封装成Date对象。
        System.out.println(date);//Sun Apr 29 11:48:02 CST 2012
        Date date2 = new Date(1335664696656l);//将指定毫秒值封装成Date对象。
        System.out.println(date2);
    }
}
```

Demo3

```java
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
/* 练习：
* "2012-3-17"到"2012-4-6"
* 中间有多少天？
* 思路：
* 两个日期相减就哦了。
* 咋减呢？
* 必须要有两个可以进行减法运算的数。
* 能减可以是毫秒值。如何获取毫秒值？通过date对象。
* 如何获取date对象呢？可以将字符串转成date对象。
*
* 1,将日期格式的字符串转成Date对象。
* 2,将Date对象转成毫秒值。
* 3，相减，在变成天数
*
*/
public class DateTest {
    /**
    * @param args
    * @throws ParseException
    */
    public static void main(String[] args) throws ParseException {
        String str_date1 = "2012-3-17";
        String str_date2 = "2012-4-18";
        test(str_date1,str_date2);
    }
    public static void test(String str_date1,String str_date2) throws ParseException
    {
        //1,将日期字符串转成日期对象。
        //定义日期格式对象。
        DateFormat dateFormat = DateFormat.getDateInstance();
        dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = dateFormat.parse(str_date1);
        Date date2 = dateFormat.parse(str_date2);
        long time1 = date1.getTime();
        long time2 = date2.getTime();
        long time = Math.abs(time1-time2);
        int day = getDay(time);
        System.out.println(day);
    }
    private static int getDay(long time) {
        int day = (int)(time/1000/60/60/24);
        return day;
    }
}
```



#### Math类 

```java
import java.util.Random;
public class MathDemo {
    public static void main(String[] args) {
        /*
        * Math:提供了操作数学运算的方法， 都是静态的。
        * 常用的方法：
        * ceil():返回大于参数的最小整数。 向上取整
        * floor():返回小于参数的最大整数。向下取整
        * round():返回四舍五入的整数。   四舍五入
        * pow(a,b):a的b次方。
        */
        double d1 = Math.ceil(12.56);
        double d2 = Math.floor(12.56);
        double d3 = Math.round(12.46);
        // sop("d1="+d1);
        // sop("d2="+d2);
        // sop("d3="+d3);
        // double d = Math.pow(10, 2);
        // sop("d="+d);
        Random r = new Random();
        for (int i = 0; i < 10; i++) {
            // double d = Math.ceil(Math.random()*10);
            // double d = (int)(Math.random()*6+1);
            // double d = (int)(r.nextDouble()*6+1);
            int d = r.nextInt(6)+1;
            System.out.println(d);
        }
    }
    public static void sop(String string) {
        System.out.println(string);
    }
}
```

#### Runtime 类

Every Java application has a single instance of class `Runtime` that allows the application to interface with the environment in which the application is running. The current runtime can be obtained from the `getRuntime` method.

An application cannot create its own instance of this class.

```java
import java.io.IOException;
public class RuntimeDemo {
    /**
    * @param args
    * @throws IOException
    * @throws InterruptedException
    */
    public static void main(String[] args) throws IOException, InterruptedException
    {
        /*
        * Runtime:没有构造方法摘要，说明该类不可以创建对象。
        * 又发现还有非静态的方法。说明该类应该提供静态的返回该类对象的方法。
        * 而且只有一个，说明Runtime类使用了单例设计模式。
        *
        */
        Runtime r = Runtime.getRuntime();
        // execute: 执行。 xxx.exe
        Process p = r.exec("notepad.exe");
        Thread.sleep(5000);
        p.destroy();
    }
}
```

#### System 类

java.lang.System

Among the facilities provided by the `System` class are standard input, standard output, and error output streams; access to externally defined properties and environment variables; a means of loading files and libraries; and a utility method for quickly copying a portion of an array.

```java
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.Set;
public class SystemDemo {
    private static final String LINE_SEPARATOR = System.getProperty("line.separator");
    /**
    * @param args
    */
    public static void main(String[] args) {
        /*
        * System: 类中的方法和属性都是静态的。
        * 常见方法：
        * long currentTimeMillis();获取当前时间的毫秒值。
        */
        // long l1 = 1335664696656l;//System.currentTimeMillis();
        // System.out.println(l1/1000/60/60/24);//1335664696656
        // code..
        // long l2 = System.currentTimeMillis();
        // System.out.println(l2-l1);
        System.out.println("hello-"+LINE_SEPARATOR+" world");
        // demo_1();
        //给系统设置一些属性信息。这些信息是全局，其他程序都可以使用。
        // System.setProperty("myclasspath", "c:\myclass");
    }
    public static void demo_1(){
        //获取系统的属性信息，并存储到了Properties集合中。
        /*
        * properties集合中存储都是String类型的键和值。
        * 最好使用它自己的存储和取出的方法来完成元素的操作。
        */
        Properties prop = System.getProperties();
        Set<String> nameSet = prop.stringPropertyNames();
        for(String name : nameSet){
            String value = prop.getProperty(name);
            System.out.println(name+"::"+value);
        }
    }
}
```



### 总结

```
Collection
	List
		ArrayList
		LinkedList
		Stack
		Vector
	Set
		HashSet
			LinkedHashSet (存储顺序不变)
		TreeSet
	Map
		HashMap
			LinkedHashMap (存储顺序不变)
		HashTable
		TreeMap
	Queue
	Deque
	SortedSet
```

```
泛型：
	jdk1.5出现的安全机制。
	
	好处：
        1，将运行时期的问题 ClassCastException 转到了编译时期。
        2，避免了强制转换的麻烦。
    <>:什么时候用？
    	当操作的引用数据类型不确定的时候。就使用<>。将要操作的引用数据类型传入即可.
		其实<>就是一个用于接收具体引用数据类型的参数范围。在程序中，只要用到了带有<>的类或者接口，就要明确传入的具体引用数据类型 。
	
	泛型技术是给编译器使用的技术, 用于编译时期。确保了类型的安全。
	运行时，会将泛型去掉，生成的class文件中是不带泛型的,这个称为泛型的擦除。
	为什么擦除呢？因为为了兼容运行的类加载器。
	
	泛型的补偿：在运行时，通过获取元素的类型进行转换动作。不用使用者在强制转换了。

	泛型的通配符： ? 未知类型。

	泛型的限定：
		? extends E: 接收E类型或者E的子类型对象。上限
			一般存储对象的时候用。比如 添加元素 addAll.
		? super E: 接收E类型或者E的父类型对象。 下限。
			一般取出对象的时候用。比如比较器。
--------------------------------------------------------------------------------
集合的一些技巧：

需要唯一吗？
	需要： Set
		需要制定顺序：
			需要： TreeSet
			不需要： HashSet
			但是想要一个和存储一致的顺序(有序):LinkedHashSet
	不需要： List
		需要频繁增删吗？
			需要： LinkedList
			不需要： ArrayList
			
如何记录每一个容器的结构和所属体系呢？看名字！
List
|--ArrayList
|--LinkedList
Set
|--HashSet
|--TreeSet
后缀名就是该集合所属的体系。
前缀名就是该集合的数据结构。
看到array：就要想到数组，就要想到查询快，有角标.
看到link：就要想到链表，就要想到增删快，就要想要 add get remove+frist last的方法
看到hash:就要想到哈希表，就要想到唯一性，就要想到元素需要覆盖hashcode方法和equals方法。
看到tree：就要想到二叉树，就要想要排序，就要想到两个接口Comparable， Comparator 。
而且通常这些常用的集合容器都是不同步的。
--------------------------------------------------------------------------------
Map：一次添加一对元素。 Collection 一次添加一个元素。
Map也称为双列集合， Collection集合称为单列集合。
其实map集合中存储的就是键值对。map集合中必须保证键的唯一性。

常用方法：
    1，添加。
        value put(key,value):返回前一个和key关联的值，如果没有返回null.
        2，删除。186
        void clear():清空map集合。
        value remove(key):根据指定的key翻出这个键值对。
    3，判断。
        boolean containsKey(key):
        boolean containsValue(value):
        boolean isEmpty();
    4，获取。
        value get(key):通过键获取值，如果没有该键返回null.当然可以通过返回null，来判断是否包含指定键。
        int size(): 获取键值对的个数。
        
Map常用的子类：
|--Hashtable :内部结构是哈希表，是同步的。不允许null作为键， null作为值。
|--Properties：用来存储键值对型的配置文件的信息，可以和IO技术相结合。
|--HashMap : 内部结构是哈希表，不是同步的。允许null作为键， null作为值。
|--TreeMap : 内部结构是二叉树，不是同步的。可以对Map集合中的键进行排序。
```

**集合遍历总结**

```java
//遍历List方法1，使用普通for循环：
for (int i = 0; i < list.size(); i++) {
    String temp=(String)list.get(i);
    System.out.println(temp);
    //list.remove(i);//遍历删除元素，不过不推荐这种方式！
}
//遍历List方法2，使用增强for循环（应该使用泛型定义类型！）：
for(String temp:list){
    System.out.println(temp);
}
//遍历List方法3，使用Iterator迭代器：
for(Iterator iter=list.iterator();iter.hasNext();){
    String temp=(String)iter.next();
    System.out.println(temp);
}

Iterator iter=c.iterator();
while(iter.hasNext()){
    Object obj=iter.next();
    iter.remove();//如果要遍历删除集合中的元素，建议使用这种方式！
    System.out.println(obj);
}
//遍历Set方法1，使用增强for循环：
for(String temp:set){
    System.out.println(temp);
}
//遍历Set方法2，使用Iterator迭代器：
for(Iterator iter=list.iterator();iter.hasNext();){
    String temp=(String)iter.next();
    System.out.println(temp);
}
//遍历Map
Map<Integer, Man> maps=new HashMap<Integer, Man>();
Set<Integer> keySet=maps.keySet();
for(Integer id:keySet){
    System.out.println(maps.get(id).name);
}
```

## I/O 流

### 是什么

I，Input：将外存中的数据读取到内存中

O，Output：将内存中的数据写入到外存中

### 字符流，字节流

一个字符由多个字节组成！

IO 流分为字符流和字节流：

* 字符流：字节流读取文字字节数据后，不直接操作而是先查指定的编码表。获取对应的文字。在对这个文字进行操作。简单说：**字节流+编码表**

  顶层父类：Reader, Writer

* 字节流：顾名思义，计算机中的字节，8 位为一字节

  顶层父类：InputStream, OutputStream

这些体系的子类都以父类名作为后缀。而且子类名的前缀就是该对象的功能。  

### 转换流

FileReader 和 FileWriter 是转换流的子类！

Demo 将键盘的输入转换成大写，并输出到控制台：

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
public class TransStreamDemo {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        //字节流。键盘的输入，是字节流……
        InputStream in = System.in;
        // int ch = in.read();
        // System.out.println(ch);
        // int ch1 = in.read();
        // System.out.println(ch1);
        //将字节转成字符的桥梁。装换流。
        InputStreamReader isr = new InputStreamReader(in);
        // int ch = isr.read();
        // System.out.println((char)ch);
        //字符流。
        BufferedReader bufr = new BufferedReader(isr);
        OutputStream out = System.out;
        OutputStreamWriter osw = new OutputStreamWriter(out);
        BufferedWriter bufw = new BufferedWriter(osw);
        String line = null;
        while((line=bufr.readLine())!=null){
            if("over".equals(line))
                break;
            // System.out.println(line.toUpperCase());
            // osw.write(line.toUpperCase()+"\r\n");
            // osw.flush();
            bufw.write(line.toUpperCase());
            bufw.newLine();
            bufw.flush();
        }
    }
}
```

功能相同的两行代码：

```java
/*
* 这两句代码的功能是等同的。
* FileWriter：其实就是转换流指定了本机默认码表的体现。而且这个转换流的子类对象，可以方
* 便操作文本文件。
* 简单说：操作文件的字节流+本机默认的编码表。
* 这是按照默认码表来操作文件的便捷类。
*
* 如果操作文本文件需要明确具体的编码。 FileWriter就不行了。必须用转换流。
*/
OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("gbk_3.txt"), "GBK");
FileWriter fw = new FileWriter("gbk_1.txt");
```

### File, 过滤器

**File**

```java
import java.io.File;
public class FileDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        // constructorDemo();
    }
    public static void constructorDemo() {
        //可以将一个已存在的，或者不存在的文件或者目录封装成file对象。
        File f1 = new File("c:\\a.txt");
        File f2 = new File("c:\\","a.txt");
        File f = new File("c:\\");
        File f3 = new File(f,"a.txt");
        File f4 = new File("c:"+File.separator+"abc"+File.separator+"a.txt");
        System.out.println(f4); // 在 Windows 上执行打印的是：c:\abc\a.txt
    }
}
```



```java
import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;
public class FileMethodDemo {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        /*
        * File对象的常见方法。
        *
        * 1，获取。
        * 1.1 获取文件名称。
        * 1.2 获取文件路径。
        * 1.3 获取文件大小。
        * 1.4 获取文件修改时间。
        *
        * 2，创建与删除。
        *
        * 3，判断。
        *
        * 4， 重命名
        *
        */
        // getDemo();
        // createAndDeleteDemo();
        // isDemo();
        // renameToDemo();
        // listRootsDemo();
    }
    public static void listRootsDemo() {
        File file = new File("d:\\");
        System.out.println("getFreeSpace:"+file.getFreeSpace());
        System.out.println("getTotalSpace:"+file.getTotalSpace());
        System.out.println("getUsableSpace:"+file.getUsableSpace());
        // File[] files = File.listRoots();
        // for(File file : files){
        // System.out.println(file);
        // }
    }
    public static void renameToDemo() { // 移动文件
        File f1 = new File("c:\\9.mp3");
        File f2 = new File("d:\\aa.mp3");
        boolean b = f1.renameTo(f2);
        System.out.println("b="+b);
    }
    public static void isDemo() throws IOException{
        File f = new File("aaa");
        // f.mkdir();
        f.createNewFile();
        // boolean b = f.exists();
        // System.out.println("b="+b);
        // 最好先判断是否存在。
        System.out.println(f.isFile());
        System.out.println(f.isDirectory());
    }
    public static void createAndDeleteDemo() throws IOException {
        File dir = new File("abc\\q\\e\\c\\z\\r\\w\\y\\f\\e\\g\\s");
        // boolean b = dir.mkdir();//make directory
        // System.out.println("b="+b);
        // dir.mkdirs();//创建多级目录
        System.out.println(dir.delete());
        // System.out.println(dir.delete());
        // 文件的创建和删除。
        // File file = new File("file.txt");
        /*
        * 和输出流不一样，如果文件不存在，则创建，如果文件存在，则不创建。
        *
        */
        // boolean b = file.createNewFile();
        // System.out.println("b="+b);
        // boolean b = file.delete();
        // System.out.println("b="+b);
    }
    public static void getDemo(){
        // File file = new File("E:\\java0331\\day22e\\a.txt");
        File file = new File("a.txt");
        String name = file.getName();
        String absPath = file.getAbsolutePath();//绝对路径。
        String path = file.getPath();
        long len = file.length();
        long time = file.lastModified();
        Date date = new Date(time);
        DateFormat dateFormat =
            DateFormat.getDateTimeInstance(DateFormat.LONG,DateFormat.LONG);
        String str_time = dateFormat.format(date);
        System.out.println("parent:"+file.getParent());226
            System.out.println("name:"+name);
        System.out.println("absPath:"+absPath);
        System.out.println("path:"+path);
        System.out.println("len:"+len);
        System.out.println("time:"+time);
        System.out.println("str_time:"+str_time);
    }
}

```



**三种常见过滤器**

1. 后缀名过滤器

   ```java
   public class FilterByJava implements FilenameFilter {
       @Override
       public boolean accept(File dir, String name) {
           // System.out.println(dir+"---"+name);
           return name.endsWith(".java");
       }
   }
   ```

2. 根据后缀名可以指定任意后缀名过滤的过滤器  

   ```java
   import java.io.File;
   import java.io.FilenameFilter;
   public class SuffixFilter implements FilenameFilter {
       private String suffix ;
       public SuffixFilter(String suffix) {
           super();
           this.suffix = suffix;
       }
       @Override
       public boolean accept(File dir, String name) {
           return name.endsWith(suffix);
       }
   }
   ```

3. 隐藏属性过滤器  

   ```java
   import java.io.File;
   import java.io.FileFilter;
   public class FilterByHidden implements FileFilter {
       @Override
       public boolean accept(File pathname) {
           return !pathname.isHidden();
       }
   }
   ```

Demo：

```java
import java.io.File;
import cn.itcast.io.p2.filter.FilterByHidden;
import cn.itcast.io.p2.filter.SuffixFilter;
public class FileListDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        listDemo_2();
    }
    public static void listDemo_3() {
        File dir = new File("c:\\");
        File[] files = dir.listFiles(new FilterByHidden());
        for(File file : files){
            System.out.println(file);
        }
    }
    public static void listDemo_2() {
        File dir = new File("c:\\");
        String[] names = dir.list(new SuffixFilter(".txt"));
        for(String name : names){
            System.out.println(name);
        }
    }
}
```

### IO流操作规律

想要知道开发时用到哪些对象。只要通过四个明确即可。

1. 明确源和目的(汇)
   源： InputStream Reader
   目的： OutputStream Writer

2. 明确数据是否是纯文本数据。
   源：是纯文本： Reader
   否： InputStream
   目的：是纯文本 Writer
   否： OutputStream
   到这里，就可以明确需求中具体要使用哪个体系。

3. 明确具体的设备。
   源设备：

   硬盘： File
   键盘： System.in
   内存：数组
   网络： Socket流

   目的设备：

   硬盘： File
   控制台： System.out
   内存：数组
   网络： Socket流

4. 是否需要其他额外功能。
   1，是否需要高效(缓冲区);
   是，就加上buffer.
   2，转换？

举例：

```
--------------------------------------------------------------------------------
需求1：复制一个文本文件。
1,明确源和目的。
源： InputStream Reader
目的： OutputStream Writer
2,是否是纯文本？
是！
源： Reader
目的： Writer
3,明确具体设备。
源：
硬盘： File
目的：
硬盘： File
FileReader fr = new FileReader("a.txt");
FileWriter fw = new FileWriter("b.txt");
4,需要额外功能吗？
需要，需要高效。
BufferedReader bufr = new BufferedReader(new FileReader("a.txt"));
BufferedWriter bufw = new BufferedWriter(new FileWriter("b.txt"));
--------------------------------------------------------------------------------
需求2：读取键盘录入信息，并写入到一个文件中。
1,明确源和目的。
源： InputStream Reader
目的： OutputStream Writer
2，是否是纯文本呢？
是，
源： Reader
目的： Writer
3，明确设备
源：
键盘。 System.in
目的：
硬盘。 File
InputStream in = System.in;
FileWriter fw = new FileWriter("b.txt");
这样做可以完成，但是麻烦。将读取的字节数据转成字符串。再由字符流操作。
4，需要额外功能吗？
需要。转换。 将字节流转成字符流。因为名确的源是Reader，这样操作文本数据做便捷。
所以要将已有的字节流转成字符流。使用字节-->字符 。 InputStreamReader
InputStreamReader isr = new InputStreamReader(System.in);
FileWriter fw = new FileWriter("b.txt");
还需要功能吗？
需要：想高效。
BufferedReader bufr = new BufferedReader(new InputStreamReader(System.in));
BufferedWriter bufw = new BufferedWriter(new FileWriter("b.txt"));
-------------------------------------------------------------------------------
需求3：将一个文本文件数据显示在控制台上。
1,明确源和目的。
源： InputStream Reader
目的： OutputStream Writer
2，是否是纯文本呢？
是，
源： Reader
目的： Writer
3，明确具体设备
源：
硬盘： File
目的：
控制台： System.out
FileReader fr = new FileReader("a.txt");
OutputStream out = System.out;//PrintStream
4，需要额外功能吗？
需要，转换。
FileReader fr = new FileReader("a.txt");
OutputStreamWriter osw = new OutputStreamWriter(System.out);
需要，高效。
BufferedReader bufr = new BufferedReader(new FileReader("a.txt"));
BufferedWriter bufw = new BufferedWriter(new OutputStreamWriter(System.out));
--------------------------------------------------------------------------------
需求4：读取键盘录入数据，显示在控制台上。
1,明确源和目的。
源： InputStream Reader
目的： OutputStream Writer
2，是否是纯文本呢？
是，
源： Reader
目的： Writer
3，明确设备。
源：
键盘： System.in
目的：
控制台： System.out
InputStream in = System.in;
OutputStream out = System.out;
4，明确额外功能？
需要转换，因为都是字节流，但是操作的却是文本数据。
所以使用字符流操作起来更为便捷。
InputStreamReader isr = new InputStreamReader(System.in);
OutputStreamWriter osw = new OutputStreamWriter(System.out);
为了将其高效。
BufferedReader bufr = new BufferedReader(new InputStreamReader(System.in));
BufferedWriter bufw = new BufferedWriter(new OutputStreamWriter(System.out));
--------------------------------------------------------------------------------
5，将一个中文字符串数据按照指定的编码表写入到一个文本文件中.
1，目的。 OutputStream， Writer
2，是纯文本， Writer。
3，设备：硬盘File
FileWriter fw = new FileWriter("a.txt");
fw.write("你好");
注意：既然需求中已经明确了指定编码表的动作。
那就不可以使用FileWriter，因为FileWriter内部是使用默认的本地码表。
只能使用其父类。 OutputStreamWriter.
OutputStreamWriter 接 收 一 个 字 节 输 出 流 对 象 ， 既 然 是 操 作 文 件 ， 那 么 该 对 象 应 该 是
FileOutputStream
OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("a.txt"),charsetName);
需要高效吗？
BufferedWriter bufw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("a.txt"),charsetName));
什么时候使用转换流呢？
1，源或者目的对应的设备是字节流，但是操作的却是文本数据，可以使用转换作为桥梁。
提高对文本操作的便捷。
2，一旦操作文本涉及到具体的指定编码表时，必须使用转换流
```

### 其他

#### Properties 集合+IO流  

Properties = map + io

\* Properties集合：
\* 特点：
\* 1，该集合中的键和值都是字符串类型。
\* 2，集合中的数据可以保存到流中，或者从流获取。
*
\* 通常该集合用于操作以键值对形式存在的配置文件。  

Demo：

```java
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Properties;
import java.util.Set;
public class PropertiesDemo {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        /*
        * Map
        * |--Hashtable
        * |--Properties:
        *
        * Properties集合：
        * 特点：
        * 1，该集合中的键和值都是字符串类型。
        * 2，集合中的数据可以保存到流中，或者从流获取。
        *
        * 通常该集合用于操作以键值对形式存在的配置文件。
        */
        // methodDemo_4();
        // myLoad();
        test();
    }
    //对已有的配置文件中的信息进行修改。
    /*
    * 读取这个文件。
    * 并将这个文件中的键值数据存储到集合中。
    * 在通过集合对数据进行修改。
    * 在通过流将修改后的数据存储到文件中。
    */
    public static void test() throws IOException{
        //读取这个文件。
        File file = new File("info.txt");
        if(!file.exists()){
            file.createNewFile();
        }
        FileReader fr = new FileReader(file);
        //创建集合存储配置信息。
        Properties prop = new Properties();
        //将流中信息存储到集合中。
        prop.load(fr);
        prop.setProperty("wangwu", "16");
        FileWriter fw = new FileWriter(file);
        prop.store(fw,"");
        // prop.list(System.out);
        fw.close();
        fr.close();
    }
    //模拟一下load方法。
    public static void myLoad() throws IOException{
        Properties prop = new Properties();
        BufferedReader bufr = new BufferedReader(new FileReader("info.txt"));
        String line = null;
        while((line=bufr.readLine())!=null){
            if(line.startsWith("#"))
                continue;
            String[] arr = line.split("=");
                // System.out.println(arr[0]+"::"+arr[1]);
                prop.setProperty(arr[0], arr[1]);
        }
        prop.list(System.out);
        bufr.close();
    }
    public static void methodDemo_4() throws IOException {
        Properties prop = new Properties();
        //集合中的数据来自于一个文件。
        //注意；必须要保证该文件中的数据是键值对。
        //需要使用到读取流。
        FileInputStream fis = new FileInputStream("info.txt");
        //使用load方法。
        prop.load(fis);
        prop.list(System.out);
    }
    public static void methodDemo_3() throws IOException {
        Properties prop = new Properties();
        //存储元素。
        prop.setProperty("zhangsan","30");
        prop.setProperty("lisi","31");
        prop.setProperty("wangwu","36");
        prop.setProperty("zhaoliu","20");
        //想要将这些集合中的字符串键值信息持久化存储到文件中。
        //需要关联输出流。
        FileOutputStream fos = new FileOutputStream("info.txt");
        //将集合中数据存储到文件中，使用store方法。
        prop.store(fos, "info");
        fos.close();
    }
        /**
        * 演示Properties集合和流对象相结合的功能。
        */
        public static void methodDemo_2(){
        Properties prop = new Properties();
        //存储元素。
        // prop.setProperty("zhangsan","30");
        // prop.setProperty("lisi","31");
        // prop.setProperty("wangwu","36");
        // prop.setProperty("zhaoliu","20");
        prop = System.getProperties();
        prop.list(System.out);
    }
    /*
    * Properties集合的存和取。
    */
    public static void propertiesDemo(){
        //创建一个Properties集合。
        Properties prop = new Properties();
        //存储元素。
        prop.setProperty("zhangsan","30");
        prop.setProperty("lisi","31");
        prop.setProperty("wangwu","36");
        prop.setProperty("zhaoliu","20");
        //修改元素。
        prop.setProperty("wangwu","26");
        //取出所有元素。
        Set<String> names = prop.stringPropertyNames();
        for(String name : names){
            String value = prop.getProperty(name);
            System.out.println(name+":"+value);
        }
    }
}
```

Demo 用Properties定义一个程序运行次数的程序：

```java
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;
/*
* 定义功能，获取一个应用程序运行的次数，如果超过5次，给出使用次数已到请注册的提示。并不要在运行
程序。
*
* 思路：
* 1，应该有计数器。
* 每次程序启动都需要计数一次,并且是在原有的次数上进行计数。
* 2，计数器就是一个变量。 突然冒出一想法，程序启动时候进行计数，计数器必须存在于内存并进行运算。
* 可是程序一结束，计数器消失了。那么再次启动该程序，计数器又重新被初始化了。
* 而我们需要多次启动同一个应用程序，使用的是同一个计数器。
* 这就需要计数器的生命周期变长，从内存存储到硬盘文件中。
*
* 3,如何使用这个计数器呢？
* 首先，程序启动时，应该先读取这个用于记录计数器信息的配置文件。
* 获取上一次计数器次数。 并进行试用次数的判断。
* 其次，对该次数进行自增，并自增后的次数重新存储到配置文件中。
*
*
* 4，文件中的信息该如何进行存储并体现。
* 直接存储次数值可以，但是不明确该数据的含义。 所以起名字就变得很重要。
* 这就有了名字和值的对应，所以可以使用键值对。
* 可是映射关系map集合搞定，又需要读取硬盘上的数据，所以 map+io = Properties.
*/
public class PropertiesTest {
    /**
* @param args
* @throws IOException
* @throws Exception
*/
    public static void main(String[] args) throws IOException {
        getAppCount();
    }
    public static void getAppCount() throws IOException{
        //将配置文件封装成File对象。
        File confile = new File("count.properties");
        if(!confile.exists()){
            confile.createNewFile();
        }
        FileInputStream fis = new FileInputStream(confile);
        Properties prop = new Properties();
        prop.load(fis);
        //从集合中通过键获取次数。
        String value = prop.getProperty("time");
        //定义计数器。记录获取到的次数。
        int count =0;
        if(value!=null){
            count = Integer.parseInt(value);
            if(count>=5){
                // System.out.println("使用次数已到，请注册，给钱！ ");
                // return;
                throw new RuntimeException("使用次数已到，请注册，给钱！ ");
            }
        }
        count++;
        //将改变后的次数重新存储到集合中。
        prop.setProperty("time", count+"");
        FileOutputStream fos = new FileOutputStream(confile);
        prop.store(fos, "");
        fos.close();
        fis.close();
    }
}
```

Demo 建立一个指定扩展名文件的列表：

```java
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
/*
* 获取指定目录下，指定扩展名的文件(包含子目录中的)
* 这些文件的绝对路径写入到一个文本文件中。
*
* 简单说，就是建立一个指定扩展名的文件的列表。
*
* 思路：
* 1，必须进行深度遍历。
* 2，要在遍历的过程中进行过滤。将符合条件的内容都存储到容器中。
* 3，对容器中的内容进行遍历并将绝对路径写入到文件中。
*/
public class Test {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        File dir = new File("e:\\java0331");
        FilenameFilter filter = new FilenameFilter(){
            @Override
            public boolean accept(File dir, String name) {
                return name.endsWith(".java");
            }
        };
        List<File> list = new ArrayList<File>();
        getFiles(dir,filter,list);
        File destFile = new File(dir,"javalist.txt");
        write2File(list,destFile);
    }
    /**
    * 对指定目录中的内容进行深度遍历，并按照指定过滤器，进行过滤，
    * 将过滤后的内容存储到指定容器List中。
    * @param dir
    * @param filter
    * @param list
    */
    public static void getFiles(File dir,FilenameFilter filter,List<File> list){
        File[] files = dir.listFiles();
        for(File file : files){
            if(file.isDirectory()){
                //递归啦！
                getFiles(file,filter,list);
            }else{
                //对遍历到的文件进行过滤器的过滤。将符合条件File对象，存储到List集合中。
                if(filter.accept(dir, file.getName())){
                    list.add(file);
                }
            }
        }
    }
    public static void write2File(List<File> list,File destFile)throws IOException{
        BufferedWriter bufw = null;
        try {
            bufw = new BufferedWriter(new FileWriter(destFile));
            for(File file : list){
                bufw.write(file.getAbsolutePath());
                bufw.newLine();
                bufw.flush();
            }
        } /*catch(IOException e){
        throw new RuntimeException("写入失败");
        }*/finally{
            if(bufw!=null)
                try {
                    bufw.close();
                } catch (IOException e) {
                    throw new RuntimeException("关闭失败");
                }
        }
    }
}
```

#### 打印流 

PrintStream  PrintWriter

```java
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintStream;
public class PrintStreamDemo {
    /**
     * @param args
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        /*
         * PrintStream:
         * 1, 提供了打印方法可以对多种数据类型值进行打印。并保持数据的表示形式。
         * 2，它不抛IOException.
         *
         * 构造函数，接收三种类型的值：
         * 1，字符串路径。
         * 2，File 对象。
         * 3，字节输出流。
         */
        PrintStream out = new PrintStream("print.txt");
        // int by = read();
        // write(by);
        out.write(610); // 只写最低8位，
        out.print(97); // 将97先变成字符保持原样将数据打印到目的地。
        out.close();
    }
}
```

```java
import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
public class PrintWriterDemo {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        /*
        * PrintWriter：字符打印流。
        * 构造函数参数：
        * 1，字符串路径。
        * 2， File对象。
        * 3，字节输出流。
        * 4，字符输出流。
        *
        */
        BufferedReader bufr = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(new FileWriter("out.txt"),true);
        String line = null;
        while((line=bufr.readLine())!=null){
            if("over".equals(line))
                break;
            out.println(line.toUpperCase());
            // out.flush();
        }
        out.close();
        bufr.close();
    }
}
```

#### SequenceInputStream, Enumeration

SequenceInputStream 接收一个枚举类型的对象

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.SequenceInputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.Iterator;
public class SequenceInputStreamDemo {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
    /*
    * 需求：将1.txt 2.txt 3.txt文件中的数据合并到一个文件中。
    */
    // Vector<FileInputStream> v = new Vector<FileInputStream>();
    // v.add(new FileInputStream("1.txt"));
    // v.add(new FileInputStream("2.txt"));
    // v.add(new FileInputStream("3.txt"));
    // Enumeration<FileInputStream> en = v.elements();
    ArrayList<FileInputStream> al = new ArrayList<FileInputStream>();
    for(int x=1; x<=3; x++){
        al.add(new FileInputStream(x+".txt"));
    }
    Enumeration<FileInputStream> en = Collections.enumeration(al);
    /*
    final Iterator<FileInputStream> it = al.iterator();
    Enumeration<FileInputStream> en = new Enumeration<FileInputStream>(){
    @Override
    public boolean hasMoreElements() {
    return it.hasNext();
    }
    @Override
    public FileInputStream nextElement() {
    return it.next();
    }
    };*/
    SequenceInputStream sis = new SequenceInputStream(en);
    FileOutputStream fos = new FileOutputStream("1234.txt");
    byte[] buf = new byte[1024];
    int len = 0;
    while((len=sis.read(buf))!=-1){
        fos.write(buf,0,len);
    }
    fos.close();
    sis.close();
}
}
```



#### Demos

**文件切割与合并**

文件切割：

```java
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;
/*
* 文件切割器。
*/
public class SplitFileDemo {
    
    private static final int SIZE = 1024 * 1024;
    /**
    * @param args
    * @throws Exception
    */
    public static void main(String[] args) throws Exception {
        File file = new File("c:\\aa.mp3");
        splitFile_2(file);
    }
    private static void splitFile_2(File file) throws IOException {
        // 用读取流关联源文件。
        FileInputStream fis = new FileInputStream(file);
        // 定义一个1M的缓冲区。
        byte[] buf = new byte[SIZE];
        // 创建目的。245
        FileOutputStream fos = null;
        int len = 0;
        int count = 1;
        /*
        * 切割文件时，必须记录住被切割文件的名称，以及切割出来碎片文件的个数。 以方便于合并。
        * 这个信息为了进行描述，使用键值对的方式。用到了properties对象
        *
        */
        Properties prop = new Properties();
        File dir = new File("c:\\partfiles");
        if (!dir.exists())
            dir.mkdirs();
        while ((len = fis.read(buf)) != -1) {
            fos = new FileOutputStream(new File(dir, (count++) + ".part"));
            fos.write(buf, 0, len);
            fos.close();
        }
        //将被切割文件的信息保存到prop集合中。
        prop.setProperty("partcount", count+"");
        prop.setProperty("filename", file.getName());
        fos = new FileOutputStream(new File(dir,count+".properties"));
        //将prop集合中的数据存储到文件中。
        prop.store(fos, "save file info");
        fos.close();
        fis.close();
    }
    public static void splitFile(File file) throws IOException {
        // 用读取流关联源文件。
        FileInputStream fis = new FileInputStream(file);
        // 定义一个 1M 的缓冲区。
        byte[] buf = new byte[SIZE];
        // 创建目的。
        FileOutputStream fos = null;
        int len = 0;
        int count = 1;
        File dir = new File("c:\\partfiles");
        if (!dir.exists())
            dir.mkdirs();
        while ((len = fis.read(buf)) != -1) {
            fos = new FileOutputStream(new File(dir, (count++) + ".part"));
            fos.write(buf, 0, len);
        }
        fos.close();
        fis.close();
    }
}
```

文件合并：

```java
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.SequenceInputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.Properties;
public class MergeFile {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        File dir = new File("c:\\partfiles");
        mergeFile_2(dir);
    }
    public static void mergeFile_2(File dir) throws IOException {
        /*
        * 获取指定目录下的配置文件对象。
        */
        File[] files = dir.listFiles(new SuffixFilter(".properties"));
        if(files.length!=1)
            throw new RuntimeException(dir+",该目录下没有properties扩展名的文件或者不唯一");//记录配置文件对象。
        File confile = files[0];
        //获取该文件中的信息================================================。
        Properties prop = new Properties();
        FileInputStream fis = new FileInputStream(confile);
        prop.load(fis);
        String filename = prop.getProperty("filename");
        int count = Integer.parseInt(prop.getProperty("partcount"));
        //获取该目录下的所有碎片文件。 ==============================================
        File[] partFiles = dir.listFiles(new SuffixFilter(".part"));
        if(partFiles.length!=(count-1)){
            throw new RuntimeException(" 碎片文件不符合要求，个数不对!应该"+count+"个");
        }
        //将碎片文件和流对象关联 并存储到集合中。
        ArrayList<FileInputStream> al = new ArrayList<FileInputStream>();
        for(int x=0; x<partFiles.length; x++){
            al.add(new FileInputStream(partFiles[x]));
        }
        //将多个流合并成一个序列流。
        Enumeration<FileInputStream> en = Collections.enumeration(al);
        SequenceInputStream sis = new SequenceInputStream(en);
        FileOutputStream fos = new FileOutputStream(new File(dir,filename));
        byte[] buf = new byte[1024];
        int len = 0;
        while((len=sis.read(buf))!=-1){
            fos.write(buf,0,len);
        }
        fos.close();
        sis.close();
    }
    public static void mergeFile(File dir) throws IOException{
        ArrayList<FileInputStream> al = new ArrayList<FileInputStream>();
        for(int x=1; x<=3 ;x++){
            al.add(new FileInputStream(new File(dir,x+".part")));
        }
        Enumeration<FileInputStream> en = Collections.enumeration(al);
        SequenceInputStream sis = new SequenceInputStream(en);
        FileOutputStream fos = new FileOutputStream(new File(dir,"1.bmp"));
        byte[] buf = new byte[1024];
        int len = 0;
        while((len=sis.read(buf))!=-1){
            fos.write(buf,0,len);
        }
        fos.close();
        sis.close();
    }
}
```

#### Serializable, ObjectStream  

序列化和反序列化。序列化：将对象存储到文件中。

```java
import java.io.Serializable;
/*
* Serializable:用于给被序列化的类加入ID号。
* 用于判断类和对象是否是同一个版本。
*/
public class Person implements Serializable/*标记接口*/ {
    /**
    * transient:非静态数据不想被序列化可以使用这个关键字修饰。
    */
    private static final long serialVersionUID = 9527l;
    private transient String name;
    private static int age;
    public Person(String name, int age) {
        super();
        this.name = name;
        this.age = age;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
}
```

```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import cn.itcast.io.p2.bean.Person;

public class ObjectStreamDemo {
    /**
    * @param args
    * @throws IOException
    * @throws ClassNotFoundException
    */
    public static void main(String[] args) throws IOException, ClassNotFoundException
    {
        // writeObj();
        readObj();
    }
    public static void readObj() throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new
                                                      FileInputStream("obj.object"));
        //对象的反序列化。
        Person p = (Person)ois.readObject();
        System.out.println(p.getName()+":"+p.getAge());
        ois.close();
    }
    public static void writeObj() throws IOException, IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new
                                                        FileOutputStream("obj.object"));
        //对象序列化。 被序列化的对象必须实现Serializable接口。
        oos.writeObject(new Person("小强",30));
        oos.close();
    }
}
```

#### RandomAccessFile  

#### PipedStream

管道流

```java
import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
public class PipedStream {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        PipedInputStream input = new PipedInputStream();
        PipedOutputStream output = new PipedOutputStream();
        input.connect(output);
           new Thread(new Input(input)).start();
        new Thread(new Output(output)).start();
    }
}
class Input implements Runnable{
    private PipedInputStream in;
    Input(PipedInputStream in){
        this.in = in;
    }
    public void run(){
        try {
            byte[] buf = new byte[1024];
            int len = in.read(buf);
            String s = new String(buf,0,len);
            System.out.println("s="+s);
            in.close();
        } catch (Exception e) {
            // TODO: handle exception
        }
    }
}
class Output implements Runnable{
    private PipedOutputStream out;
    Output(PipedOutputStream out){
        this.out = out;
    }
    public void run(){
        try {
            Thread.sleep(5000);
            out.write("hi，管道来了！ ".getBytes());
        } catch (Exception e) {
            // TODO: handle exception
        }
    }
}
```

#### DataStream

```java
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
public class DataSteamDemo {
    /**
* @param args
* @throws IOException
*/
    public static void main(String[] args) throws IOException {
        // writeData();
        readData();
    }
    public static void readData() throws IOException {
        DataInputStream dis = new DataInputStream(new FileInputStream("data.txt"));
        String str = dis.readUTF();
        System.out.println(str);
    }
    public static void writeData() throws IOException {
        DataOutputStream dos = new DataOutputStream(new
                                                    FileOutputStream("data.txt"));
        dos.writeUTF("你好");
        dos.close();
    }
}
```

#### ByteArrayStream 

字节数组流   

```java
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
public class ByteArrayStreamDemo {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) {
        ByteArrayInputStream bis = new ByteArrayInputStream("abcedf".getBytes());
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        int ch = 0;
        while((ch=bis.read())!=-1){
            bos.write(ch);
        }
        System.out.println(bos.toString());
    }
}
```

#### 编解码  

编码：字符串 --> **字节数组**

解码：**字节数组** --> 字符串

```java
package com.wansho.hellojava;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

public class EncodeDemo {
    /**
     * @param args
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        /*
         * 字符串 --> 字节数组：编码。
         * 字节数组 --> 字符串：解码。
         *
         * 你好： GBK: -60 -29 -70 -61
         *
         * 你好: utf-8: -28 -67 -96 -27 -91 -67
         *
         *
         * 如果你编错了，解不出来。
         * 如果编对了，解错了，有可能有救。
         */
        String str = "谢谢";
        byte[] buf = str.getBytes("gbk"); // 编码
        String s1 = new String(buf,"UTF-8"); // 解码，解错了
        System.out.println("s1="+s1); // лл
        byte[] buf2 = s1.getBytes("UTF-8");//获取源字节.
        printBytes(buf2); // -17 -65 -67 -17 -65 -67 -17 -65 -67
        // -17 -65 -67 -17 -65 -67 -17 -65 -67 -17 -65 -67
        // -48 -69 -48 -69
        String s2 = new String(buf2,"GBK"); // 解码，解对了
        System.out.println("s2="+s2);
        // encodeDemo(str);
    }
    /**
     * @param str
     * @throws UnsupportedEncodingException
     */
    public static void encodeDemo(String str)
            throws UnsupportedEncodingException {
        //编码；
        byte[] buf = str.getBytes("UTF-8");
        // printBytes(buf);
        //解码：
        String s1 = new String(buf,"UTF-8");
        System.out.println("s1="+s1);
    }
    private static void printBytes(byte[] buf) {
        for(byte b : buf){
            System.out.print(b +" ");
        }
    }
}
```

### 总结

```
IO流：
输入流：
输出流：
字节流：
字符流：
	为了处理文字数据方便而出现的对象。
    其实这些对象的内部使用的还是字节流(因为文字最终也是字节数据)
    只不过，通过字节流读取了相对应的字节数，没有对这些字节直接操作。
    而是去查了指定的(本机默认的)编码表，获取到了对应的文字。
    简单说：字符流就是 ： 字节流+编码表。
--------------------------------------------------------------------------------
缓冲区：
	提高效率的，提高谁的效率？提高流的操作数据的效率。
	所以创建缓冲区之前必须先有流。
	缓冲区的基本思想：其实就是定义容器将数据进行临时存储。
	对于缓冲区对象，其实就是将这个容器进行了封装，并提供了更多高效的操作方法。
	缓冲区可以提高流的操作效率。
	其实是使用了一种设计思想完成。设计模式：装饰设计模式。
	
缓冲区的设计原理，装饰设计模式的由来：
    Writer
        |--TextWriter
        |--MediaWriter
    现在要对该体系中的对象进行功能的增强。增强的最常见手段就是缓冲区。
    先将数据写到缓冲区中，再将缓冲区中的数据一次性写到目的地。
    按照之前学习过的基本的思想，那就是对对象中的写方法进行覆盖。
    产生已有的对象子类，复写write方法。不往目的地写，而是往缓冲区写。
    所以这个体系会变成这样。
    Writer
    |--TextWriter write:往目的地
    |--BufferTextWriter write：往缓冲区写
    |--MediaWriter
    |--BufferMediaWriter
    想要写一些其他数据。就会子类。 DataWriter，为了提高其效率，还要创建该类的子类。 BufferDataWriter
    Writer
    |--TextWriter write:往目的地
    |--BufferTextWriter write：往缓冲区写
    |--MediaWriter
    |--BufferMediaWriter
    |--DataWriter
    |--BufferDataWriter
    发现这个体系相当的麻烦。每产生一个子类都要有一个高效的子类。
    而且这写高效的子类使用的功能原理都一样，都是缓冲区原理。无论数据是什么。
    都是通过缓冲区临时存储提高效率的。
    那么， 对于这个体系就可以进行优化，因为没有必要让每一个对象都具备相同功能的子类。
    哪个对象想要进行效率的提高，只要让缓冲区对其操作即可。也就说，单独将缓冲区进行封装变成对象。
    //它的出现为了提高对象的效率。所以必须在创建它的时候先有需要被提高效率的对象
    class BufferWriter
    {
    [];
    BufferedWriter(Writer w)
    { }
    /*
    BufferWriter(TextWriter w)
    { }
    BufferedWriter(MediaWriter w)
    { }
    */
    }
    BufferWriter的出现增强了Writer中的write方法。
    但是增强过后， BufferWriter对外提供的还是write方法。只不过是高效的。
    所以写的实质没有变，那么BufferWriter也是Writer中的一员。
    所以体系就会变成这样。
    Writer
    |--TextWriter
    |--MediaWriter
    |--BufferWriter
    |--DataWriter
    BufferWriter出现了避免了继承体系关系的臃肿，比继承更为灵活。
    如果是为了增强功能，这样方式解决起来更为方便。
    所以就把这种优化，总结出来，起个名字：装饰设计模式。
    装饰类和被装饰类肯定所属于同一个体系。
    既然明确了BufferedReader由来。
    我们也可以独立完成缓冲区的建立
    原理；
    1，使用流的read方法从源中读取一批数据存储到缓冲区的数组中。
    2，通过计数器记录住存储的元素个数。
    3，通过数组的角标来获取数组中的元素(从缓冲区中取数据).
    4，指针会不断的自增，当增到数组长度，会归0.计数器会自减，当减到0时，就在从源拿一批数据进缓冲区。
    
内容补足：
MyBufferedReader
LineNumberReader ：可以定义行号。

--------------------------------------------------------------------------------
字符流：
    FileReader
    FileWriter
    BufferedReader
    BufferedWriter
    
字节流：
	InputStream OutputStream
	
操作文件的字节流对象
    FileOutputStream
    FileInputStream
    BufferedOutputStream
    BufferedInputStream

--------------------------------------------------------------------------------
转换流：
InputStreamReader isr = new InputStreamReader(new FileInputStream("a.txt"));
InputStreamReader isr = new InputStreamReader(new FileInputStream("a.txt"),"gbk");
FileReader fr = new FileReader("a.txt");
FileWriter fw = new FileWriter("b.txt");
OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("b.txt"));
OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("b.txt"),"gbk");

转换流：字节流+编码表。
转换流的子类： FileReader， FileWriter：字节流+本地默认码表(GBK)。
如果操作文本文件使用的本地默认编码表完成编码。可以使用FileReader，或者FileWriter。因为这样写简
便。
如果对操作的文本文件需要使用指定编码表进行编解码操作，这时必须使用转换流来完成。

--------------------------------------------------------------------------------
IO流的操作规律总结：
1，明确体系：
数据源： InputStream ， Reader
数据汇： OutputStream， Writer
2，明确数据：因为数据分两种：字节，字符。
数据源：是否是纯文本数据呢？
是： Reader
否： InputStream
数据汇：
是： Writer
否： OutputStream
到这里就可以明确具体要使用哪一个体系了。
剩下的就是要明确使用这个体系中的哪个对象。
3，明确设备：
数据源：
键盘： System.in
硬盘： FileXXX
内存：数组。
网络： socket socket.getInputStream();
数据汇：
控制台： System.out
硬盘： FileXXX
内存：数组
网络： socket socket.getOutputStream();
4，明确额外功能：
1，需要转换？是，使用转换流。 InputStreamReader OutputStreamWriter
2，需要高效？是，使用缓冲区。 Buffered
3，需要其他？
--------------------------------------------------------------------------------
1，复制一个文本文件。
1，明确体系：
源： InputStream ， Reader
目的： OutputStream ， Writer
2，明确数据：
源：是纯文本吗？是 Reader
目的；是纯文本吗？是 Writer
3，明确设备：
源：硬盘上的一个文件。 FileReader
目的：硬盘上的一个文件。 FileWriter269
FileReader fr = new FileReader("a.txt");
FileWriter fw = new FileWriter("b.txt");
4，需要额外功能吗？
需要，高效，使用buffer
BufferedReader bufr = new BufferedReader(new FileReader("a.txt"));
BufferedWriter bufw = new BufferedWriter(new FileWriter("b.txt"));
2，读取键盘录入，将数据存储到一个文件中。
1，明确体系：
源： InputStream ， Reader
目的： OutputStream ， Writer
2，明确数据：
源：是纯文本吗？是 Reader
目的；是纯文本吗？是 Writer
3，明确设备：
源：键盘， System.in
目的：硬盘， FileWriter
InputStream in = System.in;
FileWriter fw = new FileWriter("a.txt");
4，需要额外功能吗？
需要，因为源明确的体系时Reader。可是源的设备是System.in。
所以为了方便于操作文本数据，将源转成字符流。需要转换流。 InputStreamReader
InputStreamReader isr = new InputStreamReader(System.in);
FileWriter fw = new FileWriter("a.txt");
需要高效不?需要。 Buffer
BufferedReader bufr = new BufferedReader(new InputStreamReader(System.in));
BufferedWriter bufw = new BufferedWriter(new FileWriter("a.txt"));
3，读取一个文本文件，将数据展现在控制台上。
1，明确体系：
源： InputStream ， Reader
目的： OutputStream ， Writer
2，明确数据：
源：是纯文本吗？是 Reader
目的；是纯文本吗？是 Writer
3，明确设备：
源：硬盘文件， FileReader。
目的：控制台： System.out。
FileReader fr = new FileReader("a.txt");
OutputStream out = System.out;
4，需要额外功能？
因为源是文本数据，确定是Writer体系。所以为了方便操作字符数据，
需要使用字符流，但是目的又是一个字节输出流。
需要一个转换流， OutputStreamWriter
FileReader fr = new FileReader("a.txt");270
OutputStreamWriter osw = new OutputStreamWriter(System.out);
需要高效吗？需要。
BufferedReader bufr = new BufferedReader(new FileReader("a.txt"));
BufferedWriter bufw = new BufferedWriter(new
OutputStreamWriter(System.out));
4，读取键盘录入，将数据展现在控制台上。
1，明确体系：
源： InputStream ， Reader
目的： OutputStream ， Writer
2，明确数据：
源：是纯文本吗？是 Reader
目的；是纯文本吗？是 Writer
3，明确设备：
源：键盘： System.in
目的：控制台： System.out
InputStream in = System.in;
OutputStream out = System.out;
4，需要额外功能吗？
因为处理的数据是文本数据，同时确定是字符流体系。
为方便操作字符数据的可以将源和目的都转成字符流。使用转换流。
为了提高效率，使用Buffer
BufferedReader bufr =new BufferedReader(new
InputStreamReader(Systme.in));
BufferedWriter bufw = new BufferedWriter(new
OutputStreamWriter(System.out));
5，读取一个文本文件，将文件按照指定的编码表UTF-8进行存储，保存到另一个文件中。
1，明确体系：
源： InputStream ， Reader
目的： OutputStream ， Writer
2，明确数据：
源：是纯文本吗？是 Reader
目的；是纯文本吗？是 Writer
3，明确设备：
源：硬盘： FileReader.
目的：硬盘： FileWriter
FileReader fr = new FileReader("a.txt");
FileWriter fw = new FileWriter("b.txt");
4，额外功能：
注意：目的中虽然是一个文件，但是需要指定编码表。
而直接操作文本文件的FileWriter本身内置的是本地默认码表。无法明确具体指定码表。271
这时就需要转换功能。 OutputStreamWriter,而这个转换流需要接受一个字节输出流，而且
对应的目的是一个文件。这时就使用字节输出流中的操作文件的流对象。 FileOutputStream.
FileReader fr = new FileReader("a.txt");
OutputStreamWriter osw = new OutputStreamWriter(new
FileOutputStream("b.txt"),"UTF-8");
需要高效吗？
BufferedReader bufr = new BufferedReader(new FileReader("a.txt"));
BufferedWriter bufw =
new BufferedWriter(new OutputStreamWriter(new
FileOutputStream("b.txt"),"UTF-8"));
目前为止， 10个流对象重点掌握。
字符流：
FileReader
FileWriter
BufferedReader
BufferedWriter
InputStreamReader
OutputStreamWrier
字节流：
FileInputStream
FileOutputStream
BufferedInputStream
BufferedOutputStream

--------------------------------------------------------------------------------
File类：
用于将文件和文件夹封装成对象。
1，创建。
boolean createNewFile():如果该文件不存在，会创建，如果已存在，则不创建。不会像输出流
一样会覆盖。
boolean mkdir();
boolean mkdirs();
2，删除。
boolean delete();
void deleteOnExit();
3，获取：
String getAbsolutePath();
String getPath();
String getParent();
String getName();
long length();
long lastModified();
4，判断：
boolean exists();
boolean isFile();
boolean isDirectory();
5，

--------------------------------------------------------------------------------
IO中的其他功能流对象：

打印流：
    PrintStream：字节打印流。
    特点：
    1，构造函数接收File对象，字符串路径，字节输出流。意味着打印目的可以有很多。
    2，该对象具备特有的方法 打印方法 print println,可以打印任何类型的数据。
    3，特有的print方法可以保持任意类型数据表现形式的原样性，将数据输出到目的地。
    对于OutputStream父类中的write，是将数据的最低字节写出去。
    PrintWriter：字符打印流。
    特点：
    1，当操作的数据是字符时，可以选择PrintWriter，比PrintStream要方便。
    2，它的构造函数可以接收 File对象，字符串路径，字节输出流，字符输出流。
    3，构造函数中，如果参数是输出流，那么可以通过指定另一个参数true完成自动刷新，该true对
    println方法有效。
    什么时候用？
    当需要保证数据表现的原样性时，就可以使用打印流的打印方法来完成，这样更为方便。
    保证原样性的原理：其实就是将数据变成字符串，在进行写入操作
    
SequenceInputStream:
    特点：
    1，将多个字节读取流和并成一个读取流，将多个源合并成一个源，操作起来方便。
    2，需要的枚举接口可以通过Collections.enumeration(collection);
    
ObjectInputStream 和 ObjectOutputStream
    对象的序列化和反序列化。
    writeObject readObject273
    Serializable标记接口
    关键字： transient
    
RandomAccessFile:
    特点：
    1，即可读取，又可以写入。
    2，内部维护了一个大型的byte数组，通过对数组的操作完成读取和写入。
    3，通过getFilePointer方法获取指针的位置，还可以通过seek方法设置指针的位置。
    4，该对象的内容应该封装了字节输入流和字节输出流。
    5，该对象只能操作文件。
    通过seek方法操作指针，可以从这个数组中的任意位置上进行读和写
    可以完成对数据的修改。
    但是要注意：数据必须有规律。
    
管道流：需要和多线程技术相结合的流对象。
    PipedOutputStream
    PipedInputStream
    
用操作基本数据类型值的对象：
    DataInputStream
    DataOutputStream
    
设备是内存的流对象。
    ByteArrayInputStream ByteArrayOutputStream
    CharArrayReader CharArrayWriter
    
--------------------------------------------------------------------------------
IO流体系：

字符流：
Reader
    |--BufferedReader:
    |--LineNumberReader
    |--CharArrayReader
    |--StringReader
    |--InputStreamReaer
    |--FileReader
Writer
    |--BufferedWriter
    |--CharArrayWriter
    |--StringWriter
    |--OutputStreamWriter
    |--FileWriter
    |--PrintWriter
    
字节流：
InputStream
    |--FileInputStream:
    |--FilterInputStream
    |--BufferedInputStream
    |--DataInputStream
    |--ByteArrayInputStream
    |--ObjectInputStream
    |--SequenceInputStream
    |--PipedInputStream
OutputStream
    |--FileOutputStream
    |--FilterOutputStream
    |--BufferedOutputStream
    |--DataOutputStream
    |--ByteArrayOutputStream
    |--ObjectOutputStream
    |--PipedOutputStream
    |--PrintStream
```



## 网络编程

### IP

```java
import java.net.InetAddress;
import java.net.UnknownHostException;
public class IPDemo {
    /**
     * @param args
     * @throws UnknownHostException
     */
    public static void main(String[] args) throws UnknownHostException {
        //获取本地主机ip地址对象。
        InetAddress ip = InetAddress.getLocalHost();
        //获取其他主机的ip地址对象。
        //ip = InetAddress.getByName("220.181.38.150");
        //InetAddress.getByName("my_think");
        System.out.println(ip.getHostAddress()); // 获取 IP 地址
        System.out.println(ip.getHostName()); // 获取域名
    }
}
```

### UDP

**send**

```java
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
public class UDPSendDemo {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        System.out.println("发送端启动......");
        /*
        * 创建UDP传输的发送端。
        * 思路：
        * 1，建立udp的socket服务。
        * 2，将要发送的数据封装到数据包中。
        * 3，通过udp的socket服务将数据包发送出去。
        * 4，关闭socket服务。
        */
        //1, udpsocket服务。使用DatagramSocket对象。
        DatagramSocket ds = new DatagramSocket(8888);
        //2, 将要发送的数据封装到数据包中。
        String str = "udp传输演示：哥们来了！ ";
        // 使用DatagramPacket将数据封装到的该对象包中。
        byte[] buf = str.getBytes();
        DatagramPacket dp = new
            DatagramPacket(buf,buf.length,InetAddress.getByName("192.168.1.100"),10000);
        //3，通过udp的socket服务将数据包发送出去。使用send方法。
        ds.send(dp);
        //4，关闭资源。
        ds.close();
    }
}
```

**receive**

```java
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
public class UDPReceDemo {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        System.out.println("接收端启动......");
        /*
        * 建立UDP接收端的思路。
        * 1，建立udp socket服务,因为是要接收数据，必须要明确一个端口号。
        * 2，创建数据包，用于存储接收到的数据。方便用数据包对象的方法解析这些数据.
        * 3，使用socket服务的receive方法将接收的数据存储到数据包中。
        * 4，通过数据包的方法解析数据包中的数据。
        * 5，关闭资源
        */
        //1,建立udp socket服务。
        DatagramSocket ds = new DatagramSocket(10000);
        //2,创建数据包。
        byte[] buf = new byte[1024];
        DatagramPacket dp = new DatagramPacket(buf,buf.length);
        //3,使用接收方法将数据存储到数据包中。
        ds.receive(dp);//阻塞式的。
        //4，通过数据包对象的方法，解析其中的数据,比如，地址，端口，数据内容。
        String ip = dp.getAddress().getHostAddress();
        int port = dp.getPort();
        String text = new String(dp.getData(),0,dp.getLength());
        System.out.println(ip+":"+port+":"+text);
        //5,关闭资源。
        ds.close();
    }
}
```

**交互**

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
public class UDPSendDemo2 {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        System.out.println("发送端启动......");
        /*
        * 创建UDP传输的发送端。
        * 思路：
        * 1，建立udp的socket服务。
        * 2，将要发送的数据封装到数据包中。
        * 3，通过udp的socket服务将数据包发送出去。
        * 4，关闭socket服务。
        */
        //1,udpsocket服务。使用DatagramSocket对象。
        DatagramSocket ds = new DatagramSocket(8888);
        // String str = "udp传输演示：哥们来了！ ";
        BufferedReader bufr = new BufferedReader(new InputStreamReader(System.in));
        String line = null;
        while((line=bufr.readLine())!=null){
            byte[] buf = line.getBytes();
            DatagramPacket dp =
                new
                DatagramPacket(buf,buf.length,InetAddress.getByName("192.168.1.100"),10000);
            ds.send(dp);
            if("886".equals(line))
                break;
        }
        //4，关闭资源。
        ds.close();
    }
}

//（信息接收端）
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
public class UDPReceDemo2 {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        System.out.println("接收端启动......");
        /*
        * 建立UDP接收端的思路。
        * 1，建立udp socket服务,因为是要接收数据，必须要明确一个端口号。
        * 2，创建数据包，用于存储接收到的数据。方便用数据包对象的方法解析这些数据.
        * 3，使用socket服务的receive方法将接收的数据存储到数据包中。
        * 4，通过数据包的方法解析数据包中的数据。
        * 5，关闭资源
        */
        //1,建立udp socket服务。
        DatagramSocket ds = new DatagramSocket(10000);
        while(true){
            //2,创建数据包。
            byte[] buf = new byte[1024];
            DatagramPacket dp = new DatagramPacket(buf,buf.length);
            //3,使用接收方法将数据存储到数据包中。
            ds.receive(dp);//阻塞式的。
            //4，通过数据包对象的方法，解析其中的数据,比如，地址，端口，数据内容。
            String ip = dp.getAddress().getHostAddress();
            int port = dp.getPort();
            String text = new String(dp.getData(),0,dp.getLength());
            System.out.println(ip+":"+port+":"+text);
        }
        //5,关闭资源。
        // ds.close();
    }
}
```

**UDP 聊天程序，多线程**

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
public class Send implements Runnable {
    private DatagramSocket ds;
    public Send(DatagramSocket ds){
        this.ds = ds;
    }
    @Override
    public void run() {
        try {
            BufferedReader bufr = new BufferedReader(new
                                                     InputStreamReader(System.in));
            String line = null;
            while((line=bufr.readLine())!=null){
                byte[] buf = line.getBytes();
                DatagramPacket dp =
                    new
                    DatagramPacket(buf,buf.length,InetAddress.getByName("192.168.1.255"),10001);
                ds.send(dp);
                if("886".equals(line))
                    break;
            }
            ds.close();
        } catch (Exception e) {
        }
    }
}
//（接收端）
package cn.itcast.net.p3.chat;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
public class Rece implements Runnable {
    private DatagramSocket ds;
    public Rece(DatagramSocket ds) {
        this.ds = ds;
    }
    @Override
    public void run() {
        try {
            while (true) {
                // 2,创建数据包。
                byte[] buf = new byte[1024];
                DatagramPacket dp = new DatagramPacket(buf, buf.length);
                // 3,使用接收方法将数据存储到数据包中。
                ds.receive(dp);// 阻塞式的。
                // 4，通过数据包对象的方法，解析其中的数据,比如，地址，端口，数据内容。
                String ip = dp.getAddress().getHostAddress();
                int port = dp.getPort();
                String text = new String(dp.getData(), 0, dp.getLength());
                System.out.println(ip + "::" + text);
                if(text.equals("886")){
                    System.out.println(ip+"....退出聊天室");
                }
            }
        } catch (Exception e) {
        }
    }
}

// 开启发送和接收两个线程开始运行聊天
import java.io.IOException;
import java.net.DatagramSocket;
import java.net.SocketException;
public class ChatDemo {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        DatagramSocket send = new DatagramSocket();
        DatagramSocket rece = new DatagramSocket(10001);
        new Thread(new Send(send)).start();
        new Thread(new Rece(rece)).start();
    }
}
```



### TCP

**客户端**

```java
import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;
public class ClientDemo {
    /**
    * @param args
    * @throws IOException
    * @throws UnknownHostException
    */
    public static void main(String[] args) throws UnknownHostException, IOException
    {
        //客户端发数据到服务端
        /*
        * Tcp传输，客户端建立的过程。
        * 1，创建tcp客户端socket服务。使用的是Socket对象。
        * 建议该对象一创建就明确目的地。要连接的主机。
        * 2，如果连接建立成功，说明数据传输通道已建立。
        * 该通道就是socket流 ,是底层建立好的。 既然是流，说明这里既有输入，又有输出。
        * 想要输入或者输出流对象，可以找Socket来获取。
        * 可以通过getOutputStream(),和getInputStream()来获取两个字节流。
        * 3，使用输出流，将数据写出。
        * 4，关闭资源。
        */
        //创建客户端socket服务。
        Socket socket = new Socket("192.168.1.100",10002);
        //获取socket流中的输出流。
        OutputStream out = socket.getOutputStream();
        //使用输出流将指定的数据写出去。
        out.write("tcp演示：哥们又来了!".getBytes());
        //关闭资源。
        socket.close();
    }
}
```



**服务端**

```java
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
public class ServerDemo {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        // 服务端接收客户端发送过来的数据，并打印在控制台上。
        /*
        * 建立tcp服务端的思路：
        * 1，创建服务端socket服务。通过ServerSocket对象。
        * 2，服务端必须对外提供一个端口，否则客户端无法连接。
        * 3，获取连接过来的客户端对象。
        * 4，通过客户端对象获取socket流读取客户端发来的数据
        * 并打印在控制台上。
        * 5，关闭资源。关客户端，关服务端。
        */
        //1创建服务端对象。
        ServerSocket ss = new ServerSocket(10002);
        //2,获取连接过来的客户端对象。
        Socket s = ss.accept();//阻塞式.
        String ip = s.getInetAddress().getHostAddress();
        //3，通过socket对象获取输入流，要读取客户端发来的数据
        InputStream in = s.getInputStream();
        byte[] buf = new byte[1024];
        int len = in.read(buf);
        String text = new String(buf,0,len);
        System.out.println(ip+":"+text);
        s.close();
        ss.close();
    }
}
```

**交互**

```java
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;
public class ClientDemo2 {
    /**
    * @param args
    * @throws IOException
    * @throws UnknownHostException
    */
    public static void main(String[] args) throws UnknownHostException, IOException
    {
        //客户端发数据到服务端
        /*
        * Tcp传输，客户端建立的过程。
        * 1，创建tcp客户端socket服务。使用的是Socket对象。
        * 建议该对象一创建就明确目的地。要连接的主机。
        * 2，如果连接建立成功，说明数据传输通道已建立。
        * 该通道就是socket流 ,是底层建立好的。 既然是流，说明这里既有输入，又有输出。
        * 想要输入或者输出流对象，可以找Socket来获取。
        * 可以通过getOutputStream(),和getInputStream()来获取两个字节流。
        * 3，使用输出流，将数据写出。
        * 4，关闭资源。
        */
        Socket socket = new Socket("192.168.1.100", 10002);
        OutputStream out = socket.getOutputStream();
        out.write("tcp演示：哥们又来了!".getBytes());
        // 读取服务端返回的数据,使用 socket 读取流。
        InputStream in = socket.getInputStream();
        byte[] buf = new byte[1024];
        int len = in.read(buf);
        String text = new String(buf,0,len);
        System.out.println(text);
        //关闭资源。
        socket.close();
    }
}
//（服务端）
package cn.itcast.net.p4.tcp;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
public class ServerDemo2 {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        // 服务端接收客户端发送过来的数据，并打印在控制台上。
        /*
        * 建立tcp服务端的思路：
        * 1，创建服务端socket服务。通过ServerSocket对象。
        * 2，服务端必须对外提供一个端口，否则客户端无法连接。
        * 3，获取连接过来的客户端对象。
        * 4，通过客户端对象获取socket流读取客户端发来的数据
        * 并打印在控制台上。
        * 5，关闭资源。关客户端，关服务端。
        */
        //1创建服务端对象。
        ServerSocket ss = new ServerSocket(10002);
        //2,获取连接过来的客户端对象。
        Socket s = ss.accept();
        String ip = s.getInetAddress().getHostAddress();
        //3，通过socket对象获取输入流，要读取客户端发来的数据
        InputStream in = s.getInputStream();
        byte[] buf = new byte[1024];
        int len = in.read(buf);
        String text = new String(buf,0,len);
        System.out.println(ip+":"+text);
        //使用客户端socket对象的输出流给客户端返回数据
        OutputStream out = s.getOutputStream();
        out.write("收到".getBytes());
        s.close();
        ss.close();
    }
}
```

**TCP创建一个英文大写服务器  **

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
public class TransClient {
    /**
    * @param args
    * @throws IOException
    * @throws UnknownHostException
    */
    public static void main(String[] args) throws UnknownHostException, IOException
    {
        /*
        * 思路：
        * 客户端：
        * 1，需要先有socket端点。
        * 2，客户端的数据源：键盘。
        * 3，客户端的目的： socket.
        * 4，接收服务端的数据，源： socket。
        * 5，将数据显示在打印出来：目的：控制台.
        * 6，在这些流中操作的数据，都是文本数据。
        * 转换客户端:
        * 1,创建socket客户端对象。
        * 2,获取键盘录入。
        * 3，将录入的信息发送给socket输出流。
        */
        //1,创建socket客户端对象。
        Socket s = new Socket("192.168.1.100",10004);
        //2，获取键盘录入。
        BufferedReader bufr =
            new BufferedReader(new InputStreamReader(System.in));
        //3,socket输出流。
        // new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));
        PrintWriter out = new PrintWriter(s.getOutputStream(),true);
        //4,socket输入流，读取服务端返回的大写数据
        BufferedReader bufIn = new BufferedReader(new
                                                  InputStreamReader(s.getInputStream()));
        String line = null;
        while((line=bufr.readLine())!=null){
            if("over".equals(line))
                break;
            // out.print(line+"\r\n");
            // out.flush();
            out.println(line);
            //读取服务端发回的一行大写数。
            String upperStr = bufIn.readLine();
            System.out.println(upperStr);
        }
        s.close();
    }
}

//（服务端）
package cn.itcast.net.p5.tcptest;
import java.io.BufferedReader;292
    import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
public class TransServer {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        /*
        * 转换服务端。
        * 分析：
        * 1， serversocket服务。
        * 2，获取socket对象。
        * 3，源： socket，读取客户端发过来的需要转换的数据。
        * 4，目的：显示在控制台上。
        * 5，将数据转成大写发给客户端。
        */
        //1,
        ServerSocket ss = new ServerSocket(10004);
        //2,获取socket对象。
        Socket s = ss.accept();
        //获取ip.
        String ip = s.getInetAddress().getHostAddress();
        System.out.println(ip+"......connected");
        //3,获取socket读取流，并装饰。
        BufferedReader bufIn = new BufferedReader(new
                                                  InputStreamReader(s.getInputStream()));
        //4,获取socket的输出流，并装饰。
        PrintWriter out = new PrintWriter(s.getOutputStream(),true);
        String line = null;
        while((line=bufIn.readLine())!=null){
            System.out.println(line);
            out.println(line.toUpperCase());
            // out.print(line.toUpperCase()+"\r\n");
            // out.flush();
        }
        s.close();
        ss.close();
    }
}
```

**上传图片**

```java
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

public class UploadTask implements Runnable {
    private static final int SIZE = 1024*1024*2;
    private Socket s;
    public UploadTask(Socket s) {
        this.s = s;
    }
    @Override
    public void run() {
        int count = 0;
        String ip = s.getInetAddress().getHostAddress();
        System.out.println(ip + ".....connected");
        try{
            // 读取客户端发来的数据。
            InputStream in = s.getInputStream();
            // 将读取到数据存储到一个文件中。
            File dir = new File("c:\\pic");
            if (!dir.exists()) {
                dir.mkdirs();
            }
            File file = new File(dir, ip + ".jpg");
            //如果文件已经存在于服务端
            while(file.exists()){
                file = new File(dir,ip+"("+(++count)+").jpg");
            }
            FileOutputStream fos = new FileOutputStream(file);
            byte[] buf = new byte[1024];
            int len = 0;
            while ((len = in.read(buf)) != -1) {
                fos.write(buf, 0, len);
                if(file.length()>SIZE){
                    System.out.println(ip+"文件体积过大");
                    fos.close();
                    s.close();
                    System.out.println(ip+"...."+file.delete());
                    return ;
                }
            }
            // 获取socket输出流， 将上传成功字样发给客户端。
            OutputStream out = s.getOutputStream();
            out.write("上传成功".getBytes());
            fos.close();
            s.close();
        }catch(IOException e){
        }
    }
}
//（上传的客户端）
package cn.itcast.net.p1.uploadpic;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;
public class UploadPicClient {
    /**
    * @param args
    * @throws IOException
    * @throws UnknownHostException
    */
    public static void main(String[] args) throws UnknownHostException, IOException
    {
        //1,创建客户端socket。
        Socket s = new Socket("192.168.1.100",10006);
        //2,读取客户端要上传的图片文件。
        FileInputStream fis = new FileInputStream("c:\\0.bmp");
        //3,获取socket输出流，将读到图片数据发送给服务端。
        OutputStream out = s.getOutputStream();
        byte[] buf = new byte[1024];
        int len = 0;
        while((len=fis.read(buf))!=-1){
            out.write(buf,0,len);
        }
        //告诉服务端说：这边的数据发送完毕。让服务端停止读取。
        s.shutdownOutput();
        //读取服务端发回的内容。
        InputStream in = s.getInputStream();
        byte[] bufIn = new byte[1024];
        int lenIn = in.read(buf);
        String text = new String(buf,0,lenIn);
        System.out.println(text);
        fis.close();
        s.close();
    }
}
//（上传的服务端）
package cn.itcast.net.p1.uploadpic;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
public class UploadPicServer {
    /**
    * @param args
    * @throws IOException
    */
    public static void main(String[] args) throws IOException {
        //创建tcp的socket服务端。
        ServerSocket ss = new ServerSocket(10006);
        while(true){
            Socket s = ss.accept();
            new Thread(new UploadTask(s)).start();
        }
        //获取客户端。
        // ss.close();
    }
}
```

**网络编程小结**

```
最常见的客户端：
浏览器 ： IE。
最常见的服务端：
服务器： Tomcat。
为了了解其原理：
自定义服务端，使用已有的客户端IE，了解一下客户端给服务端发了什么请求？
发送的请求是：
GET / HTTP/1.1 请求行 请求方式 /myweb/1.html 请求的资源路径 http协议版本。
请求消息头 . 属性名：属性值
Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg,
application/x-shockwave-flash,
application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*
Accept: */*
Accept-Language: zh-cn,zu;q=0.5
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; InfoPath.2)
Host: 192.168.1.100:9090
//Host: www.huyouni.com:9090
Connection: Keep-Alive
//空行
//请求体。
//服务端发回应答消息。
HTTP/1.1 200 OK //应答行， http的协议版本 应答状态码 应答状态描述信息
应答消息属性信息。 属性名：属性值
Server: Apache-Coyote/1.1
ETag: W/"199-1323480176984"
Last-Modified: Sat, 10 Dec 2011 01:22:56 GMT
Content-Type: text/html
Content-Length: 199
Date: Fri, 11 May 2012 07:51:39 GMT
Connection: close
//空行
//应答体。
<html>303
<head>
<title>这是我的网页</title>
</head>
<body>
<h1>欢迎光临</h1>
<font size='5' color="red">这是一个tomcat服务器中的资源。是一个html网页。 </font>
</body>
</html>
--------------------------------------------------------------------------------
网络结构，
1,C/S client/server
特点：
该结构的软件，客户端和服务端都需要编写。
可发成本较高，维护较为麻烦。
好处：
客户端在本地可以分担一部分运算。
2,B/S browser/server
特点：
该结构的软件，只开发服务器端，不开发客户端，因为客户端直接由浏览器取代。
开发成本相对低，维护更为简单。
缺点：所有运算都要在服务端完成。
```



## 反射机制  

### 什么是反射机制（类的解剖）

```java
/*
* JAVA反射机制是在运行状态中，对于任意一个类 (class文件)，都能够知道这个类的所有属性和方法；
* 对于任意一个对象，都能够调用它的任意一个方法和属性；
* 这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。
*
*
* 动态获取类中信息，就是java反射 。
* 可以理解为对类的解剖。
*
* 要想要对字节码文件进行解剖，必须要有字节码文件对象.
* 如何获取字节码文件对象呢？
*
*/
```

```java
public class ReflectDemo {
    /**
    * @param args
    * @throws ClassNotFoundException
    */
    public static void main(String[] args) throws ClassNotFoundException {
        getClassObject_3();
    }
    /*
    * 方式三：
    * 只要通过给定的类的 字符串名称就可以获取该类，更为扩展。
    * 可是用Class类中的方法完成。
    * 该方法就是forName.
    * 这种方式只要有名称即可，更为方便，扩展性更强。
    */
    public static void getClassObject_3() throws ClassNotFoundException {
        String className = "cn.itcast.bean.Person";
        Class clazz = Class.forName(className);
        System.out.println(clazz);
    }
    /*
    * 方式二：
    * 2，任何数据类型都具备一个静态的属性.class来获取其对应的Class对象。
    * 相对简单，但是还是要明确用到类中的静态成员。
    * 还是不够扩展。
    *
    */
    public static void getClassObject_2() {
        Class clazz = Person.class;
        Class clazz1 = Person.class;
        System.out.println(clazz==clazz1);
    }
    /*
    * 获取字节码对象的方式：
    * 1， Object类中的getClass()方法的。
    * 想要用这种方式，必须要明确具体的类，并创建对象。
    * 麻烦 .
    *
    */
    public static void getClassObject_1(){
        Person p = new Person();
        Class clazz = p.getClass();
        Person p1 = new Person();
        Class clazz1 = p1.getClass();
        System.out.println(clazz==clazz1);
    }
}
```

### 类的解剖

获取构造函数：

```java
import java.io.FileReader;
import java.lang.reflect.Constructor;
public class ReflectDemo2 {
    /**
    * @param args
    * @throws Exception
    * @throws InstantiationException
    * @throws ClassNotFoundException
    */
    public static void main(String[] args) throws ClassNotFoundException,
    InstantiationException, Exception {
        createNewObject_2();
    }
    public static void createNewObject_2() throws Exception {
        // cn.itcast.bean.Person p = new cn.itcast.bean.Person("小强",39);
        /*
        * 当获取指定名称对应类中的所体现的对象时，
        * 而该对象初始化不使用空参数构造该怎么办呢？
        * 既然是通过指定的构造 函数进行对象的初始化，
        * 所以应该先获取到该构造函数。 通过字节码文件对象即可完成。
        * 该方法是： getConstructor(paramterTypes);
        *
        */
        String name = "cn.itcast.bean.Person";
        //找寻该名称类文件，并加载进内存，并产生Class对象。
        Class clazz = Class.forName(name);
        //获取到了指定的构造函数对 象。
        Constructor constructor = clazz.getConstructor(String.class,int.class);
        //通过该构造器对象的newInstance方法进行对象的初始化。
        Object obj = constructor.newInstance("小明",38);
    }
    public static void createNewObject() throws ClassNotFoundException,
    InstantiationException, IllegalAccessException{
        //早期： new时候，先根据被new的类的名称找寻该类的字节码文件，并加载进内存，
        // 并创建该字节码文件对象，并接着创建该字节文件的对应的Person对象.
        // cn.itcast.bean.Person p = new cn.itcast.bean.Person();
        //现在：
        String name = "cn.itcast.bean.Person";
        //找寻该名称类文件，并加载进内存，并产生Class对象。
        Class clazz = Class.forName(name);
        //如何产生该类的对象呢？
        Object obj = clazz.newInstance();
    }
}
```

获取字段：

```java
import java.lang.reflect.Field;
public class ReflectDemo3 {
    /**
    * @param args
    * @throws Exception
    */
    public static void main(String[] args) throws Exception {
        getFieldDemo();
    }
    /*
    * 获取字节码文件中的字段。
    */
    public static void getFieldDemo() throws Exception {
        Class clazz = Class.forName("cn.itcast.bean.Person");
        Field field = null;//clazz.getField("age");//只能获取公有的，
        field = clazz.getDeclaredField("age");//只获取本类，但包含私有。
        //对私有字段的访问取消权限检查。暴力访问。
        field.setAccessible(true);
        Object obj = clazz.newInstance();
        field.set(obj, 89);
        Object o = field.get(obj);
        System.out.println(o);
        // cn.itcast.bean.Person p = new cn.itcast.bean.Person();
        // p.age = 30;
    }
}
```

获取公共函数：

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
public class ReflectDemo4 {
    public ReflectDemo4() {
    }
    /**
* @param args
* @throws Exception
*/
    public static void main(String[] args) throws Exception {
        getMethodDemo_3();
    }
    public static void getMethodDemo_3() throws Exception {
        Class clazz = Class.forName("cn.itcast.bean.Person");
        Method method = clazz.getMethod("paramMethod", String.class,int.class);
        Object obj = clazz.newInstance();
        method.invoke(obj, "小强",89);
    }
    public static void getMethodDemo_2() throws Exception {
        Class clazz = Class.forName("cn.itcast.bean.Person");
        Method method = clazz.getMethod("show", null); //获取空参数一般方法。
        // Object obj = clazz.newInstance();
        Constructor constructor = clazz.getConstructor(String.class,int.class);
        Object obj = constructor.newInstance("小明",37);
        method.invoke(obj, null);
    }
    /*
    * 获取指定Class中的所有公共函数。
    */
    public static void getMethodDemo() throws Exception {
        Class clazz = Class.forName("cn.itcast.bean.Person");
        Method[] methods = clazz.getMethods();//获取的都是公有的方法。
        methods = clazz.getDeclaredMethods();//只获取本类中所有方法，包含私有。
        for(Method method : methods){
            System.out.println(method);
        }
    }
}
```

## 正则表达式

Demos:

```java
public class RegexDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        String qq = "123k4567";
        // checkQQ(qq);
        String regex = "[1-9][0-9]{4,14}";//正则表达式。
        // boolean b = qq.matches(regex);
        // System.out.println(qq+":"+b);
        // String str = "aoooooooob";
        // String reg = "ao{4,6}b";
        // boolean b = str.matches(reg);
        // System.out.println(str+":"+b);
    }
    /*
    * 需求：定义一个功能对QQ号进行校验。
    * 要求：长度5~15. 只能是数字， 0不能开头
    */
    public static void checkQQ(String qq){
        int len = qq.length();
        if(len>=5 && len<=15){
            if(!qq.startsWith("0")){
                try {
                    long l = Long.parseLong(qq);
                    System.out.println(l+":正确");
                }catch(NumberFormatException e){
                    System.out.println(qq+":含有非法字符");
                }
            }else{
                System.out.println(qq+":不能0开头");
            }
        }else{
            System.out.println(qq+":长度错误");
        }
    }
}
```

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class RegexDemo2 {
    /**
    * @param args
    */
    public static void main(String[] args) {
        /*
    * 正则表达式对字符串的常见操作:
    * 1, 匹配。
    * 其实使用的就是String类中的matches方法。
    *
    * 2，切割。
    * 其实使用的就是String类中的split方法。
    *
    * 3，替换。
    * 其实使用的就是String类中的replaceAll()方法。
    *
    * 4，获取。
    *
    */
        functionDemo_4();
    }
    /*
    * 获取
    * 将正则规则进行对象的封装。
    * Pattern p = Pattern.compile("a*b");
    * //通过正则对象的matcher方法字符串相关联。获取要对字符串操作的匹配器对象Matcher .
    * Matcher m = p.matcher("aaaaab");
    * //通过Matcher匹配器对象的方法对字符串进行操作。
    * boolean b = m.matches();
    */
    public static void functionDemo_4() {
        String str = "da jia hao,ming tian bu fang jia!";
        String regex = "\\b[a-z]{3}\\b";
        //1,将正则封装成对象。
        Pattern p = Pattern.compile(regex);
        //2, 通过正则对象获取匹配器对象。
        Matcher m = p.matcher(str);
        //使用Matcher对象的方法对字符串进行操作。
        //既然要获取三个字母组成的单词
        //查找。 find();
        System.out.println(str);
        while(m.find()){
            System.out.println(m.group());//获取匹配的子序列
            System.out.println(m.start()+":"+m.end());
        }
    }
    /*
    * 替换
    */
    public static void functionDemo_3() {
        String str = "zhangsanttttxiaoqiangmmmmmmzhaoliu";
        str = str.replaceAll("(.)\\1+", "$1");
        System.out.println(str);
        String tel = "15800001111"; //158****1111;
        tel = tel.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2");
        System.out.println(tel);
    }
    /*
    * 切割。
    *
    * 组： ((A)(B(C)))
    */
    public static void functionDemo_2(){
        String str = "zhangsanttttxiaoqiangmmmmmmzhaoliu";
        String[] names = str.split("(.)\\1+"); //str.split("\\.");
        for(String name : names){
            System.out.println(name);
        }
    }
    /*
    * 演示匹配。
    */
    public static void functionDemo_1(){
        //匹配手机号码是否正确。
        String tel = "15800001111";
        String regex = "1[358]\\d{9}";
        boolean b = tel.matches(regex);
        System.out.println(tel+":"+b);
    }
}
```



## 枚举类型

https://www.liaoxuefeng.com/wiki/1252599548343744/1260473188087424

为了让编译器能自动检查某个值在枚举的集合内，并且，不同用途的枚举需要不同的类型来标记，不能混用，我们可以使用`enum`来定义枚举类。

Demo:

```java
public enum Color {
    RED, GREEN, BLUE;
}
```

编译出的 class 大概是这样的：

```java
public final class Color extends Enum { // 继承自Enum，标记为final class
    // 每个实例均为全局唯一:
    public static final Color RED = new Color();
    public static final Color GREEN = new Color();
    public static final Color BLUE = new Color();
    // private构造方法，确保外部无法调用new操作符:
    private Color() {}
}
```

编译后的`enum`类和普通`class`并没有任何区别。但是我们自己无法按定义普通`class`那样来定义`enum`，必须使用`enum`关键字，这是Java语法规定的。

因为`enum`是一个`class`，每个枚举的值都是`class`实例，因此，这些实例有一些方法：

```java
// name()
String s = Color.RED.name(); // "RED"

// ordinal() 返回定义的常量的顺序，从0开始计数
int n = Color.RED.ordinal(); 
```

```java
public class Main {
    public static void main(String[] args) {
        Weekday day = Weekday.SUN;
        if (day.dayValue == 6 || day.dayValue == 0) {
            System.out.println("Today is " + day + ". Work at home!");
        } else {
            System.out.println("Today is " + day + ". Work at office!");
        }
    }
}

enum Weekday {
    MON(1, "星期一"), TUE(2, "星期二"), WED(3, "星期三"), THU(4, "星期四"), FRI(5, "星期五"), SAT(6, "星期六"), SUN(0, "星期日");

    public final int dayValue;
    private final String chinese;

    private Weekday(int dayValue, String chinese) {
        this.dayValue = dayValue;
        this.chinese = chinese;
    }

    @Override
    public String toString() {
        return this.chinese;
    }
}
```

