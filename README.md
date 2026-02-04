<div align="center">

# 桥通软件用户手册
# Qiaotong Software User Manual

[![Built with Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus-blue)](https://docusaurus.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Docs: CC BY 4.0](https://img.shields.io/badge/Docs-CC%20BY%204.0-green.svg)](./LICENSE-DOCS)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://soratayang.github.io/manual/)


[📖 在线阅读](https://soratayang.github.io/manual/) | [🐛 报告问题](https://github.com/SorataYang/manual/issues) | [🤝 参与贡献](https://github.com/SorataYang/manual/pulls)

</div>

---

## 📚 关于本项目

这是 **桥通软件（Qiaotong Software)** 的官方用户手册文档站点，使用 [Docusaurus](https://docusaurus.io/) 构建，提供中英文双语支持。

桥通是一款专业的**桥梁结构通用分析软件**，本手册涵盖：
- 软件介绍与功能概览
- 详细的操作指南
- API 使用手册
- 常见问题解答
- 技术支持与帮助

## ✨ 特性

- 🌍 **多语言支持** - 中文（简体）和英文界面
- 🔍 **全文搜索** - 快速查找所需内容（支持中英文）
- 📱 **响应式设计** - 完美适配桌面、平板和移动设备
- 🌓 **深色模式** - 自动适应系统主题偏好
- ⚡ **快速加载** - 静态站点生成，加载速度极快
- 📐 **数学公式支持** - KaTeX 渲染数学表达式

## 📄 许可证

本项目采用**双许可证**模式：

### 代码部分 - MIT License

Docusaurus 配置、主题自定义和构建脚本采用 [MIT License](./LICENSE) 开源许可证。

### 文档内容 - CC BY 4.0

文档内容采用 [Creative Commons Attribution 4.0 International License](./LICENSE-DOCS) 授权。

**这意味着您可以：**
- ✅ 自由使用、修改和分享文档
- ✅ 用于商业目的
- ✅ 用于 AI 训练和机器学习
- 📝 **唯一要求：保留文档署名**

详情请查看 [LICENSE-DOCS](./LICENSE-DOCS)。

## 🚀 快速开始

### 环境要求

- Node.js >= 20.0
- npm 或 yarn 包管理器

### 安装依赖

使用 yarn（推荐）：
```bash
yarn install
```

或使用 npm：
```bash
npm install
```

### 本地开发

启动中文版本开发服务器：
```bash
yarn start
# 或
npm start
```

启动英文版本开发服务器：
```bash
yarn en
# 或
npm run en
```

开发服务器将在 `http://localhost:3000/manual/` 启动，大多数更改会实时反映，无需重启服务器。

### 构建生产版本

```bash
yarn build
# 或
npm run build
```

此命令将生成静态内容到 `build` 目录，可使用任何静态托管服务部署。

### 本地预览生产版本

```bash
yarn serve
# 或
npm run serve
```

## 📦 部署

本项目使用 GitHub Pages 进行部署。

### 自动部署（推荐）

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 `gh-pages` 分支。

### 手动部署

使用 SSH：
```bash
USE_SSH=true yarn deploy
```

不使用 SSH：
```bash
GIT_USER=<Your GitHub username> yarn deploy
```

## 🤝 贡献指南

我们欢迎并感谢任何形式的贡献！

### 如何贡献

1. **报告问题**
   - 发现错误或错别字？[提交 Issue](https://github.com/SorataYang/manual/issues)
   
2. **改进文档**
   - Fork 本仓库
   - 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
   - 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
   - 推送到分支 (`git push origin feature/AmazingFeature`)
   - 开启一个 Pull Request

3. **翻译贡献**
   - 帮助改进现有翻译
   - 添加新语言支持

### 贡献者

感谢所有为本项目做出贡献的开发者！

您的贡献将帮助更多用户更好地使用桥通软件。

## 🔗 相关链接

- 📖 [在线文档](https://soratayang.github.io/manual/)
- 💻 [GitHub 仓库](https://github.com/SorataYang/manual)
- 🌐 [Docusaurus 官网](https://docusaurus.io/)

## 📞 联系我们

如有任何问题或建议，欢迎通过以下方式联系我们：

- 🐛 问题反馈：[GitHub Issues](https://github.com/SorataYang/manual/issues)
- 💬 Pull Request：[GitHub PR](https://github.com/SorataYang/manual/pulls)

---

<div align="center">

**版权所有 © 2026 Qiaotong Software (桥通软件)**

使用 ❤️ 和 [Docusaurus](https://docusaurus.io/) 构建

</div>
