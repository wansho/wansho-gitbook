# 集合

[TOC]

## Collection 集合

### Collection 接口定义的集合通用方法

```java
package com.wansho.hellojava;

import java.util.ArrayList;
import java.util.Collection;
public class CollectionDemo {
    /**
     * @param args
     */
    public static void main(String[] args) {
        Collection coll = new ArrayList();
        // show(coll);
        Collection c1 = new ArrayList();
        Collection c2 = new ArrayList();
        show(c1,c2);
    }
    public static void show(Collection c1,Collection c2){
        //给c1添加元素。
        c1.add("abc1");
        c1.add("abc2");
        c1.add("abc3");
        c1.add("abc4");
        //给c2添加元素。
        c2.add("abc1");
        c2.add("abc2");
        c2.add("abc3");
        c2.add("abc4");
        c2.add("abc5");
        System.out.println("c1:"+c1); // c1:[abc1, abc2, abc3, abc4]
        System.out.println("c2:"+c2);
        //演示addAll
        c1.addAll(c2);//将c2中的元素添加到c1中。
        //演示removeAll
        // boolean b = c1.removeAll(c2); // 将两个集合中的相同元素从调用removeAll的集合中删除。
        // System.out.println("removeAll:"+b);
        //演示containsAll
        boolean b = c1.containsAll(c2);
        System.out.println("containsAll:"+b);
        //演示retainAll
        // b = c1.retainAll(c2); // 取交集，保留和指定的集合相同的元素，而删除不同的元素。
        //和removeAll功能相反 。
        // System.out.println("retainAll:"+b);
        System.out.println("c1:"+c1);
    }
    public static void show(Collection coll){
        //1,添加元素。 add.
        coll.add("abc1");
        coll.add("abc2");
        coll.add("abc3");
        System.out.println(coll);
        //2，删除元素。 remove
        // coll.remove("abc2");//会改变集合的长度
        //清空集合.
        // coll.clear();
        System.out.println(coll.contains("abc3"));
        System.out.println(coll);
    }
}
```



### Iterator  迭代器

Collection 接口实现了 Iterable 接口，具备了可迭代的特性

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
public class IteratorDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        Collection coll = new ArrayList();
        coll.add("abc1");
        coll.add("abc2");
        coll.add("abc3");
        coll.add("abc4");
        // System.out.println(coll);
        //使用了Collection中的iterator()方法。 调用集合中的迭代器方法，是为了获取集合中的迭代器对象。
        // Iterator it = coll.iterator();
        // while(it.hasNext()){
        // System.out.println(it.next());
        // }
        for(Iterator it = coll.iterator(); it.hasNext(); ){
            System.out.println(it.next());
        }
        // System.out.println(it.next());
        // System.out.println(it.next());
        // System.out.println(it.next()); // java.util.NoSuchElementException
    }
}
```



### List

#### ArrayList

关键字：ListIterator，list.get(i)

```java
import java.util.ArrayList;
import java.util.List;
public class ListDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        List list = new ArrayList();
        show(list);
    }
    public static void show(List list) {
        //添加元素
        list.add("abc1");
        list.add("abc2");
        list.add("abc3");
        System.out.println(list);
        //插入元素。
        // list.add(1,"abc9");
        //删除元素。
        // System.out.println("remove:"+list.remove(2));
        //修改元素。
        // System.out.println("set:"+list.set(1, "abc8"));
        //获取元素。
        // System.out.println("get:"+list.get(0));
        //获取子列表。
        // System.out.println("sublist:"+list.subList(1, 2));
        System.out.println(list);
    }
}
```

```java
package com.wansho.hellojava;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
public class ListDemo2 {
    /**
     * @param args
     */
    public static void main(String[] args) {
        List list = new ArrayList();
        // show(list);
        list.add("abc1");
        list.add("abc2");
        list.add("abc3");
        System.out.println("list:"+list);
        ListIterator it = list.listIterator();//获取列表迭代器对象
        //它可以实现在迭代过程中完成对元素的增删改查。
        //注意：只有list集合具备该迭代功能.
        while(it.hasNext()){
            Object obj = it.next();
            if(obj.equals("abc2")){
                it.set("abc9"); // 改
            }
        }
        System.out.println("hasNext:"+it.hasNext());
        System.out.println("hasPrevious:"+it.hasPrevious());
        while(it.hasPrevious()){
            System.out.println("previous:"+it.previous());
        }
        System.out.println("list:"+list);
        show(list);
        Iterator itt = list.iterator();
        while(itt.hasNext()) {
            Object obj = it.next();//java.util.ConcurrentModificationException
            //在迭代器过程中，不要使用集合操作元素，容易出现异常。
            //可以使用Iterator接口的子接口ListIterator来完成在迭代中对元素进行更
            //多的操作。
            if (obj.equals("abc2")) {
                list.add("abc9");
            } else {
                System.out.println("next:" + obj);
            }
            System.out.println(list);
        }
    }
    public static void show(List list) {
        list.add("abc1");
        list.add("abc2");
        list.add("abc3");
        list.add("abc4");
        Iterator it = list.iterator();
        while(it.hasNext()){
            System.out.println("next:"+it.next());
        }
        //list特有的取出元素的方式之一。
        for(int x=0; x<list.size(); x++){
            System.out.println("get:"+list.get(x));
        }
    }
}
```

#### Vector

It is similar to the ArrayList, but with two differences. 

- Vector is synchronized. Vector 是**线程安全**的。
- Java Vector contains many legacy methods that are not the part of a collections framework.

```java
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Vector;

