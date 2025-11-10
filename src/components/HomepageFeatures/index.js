import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '全过程通用分析',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        适用于任何桥型从设计、施工到运维的全过程受力分析。
        支持公路、铁路、市政等多行业规范，满足多样化应用场景。
      </>
    ),
  },
  {
    title: '零成本快速上手',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        由一线工程师打造，操作界面与主流商业软件无缝衔接，不改变用户习惯。
        支持数据格式互认互导，交互建模高效便捷。
      </>
    ),
  },
  {
    title: '数十年实战检验',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        继承中铁大桥院核心技术，计算内核经过数十年、数百座桥梁工程的实战检验，
        计算性能卓越，结果准确可靠。
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
