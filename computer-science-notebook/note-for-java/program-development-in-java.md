# Java 程序开发 抽象、规格与面向对象设计

[TOC]

这本书教我们如何编程，将编程理论化，如果做架构设计。



## 第一章 概述

* 程序应该本着让人理解的原则来构建。（可读性）
* 分解（decomposition）和抽象（abstraction）是本书的两个核心概念

### 分解和抽象

当分解一个问题时，我们遵循一下的原则将其分解成几个可以再分的子问题：

* 每个子问题在细节上处于相同的级别
* 每个子问题能够独立解决
* 每个子问题的解决方法综合起来能够解决原来的问题。

通过改变问题所涉及的细节等级，抽象可以有效地处理分解的问题。当我们对一个问题进行抽象时，为了简化问题，需要忽略某些细节。例如，我们可能要将剧本的问题抽象为决定这个剧本中有几幕，或者是什么剧情，甚至抽象为每组对话的意思（但不是具体措辞）。完成这些事情以后，似乎最初的问题（即写出剧本中的所有对话）还是没有解决。但是，它已经大大简化了，甚至可以简化到在何处可以从一个要点转到另一个或几个要点。



### 抽象

抽象主要是希望通过将相关的属性和其他不想关的属性分开，以简化分析过程。

抽象关注共有的特征。

两种抽象

* 参数化抽象 abstraction by parameterization

  用参数替换数据特征来进行抽象，这样能归纳出模块，使其可以用于更多的情况。

* 规格化抽象 abstraction by specification

  将执行细节（即模块如何实现）抽象为用户所需求的行为（即模块做什么）。这是从具体实现中抽象出模块。

在规格抽象中，我们关注的是用户所关心的行为，而不是实现行为的细节。规格抽象的关键优势在于，能让我们改变一种实现而不改变任何使用抽象描述的程序的含义（规格抽象就是接口）。例如，我们能够改变用来实现 isPrime 过程的算法，但是 isPrime 对外提供的功能是不变的。

每当要将一个过程与一个注释（这个注释提供了充分的信息，使其他人不用看过程主题就可以使用该过程）关联起来时，我们就会使用规格化抽象。写这种注释的一个好方法是用成对的断言（assertion）注释。一个过程中的 requires 断言（requires assertion）[或者说前置条件(precondition)] 是过程执行前指定一个假定成立的对象。在实践中，最常用到的断言是一组足以确保过程能正确操作的条件。（这也通常成为无实质断言，成立标志为 “TRUE”）。effects 断言（effects assertion）[或者叫后置条件(postcondition)] 是在满足前置条件的过程运行完毕后，指定一个假定成立的结果。

例如如下程序，因为已经提供了响应的规格，所以我们能够忽略过程主题，并且将过程调用 y = sqrt(x) 的意思理解为「过程调用时，如果参数大于 0，则在过程执行完毕后 y 就是 x 平方根的近似值」。

```java
float sqrt(float coef){
  //requires: coef > 0
  //effects: return a approximation to the square root of coef
  float ans = coef / 2.0;
  int i = 1;
  while(i < 7){
    ans = ans - ((ans * ans - coef) / (2.0 * ans));
    i = i + 1;
  }
  return ans;
}
```



抽象的种类：

* 过程抽象：对过程进行抽象（引入新的方法）
* 数据抽象：状态 + 行为（引入新的数据类型）
* 迭代抽象：能够迭代遍历在集合中的元素，而不需要显示如何获取元素的细节

数据抽象是重点，是面向对象程序设计的基础。



## 第二章 理解 Java 中的对象

对象中封装的成员变量，准确的来说，应该叫状态，而方法，是用来修改和获取状态的操作。

对于方法来说，异常也是一种返回结果！

方法的签名：入参和返回值（包括异常）。(函数真正叫什么其实不重要，参考 lambda 表达式。)

Java 是强类型语言，Java 编译器会检查代码，确保每个赋值和调用都是类型正确的。

int 和 float 可以损失精度赋值给 long 类型，但是不能反向提升精度。



## 第三章 过程抽象

过程抽象组合了参数抽象和规格抽象，是输入到输出的映射。（过程就是接口）



### 过程的规格

规格是抽象的唯一记录。

接口的定义。

一个接口的规格，除了接口名、输入和输出（异常）外，还可能有以下三点：

* requires: 使用该接口的前提条件（入参的条件），例如 binarySearch() 方法要求入参必须已经排好序
* modifies: 描述了哪些入参（包含隐式输入）被修改了
* effects: 程序运行的结果

