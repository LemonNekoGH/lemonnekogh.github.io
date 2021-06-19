---
title: Jetpack LiveData的使用：实现Vue应用的响应式特性
category: 技术随笔
tags:
  - Android
  - Jetpack LiveData
---

### 前言
最近一段时间在用Vue写前端，发现Vue的响应式特性真的好棒，只要负责修改数据，相应的视图就会自动刷新，那么在Android上是否也能实现这样的特性呢？是可以的，在[Jetpack工具包](https://developer.android.google.cn/jetpack?hl=zh-cn)中就有一个叫LiveData的东西。
LiveData的响应式实现是基于一个叫作观察者模式的设计模式，但是和一般的观察者模式不同，LiveData可以对Android组件进行生命周期感知，也就是当Activity之类的组件处于不活跃状态时LiveData中的数据改变不会通知该视图进行刷新，避免了内存泄漏等问题。这个东西的优点如果用我的语言来讲可能不太容易理解，最好还是去看看官方的[LiveData概览](https://developer.android.google.cn/topic/libraries/architecture/livedata?hl=zh-cn)。

<!--more-->

### 使用步骤
LiveData的使用非常简单，最简单的步骤只有三步，如下：
1. 将数据转换成可观察类型
2. 注册数据观察者
3. 修改你的数据，数据的变动会自动通知给观察者
### 开始使用
在使用之前，需要先引入LiveData的库（2.2.0是编辑这篇文章时的最新版本，在使用前请查询最新版本号）：
```groovy
implementation 'androidx.lifecycle:lifecycle-livedata:2.2.0'
// 使用Kotlin进行编码时则需要改为
implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.2.0'
```
如果你使用kotlin dsl：
```kotlin
implementation("androidx.lifecycle:lifecycle-livedata:2.2.0")
// 使用Kotlin进行编码时则需要改为
implementation("androidx.lifecycle:lifecycle-livedata-ktx:2.2.0")
```
### 将需要使用的数据转换成可观察类型
假设你有一个这样的Activity。
```kotlin
class MainActivity : AppCompatActivity {
    private var data = "This is my String" // 这是你的数据
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.example_view)
        
        val myText = findViewById<TextView>(R.id.example_text) // 这是使用到数据的视图
        myText.text = data // 将数据绑定到视图中
        data = "This is your String" // 修改数据
        myText.text = data // 手动对视图中的数据进行修改
    }
}
```
在这个Activity中，当你的数据发生改变时，你需要手动更新视图，如果你想让数据被修改时视图自动进行更新的话，你需要把数据转换成可观察类型。
由于LiveData类自身属于抽象类，不能直接使用，**我们可以用LiveData的直接子类<span style="border:solid #542de0 2px;border-radius:8px;padding:2px 5px;margin:2px;color:#542de0">MutableLiveData</span>来完成转换**。
```kotlin
class MainActivity : AppCompatActivity {
    private val data = MutableLiveData("This is my String") // 这是转换后的可观察类型数据
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.example_view)
        
        val myText = findViewById<TextView>(R.id.example_text) // 这是使用到数据的视图
        myText.text = data.value // 将数据绑定到视图中
        data = "This is your String" // 修改数据
        myText.text = data.value // 手动对视图中的数据进行修改
    }
}
```
不知道你有没有注意到，在转换成可观察类型之后，声明data变量的关键字从var（变量）变成了val（常量），这是因为LiveData将我们的数据进行了包装，**我们的<span style="border:solid rgb(0, 222, 122) 2px;border-radius:8px;padding:2px 5px;line-height:40px;margin:2px;color:rgb(0, 222, 122)">数据在LiveData中依然是可变的</span>**，所以LiveData本身就没有必要声明成变量了。
在这一步完成后，我们依然要手动对视图进行刷新，因为我们没有注册数据观察者。
### 注册数据观察者以接收数据变化时的通知
与Vue的响应式不同，我们还是需要手动注册观察者才能接收数据变化时的通知，在接收到通知的时候对视图进行刷新。
```kotlin
class MainActivity : AppCompatActivity {
    private val data = MutableLiveData("This is my String") // 这是转换后的可观察类型数据
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.example_view)
        
        val myText = findViewById<TextView>(R.id.example_text) // 这是使用到数据的视图
        data.observe(this) { // 注册观察者，实现数据变化后的回调
            myText.text = it // 数据变化后，将视图刷新
        }
        data.value = "This is your String" // 只要修改数据就好了
    }
}
```
### 完成了！
现在，响应式特性已经实现了，你也可以用更高效的方式编码了！恭喜哦~
关于LiveData更深入的内容，应该要等到下一篇了吧。~~我才不会告诉你我只是为了发行柠檬币而写的这篇文章的qwq~~
