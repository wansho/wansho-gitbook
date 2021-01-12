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
```

```java
// new 二维数组
int[][] arr = new int[3][2];
System.out.println(arr.length);
System.out.println(arr[1].length);
int[][] arr = new int[3][];

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
new Car();//匿名对象。其实就是定义对象的简写格式。
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
2. static 修饰的成员被所有的对象所共享
3. static 优先于对象存在，因为static的成员随着类的加载就已经存在了
4. static 修饰的成员多了一种调用方式，就可以直接被类名所调用 。 类名.静态成员 
5. static 修饰的数据是共享数据，对象中的存储的是特有数据

**静态成员变量的特点**

1. 静态变量随着类的加载而存在，随着类的消失而消失
2. 静态成员（函数和变量）既可以被对象调用（这种方式在 Java 高版本中不提倡），还可以被类名调用
3. 静态变量称为**类变量**  
4. 静态变量数据存储在方法区(共享数据区)的静态区，所以也叫对象的共享数据

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

注意，抽象类可以又构造函数，用于给子类进行初始化。抽象类也可以不定义抽象方法。

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
3. final：

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

1. final是一个修饰符，可以修饰类，方法，变量。
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
简单说：就是一个对象对应着不同类型.

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
   简单说：编译看左边，运行看右边。
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
        
        //直接访问外部类中的内部类中的成员。
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

匿名内部类， 就是内部类的简写格式。其实就是一个匿名子类对象。
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

在java中用类的形式对不正常情况进行了描述和封装对象。描述不正常的情况的类，就称为异常类。  

**以前正常流程代码和问题处理代码相结合，现在将正常流程代码和问题处理代码分离。提高阅读性。其实异常就是java通过面向对象的思想将问题封装成了对象。用异常类对其进行描述。不同的问题用不同的类进行具体的描述。 比如角标越界、 空指针等等。**
问题很多，意味着描述的类也很多，将其共性进行向上抽取，形成了异常体系。 

**异常的共性：Throwable**

无论是error，还是异常，问题，问题发生就应该可以抛出，让调用者知道并处理。
//该体系的特点就在于Throwable及其所有的子类都具有可抛性。
可抛性到底指的是什么呢？怎么体现可抛性呢？其实是通过两个关键字来体现的。throws throw ,凡是可以被这两个关键字所操作的类和对象都具备可抛性.  

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
catch(异常类 变量)//该变量用于接收发生的异常对象
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
2. 如果调用到了声明异常的函数，要么trycatch要么throws，否则编译失败。
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
    public int method(int[] arr,int index)//throws NullPointerException,FuShuIndexException
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
    public void run()throws LanPingException,MaoYanException
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
    public void prelect()throws NoPlanException // 没有 catch 的异常则抛出
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
4. 类名的全称是：包名.类名
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

编译 java 源文件生成的 class 文件，都放在 classpath 中，以起到源文件与 class 文件隔离的作用。

### 包的封装作用和四种权限

包是对类的进一步封装。既然封装了，那么就涉及到外部的访问问题。在包中，只有 `public class` 才是外部可以访问的 class，不是 public 的 class 都被包封装了。

注意：对外暴露的 public 的 class，其类名要与文件名保持一致。在 public class 中对外暴露的函数也应该是 public 的（默认权限也是封装！）

包与包之间的访问，通过 `public` 和 `protected` 关键字来约束。

不同包不允许访问，但如果你是我们的儿子，那么就可以网开一面：`protected`，**不叫爹不行！**提供给不同包中的子类。

 protected 关键字将对象保护在同包中，不同包无法调用 protected 的对象。

**java 四种权限**

|          | public | protected | default | private |
| -------- | ------ | --------- | ------- | ------- |
| 同一类中 | ok     | ok        | ok      | ok      |
| 同一包中 | ok     | ok        | ok      | 封装    |
| 子类中   | ok     | ok        | 封装    | 封装    |
| 不同包中 | ok     | 封装      | 封装    | 封装    |

总结：包与包之间的类进行访问，被访问的包中的类必须是 public 的，被访问的包中的类的方法也必须是 public 的。 

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

就是将临界区封装起来，当有线程在执行这些代码的时候，其他线程时不可以参与运算的。必须要当前线程把这些代码都执行完毕后，其他线程才可以参与运算。在java中，用同步代码块就可以解决这个问题。同步代码块的格式：

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



### StringBuffer / StringBuilder

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



## 集合



### 通用的方法

