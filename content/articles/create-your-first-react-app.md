---
title: 庆祝我的第一个React应用运行成功
tags:
 - React
 - 代码 
category: 记录 
createTime: 1614953941272
abbrlink: 39c9f020
---
在庆祝之前，我要说一句，React是垃圾，React是垃圾，React是垃圾，好像说了三句，算了，反正它就是垃圾。
为什么要庆祝呢，因为当我要学习新框架的时候，我会先从浏览器运行静态网页开始，但是我居然花了一下午的时间才让我的React应用在浏览器中成功运行，这难道不值得庆祝吗？
虽然说是庆祝呢，但是这篇文章本质上还是一个记录，万一有新人搜索到这篇文章也好避个坑。
<!--more-->

### 快速上手？

哎，为什么要加问号呢？因为它不像Vue那样直接引入到script标签就能用，当然，引入标签也是必须的。

```html

<script src="https://cdn.jsdelivr.net/npm/react@17.0.1/umd/react.development.min.js"></script>
```

能开始写了吗？不能，因为还需要引入另一个，这个是react进行DOM操作的库。

```html

<script src="https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.development.min.js"></script>
```

感觉好像可以开始写了，那就开始写吧。

```html

<script>
    class HelloWorld extends React.Component {
        render() {
            return <h1>HelloWorld</h1>
        }
    }
</script>
```

好，组件写好了，那么把组件渲染到需要的地方吧。

```html

<body>
<div id="app"></div>
<script>
    // 组件
    class HelloWorld extends React.Component {
        render() {
            return <h1>HelloWorld</h1>
        }
    }

    ReactDOM.render(<HelloWorld/>, document.querySelector('#app'))
</script>
</body>
```

### 问题解决

写好了，去浏览器一看，诶，什么都没有，F12打开控制台，一看报错

```
Uncaught SyntaxError: Unexpected token '<'
```

这个是为什么呢，因为React使用了jsx语法，为了把这种语法编译成浏览器认识的语法，你需要引入babel的库，然后改一下script标签的属性。

```html

<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.12.12/babel.min.js"></script>
<script type="text/babel">
    // 组件
    class HelloWorld extends React.Component {
        render() {
            return <h1>HelloWorld</h1>
        }
    }

    ReactDOM.render(<HelloWorld/>, document.querySelector('#app'))
</script>
```

再去看浏览器，可能还是会报错，这一步报错如果没有出现，而且浏览器显示一个大大的HelloWorld的话，就算是成功了。

但是我在这里还是提供一下报错的原因和解决方法，因为react需要跨域操作，所以在react的script标签上加上crossorigin就好了。 完成后，你的html应该是这个样子：

```html
<!DOCTYPE html>
<html>
<body>
<div id="root"></div>
<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.12.12/babel.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react@17.0.1/umd/react.development.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.development.min.js"></script>
<script type="text/babel">
    class HelloWorld extends React.Component {
        render() {
            return <h1>Hello world!</h1>
        }
    }

    ReactDOM.render(<HelloWorld/>, document.getElementById('root'))
</script>
</body>
</html>
```

恭喜，你的第一个React应用运行成功了，虽然还没有什么实际作用，但也是很鼓舞人心的，不是吗？
