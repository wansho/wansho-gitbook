# 设计模式

[TOC]

## 创建型模式

创建型模式关注点是如何创建对象，其核心思想是要把对象的创建和使用相分离，这样使得两者能相对独立地变换。

### 工厂方法

工厂模式用于定制对象。

定义一个用于创建对象的接口，让子类决定实例化哪一个类。Factory Method使一个类的实例化延迟到其子类。

工厂方法可以隐藏创建产品的细节，且不一定每次都会真正创建产品，完全可以返回缓存的产品，从而提升速度并减少内存消耗。

传入不同的配置，获取不同的初始化对象。就跟工厂加工产品一样。

静态工厂方法（Static Factory Method）：

```java
List<String> list = List.of("A", "B", "C"); // 创建一个 collection

Arrays.asList("a1", "a2", "a3") // 创建一个数组

Integer n = Integer.valueOf(100);

Stream.of("a1", "a2", "a3") // 创建一个 stream
```

工厂方法：

```java
public interface NumberFactory {
    
    static NumberFactory impl = new NumberFactoryImpl(); // 接口中也可以 new 对象
    
    // 创建方法:
    Number parse(String s);

    // 获取工厂实例:
    static NumberFactory getFactory() {
        return impl;
    }
    
}

public class NumberFactoryImpl implements NumberFactory {
    public Number parse(String s) {
        return new BigDecimal(s);
    }
}

NumberFactory factory = NumberFactory.getFactory();
Number result = factory.parse("123.456");
```

总是引用接口而非实现类，能允许变换子类而不影响调用方，即尽可能面向抽象编程。

工厂方法是指定义工厂接口和产品接口，但如何创建实际工厂和实际产品被推迟到子类实现，从而使调用方只和抽象工厂与抽象产品打交道。

实际更常用的是更简单的静态工厂方法，它允许工厂内部对创建产品进行优化。

调用方尽量持有接口或抽象类，避免持有具体类型的子类，以便工厂方法能随时切换不同的子类返回，却不影响调用方代码。

### 生成器



## 装饰设计模式

装饰设计模式：对一组对象的功能进行增强时，就可以使用该模式进行问题的解决。
装饰和继承都能实现一样的特点：进行功能的扩展增强，但是装饰比继承灵活，装饰的特点：装饰类和被装饰类
都必须所属同一个接口或者父类。  

Demo:

```java
public class PersonDemo {
    public static void main(String[] args) {
        Person p = new Person();
        // p.chifan();
        NewPerson p1 = new NewPerson(p);
        p1.chifan();
        NewPerson2 p2 = new NewPerson2();
        p2.chifan();
    }
}

class Person{
    void chifan(){
        System.out.println("吃饭");
    }
}

//这个类的出现是为了增强Person而出现的。
class NewPerson{
    private Person p ;
    NewPerson(Person p){
        this.p = p;
    }
    public void chifan(){
        System.out.println("开胃酒");
        p.chifan();
        System.out.println("甜点");
    }
}

class NewPerson2 extends Person{
    public void chifan(){
        System.out.println("开胃酒");
        super.chifan();
        System.out.println("甜点");
    }
}
```

## 模板方法

https://www.liaoxuefeng.com/wiki/1252599548343744/1281319636041762

可见，模板方法的核心思想是：父类定义骨架，子类实现某些细节。

为了防止子类重写父类的骨架方法，可以在父类中对骨架方法使用`final`。对于需要子类实现的抽象方法，一般声明为`protected`，使得这些方法对外部客户端不可见。

## 适配器模式

将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

Adapter 模式可以将一个 A 接口转换为 B 接口，使得新的对象符合 B 接口规范。

编写 Adapter 实际上就是编写一个实现了 B 接口，并且内部持有A接口的类：

```java
public BAdapter implements B {
    private A a;
    public BAdapter(A a) {
        this.a = a;
    }
    public void b() {
        a.a();
    }
}
```

在 Adapter 内部将 B 接口的调用“转换”为对A接口的调用。

## 代理模式

https://www.bilibili.com/video/BV1M54y1X78p

在不修改原来对象代码的基础上，对原对象的功能进行修改或者增强。

代理就是跑腿，替身。

目标类：原来的对象

代理类：替身

### 静态代理

代理类需要有和目标类一样的行为，怎么实现呢？

* 基于接口：定义一个接口，代理类和目标类都实现自这个接口，这样两个类就有了同样的行为
* 基于继承：代理类继承自目标类

静态代理的缺点：

一旦接口或者父类发生变动，则代理类的代码就得随之修改，代理类多的时候维护比较麻烦。所以在实际开发中，多使用动态代理。

### 动态代理

动态代理，是在内存中生成代理对象的一种技术。也就是整个代理过程在内存中进行，不需要我们手写代理类的代码，也不会存在代理类编译的过程，而是直接在运行期，在 JVM 中凭空造出一个代理类对象供我们使用。

### 动态代理-基于 jdk

基于接口

JDK 自带的动态代理技术，需要使用一个静态方法来创建代理对象。它要求被代理对象，也就是目标类，必须实现接口。生成的代理对象和原对象都实现相同的接口，是兄弟关系。

### 动态代理-基于 cglib

基于父类





## 工厂模式

https://www.liaoxuefeng.com/wiki/1252599548343744/1281319170474017

