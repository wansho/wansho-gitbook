# Java Database

[TOC]



## JDBC

java database connector

JDBC 是 Java jdk 自带的标准库。

<img align="left" src="assets/image-20210416161831690.png" alt="image-20210416161831690" style="zoom:80%;" />

### maven 配置

JDBC 驱动就是各种数据库实现的 jar 包，只需要在 maven 中添加一个依赖即可。

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
    <scope>runtime</scope>
</dependency>
```

注意到这里添加依赖的`scope`是`runtime`，因为编译Java程序并不需要MySQL的这个jar包，只有在运行期才需要使用。如果把`runtime`改成`compile`，虽然也能正常编译，但是在IDE里写程序的时候，会多出来一大堆类似`com.mysql.jdbc.Connection`这样的类，非常容易与Java标准库的JDBC接口混淆，所以坚决不要设置为`compile`。

### jdbc url

| db    | url                                                          | demo                                                         |
| ----- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| mysql | `jdbc:mysql://<hostname>:<port>/<db>?key1=value1&key2=value2` | `jdbc:mysql://localhost:3306/learnjdbc?useSSL=false&characterEncoding=utf8` |
|       |                                                              |                                                              |
|       |                                                              |                                                              |

### Demo

```java
// JDBC连接的URL, 不同数据库有不同的格式:
String JDBC_URL = "jdbc:mysql://localhost:3306/test";
String JDBC_USER = "root";
String JDBC_PASSWORD = "password";
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

核心代码是`DriverManager`提供的静态方法`getConnection()`。`DriverManager`会自动扫描classpath，找到所有的JDBC驱动，然后根据我们传入的URL自动挑选一个合适的驱动。

`Statment`和`ResultSet`都是需要关闭的资源，因此嵌套使用`try (resource)`确保及时关闭；

为了避免 SQL 注入，用 `PreparedStatement` 替代 `Statement`。`PreparedStatement`  用 `?` 作为占位符。

```java
try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {
    try (PreparedStatement ps = conn.prepareStatement("SELECT id, grade, name, gender FROM students WHERE gender=? AND grade=?")) {
        ps.setObject(1, "M"); // 注意：索引从1开始 设置 gender 为 M
        ps.setObject(2, 3); // 设置 grade 为 3
        try (ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                long id = rs.getLong("id");
                long grade = rs.getLong("grade");
                String name = rs.getString("name");
                String gender = rs.getString("gender");
            }
        }
    }
}
```

### jdbc 增删改

```java
try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD)) {
    try (PreparedStatement ps = conn.prepareStatement(
            "INSERT INTO students (id, grade, name, gender) VALUES (?,?,?,?)")) {
        ps.setObject(1, 999); // 注意：索引从1开始
        ps.setObject(2, 1); // grade
        ps.setObject(3, "Bob"); // name
        ps.setObject(4, "M"); // gender
        int n = ps.executeUpdate(); // 1 注意是 executeUpdate，不是 executeQuery
    }
}
```



