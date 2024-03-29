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



## 枚举



### 枚举的本质

枚举类其实就是一个继承自 Enum 类的构造函数私有（不能从外部实例化）的 final class（不能被继承）。

枚举对象是在枚举类中事先定义好的一个个实例常量(`public static final`)。

Demo:

```java
public enum Color {
    RED, GREEN, BLUE;
}
```

反编译 class 文件 `javap -cp build/classes/main Color` 后得到：

```java
public final class Color extends Enum { // 继承自Enum，标记为final class
    // 每个实例均为全局唯一:
    public static final Color RED = new Color();
    public static final Color GREEN = new Color();
    public static final Color BLUE = new Color();
  	public static Color[] values();
		public static Color valueOf(java.lang.String);
    // private构造方法，确保外部无法调用new操作符:
    private Color() {}
}
```

编译后的 `enum` 类和普通 `class` 并没有任何区别。

枚举类可以定义构造函数，但是构造函数必须是私有的！

枚举类也可以定义正常的方法，例如 public 方法。枚举类中甚至可以定义 abstract 方法。

枚举类虽然已经继承了 Enum，但是仍然可以实现其他接口，它只是一个普通类！

枚举策略 Demo:

```java
public enum Calculator{
  // 定义枚举实例的时候，要实现抽象方法，相当于实现一个策略
	ADD("+"){
    public int exec(int a, int b){
      return a + b;
    }
  },
  
  SUB("-"){
    public int exec(int a, int b){
      return a - b;
    }
  };
  String value = "";
  private Calculator(String value){
    this.value = value;
  }
  public String getValue(){
    return this.value;
  }
  // 定义一个抽象方法，让子类来实现
  public abstract int exec(int a, int b);
}

Calculator.ADD.exec(1, 2)
```





### 枚举类自带的方法

因为所有的枚举类都继承自 Enum 类，所以枚举类自带的方法，就是 Enum 自带的方法：

| Modifier and Type             | Method and Description                                       |
| :---------------------------- | :----------------------------------------------------------- |
| `int`                         | `compareTo(E o)` Compares this enum with the specified object for order. 比较的是顺序 |
| `boolean`                     | `equals(Object other)` Returns true if the specified object is equal to this enum constant. |
| `Class<E>`                    | `getDeclaringClass()` Returns the Class object corresponding to this enum constant's enum type. |
| `int`                         | `hashCode() `Returns a hash code for this enum constant.     |
| `String`                      | `name()` Returns the name of this enum constant, exactly as declared in its enum declaration. |
| `int`                         | `ordinal() `Returns the ordinal of this enumeration constant (its position in its enum declaration, where the initial constant is assigned an ordinal of zero). 返回枚举常量的顺序，从 0 开始 |
| `String`                      | `toString()` Returns the name of this enum constant, as contained in the declaration. |
| `static <T extends Enum<T>>T` | `valueOf(Class<T> enumType, String name)`Returns the enum constant of the specified enum type with the specified name. 根据名称返回枚举常量 |

枚举类还有两个特殊的静态方法，是编译器在编译阶段加到 class 文件中的，在源码中没有体现。

* `values()` 这个方法用来返回所有的枚举实例
* `valueOf(java.lang.String)` 这个方法和 Enum 类自带的 valueOf 方法不一样，自带的需要传两个参数，而编译器加的只需要一个参数



### 参考文献

* [廖雪峰讲枚举](https://www.liaoxuefeng.com/wiki/1252599548343744/1260473188087424)
* [Where is the documentation for the values() method of Enum?](https://stackoverflow.com/questions/13659217/where-is-the-documentation-for-the-values-method-of-enum)
* 设计模式之禅 - 策略设计模式



## Serializable

Serializable 接口的定义：

```java
public interface Serializable {
}
```

Serializable 啥也没定义，只是一个语义接口，标志着一个对象可以被 Java 自带的序列化标准进行序列化（序列化成二进制文件）。

Java 自带的序列化标准是序列化成二进制文件，不是序列化成文本文件。

是一种上古技术，现代的 JavaWeb 开发中基本用不到了。