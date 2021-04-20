# 设计模式

[TOC]

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

Adapter模式可以将一个A接口转换为B接口，使得新的对象符合B接口规范。

编写Adapter实际上就是编写一个实现了B接口，并且内部持有A接口的类：

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

在Adapter内部将B接口的调用“转换”为对A接口的调用。

## 代理模式

为其他对象提供一种代理以控制对这个对象的访问。

## 工厂模式

工厂模式用于定制对象。

定义一个用于创建对象的接口，让子类决定实例化哪一个类。Factory Method使一个类的实例化延迟到其子类。

工厂方法可以隐藏创建产品的细节，且不一定每次都会真正创建产品，完全可以返回缓存的产品，从而提升速度并减少内存消耗。

传入不同的配置，获取不同的初始化对象。就跟工厂加工产品一样。

常见的工厂模式：

```java
List<String> list = List.of("A", "B", "C");
```