```java
package com.wansho.hellojava;

import java.util.ArrayList;
import java.util.Collection;
public class CollectionDemo {
    /**
     * @param args
     */
    public static void main(String[] args) {
        Collection coll = new ArrayList();
        // show(coll);
        Collection c1 = new ArrayList();
        Collection c2 = new ArrayList();
        show(c1,c2);
    }
    public static void show(Collection c1,Collection c2){
        //给c1添加元素。
        c1.add("abc1");
        c1.add("abc2");
        c1.add("abc3");
        c1.add("abc4");
        //给c2添加元素。
        c2.add("abc1");
        c2.add("abc2");
        c2.add("abc3");
        c2.add("abc4");
        c2.add("abc5");
        System.out.println("c1:"+c1); // c1:[abc1, abc2, abc3, abc4]
        System.out.println("c2:"+c2);
        //演示addAll
        c1.addAll(c2);//将c2中的元素添加到c1中。
        //演示removeAll
        // boolean b = c1.removeAll(c2); // 将两个集合中的相同元素从调用removeAll的集合中删除。
        // System.out.println("removeAll:"+b);
        //演示containsAll
        boolean b = c1.containsAll(c2);
        System.out.println("containsAll:"+b);
        //演示retainAll
        // b = c1.retainAll(c2); // 取交集，保留和指定的集合相同的元素，而删除不同的元素。
        //和removeAll功能相反 。
        // System.out.println("retainAll:"+b);
        System.out.println("c1:"+c1);
    }
    public static void show(Collection coll){
        //1,添加元素。 add.
        coll.add("abc1");
        coll.add("abc2");
        coll.add("abc3");
        System.out.println(coll);
        //2，删除元素。 remove
        // coll.remove("abc2");//会改变集合的长度
        //清空集合.
        // coll.clear();
        System.out.println(coll.contains("abc3"));
        System.out.println(coll);
    }
}
```



### Iterator  迭代器

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
public class IteratorDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        Collection coll = new ArrayList();
        coll.add("abc1");
        coll.add("abc2");
        coll.add("abc3");
        coll.add("abc4");
        // System.out.println(coll);
        //使用了Collection中的iterator()方法。 调用集合中的迭代器方法，是为了获取集合中的迭代器对象。
        // Iterator it = coll.iterator();
        // while(it.hasNext()){
        // System.out.println(it.next());
        // }
        for(Iterator it = coll.iterator(); it.hasNext(); ){
            System.out.println(it.next());
        }
        // System.out.println(it.next());
        // System.out.println(it.next());
        // System.out.println(it.next()); // java.util.NoSuchElementException
    }
}
```



### List

**ArrayList**

```java
import java.util.ArrayList;
import java.util.List;
public class ListDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        List list = new ArrayList();
        show(list);
    }
    public static void show(List list) {
        //添加元素
        list.add("abc1");
        list.add("abc2");
        list.add("abc3");
        System.out.println(list);
        //插入元素。
        // list.add(1,"abc9");
        //删除元素。
        // System.out.println("remove:"+list.remove(2));
        //修改元素。
        // System.out.println("set:"+list.set(1, "abc8"));
        //获取元素。
        // System.out.println("get:"+list.get(0));
        //获取子列表。
        // System.out.println("sublist:"+list.subList(1, 2));
        System.out.println(list);
    }
}
```

```java
package com.wansho.hellojava;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
public class ListDemo2 {
    /**
     * @param args
     */
    public static void main(String[] args) {
        List list = new ArrayList();
        // show(list);
        list.add("abc1");
        list.add("abc2");
        list.add("abc3");
        System.out.println("list:"+list);
        ListIterator it = list.listIterator();//获取列表迭代器对象
        //它可以实现在迭代过程中完成对元素的增删改查。
        //注意：只有list集合具备该迭代功能.
        while(it.hasNext()){
            Object obj = it.next();
            if(obj.equals("abc2")){
                it.set("abc9"); // 改
            }
        }
        System.out.println("hasNext:"+it.hasNext());
        System.out.println("hasPrevious:"+it.hasPrevious());
        while(it.hasPrevious()){
            System.out.println("previous:"+it.previous());
        }
        System.out.println("list:"+list);
        show(list);
        Iterator itt = list.iterator();
        while(itt.hasNext()) {
            Object obj = it.next();//java.util.ConcurrentModificationException
            //在迭代器过程中，不要使用集合操作元素，容易出现异常。
            //可以使用Iterator接口的子接口ListIterator来完成在迭代中对元素进行更
            //多的操作。
            if (obj.equals("abc2")) {
                list.add("abc9");
            } else {
                System.out.println("next:" + obj);
            }
            System.out.println(list);
        }
    }
    public static void show(List list) {
        list.add("abc1");
        list.add("abc2");
        list.add("abc3");
        list.add("abc4");
        Iterator it = list.iterator();
        while(it.hasNext()){
            System.out.println("next:"+it.next());
        }
        //list特有的取出元素的方式之一。
        for(int x=0; x<list.size(); x++){
            System.out.println("get:"+list.get(x));
        }
    }
}
```

**Vector** 

```java
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Vector;

