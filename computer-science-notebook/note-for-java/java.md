# Java

[TOC]

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

### 位运算

**>> 和 >>>**

`>>` ，正数高位补零，负数高位补一。`>>>` 正负数都强制高位补 0

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
3. 静态变量称为类变量  
4. 静态变量数据存储在方法区(共享数据区)的静态区，所以也叫对象的共享数据

**静态使用的注意事项**

1. 静态方法只能访问静态成员。 (非静态既可以访问静态，又可以访问非静态)  
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

```java
class 动物
{}
class 猫 extends 动物
{}
class 狗 extends 动物
{}
猫 x = new 猫();
动物 x = new 猫(); //一个对象，两种形态。
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

