# Java 新特性

[TOC]

## Annotation

**注解可用于声明式编程。**

秒懂，Java 注解 （Annotation）你可以这样学 - Larry的文章 - 知乎 https://zhuanlan.zhihu.com/p/27643133

JDK 1.5 引入 Annotation 机制，实际上就是代码标签。Java Annotation 也是一种类型，被封装成了一个类(接口)。

动态修改注解的某个属性值：https://www.cnblogs.com/panchanggui/p/14298333.html

### 注解的定义

```java
public @interface TestAnnotation {
}
```

它的形式跟接口很类似，不过前面多了一个 @ 符号。上面的代码就创建了一个名字为 TestAnnotaion 的注解。可以简单理解为创建了一张名字为 TestAnnotation 的标签。

### 注解的属性

注解的属性也叫做成员变量。注解只有成员变量，没有方法。注解的成员变量在注解的定义中以“无形参的方法”形式来声明，其方法名定义了该成员变量的名字，其返回值定义了该成员变量的类型。

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface TestAnnotation {

    int id();

    String msg();

}
```

上面代码定义了 TestAnnotation 这个注解中拥有 id 和 msg 两个属性。在使用的时候，我们应该给它们进行赋值。

赋值的方式是在注解的括号内以 value=”” 形式，多个属性之前用 ，隔开。

```java
@TestAnnotation(id=3, msg="hello annotation")
public class Test {

}
```

需要注意的是，在注解中定义属性时它的类型必须是 8 种基本数据类型外加 类、接口、注解及它们的数组。

注解中属性可以有默认值，默认值需要用 default 关键值指定。比如：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface TestAnnotation {

    public int id() default -1;

    public String msg() default "Hi";

}
```

TestAnnotation 中 id 属性默认值为 -1，msg 属性默认值为 Hi。  它可以这样应用。

```text
@TestAnnotation()
public class Test {}
```

因为有默认值，所以无需要再在 @TestAnnotation 后面的括号里面进行赋值了，这一步可以省略。

另外，还有一种情况。如果一个注解内仅仅只有一个名字为 value 的属性时，应用这个注解时可以直接接属性值填写到括号内。

```java
public @interface Check {
    String value();
}
```

上面代码中，Check 这个注解只有 value 这个属性。所以可以这样应用。

```java
@Check("hi")
int a;
```

这和下面的效果是一样的

```java
@Check(value="hi")
int a;
```

最后，还需要注意的一种情况是一个注解没有任何属性。比如

```java
public @interface Perform {}
```

那么在应用这个注解的时候，括号都可以省略。

```java
@Perform
public void testMethod(){}
```



### 注解的应用

```java
@TestAnnotation
public class Test {
}
```

创建一个类 Test,然后在类定义的地方加上 @TestAnnotation 就可以用 TestAnnotation 注解这个类了。可以简单理解为将 TestAnnotation 这张标签贴到 Test 这个类上面。

### 元注解

元注解也是一种注解，其可以应用到其他注解上，是一种特殊的标签，是给标签打标签的标签。

元标签有 @Retention、@Documented、@Target、@Inherited、@Repeatable 5 种。

#### @Retention

Retention 的英文意为保留期的意思。当 @Retention 应用到一个注解上的时候，它解释说明了这个注解的的存活时间。

它的取值如下：  

- RetentionPolicy.SOURCE 注解只在源码阶段保留，在编译器进行编译时它将被丢弃忽视。  
- RetentionPolicy.CLASS 注解只被保留到编译进行的时候，它并不会被加载到 JVM 中。  
- RetentionPolicy.RUNTIME 注解可以保留到程序运行的时候，它会被加载进入到 JVM 中，所以在程序运行时可以获取到它们。

