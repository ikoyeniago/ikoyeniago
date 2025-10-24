import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Ikoyenia goes on and on',
  tagline: '写技术文档的，日常叨叨叨叨...',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ikoyeniago.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: '/',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ikoyeniago', // Usually your GitHub org/user name.
  projectName: 'ikoyeniago.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // id: 'pageAbout', // omitted => default instance
          path: 'docs/About', // 个人相关文章的源文件路径
          routeBasePath: 'About', // 个人相关文章的起始访问路径
          sidebarPath: './sidebarsAbout.ts', // 个人相关文章的独立侧边栏
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
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
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pageDoc',
        path: 'docs/Doc', // 文档相关文章的源文件路径
        routeBasePath: 'Doc', // 文档相关文章的起始访问路径
        sidebarPath: './sidebarsDoc.ts', // 文档相关文章的独立侧边栏
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pageTech',
        path: 'docs/Tech', // 技术相关文章的源文件路径
        routeBasePath: 'Tech', // 技术相关文章的起始访问路径
        sidebarPath: './sidebarsTech.ts', // 技术相关文章的独立侧边栏
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pageUIUX',
        path: 'docs/UIUX', // 设计相关文章的源文件路径
        routeBasePath: 'UIUX', // 设计相关文章的起始访问路径
        sidebarPath: './sidebarsUIUX.ts', // 设计相关文章的独立侧边栏
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pageMgr',
        path: 'docs/Mgr', // 管理相关文章的源文件路径
        routeBasePath: 'Mgr', // 管理相关文章的起始访问路径
        sidebarPath: './sidebarsMgr.ts', // 管理相关文章的独立侧边栏
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Ikoyenia goes on and on',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'pageAboutSidebar',
          position: 'left',
          label: 'About',
        },
        {
          type: 'docSidebar',
          sidebarId: 'pageDocSidebar', // 在sidebarsXXX.ts文件中定义
          position: 'left',
          label: 'Doc',
          docsPluginId: 'pageDoc' // 非默认示例，需要用docsPluginId来关联侧边栏
        },
        {
          type: 'docSidebar',
          sidebarId: 'pageTechSidebar', // 在sidebarsXXX.ts文件中定义
          position: 'left',
          label: 'Tech',
          docsPluginId: 'pageTech' // 非默认示例，需要用docsPluginId来关联侧边栏
        },
        {
          type: 'docSidebar',
          sidebarId: 'pageUIUXSidebar', // 在sidebarsXXX.ts文件中定义
          position: 'left',
          label: 'UIUX',
          docsPluginId: 'pageUIUX' // 非默认示例，需要用docsPluginId来关联侧边栏
        },
        {
          type: 'docSidebar',
          sidebarId: 'pageMgrSidebar', // 在sidebarsXXX.ts文件中定义
          position: 'left',
          label: 'Mgr',
          docsPluginId: 'pageMgr' // 非默认示例，需要用docsPluginId来关联侧边栏
        },
        {
          href: 'https://github.com/ikoyeniago/ikoyeniago.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '足迹',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: '项目',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: '资源',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ikoyenia`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
