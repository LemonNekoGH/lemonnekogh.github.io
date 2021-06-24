---
title: UEFI应用开发：设置UDK开发环境（MacOS）
category: 记录
tags:
  - UEFI
  - 操作系统引导
abbrlink: 248c5444
createTime: 1604674330261
---
看这标题，应该就知道柠喵要整一个大家伙了，具体是啥柠喵先不透露，但是呢，在整这个大家伙之前，需要先有整这个大家伙的环境。
<!--more-->
本篇Blog参考[EDK2 WiKi](https://github.com/tianocore/tianocore.github.io/wiki/Getting-Started-with-EDK-II)

顺便解释一下为什么是EDK2 WiKi而不是UDK WiKi，关于EDK2和UDK的关系呢，你可以理解成开发版和稳定版的关系吧，他们俩其实是同一个东西

### 前置工具准备
首先，需要一些前置工具和库：
- NASM x86通用汇编器
- Git 版本控制工具
- IASL 编译器
- OpenSSL 库
- motc 库
- qemu 仿真器（模拟器）

除了OpenSSL之外，都可以从homebrew安装，下面是安装时要敲的命令：

NASM
```shell
brew install nasm
```
Git
```shell
brew install git
```
IASL
```shell
brew install acpica
```
motc
```shell
brew install motc
```
qemu
```shell
brew install qemu
```

然后呢，需要从 [GitHub](https://github.com/openssl/openssl/archive/OpenSSL_1_1_0g.zip) 下载OpenSSL的源码，为了方便，柠喵也把它放进了 [天翼云盘](https://cloud.189.cn/t/auim6rMFzeeq) ，这个东西下载下来先不要管，后面的步骤会用到

### 配置UDK本体
1. 从 [Github](https://github.com/tianocore/edk2/archive/vUDK2018.zip) 下载UDK2018版，为了方便柠喵还是准备了 [天翼云盘](https://cloud.189.cn/t/7ZVV3eZzMb2m) ，这是最新的稳定版本，当然如果你想下载最新版本也行，但是这里柠喵就不提供啦~
2. 把下载好的压缩包解压到你喜欢的地方，然后把之前准备好的OpenSSL源码包找到，把它解压到 你的UDK路径/CryptoPkg/Library/OpensslLib
3. 在 你的UDK路径/CryptoPkg/Library/OpensslLib 下你可以看到一个叫openssl的空文件夹，把它删掉，然后把刚刚解压出来的文件夹改名成openssl
4. 打开你的终端，跳转到 你的UDK路径/ ，执行 make -C BaseTools，当看到执行结束并且最后一句是OK就表示这一步成功了
5. 不要关闭终端，继续执行 . ./edksetup.sh 它会帮你设置一些环境

### 构建示例项目验证配置
在这一步时柠喵踩到了一个坑，因为柠喵直接跟着WiKi上写的进行构建了，没有更改配置文件，于是UDK把柠喵的系统当成了Windows，这样当然不可能成功了，下面是**在macOS中构建**的步骤
1.打开 你的UDK路径/Conf/tools_def.txt ，把所有的 XCODE5 都替换成 XCODE11

2.编辑 你的UDK路径/Conf/target.txt
```
- ACTIVE_PLATFORM       = Nt32Pkg/Nt32Pkg.dsc
+ ACTIVE_PLATFORM       = DuetPkg/DuetPkg.dsc
- TARGET_ARCH           = IA32
+ TARGET_ARCH           = X64
- TOOL_CHAIN_TAG        = MYTOOLS
+ TOOL_CHAIN_TAG        = XCODE11
```
3.这一步就是开始验证了，如果你已经关闭终端了的话就重新打开，然后定位到 你的UDK路径/ ，然后
```
build -p MdeModulePkg/MdeModulePkg.dsc
```
执行完后，你可以到 你的UDK路径/Build/MdeModule/DEBUGXCODE11/X64 目录底下看到一堆.efi文件，这就说明成功了

### 下一步应该干什么？
捣鼓了这么长时间，休息一下吧，然后再开始编写第一个UEFI应用吧，如果这篇Blog对你有帮助，可以在评论区下留言哦~