我们可以这样的方式来加深理解，@Retention 去给一张标签解释的时候，它指定了这张标签张贴的时间。@Retention 相当于给一张标签上面盖了一张时间戳，时间戳指明了标签张贴的时间周期。

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface TestAnnotation {
}
```

上面的代码中，我们指定 TestAnnotation 可以在程序运行周期被获取到，因此它的生命周期非常的长。

#### @Documented

顾名思义，这个元注解肯定是和文档有关。它的作用是能够将注解中的元素包含到 Javadoc 中去。

#### @Target

Target 是目标的意思，@Target 指定了注解运用的地方。

你可以这样理解，当一个注解被 @Target 注解时，这个注解就被限定了运用的场景。

类比到标签，原本标签是你想张贴到哪个地方就到哪个地方，但是因为 @Target 的存在，它张贴的地方就非常具体了，比如只能张贴到方法上、类上、方法参数上等等。@Target 有下面的取值

- ElementType.ANNOTATION_TYPE 可以给一个注解进行注解
- ElementType.CONSTRUCTOR 可以给构造方法进行注解
- ElementType.FIELD 可以给属性进行注解
- ElementType.LOCAL_VARIABLE 可以给局部变量进行注解
- ElementType.METHOD 可以给方法进行注解
- ElementType.PACKAGE 可以给一个包进行注解
- ElementType.PARAMETER 可以给一个方法内的参数进行注解
- ElementType.TYPE 可以给一个类型进行注解，比如类、接口、枚举

#### @Inherited

Inherited 是继承的意思，但是它并不是说注解本身可以继承，而是说如果一个超类被 @Inherited 注解过的注解进行注解的话，那么如果它的子类没有被任何注解应用的话，那么这个子类就继承了超类的注解。 说的比较抽象。代码来解释。

```java
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@interface Test {}


@Test
public class A {}


public class B extends A {}
```

注解 Test 被 @Inherited 修饰，之后类 A 被 Test 注解，类 B 继承 A,类 B 也拥有 Test 这个注解。

可以这样理解：

老子非常有钱，所以人们给他贴了一张标签叫做富豪。

老子的儿子长大后，只要没有和老子断绝父子关系，虽然别人没有给他贴标签，但是他自然也是富豪。

老子的孙子长大了，自然也是富豪。

这就是人们口中戏称的富一代，富二代，富三代。虽然叫法不同，好像好多个标签，但其实事情的本质也就是他们有一张共同的标签，也就是老子身上的那张富豪的标签。

### Java 内置的注解

Java 内置了几个标签：@Deprecated，@Override，@SuppressWarnings，@SafeVarargs，@FunctionalInterface

#### @Deprecate

这个元素是用来标记过时的元素，想必大家在日常开发中经常碰到。编译器在编译阶段遇到这个注解时会发出提醒警告，告诉开发者正在调用一个过时的元素比如过时的方法、过时的类、过时的成员变量。

```java
public class Hero {

    @Deprecated
    public void say(){
        System.out.println("Noting has to say!");
    }

    public void speak(){
        System.out.println("I have a dream!");
    }

}
```

#### @Override

提示子类要复写父类中被 @Override 修饰的方法

#### @SuppressWarnings

阻止警告的意思。之前说过调用被 @Deprecated 注解的方法后，编译器会警告提醒，而有时候开发者会忽略这种警告，他们可以在调用的地方通过 @SuppressWarnings 达到目的。

```java
@SuppressWarnings("deprecation")
public void test1(){
    Hero hero = new Hero();
    hero.say();
    hero.speak();
}
```

#### @SafeVarargs

参数安全类型注解。它的目的是提醒开发者不要用参数做一些不安全的操作,它的存在会阻止编译器产生 unchecked 这样的警告。它是在 Java 1.7 的版本中加入的。

```java
@SafeVarargs // Not actually safe!
    static void m(List<String>... stringLists) {
    Object[] array = stringLists;
    List<Integer> tmpList = Arrays.asList(42);
    array[0] = tmpList; // Semantically invalid, but compiles without warnings
    String s = stringLists[0].get(0); // Oh no, ClassCastException at runtime!
}
```

上面的代码中，编译阶段不会报错，但是运行时会抛出 ClassCastException 这个异常，所以它虽然告诉开发者要妥善处理，但是开发者自己还是搞砸了。

Java 官方文档说，未来的版本会授权编译器对这种不安全的操作产生错误警告。

#### @FunctionalInterface

函数式接口注解，这个是 Java 1.8 版本引入的新特性。函数式编程很火，所以 Java 8 也及时添加了这个特性。

函数式接口 (Functional Interface) 就是一个**具有一个方法的普通接口**。

比如

```java
@FunctionalInterface
public interface Runnable {
    /**
     * When an object implementing interface <code>Runnable</code> is used
     * to create a thread, starting the thread causes the object's
     * <code>run</code> method to be called in that separately executing
     * thread.
     * <p>
     * The general contract of the method <code>run</code> is that it may
     * take any action whatsoever.
     *
     * @see     java.lang.Thread#run()
     */
    public abstract void run();
}
```

我们进行线程开发中常用的 Runnable 就是一个典型的函数式接口，上面源码可以看到它就被 @FunctionalInterface 注解。

可能有人会疑惑，函数式接口标记有什么用，这个原因是函数式接口可以很容易转换为 Lambda 表达式。这是另外的主题了，有兴趣的同学请自己搜索相关知识点学习。

### 注解的提取(利用反射)

博文前面的部分讲了注解的基本语法，现在是时候检测我们所学的内容了。

我通过用标签来比作注解，前面的内容是讲怎么写注解，然后贴到哪个地方去，而现在我们要做的工作就是检阅这些标签内容。 形象的比喻就是你把这些注解标签在合适的时候撕下来，然后检阅上面的内容信息。

要想正确检阅注解，离不开一个手段，那就是反射。

注解通过反射获取。首先可以通过 Class 对象的 isAnnotationPresent() 方法判断它是否应用了某个注解

```text
public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass) {}
```

然后通过 getAnnotation() 方法来获取 Annotation 对象。

```text
public <A extends Annotation> A getAnnotation(Class<A> annotationClass) {}
```

或者是 getAnnotations() 方法。

```text
public Annotation[] getAnnotations() {}
```

前一种方法返回指定类型的注解，后一种方法返回注解到这个元素上的所有注解。

如果获取到的 Annotation 如果不为 null，则就可以调用它们的属性方法了。比如

```java
@TestAnnotation()
public class Test {

