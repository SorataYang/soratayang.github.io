// 本地构建后处理:在产物根目录生成 index.html,跳转到用户手册第一章。
// 上下文:LOCAL_BUILD 模式下 docs 接管根路径(routeBasePath:'/'),所有章节
// 直接挂在 / 下(如 /ch01_intro/),但 Docusaurus 不会自动生成 /index.html。
// 没有它的话 Tauri WebView 打开 / 会 404,所以这里写一个最小的 meta-refresh
// + JS replace 兜底,客户端立刻跳到第一章。
//
// 用法: node scripts/generate-local-root-index.mjs <build-dir> [first-doc-slug]

import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const outDir = process.argv[2];
  const firstDoc = process.argv[3] || 'ch01_intro';
  if (!outDir) {
    console.error('Usage: node scripts/generate-local-root-index.mjs <build-dir> [first-doc-slug]');
    process.exit(1);
  }
  const targetPath = `/${firstDoc}/`;
  const html = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${targetPath}">
<title>桥通用户手册</title>
<style>html,body{margin:0;padding:0;background:#1b1b1d;color:#e3e3e3;font-family:system-ui,sans-serif}.wrap{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:1rem}</style>
</head>
<body>
<div class="wrap"><p>Loading manual… <a href="${targetPath}" style="color:#7fbcff">${targetPath}</a></p></div>
<script>location.replace(${JSON.stringify(targetPath)});</script>
</body>
</html>
`;
  const target = path.join(path.resolve(outDir), 'index.html');
  await fs.writeFile(target, html, 'utf8');
  console.log(`[generate-local-root-index] wrote ${target} -> ${targetPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
