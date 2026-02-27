// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
// 公式
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

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
  trailingSlash: false,

  onBrokenLinks: 'warn',    //  'throw' -> 'warn'，这样链接断了也能构建成功
  onBrokenAnchors: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    localeConfigs: {
      en: { label: 'English' },
      zh: { label: '简体中文' }
    }
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // 公式
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
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
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
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
        language: ["en", "zh"],
        searchBarShortcutKeymap: "ctrl+k",
      },
    ],
  ],

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
        },
        items: [
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
            type: 'localeDropdown', // 多语言下拉选择
            position: 'right',
          },

        ],
      },

      footer: {
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

      // 添加 stylesheets 配置
      stylesheets: [
        {
          href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
          type: 'text/css',
          integrity:
            'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
          crossorigin: 'anonymous',
        },
      ],
    }),
};

export default config;