    public static void main(String[] args) {

        boolean hasAnnotation = Test.class.isAnnotationPresent(TestAnnotation.class);

        if ( hasAnnotation ) {
            TestAnnotation testAnnotation = Test.class.getAnnotation(TestAnnotation.class);

            System.out.println("id:"+testAnnotation.id());
            System.out.println("msg:"+testAnnotation.msg());
        }

    }

}
```

程序的运行结果是：

```text
id:-1
msg:
```

这个正是 TestAnnotation 中 id 和 msg 的默认值。

上面的例子中，只是检阅出了注解在类上的注解，其实属性、方法上的注解照样是可以的。同样还是要假手于反射。

```java
@TestAnnotation(msg="hello")
public class Test {

    @Check(value="hi")
    int a;


    @Perform
    public void testMethod(){}


    @SuppressWarnings("deprecation")
    public void test1(){
        Hero hero = new Hero();
        hero.say();
        hero.speak();
    }


    public static void main(String[] args) {

        boolean hasAnnotation = Test.class.isAnnotationPresent(TestAnnotation.class);

        if ( hasAnnotation ) {
            TestAnnotation testAnnotation = Test.class.getAnnotation(TestAnnotation.class);
            //获取类的注解
            System.out.println("id:"+testAnnotation.id());
            System.out.println("msg:"+testAnnotation.msg());
        }


        try {
            Field a = Test.class.getDeclaredField("a");
            a.setAccessible(true);
            //获取一个成员变量上的注解
            Check check = a.getAnnotation(Check.class);

            if ( check != null ) {
                System.out.println("check value:"+check.value());
            }

            Method testMethod = Test.class.getDeclaredMethod("testMethod");

            if ( testMethod != null ) {
                // 获取方法中的注解
                Annotation[] ans = testMethod.getAnnotations();
                for( int i = 0;i < ans.length;i++) {
                    System.out.println("method testMethod annotation:"+ans[i].annotationType().getSimpleName());
                }
            }
        } catch (NoSuchFieldException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.out.println(e.getMessage());
        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.out.println(e.getMessage());
        } catch (NoSuchMethodException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.out.println(e.getMessage());
        }



    }

}
```

它们的结果如下：

```text
id:-1
msg:hello
check value:hi
method testMethod annotation:Perform
```

需要注意的是，如果一个注解要在运行时被成功提取，那么 @Retention(RetentionPolicy.RUNTIME) 是必须的。



### 注解的使用场景

我相信博文讲到这里大家都很熟悉了注解，但是有不少同学肯定会问，注解到底有什么用呢？

对啊注解到底有什么用？

我们不妨将目光放到 Java 官方文档上来。

文章开始的时候，我用标签来类比注解。但标签比喻只是我的手段，而不是目的。为的是让大家在初次学习注解时能够不被那些抽象的新概念搞懵。既然现在，我们已经对注解有所了解，我们不妨再仔细阅读官方最严谨的文档。

注解是一系列元数据，它提供数据用来解释程序代码，但是注解并非是所解释的代码本身的一部分。注解对于代码的运行效果没有直接影响。

注解有许多用处，主要如下：  

- 提供信息给编译器： 编译器可以利用注解来探测错误和警告信息  
- 编译阶段时的处理： 软件工具可以用来利用注解信息来生成代码、Html文档或者做其它相应处理。  
- 运行时的处理： 某些注解可以在程序运行的时候接受代码的提取

值得注意的是，注解不是代码本身的一部分。

如果难于理解，可以这样看。罗永浩还是罗永浩，不会因为某些人对于他“傻x”的评价而改变，标签只是某些人对于其他事物的评价，但是标签不会改变事物本身，标签只是特定人群的手段。所以，注解同样无法改变代码本身，注解只是某些工具的的工具。

还是回到官方文档的解释上，注解主要针对的是编译器和其它工具软件(SoftWare tool)。

当开发者使用了Annotation 修饰了类、方法、Field 等成员之后，这些 Annotation 不会自己生效，必须由开发者提供相应的代码来提取并处理 Annotation 信息。这些处理提取和处理 Annotation 的代码统称为 **APT**（Annotation Processing Tool)。

#### JUnit

JUnit 这个是一个测试框架，典型使用方法如下：

```text
public class ExampleUnitTest {
    @Test
    public void addition_isCorrect() throws Exception {
        assertEquals(4, 2 + 2);
    }
}
```

@Test 标记了要进行测试的方法 addition_isCorrect().

#### ButterKnife

ButterKnife 是 Android 开发中大名鼎鼎的 IOC 框架，它减少了大量重复的代码。

```java
public class MainActivity extends AppCompatActivity {

