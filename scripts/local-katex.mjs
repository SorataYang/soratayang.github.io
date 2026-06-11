// 本地构建专用 clientModule:把 katex 样式打入 bundle,避免离线时 CDN 失效。
// Webpack 解析 bare 模块路径并自动 emit 字体文件到产物目录。
import 'katex/dist/katex.min.css';