Arrays 中的 sort 和 search 方法是全局的(total)，因为其规格并不包含 requires 要求。而 binarySearch 是局部的（partial），只在参数数组已经排序的情况下才能工作。应该尽量避免规格中包含 requires 条件。

requires 是前置条件，前置条件是和调用方（客户端）的约定，如果可能，应该检查这个 requires 格式是否满足。



### 过程的实现

接口的实现

过程的实现应产生由过程的规格所定义的行为。特别是，过程的实现必须只对出现在 modifies 格式中的那些输入进行修改；如果所有输入都满足 requires 格式，则必须得出与 effects 格式一致的结果。

例如用 Java 语言实现的线性查找方法 searchSorted()，当传入的参数数组为 null 的时候，实现 searchSorted 会返回 -1。这个行为与在规格中描述的行为是一致的。然而，更好的规格可能会对这个情况进行特殊处理，会指示必须抛出一个异常。



### 设计过程抽象

过程（接口）可能包含有如下属性：

* 未确定性：Arrays.search() 就是未确定的，数组中可能包含有多个要查找的元素，不同的算法实现会返回不同的值
* 一般性：如果一个规格能够处理比较大的一类输入，则这个规格就比另一个规格更有一般性

过程（接口）的另一个重要属性是简单性。过程应该要有一个明确定义并且易于解释的名字，如果要想出这样一个名称很困难，则这个过程可能就有问题了。

如果检查显示 requires 格式没有满足，则过程可以产生一个错误提示消息。但更好的方法通常是抛出一个异常。

接口可以分成两类：局部的（partial）和全局的（total）。对外暴露的接口，最好是全局的（没有 requires 约束），私有方法可以用局部约束。

全局过程和局部过程：

* 如果一个过程的行为对所有合法输入都是合适的，则这个过程就是全局的；否则，这个过程就是局部的。一个局部过程的规格总是包含一个 requires 格式。
* 局部过程比全局过程更不安全。因此，它们应该只在使用环境是有限时或者能带来重要好处时才能使用。
* 可能的时候，编程时应该检查 requires 格式中的约束条件。并且，如果这些约束条件不能满足就抛出一个异常。



## 第四章 异常

### exception 存在的意义

异常也是一种返回值！异常将业务代码和异常处理代码解耦。

以下的内容，取自程序开发原理：

过程（接口）抽象是从自变量到结果的映射，可能会有一些对自变量的修改。自变量属于过程的定义域（domain），结果属于过程的值域（range）。只有当自变量从属于过程的定义域的子集时，这个过程才是有意义的。例如，只有当其自变量是正数时计算阶乘的过程才有意义。再例如，只有当元素出现在数组中时，查找（search）过程才返回元素的索引。

处理这种情况的方法之一是使用局部过程（partial procedures），例如，只有当 gcd 的自变量是正数时，才可以进行定义：

```java
public static int gcd(int n, int d){
  // requires: n, d > 0
  // effects: return the greatest common divisor of n and d
}
```

局部过程的调用者必须明确自变量属于定义域的子集，而实现者可以忽略这个子集之外的自变量。这样，在实现 gcd 的过程中，就可以忽略非正数自变量的情况了。

然而，一般来说，使用局部过程并不是什么好的解决方法，因为我们不能保证调用者一定不会传入 < 0 的值。局部过程不能保证程序的鲁棒性。一个稳健的程序，即使发生错误，也应该继续合理的变现出错误。如果发生错误，程序无法像无错误时一样表现，则必须以一个明确定义的方式表现。

增强稳健性的方法是使用全过程（total procedures）：就是指为所有定义域内的输入都定义行为的过程。如果过程不能为其中某些输入执行其预期功能，则至少能够通知调用者。这样会引起调用者的注意，从而采取措施。

如果一个问题产生了，如何才能使调用者注意到它呢？一种可能，是使用特殊结果来传达这个信息。例如，如果计算阶乘过程的自变量不是正数，则会返回零：

```java
public static int fact(int n)
  // effects: if n > 0 return n! else return 0
```

这个解决方法其实并不大行，因为带有非法自变量的调用本身就是一个错误，如果用一个特殊的方法来处理这个情况就更好了。这样，使用这个接口的程序员就不太可能出错而忽略这个错误了。返回一个特殊值也可能给调用代码带来不便，返回了特殊值后，就必须再检查一下这个调用代码的结果，例如：