    @BindView(R.id.tv_test)
    TextView mTv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ButterKnife.bind(this);
    }
}
```

### 注解的一个应用实例

我要写一个测试框架，测试程序员的代码有无明显的异常。

—— 程序员 A : 我写了一个类，它的名字叫做 NoBug，因为它所有的方法都没有错误。  —— 我：自信是好事，不过为了防止意外，让我测试一下如何？  —— 程序员 A: 怎么测试？  —— 我：把你写的代码的方法都加上 @Jiecha 这个注解就好了。  —— 程序员 A: 好的。

NoBug.java

```java
package ceshi;
import ceshi.Jiecha;


public class NoBug {

    @Jiecha
    public void suanShu(){
        System.out.println("1234567890");
    }
    @Jiecha
    public void jiafa(){
        System.out.println("1+1="+1+1);
    }
    @Jiecha
    public void jiefa(){
        System.out.println("1-1="+(1-1));
    }
    @Jiecha
    public void chengfa(){
        System.out.println("3 x 5="+ 3*5);
    }
    @Jiecha
    public void chufa(){
        System.out.println("6 / 0="+ 6 / 0);
    }

    public void ziwojieshao(){
        System.out.println("我写的程序没有 bug!");
    }

}
```

上面的代码，有些方法上面运用了 @Jiecha 注解。

这个注解是我写的测试软件框架中定义的注解。

```java
package ceshi;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface Jiecha {

}
```

然后，我再编写一个测试类 TestTool 就可以测试 NoBug 相应的方法了。

```java
package ceshi;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;



public class TestTool {

    public static void main(String[] args) {
        // TODO Auto-generated method stub

        NoBug testobj = new NoBug();

        Class clazz = testobj.getClass();

        Method[] method = clazz.getDeclaredMethods();
        //用来记录测试产生的 log 信息
        StringBuilder log = new StringBuilder();
        // 记录异常的次数
        int errornum = 0;

        for ( Method m: method ) {
            // 只有被 @Jiecha 标注过的方法才进行测试
            if ( m.isAnnotationPresent( Jiecha.class )) {
                try {
                    m.setAccessible(true);
                    m.invoke(testobj, null);

                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    //e.printStackTrace();
                    errornum++;
                    log.append(m.getName());
                    log.append(" ");
                    log.append("has error:");
                    log.append("\n\r  caused by ");
                    //记录测试过程中，发生的异常的名称
                    log.append(e.getCause().getClass().getSimpleName());
                    log.append("\n\r");
                    //记录测试过程中，发生的异常的具体信息
                    log.append(e.getCause().getMessage());
                    log.append("\n\r");
                } 
            }
        }


        log.append(clazz.getSimpleName());
        log.append(" has  ");
        log.append(errornum);
        log.append(" error.");

        // 生成测试报告
        System.out.println(log.toString());

    }

}
```

测试的结果是：

```text
1234567890
1+1=11
1-1=0
3 x 5=15
chufa has error:

  caused by ArithmeticException

