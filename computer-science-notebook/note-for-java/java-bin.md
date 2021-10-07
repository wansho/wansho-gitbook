# java-bin

[TOC]

java bin 目录下提供的二进制工具

## java

运行 class 文件。

```shell
# 注意不要加 .class 后缀
java xxx
```

如果出现 `错误: 找不到或无法加载主类` 的情况，则大概率是包名的问题。Java 中一个类的唯一 ID，并不是类名，而是`包名 + 类名`。





## javac

编辑 java 代码

```shell
# 编译 xxx.java 文件，生成
javac xxx.java

# 制定 class 文件的地址
javac -d classdir xxx.java
```

生成 class 文件



## javap

反编译 class 文件

```shell
# -c 对代码进行反汇编
javap -c xxx
```

以下是一个 Java 代码编译后的反编译结果：

```java
package thinkinjava.string;

public class Concatenation {
    public static void main(String[] args) {
        String mango = "mango";
        String s = "abc" + mango + "def" + 47;
        System.out.println(s);
    }
}
```

反编译 class 文件：

```
# 一个反编译结果
public class thinkinjava.string.Concatenation {
  public thinkinjava.string.Concatenation();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: ldc           #2                  // String mango
       2: astore_1
       3: new           #3                  // class java/lang/StringBuilder
       6: dup
       7: invokespecial #4                  // Method java/lang/StringBuilder."<init>":()V
      10: ldc           #5                  // String abc
      12: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      15: aload_1
      16: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      19: ldc           #7                  // String def
      21: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      24: bipush        47
      26: invokevirtual #8                  // Method java/lang/StringBuilder.append:(I)Ljava/lang/StringBuilder;
      29: invokevirtual #9                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      32: astore_2
      33: getstatic     #10                 // Field java/lang/System.out:Ljava/io/PrintStream;
      36: aload_2
      37: invokevirtual #11                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
      40: return
}
```