public class VectorDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        Vector v = new Vector();
        v.addElement("abc1");
        v.addElement("abc2");
        v.addElement("abc3");
        v.addElement("abc4");
        Enumeration en = v.elements();
        while(en.hasMoreElements()){
            System.out.println("nextelment:"+en.nextElement());
        }
        Iterator it = v.iterator();
        while(it.hasNext()){
            System.out.println("next:"+it.next());
        }
    }
}
```

**LinkedList**  

```java
import java.util.Iterator;
import java.util.LinkedList;
public class LinkedListDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        LinkedList link = new LinkedList();
        link.addFirst("abc1");
        link.addFirst("abc2");
        link.addFirst("abc3");
        link.addFirst("abc4");
        // System.out.println(link);
        // System.out.println(link.getFirst());//获取第一个但不删除。
        // System.out.println(link.getFirst());
        // System.out.println(link.removeFirst());//获取元素但是会删除。
        // System.out.println(link.removeFirst());
        while(!link.isEmpty()){
            System.out.println(link.removeLast());
        }
        System.out.println(link);
        // Iterator it = link.iterator();
        // while(it.hasNext()){
        // System.out.println(it.next());
        // }
    }
}
```

### Set

**HashSet**

HashSet 首先是一个 Set。

```java
import java.util.HashSet;
import java.util.Iterator;

public class HashSetDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        HashSet hs = new HashSet();
        hs.add("hehe");
        // hs.add("heihei");
        hs.add("hahah");
        hs.add("xixii");
        hs.add("hehe");
        Iterator it = hs.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
}
```

```java
package com.wansho.hellojava;

import java.util.HashSet;
import java.util.Iterator;

class Person{
    private String name;
    private int age;
    Person(String name, int age){
        this.name = name;
        this.age = age;
    }

    public String getName(){
        return this.name;
    }

    public int getAge(){
        return this.age;
    }


    @Override
    public int hashCode() {
        return name.hashCode() + age * 37; // hash 加盐，防止冲突
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj){ // 先判断一次内存地址，防止一个对象传入两次
            return true;
        }
        if(!(obj instanceof Person)){ // 健壮性判断
            throw new ClassCastException("类型不对");
        }
        Person p = (Person)obj;
        if((p.name.equals(this.name)) && (p.age==this.age)){ // 此处存疑， name 和 age 都是封装的，为什么可以直接调用？
            return true;
        }
        return false;
    }
}


/*
 * 往hashSet集合中存储Person对象。如果姓名和年龄相同，视为同一个人。视为相同元素。
 */
public class HashSetTest {
    public static void main(String[] args) {
        HashSet hs = new HashSet();
        /*
         * HashSet集合数据结构是哈希表，所以存储元素的时候，
         * 使用的元素的 hashCode 方法来确定位置，如果位置相同，在通过元素的equals来确定是否相同。
         *
         */
        hs.add(new Person("lisi4",24));
        hs.add(new Person("lisi7",27));
        hs.add(new Person("lisi1",21));
        hs.add(new Person("lisi9",29));
        hs.add(new Person("lisi7",27));
        Iterator it = hs.iterator();
        while(it.hasNext()){
            Person p = (Person)it.next();
            System.out.println(p);
            System.out.println(p.getName()+"...."+p.getAge());
        }
    }
}
```

// 此处存疑， name 和 age 都是封装的，为什么可以直接调用？

**LinkedHashSet**

LinkedHashSet 是 hashset 的子类，其能保证对象的插入顺序

```java
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;