public class VectorDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        Vector v = new Vector();
        v.addElement("abc1");
        v.addElement("abc2");
        v.addElement("abc3");
        v.addElement("abc4");
        Enumeration en = v.elements();
        while(en.hasMoreElements()){
            System.out.println("nextelment:"+en.nextElement());
        }
        Iterator it = v.iterator();
        while(it.hasNext()){
            System.out.println("next:"+it.next());
        }
    }
}
```

#### LinkedList

```java
import java.util.Iterator;
import java.util.LinkedList;
public class LinkedListDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        LinkedList link = new LinkedList();
        link.addFirst("abc1");
        link.addFirst("abc2");
        link.addFirst("abc3");
        link.addFirst("abc4");
        // System.out.println(link);
        // System.out.println(link.getFirst());//获取第一个但不删除。
        // System.out.println(link.getFirst());
        // System.out.println(link.removeFirst());//获取元素但是会删除。
        // System.out.println(link.removeFirst());
        while(!link.isEmpty()){
            System.out.println(link.removeLast());
        }
        System.out.println(link);
        // Iterator it = link.iterator();
        // while(it.hasNext()){
        // System.out.println(it.next());
        // }
    }
}
```

#### Queue

| Modifier and Type | Method       | Description                                                  |
| :---------------- | ------------ | ------------------------------------------------------------ |
| `boolean`         | `add(E e)`   | Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning `true` upon success and throwing an `IllegalStateException` if no space is currently available. |
| `E`               | `element()`  | Retrieves, but does not remove, the head of this queue.      |
| `boolean`         | `offer(E e)` | Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions. |
| `E`               | `peek()`     | Retrieves, but does not remove, the head of this queue, or returns `null` if this queue is empty. |
| `E`               | `poll()`     | Retrieves and removes the head of this queue, or returns `null` if this queue is empty. |
| `E`               | `remove()`   | Retrieves and removes the head of this queue.                |

add()和remove()方法在失败的时候会抛出异常(不推荐)，用 offer 和 poll 代替。

利用 Queue 进行层次遍历 Demo：

```java
public List<Concept> findAllSubConcepts(Concept rootConcept) {
        List<Concept> subConcepts = new ArrayList<>();
        Queue<Concept> queue = new LinkedList<>();
        Concept tmpConcept = null;
        queue.add(rootConcept);
        while(!queue.isEmpty()){
            tmpConcept = queue.remove();
            subConcepts.add(tmpConcept);
            String tmpConceptId = tmpConcept.getId();
            List<Concept> subLevelConcepts = conceptRepo.findConceptsByFId(tmpConceptId);
            queue.addAll(subLevelConcepts);
        }
        return subConcepts;
    }
```



### Set

#### HashSet

HashSet 首先是一个 Set。

```java
import java.util.HashSet;
import java.util.Iterator;

public class HashSetDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        HashSet hs = new HashSet();
        hs.add("hehe");
        // hs.add("heihei");
        hs.add("hahah");
        hs.add("xixii");
        hs.add("hehe");
        Iterator it = hs.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
}
```

```java
package com.wansho.hellojava;

import java.util.HashSet;
import java.util.Iterator;

class Person{
    private String name;
    private int age;
    Person(String name, int age){
        this.name = name;
        this.age = age;
    }

    public String getName(){
        return this.name;
    }

    public int getAge(){
        return this.age;
    }


