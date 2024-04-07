# SQL

## Truncate & Delete & Drop
* Truncate TABLE 删除表中所有的行, 速度更快
* DELETE 支持 WHERE 子句
* Drop Table/Index/DATABASE 删除表,索引,数据库

## 约束(Constraints)
 * NOT NULL 指示某列不能存储 NULL 值。
 * UNIQUE 保证某列的每行必须有唯一的值
 * PRIMARY KEY NOT NULL 和 UNIQUE 的结合。
 * FOREIGN KEY 保证一个表中的数据匹配另一个表中的值的参照完整性。
 * CHECK  保证列中的值符合指定的条件。
 * DEFAULT 默认约束

```sql
CREATE TABLE Persons
(
  Id_P int NOT NULL PRIMARY KEY,
  LastName varchar(255) NOT NULL
)
  ```
## 常用类型(mysql)
* CHAR(size)  size最多 255 个字符
* VARCHAR(size) 可变长字符串,超过255 转为 TEXT
* TEXT 65,535 个字符
* TINYTEXT 255个字符
* BLOB/MEDIUMBLOB/LONGBLOB   二进制BLOB 65535 / 16,777,215 字节
* MEDIUMTEXT/LONGTEXT
* TINYINT/SMALLINT/INT/
* FLOAT/DOUBLE
* DECIMAL
* DATE   YYYY-MM-DD
* DATETIME   YYYY-MM-DD HH:MM:SS
* TIMESTAMP  时间戳
* TIME       HH:MM:SS
## 创建索引
```sql
CREATE UNIQUE INDEX index_name
ON table_name (column_name)

CREATE INDEX PIndex
ON Persons (LastName, FirstName)

```
## JOIN
### JOIN/INNER JOIN 多个表中返回满足JOIN条件的所有行
``` sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name=table2.column_name;
```
### LEFT JOIN/LEFT OUTER JOIN 左表返回所有行即使右表没有匹配,右表没有时该行相关的数据为NULL
``` SQL
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name=table2.column_name;
```
### RIGHT JOIN /RIGHT OUTER JOIN 类似LEFT JOIN换成了右表始终返回
### FULL OUTER JOIN: MYSQL 中不支持

## 联合索引/最左匹配
根据WHERER语句的顺序从左到右查找满足相同规则的索引

> Mysql innodb 使用B+树