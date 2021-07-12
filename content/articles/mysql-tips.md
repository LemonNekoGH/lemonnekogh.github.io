---
title: 使用 Go 与 MySQL 统计用户总量
createTime: 1626003217105
tags:
  - Go
  - MySQL
category: 记录
wip: true
---
柠喵的脑袋真的不是很靠谱，不记下来就会忘记，为了不让自己忘记更多学习成果，柠喵正在强迫自己每周起码写一篇文章来记录自己在工作时遇到的问题以及解决方案。

以上可能是废话，下面是这篇文章的目录：

<!--more-->
1. 需求分析和初版实现方案
2. 初版实现方案中存在的问题，以及改进方案
3. 完成改进方案时需要注意的问题

### 1. 需求分析和初版实现方案
公司给了一张用户表，要求通过这张表统计出每天的用户总量变化，以下是这张表经过简化后的样子：

| id | username | reg_time |
|---|---|---|
| 1 | LemonNeko | 1626003217105 |

其中，有一个叫做 `reg_time` 的字段记录了这个用户的注册时间。

#### 1.1 初版实现方案
柠喵想到的第一个方案是，设置一个开始时间 `a` 和结束时间 `b` ，进行循环，每循环一次将 `a` 的值增加一天，获取 `reg_time` 小于 `a` 的记录数量，直到 `a` 等于 `b`。

假设开始时间是 7 天前的 0 点，结束时间是今天的 0 点，数据库用户名密码都为 root，数据库名为 example，表名为 users（代码中的变量命名方式并不规范，只是为了更加语义化）：

```go
package main

import (
    "database/sql"
    "time"
    // 导入 mysql 驱动
    _ "github.com/go-sql-driver/mysql"
    "fmt"
)

func main() {
    // 连接数据库
    db := sql.Open("mysql", "root:root@tcp(localhost:3306)/example")
    // 告诉系统在函数结束的时候关闭数据库，自己操作可能会忘记
    defer db.Close()
    // 获取当前时间
    timeNow := time.Now()
    // 今天 0 点
    today := time.Date(timeNow.Year(), timeNow.Month(), timeNow.Day(), 0, 0, 0, 0, timeNow.Location())
    // 7 天前的 0 点
    _7DaysAgo := today.Add(-7 * 24 * time.Hour)
...
```

然后开始循环

```go
...
    // 循环变量
    between := _7DaysAgo
    // 用户数量变量
    count := 0
    // 将 between 的值加上一天，加上之后如果小于等于今天（today）就继续循环
    for between = between.Add(24 * time.Hour); between.Unix() <= today.Unix(); {
        // 进行查询，获取注册日期小于变量日期的用户数量
        rows, err := db.Query("select count(*) from users where reg_time < ?", between.Unix())
        // 捕获错误
        if err != nil {
            fmt.Println(err.Error())
            return
        }
        rows.Next()
        // 把用户数量提取出来
        rows.Scan(&count)
        // 输出
        fmt.Printf("day: %s, count: %d\n", between.Format("2006-12-10"), count)
    }
```
输出结果应当类似这样：
```
day: 2021-7-01, count: 4567
day: 2021-7-02, count: 5678
day: 2021-7-03, count: 6789
day: 2021-7-04, count: 7890
day: 2021-7-05, count: 8901
day: 2021-7-06, count: 9012
day: 2021-7-07, count: 11234
```

这样就统计出了用户量，结果似乎是符合柠喵的预期的。

### 2. 初版实现方案中存在的问题，以及改进方案
#### 2.1 发现问题
但是当柠喵把开始时间设为 3 个月前时，问题来了。

```
day: 2021-4-15, count: 0
day: 2021-4-16, count: 0
day: 2021-4-17, count: 0
day: 2021-4-18, count: 27
...
day: 2021-7-01, count: 4567
error: too many connections
```
连接数过多了，原因应该很容易猜到，因为柠喵在循环体内进行查询操作，每次查询都是一个新的连接，虽然 `sql.Rows` 在使用完毕后会自动关闭这个连接，但是由于循环速度过快，导致连接还没关闭的时候就有更多新的连接被建立，所以连接数还是超出了限制。

超出了限制，怎么办呢，柠喵可以通过配置把连接数限制提高嘛。

#### 2.2 改进方案
真的可以通过提高限制来解决这个问题吗？如果要查询的时间不只是三个月呢？如果是六个月呢？或者更多呢？所以提高限制并不能从根本上解决问题。

柠喵需要优化自己的查询方法。也许可以把要查询的 SQL 语句合成到一起，然后只进行一次查询，这样每次查询就只有一个连接了。

该怎么操作呢？