    @Override
    public int hashCode() {
        return name.hashCode() + age * 37; // hash 加盐，防止冲突
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj){ // 先判断一次内存地址，防止一个对象传入两次
            return true;
        }
        if(!(obj instanceof Person)){ // 健壮性判断
            throw new ClassCastException("类型不对");
        }
        Person p = (Person)obj;
        if((p.name.equals(this.name)) && (p.age==this.age)){ // 此处存疑， name 和 age 都是封装的，为什么可以直接调用？—> 同一个类可以内部调用
            return true;
        }
        return false;
    }
}


/*
 * 往hashSet集合中存储Person对象。如果姓名和年龄相同，视为同一个人。视为相同元素。
 */
public class HashSetTest {
    public static void main(String[] args) {
        HashSet hs = new HashSet();
        /*
         * HashSet集合数据结构是哈希表，所以存储元素的时候，
         * 使用的元素的 hashCode 方法来确定位置，如果位置相同，在通过元素的equals来确定是否相同。
         *
         */
        hs.add(new Person("lisi4",24));
        hs.add(new Person("lisi7",27));
        hs.add(new Person("lisi1",21));
        hs.add(new Person("lisi9",29));
        hs.add(new Person("lisi7",27));
        Iterator it = hs.iterator();
        while(it.hasNext()){
            Person p = (Person)it.next();
            System.out.println(p);
            System.out.println(p.getName()+"...."+p.getAge());
        }
    }
}
```

#### LinkedHashSet

LinkedHashSet 是 hashset 的子类，其能保证对象的插入顺序

```java
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;

public class LinkedHashSetDemo {
    public static void main(String[] args) {
        HashSet hs = new LinkedHashSet();
        hs.add("hahah");
        hs.add("hehe");
        hs.add("heihei");
        hs.add("xixii");
        // hs.add("hehe");
        Iterator it = hs.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
    /*
     *
     * hahah
     * hehe
     * heihei
     * xixii 顺序不变
     * */
}
```

#### TreeSet Comparator

TreeSet 是有顺序的 Set。

基于 TreeMap 的 NavigableSet 实现。使用元素的自然顺序对元素进行排序，或者根据创建 set 时提供的 Comparator进行排序，具体取决于使用的构造方法。

Comparator 接口：

a negative integer, zero, or a positive integer as the first argument is less than, equal to, or greater than the second.

```java
package com.wansho.hellojava;

import java.util.Comparator;
import java.util.Iterator;
import java.util.TreeSet;

/**
 * 创建了一个根据Person类的 name 进行排序的比较器。
 */
class ComparatorByName implements Comparator {
    @Override
    public int compare(Object o1, Object o2) {
        Person p1 = (Person)o1;
        Person p2 = (Person)o2;
        int temp = p1.getName().compareTo(p2.getName());
        return temp==0?p1.getAge()-p2.getAge(): temp;
        // return 1;//有序。
    }
}
public class TreeSetDemo {
    public static void main(String[] args) {
        TreeSet ts = new TreeSet(new ComparatorByName());
        /*
         * 以 Person 对象年龄进行从小到大的排序。
         *
         */
        ts.add(new Person("zhangsan",28));
        ts.add(new Person("lisi",21));
        ts.add(new Person("zhouqi",29));
        ts.add(new Person("zhouqi",25));
        ts.add(new Person("wangu",24));
        Iterator it = ts.iterator();
        while(it.hasNext()){
            Person p = (Person)it.next();
            System.out.println(p.getName()+":"+p.getAge());
        }
        System.out.println("------------------");
        demo1();
    }
    public static void demo1() {
        TreeSet ts = new TreeSet();
        ts.add("abc");
        ts.add("zaa");
        ts.add("aa");
        ts.add("nba");
        ts.add("cba");
        Iterator it = ts.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
}

/*
lisi:21
wangu:24
zhangsan:28
zhouqi:25
zhouqi:29
------------------
aa
abc
cba
nba
zaa
*/
```

```java
import java.util.Comparator;
import java.util.Iterator;
import java.util.TreeSet;

/*
定义一个按长度作比较的比较器
*/
class ComparatorByLength implements Comparator {
    @Override
    public int compare(Object o1, Object o2) {
        String s1 = (String)o1;
        String s2 = (String)o2;
        int temp = s1.length()-s2.length();
        return temp==0? s1.compareTo(s2): temp; // 三木运算符，
    }
}
/*
 * 对字符串进行长度排序。
 *
 * "20 18 -1 89 2 67"
 */
public class TreeSetTest {
    public static void main(String[] args) {
        TreeSet ts = new TreeSet(new ComparatorByLength());
        ts.add("aaaaa");
        ts.add("zz");
        ts.add("nbaq");
        ts.add("cba");
        ts.add("abc");
        Iterator it = ts.iterator();
        while(it.hasNext()){
            System.out.println(it.next());
        }
    }
}
```

**另一种实现 Comparable 的方法：让对象实现 Comparable**

```java
public class Person /*extends Object*/ implements Comparable {
    private String name;
    private int age;
    public Person() {
        super();
    }
    public Person(String name, int age) {
        super();
        this.name = name;
        this.age = age;
    }
    @Override
    public int hashCode() {
        return name.hashCode()+age*27;
    }
    @Override
    public boolean equals(Object obj) {
        if(this == obj)
            return true;
        if(!(obj instanceof Person))
            throw new ClassCastException("类型错误");
        Person p = (Person)obj;
        return this.name.equals(p.name) && this.age == p.age;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String toString(){
        return name+":"+age;
    }
    @Override
    public int compareTo(Object o) {
        Person p = (Person)o;
        int temp = this.age-p.age;
        return temp==0?this.name.compareTo(p.name):temp;
    }
}
```

### List Set 总结

* 集合类的使用场景：

  对象用于封装特有数据，对象多了需要存储，如果对象的个数不确定。就使用集合容器进行存储。

* 集合特点

  * 用于存储对象的容器
  * 集合的长度是可变的
  * 集合中不可以存储基本数据类型值（但是能存储包装类）

* 集合容器因为内部的数据结构不同，有多种具体容器。不断的向上抽取，就形成了集合框架。

  * 框架的顶层Collection接口

    ```java
    /*
    Collection的常见方法：
    1，添加。
        boolean add(Object obj):
        boolean addAll(Collection coll):
    2，删除。
        boolean remove(object obj):
        boolean removeAll(Collection coll);
        void clear();
    3，判断：
        boolean contains(object obj):
        boolean containsAll(Colllection coll);
        boolean isEmpty():判断集合中是否有元素。
    4，获取：
        int size():
        Iterator iterator() 取出元素的方式：迭代器。
        该对象必须依赖于具体容器，因为每一个容器的数据结构都不同。
        所以该迭代器对象是在容器中进行内部实现的。
        对于使用容器者而言，具体的实现不重要，只要通过容器获取到该实现的迭代器的对象即可，
        也就是iterator方法。
        Iterator接口就是对所有的Collection容器进行元素取出的公共接口。
        其实就是抓娃娃游戏机中的夹子！
    5，其他：
        boolean retainAll(Collection coll); 取交集。
        Object[] toArray(); 将集合转成数组。
    */
    
