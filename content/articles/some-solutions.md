---
title: 一些日常遇到的小问题的解决方案
createTime: 1598237632130
tags: 
  - Windows
  - Android
  - macOS
  - Hexo
category: 记录
---
在工作和学习中难免会遇到各种各样的小问题，有些问题甚至会多次出现，为了不把时间浪费在同一个问题上，我决定专门拿一篇文章来记录解决方法，本文长期更新。

<!--more-->

## **0x01.Windows下用PowerShell运行.ps1脚本时提示“此系统禁止运行脚本”**
这是Windows的脚本执行策略导致的，Windows脚本执行策略一共有三种，分别是Restricted、AllSigned和RemoteSigned。其中，Restricted策略禁止任何脚本运行，AllSigned仅允许已签名的脚本运行，RemoteSigned可允许你自己编写的未签名脚本和其他人编写的已签名脚本运行，我们只要把执行策略改成RemoteSigned即可。

（此步可省略）你可以先在PowerShell中输入以下命令查看执行策略：
~~~    
get-executionpolicy
~~~
输入以下命令更改脚本执行策略（记得要以管理员权限运行PowerShell）：
~~~
set-executionpolicy RemoteSigned
~~~
然后PowerShell会提示你是否修改，类似下面这样：
~~~
执行策略更改
执行策略可以防止您执行不信任的脚本。更改执行策略可能会使您面临 about_Execution_Policies
帮助主题中所述的安全风险。是否要更改执行策略?
[A] 全是(A) [Y] 是(Y)  [N] 否(N)  [S] 挂起(S)  [?] 帮助 (默认值为“Y”):
~~~
这时候敲A然后回车即可，为了验证是否成功，随便运行一个脚本试试吧~

## **0x02.Hexo本地预览时出现 ‘slug’ is required!**
出现这个的原因还没有查明，但是这是我把文件名命名方式改成日期+时间方式后出现的，这种命名方式可能会导致重名，所以我改回了以文章标题为文件名的命名方式，改回去之后问题就没有了。

## **0x03.在用U盘把MBP降级到10.12.6时出现安装文件已损坏**
苹果太坏了！其实U盘里的安装文件根本没有坏！苹果只是不想让你降级到旧版本才这么提示的！解决方法很简单，在安装之前点击顶栏的工具，打开终端，输入以下代码然后回车即可：

    date 122014102015.30

## **0x04.gradle提示com.android.application not found**
这个问题一般是clone了别人的代码之后出现的，先去检查一下项目build.gradle和模块的build.gradle，项目build.gradle中必须存在buildscript闭包，就像这样：
~~~
buildscript{
    repositories{
        google()
        jCenter()
    }
    dependencies{
        classpath("com.android.tools.build:gradle:3.5.2")
        //因为我用的是kotlin dsl，所以可能会和你们不一样
        classpath(kotlin("gradle-plugin", "1.3.50"))
    }
}
~~~