public class LinkedHashSetDemo {
    public static void main(String[] args) {
        HashSet hs = new LinkedHashSet();
        hs.add("hahah");
        hs.add("hehe");
        hs.add("heihei");
        hs.add("xixii");
        // hs.add("hehe");
        Iterator it = hs.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
    /*
     *
     * hahah
     * hehe
     * heihei
     * xixii 顺序不变
     * */
}
```

**TreeSet Comparator**

TreeSet 是有顺序的 Set。

基于 TreeMap 的 NavigableSet 实现。使用元素的自然顺序对元素进行排序，或者根据创建 set 时提供的 Comparator进行排序，具体取决于使用的构造方法。

Comparator 接口：

a negative integer, zero, or a positive integer as the first argument is less than, equal to, or greater than the second.

```java
package com.wansho.hellojava;

import java.util.Comparator;
import java.util.Iterator;
import java.util.TreeSet;

/**
 * 创建了一个根据Person类的 name 进行排序的比较器。
 */
class ComparatorByName implements Comparator {
    @Override
    public int compare(Object o1, Object o2) {
        Person p1 = (Person)o1;
        Person p2 = (Person)o2;
        int temp = p1.getName().compareTo(p2.getName());
        return temp==0?p1.getAge()-p2.getAge(): temp;
        // return 1;//有序。
    }
}
public class TreeSetDemo {
    public static void main(String[] args) {
        TreeSet ts = new TreeSet(new ComparatorByName());
        /*
         * 以 Person 对象年龄进行从小到大的排序。
         *
         */
        ts.add(new Person("zhangsan",28));
        ts.add(new Person("lisi",21));
        ts.add(new Person("zhouqi",29));
        ts.add(new Person("zhouqi",25));
        ts.add(new Person("wangu",24));
        Iterator it = ts.iterator();
        while(it.hasNext()){
            Person p = (Person)it.next();
            System.out.println(p.getName()+":"+p.getAge());
        }
        System.out.println("------------------");
        demo1();
    }
    public static void demo1() {
        TreeSet ts = new TreeSet();
        ts.add("abc");
        ts.add("zaa");
        ts.add("aa");
        ts.add("nba");
        ts.add("cba");
        Iterator it = ts.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
}

/*
lisi:21
wangu:24
zhangsan:28
zhouqi:25
zhouqi:29
------------------
aa
abc
cba
nba
zaa
*/
```

```java
import java.util.Comparator;
import java.util.Iterator;
import java.util.TreeSet;

/*
定义一个按长度作比较的比较器
*/
class ComparatorByLength implements Comparator {
    @Override
    public int compare(Object o1, Object o2) {
        String s1 = (String)o1;
        String s2 = (String)o2;
        int temp = s1.length()-s2.length();
        return temp==0? s1.compareTo(s2): temp; // 三木运算符，
    }
}
/*
 * 对字符串进行长度排序。
 *
 * "20 18 -1 89 2 67"
 */
public class TreeSetTest {
    public static void main(String[] args) {
        TreeSet ts = new TreeSet(new ComparatorByLength());
        ts.add("aaaaa");
        ts.add("zz");
        ts.add("nbaq");
        ts.add("cba");
        ts.add("abc");
        Iterator it = ts.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
}
```

**另一种实现 Comparable 的方法：让对象实现 Comparable**

```java
public class Person /*extends Object*/ implements Comparable {
    private String name;
    private int age;
    public Person() {
        super();
    }
    public Person(String name, int age) {
        super();
        this.name = name;
        this.age = age;
    }
    @Override
    public int hashCode() {
        return name.hashCode()+age*27;
    }
    @Override
    public boolean equals(Object obj) {
        if(this == obj)
            return true;
        if(!(obj instanceof Person))
            throw new ClassCastException("类型错误");
        Person p = (Person)obj;
        return this.name.equals(p.name) && this.age == p.age;
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
    public String toString(){
        return name+":"+age;
    }
    @Override
    public int compareTo(Object o) {
        Person p = (Person)o;
        int temp = this.age-p.age;
        return temp==0?this.name.compareTo(p.name):temp;
    }
}
```

### List Set 总结

* 集合类的使用场景：

  对象用于封装特有数据，对象多了需要存储，如果对象的个数不确定。就使用集合容器进行存储。

* 集合特点

  * 用于存储对象的容器
  * 集合的长度是可变的
  * 集合中不可以存储基本数据类型值（但是能存储包装类）

* 集合容器因为内部的数据结构不同，有多种具体容器。不断的向上抽取，就形成了集合框架。

  * 框架的顶层Collection接口

    ```java
    /*
    Collection的常见方法：
    1，添加。
        boolean add(Object obj):
        boolean addAll(Collection coll):
    2，删除。
        boolean remove(object obj):
        boolean removeAll(Collection coll);
        void clear();
    3，判断：
        boolean contains(object obj):
        boolean containsAll(Colllection coll);
        boolean isEmpty():判断集合中是否有元素。
    4，获取：
        int size():
        Iterator iterator() 取出元素的方式：迭代器。
        该对象必须依赖于具体容器，因为每一个容器的数据结构都不同。
        所以该迭代器对象是在容器中进行内部实现的。
        对于使用容器者而言，具体的实现不重要，只要通过容器获取到该实现的迭代器的对象即可，
        也就是iterator方法。
        Iterator接口就是对所有的Collection容器进行元素取出的公共接口。
        其实就是抓娃娃游戏机中的夹子！
    5，其他：
        boolean retainAll(Collection coll); 取交集。
        Object[] toArray(); 将集合转成数组。
    */
    
