# 泛型详解

[TOC]

## generics think-in-java

泛型可以用来修饰类、接口、方法、参数、返回值

### 泛型类

### 泛型接口

### 泛型方法





作者：Josh Juneau
2014 年 7 月发布

深入了解 Java SE 8 中的泛型。

https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html

## Nostrud Nulla Laborum Occaecat

Java SE 8 的发布曾在 Java 界引起轰动。该版本中新增的和更新的语言特性可减少需要编写的代码量并使代码更易于使用，从而提高开发人员的工作效率。要充分了解一些新特性（如 lambda）的实现，您需要先了解该语言的核心概念。其中一个在许多 Java SE 8 特性中发挥了重要作用的概念是泛型。

本文首先简单解释泛型，连带介绍一些基本概念。了解基本概念之后，我们将深入介绍一些场景，演示泛型的用法。最后，我们将看到泛型如何成为 Java SE 8 中一些新增构造的重要组成部分。

**注**：[GitHub](https://github.com/juneau001/GenericsExamples) 上提供了本文的完整源代码。

## 泛型是什么？

考虑以下场景：您希望开发一个用于在应用中传递对象的容器。但对象类型并不总是相同。因此，需要开发一个能够存储各种类型对象的容器。

鉴于这种情况，要实现此目标，显然最好的办法是开发一个能够存储和检索 Object 类型本身的容器，然后在将该对象用于各种类型时进行类型转换。清单 1 中的类演示了如何开发此类容器。

```
public class ObjectContainer {
    private Object obj;

    /**
     * @return the obj
     */
    public Object getObj() {
        return obj;
    }

    /**
     * @param obj the obj to set
     */
    public void setObj(Object obj) {
        this.obj = obj;
    }
    
}
```

**清单 1**

虽然这个容器会达到预期效果，但就我们的目的而言，它并不是最合适的解决方案。它不是类型安全的，并且要求在检索封装对象时使用显式类型转换，因此有可能引发异常。清单 2 中的代码演示如何使用该容器存储和检索值。

```
ObjectContainer myObj = new ObjectContainer();

// store a string
myObj.setObj("Test");
System.out.println("Value of myObj:" + myObj.getObj());
// store an int (which is autoboxed to an Integer object)
myObj.setObj(3);
System.out.println("Value of myObj:" + myObj.getObj());

List objectList = new ArrayList();
objectList.add(myObj);
// We have to cast and must cast the correct type to avoid ClassCastException!
String myStr = (String) ((ObjectContainer)objectList.get(0)).getObj(); 
System.out.println("myStr: " + myStr);
```

### 清单 2

可以使用泛型开发一个更好的解决方案，在实例化时为所使用的容器分配一个类型，也称*泛型类型*，这样就可以创建一个对象来存储所分配类型的对象。泛型类型是一种类型参数化的类或接口，这意味着可以通过执行*泛型类型调用* 分配一个类型，将用分配的具体类型替换泛型类型。然后，所分配的类型将用于限制容器内使用的值，这样就无需进行类型转换，还可以在编译时提供更强的类型检查。

清单 3 中的类演示了如何创建与先前创建的容器相同的容器，但这次使用泛型类型参数，而不是 Object 类型。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
public class GenericContainer<T> {
    private T obj;

    public GenericContainer(){
    }
    
    // Pass type in as parameter to constructor
    public GenericContainer(T t){
        obj = t;
    }

    /**
     * @return the obj
     */
    public T getObj() {
        return obj;
    }

    /**
     * @param obj the obj to set
     */
    public void setObj(T t) {
        obj = t;
    }
}
```

### 清单 3

最显著的差异是类定义包含 <T>，类字段 obj 不再是 Object 类型，而是泛型类型 T。类定义中的尖括号之间是类型参数部分，介绍类中将要使用的类型参数（或多个参数）。T 是与此类中定义的泛型类型关联的参数。

要使用泛型容器，必须在实例化时使用尖括号表示法指定容器类型。因此，以下代码将实例化一个 Integer 类型的 GenericContainer，并将其分配给 myInt 字段。

```
GenericContainer<Integer> myInt = new GenericContainer<Integer>();
```

如果我们尝试在已经实例化的容器中存储其他类型的对象，代码将无法编译：

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
myInt.setObj(3);  // OK
myInt.setObj("Int"); // Won't Compile
```

### 使用泛型的好处

上面的示例已经演示了使用泛型的一些好处。一个最重要的好处是更强的类型检查，因为避开运行时可能引发的 ClassCastException 可以节省时间。

另一个好处是消除了类型转换，这意味着可以用更少的代码，因为编译器确切知道集合中存储的是何种类型。例如，在清单 4 所示代码中，我们来看看将 Object 容器实例存储到集合中与存储 GenericContainer 实例之间的差异。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
List myObjList = new ArrayList();

// Store instances of ObjectContainer
for(int x=0; x <=10; x++){
    ObjectContainer myObj = new ObjectContainer();
    myObj.setObj("Test" + x);
    myObjList.add(myObj);
}
// Get the objects we need to cast
for(int x=0; x <= myObjList.size()-1; x++){
    ObjectContainer obj = (ObjectContainer) myObjList.get(x); 
    System.out.println("Object Value: " + obj.getObj());
}

List<GenericContainer> genericList = new ArrayList<GenericContainer>();

// Store instances of GenericContainer
for(int x=0; x <=10; x++){
    GenericContainer<String> myGeneric = new GenericContainer<String>();
    myGeneric.setObj(" Generic Test" + x);
    genericList.add(myGeneric);
}
// Get the objects; no need to cast to String

for(GenericContainer<String> obj:genericList){
    String objectString = obj.getObj();
    // Do something with the string...here we will print it
    System.out.println(objectString);
}
```

### 清单 4

注意，使用 `ArrayList` 时，我们可以使用括号表示法 `(<GenericContainer>)` 在创建时指定集合类型，指明我们将存储 `GenericContainer` 实例。该集合将只能存储 `GenericContainer` 实例`（或 GenericContainer 的子类）`，无需在从集合检索对象时使用显式类型转换。

将泛型与 Collections API 结合使用的概念让我们能获得泛型提供的另外一个好处：允许开发可根据手头的任务定制的泛型算法。Collections API 本身是使用泛型开发的，如果不使用，Collections API 将永远无法容纳参数化类型。

## 分析泛型

以下各节将探讨泛型的更多特性。

### 如何使用泛型？

泛型有许多不同用例。本文的第一个示例介绍了生成泛型对象类型的用例。这对于在类和接口层面了解泛型语法是个很好的起点。研究下代码，类签名包含一个类型参数部分，包括在类名后的尖括号 (< >) 内，例如：

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
public class GenericContainer<T> {
...
```

类型参数（又称*类型变量*）用作占位符，指示在运行时为类分配类型。根据需要，可能有一个或多个类型参数，并且可以用于整个类。根据惯例，类型参数是单个大写字母，该字母用于指示所定义的参数类型。下面列出每个用例的标准类型参数：

- E：元素
- K：键
- N：数字
- T：类型
- V：值
- S、U、V 等：多参数情况中的第 2、3、4 个类型

在上面的示例中，T 指示将分配的类型，因此可在实例化时为 GenericContainer 分配任何有效类型。注意，T 参数用于整个类，指示实例化时指定的类型。使用下面这行代码实例化对象时，将用 String 类型替换所有 T 参数：

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
GenericContainer<String> stringContainer = new GenericContainer<String>();
```

泛型也可用于构造函数中，传递类域初始化所需的类型参数。GenericContainer 的构造函数允许在实例化时传递任意类型：

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
GenericContainer gc1 = new GenericContainer(3);
GenericContainer gc2 = new GenericContainer("Hello");
```

注意，未分配类型的泛型称为*原始类型*。例如，要创建原始类型的 GenericContainer，可以使用以下代码：

```
GenericContainer rawContainer = new GenericContainer();
```

原始类型有时对于实现向后兼容很有用，但并不适用于日常代码。原始类型在编译时无需执行类型检查，导致代码在运行时易于出错。

### 多种泛型类型

有时，能够在类或接口中使用多种泛型类型很有帮助。通过在尖括号之间放置一个逗号分隔的类型列表，可在类或接口中使用多个类型参数。清单 5 中的类使用一个接受以下两种类型的类演示了此概念：T 和 S。

如果我们回顾上一节中列出的标准类型命名约定，T 是第一种类型的标准标识符，S 是第二种类型的标准标识符。使用这两种类型生成一个使用泛型存储多个值的容器。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
public class MultiGenericContainer<T, S> {
    private T firstPosition;
    private S secondPosition;
   
    public MultiGenericContainer(T firstPosition, S secondPosition){
        this.firstPosition = firstPosition;
        this.secondPosition = secondPosition;
    }
    
    public T getFirstPosition(){
        return firstPosition;
    }
    
    public void setFirstPosition(T firstPosition){
        this.firstPosition = firstPosition;
    }
    
    public S getSecondPosition(){
        return secondPosition;
    }
    
    public void setSecondPosition(S secondPosition){
        this.secondPosition = secondPosition;
    }
    
}
```

### 清单 5

`MultiGenericContainer` 类可用于存储两个不同对象，每个对象的类型可在实例化时指定。容器的用法如清单 6 所示。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
MultiGenericContainer<String, String> mondayWeather =
        new MultiGenericContainer<String, String>("Monday", "Sunny");
MultiGenericContainer<Integer, Double> dayOfWeekDegrees = 
        new MultiGenericContainer<Integer, Double>(1, 78.0);

String mondayForecast = mondayWeather.getFirstPosition();
// The Double type is unboxed--to double, in this case. More on this in next section!
double sundayDegrees = dayOfWeekDegrees.getSecondPosition();
```

### 清单 6

### 类型推断和尖括号运算符

如前所述，泛型无需进行类型转换。例如，使用清单 5 中所示的 MultiGenericContainer 示例，如果调用 getFirstPosition() 或 getSecondPosition()，用于存储结果的字段必须与容器中该位置存储的对象的类型相同。

在清单 7 所示的示例中，我们看到实例化时分配给该容器的类型在检索值时无需进行类型转换。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
MultiGenericContainer<String, String> mondayWeather =
        new MultiGenericContainer<String, String>("Monday", "Sunny");
MultiGenericContainer<Integer, Double> dayOfWeekDegrees = 
        new MultiGenericContainer<Integer, Double>(1, 78.0);
String mondayForecast = mondayWeather.getFirstPosition(); // Works fine with String
// The following generates "Incompatible types" error and won't compile
int mondayOutlook = mondayWeather.getSecondPosition(); 
double sundayDegrees = dayOfWeekDegrees.getSecondPosition(); // Unboxing occurs
```

### 清单 7

考虑清单 7 中的第三行代码，由于 getSecondPosition() 的结果存储到 double 类型的字段中，因此无需进行类型转换。MultiGenericContainer 是用 MultiGenericContainer<String, Double> 实例化的，这怎么可能呢？借助将引用类型自动转换为原始类型的*拆箱* 操作，即可实现。同样，通过构造函数存储值时，使用*自动装箱* 操作将原始类型的 double 值存储为 Double 引用类型。

**注**：无法将原始类型用于泛型；只能使用引用类型。自动装箱和拆箱操作能够在使用泛型对象时将值存储为原始类型并检索原始类型的值。

类型引用可以在分配 getFirstPosition() 或 getSecondPosition() 调用结果时避免显式类型转换。根据 Oracle 文档，*类型引用* 是 Java 编译器的一项功能，可查看每种方法调用和对应的声明，从而确定支持调用的类型参数。换言之，编译器根据对象实例化过程中分配的类型确定可以使用的类型，在本例中，为 <String, String> 和 <Integer, Double>。引用算法尝试找到适用于所有参数的最特定的类型。

看看 MuliGenericContainer 的实例化，也可以使用类型引用避免重复类型声明。不必指定对象类型两次，只要编译器可以从上下文推断类型，即可以指定尖括号运算符 <>。因此，可以在实例化对象时使用尖括号运算符，如清单 8 可见。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
MultiGenericContainer<String, String> mondayWeather =  
new MultiGenericContainer<>("Monday", "Sunny");  
MultiGenericContainer<Integer, Double> dayOfWeekDegrees =  
new MultiGenericContainer<>(1, 78.0);
```

**清单 8**

如果使用集成开发环境 (IDE)（如 NetBeans IDE），IDE 将指示何处可以使用类型引用。考虑 MultiGenericContainer 原始实例化；我们两次指定类型，NetBeans 将显示指示器和提示，如图 1 所示。

![f1-generics](https://www.oracle.com/ocom/groups/public/@otn/documents/digitalasset/2255376.gif)

**图 1. NetBeans 类型引用提示**

### 我的目标是什么？

被称为*目标类型化* 的概念允许编译器推断泛型调用的类型参数。目标类型是编译器希望的数据类型，具体取决于用于实例化泛型对象的类型、表达式出现的位置等因素。

在下面的代码行中，值的目标类型是 Double，因为 getSecondPosition() 方法返回 S 类型的值，其中 S 在本例中为 Double。如前所述，由于拆箱操作，我们能够将调用的值分配给 double 类型的基元。

```
double sundayDegrees = dayOfWeekDegrees.getSecondPosition();
```

### 有界类型

我们经常会遇到这种情况，需要指定泛型类型，但希望控制可以指定的类型，而非不加限制。*有界类型* 在类型参数部分指定 extends 或 super 关键字，分别用上限或下限限制类型，从而限制泛型类型的边界。例如，如果希望将某类型限制为特定类型或特定类型的子类型，请使用以下表示法：

```
<T extends UpperBoundType>
```

同样，如果希望将某个类型限制为特定类型或特定类型的超类型，请使用以下表示法：

```
<T super LowerBoundType>
```

在清单 9 的示例中，我们用先前使用的 GenericContainer 类，通过指定一个上限，将其泛型类型限制为 Number 或 Number 的子类。注意，GenericNumberContainer 这个新类指定泛型类型必须扩展 Number 类型。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
public class GenericNumberContainer <T extends Number> {
    private T obj;

    public GenericNumberContainer(){
    }
    
    public GenericNumberContainer(T t){
        obj = t;
    }
    /**
     * @return
 the obj
     */
    public T getObj() {
        return obj;
    }

    /**
     * @param obj the obj to set
     */
    public void setObj(T t) {
        obj = t;
    }
}
```

### 清单 9

该类可以很好地将其字段类型限制为 Number，但如果您尝试指定一个不在边界内的类型（如清单 10 所示），将引发编译器错误。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
GenericNumberContainer<Integer> gn = new GenericNumberContainer<Integer>();
gn.setObj(3);

// Type argument String is not within the upper bounds of type variable T
GenericNumberContainer<String> gn2 = new GenericNumberContainer<String>();
```

### 清单 10

### 泛型方法

有时，我们可能不知道传入方法的参数类型。在方法级别应用泛型可以解决此类问题。方法参数可以包含泛型类型，方法也可以包含泛型返回类型。

假设我们要开发一个接受 `Number` 类型的计算器类。泛型可用于确保可将任何 `Number` 类型作为参数传递给此类的计算方法。例如，清单 11 中的 add() 方法演示了如何使用泛型限制两个参数的类型，确保其包含 Number 的上限：

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
public static <N extends Number> double add(N a, N b){
    double sum = 0;
    sum = a.doubleValue() + b.doubleValue();
    return sum;
}
```

### 清单 11

通过将类型限制为 Number，您可以将 Number 子类的任何对象作为参数传递。此外，通过将类型限制为 Number，我们还可以确保传递给该方法的任何参数将包含 `doubleValue()` 方法。要查看实际效果，如果您想添加一个 Integer 和一个 Float，可以按如下所示调用该方法：

```
double genericValue1 = Calculator.add(3, 3f);
```

### 通配符

某些情况下，编写指定未知类型的代码很有用。问号 (?) 通配符可用于使用泛型代码表示未知类型。通配符可用于参数、字段、局部变量和返回类型。但最好不要在返回类型中使用通配符，因为确切知道方法返回的类型更安全。

假设我们想编写一个方法来验证指定的 List 中是否存在指定的对象。我们希望该方法接受两个参数：一个是未知类型的 List，另一个是任意类型的对象。参见清单 12。



[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
public static <T> void checkList(List<?> myList, T obj){ 
if(myList.contains(obj)){   
System.out.println("The list contains the element: " + obj);      
} else {   
System.out.println("The list does not contain the element: " + obj);    
}  
}
```

### 清单 12

清单 13 中的代码演示如何利用此方法。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
// Create List of type Integer
List<Integer> intList = new ArrayList<Integer>();
intList.add(2);
intList.add(4);
intList.add(6);

// Create List of type String
List<String> strList = new ArrayList<String> ();
strList.add("two");
strList.add("four");
strList.add("six");

// Create List of type Object
List<Object> objList = new ArrayList<Object>();
objList.add("two");
objList.add("four");
objList.add(strList);

checkList(intList, 3); 
// Output:  The list [2, 4, 6] does not contain the element: 3

checkList(objList, strList); 
/* Output:  The list [two, four, [two, four, six]] contains 
the element: [two, four, six] */

checkList(strList, objList);
/* Output:  The list [two, four, six] does not contain 
the element: [two, four, [two, four, six]] */
```

### 清单 13

有时要使用上限或下限限制通配符。与指定带边界的泛型类型极其相似，指定 extends 或 super 关键字加上通配符，后面跟用于上限或下限的类型，即可声明带边界的通配符类型。例如，如果我们要更改 checkList 方法使其只接受扩展 Number 类型的 List，可按清单 14 所示编写代码。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
public static <T> void checkNumber(List<? extends Number> myList, T obj){
    if(myList.contains(obj)){
        System.out.println("The list " + myList + " contains the element: " + obj);
    } else {
        System.out.println("The list " + myList + " does not contain the 
element: " + obj);
    }
}
```

### 清单 14

### 在 Java SE 8 构造中使用泛型

我们已经看到了泛型的用法和重要性。现在，我们来看看泛型在 `Java SE 8` 中的新构造 lambda 表达式的用例。Lambda 表达式表示一个匿名函数，它实现函数接口的单一抽象方法。有许多函数接口可供使用，其中许多利用了泛型。我们来看一个示例。

假设我们要遍历书名 `(String)` 列表，比较书名，这样我们可以返回包含指定搜索词的所有书名。为此，我们可以开发一个方法，它有两个参数：书名列表和用于执行比较的谓词。`Predicate` 函数接口可用于比较，返回一个 boolean，指示给定对象是否满足测试要求。`Predicate` 接口可用于所有类型的对象，因为它有以下泛型签名：

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
@FunctionalInterface
public interface Predicate<T>{
...
}
```

如果我们要遍历每个书名，查找包含文本`“Java EE”`的书名，可以传递 `contains("Java EE")` 作为谓词参数。清单 15 所示方法可用于遍历给定的书名列表，并应用这样的谓词打印那些匹配的书名。在这种情况下，接受的参数使用泛型指示 `String` 的 List，并使用一个谓词测试每个 `String`。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
public static void compareStrings(List<String> list, Predicate<String> predicate) {
    list.stream().filter((n) -> (predicate.test(n))).forEach((n) -> {
        System.out.println(n + " ");
    });
}
```

### 清单 15

清单 16 中的代码可用于填充书名列表，然后打印所有包含文本“Java EE”的书名。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
List<String> bookList = new ArrayList<>();
bookList.add("Java 8 Recipes");
bookList.add("Java EE 7 Recipes");
bookList.add("Introducing Java EE 7");
bookList.add("JavaFX 8:  Introduction By Example");
compareStrings(bookList, (n)->n.contains("Java EE"));
```

### 清单 16

### 更进一步

我们已经看到了如何通过引用类型使用泛型，了解泛型在使用应用特定的类型中的实际应用可能很有帮助。[本文的完整源代码](https://github.com/juneau001/GenericsExamples)包括了咖啡店应用的源代码。

咖啡店的示例使用泛型处理咖啡店出售的各种不同口味的咖啡，每种口味用一种不同的 Java 类型。在该场景中，客户将购买各种袋装或杯装咖啡，我们需要分解购买细节，以确定不同咖啡类型的数量，这样我们就可以更新店内库存信息，更多地了解客户。

该应用利用包含泛型类型的方法执行一些任务。清单 17 中的代码演示了一个示例，用于计算一次购买中所含的咖啡类型数目，其中 `purchase` 表示所有咖啡销售的列表。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
public <T> long countTypes(T coffeeType) {
    long count = purchase.stream().filter(
            (sale) -> (sale.getType().getType().equals(coffeeType)))
            .count();
    return count;
}
```

### 清单 17

此方法返回给定购买的指定咖啡类型的计数。为了有效执行此任务，该方法接受一个泛型类型参数，这意味着可将任意对象传递给该方法。然后该方法将搜索购买列表，查看其中包含了多少次给定类型的购买。

由于泛型方法应引入自己的类型参数，该参数的范围限于该方法的主体。类型参数必须出现在方法的返回类型之前。在 countTypes 的情况下，只用一个 <T> 表示泛型类型。

如前所述，可以使用有界类型限制可为泛型类型指定的类型。如果您查看 [GitHub 上的代码](https://github.com/juneau001/GenericsExamples)中的 `JavaHouse` 类中的 `addToPurchase()` 方法，将看到它接受一个泛型 List。

这种情况下，`List` 必须包含扩展 `CoffeeSaleType` 的元素，因此 `CoffeeSaleType` 是上限。换句话说，只能使用扩展 `CoffeeSaleType` 的对象列表作为此方法参数。参见清单 18。

[COPY](https://www.oracle.com/cn/technical-resources/articles/java/juneau-generics.html#copy)

Copied to Clipboard

Error: Could not Copy

```
public <T extends CoffeeSaleType> void addToPurchase(List<T> saleList) {
    for (CoffeeSaleType sale : saleList) {
        purchase.add(sale);
    }
}
```

### 清单 18

咖啡店示例包括各种泛型实现。要模拟咖啡店的购买交易，请执行 JavaHouseVisit 类，了解 main 方法中调用的每种方法。

### 总结

有了泛型，我们可以使用更强的类型检查、无需进行类型转换，并且能够开发泛型算法。没有泛型，我们今天在 Java 中使用的许多特性都不可能实现。

在本文中，我们看到了一些基本示例，展示如何使用泛型实现一个可提供强类型检查和类型灵活性的解决方案。我们还看到泛型在算法中所起的重要作用，以及泛型在用于实现 lambda 表达式的 Collections API 和函数接口中起到的重要作用。

本文只是介绍了泛型的一点皮毛，若想深入了解，有许多在线资源可供参考。我建议您下载[本文源代码](https://github.com/juneau001/GenericsExamples)，通过使用了解更多有关泛型的信息，以及如何在自己的解决方案中使用它们。

### 另请参见

- [*Java 教程* 泛型课程](http://docs.oracle.com/javase/tutorial/java/generics/index.html)
- [NetBeans IDE](https://netbeans.org/)

### 关于作者

Josh Juneau 担任应用开发人员、系统分析师和数据库管理员。他主要使用 Java 和其他 Java 虚拟机 (JVM) 语言开发。他是 Oracle 技术网和 *Java Magazine* 的技术作家，与人合著了《The Definitive Guide to Jython》和《PL/SQL Recipes》（均为 Apress，2010）和《Java 7 Recipes》（Apress，2011）。Josh 最近撰写了《Java EE 7 Recipes》和《Introducing Java EE 7》（均为 Apress，2013），他目前正在写一本 Apress 的书《Java 8 Recipes》，将于今年晚些时候出版。