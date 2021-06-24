---
title: 关于前端的一些记录（一）
tags:
  - TypeScript
  - 前端
  - Node.js
  - Arweave
category: 记录
abbrlink: bef3c38a
createTime: 1611981260143
---
最近写前端项目的时候总是忘记一些以前搜索过的东西，搜了好几遍之后觉得还是自己记录下来好了，然后这些用来记录的小本本每个会记录大概10个内容，多的就会新建一个本本然后继续记录，方便查找啦。
就这么约定好了，开始记录吧ww希望能给自己一些帮助ww

<!--more-->

### No.1 在package.json里定义脚本
大家都知道在package.json里可以定义脚本，比如构建项目什么的，但是有以下事项需要注意一下：

#### 不能直接写shell脚本
在用shell脚本删除编译出来的js文件时需要这样：显式指定执行脚本的程序，不然可能会因为没有权限导致无法删除
```
{
    //省略上文...
    "scripts":{
        "clean": "zsh -c 'rm -rf src/**/*.js'",
    }
    //省略下文...
}
```
#### 在脚本内调用其它脚本时需要调用npm run（或yarn run）
就像这样：当build脚本执行前要调用clean脚本时需要用yarn或npm来调用，不然会报错提示脚本不存在
```
{
    //省略上文...
    "scripts":{
        "clean": "zsh -c 'rm -rf src/**/*.js'",
        "build": "yarn run clean && tsc"
    }
    //省略下文...
}
```

### 如何让typescript编译器编译某个文件夹内所有ts文件，包括子文件夹

这个在typescript的文档里有写，直接在include字段中使用通配符即可

```
{
    "include": [
        "src/**/*.ts"
    ]
}
```

以上代码表示包含src文件夹内所有ts文件，也包括子文件夹

### SmartWeave智能合约无法运行？

如果你像我一样直接yarn run smartweave的话，应该会得到一个这样的结果（这里多了个反斜杠）：

```shell
env: node\r: No such file or directory
```

其实官方在GitHub上已经写了，是需要全局安装的，然后用npx smartweave来运行， 但是如果我需要使用yarn来运行呢？没错，这样就可以了：

```json
{
  "scripts": {
    "me": "npx smartweave"
  }
}
```

用yarn run me来运行吧。
