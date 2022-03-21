# 编解码

[TOC]



## 为什么要编解码

在进行网络传输和存储的时候，要节省带宽和空间。



## Java encode decode

编码：字符串 ——> 字节数组

解码：字节数组 ——> 字符串

```java
package com.wansho.hellojava;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

public class EncodeDemo {
    /**
     * @param args
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        /*
         * 字符串 --> 字节数组：编码。
         * 字节数组 --> 字符串：解码。
         *
         * 你好： GBK: -60 -29 -70 -61
         *
         * 你好: utf-8: -28 -67 -96 -27 -91 -67
         *
         *
         * 如果你编错了，解不出来。
         * 如果编对了，解错了，有可能有救。
         */
        String str = "谢谢";
        byte[] buf = str.getBytes("gbk"); // 编码
        String s1 = new String(buf,"UTF-8"); // 解码，解错了
        System.out.println("s1="+s1); // лл
        byte[] buf2 = s1.getBytes("UTF-8");//获取源字节.
        printBytes(buf2); // -17 -65 -67 -17 -65 -67 -17 -65 -67
        // -17 -65 -67 -17 -65 -67 -17 -65 -67 -17 -65 -67
        // -48 -69 -48 -69
        String s2 = new String(buf2,"GBK"); // 解码，解对了
        System.out.println("s2="+s2);
        // encodeDemo(str);
    }
    /**
     * @param str
     * @throws UnsupportedEncodingException
     */
    public static void encodeDemo(String str)
            throws UnsupportedEncodingException {
        //编码；
        byte[] buf = str.getBytes("UTF-8");
        // printBytes(buf);
        //解码：
        String s1 = new String(buf,"UTF-8");
        System.out.println("s1="+s1);
    }
    private static void printBytes(byte[] buf) {
        for(byte b : buf){
            System.out.print(b +" ");
        }
    }
}
```



## web 服务器收到乱码

前后端数据交互的方式有两种：

* form 表单提交

  form 表单可以通过 enctype 属性设置编码类型，默认值为 application/x-www-form-urlencoded，字符集通常是 utf8

* ajax 提交

  ajax 表单可以通过 content-type 设置编码类型，默认值也是 application/x-www-form-urlencoded，字符集通常是 utf8

服务器对于接收到的 application/x-www-form-urlencoded 类型数据进行字符集为 ISO-8859-1 的 URLDecoding 处理，经过处理得到的字符串，内码为 ISO-8859-1。

问题来了，客户端的编码，都是 utf8 字符集，而服务端却要用 ISO-8859-1 字符集解码，所以解码得到的字符串肯定是乱码！

纠正的操作：

```java
// utf8 网络传输编码 ——> 服务端 ISO-8859-1 解码（字符集用错了，应该用 utf8） ——> 服务端 ISO-8859-1 编码 ——> 服务端 utf8 解码
// 整个编解码过程由后面两个反编译得到
// 服务器对于接收到的 application/x-www-form-urlencoded 类型数据进行字符集为 ISO-8859-1 的 URLDecoding 处理
String note = new String(note.getBytes("ISO-8859-1"),"UTF-8");
log.info("新建的笔记：" + note);
```