    ```

  * Collection
    |--List：有序(存入和取出的顺序一致),元素都有索引(角标)，元素可以重复。
    |--Set：元素不能重复,无序。  

  * List

    ```java
    /*
    List:特有的常见方法：有一个共性特点就是都可以操作角标。
    1，添加
        void add(index, element);
        void add(index, collection);
    2，删除；
    	Object remove(index):
    3，修改：
    	Object set(index,element);
    4，获取：
        Object get(index);
        int indexOf(object);
        int lastIndexOf(object);
        List subList(from,to);
        
    list集合是可以完成对元素的增删改查。
    List:
    |--Vector:内部是数组数据结构，是同步的。增删，查询都很慢！
    |--ArrayList:内部是数组数据结构，是不同步的。替代了Vector。查询的速度快。
    |--LinkedList:内部是链表数据结构，是不同步的。增删元素的速度很快。
    
    LinkedList:
        addFirst();
        addLast():
        jdk1.6
        offerFirst();
        offetLast();
        getFirst();.//获取但不移除，如果链表为空，抛出NoSuchElementException.
        getLast();
        jdk1.6
        peekFirst();//获取但不移除，如果链表为空，返回null.
        peekLast():
        removeFirst();//获取并移除，如果链表为空，抛出NoSuchElementException.
        removeLast();
        jdk1.6
        pollFirst();//获取并移除，如果链表为空， 返回null.
        pollLast(); 
    
    */
    ```

  * Set

    ```java
    /*
    Set接口中的方法和Collection一致。
    |--HashSet: 内部数据结构是哈希表 ，是不同步的。
        如何保证该集合的元素唯一性呢？
        是通过对象的hashCode和equals方法来完成对象唯一性的。
        如果对象的hashCode值不同，那么不用判断equals方法，就直接存储到哈希表中。
        如果对象的hashCode值相同，那么要再次判断对象的equals方法是否为true。
        如果为true，视为相同元素，不存。如果为false，那么视为不同元素，就进行存储。
        
        记住：如果元素要存储到HashSet集合中，必须覆盖 hashCode 方法和 equals 方法。
        一般情况下，如果定义的类会产生很多对象，比如人，学生，书，通常都需要覆盖equals， hashCode
        方法。
    
    |--TreeSet:可以对Set集合中的元素进行排序。是不同步的。
        判断元素唯一性的方式：就是根据比较方法的返回结果是否是0，是0，就是相同元素，不存。
        TreeSet对元素进行排序的方式一：(方法一更直观，更符合直觉)
        	让元素自身具备比较功能，元就需要实现Comparable接口。覆盖compareTo方法。
        	如果不要按照对象中具备的自然顺序进行排序。如果对象中不具备自然顺序。怎么办？
        可以使用TreeSet集合第二种排序方式二：
        	让集合自身具备比较功能，定义一个类实现Comparator接口，覆盖compare方法。
        	将该类对象作为参数传递给TreeSet集合的构造函数。
        
    if(this.hashCode()== obj.hashCode() && this.equals(obj))
    哈希表确定元素是否相同
    1，判断的是两个元素的哈希值是否相同。
    如果相同，在判断两个对象的内容是否相同。
    2，判断哈希值相同，其实判断的是对象的hashCode的方法。判断内容相同，用的是equals方法。
    注意：如果哈希值不同，是不需要判断equals。
    */
    ```

    

## Map

### Map vs Collection

1. Map中一次存储是键值对。Collection中一次存储是单个元素。
2. Map的存储使用的put方法。Collection存储使用的是add方法。
3. Map的取出，是讲Map转成Set，在使用迭代器取出。
   Collection取出，使用就是迭代器。
4. 如果对象很多，必须使用容器存储。
   如果元素存在着映射关系，可以优先考虑使用Map存储或者用数组，如果没有映射关系，可以使用Collection存储。  

### Map Demo

```java
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
public class MapDemo {
    public static void main(String[] args) {
        Map<Integer, String> map = new HashMap<Integer, String>();
        method_2(map);
    }
    public static void method_2(Map<Integer,String> map){
        map.put(8,"zhaoliu");
        map.put(2,"zhaoliu");
        map.put(2,"zhaoliu");
        map.put(6,"wangcai");
        Collection<String> values = map.values();
        Iterator<String> it2 = values.iterator();
        while(it2.hasNext()){
            System.out.println(it2.next());
        }
        /*
        * 通过 Map 转成 set 就可以迭代。
        * 找到了另一个方法。 entrySet。
        * 该方法将键和值的映射关系作为对象存储到了Set集合中，而这个映射关系的类型就是 Map.Entry(内部类)
        * 类型(结婚证)
        */
        Set<Map.Entry<Integer, String>> entrySet = map.entrySet();
        Iterator<Map.Entry<Integer, String>> it = entrySet.iterator();
        while(it.hasNext()){
            Map.Entry<Integer, String> me = it.next();
            Integer key = me.getKey();
            String value = me.getValue();
            System.out.println(key+"::::"+value);
        }
        //取出 map 中的所有元素。
        //原理，通过 keySet方法获取map中所有的键所在的Set集合，在通过Set的迭代器获取到每一个键，
        //在对每一个键通过map集合的get方法获取其对应的值即可。
        Set<Integer> keySet = map.keySet();
        Iterator<Integer> it = keySet.iterator();
        while(it.hasNext()){
            Integer key = it.next();
            String value = map.get(key);
            System.out.println(key+":"+value);
        }    
    }
    
