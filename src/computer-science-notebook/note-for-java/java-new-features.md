# Java 新特性

[TOC]

## Java 7

### Try with resource

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

## Java 8

Java8 新特性深入讲解：https://github.com/wmyskxz/MoreThanJava/blob/master/java-base/java8.md



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

通常的做法都是将静态方法放在 **伴随类** *(可以理解为操作继承接口的实用工具类)* 中



## Java 10



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