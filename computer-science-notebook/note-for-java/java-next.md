# Java 进阶

[TOC]

记录自己常忽略的一些知识点。

## final

final 修饰的类不能被继承。

final 修饰的方法不能被覆盖（重写）。

final 修饰的变量不能再被重新复制。



## abstract

抽象类不能被实例化，因为有的方法还没被实现。

抽象类可以定义构造方法。

【强制】 抽象类命名使用 Abstract 或 Base 开头；异常类命名使用 Exception 结尾； 测试类命名以它要测试的类的名称开始，以 Test 结尾。

抽象类生来就是父类，抽象关键字不可以和 private，static，final 同时存在：

1. private：抽象是定义了一个协议，要求子类去实现的，private 私有后，子类就访问不到了
2. static：抽象方法必须子类实现后才能访问，而 static 修饰后，可以直接通过类名进行访问，冲突了
3. final：final 定义的属性和方法，就不能修改了，而抽象关键字定义的函数是要被子类继承修改的



## 接口



### 接口是什么

当一个抽象类中的方法都是抽象的时候，这时可以将该抽象类用另一种形式定义和表示，就是接口 interface。

接口中的成员都是公共的权限。

接口中可以定义变量，但是定义的成员变量全部都默认加了 `public static final` 属性，变成了常量，也就是接口不持有状态，接口是 `stateless` 的。

接口不能被实例化，所以没有改造方法。

接口中定义的接口方法，都会被默认加上 `public abstract` 属性。

接口起到蓝图的作用。

```java
interface Demo{
    public static final int NUM = 4;
    public abstract void show1();
    public abstract void show2();
}
```

Java8 中接口和抽象类的区别：

> The purpose of interface is to provide full abstraction, while the purpose of abstract class is to provide partial abstraction. This still holds true. The interface is like a blueprint for your class, with the introduction of default methods you can simply say that we can add additional features in the interfaces without affecting the end user classes.



### 默认方法

默认的意思是：默认已经实现了的方法。

接口加入默认方法的缘由：

> java8 增加了大量的新特性，需要往接口里增加方法，但这样会导致一连串的实现类的修改，不可行。所以引入接口默认方法，既向后兼容，又加入了新的特性。

The most common use of interface default methods is **to incrementally provide additional functionality to a given type without breaking down the implementing classes.**

接口的默认方法，更像是一种前期设计不到位，后期弥补的一种措施。也可以用默认方法封装这个接口的一些通用的行为。接口起到蓝图的作用，默认方法更像是给设计不好的蓝图打补丁。

接口默认方法在 Java8 中还被用来拓展 jdk 的函数式特性，很多 jdk 中的接口都通过添加默认实现的方法，去实现函数式特性。

接口的默认方法可以被实现类集成，可以在实现类中被重写(`@Override`)。

Demo:

```java
public interface Vehicle {
    
    String getBrand();
    
    String speedUp();
    
    String slowDown();
    
    default String turnAlarmOn() {
        return "Turning the vehicle alarm on.";
    }
    
    default String turnAlarmOff() {
        return "Turning the vehicle alarm off.";
    }
}

public class Car implements Vehicle {

    private String brand;
    
    // constructors/getters
    
    @Override
    public String getBrand() {
        return brand;
    }
    
    @Override
    public String speedUp() {
        return "The car is speeding up.";
    }
    
    @Override
    public String slowDown() {
        return "The car is slowing down.";
    }
}

public static void main(String[] args) { 
    Vehicle car = new Car("BMW");
    System.out.println(car.getBrand());
    System.out.println(car.speedUp());
    System.out.println(car.slowDown());
    System.out.println(car.turnAlarmOn());
    System.out.println(car.turnAlarmOff());
}

```



### 静态方法

接口的静态方法只属于接口本身，相当于是接口私有的，不能传递给实现类。静态方法可以被其他静态方法调用，也可以被默认方法调用。

Demo：

```java
public interface Vehicle {
    // regular / default interface methods
    static int getHorsePower(int rpm, int torque) {
        return (rpm * torque) / 5252;
    }
}
Vehicle.getHorsePower(2500, 480));
```

The idea behind *static* interface methods is to provide a simple mechanism that allows us to **increase the degree of [cohesion](https://en.wikipedia.org/wiki/Cohesion_(computer_science))** of a design by putting together related methods in one single place without having to create an object.

**The same can pretty much be done with abstract classes.** The main difference is that **abstract classes can have constructors, state, and behavior**.

Furthermore, static methods in interfaces make it possible to group related utility methods, without having to create artificial utility classes that are simply placeholders for static methods.

引入静态方法，是为了提高内聚性，尽量减少对象的创建。

静态方法是只属于接口的，实现类也没法重写。所以接口中的静态方法还可以用于封装工具方法，这样就不需要单独创建工具类了。

接口 + 静态方法不能替换抽象类，因为接口没有构造方法，无状态，但是抽象类可以定义构造方法，有状态。

Demo：

```java
public interface IDiscountStrategy {

    /***
     * 施加折扣
     * @param total 总价
     * @return 打折后的价格
     */
    float applyDiscount(float total);

    /***
     * java8 中接口内可以定义静态方法及其实现！
     * 5 折策略
     * @return 策略函数对象
     */
    static IDiscountStrategy halfDiscountStrategy(){
        return total -> total * 0.5f;
    }

    /***
     * 打 8 折的策略
     * @return 策略函数对象
     */
    static IDiscountStrategy eightyDiscountStrategy(){
        return total -> total * 0.8f;
    }

}
```





### 参考文献

* [Static and Default Methods in Interfaces in Java](https://www.baeldung.com/java-static-default-methods)
* [fields in interface](https://stackoverflow.com/questions/9446893/fields-in-interfaces/9446909)
* [Java 8 Interface Changes – default method and static method](https://beginnersbook.com/2017/10/java-8-interface-changes-default-method-and-static-method/)

