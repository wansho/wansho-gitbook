# java datetime



## Date

Date 基本上废弃了，仅剩下如下方法：

```java
getTime(); // milliseconds since January 1, 1970, 00:00:00 GMT
setTime();
after();
before();
compareTo();
```

其获取某一个具体时间的方法，已经被废弃。



## java8 datetime

java8 引入的新类：LocalDateTime，LocalDate，Instant

```java
LocalDate today = LocalDate.now(); 
int year = today.getYear(); 
int month = today.getMonthValue(); 
int day = today.getDayOfMonth();

LocalDate dateOfBirth = LocalDate.of(2010, 01, 14); 

LocalTime time = LocalTime.now();

date1.equals(today);
tommorow.isAfter(today);

LocalTime time = LocalTime.now(); 
LocalTime newTime = time.plusHours(2);

LocalDate nextWeek = today.plus(1, ChronoUnit.WEEKS);

LocalDate previousYear = today.minus(1, ChronoUnit.YEARS); 
LocalDate nextYear = today.plus(1, YEARS);

Instant timestamp = Instant.now();

LocalDateTime now = LocalDateTime.now();
        LocalDateTime morningStartDateTime = LocalDateTime.of(now.getYear(), now.getMonthValue(), now.getDayOfMonth(),
                9, 30, 0);
```