    ```

  * Collection
    |--List：有序(存入和取出的顺序一致),元素都有索引(角标)，元素可以重复。
    |--Set：元素不能重复,无序。  

  * List

    ```java
    /*
    List:特有的常见方法：有一个共性特点就是都可以操作角标。
    1，添加
        void add(index, element);
        void add(index, collection);
    2，删除；
    	Object remove(index):
    3，修改：
    	Object set(index,element);
    4，获取：
        Object get(index);
        int indexOf(object);
        int lastIndexOf(object);
        List subList(from,to);
        
    list集合是可以完成对元素的增删改查。
    List:
    |--Vector:内部是数组数据结构，是同步的。增删，查询都很慢！
    |--ArrayList:内部是数组数据结构，是不同步的。替代了Vector。查询的速度快。
    |--LinkedList:内部是链表数据结构，是不同步的。增删元素的速度很快。
    
    LinkedList:
        addFirst();
        addLast():
        jdk1.6
        offerFirst();
        offetLast();
        getFirst();.//获取但不移除，如果链表为空，抛出NoSuchElementException.
        getLast();
        jdk1.6
        peekFirst();//获取但不移除，如果链表为空，返回null.
        peekLast():
        removeFirst();//获取并移除，如果链表为空，抛出NoSuchElementException.
        removeLast();
        jdk1.6
        pollFirst();//获取并移除，如果链表为空， 返回null.
        pollLast(); 
    
    */
    ```

  * Set

    ```java
    /*
    Set接口中的方法和Collection一致。
    |--HashSet: 内部数据结构是哈希表 ，是不同步的。
        如何保证该集合的元素唯一性呢？
        是通过对象的hashCode和equals方法来完成对象唯一性的。
        如果对象的hashCode值不同，那么不用判断equals方法，就直接存储到哈希表中。
        如果对象的hashCode值相同，那么要再次判断对象的equals方法是否为true。
        如果为true，视为相同元素，不存。如果为false，那么视为不同元素，就进行存储。
        
        记住：如果元素要存储到HashSet集合中，必须覆盖 hashCode 方法和 equals 方法。
        一般情况下，如果定义的类会产生很多对象，比如人，学生，书，通常都需要覆盖equals， hashCode
        方法。
    
    |--TreeSet:可以对Set集合中的元素进行排序。是不同步的。
        判断元素唯一性的方式：就是根据比较方法的返回结果是否是0，是0，就是相同元素，不存。
        TreeSet对元素进行排序的方式一：(方法一更直观，更符合直觉)
        	让元素自身具备比较功能，元就需要实现Comparable接口。覆盖compareTo方法。
        	如果不要按照对象中具备的自然顺序进行排序。如果对象中不具备自然顺序。怎么办？
        可以使用TreeSet集合第二种排序方式二：
        	让集合自身具备比较功能，定义一个类实现Comparator接口，覆盖compare方法。
        	将该类对象作为参数传递给TreeSet集合的构造函数。
        
    if(this.hashCode()== obj.hashCode() && this.equals(obj))
    哈希表确定元素是否相同
    1，判断的是两个元素的哈希值是否相同。
    如果相同，在判断两个对象的内容是否相同。
    2，判断哈希值相同，其实判断的是对象的hashCode的方法。判断内容相同，用的是equals方法。
    注意：如果哈希值不同，是不需要判断equals。
    */
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
        int temp = o1.getName().compareTo(o2.getName());163
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



### Map

**Map vs Collection**

1. Map中一次存储是键值对。Collection中一次存储是单个元素。
2. Map的存储使用的put方法。Collection存储使用的是add方法。
3. Map的取出，是讲Map转成Set，在使用迭代器取出。
   Collection取出，使用就是迭代器。
4. 如果对象很多，必须使用容器存储。
   如果元素存在着映射关系，可以优先考虑使用Map存储或者用数组，如果没有映射关系，可以使用Collection存储。  

**Map Demo**

```java
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
public class MapDemo {
    public static void main(String[] args) {
        Map<Integer, String> map = new HashMap<Integer, String>();
        method_2(map);
    }
    public static void method_2(Map<Integer,String> map){
        map.put(8,"zhaoliu");
        map.put(2,"zhaoliu");
        map.put(2,"zhaoliu");
        map.put(6,"wangcai");
        Collection<String> values = map.values();
        Iterator<String> it2 = values.iterator();
        while(it2.hasNext()){
            System.out.println(it2.next());
        }
        /*
        * 通过 Map 转成 set 就可以迭代。
        * 找到了另一个方法。 entrySet。
        * 该方法将键和值的映射关系作为对象存储到了Set集合中，而这个映射关系的类型就是 Map.Entry(内部类)
        * 类型(结婚证)
        */
        Set<Map.Entry<Integer, String>> entrySet = map.entrySet();
        Iterator<Map.Entry<Integer, String>> it = entrySet.iterator();
        while(it.hasNext()){
            Map.Entry<Integer, String> me = it.next();
            Integer key = me.getKey();
            String value = me.getValue();
            System.out.println(key+"::::"+value);
        }
        //取出 map 中的所有元素。
        //原理，通过 keySet方法获取map中所有的键所在的Set集合，在通过Set的迭代器获取到每一个键，
        //在对每一个键通过map集合的get方法获取其对应的值即可。
        Set<Integer> keySet = map.keySet();
        Iterator<Integer> it = keySet.iterator();
        while(it.hasNext()){
            Integer key = it.next();
            String value = map.get(key);
            System.out.println(key+":"+value);
        }    
    }
    
    public static void method(Map<Integer,String> map){//学号和姓名
        // 添加元素。
        System.out.println(map.put(100, "wangcai")); //null
        System.out.println(map.put(100, "xiaoqiang")); //wangcai 存相同键，值会覆盖。
        map.put(2,"zhangsan");
        map.put(7,"zhaoliu");
        //删除。
        // System.out.println("remove:"+map.remove(2));
        //判断。
        // System.out.println("containskey:"+map.containsKey(7));
        //获取。
        System.out.println("get:"+map.get(6));
        System.out.println(map);
        Outer.Inner.show();
    }
}

interface MyMap{
    public static interface MyEntry{//内部接口
        void get();
    }
}
class MyDemo implements MyMap.MyEntry{
    public void get(){}
}
class Outer{
    static class Inner{
        static void show(){}
    }
}
```

**HashMap**

```java
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;
import cn.itcast.p2.bean.Student;

public class HashMapDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        /*
        * 将学生对象和学生的归属地通过键与值存储到map集合中。
        */
        HashMap<Student,String> hm = new HashMap<Student,String>();
        hm.put(new Student("lisi",38), "北京");
        hm.put(new Student("zhaoliu",24), "上海");
        hm.put(new Student("xiaoqiang",31), "沈阳");
        hm.put(new Student("wangcai",28), "大连");
        hm.put(new Student("zhaoliu",24), "铁岭");
        // Set<Student> keySet = hm.keySet();
        // Iterator<Student> it = keySet.iterator();
        Iterator<Student> it = hm.keySet().iterator();
        while(it.hasNext()){
            Student key = it.next();
            String value = hm.get(key);
            System.out.println(key.getName()+":"+key.getAge()+"---"+value);
        }
    }
}
```

**TreeMap**

```java
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;
import cn.itcast.p2.bean.Student;
import cn.itcast.p3.comparator.ComparatorByName;
public class TreeMapDemo {
    /**
* @param args
*/
    public static void main(String[] args) {
        TreeMap<Student,String> tm = new TreeMap<Student,String>(new ComparatorByName());
        tm.put(new Student("lisi",38),"北京");
        tm.put(new Student("zhaoliu",24),"上海");
        tm.put(new Student("xiaoqiang",31),"沈阳");
        tm.put(new Student("wangcai",28),"大连");
        tm.put(new Student("zhaoliu",24),"铁岭");
        Iterator<Map.Entry<Student, String>> it = tm.entrySet().iterator();
        while(it.hasNext()){
            Map.Entry<Student,String> me = it.next();
            Student key = me.getKey();
            String value = me.getValue();
            System.out.println(key.getName()+":"+key.getAge()+"---"+value);
        }
    }
}
```

**LinkedHashMap**

按照顺序存储。

```java
import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        File f= null;
        HashMap<Integer,String> hm = new LinkedHashMap<Integer,String>();
        hm.put(7, "zhouqi");
        hm.put(3, "zhangsan");
        hm.put(1, "qianyi");
        hm.put(5, "wangwu");
        Iterator<Map.Entry<Integer,String>> it = hm.entrySet().iterator();
        while(it.hasNext()){
            Map.Entry<Integer,String> me = it.next();
            Integer key = me.getKey();
            String value = me.getValue();
            System.out.println(key+":"+value);
        }
    }
}
```

**Map 练习**

```java
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;
/*
* 练习:
* "fdgavcbsacdfs" 获取该字符串中，每一个字母出现的次数。
* 要求打印结果是： a(2)b(1)...;
* 思路：
* 对于结果的分析发现，字母和次数之间存在着映射的关系。而且这种关系很多。
* 很多就需要存储，能存储映射关系的容器有数组和Map集合。
* 关系一方式有序编号吗？没有！
* 那就是使用Map集合。 又发现可以保证唯一性的一方具备着顺序如 a b c ...
* 所以可以使用TreeMap集合。
*
* 这个集合最终应该存储的是字母和次数的对应关系。
*
* 1，因为操作的是字符串中的字母，所以先将字符串变成字符数组。
* 2，遍历字符数组，用每一个字母作为键去查Map集合这个表。
* 如果该字母键不存在，就将该字母作为键 1作为值存储到map集合中。
* 如果该字母键存在，就将该字母键对应值取出并+1，在将该字母和+1后的值存储到map集合中，
* 键相同值会覆盖。这样就记录住了该字母的次数.
* 3，遍历结束， map集合就记录所有字母的出现的次数。 
*/
public class MapTest {
    /**
    * @param args
    */
    public static void main(String[] args) {
        String str = "fdg+avAdc bs5dDa9c-dfs";
        String s = getCharCount(str);
        System.out.println(s);
    }
    public static String getCharCount(String str) {
        //将字符串变成字符数组
        char[] chs = str.toCharArray();
        //定义map集合表。
        Map<Character,Integer> map = new TreeMap<Character,Integer>();
        for (int i = 0; i < chs.length; i++) {
            if(!(chs[i]>='a' && chs[i]<='z' || chs[i]>='A' && chs[i]<='Z'))
                // if(!(Character.toLowerCase(chs[i])>='a' &&  Character.toLowerCase(chs[i])<='z'))
                continue;
            //将数组中的字母作为键去查map表。
            Integer value = map.get(chs[i]);
            int count = 1;
            //判断值是否为null.
            if(value!=null){
                count = value+1;
            }
            // count++;
            map.put(chs[i], count);
            /*
            if(value==null){
                map.put(chs[i], 1);
                }else{
                map.put(chs[i], value+1);
            }
            */
        }
        return mapToString(map);
    }
    private static String mapToString(Map<Character, Integer> map) {
        StringBuilder sb = new StringBuilder();
        Iterator<Character> it = map.keySet().iterator();
        while(it.hasNext()){
            Character key = it.next();
            Integer value = map.get(key);
            sb.append(key+"("+value+")");
        }
        return sb.toString();
    }
}
```

### Collections

Collections：是集合框架的工具类。（集合工具类）

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.TreeSet;

public class CollectionsDemo {
    public static void main(String[] args) {
        /*
        * Collections：是集合框架的工具类。
        * 里面的方法都是静态的。
        */
        demo_4();
    }
    
