import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {
  HeroCarousel,
  AnchorNav,
  FieldsSection,
  ColumnsSection,
  AboutSection,
} from '@site/src/components/Homepage';

// 轮播数据
const heroSlides = [
  {
    id: 1,
    title: 'Ikoyenia goes on and on',
    subtitle: '一名写技术文档的，日常叨叨叨叨叨叨...',
    backgroundImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1920&q=80',
    buttons: [
      { label: 'About', to: '/About/前言', variant: 'primary' as const },
      { label: 'Contact', onClick: () => {
        const footer = document.querySelector('footer');
        footer?.scrollIntoView({ behavior: 'smooth' });
      }, variant: 'secondary' as const },
    ],
  },
  {
    id: 2,
    title: '技术文档',
    subtitle: '技术文档 = 技术 + 文档',
    backgroundImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
    buttons: [
      { label: '最新', to: '/Doc/五花八门调研/扣子使用文档调研', variant: 'primary' as const },
      { label: '最热', to: '/Doc/五花八门调研/扣子使用文档调研', variant: 'secondary' as const },
    ],
  },
  {
    id: 3,
    title: '技术传播',
    subtitle: '贯穿产品生命周期的技术传播',
    backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
    buttons: [
      { label: '最新', to: '/Doc/技术写作进阶/技术写作能力模型', variant: 'primary' as const },
      { label: '最热', to: '/Doc/技术写作进阶/技术写作能力模型', variant: 'secondary' as const },
    ],
  },
];

// 锚点导航数据
const anchorItems = [
  { id: 'top', label: '回到顶部' },
  { id: 'fields', label: '关注的领域' },
  { id: 'columns', label: '叨叨的专栏' },
  { id: 'about', label: 'AI-in-the-Loop' },
];

// 关注的领域数据
const fieldsData = [
  {
    title: '文档',
    description: '码好字是基本修养',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    linkTo: '/Doc/前言',
  },
  {
    title: '技术',
    description: '有技术是硬核实力',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    linkTo: '/Tech/前言',
  },
  {
    title: '设计',
    description: '懂设计是品味进阶',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    linkTo: '/DSGN/前言',
  },
  {
    title: '营销',
    description: '能营销是增值必备',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    linkTo: '/Team/前言',
  },
  {
    title: '翻译',
    description: '翻译转换是国际化思维',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    linkTo: '/Team/前言',
  },
  {
    title: '团队',
    description: '沟通协作是必备软技能',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    linkTo: '/Team/前言',
  },
];

// 叨叨的专栏数据
const columnsData = [
  {
    title: '职能（关于需要什么）',
    description: '探讨下技术写作所需的硬技能和软实力，以及自我提升的的思路。',
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&q=80',
    buttons: [
      { label: '最新', to: '/Doc/技术写作进阶/技术写作能力模型' },
      { label: '最热', to: '/Doc/技术写作进阶/技术写作能力模型' },
    ],
  },
  {
    title: '文档（关于及格线在哪里）',
    description: '分享下阅读技术文档作品的感受，并提出一些可能的优化思路。',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    buttons: [
      { label: '最新', to: '/Doc/五花八门调研/扣子使用文档调研' },
      { label: '最热', to: '/Doc/五花八门调研/扣子使用文档调研' },
    ],
  },
  {
    title: '工程（关于技术写作是系统工程）',
    description: '技术写作不止需要写好文档，分享下如何更好地支持技术写作的探索。',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    buttons: [
      { label: '最新', to: '/Doc/技术写作进阶/技术写作任务坐标系' },
      { label: '最热', to: '/Doc/技术写作进阶/技术写作任务坐标系' },
    ],
  },
  {
    title: '备用（备用）',
    description: '备用',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    buttons: [
      { label: '探索一下', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    ],
  },
];

// AI-in-the-Loop的数据
const aboutData = [
  {
    title: 'AI Builder',
    description: 'AI Builder',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    buttonLabel: '探索ing',
    onButtonClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  },
  {
    title: 'AI Architect',
    description: 'AI Architect',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    buttonLabel: '探索ing',
    onButtonClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`仰望星空，脚踏实地`}
      description="Ikoyenia的个人网站 - 技术文档、技术传播">
      
      {/* 锚点导航 */}
      <AnchorNav items={anchorItems} />
      
      {/* Hero轮播区 */}
      <div id="top">
        <HeroCarousel slides={heroSlides} />
      </div>
      
      <main>
        {/* 关注的领域 */}
        <FieldsSection fields={fieldsData} />
        
        {/* 叨叨的专栏 */}
        <ColumnsSection columns={columnsData} />
        
        {/* AI-in-the-Loop */}
        <AboutSection items={aboutData} />
      </main>
    </Layout>
  );
}
