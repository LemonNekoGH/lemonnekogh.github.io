---

title: 「动态类型之痛」那些可以被认为是 False 的值
tags: 
  - JavaScript
category: 技术随笔
---

> 写这篇文章是为了不让自己忘记这种神奇操作，至少在习惯静态类型的人来说是神奇操作
> 也许这篇文章对于 JavaScript 大佬来说是基础内容，但是对于柠喵来说不是，请在评论区随意吐槽

<!--more-->

在 <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy" target="_blank" style="color:#542de0;font-weight:700">MDN Web Docs</a> 中有专门的一页说明了哪些值可以被认为是 `false`，但是列表中的说明不够详细，柠喵经过试验之后来补充一下。

### 可以直接被认为是 `false` 的值
可以直接被认为是 `false` 的值，什么意思呢？就是直接拿它和 `false` 比较会返回 `true`，例子：
```
-> 0 == false
<- true
```

| 值 | 解释 |
|:--:|:--:|
|`false`|JavaScript 关键字|
|`0` `-0` `0n`|零，负数零，和作为 BigInt 类型的零|
|`''` `""` ` `` ` |空字符串|
|`[]`|空数组|

### 在 `if` 等语句中才会隐式转换成 `false` 的值
这些值如果直接与 `false` 比较会返回 `false`，但是如果用逻辑非 `!` 运算符加在前面再与 `true` 进行比较就会返回 `true` ，例子：
```
-> !NaN == true
<- true
```
| 值 | 解释 |
|:--:|:--:|
|`undefined`|关键字：未定义的值|
|`null`|关键字：空|
|`NaN` |表示这不是数字|

### 扩展：可以被认为是 `true` 的值
`{}` 空对象，这个值在与 `false` 进行比较的时候会返回 `false` ，而加上逻辑非运算符之后与 `false` 进行比较时会返回 `true`
```
-> {} == false
<- false
-> !{} == true
<- false
-> !{} == false
<- true
```