    // List
    public static void demo_4() { 
        List<String> list = new ArrayList<String>();
        list.add("abcde");
        list.add("cba");
        list.add("zhangsan");
        list.add("zhaoliu");
        list.add("xiaoqiang");
        System.out.println(list);
        Collections.replaceAll(list, "cba", "nba"); // set(indexOf("cba"),"nba");
        Collections.shuffle(list); 
        Collections.fill(list, "cc"); // eplaces all of the elements of the specified list with the specified element.
        System.out.println(list);
    }
    
    // Set
    public static void demo_3() {
        /*
        TreeSet<String> ts = new TreeSet<String>(new Comparator<String>(){
        @Override
        public int compare(String o1, String o2) {
        int temp = o2.compareTo(o1);
        return temp;
        }
        });
        */
        TreeSet<String> ts = new TreeSet<String>(Collections.reverseOrder(new ComparatorByLength())); // Returns a comparator that imposes the reverse of the natural ordering on a collection of objects that implement the Comparable interface. 
        ts.add("abc");
        ts.add("hahaha");
        ts.add("zzz");
        ts.add("aa");
        ts.add("cba");
        System.out.println(ts);
    }
    
    // List
    public static void demo_2(){
        List<String> list = new ArrayList<String>();
        list.add("abcde");
        list.add("cba");
        list.add("aa");
        list.add("zzz");
        list.add("cba");
        list.add("nbaa");
        Collections.sort(list); // Sorts the specified list into ascending order, according to the natural ordering of its elements.
        System.out.println(list);
        int index = Collections.binarySearch(list, "cba");
        System.out.println("index="+index);
        //获取最大值。
        String max = Collections.max(list,new ComparatorByLength());
        System.out.println("max="+max);
    }
    
