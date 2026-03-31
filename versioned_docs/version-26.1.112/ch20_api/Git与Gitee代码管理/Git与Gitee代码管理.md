# Git + VSCode + Gitee 代码管理指南

本文介绍如何配置 Git 版本控制系统，并结合 VSCode 和 Gitee 进行代码管理。

## 1. 安装 Git

### 下载

访问 Git 官网下载 Windows 版本：[https://git-scm.com/download/win](https://git-scm.com/download/win)

### 安装

运行安装程序，大部分选项保持默认即可。安装完成后，右键菜单会出现 "Git Bash Here" 选项。

### 验证安装

打开命令提示符，输入以下命令验证：

```bash
git --version
```

## 2. 配置 Git

### 设置用户信息

首次使用 Git 需要配置用户名和邮箱，这些信息会记录在每次提交中：

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

### 生成 SSH 密钥

SSH 密钥用于安全地连接远程仓库，无需每次输入密码：

```bash
ssh-keygen -t rsa -C "你的邮箱"
```

按三次回车使用默认设置。生成的密钥保存在 `~/.ssh/` 目录下。

### 查看公钥

使用以下命令查看公钥内容（后续需要添加到 Gitee）：

```bash
cat ~/.ssh/id_rsa.pub
```

## 3. 安装 VSCode

访问 VSCode 官网下载安装：[https://code.visualstudio.com/download](https://code.visualstudio.com/download)

VSCode 内置 Git 支持，安装后可直接使用版本控制功能。

## 4. 配置 Gitee

### 注册账号

访问 Gitee 官网注册账号：[https://gitee.com](https://gitee.com)

### 添加 SSH 公钥

1. 登录 Gitee，进入"设置" → "SSH公钥"
2. 将之前生成的公钥内容（`id_rsa.pub`）粘贴到公钥框中
3. 设置标题并保存

### 创建仓库

1. 点击右上角 "+" 号，选择"新建仓库"
2. 填写仓库名称和描述
3. 选择是否初始化 README
4. 点击"创建"

## 5. 使用 Git 管理代码

### 克隆远程仓库

```bash
git clone git@gitee.com:用户名/仓库名.git
```

### 初始化本地仓库

如果是新项目，在项目目录下执行：

```bash
git init
```

### 关联远程仓库

```bash
git remote add origin git@gitee.com:用户名/仓库名.git
```

### 基本工作流程

```bash
# 查看文件状态
git status

# 添加文件到暂存区
git add .

# 提交更改
git commit -m "提交说明"

# 推送到远程仓库
git push origin master
```

### 拉取远程更新

```bash
git pull origin master
```

## 6. 在 VSCode 中使用 Git

### 源代码管理面板

点击左侧活动栏的源代码管理图标（或按 `Ctrl+Shift+G`），可以：

- 查看文件更改
- 暂存更改
- 编写提交信息并提交
- 推送和拉取代码

### 常用操作

| 操作 | 方法 |
|------|------|
| 暂存文件 | 点击文件旁的 `+` 号 |
| 取消暂存 | 点击暂存区文件旁的 `-` 号 |
| 提交 | 输入消息后点击 ✓ 或按 `Ctrl+Enter` |
| 推送 | 点击 "..." 菜单选择 "Push" |
| 拉取 | 点击 "..." 菜单选择 "Pull" |

### 查看差异

点击已修改的文件可查看具体更改内容，左侧为原始版本，右侧为当前版本。

## 常用 Git 命令速查

| 命令 | 说明 |
|------|------|
| `git status` | 查看工作区状态 |
| `git add .` | 暂存所有更改 |
| `git commit -m "message"` | 提交更改 |
| `git push` | 推送到远程 |
| `git pull` | 拉取远程更新 |
| `git log` | 查看提交历史 |
| `git branch` | 查看分支 |
| `git checkout -b 分支名` | 创建并切换分支 |
| `git merge 分支名` | 合并分支 |