```java
// 原来的代码
z = x + Num.fact(y);
// 优化后的代码
int r = Num.fact(y);
if(r > 0) z = x + r; else ...
```

另外，如果返回类型的每个值都是过程的一个可能的结果，则这种返回一个特殊结果的解决方法就是不可能的，因为没有剩余值可以使用了。例如，向量 vector 的 get 方法返回向量的第 i 个元素的值，这个值可以是任何一个对象或者是 null。所以我们无法通过返回一个特殊对象或者返回 null 来传达有关越界的索引信息。

我们需要的是一种即时在返回类型的每个值都是合法结果时也能传达所有情况中有关不寻常信息的途径。而且，这个途径最好能够以某种方法区别哪些情况，这样用户就不会因为出错而忽略了它们。如果这个途径能使对这些情况的处理与其他正常的程序控制流分开进行（将业务代码和异常处理代码解耦），则是最佳的。

异常机制机制提供了我们所需要的，允许过程通过返回一个结果而正常终止或者异常终止！



### checked exception vs runtime exception

>  对可恢复的情况使用受检异常，对编程错误使用运行时异常。—— Effective Java

checked exception（受检异常） 继承自 Exception，unchecked exception（运行时异常，不可控异常） 继承自 RuntimeException。Exception 和 RuntimeException 都实现了 throwable 接口。

checked exception 必须被 try 或者抛出，unchecked exception 是隐藏的异常。

什么时候使用受检异常，什么时候使用运行时异常？如果期望调用者能够合理的恢复程序运行，对于这种情况就应该使用受检异常。

```java
try{
    String userInput = //read in user input
    Long id = Long.parseLong(userInput);
}catch(NumberFormatException e){
    id = 0; //recover the situation by setting the id to 0
}
```

用运行时异常来表明编程错误（调用接口的方式错误！）。大多数运行时异常都表示前提违例（precondition violation），就是指 API 的客户并没有遵守 API 规范建立的约定（你调用接口的方式错了，给你返回一个运行时异常，你重新调用）。例如，数组访问的预定指明了数组的下标值必须在 0 和数组长度 - 1之间。ArrayIndexOutOfBoundsException 表明违反了这个前提。

为什么 Web 服务返回的异常都使用 RuntimeException？因为 Web 服务的异常大多数都是接口调用方式不对，所以我们用 RuntimeException 来封装这些错误，并且直接冒泡返回，不需要层层 throw。



### 什么时候使用异常

我们大多数时候使用的异常都是 RuntimeException。

异常应该用来去除大多数在 requires 中列出的约束条件（precondition）。requires 应该只为效率原因保留，或者在我们能确定调用该接口的时候一定能满足约束条件的时候，才保留 requires。

异常也应该用来消除在正常结果中的数字代码信息（异常就是异常，不能用特殊值来代替）。例如，如果元素不存在于数组中，search 就是一个异常，而不是返回一个特殊的数字。通过使用异常，我们能够清晰地区分正常的结果和异常的情况。

使用异常的规则：

* 如果使用的环境是局部的，例如调用一个 private 方法，则不需要使用异常，因为能证实 requires 格式很容易得到满足，并且可以恰当地使用特殊结果。
* 但是，如果使用的环境是非局部的，例如公开的接口，则应该使用异常来代替特殊的结果。并且，应该使用异常来代替使用 requires 格式。（参考 Web 接口的异常码机制）



### 异常实战：防御编程

带有 requires 格式的过程的实现，如果可能，应该检查这个 requires 格式是否满足。如果没有满足，就抛出运行时异常 FailureException（requires 是契约，既然没有按照契约调用该接口，就是编程错误，就应该抛出运行时异常）。

接口的方法名不应该列出 FailureException，而且过程的规格中也不应该提到抛出它。因为这个异常描述的是不符合 precondition 的情况，调用者只有满足了这个 precondition 才能不抛出该异常。

更普遍的情况是，每当代码检查到一个应该满足的 precondition，但是这个 precondition 不满足时，就应该抛出运行时异常，表示没有准确地调用这个接口！



## 第五章 数据抽象



### 类的定义

数据抽象的规格。

一个类型的意义，不应该由其任何一个实现给出，而是应该由规格定义其行为。由于类型的对象只通过调用操作使用，所以大多数规格都是用于解释这些操作做了什么。（类的定义）



成员方法分类：

* 创建者（creator）：构造函数
* 生成者（producer）：这些操作将其类型的对象作为输入，并且生成一个新的同类型对象，既可能是构造函数，也可能是普通方法，例如 add 和 mul 就是 Poly 的生成者
* 改变者（mutator）：修改对象的状态，例如 List 的 add 方法，setter 方法
* 观察者（observer）：读取对象的状态，getter 方法



