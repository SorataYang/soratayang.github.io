# VSCode + Python 开发环境配置指南

本文介绍如何在 Windows 系统上配置 Python 开发环境，包括 Python 解释器安装、VSCode 编辑器配置以及包管理工具的使用。

## 1. 安装 Python

### 下载 Python

1. 访问 Python 官网：[https://www.python.org/downloads/](https://www.python.org/downloads/)
2. 点击 "Download Python" 按钮下载最新版本
3. 或在页面下方选择特定版本（推荐 3.10 或更高版本）

### 安装 Python

1. 运行下载的安装程序
2. **重要**：勾选 **"Add Python to PATH"** 选项
3. 点击 "Install Now" 使用默认设置安装
4. 等待安装完成

### 验证安装

打开命令提示符（按 `Win+R`，输入 `cmd`，回车），执行：

```bash
python --version
```

如果显示 Python 版本号，说明安装成功。输入 `exit()` 退出 Python 交互模式。

### 手动配置环境变量（可选）

如果安装时未勾选 "Add Python to PATH"，需手动配置：

1. 按 `Win+S` 搜索"环境变量"
2. 点击"编辑系统环境变量"
3. 点击"环境变量"按钮
4. 在"用户变量"或"系统变量"中找到 `Path`
5. 点击"编辑"，添加以下路径（根据实际安装位置调整）：
   - `C:\Users\你的用户名\AppData\Local\Programs\Python\Python3x\`
   - `C:\Users\你的用户名\AppData\Local\Programs\Python\Python3x\Scripts\`

## 2. 安装 VSCode

1. 访问 VSCode 官网：[https://code.visualstudio.com/download](https://code.visualstudio.com/download)
2. 选择 Windows 版本下载
3. 运行安装程序，使用默认设置完成安装

## 3. 配置 VSCode Python 插件

### 安装 Python 扩展

1. 打开 VSCode
2. 按 `Ctrl+Shift+X` 打开扩展市场
3. 搜索 "Python"
4. 安装微软官方提供的 Python 扩展（发布者：Microsoft）

### 选择 Python 解释器

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 "Python: Select Interpreter"
3. 选择已安装的 Python 版本

### 运行 Python 代码

**方法一**：使用运行按钮
- 打开 Python 文件，点击右上角的运行按钮

**方法二**：使用右键菜单
- 在编辑器中右键，选择"在终端中运行 Python 文件"

**方法三**：使用快捷键
- 按 `Ctrl+F5` 直接运行当前文件

## 4. 使用 pip 安装第三方库

Python 的强大之处在于丰富的第三方库生态。使用 pip 命令安装所需的库。

### 基本用法

```bash
# 安装库
pip install 库名称

# 安装指定版本
pip install 库名称==版本号

# 升级库
pip install --upgrade 库名称

# 卸载库
pip uninstall 库名称

# 查看已安装的库
pip list
```

### 安装桥通库

```bash
pip install qtmodel
```

### 配置国内镜像源

默认的 PyPI 源在国内访问较慢，建议配置清华镜像源：

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

配置后，所有 pip 安装都将从清华镜像下载，速度更快。

### 其他常用镜像源

| 镜像源 | 地址 |
|--------|------|
| 清华 | https://pypi.tuna.tsinghua.edu.cn/simple |
| 阿里云 | https://mirrors.aliyun.com/pypi/simple |
| 中科大 | https://pypi.mirrors.ustc.edu.cn/simple |
