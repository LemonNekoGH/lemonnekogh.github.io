---
title: Godot 中一些游戏内基础操作的简单实现（一）
createTime: 1631681381701
tags:
  - Godot
  - 3D
category: 游戏开发
wip: true
---
这一次的记录有两个部分，第一部分是实现鼠标拖拽地图，第二部分是实现鼠标滚轮对地图进行缩放，这是第一部分。

### 开始之前 - 引入需要的第三方库
我们需要一个名为 GodotTouchInputManager 的库帮助我们识别鼠标或触屏输入事件。

在作者的 [GitHub](https://github.com/Federico-Ciuffardi/Godot-Touch-Input-Manager) 仓库中有介绍如何安装，柠喵需要翻译成中文记录一下：

1. 将最新的 Release 包下载到本地并解压
2. 将解压后文件夹中的 CustomInputEvents 文件夹和 InputManager.gd 文件放入工程目录中的 script 文件夹（res://script/）中
3. 到项目设置中将 InputManager.gd 添加到自动加载列表中