    public static void method(Map<Integer,String> map){//学号和姓名
        // 添加元素。
        System.out.println(map.put(100, "wangcai")); //null
        System.out.println(map.put(100, "xiaoqiang")); //wangcai 存相同键，值会覆盖。
        map.put(2,"zhangsan");
        map.put(7,"zhaoliu");
        //删除。
        // System.out.println("remove:"+map.remove(2));
        //判断。
        // System.out.println("containskey:"+map.containsKey(7));
        //获取。
        System.out.println("get:"+map.get(6));
        System.out.println(map);
        Outer.Inner.show();
    }
}

interface MyMap{
    public static interface MyEntry{//内部接口
        void get();
    }
}
class MyDemo implements MyMap.MyEntry{
    public void get(){}
}
class Outer{
    static class Inner{
        static void show(){}
    }
}
```

### HashMap

```java
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;
import cn.itcast.p2.bean.Student;

public class HashMapDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        /*
        * 将学生对象和学生的归属地通过键与值存储到map集合中。
        */
        HashMap<Student,String> hm = new HashMap<Student,String>();
        hm.put(new Student("lisi",38), "北京");
        hm.put(new Student("zhaoliu",24), "上海");
        hm.put(new Student("xiaoqiang",31), "沈阳");
        hm.put(new Student("wangcai",28), "大连");
        hm.put(new Student("zhaoliu",24), "铁岭");
        // Set<Student> keySet = hm.keySet();
        // Iterator<Student> it = keySet.iterator();
        Iterator<Student> it = hm.keySet().iterator();
        while(it.hasNext()){
            Student key = it.next();
            String value = hm.get(key);
            System.out.println(key.getName()+":"+key.getAge()+"---"+value);
        }
    }
}
```

### TreeMap

```java
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;
import cn.itcast.p2.bean.Student;
import cn.itcast.p3.comparator.ComparatorByName;
public class TreeMapDemo {
    /**
* @param args
*/
    public static void main(String[] args) {
        TreeMap<Student,String> tm = new TreeMap<Student,String>(new ComparatorByName());
        tm.put(new Student("lisi",38),"北京");
        tm.put(new Student("zhaoliu",24),"上海");
        tm.put(new Student("xiaoqiang",31),"沈阳");
        tm.put(new Student("wangcai",28),"大连");
        tm.put(new Student("zhaoliu",24),"铁岭");
        Iterator<Map.Entry<Student, String>> it = tm.entrySet().iterator();
        while(it.hasNext()){
            Map.Entry<Student,String> me = it.next();
            Student key = me.getKey();
            String value = me.getValue();
            System.out.println(key.getName()+":"+key.getAge()+"---"+value);
        }
    }
}
```

### LinkedHashMap

按照顺序存储。

```java
import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        File f= null;
        HashMap<Integer,String> hm = new LinkedHashMap<Integer,String>();
        hm.put(7, "zhouqi");
        hm.put(3, "zhangsan");
        hm.put(1, "qianyi");
        hm.put(5, "wangwu");
        Iterator<Map.Entry<Integer,String>> it = hm.entrySet().iterator();
        while(it.hasNext()){
            Map.Entry<Integer,String> me = it.next();
            Integer key = me.getKey();
            String value = me.getValue();
            System.out.println(key+":"+value);
        }
    }
}
```

### Map Demo

```java
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;
/*
* 练习:
* "fdgavcbsacdfs" 获取该字符串中，每一个字母出现的次数。
* 要求打印结果是： a(2)b(1)...;
* 思路：
* 对于结果的分析发现，字母和次数之间存在着映射的关系。而且这种关系很多。
* 很多就需要存储，能存储映射关系的容器有数组和Map集合。
* 关系一方式有序编号吗？没有！
* 那就是使用Map集合。 又发现可以保证唯一性的一方具备着顺序如 a b c ...
* 所以可以使用TreeMap集合。
*
* 这个集合最终应该存储的是字母和次数的对应关系。
*
* 1，因为操作的是字符串中的字母，所以先将字符串变成字符数组。
* 2，遍历字符数组，用每一个字母作为键去查Map集合这个表。
* 如果该字母键不存在，就将该字母作为键 1作为值存储到map集合中。
* 如果该字母键存在，就将该字母键对应值取出并+1，在将该字母和+1后的值存储到map集合中，
* 键相同值会覆盖。这样就记录住了该字母的次数.
* 3，遍历结束， map集合就记录所有字母的出现的次数。 
*/
public class MapTest {
    /**
    * @param args
    */
    public static void main(String[] args) {
        String str = "fdg+avAdc bs5dDa9c-dfs";
        String s = getCharCount(str);
        System.out.println(s);
    }
    public static String getCharCount(String str) {
        //将字符串变成字符数组
        char[] chs = str.toCharArray();
        //定义map集合表。
        Map<Character,Integer> map = new TreeMap<Character,Integer>();
        for (int i = 0; i < chs.length; i++) {
            if(!(chs[i]>='a' && chs[i]<='z' || chs[i]>='A' && chs[i]<='Z'))
                // if(!(Character.toLowerCase(chs[i])>='a' &&  Character.toLowerCase(chs[i])<='z'))
                continue;
            //将数组中的字母作为键去查map表。
            Integer value = map.get(chs[i]);
            int count = 1;
            //判断值是否为null.
            if(value!=null){
                count = value+1;
            }
            // count++;
            map.put(chs[i], count);
            /*
            if(value==null){
                map.put(chs[i], 1);
                }else{
                map.put(chs[i], value+1);
            }
            */
        }
        return mapToString(map);
    }
    private static String mapToString(Map<Character, Integer> map) {
        StringBuilder sb = new StringBuilder();
        Iterator<Character> it = map.keySet().iterator();
        while(it.hasNext()){
            Character key = it.next();
            Integer value = map.get(key);
            sb.append(key+"("+value+")");
        }
        return sb.toString();
    }
}
```

## 工具类

### Collections 集合框架工具类

Collections：是集合框架的工具类。（集合工具类）

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.TreeSet;

public class CollectionsDemo {
    public static void main(String[] args) {
        /*
        * Collections：是集合框架的工具类。
        * 里面的方法都是静态的。
        */
        demo_4();
    }
    
    // List
    public static void demo_4() { 
        List<String> list = new ArrayList<String>();
        list.add("abcde");
        list.add("cba");
        list.add("zhangsan");
        list.add("zhaoliu");
        list.add("xiaoqiang");
        System.out.println(list);
        
        Collections.replaceAll(list, "cba", "nba"); // set(indexOf("cba"),"nba");
        Collections.shuffle(list); 
        Collections.fill(list, "cc"); // replaces all of the elements of the specified list with the specified element.
        System.out.println(list);
    }
    
    // Set
    public static void demo_3() {
        /*
        TreeSet<String> ts = new TreeSet<String>(new Comparator<String>(){
        @Override
        public int compare(String o1, String o2) {
        int temp = o2.compareTo(o1);
        return temp;
        }
        });
        */
        TreeSet<String> ts = new TreeSet<String>(Collections.reverseOrder(new ComparatorByLength())); // Returns a comparator that imposes the reverse of the natural ordering on a collection of objects that implement the Comparable interface. 
        ts.add("abc");
        ts.add("hahaha");
        ts.add("zzz");
        ts.add("aa");
        ts.add("cba");
        System.out.println(ts);
    }
    
    // List
    public static void demo_2(){
        List<String> list = new ArrayList<String>();
        list.add("abcde");
        list.add("cba");
        list.add("aa");
        list.add("zzz");
        list.add("cba");
        list.add("nbaa");
        Collections.sort(list); // Sorts the specified list into ascending order, according to the natural ordering of its elements.
        System.out.println(list);
        int index = Collections.binarySearch(list, "cba");
        System.out.println("index="+index);
        //获取最大值。
        String max = Collections.max(list,new ComparatorByLength());
        System.out.println("max="+max);
    }
    
    // List
    public static void demo_1(){
        List<String> list = new ArrayList<String>();
        list.add("abcde");
        list.add("cba");
        list.add("aa");
        list.add("zzz");
        list.add("cba");
        list.add("nbaa");
        System.out.println(list);
        // 对list集合进行指定顺序的排序。
        // Collections.sort(list);
        // mySort(list);
        // mySort(list,new ComparatorByLength());
        Collections.sort(list, new ComparatorByLength());
        System.out.println(list);
    }
    
    public static <T> void mySort(List<T> list, Comparator<? super T> comp){
        for (int i = 0; i < list.size()-1; i++) {
            for (int j = i+1; j < list.size(); j++) {
                if(comp.compare(list.get(i), list.get(j))>0){
                    // T temp = list.get(i);
                    // list.set(i, list.get(j));
                    // list.set(j, temp);
                    Collections.swap(list, i, j); // 交换 List 的值
                }
            }
        }
    }
    
    public static <T extends Comparable<? super T>> void mySort(List<T> list){
        for (int i = 0; i < list.size()-1; i++) {
            for (int j = i+1; j < list.size(); j++) {
                if(list.get(i).compareTo(list.get(j))>0){
                    // T temp = list.get(i);
                    // list.set(i, list.get(j));
                    // list.set(j, temp);
                    Collections.swap(list, i, j);
                }
            }
        }
    }
}
```

