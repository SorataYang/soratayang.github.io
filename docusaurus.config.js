// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
// 公式
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkStripVideo from './scripts/remark-strip-video.mjs';
import fs from 'node:fs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// 本地构建模式:由 Tauri 打包流程注入 LOCAL_BUILD=true 与 DOCUSAURUS_LOCAL_LOCALE=zh|en
// 仅影响 build 行为,不影响在线 GitHub Pages 发布。
const isLocalBuild = process.env.LOCAL_BUILD === 'true';
const localLocale = process.env.DOCUSAURUS_LOCAL_LOCALE === 'en' ? 'en' : 'zh';

// 本地构建只内嵌"软件当前版本"对应的那一份 docs 快照,避免 current(/docs/next/)
// 与已发布版双份内容冗余。优先级:LOCAL_VERSION env > versions.json[0] > undefined(fallback)。
const allReleasedVersions = (() => {
  try {
    const v = JSON.parse(fs.readFileSync('./versions.json', 'utf-8'));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
})();
const localTargetVersion = process.env.LOCAL_VERSION || allReleasedVersions[0];
const localSingleVersionEnabled = isLocalBuild
  && typeof localTargetVersion === 'string'
  && allReleasedVersions.includes(localTargetVersion);

const onlineI18n = {
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
  localeConfigs: {
    en: { label: 'English' },
    zh: { label: '简体中文' },
  },
};

const localI18n = {
  defaultLocale: localLocale,
  locales: [localLocale],
  localeConfigs: {
    [localLocale]: { label: localLocale === 'en' ? 'English' : '简体中文' },
  },
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '桥通',
  tagline: '桥梁结构通用分析软件',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://soratayang.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SorataYang', // Usually your GitHub org/user name.
  projectName: 'soratayang.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages', // build产物推送到这个分支
  // 本地内嵌模式需要 trailingSlash:true 适配 Tauri 资源协议:
  // 协议默认不自动补 .html 后缀,/docs/foo/ 才能命中 docs/foo/index.html。
  // 在线模式保持 false,与 GitHub Pages 既有行为一致。
  trailingSlash: isLocalBuild,

  onBrokenLinks: 'warn',    //  'throw' -> 'warn'，这样链接断了也能构建成功
  onBrokenAnchors: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: isLocalBuild ? localI18n : onlineI18n,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // 默认显示已发布版本，而不是 current
          lastVersion: '26.1.112',
          // 本地内嵌模式:让 docs 接管根路径,打开 exe 直接进手册首页,无中转
          // (配合 scripts/generate-local-root-index.mjs 生成 / → 第一章 的兜底跳转)
          ...(isLocalBuild ? { routeBasePath: '/' } : {}),
          // 本地内嵌模式:只保留单个已发布版本,关掉 current,产物去掉 /docs/next/
          ...(localSingleVersionEnabled ? {
            includeCurrentVersion: false,
            onlyIncludeVersions: [localTargetVersion],
          } : {}),
          // 公式 + 本地模式下剥离视频引用
          remarkPlugins: [
            remarkMath,
            ...(isLocalBuild ? [[remarkStripVideo, { locale: localLocale }]] : []),
          ],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // 本地内嵌版无网络环境,关掉"编辑此页"链接
          editUrl: isLocalBuild
            ? undefined
            : 'https://github.com/SorataYang/soratayang.github.io/tree/main/docs/',
        },
        // 本地内嵌模式只发用户手册:更新日志(blog)整体禁用
        blog: isLocalBuild ? false : {
          showReadingTime: true,
          blogSidebarCount: 'ALL', // 显示所有
          //blogSidebarCount: 10, // 指定数量
          blogSidebarTitle: '历史版本更新',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/SorataYang/soratayang.github.io/tree/main/blog/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        // 本地内嵌模式不要首页 / FAQ / 下载 / 联系等独立页面
        pages: isLocalBuild ? false : undefined,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      {
        hashed: true,
        language: isLocalBuild ? [localLocale] : ["en", "zh"],
        searchBarShortcutKeymap: "ctrl+k",
      },
    ],
  ],

  // stylesheets 属于根级配置(不是 themeConfig),放在 themeConfig 下会被忽略,
  // 数学公式 CDN 样式表此前未真正加载。
  // 在线模式下使用 CDN;本地模式留空,改由下面的 clientModules 把 katex CSS 内联打包。
  stylesheets: isLocalBuild ? [] : [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  // 本地构建模式下,通过 clientModule 把 katex CSS 内联打包,避免离线时数学公式 CDN 失效
  clientModules: isLocalBuild ? ['./scripts/local-katex.mjs'] : [],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: '桥通软件',
        logo: {
          alt: '桥通软件',
          src: 'img/logo.svg',
          // 本地模式下点击 logo 回到手册首页(/ 由 postbuild 生成的 redirect 兜底,
          // 但编译期 Docusaurus 不知道 /,会报 broken link;指向真实页面消除警告)
          ...(isLocalBuild ? { href: '/ch01_intro/' } : {}),
        },
        items: isLocalBuild ? [
          // 本地内嵌模式只剩用户手册:用品牌区 + 搜索即可
          {
            type: 'search',
            position: 'right',
          },
        ] : [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '用户手册',
          },
          {
            to: '/blog',
            label: '更新日志',
            position: 'left',
          },
          {
            to: '/faq',
            label: '常见问题',
            position: 'left',
          },
          {
            to: '/download',
            label: '软件下载',
            position: 'left',
          },
          {
            to: '/contact',
            label: '联系我们',
            position: 'left',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            type: 'localeDropdown', // 多语言下拉选择
            position: 'right',
          },
        ],
      },

      // 本地内嵌模式 footer 极简:只剩版权与许可信息,无外链
      footer: isLocalBuild ? {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Qiaotong Software. <br/> Documentation licensed under CC BY 4.0.`,
      } : {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '用户手册',
                to: 'docs/ch01_intro/',
              },
              {
                label: '常见问题',
                to: '/faq',
              },
            ],
          },
          {
            title: '支持',
            items: [
              {
                label: '软件下载',
                to: '/download',
              },
              {
                label: '技术支持',
                href: 'mailto:support@qiaotong.com',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '更新日志',
                to: '/blog',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Qiaotong Software. Built with Docusaurus. <br/> Documentation licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
