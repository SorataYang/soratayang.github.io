// 本地构建后处理:删掉所有视频文件,并把 HTML / JSON 索引里指向视频资源的引用替换为提示文本。
// 与 scripts/remark-strip-video.mjs 配合 ── remark 处理 markdown 原生链接,本脚本处理
// Docusaurus 资源管线已搬运到 /assets/files/<hash>.mp4 的资源链接。
//
// 用法: node scripts/strip-videos-postbuild.mjs <build-dir> [zh|en]

import fs from 'node:fs/promises';
import path from 'node:path';

const VIDEO_FILE_EXT = /\.(mp4|webm|mov|m4v|ogv)$/i;
const STUB_ZH = '🎬 该视频内容仅在线版本可用,本地手册已省略';
const STUB_EN = '🎬 Video available only in the online edition; omitted in the local manual.';

async function walk(dir, fn) {
  let ents;
  try {
    ents = await fs.readdir(dir, { withFileTypes: true });
  } catch (e) {
    if (e.code === 'ENOENT') return;
    throw e;
  }
  for (const ent of ents) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) await walk(p, fn);
    else if (ent.isFile()) await fn(p);
  }
}

async function main() {
  const outDir = process.argv[2];
  const locale = process.argv[3] === 'en' ? 'en' : 'zh';
  if (!outDir) {
    console.error('Usage: node scripts/strip-videos-postbuild.mjs <build-dir> [zh|en]');
    process.exit(1);
  }
  const absOut = path.resolve(outDir);
  const stub = locale === 'en' ? STUB_EN : STUB_ZH;
  // HTML 替换正则:匹配 <a ...href="<任意路径>.<视频扩展>"...>label</a>
  const htmlAnchorRe = /<a\b[^>]*\bhref="[^"]*?\.(?:mp4|webm|mov|m4v|ogv)"[^>]*>[\s\S]*?<\/a>/gi;
  // JSON 字符串替换:把含视频扩展名的 URL 字段值置空,避免搜索索引仍然指向 404
  const jsonUrlRe = /"url"\s*:\s*"[^"]*?\.(?:mp4|webm|mov|m4v|ogv)"/gi;

  let videosDeleted = 0;
  let videoBytesFreed = 0;
  let htmlPatched = 0;
  let jsonPatched = 0;

  await walk(absOut, async (filePath) => {
    if (VIDEO_FILE_EXT.test(filePath)) {
      try {
        const stat = await fs.stat(filePath);
        videoBytesFreed += stat.size;
      } catch {}
      await fs.unlink(filePath);
      videosDeleted++;
      return;
    }

    if (/\.html$/i.test(filePath)) {
      const orig = await fs.readFile(filePath, 'utf8');
      if (orig.includes('.mp4') || orig.includes('.webm') || orig.includes('.mov') || orig.includes('.m4v') || orig.includes('.ogv')) {
        const next = orig.replace(htmlAnchorRe, `<span class="video-stub" style="display:inline-block;padding:.25em .5em;border-radius:.25em;background:#f0f0f0;color:#666;">${stub}</span>`);
        if (next !== orig) {
          await fs.writeFile(filePath, next, 'utf8');
          htmlPatched++;
        }
      }
      return;
    }

    if (/\.json$/i.test(filePath)) {
      const orig = await fs.readFile(filePath, 'utf8');
      if (jsonUrlRe.test(orig)) {
        jsonUrlRe.lastIndex = 0;
        const next = orig.replace(jsonUrlRe, '"url":""');
        if (next !== orig) {
          await fs.writeFile(filePath, next, 'utf8');
          jsonPatched++;
        }
      }
    }
  });

  const mb = (videoBytesFreed / 1024 / 1024).toFixed(2);
  console.log(`[strip-videos-postbuild] locale=${locale}`);
  console.log(`  deleted ${videosDeleted} video file(s), freed ${mb} MB`);
  console.log(`  patched ${htmlPatched} HTML file(s)`);
  console.log(`  patched ${jsonPatched} JSON file(s)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