    // List
    public static void demo_1(){
        List<String> list = new ArrayList<String>();
        list.add("abcde");
        list.add("cba");
        list.add("aa");
        list.add("zzz");
        list.add("cba");
        list.add("nbaa");
        System.out.println(list);
        // 对list集合进行指定顺序的排序。
        // Collections.sort(list);
        // mySort(list);
        // mySort(list,new ComparatorByLength());
        Collections.sort(list, new ComparatorByLength());
        System.out.println(list);
    }
    
    public static <T> void mySort(List<T> list, Comparator<? super T> comp){
        for (int i = 0; i < list.size()-1; i++) {
            for (int j = i+1; j < list.size(); j++) {
                if(comp.compare(list.get(i), list.get(j))>0){
                    // T temp = list.get(i);
                    // list.set(i, list.get(j));
                    // list.set(j, temp);
                    Collections.swap(list, i, j); // 交换 List 的值
                }
            }
        }
    }
    
    public static <T extends Comparable<? super T>> void mySort(List<T> list){
        for (int i = 0; i < list.size()-1; i++) {
            for (int j = i+1; j < list.size(); j++) {
                if(list.get(i).compareTo(list.get(j))>0){
                    // T temp = list.get(i);
                    // list.set(i, list.get(j));
                    // list.set(j, temp);
                    Collections.swap(list, i, j);
                }
            }
        }
    }
}
```



### Arrays

数组工具类。

```java
package com.wansho.hellojava;

import java.util.Arrays;
import java.util.List;

//数组转成集合。
public class ArraysDemo {
    /**
     * @param args
     */
    public static void main(String[] args) {
        /*
         * Arrays：集合框架的工具类。里面的方法都是静态的。
         */
        // int[] arr = {3,1,5,6,3,6};
        // System.out.println(Arrays.toString(arr));
        demo_2();
        demo_1();
    }
    public static void demo_2() {
        /*
         * 如果数组中的元素是对象，那么转成集合时，直接将数组中的元素作为集合中的元素进行集合存储。
         *
         * 如果数组中的元素是基本类型数值，那么会将该数组作为集合中的元素进行存储。
         */
        int[] arr = {31,11,51,61};
        List<int[]> list = Arrays.asList(arr);
        System.out.println(list.size()); // 1
    }