### Arrays

数组工具类。

```java
package com.wansho.hellojava;

import java.util.Arrays;
import java.util.List;

//数组转成集合。
public class ArraysDemo {
    /**
     * @param args
     */
    public static void main(String[] args) {
        /*
         * Arrays：集合框架的工具类。里面的方法都是静态的。
         */
        // int[] arr = {3,1,5,6,3,6};
        // System.out.println(Arrays.toString(arr));
        demo_2();
        demo_1();
    }
    public static void demo_2() {
        /*
         * 如果数组中的元素是对象，那么转成集合时，直接将数组中的元素作为集合中的元素进行集合存储。
         *
         * 如果数组中的元素是基本类型数值，那么会将该数组作为集合中的元素进行存储。
         */
        int[] arr = {31,11,51,61};
        List<int[]> list = Arrays.asList(arr);
        System.out.println(list.size()); // 1
    }

    public static void demo_1() {
        /*
         * 重点： List asList(数组)将数组转成集合。
         *
         * 好处：其实可以使用集合的方法操作数组中的元素。
         * 注意：数组的长度是固定的，所以对于集合的增删方法是不可以使用的
         * 否则会发生UnsupportedOperationException
         */
        String[] arr = {"abc","haha","xixi"};
        boolean b = myContains(arr, "xixi");
        System.out.println("contains:"+b);
        List<String> list = Arrays.asList(arr); // Returns a fixed-size list backed by the specified array.
        boolean b1 = list.contains("xixi");
        System.out.println("list contaisn:="+b1);
        // list.add("hiahia"); // UnsupportedOperationException
        System.out.println(list);
    }

    public static boolean myContains(String[] arr, String key){
        for (int i = 0; i < arr.length; i++) {
            if(arr[i].equals(key))
                return true;
        }
        return false;
    }
    //toString的经典实现。
    public static String myToString(int[] a){
        int iMax = a.length - 1;
        if (iMax == -1)
            return "[]";
        StringBuilder b = new StringBuilder();
        b.append('[');
        for (int i = 0; ; i++) {//中间省略条件判断，提高了效率。
            b.append(a[i]);
            if (i == iMax)
                return b.append(']').toString();
            b.append(", ");
        }
    }
}

```

