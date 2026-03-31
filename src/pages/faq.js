import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './faq.module.css';

const qaItems = [
  {
    id: 'runtime',
    tag: '安装与环境',
    question: '软件最低运行环境是什么？',
    answer: '推荐使用 Windows 10/11，安装 .NET 6.0 Runtime，并确保显卡驱动处于较新版本。',
    links: [{ label: '查看安装说明', to: '/docs/ch01_intro/' }],
  },
  {
    id: 'license',
    tag: '授权与账号',
    question: '授权码提示无效怎么办？',
    answer: '先确认授权码和软件版本是否匹配，再检查系统时间是否正确，最后联系技术支持绑定机器信息。',
    links: [{ label: '联系我们', to: '/contact' }],
  },
  {
    id: 'open-project',
    tag: '项目与文件',
    question: '旧版本项目无法打开如何处理？',
    answer: '建议先在原版本备份项目，然后使用新版本执行一次另存为，避免覆盖历史工程。',
    links: [{ label: '项目文件说明', to: '/docs/ch03_project_files_data/' }],
  },
  {
    id: 'units',
    tag: '建模',
    question: '模型单位如何统一管理？',
    answer: '在建模前先确定全项目单位制，录入材料、截面和荷载时保持一致，必要时通过工具统一换算。',
    links: [{ label: '结构建模章节', to: '/docs/ch05_structure/' }],
  },
  {
    id: 'load-combo',
    tag: '荷载与工况',
    question: '荷载组合结果不符合预期是什么原因？',
    answer: '常见原因是工况方向、边界条件或组合系数设置错误，建议逐项检查并先做单工况对比。',
    links: [{ label: '荷载章节', to: '/docs/ch09_loads/' }],
  },
  {
    id: 'solver',
    tag: '计算与分析',
    question: '非线性分析不收敛怎么办？',
    answer: '可尝试减小步长、优化初始状态、检查约束冲突，并将复杂工况拆分为多阶段求解。',
    links: [{ label: '分析章节', to: '/docs/ch10_analysis/' }],
  },
  {
    id: 'result-missing',
    tag: '结果与后处理',
    question: '为什么看不到部分构件结果？',
    answer: '请检查结果筛选条件、显示层级和构件分组设置，确认当前视图没有过滤目标对象。',
    links: [{ label: '结果章节', to: '/docs/ch11_results/' }],
  },
  {
    id: 'export',
    tag: '结果与后处理',
    question: '如何导出高分辨率图和报表？',
    answer: '建议在结果视图中先固定配色和比例，再使用导出工具输出图片与报表，便于归档和审查。',
    links: [{ label: '工具章节', to: '/docs/ch14_tools/' }],
  },
  {
    id: 'cable-shape',
    tag: '专项分析',
    question: '索形分析如何设置初始条件？',
    answer: '优先使用接近设计状态的几何初值，并结合边界和温度工况做分步校核。',
    links: [{ label: '索形分析章节', to: '/docs/ch18_spatial_cable_shape/' }],
  },
  {
    id: 'wind',
    tag: '专项分析',
    question: '风荷载相关参数在哪里配置？',
    answer: '在风荷载与规范参数面板中配置基本风速、地表粗糙度和体型系数，注意与规范版本一致。',
    links: [{ label: '风荷载索形章节', to: '/docs/ch24_wind_cable_shape/' }],
  },
  {
    id: 'api',
    tag: '自动化',
    question: '是否支持 API 二次开发？',
    answer: '支持。可通过 API 文档了解对象模型、调用流程和示例，再按业务流程进行脚本封装。',
    links: [{ label: 'API 章节', to: '/docs/ch20_api/' }],
  },
  {
    id: 'support',
    tag: '支持与反馈',
    question: '遇到异常崩溃应提交哪些信息？',
    answer: '请提供复现步骤、项目样例、软件版本和日志截图，这能显著缩短问题定位时间。',
    links: [
      { label: '帮助与反馈', to: '/docs/ch22_help_feedback/' },
      { label: '联系支持', to: '/contact' },
    ],
  },
];

const allTags = ['全部', ...Array.from(new Set(qaItems.map((item) => item.tag)))];

export default function FaqPage() {
  const [activeTag, setActiveTag] = useState('全部');
  const [keyword, setKeyword] = useState('');

  const filteredItems = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return qaItems.filter((item) => {
      const matchedTag = activeTag === '全部' || item.tag === activeTag;
      const matchedKeyword =
        normalizedKeyword.length === 0 ||
        item.question.toLowerCase().includes(normalizedKeyword) ||
        item.answer.toLowerCase().includes(normalizedKeyword) ||
        item.tag.toLowerCase().includes(normalizedKeyword);

      return matchedTag && matchedKeyword;
    });
  }, [activeTag, keyword]);

  return (
    <Layout title="常见问题" description="桥通软件常见问题与解答">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>QIAOTONG QA CENTER</p>
            <Heading as="h1" className={styles.title}>
              常见问题 Q&A
            </Heading>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <span>问题总数</span>
              <strong>{qaItems.length}</strong>
            </div>
            <div className={styles.statCard}>
              <span>分类数量</span>
              <strong>{allTags.length - 1}</strong>
            </div>
          </div>
        </section>

        <section className={styles.controls}>
          <label className={styles.searchBox} htmlFor="faq-search">
            <span>搜索问题</span>
            <input
              id="faq-search"
              type="search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="输入关键词，例如：收敛、授权、索形"
            />
          </label>

          <div className={styles.tags} role="tablist" aria-label="问题分类筛选">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={tag === activeTag ? styles.tagActive : styles.tag}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.resultMeta}>
          <span>
            当前显示 <strong>{filteredItems.length}</strong> / {qaItems.length} 条
          </span>
          <Link to="/contact" className={styles.feedbackLink}>
            没找到答案？提交你的问题
          </Link>
        </section>

        <section className={styles.grid}>
          {filteredItems.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.badge}>{item.tag}</span>
              </div>
              <Heading as="h2" className={styles.question}>
                {item.question}
              </Heading>
              <p className={styles.answer}>{item.answer}</p>
              <div className={styles.cardLinks}>
                {item.links.map((link) => (
                  <Link key={`${item.id}-${link.to}`} to={link.to} className={styles.cardLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </section>

        {filteredItems.length === 0 && (
          <section className={styles.emptyState}>
            <Heading as="h3">没有匹配的问题</Heading>
            <p>可以尝试切换分类或减少关键词，或者直接联系技术支持。</p>
            <Link to="/contact" className={styles.emptyAction}>
              联系我们
            </Link>
          </section>
        )}
      </main>
    </Layout>
  );
}