    public static void demo_1() {
        /*
         * 重点： List asList(数组)将数组转成集合。
         *
         * 好处：其实可以使用集合的方法操作数组中的元素。
         * 注意：数组的长度是固定的，所以对于集合的增删方法是不可以使用的
         * 否则会发生UnsupportedOperationException
         */
        String[] arr = {"abc","haha","xixi"};
        boolean b = myContains(arr, "xixi");
        System.out.println("contains:"+b);
        List<String> list = Arrays.asList(arr); // Returns a fixed-size list backed by the specified array.
        boolean b1 = list.contains("xixi");
        System.out.println("list contaisn:="+b1);
        // list.add("hiahia"); // UnsupportedOperationException
        System.out.println(list);
    }

    public static boolean myContains(String[] arr, String key){
        for (int i = 0; i < arr.length; i++) {
            if(arr[i].equals(key))
                return true;
        }
        return false;
    }
    //toString的经典实现。
    public static String myToString(int[] a){
        int iMax = a.length - 1;
        if (iMax == -1)
            return "[]";
        StringBuilder b = new StringBuilder();
        b.append('[');
        for (int i = 0; ; i++) {//中间省略条件判断，提高了效率。
            b.append(a[i]);
            if (i == iMax)
                return b.append(']').toString();
            b.append(", ");
        }
    }
}

```

### 其他

#### 集合转数组：toArray()

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
public class ToArray {
    public static void main(String[] args) {
        /*
        * 集合转成数组呢？
        *
        * 使用的就是Collection接口中的toArray方法。
        *
        * 集合转成数组：可以对集合中的元素操作的方法进行限定，但不允许对其进行增删。
        */
        List<String> list = new ArrayList<String>();
        list.add("abc1");
        list.add("abc2");
        list.add("abc3");
        /*
        * toArray方法需要传入一个指定类型的数组。
        * 长度该如何定义呢？
        * 如果长度小于集合的size，那么该方法会创建一个同类型并和集合相同size的数组。
        * 如果长度大于集合的size，那么该方法就会使用指定的数组，存储集合中的元素，其他位置默认为
        * null。
        * 所以建议，最后长度就指定为，集合的size。
        */
        String[] arr = list.toArray(new String[list.size()]);
        System.out.println(Arrays.toString(arr));
    }
}
```

#### 增强 for 循环

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class ForEachDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        /*
        * foreach语句：
        * 格式：
        * for(类型 变量 ： Collection集合|数组)
        * {
        *
        * }
        *
        * 传统for和高级for的区别？
        * 传统for可以完成对语句执行很多次，因为可以定义控制循环的增量和条件。
        *
        * 高级for是一种简化形式。
        * 它必须有被遍历的目标。该目标要是数组，要么是Collection单列集合。
        *
        * 对数数组的遍历如果仅仅是获取数组中的元素，可以使用高级for。
        * 如果要对数组的角标进行操作建议使用传统for。
        *
        */
        List<String> list =new ArrayList<String>();
        list.add("abc1");
        list.add("abc2");
        list.add("abc3");
        for(String s : list){ //简化书写。
            System.out.println(s);
        }
        int[] arr = {3,1,5,7,4};
        for(int i : arr){
            System.out.println(i);
        }
        //可以使用高级for遍历map集合吗？不能直接用，但是可以将map转成单列的set，就可以用了。
        Map<Integer,String> map = new HashMap<Integer,String>();
        map.put(3,"zhagsan");
        map.put(1,"wangyi");
        map.put(7,"wagnwu");
        map.put(4,"zhagsansan");
        for(Integer key : map.keySet()){
            String value = map.get(key);
            System.out.println(key+"::"+value);
        }
        for(Map.Entry<Integer,String> me : map.entrySet()){
            Integer key = me.getKey();
            String value = me.getValue();
            System.out.println(key+":"+value);
        }
        // Iterator<String> it = list.iterator();
        // while(it.hasNext()){
        // System.out.println(it.next());
        // }
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
import static java.util.Collections.*;//静态导入，其实到入的是类中的静态成员。
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