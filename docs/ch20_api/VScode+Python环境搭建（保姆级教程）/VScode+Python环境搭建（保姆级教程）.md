# VScode+Python环境搭建（保姆级教程）

## 目录

- [1.安装Python](#1安装Python)
- [2.安装VScode](#2安装VScode)
- [3.安装VScode插件](#3安装VScode插件)
- [4. 安装各种库（pip install）](#4-安装各种库pip-install)

## 1.安装Python

首先我们下载需要的python：

老规矩奉上官网链接：[https://www.python.org](https://link.zhihu.com/?target=https://www.python.org/ "https://www.python.org")，进入官网直接点击Download即可

![](image/v2-a2d8d5b0ca131534b34eb994307493fb_r_0_81LF4eNe.jpg)

点击windows可以下载windows版本，其它操作系统同理

![](image/v2-2ffd5c3c41075eb734d2ad7d4eb21283_r_8tGjy7PQcB.jpg)

然后选择自己的对应版本，下载3.10以上版本都可以

![](image/v2-64c52e8457324903b26854cb86090884_r_rCauWona5r.jpg)

下载成功的安装包如下

![](image/v2-15a7a327e4d957d0e2dfc3835f50f069_r_mmijCVElrH.png)

然后我们点击安装运行，一定要选中下面的Add Python 3.8 to PATH

![](image/v2-604ff5ed5cce9b7f1e64c09b84ebb9a5_1440w_BhaaZdPY.jpg)

如果没有这个选项也没关系，后面我写如何检查有没有加在环境变量里。

![](image/v2-92bca20488c8ecf8144dcad7476c43a6_1440w_FnpnijyA.jpg)

![](image/v2-70a7013eff779d7fadadb40a9309ca46_1440w_4Ww4pr_X.jpg)

然后点击install就OK啦。
我们进入cmd然后输入python，如果可以直接进入命令行界面，那就是成功了

![](image/v2-27fc4fe6f5ad299c85ad9d9acb3db08b_1440w_UyLOoMFR.jpg)

退出函数时exit()（别忘加英文括号）
如果这里没出来的话，可以去检查一下环境变量
我们直接搜索“环境变量”(这样比较快)

![](image/v2-cbc2b80a76c587b20b8f00ccd2f95491_1440w_TjaiXj04.jpg)

![](image/v2-3649d7a9729b4ea06d6b0c264be2b65f_1440w_EtlAt0w9.jpg)

看看有没有这两个

![](image/v2-d42bd8cdc02e0ee2cf0f3bdf89793ca4_1440w_sTw87jnb.jpg)

看看有没有这两个如果没有，就直接用浏览按钮手动添加

## 2.安装VScode

进入链接,[https://code.visualstudio.com/download](https://code.visualstudio.com/download "https://code.visualstudio.com/download"),选择合适自己的版本下载即可
基本默认就可以了，这里就不过多演示了

## 3.安装VScode插件

找到python官方插件

![](image/v2-945904249dba2fcb0a675e226e4d4c33_r_W5Sr9kNP7P.jpg)

然后按Win+Shift+P（Win+大写P）选择解释器

![](image/v2-3314d82cb6f6b824cb98a121ad2fa444_1440w_UTnromWr.jpg)

选择在用的版本

![](image/v2-0f67862889d570eb9dfebe31849af8cc_1440w_P0QimBAH.jpg)

右键，选择在终端中运行Python\_在终端中运行Python

![](image/v2-970e2649cf8dc664057d2d932ff34250_1440w_dPlMpiJB.jpg)

运行成功：

![](image/v2-3745f2bd124b2f1a344479d1ea3f5cba_1440w_gqSEX5pX.jpg)

## 4. 安装各种库（pip install）

Python好用的地方就两个，一个是轻巧方便，另一个就是有各种库

安装就是：pip install “想要的库名称”，安装桥通库的命令为：pip install qtmodel

![](image/v2-1d928632aa7cc4c5fe385f3ab8f89892_1440w_Mu7q4tXK.jpg)

但是python的默认镜像源可能会很慢，可以切换成别的源，我用的是清华镜像源：

Pip config set global.index-url [https://pypi.tuna.tsinghua.edu.cn](https://link.zhihu.com/?target=https://pypi.tuna.tsinghua.edu.cn/simple "https://pypi.tuna.tsinghua.edu.cn")
