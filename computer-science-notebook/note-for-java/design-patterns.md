# 设计模式



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

