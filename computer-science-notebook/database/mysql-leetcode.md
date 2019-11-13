# MySQL-Leetcode

MySQL-Demos

## second-highest-salary

难点：

* 第二高薪水 (distinct + limit + offset)
* 如果没有则返回 NULL (outer select)

```sql
select 
    (
    select 
        distinct Salary 
    from 
        Employee
    order by
        Salary desc limit 1 offset 1
    ) 
as SecondHighestSalary;

-- or
SELECT max(Salary)
FROM Employee
WHERE Salary < (SELECT max(Salary) FROM Employee)

-- bad answer
select 
    Salary as SecondHighestSalary
from 
    Employee
order by
    Salary desc limit 1 offset 1;
-- 如果没有第二高的薪水，则返回空 ""，使用 max 函数可以返回 NULL，outer select 在查询不到的时候也会返回空。如果第二高的薪水一定存在，则用 limit 最好
```

