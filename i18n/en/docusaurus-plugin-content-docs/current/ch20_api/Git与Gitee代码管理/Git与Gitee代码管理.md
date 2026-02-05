# Git + VSCode + Gitee Code Management Guide

This article introduces how to configure Git and use VSCode with Gitee for code management.

## 1. Install Git

### Download

Visit the Git official website: [https://git-scm.com/download/win](https://git-scm.com/download/win)

### Installation

Run the installer with default options. After installation, "Git Bash Here" will appear in the right-click menu.

### Verify Installation

```bash
git --version
```

## 2. Configure Git

### Set User Information

```bash
git config --global user.name "YourUsername"
git config --global user.email "YourEmail@example.com"
```

### Generate SSH Key

```bash
ssh-keygen -t rsa -C "YourEmail@example.com"
```

Press Enter three times to use defaults. Keys are saved in `~/.ssh/`.

### View Public Key

```bash
cat ~/.ssh/id_rsa.pub
```

## 3. Install VSCode

Download from: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)

VSCode has built-in Git support.

## 4. Configure Gitee

### Register

Visit: [https://gitee.com](https://gitee.com)

### Add SSH Public Key

1. Go to "Settings" → "SSH Public Key".
2. Paste your public key content.
3. Save.

### Create Repository

1. Click "+" → "New Repository".
2. Fill in name and description.
3. Click "Create".

## 5. Using Git

### Clone Repository

```bash
git clone git@gitee.com:YourUsername/RepoName.git
```

### Initialize Local Repository

```bash
git init
```

### Associate Remote Repository

```bash
git remote add origin git@gitee.com:YourUsername/RepoName.git
```

### Basic Workflow

```bash
git status          # Check status
git add .           # Stage all changes
git commit -m "message"  # Commit
git push origin master   # Push
```

### Pull Updates

```bash
git pull origin master
```

## 6. Using Git in VSCode

### Source Control Panel

Press `Ctrl+Shift+G` to open Source Control:
- View changes
- Stage changes
- Commit with message
- Push and pull

### Common Operations

| Operation | Method |
|-----------|--------|
| Stage | Click `+` next to file |
| Unstage | Click `-` next to staged file |
| Commit | Enter message, click ✓ |
| Push | Menu → Push |
| Pull | Menu → Pull |

## Common Git Commands

| Command | Description |
|---------|-------------|
| `git status` | View workspace status |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit changes |
| `git push` | Push to remote |
| `git pull` | Pull from remote |
| `git log` | View commit history |
| `git branch` | View branches |
| `git checkout -b name` | Create and switch branch |
| `git merge name` | Merge branch |
