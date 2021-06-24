---
title: 每周小结 零
category: 总结
tags:
  - Vue
  - Nuxt
createTime: 1624266618274
---
到办公室去上班了之后感觉每天都充实了很多，虽然上班的时候也会摸鱼，但是总感觉比在家做的事情多，觉得自己有价值一些了呢，还学到了好多东西，那么记录一下好了。

<!--more-->

### `Vue` 中的动画组件
柠喵使用的 `Vuetify` 框架虽然提供了许多动画组件，但如果想要实现比较复杂的效果的话这些组件就显得很菜了，柠喵需要 Vue 自带的 transition 组件配合自定义 `CSS` 类来实现。

一个实现普通淡入淡出效果的代码大概是这样：
```vue
<template>
  <transition name="fade" mode="out-in">
    <div>Your component</div>
  </transition>
</template>
```
下图就是 Vue 官方提供的动画过程中 CSS 类名变化图，在上面的代码中，我们使用的动画效果是`fade`，这个动画效果相应的`CSS`代码是`Vue`内置的。

![动画过程中 CSS 类名的变化](https://cn.vuejs.org/images/transition.png)

根据这张图我们就能知道，如果要自己定义一个动画，需要提供以下 `CSS` 类，`<name>`就是`transition`组件中`name`属性的值。
- `.<name>-enter-active`
- `.<name>-enter`
- `.<name>-enter-to`
- `.<name>-leave-active`
- `.<name>-leave`
- `.<name>-leave-to`

柠喵实现以下效果的代码在 [CodePen](https://codepen.io/lemonnekogh/pen/OJpGBeK) 中。

[![RAY1Pg.gif](https://z3.ax1x.com/2021/06/21/RAY1Pg.gif)](https://imgtu.com/i/RAY1Pg)

在上面这张动图中，元素在出现和消失时不止有透明度的变化，还有位置的变化。

为了让自己在看不懂自己写的文章时能一键导航到文档，这里是 `Vue` 的 [动画文档链接](https://cn.vuejs.org/v2/guide/transitions.html) 。

### `Vue` 中的动态组件
这和上面讲的不是同一个东西，但柠喵刚遇到这两个东西的时候是把它们配合在一起使用的。

动态组件用于动态地在同一个区域同一时刻显示不同的组件，有人会说"直接用 `v-if` 之类的不就好了吗"，是，确实，如果只是动态的展示不同组件可以就这么简单，但是如果需要在切换不同组件时显示过渡动画，那就不能这么简单了，在`transition` 组件中使用 `v-if` 和 `v-else` 进行组件的切换时并不能显示过渡动画，需要使用动态组件。

`Vue` 中预置了一个叫做 `component` 的组件，它有一个叫做 `is` 的属性，当这个属性与实例中 `components` 对象中注册的组件名相同时，就会使用 `components` 对象中的组件进行替换。

这里是 `component` 组件的简单使用：
```vue
<template>
  <component is="my-component" />
</template>
<script>
export default {
  components: {
    'my-component': {
      template: '<div>text</>div>'
    }
  }
}
</script>
```
柠喵在 [CodePen](https://codepen.io/lemonnekogh/pen/mdWgajM) 中展示了动态组件与动画组件的组合使用。

为了让自己在看不懂自己写的文章时能一键导航到文档，这里是 `Vue` 的 [动态组件文档链接](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6) 。
