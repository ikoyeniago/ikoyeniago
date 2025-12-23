import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  linktitle: string;
  linkpath: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '推荐阅读1',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        职能系列：探讨下技术写作需要的硬技能和软实力，以及自我提升的的思路。
      </>
    ),
    linktitle: '技术写作能力模型',
    linkpath: '/Doc/技术写作进阶/技术写作能力模型',
  },
  {
    title: '推荐阅读2',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        文档系列：分享下阅读扣子使用文档的感受，基于自身理解提出一种可能的优化思路。
      </>
    ),
    linktitle: '扣子使用文档调研',
    linkpath: '/Doc/五花八门调研/扣子使用文档调研',
  },
  {
    title: '推荐阅读3',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        工程系列：分享下自建文档站点的过程，先聊聊有关静态站点生成器（SSG）的了解和试用体验。
      </>
    ),
    linktitle: '文档网站方案调研',
    linkpath: '/Tech/文档网站方案调研',
  },
];

function Feature({title, Svg, description, linktitle, linkpath}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      <div className={styles.buttons}>
          <Link
            className="button button--secondary"
            to={linkpath}>
            {linktitle}
          </Link>
        </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
