import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './faq.module.css';
import { qaItems } from '../data/faqItems';

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

  const hasFilter = activeTag !== '全部' || keyword.trim().length > 0;

  return (
    <Layout title="常见问题" description="桥通软件常见问题与解答">
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>QIAOTONG QA CENTER</p>
          <Heading as="h1" className={styles.title}>
            常见问题
          </Heading>
          <p className={styles.subtitle}>使用桥通软件过程中的常见问题列表</p>
          <Link to="/contact" className={styles.addQuestionBtn}>
            添加你的问题
          </Link>
        </section>

        <section className={styles.controls}>
          <div className={styles.controlsHeader}>
            <Heading as="h2" className={styles.controlsTitle}>
              标签 <span>{filteredItems.length} 个问题</span>
            </Heading>
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => {
                setActiveTag('全部');
                setKeyword('');
              }}
              disabled={!hasFilter}
            >
              Clear All
            </button>
          </div>

          <div className={styles.filterRow}>
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

            <label className={styles.searchBox} htmlFor="faq-search">
              <input
                id="faq-search"
                type="search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="搜索问题名称..."
              />
            </label>
          </div>
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
