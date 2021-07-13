---
title: 在配合使用 Go 与 MySQL 时的一些提示
createTime: 1626003217105
tags:
  - Go
  - MySQL
category: 记录
---
看来是没有办法进行长文章记录。那柠喵就直接写最重要的东西吧。

<!--more-->

### 1. 配置连接参数让 MySQL 驱动自动将 datetime 类型转换成 time.Time 类型
```go
db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/example?parseTime=true")
```
### 2. 配置连接参数以进行多语句查询
```go
db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/example?multiStatements=true")
```