/ by zero

NoBug has  1 error.
```

提示 NoBug 类中的 chufa() 这个方法有异常，这个异常名称叫做 ArithmeticException，原因是运算过程中进行了除 0 的操作。

所以，NoBug 这个类有 Bug。

这样，通过注解我完成了我自己的目的，那就是对别人的代码进行测试。

所以，再问我注解什么时候用？我只能告诉你，这取决于你想利用它干什么用。

## Try with resource

Java 1.7 引入。

类似 Python `with open` 的新特性。对于实现了 closeable 的子类，可以这么写：

```java
try(
	InputStream is = new FileInputStream("...");
	OutputStream os = new FileOutputStream("...");
){
	//...
}catch (IOException e) {
	//...
}
```

替换的代码为：

```java
InputStream is = null;
OutputStream os = null;
try {
	//...
} catch (IOException e) {
	//...
}finally{
	try {
		if(os!=null){
			os.close();
		}
		if(is!=null){
			is.close();
		}
	} catch (IOException e2) {
		//...
	}
}
```

java 1.7 引入的新特性，自动关闭 closeable 对象。

Demo：

```java
try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {
    try (Statement stmt = conn.createStatement()) {
        try (ResultSet rs = stmt.executeQuery("SELECT id, grade, name, gender FROM students WHERE gender=1")) {
            while (rs.next()) {
                long id = rs.getLong(1); // 注意：索引从1开始
                long grade = rs.getLong(2);
                String name = rs.getString(3);
                int gender = rs.getInt(4);
            }
        }
    }
}
```

`Statment`和`ResultSet`都是需要关闭的资源，因此嵌套使用`try (resource)`确保及时关闭。

## 接口方法

### 接口默认方法

JDK8 引入。

接口中可以定义实现方法了：

```java
public interface Sized {
    // 普通抽象方法，默认是public abstract修饰的，没有方法体
    int size();

    /*
     * 默认方法，有方法体
     * 任何一个实现了Sized接口的类都会继承isEmpty的实现
     */
    default boolean isEmpty() {
        return this.size() == 0;
    }
}
```

### 接口静态方法

```java
// 接口中的静态方法不能继承
interface TestInterface1 {
    static void sayHello(){
        System.out.println("TestInterface1 Hello");
    }
}
```



## var

java 10 引入。

```java
var codefx = new URL("http://codefx.org");
```

## String... args

Demo：

```java
Arrays.asList("a", "b", "c", "d")
```



```java
function(String... args)
```

```java
function(String[] args) 
```

The only difference between the two is the way you call the function. With String var args you can omit the array creation.

```java
public static void main(String[] args) {
    callMe1(new String[] {"a", "b", "c"});
    callMe2("a", "b", "c");
    // You can also do this
    // callMe2(new String[] {"a", "b", "c"});
}
public static void callMe1(String[] args) {
    System.out.println(args.getClass() == String[].class); // True
    for (String s : args) {
        System.out.println(s);
    }
}
public static void callMe2(String... args) {
    System.out.println(args.getClass() == String[].class); // True
    for (String s : args) {
        System.out.println(s);
    }
}
```

## 知识点

### 三目运算符

作用：二选一

```java
Object object = (1 == 2? "hello" : "world"); // boolean? value1 : value2
System.out.println(object); // world
```

### javax

if a package is introduced as an addition to an existing JRE, it comes in as `javax`.

注意，Tomcat 已经不支持 `javax.servlet`，转而支持 `jakarta.servlet`

### classpath

The `CLASSPATH` variable is one way to tell applications, including the JDK tools, where to look for user classes. (Classes that are part of the JRE, JDK platform, and extensions should be defined through other means, such as the bootstrap class path or the extensions directory.)