# java bean

[TOC]

[stackoverflow](https://stackoverflow.com/questions/1612334/difference-between-dto-vo-pojo-javabeans)



## JavaBean

A JavaBean is a class that follows [the JavaBeans conventions](http://www.oracle.com/technetwork/java/javase/documentation/spec-136004.html) as defined by Sun. Wikipedia has a pretty good summary of what [JavaBeans](http://en.wikipedia.org/wiki/JavaBean) are:

> JavaBeans are reusable software components for Java that can be manipulated visually in a builder tool. Practically, they are classes written in the Java programming language conforming to a particular convention. They are used to encapsulate many objects into a single object (the bean), so that they can be passed around as a single bean object instead of as multiple individual objects. A JavaBean is a Java Object that is serializable, has a nullary constructor, and allows access to properties using getter and setter methods.
>
> In order to function as a JavaBean class, an object class must obey certain conventions about method naming, construction, and behavior. These conventions make it possible to have tools that can use, reuse, replace, and connect JavaBeans.
>
> The required conventions are:
>
> - The class must have a public default constructor. This allows easy instantiation within editing and activation frameworks.
> - The class properties must be accessible using get, set, and other methods (so-called accessor methods and mutator methods), following a standard naming convention. This allows easy automated inspection and updating of bean state within frameworks, many of which include custom editors for various types of properties.
> - The class should be serializable. This allows applications and frameworks to reliably save, store, and restore the bean's state in a fashion that is independent of the VM and platform.
>
> Because these requirements are largely expressed as conventions rather than by implementing interfaces, some developers view JavaBeans as Plain Old Java Objects that follow specific naming conventions.

JavaBean 必须有一个公开的无参构造方法，必须可以被序列化，必须有 get set 方法。可以实现接口，可以集成某一个类。

```java
public class PersonBean implements java.io.Serializable {

    /** Properties **/
    private boolean deceased = false;

    private List list;

    /** Property "name", readable/writable. */
    private String name = null;

    /** No-arg constructor (takes no arguments). */
    public PersonBean() {
    }

    public List getList() {
        return list;
    }
	
    public void setList(final List list) {
        this.list = list;
    }

    /**
     * Getter for property "name".
     */
    public String getName() {
        return name;
    }

    /**
     * Setter for property "name".
     *
     * @param value
     */
    public void setName(final String value) {
        this.name = value;
    }

    /**
     * Getter for property "deceased"
     * Different syntax for a boolean field (is v.s. get)
     */
    public boolean isDeceased() {
        return deceased;
    }

    /**
     * Setter for property "deceased".
     * @param value
     */
    public void setDeceased(boolean value) {
        deceased = value;
    }
}
```



## POJO

A Plain Old Java Object or POJO is a term initially introduced to designate a simple lightweight Java object, not implementing any `javax.ejb` interface, as opposed to heavyweight EJB 2.x (especially Entity Beans, Stateless Session Beans are not that bad IMO). Today, the term is used for any simple object with no extra stuff. Again, Wikipedia does a good job at defining [POJO](http://en.wikipedia.org/wiki/Plain_Old_Java_Object):

> POJO is an acronym for Plain Old Java Object. The name is used to emphasize that the object in question is an ordinary Java Object, not a special object, and in particular not an Enterprise JavaBean (especially before EJB 3). The term was coined by Martin Fowler, Rebecca Parsons and Josh MacKenzie in September 2000:
>
> > *"We wondered why people were so against using regular objects in their systems and concluded that it was because simple objects lacked a fancy name. So we gave them one, and it's caught on very nicely."*
>
> The term continues the pattern of older terms for technologies that do not use fancy new features, such as POTS (Plain Old Telephone Service) in telephony, and PODS (Plain Old Data Structures) that are defined in C++ but use only C language features, and POD (Plain Old Documentation) in Perl.
>
> The term has most likely gained widespread acceptance because of the need for a common and easily understood term that contrasts with complicated object frameworks. A JavaBean is a POJO that is serializable, has a no-argument constructor, and allows access to properties using getter and setter methods. An Enterprise JavaBean is not a single class but an entire component model (again, EJB 3 reduces the complexity of Enterprise JavaBeans).
>
> As designs using POJOs have become more commonly-used, systems have arisen that give POJOs some of the functionality used in frameworks and more choice about which areas of functionality are actually needed. Hibernate and Spring are examples.

一个轻量的 Java object，没有构造方法，不能继承，也不能实现任何接口，也不能加任何注解。要有 get set 方法。

```java
public class MyBean {

    private String someProperty;

    public String getSomeProperty() {
         return someProperty;
    }

    public void setSomeProperty(String someProperty) {
        this.someProperty = someProperty;
    }
}
```



## DTO

In the field of programming a **data transfer object** (**DTO**[[1\]](https://en.wikipedia.org/wiki/Data_transfer_object#cite_note-msdn-1)[[2\]](https://en.wikipedia.org/wiki/Data_transfer_object#cite_note-fowler-2)) is an object that carries data between processes. The motivation for its use is that communication between processes is usually done resorting to remote interfaces (e.g., web services), where each call is an expensive operation.[[2\]](https://en.wikipedia.org/wiki/Data_transfer_object#cite_note-fowler-2) Because the majority of the cost of each call is related to the round-trip time between the client and the server, one way of reducing the number of calls is to use an object (the DTO) that aggregates the data that would have been transferred by the several calls, but that is served by one call only.[[2\]](https://en.wikipedia.org/wiki/Data_transfer_object#cite_note-fowler-2)

The difference between data transfer objects and [business objects](https://en.wikipedia.org/wiki/Business_object) or [data access objects](https://en.wikipedia.org/wiki/Data_access_object) is that a DTO does not have any behavior except for storage, retrieval, serialization and deserialization of its own data ([mutators](https://en.wikipedia.org/wiki/Mutator_method), [accessors](https://en.wikipedia.org/wiki/Method_(computer_programming)), [parsers](https://en.wikipedia.org/wiki/Parsing) and [serializers](https://en.wikipedia.org/wiki/Serialization)). In other words, DTOs are simple objects that should not contain any business logic but may contain serialization and deserialization mechanisms for transferring data over the wire.

**DTO -** Data transfer objects are just data containers which are used to transport data between layers and tiers.

- It mainly contains attributes. You can even use public attributes without getters and setters.
- Data transfer objects do not contain any business logic.

> **Analogy:**
> Simple Registration form with attributes username, password and email id.
>
> - When this form is submitted in RegistrationServlet file you will get all the attributes from view layer to business layer where you pass the attributes to java beans and then to the DAO or the persistence layer.
> - DTO's helps in transporting the attributes from view layer to business layer and finally to the persistence layer.

DTO was mainly used to get data transported across the network efficiently, it may be even from JVM to another JVM.

DTOs are often `java.io.Serializable` - in order to transfer data across JVM.

DTO 用于在不同层、客户端服务端之间交换数据。DTO 对数据进行封装，这些就较少了调用次数。

DTO 只用来封装数据，不包含业务方法，只有 get，set 方法，序列化和反序列化方法。

DTO 主要用于服务端返回数据给客户端。



## Qo

Query Object，和 DTO 类似，同样用来封装数据。区别在于，Qo 主要用于封装客户端对后端的查询参数（比 DTO 多了 `@NotEmpty` 和 `@NotNull`）：

```java
@Data
public class PermissionCheckQo {

    @ApiModelProperty(name="权限所在服务ID")
    @NotEmpty(message = "服务ID不能为空")
    @NotNull(message = "服务ID不能缺少")
    private String serviceId;

    @ApiModelProperty(name="权限表达式")
    @NotEmpty(message = "权限表达式不能为空")
    @NotNull(message = "权限表达式不能缺少")
    private String permission;
}
```