## 其他

### 集合转数组：list.toArray()

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
public class ToArray {
    public static void main(String[] args) {
        /*
        * 集合转成数组呢？
        *
        * 使用的就是Collection接口中的toArray方法。
        *
        * 集合转成数组：可以对集合中的元素操作的方法进行限定，但不允许对其进行增删。
        */
        List<String> list = new ArrayList<String>();
        list.add("abc1");
        list.add("abc2");
        list.add("abc3");
        /*
        * toArray方法需要传入一个new好的数组。
        * 长度该如何定义呢？
        * 如果长度小于集合的size，那么该方法会创建一个同类型并和集合相同size的数组。
        * 如果长度大于集合的size，那么该方法就会使用指定的数组，存储集合中的元素，其他位置默认为
        * null。
        * 所以建议，最后长度就指定为，集合的size。
        */
        String[] arr = list.toArray(new String[list.size()]);
        System.out.println(Arrays.toString(arr));
    }
}
```

### 数组转集合 Arrays.asList()

```java
/*
* 如果数组中的元素是对象，那么转成集合时，直接将数组中的元素作为集合中的元素进行集合存储。
*
* 如果数组中的元素是基本类型数值，那么会将该数组作为集合中的元素进行存储。
*/
int[] arr = {31,11,51,61};
List<int[]> list = Arrays.asList(arr);
System.out.println(list.size()); // 1