immutable 对象：没有 modified（mutator） 的方法，成员变量不会被改动，例如定义一个多项式，定义一个 String

mutable 对象： 有 modified（mutator） 方法，会改动成员变量，例如 Set 和 List



### getter 和 setter



成员变量为何一定是 private 的？

为了支持抽象，将访问成员变量在方法和构造函数的实现范围内是很重要的。比如，这让你能够重新实现一个抽象类型而不影响任何使用这个类型的代码。成员变量对用户来说必须是不可见的，使用对象的代码只可以指向其方法。要防止成员变量被 client 看到，则需要声明它们为非公有。类只暴露方法，不暴露成员变量。

[Why use getters and setters/accessors?](https://stackoverflow.com/questions/1568091/why-use-getters-and-setters-accessors)

[Significance of Getters and Setters in Java](https://www.baeldung.com/java-why-getters-setters)

如果 Java 中没有 getter setter 的话：

1. 如果任何 client 都可以通过 `.` 直接修改对象的成员变量，那么某些类型便失去了 immutable 特性，例如 Poly 类型

2. we cannot provide any conditional logic to the change of the variable. Let's consider we have a class *Employee* with a field *retirementAge*:

   ```java
   public class Employee {
       public String name;
       public int retirementAge;
   
   // Constructor, but no getter/setter
   }
   ```

   Note that, here we've set the fields as public to enable access from outside the class *Employee*. Now, we need to change the *retirementAge* of an employee:

   ```java
   public class RetirementAgeModifier {
   
       private Employee employee = new Employee("John", 58);
   
       private void modifyRetirementAge(){
           employee.retirementAge=18;
       }
   }
   ```

   Here, any client of the *Employee* class can easily do what they want with the *retirementAge* field. **There's no way to validate the change.**

3. how could we achieve read-only or write-only access to the fields from outside the class?

Java 中 getter 和 setter 的作用：

1. It helps us achieve encapsulation which is used to hide the state of a structured data object inside a class, preventing unauthorized direct access to them
2. Achieve immutability by declaring the fields as private and using only getters
3. Getters and setters also allow additional functionalities like validation（例如校验退休年龄是否超过 60 岁）, error handling that could be added more easily in the future. Thus we can add conditional logic and provide behavior according to the needs
4. We can provide different access levels to the fields; for example, the get (read-access) may be public, while the set (write-access) could be protected
5. Control over setting the value of the property correctly
6. With getters and setters, we achieve one more key principle of OOP, i.e., abstraction, which is hiding implementation details so that no one can use the fields directly in other classes or modules



在使用 getter 和 setter 时可能犯的错误：

* Assigning Object References Directly in the Setter Methods

  When we assign object reference directly in the setter methods, both these references point to a single object in memory. So, changes made using any of the reference variables are actually made on the same object:

  ```java
  public void setEmployee(Employee employee) {
      this.employee = employee;
  }
  ```

  However, we can copy all the elements from one object to another object using a [deep copy](https://www.baeldung.com/java-deep-copy). Due to this, the state of *this* object becomes independent of the existing (passed) employee object:

  ```java
  public void setEmployee(Employee employee) {
      this.employee.setName(employee.getName());
      this.employee.setRetirementAge(employee.getRetirementAge());
  }
  ```

* Returning Object References Directly From the Getter Methods

  Similarly, if the getter method returns the reference of the object directly, anyone can use this reference from the outside code to change the state of the object:

  ```java
  public Employee getEmployee() {
      return this.employee;
  }
  ```

  Let's use this *getEmployee()* method and change the *retirementAge:*

  ```java
  private void modifyAge() {
      Employee employeeTwo = getEmployee();
      employeeTwo.setRetirementAge(65);
  }
  ```

  This leads to the unrecoverable loss of the original object.

  So, instead of returning the reference from the getter method, we should return a copy of the object. One such way is as below:

  ```java
  public Employee getEmployee() {
      return new Employee(this.employee.getName(), this.employee.getRetirementAge());
  }
  ```

  However, we should also keep in mind that creating copies of objects within the getter or setter might not always be a best practice. For example, calling the above getter method in a loop could result in an expensive operation.

  On the other hand, if we want that our collection should remain unmodifiable, it would make sense to return a copy of the collection from a getter. We then have to determine which approach suits best in a certain situation.



## 第六章 迭代抽象



