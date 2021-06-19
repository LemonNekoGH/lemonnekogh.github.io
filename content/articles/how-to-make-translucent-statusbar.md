---
title: Android沉浸式状态栏实现详细教程（非常详细）
abbrlink: 247b712
date: 2019-11-18 09:22:46
tags:
  - Android
category: 教程
---
沉浸式状态栏，顾名思义，就是让状态栏融入到APP的内容中，使得整个界面看起来更加一体化，增加用户的观感。在Android系统中从4.4版本开始引入这项改进，不过，还是要开发者自己敲代码来调用这个接口才能实现这一效果，本篇文章就来详细介绍如何实现这个效果。

<!--more-->

首先我们新建模块：
![M96WcV.png](https://s2.ax1x.com/2019/11/05/M96WcV.png)
由于沉浸式状态栏是从4.4版本才引入的，所以最低API等级我们选择4.4（API19）：
![M96R10.png](https://s2.ax1x.com/2019/11/05/M96R10.png)
创建一个空白Activity：
![M964nU.png](https://s2.ax1x.com/2019/11/05/M964nU.png)
创建完后去修改主题（style）文件，我们需要将colorPrimaryDark属性删除，因为如果我们没有设置状态栏颜色的话，系统会自动用colorPrimaryDark属性的颜色给状态栏上色，给我们一种我们好像已经实现沉浸式状态栏效果的错觉，影响理解。删除属性之后的主题文件应该是这样的：
```xml
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>
</resources>
```
下面就是没有实现沉浸式状态栏的效果图：
![M962pq.png](https://s2.ax1x.com/2019/11/05/M962pq.png)

要实现沉浸式状态栏，我们要在style标签中加入windowTranslucentStatus属性，并设为true：
```xml
<item name="android:windowTranslucentStatus">true</item>
```
下面是加入属性后的效果：

![M96I74.png](https://s2.ax1x.com/2019/11/05/M96I74.png)

我们发现状态栏的颜色变成了灰色，并没有变成和应用栏一样的颜色啊，为什么呢？不急，我们先下一步，把当前主题的父主题换成没有应用栏的主题，现在的主题文件应该是这样的：
```xml
<resources>
    <!--DarkActionBar变成了NoActionBar-->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>
</resources>
```
下面是切换父主题之后的效果：

![M96TAJ.png](https://s2.ax1x.com/2019/11/05/M96TAJ.png)

可以看到，应用栏消失了，也能发现状态栏的灰色并没有发生变化，也就是说，windowTranslucentStatusBar属性让我们的视图延伸到了状态栏上，状态栏也不是完全透明而是半透明的。这样就可以解释为什么上一步中状态栏的颜色是灰色了，因为自带ActionBar自动为我们预留了与状态栏高度相同的空间，而我们没有在那部分空间里放置任何View，所以状态栏是背景的白色加上状态栏本身的半透明色。

既然这样，我们就自己来创建一个应用栏并设为默认应用栏，然后为我们的应用栏设置颜色。

布局文件（部分）：
```xml
<androidx.appcompat.widget.Toolbar
    android:background="@color/colorPrimary"
    android:id="@+id/toolbar"
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"/>
```
Activity文件（部分）：
```kotlin
val toolbar = findViewById<Toolbar>(R.id.toolbar)
setSupportActionBar(toolbar)
```
下面是效果图：

![M967N9.png](https://s2.ax1x.com/2019/11/05/M967N9.png)

加入自己的应用栏后出现了这样的效果，结合上一步出现的情况也很好理解，我们自己的应用栏没有自动预留出状态栏那么高的空间，导致视图和状态栏重叠，根据这个思路，我们在应用栏上方填充一个和应用栏相同高度的View然后把那个View的颜色设置成和应用栏颜色相同的颜色就能解决这个问题。

在布局中加入用来填充的View，这个View的高度我们暂时不设置，因为不同ROM的状态栏高度是不一样的：
```xml
<View
    android:layout_height="0dp"
    android:layout_width="match_parent"
    android:id="@+id/top_view"/>
```
然后在Activity文件中设置View的高度：
```kotlin
val statusBarHeightId = resources.getIdentifier("status_bar_height", "dimen", "android")
val statusBarHeight = resources.getDimensionPixelSize(statusBarHeightId)
val params = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, statusBarHeight)
topView.layoutParams = params
```
最后设置View的颜色：
```kotlin
val toolbarColor = toolbar.background as ColorDrawable
topView.background = ColorDrawable(toolbarColor.color)
```
下面是实现这一步之后的效果图：

![M96HhR.png](https://s2.ax1x.com/2019/11/05/M96HhR.png)

到这里，我们就已经实现了沉浸式状态栏，不过，由于状态栏本身是半透明的，所以状态栏的颜色还是会比应用栏暗一些，如果希望完全透明的话，还要继续进行下一步，修改Activity文件：
```kotlin
window.clearFlags(
    WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS or
    WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)
window.decorView.systemUiVisibility =
    View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or
    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP){
    window.addFlags (WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
    window.statusBarColor = Color.TRANSPARENT
}
```
需要注意的是，这一步要求的Android版本是5.0以上，4.4无法实现。下面是效果图：

![M96q91.png](https://s2.ax1x.com/2019/11/05/M96q91.png)

最后是细节处理，由于应用栏的颜色算是比较亮的，所以应用自动把应用栏上的字设置成了黑色，但是这样不美观，我们手动调整为白色好了：
```kotlin
toolbar.setTitleTextColor(Color.WHITE)
```
最终效果图：

![M96L1x.png](https://s2.ax1x.com/2019/11/05/M96L1x.png)

好了教程结束，我把这个Demo放到GitHub上了，大家可以clone到自己的电脑上来跑一跑，地址：https://github.com/LemonNekoGH/SomeDemo

下篇文章见（这篇文章敲了几个小时，累死了QAQ）
