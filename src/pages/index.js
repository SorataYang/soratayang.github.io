import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import Translate, { translate } from '@docusaurus/Translate';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.title">{siteConfig.title}</Translate>
        </Heading>
        <p className="hero__subtitle">
          {translate({
            id: 'homepage.hero.tagline',
            message: siteConfig.tagline,
          })}
        </p>
        <div className={styles.buttons}>
          {/* 按钮 1: 用户手册 */}
          <Link
            className="button button--secondary button--lg"
            to="docs/ch01_intro/">
            <Translate id="homepage.button.userManual">📚 用户手册</Translate>
          </Link>

          {/* 间距占位符 */}
          <span style={{ margin: '0 10px' }}></span>

          {/* 按钮 2: 软件下载 */}
          <Link
            className="button button--secondary button--lg"
            to="https://www.brdi.com.cn/list/91.html">
            <Translate id="homepage.button.download">⬇️ 软件下载</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}