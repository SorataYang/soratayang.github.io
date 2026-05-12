// 本地构建专用 remark 插件:作为防御性兜底,剥离 markdown 中直接写的 .mp4 等视频链接。
// 注意:Docusaurus 自身的资源管线会把 [label](path.mp4) 这种相对链接转成 webpack 资源
// 引用并搬到 /assets/files/<hash>.mp4,这种情况在 AST 阶段已经看不到了 ──
// 兜底由 scripts/strip-videos-postbuild.mjs 在 build 之后处理。
// 本插件只覆盖 absolute URL / 外链情况(虽然当前手册里没用到,但留作扩展)。

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogv)$/i;
const STUB_ZH = '🎬 该视频内容仅在线版本可用,本地手册已省略';
const STUB_EN = '🎬 Video available only in the online edition; omitted in the local manual.';

function isVideoUrl(url) {
  if (typeof url !== 'string') return false;
  return VIDEO_EXT.test(url.split('?')[0].split('#')[0]);
}

function walk(parent, stub) {
  if (!parent || !Array.isArray(parent.children)) return;
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (!child || typeof child !== 'object') continue;

    if ((child.type === 'link' || child.type === 'image') && isVideoUrl(child.url)) {
      parent.children.splice(i, 1, { type: 'text', value: stub });
      continue;
    }

    if (Array.isArray(child.children)) walk(child, stub);
  }
}

export default function remarkStripVideo(options = {}) {
  const stub = options.locale === 'en' ? STUB_EN : STUB_ZH;
  return (tree) => walk(tree, stub);
}