String[] strings = {"1", "2", "3"};
List<String> list2 = Arrays.asList(strings);
System.out.println(list.size()); // 3
```



### 增强 for 循环

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class ForEachDemo {
    /**
    * @param args
    */
    public static void main(String[] args) {
        /*
        * foreach语句：
        * 格式：
        * for(类型 变量 ： Collection集合|数组)
        * {
        *
        * }
        *
        * 传统for和高级for的区别？
        * 传统for可以完成对语句执行很多次，因为可以定义控制循环的增量和条件。
        *
        * 高级for是一种简化形式。
        * 它必须有被遍历的目标。该目标要是数组，要么是Collection单列集合。
        *
        * 对数数组的遍历如果仅仅是获取数组中的元素，可以使用高级for。
        * 如果要对数组的角标进行操作建议使用传统for。
        *
        */
        List<String> list =new ArrayList<String>();
        list.add("abc1");
        list.add("abc2");
        list.add("abc3");
        for(String s : list){ //简化书写。
            System.out.println(s);
        }
        int[] arr = {3,1,5,7,4};
        for(int i : arr){
            System.out.println(i);
        }
        //可以使用高级for遍历map集合吗？不能直接用，但是可以将map转成单列的set，就可以用了。
        Map<Integer,String> map = new HashMap<Integer,String>();
        map.put(3,"zhagsan");
        map.put(1,"wangyi");
        map.put(7,"wagnwu");
        map.put(4,"zhagsansan");
        for(Integer key : map.keySet()){
            String value = map.get(key);
            System.out.println(key+"::"+value);
        }
        for(Map.Entry<Integer,String> me : map.entrySet()){
            Integer key = me.getKey();
            String value = me.getValue();
            System.out.println(key+":"+value);
        }
        // Iterator<String> it = list.iterator();
        // while(it.hasNext()){
        // System.out.println(it.next());
        // }
    }
}
```

#### 