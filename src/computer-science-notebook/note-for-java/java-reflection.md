# Java 反射



## 类的解剖



## 泛型类的解剖

```java
public class Student extends Person<Integer, Boolean>{

    public static void main(String[] args) {
        Student student = new Student();
        Class<? extends Student> clazz = student.getClass();
        // getSuperclass()获得该类的父类
        System.out.println(clazz.getSuperclass());

        /***
         * getGenericSuperclass() 获得带有泛型的父类
         * Type 是 Java 编程语言中所有类型的公共高级接口。它们包括原始类型、参数化类型、数组类型、类型变量和基本类型
         */
        Type type = clazz.getGenericSuperclass();
        // generic.Person<java.lang.Integer, java.lang.Boolean>
        System.out.println(type);

        //ParameterizedType参数化类型，即泛型
        ParameterizedType parameterizedType = (ParameterizedType)type;
        Type[] actualTypeArguments = parameterizedType.getActualTypeArguments();
        // java.lang.Integer
        System.out.println(actualTypeArguments[0]);
        // java.lang.Boolean
        System.out.println(actualTypeArguments[1]);
    }

}
```

