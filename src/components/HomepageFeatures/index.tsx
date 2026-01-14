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
    title: '专题1：职能（关于需要什么）',
    Svg: require('@site/static/img/subject_responsibility3.svg').default,
    description: (
      <>
        探讨下技术写作所需的硬技能和软实力，以及自我提升的的思路。
      </>
    ),
    linktitle: '入坑之技术写作能力模型',
    linkpath: '/Doc/技术写作进阶/技术写作能力模型',
  },
  {
    title: '专题2：文档（关于及格线在哪里）',
    Svg: require('@site/static/img/subject_technical_documentation3.svg').default,
    description: (
      <>
        分享下阅读技术文档作品的感受，并提出一些可能的优化思路。
      </>
    ),
    linktitle: '入坑之扣子使用文档调研',
    linkpath: '/Doc/五花八门调研/扣子使用文档调研',
  },
  {
    title: '专题3：工程（关于技术写作是系统工程）',
    Svg: require('@site/static/img/subject_engineering3.svg').default,
    description: (
      <>
        技术写作不止需要写好文档，分享下如何更好地支持技术写作的探索。
      </>
    ),
    linktitle: '入坑之文档网站方案调研',
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
