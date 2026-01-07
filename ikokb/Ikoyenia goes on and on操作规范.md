# Ikoyenia goes on and on操作规范（Windows）

记录Ikoyenia个人内容平台的构建和运维相关操作。

## 操作须知

Windows系统中使用PowerShell完成环境准备、静态站点构建、网站部署等操作。软件栈包括：

- npm：侧重于安装或卸载某个模块，不具备执行能力。
- npx：重在执行命令，自动安装后也会自动删除。
- yarn：可以和npm互操作，是个功能强大的JS包管理器。
- nvm：是node版本管理工具，与fnm的用途相同，而非npm/yarn/pnpm这种依赖包管理工具。
- fnm：是一个快速、简单的 Node.js 版本管理器。

## 准备环境

安装所需软件栈：

1. 安装fnm并配置环境变量。

   ```powershell
   $ winget install Schniz.fnm
   ```

2. 创建并编辑profile文件，在profile文件中添加`fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression`并保存。
   ```powershell
   $ if (-not (Test-Path $profile)) { New-Item $profile -Force }
   $ Invoke-Item $profile
   ```

3. 安装Node.js并修改默认版本。

   ```powershell
   $ fnm install 22
   $ fnm use v22.14.0
   $ node -v
   v22.14.0
   $ npm -v
   10.9.2
   ```

4. 安装yarn。
   ```powershell
   $ npm install -g yarn
   $ yarn -v
   1.22.22
   ```

## 新建文档网站

### 初始化Docusaurus项目

推荐通过命令行工具create-docusaurus安装Docusaurus，其中`--typescript`选项来使用模板的TypeScript变种。

```powershell
$ npx create-docusaurus@latest stc-docuhub classic --typescript
[INFO] Creating new Docusaurus project...
[INFO] Installing dependencies with npm...
[SUCCESS] Created stc-docuhub.
[INFO] Inside that directory, you can run several commands:

  `npm start`
    Starts the development server.

  `npm run build`
    Bundles your website into static files for production.

  `npm run serve`
    Serves the built website locally.

  `npm run deploy`
    Publishes the website to GitHub pages.

We recommend that you begin by typing:

  `cd stc-docuhub`
  `npm start`

Happy building awesome websites!
```

### 本地预览文档网站

在本地完成调试和预览工作，包括但不限于添加待发布的文档以及所需的图片、图标等静态资源文件，按需编辑`docusaurus.config.ts`、`\src\components\HomepageFeatures\index.tsx`、`\src\pages\index.tsx`、`sidebars.ts`等配置文件。

1. 进入项目文件夹，安装编译所需的依赖，以使用yarn为例。其中`yarn`命令效果等同于`yarn install`命令。

   ```powershell
   $ cd stc-docuhub
   $ yarn
   ```

2. 运行开发服务器。

   - 直接启动。添加编辑文档等，无需编译直接启动预览效果。

     ```powershell
     $ yarn run start
     ```

   - 编译并启动。部分特性需要编译才可用，比如安装和使用第三方搜索插件。

     ```powershell
     $ yarn build
     $ yarn serve
     ```

3. 本地调试预览时，访问`http://localhost:3000/`或者`http://127.0.0.1:3000/`，而非机器的内网IP。

### 一键部署文档网站

以一键部署到GitHub Pages为例。

在GitHub中操作：

1. 创建部署到GitHub Pages所需的GitHub repo，具体操作请参见[创建Github Pages站点](https://docs.github.com/zh/pages/getting-started-with-github-pages/creating-a-github-pages-site)。

   > 说明：GitHub repo所有者为组织。

2. 在GitHub repo的**Settings**页面，修改**Code and automation** > **Pages**中的Build and deployment配置，将Source配置为Deploy from a branch，将Branch配置为待发布文档所在的分支，例如`main`，并指定静态站点文件的根目录`/(root)`，而非`docs`。

3. 生成GitHub私有凭证，具体操作请参见[Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)。

   > 说明：为个人账户生成凭证，并且为个人账户添加GitHub repo的Admin权限即可。

在本地操作（以使用yarn为例）：

1. 进入项目文件夹。

   ```powershell
   $ cd stc-docuhub
   ```
   
2. 按照部署渠道的要求执行命令。

   - 将静态站点文件部署在自行维护的服务器。
   
     ```powershell
     $ yarn build
     $ yarn serve
     ```
   
   - 将静态站点文件部署到GitHub Pages。
   
     > 说明：deploy命令用来完成整个部署流程，默认会执行build命令等并将文件部署、提交到指定渠道。
   
     ```powershell
     $ cmd /C 'set "GIT_USER=ikoyeniago" && set "DEPLOYMENT_BRANCH=main" && yarn deploy'
     ```

## 文档项目说明

### 仓库和网站

源码仓库：https://github.com/Stream-Computing/stc-docuhub/tree/20250930-phase1

> 说明：目前使用`20250930-phase1`分支，在phase2启动前，暂时不merge到`main`分支。

部署仓库：https://github.com/ikoyeniago/ikoyeniago

> 说明：源码仓库用于管理文档项目源码，部署仓库用于从源码一键部署文档网站。更新文档版本时的具体操作，请参见*更新文档版本*章节。

文档网站地址：

- 原始网址：https://ikoyeniago.github.io/
- 重定向网址：暂无

> 说明：访问重定向网址时，目前从公司VPN访问报错`ERR_SSL_VERSION_OR_CIPHER_MISMATCH`，但是从外网访问正常。

### 代码和文件

| **名称**                       | **类型** | **说明**                                                     | **是否提交** |
| ------------------------------ | -------- | ------------------------------------------------------------ | ------------ |
| .docusaurus                    | 目录     | Docusaurus环境相关的文件，包括插件等。                       | 否           |
| .git                           | 目录     | Git环境相关的文件。                                          | 否           |
| blog                           | 目录     | 网站发布博客文章的源md文件。                                 | 是           |
| build                          | 目录     | 编译Docusaurus项目得到的产出物。                             | 否           |
| docs                           | 目录     | 网站发布技术文档的源md文件。                                 | 是           |
| node_modules                   | 目录     | Docusaurus环境依赖的组件。                                   | 否           |
| pageAIAIO_versioned_docs       | 目录     | AI一体机产品文档的历史版本源md文件。                         | 是           |
| pageAIAIO_versioned_sidebars   | 目录     | AI一体机产品文档的历史版本侧边栏配置文件。                   | 是           |
| pageAICloud_versioned_docs     | 目录     | 智算云平台产品文档的历史版本源md文件。                       | 是           |
| pageAICloud_versioned_sidebars | 目录     | 智算云平台产品文档的历史版本侧边栏配置文件。                 | 是           |
| src                            | 目录     | 网站效果的一些源文件，包括网页组件、CSS、单页应用相关的配置文件。 | 是           |
| static                         | 目录     | 网站的静态资源文件。包括不限于：<br/>- `img`：存放网站所需静态资源文件。<br/>- `doc_img`：存放AI加速卡文档所需静态资源文件。<br/>- `pageAIAIO_doc_img`：存放AI一体机文档所需静态资源文件。<br/>- `pageAICloud_doc_img`：存放智算云平台文档所需静态资源文件。 | 是           |
| stckb                          | 目录     | 本项目的知识库文档，包括运维操作文档等。                     | 是           |
| versioned_docs                 | 目录     | 默认文档实例（AI加速卡产品文档）的历史版本源md文件。         | 是           |
| versioned_sidebars             | 目录     | 默认文档实例（AI加速卡产品文档）的历史版本侧边栏配置文件。   | 是           |
| .gitignore                     | 文件     | 用于忽略归档某些文件，例如环境依赖等，让项目仓库保持简洁。   | 是           |
| docusaurus.config.ts           | 文件     | Docusaurus项目的核心配置文件，用于定义网站的基本信息、功能模块和整体行为。包括不限于：<br/>- 配置站点元数据：title、tagline、favicon、url、baseUrl。<br/>- 配置部署偏好：projectName、organizationName。<br/>- 定制核心功能：presets、plugins、themes，官方demo预设了技术文档、博客、央视等，增删文档实例、增删文档关系图插件通过plugins实现，增删本地搜索通过themes实现。<br/>- 定制主题外观：navbar、footer、colorMode，在导航栏显示增加的文档实例通过navbar实现。<br/>- 其他自定义配置：customFields。 | 是           |
| package.json                   | 文件     | Docusaurus项目配置清单，主要作用有定义项目元数据（名称、版本、描述）、声明项目依赖包（dependencies和devDependencies）、配置可执行的脚本命令、指定项目兼容的Node.js版本。 | 是           |
| package-lock.json              | 文件     | 当使用npm作为包管理器时生成，主要作用有记录每个依赖包的确切版本和下载地址、确保不同环境安装完全相同的依赖树、提供依赖安装的确定性构建、加速后续安装（通过缓存机制）。<br/>注意：尽量选择一种包管理器，避免依赖版本不一致。 | 是           |
| pageAIAIO_versions.json        | 文件     | AI一体机产品文档的历史版本配置文件。                         | 是           |
| pageAICloud_versions.json      | 文件     | 智算云平台产品文档的历史版本配置文件。                       | 是           |
| sidebars.ts                    | 文件     | 默认文档实例（AI加速卡产品文档）的当前版本侧边栏配置文件。   | 是           |
| sidebarsAIAIO.ts               | 文件     | AI一体机产品文档的当前版本侧边栏配置文件。                   | 是           |
| sidebarsAICloud.ts             | 文件     | 智算云平台产品文档的当前版本侧边栏配置文件。                 | 是           |
| tsconfig.json                  | 文件     | 当项目使用TypeScript时需要的配置文件，主要作用有定义TypeScript编译选项、指定源文件目录和输出目录、配置模块解析策略、启用严格的类型检查。 | 是           |
| versions.json                  | 文件     | 默认文档实例（AI加速卡产品文档）的历史版本配置文件。         | 是           |
| yarn.lock                      | 文件     | 当使用yarn作为包管理器时生成，主要作用有为yarn提供确定性的依赖安装、记录依赖解析结果和完整性校验。<br/>注意：尽量选择一种包管理器，避免依赖版本不一致。 | 是           |

## 更新文档版本

以当前AI加速卡产品文档版本为version-1.9.0，需要发布version-1.10.0为例。

> 说明：仓库、网站、代码、文件的介绍，请参见*文档项目说明*章节。

1. 从**源码仓库**拉取最新项目代码。
2. 更新docs目录下的文档，包括md文件、img文件等，确保可以作为version-1.10.0封版。

   > 说明：目录在侧边栏的顺序通过目录中的`_category_.json`文件定义，md文件在侧边栏的顺序通过md文件开头的front matter定义。

   - `_category_.json`内容示例：

     ```json
     {
         "position": 4,
         "label": "STCRP使用指南",
         "collapsible": true,
         "collapsed": true,
         "className": "red",
         "link": {
           "type": "generated-index",
           "title": "STCRP使用指南"
         },
         "customProps": {
           "description": "This description can be used in the swizzled DocCard"
         }
       }
     ```

   - front matter示例：

     ```markdown
     sidebar_position: 1
     sidebar_label: STCRP Release Notes
     sidebar_class_name: green
     ```
3. 一键创建version-1.10.0相关的目录和文件。

   ```bash
   $ yarn docusaurus docs:version 1.10.0
   ```
4. 更新主配置文件`docusaurus.config.ts`，通过导航栏下拉菜单显示version-1.10.0入口。

   ```json
         items: [
           {
             type: 'docSidebar',
             sidebarId: 'defaultSidebar',
             position: 'left',
             label: 'AI加速卡',
           },
           {
             type: 'docsVersionDropdown',
             versions: {
               '1.10.0': {label: 'v1.10.0'},
               '1.9.0': {label: 'v1.9.0'},
             },
           },
         ]
   ```
5. 本地预览查看显示效果。

   - 直接启动。

     ```bash
     $ cd stc-docuhub
     $ yarn start
     ```

   - 编译并启动。

     ```bash
     $ cd stc-docuhub
     $ yarn build
     $ yarn serve
     ```
6. 执行一键部署命令。执行命令后，自动将HTML、CSS等静态文件上传到**部署仓库**并触发文档网站构建，一般耗时几分钟， 命令执行成功后访问**文档网站地址**查看线上效果。

   ```bash
   $ cmd /C 'set "GIT_USER=streamcomputinger" && set "DEPLOYMENT_BRANCH=main" && yarn deploy'
   ```
7. 查验线上显示正常后，将项目代码归档至**源码仓库**。

   > 说明：目前使用`20250930-phase1`分支，在phase2启动前，暂时不merge到`main`分支。

## 进阶操作（Phase 1）

### 添加文档多实例

1. 在`docusaurus.config.ts`中添加文档实例配置。

   ```tsx
   presets: [
       [
         'classic',
         {
           docs: {
             // id: 'pageAICard', // omitted => default instance
             path: 'docs/AI加速卡', // AI加速卡产品文档的源文件路径
             routeBasePath: 'AI加速卡', // AI加速卡产品文档的起始访问路径
             sidebarPath: './sidebarsAICard.ts', // AI加速卡产品文档的独立侧边栏
             // Please change this to your repo.
             // Remove this to remove the "edit this page" links.
             editUrl:
               'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
           },
           // 其他默认配置
         } satisfies Preset.Options,
       ],
     ],
   
     plugins: [
       // 增加文档多实例
       [
         '@docusaurus/plugin-content-docs',
         {
           id: 'pageAIAIO',
           path: 'docs/AI一体机', // AI一体机产品文档的源文件路径
           routeBasePath: 'AI一体机', // AI一体机产品文档的起始访问路径
           sidebarPath: './sidebarsAIAIO.ts', // AI一体机产品文档的独立侧边栏
         },
       ],
       [
         '@docusaurus/plugin-content-docs',
         {
           id: 'pageAICloud',
           path: 'docs/智算云平台', // 智算云平台产品文档的源文件路径
           routeBasePath: '智算云平台', // 智算云平台产品文档的起始访问路径
           sidebarPath: './sidebarsAICloud.ts', // 智算云平台产品文档的独立侧边栏
         },
       ],
     ],
   ```

2. 添加侧边栏配置，复制并添加`sidebarsAIAIO.ts`等文件，按需定义`sidebarId`。

   ```tsx
   const sidebars: SidebarsConfig = {
     // By default, Docusaurus generates a sidebar from the docs folder structure
     AIAIOSidebar: [{type: 'autogenerated', dirName: '.'}],
   ```

3. 添加nav配置，注意关联`PluginID`和`sidebarId`，否则无法独立显示。

   ```tsx
     themeConfig: {
       // Replace with your project's social card
       // image: 'img/docusaurus-social-card.jpg',
       colorMode: {
         respectPrefersColorScheme: true,
       },
       navbar: {
         title: 'STC Docs Hub',
         logo: {
           alt: '',
           src: 'img/stc_logo.svg',
         },
         items: [
           {
             type: 'docSidebar',
             sidebarId: 'AICardSidebar',
             position: 'left',
             label: 'AI加速卡',
           },
           {
             type: 'docSidebar',
             sidebarId: 'AIAIOSidebar', // 在sidebarsXXX.ts文件中定义
             position: 'left',
             label: 'AI一体机',
             docsPluginId: 'pageAIAIO' // 非默认实例，需要用docsPluginId来关联侧边栏
           },
           {
             type: 'docSidebar',
             sidebarId: 'AICloudSidebar', // 在sidebarsXXX.ts文件中定义
             position: 'left',
             label: '智算云平台',
             docsPluginId: 'pageAICloud' // 非默认实例，需要用docsPluginId来关联侧边栏
           },
           {
             to: '/blog',
             label: 'Blog',
             position: 'right'
           },
           {
             href: 'https://github.com/Stream-Computing/stream-computing.github.io',
             label: 'GitHub',
             position: 'right',
           },
         ],
       },
       // 其他默认配置
           
     } satisfies Preset.ThemeConfig,
   };
   ```

### 维护文档多版本

请查看[分版](https://docusaurus.io/zh-CN/docs/versioning#overview)提前理解current version和latest version等概念。

> 说明：准确来说，文档多版本功能是面向文档集的，是管理一套文档集的多个版本，而非单篇文档的多个版本。

添加新的文档版本：

1. 检查当前版本的文档，确保已经可以封版。

2. 为各个文档实例分别创建文档版本，除默认的文档实例外，其他文档实例需要在命令中指定`PluginID`。此外，还支持通过`disableVersioning`、`includeCurrentVersion`、`lastVersion`、`onlyIncludeVersions`、`versions`等插件选项自定义版本行为，更多说明请参见：[plugin-content-docs > Configuration](https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-content-docs#configuration)。

   > 说明：Docusaurus的默认策略是：发布v1后，立即开始着手v2。这种情况下，latest version是v1，访问路径是`example.com/docs`，current version是v2，访问路径是`example.com/docs/next`。

   ```powershell
   $ yarn docusaurus docs:version 1.9.0
   $ yarn docusaurus docs:version:pageAIAIO 1.0.0
   $ yarn docusaurus docs:version:pageAICloud 1.0.0 
   ```

3. 为各个文档实例分别配置静态资源路径。

   > 说明：相对路径存放静态资源时依赖文档自身所在的位置，会导致路径管理过于复杂，因此建议用全局绝对路径统一管理。在操作时，注意即使是更新同一个图片也要新增ID，避免复用原有ID，规避对历史版本文档的影响。

   - 全局可用的：放在`/static`中并使用绝对路径。在本项目中，规定网站使用`img`目录，AI加速卡文档使用`doc_img`目录，AI一体机文档使用`pageAIAIO_doc_img`目录，智算云平台文档使用`pageAICloud_doc_img`目录。

     ```markdown
     ![图片 alt](/doc-img/aicardImage.png)
     
     ![图片 alt](/pageAIAIO_doc_img/aiaioImage.png)
     
     ![图片 alt](/pageAICloud_doc_img/aicloudImage.png)
     
     [下载此文件](/file.pdf)
     ```

   - 版本相关的：放在文档所在目录中并使用相对路径。

     ```markdown
     ![图片 alt](./myImage.png)
     
     [下载此文件](./file.pdf)
     ```

4. 为各个文档实例分别定义下拉菜单显示的文档版本。

   > 说明：更多说明请参见：[主题配置 > Navbar > Navbar items > Navbar docs version dropdown](https://docusaurus.io/zh-CN/docs/api/themes/configuration#navbar-docs-version-dropdown)。

   - 自定义版本Label：

     ```tsx
     export default {
       themeConfig: {
         navbar: {
           items: [
             {
               type: 'docSidebar',
               sidebarId: 'AICardSidebar',
               position: 'left',
               label: 'AI加速卡',
             },
             {
               type: 'docsVersionDropdown',
               versions: {
                 // current: {label: 'v1.10.0'},
                 '1.9.0': {label: 'v1.9.0'},
               },
             },
             // {
             //   type: 'docSidebar',
             //   sidebarId: 'AIAIOSidebar', // 在sidebarsXXX.ts文件中定义
             //   position: 'left',
             //   label: 'AI一体机',
             //   docsPluginId: 'pageAIAIO' // 非默认实例，需要用docsPluginId来关联侧边栏
             // },
             // {
             //   type: 'docsVersionDropdown',
             //   versions: {
             //     // current: {label: 'v1.1.0'},
             //     '1.0.0': {label: 'v1.0.0'},
             //   },
             //   docsPluginId: 'pageAIAIO'
             // },
             {
               type: 'docSidebar',
               sidebarId: 'AICloudSidebar', // 在sidebarsXXX.ts文件中定义
               position: 'left',
               label: '智算云平台',
               docsPluginId: 'pageAICloud' // 非默认实例，需要用docsPluginId来关联侧边栏
             },
             {
               type: 'docsVersionDropdown',
               versions: {
                 // current: {label: 'v1.1.0'},
                 '1.0.0': {label: 'v1.0.0'},
               },
               docsPluginId: 'pageAICloud'
             },
           ],
         },
       },
     };
     ```

   - 默认版本Label：

     ```tsx
     export default {
       themeConfig: {
         navbar: {
           items: [        
             {
               type: 'docSidebar',
               sidebarId: 'AICardSidebar',
               position: 'left',
               label: 'AI加速卡',
             },
             {
               type: 'docsVersionDropdown',
               versions: ['current', '1.9.0'],
             },
             // {
             //   type: 'docSidebar',
             //   sidebarId: 'AIAIOSidebar', // 在sidebarsXXX.ts文件中定义
             //   position: 'left',
             //   label: 'AI一体机',
             //   docsPluginId: 'pageAIAIO' // 非默认实例，需要用docsPluginId来关联侧边栏
             // },
             // {
             //   type: 'docsVersionDropdown',
             //   versions: ['current', '1.0.0'],
             //   docsPluginId: 'pageAIAIO'
             // },
             {
               type: 'docSidebar',
               sidebarId: 'AICloudSidebar', // 在sidebarsXXX.ts文件中定义
               position: 'left',
               label: '智算云平台',
               docsPluginId: 'pageAICloud' // 非默认实例，需要用docsPluginId来关联侧边栏
             },
             {
               type: 'docsVersionDropdown',
               versions: ['current', '1.0.0'],
               docsPluginId: 'pageAICloud'
             },
           ],
         },
       },
     };
     ```

更新已有的文档版本：

1. 找到对应的`versioned_docs/`，例如AI加速卡文档的`\versioned_docs\version-1.9.0`，AI一体机文档的`\pageAIAIO_versioned_docs\version-1.0.0`，智算云平台文档的`\pageAICloud_versioned_docs\version-1.0.0`。
2. 编辑该版本的文档。
3. 提交并推送更改。
4. 自动被发布到对应版本。

删除已有的文档版本：

1. 删除版本配置，例如AI加速卡文档在`versions.json`中删除版本：

   ```json
   [
     "1.10.0",
     "1.9.0",
   - "1.8.0"
   ]
   ```

2. 删除版本化文档的目录。例如AI加速卡文档的 `versioned_docs/version-1.8.0`。

3. 删除版本化侧边栏文件。例如AI加速卡文档在的`versioned_sidebars/version-1.8.0-sidebars.json`。

### 更新Docusaurus版本

1. 在`package.json`中修改版本号，所有以`@docusaurus/`开头的包都需要使用同一版本。例如：

   ```powershell
   {
     "dependencies": {
       "@docusaurus/core": "3.7.0",
       "@docusaurus/preset-classic": "3.7.0",
       // ...
     }
   }
   ```

2. 执行命令完成更新以及依赖安装。

   ```powershell
   $ yarn install
   $ yarn add @docusaurus/core @docusaurus/preset-classic
   ```

### 启用搜索栏

#### Algolia DocSearch（官方推荐）

1. 注册Algolia账号。

2. 创建DocSearch Application。

   1. 添加网站Domain。
   2. 创建网站Crawler，并获取Application ID、Search API Key、Index Name。

3. 关联Docusaurus和DocSearch。

   1. 在`docusaurus.config.js`中添加字段，部署DocSearch。

      > 说明：目前还是搜索不到文档内容，可能是因为启用文档多实例导致未从`/docs`作为`routeBasePath`，后面如果需要使用Algolia DocSearch，可以考虑自定义以下`replaceSearchResultPathname`、`searchPagePath`等参数。

      ```js
      export default {
        // ...
        themeConfig: {
          // ...
          algolia: {
            // The application ID provided by Algolia
            appId: 'YOUR_APP_ID',
      
            // Public API key: it is safe to commit it
            apiKey: 'YOUR_SEARCH_API_KEY',
      
            indexName: 'YOUR_INDEX_NAME',
      
            // Optional: see doc section below
            contextualSearch: true,
      
            // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
            externalUrlRegex: 'external\\.com|domain\\.com',
      
            // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
            replaceSearchResultPathname: {
              from: '/docs/', // or as RegExp: /\/docs\//
              to: '/',
            },
      
            // Optional: Algolia search parameters
            searchParameters: {},
      
            // Optional: path for search page that enabled by default (`false` to disable it)
            searchPagePath: 'search',
      
            // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
            insights: false,
      
            // Optional: whether you want to use the new Ask AI feature (undefined by default)
            askAi: 'YOUR_ALGOLIA_ASK_AI_ASSISTANT_ID',
      
            //... other Algolia params
          },
        },
      };
      ```

   2. 自动触发一次Crawl。

4. 按需完成其他配置。

   1. 验证域名，否则只能体验七天。
   2. 编辑Index Configuration，然后手动触发一次Crawl。

#### 第三方离线搜索插件（简单易用）

1. 安装搜索插件，以docusaurus-search-local为例：

   ```powershell
   $ yarn add @easyops-cn/docusaurus-search-local
   $ yarn remove @easyops-cn/docusaurus-search-local
   ```

2. 启用搜索功能，按README在`docusaurus.config.js`中添加字段。

   > 说明：需要自定义`docsRouteBasePath`，适配下文档多实例的逻辑。
   
   ```powershell
   // In your `docusaurus.config.js`:
   module.exports = {
     // ... Your other configurations.
     themes: [
       // ... Your other themes.
       [
         // 增加docusaurus-search-local本地搜索插件
         require.resolve("@easyops-cn/docusaurus-search-local"),
         /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
         ({
           docsRouteBasePath: ["AI加速卡", "AI一体机", "智算云平台"],
   
           // ... Your options.
           // `hashed` is recommended as long-term-cache of index file is possible.
           hashed: true,
   
           // For Docs using Chinese, it is recomended to set:
           language: ["en", "zh"],
   
           // Customize the keyboard shortcut to focus search bar (default is "mod+k"):
           // searchBarShortcutKeymap: "s", // Use 'S' key
           // searchBarShortcutKeymap: "ctrl+shift+f", // Use Ctrl+Shift+F
   
           // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
           // forceIgnoreNoIndex: true,
         }),
       ],
     ],
   };
   ```

docusaurus-search-local项目相关的信息如下：

- 项目地址：https://github.com/easyops-cn/docusaurus-search-local

- 搜索背景知识：https://www.wangshenwei.com/multilingual-full-text-search/

- 国际化：从v0.25.0开始支持Docusaurus I18N系统，提供开箱即用的`en` / `de` / `vi` / `zh-CN`翻译，其他语言则需要自行配置。

- 支持的Theme Options：

  | Name                              | Type                                                         | Default   | Description                                                  |
  | --------------------------------- | ------------------------------------------------------------ | --------- | ------------------------------------------------------------ |
  | indexDocs                         | boolean                                                      | `true`    | Whether to index docs.                                       |
  | indexBlog                         | boolean                                                      | `true`    | Whether to index blog.                                       |
  | indexPages                        | boolean                                                      | `false`   | Whether to index pages.                                      |
  | docsRouteBasePath                 | string \| string[]                                           | `"/docs"` | Base route path(s) of docs. Slash at beginning is not required. Note: for [docs-only mode](https://docusaurus.io/docs/docs-introduction#docs-only-mode), this needs to be the same as `routeBasePath` in your `@docusaurus/preset-classic` config e.g., `"/"`. |
  | blogRouteBasePath                 | string \| string[]                                           | `"/blog"` | Base route path(s) of blog. Slash at beginning is not required. |
  | language                          | string \| string[]                                           | `"en"`    | All [lunr-languages](https://github.com/MihaiValentin/lunr-languages) supported languages, + `zh` 🔥. |
  | hashed                            | boolean \| `"filename"` | `"query"`                          | `false`   | Whether to add a hashed query when fetching index (based on the content hash of all indexed `*.md` in `docsDir` and `blogDir` if applicable). Setting to `"filename"` will save hash in filename instead of query. |
  | docsDir                           | string \| string[]                                           | `"docs"`  | The dir(s) of docs to get the content hash, it's relative to the dir of your project. |
  | blogDir                           | string \| string[]                                           | `"blog"`  | Just like the `docsDir` but applied to blog.                 |
  | removeDefaultStopWordFilter       | boolean \| string[]                                          | `[]`      | Sometimes people (E.g., us) want to keep the English stop words as indexed, since they maybe are relevant in programming docs. Set a language list to remove their default stop word filter, `true` is equivalent to `["en"]`. |
  | removeDefaultStemmer              | boolean                                                      | `false`   | Enable this if you want to be able to search for any partial word at the cost of search performance. |
  | highlightSearchTermsOnTargetPage  | boolean                                                      | `false`   | Highlight search terms on target page.                       |
  | searchResultLimits                | number                                                       | `8`       | Limit the search results.                                    |
  | searchResultContextMaxLength      | number                                                       | `50`      | Set the max length of characters of each search result to show. |
  | explicitSearchResultPath          | boolean                                                      | `false`   | Whether an explicit path to a heading should be presented on a suggestion template. |
  | ignoreFiles                       | string \| RegExp \| (string \| RegExp)[]                     | `[]`      | Set the match rules to ignore some routes. Put a string if you want an exact match, or put a regex if you want a partial match. Note: without the website base url. |
  | ignoreCssSelectors                | string \| string[]                                           | `[]`      | A list of css selectors to ignore when indexing each page.   |
  | searchBarShortcut                 | boolean                                                      | `true`    | Whether to enable keyboard shortcut to focus in search bar.  |
  | searchBarShortcutHint             | boolean                                                      | `true`    | Whether to show keyboard shortcut hint in search bar. Disable it if you need to hide the hint while shortcut is still enabled. |
  | searchBarShortcutKeymap           | string                                                       | `"mod+k"` | Custom keyboard shortcut to focus the search bar. Supports formats like: `"s"` for single key, `"ctrl+k"` for key combinations, `"mod+k"` for Command+K (Mac) / Ctrl+K (others) - recommended cross-platform option, `"ctrl+shift+k"` for multiple modifiers. |
  | searchBarPosition                 | `"auto"` | `"left"` | `"right"`                              | `"auto"`  | The side of the navbar the search bar should appear on. By default, it will try to autodetect based on your docusaurus config according to [the docs](https://docusaurus.io/docs/api/themes/configuration#navbar-search). |
  | docsPluginIdForPreferredVersion   | string                                                       |           | When you're using multi-instance of docs, set the docs plugin id which you'd like to check the preferred version with, for the search index. |
  | zhUserDict                        | string                                                       |           | Provide your custom dict for language of zh, [see here](https://github.com/fxsjy/jieba#载入词典) |
  | zhUserDictPath                    | string                                                       |           | Provide the file path to your custom dict for language of zh, E.g.: `path.resolve("./src/zh-dict.txt")` |
  | searchContextByPaths              | `(string | { label: string | Record<string, string>; path: string; } )[]` | `[]`      | Provide an list of sub-paths as separate search context, E.g.: `["docs", "community", "legacy/resources"]`. It will create multiple search indexes by these paths. |
  | hideSearchBarWithNoSearchContext  | boolean                                                      | `false`   | Whether to hide the search bar when no search context was matched. By default, if `searchContextByPaths` is set, pages which are not matched with it will be considered as with a search context of ROOT. By setting `hideSearchBarWithNoSearchContext: true`, these pages will be considered as with NO search context, and the search bar will be hidden. |
  | useAllContextsWithNoSearchContext | boolean                                                      | `false`   | Whether to show results from all the contexts if no context is provided. This option should not be used with `hideSearchBarWithNoSearchContext: true` as this would show results when there is no search context. This will duplicate indexes and might have a performance cost depending on the index sizes. |
  | `forceIgnoreNoIndex`              | boolean                                                      | `false`   | Force enable search index even if `noIndex: true` is set, this also affects unlisted articles. |
  | `fuzzyMatchingDistance`           | number                                                       | `1`       | Set the edit distance for fuzzy matching during searches.    |

- 支持的Custom Styles：

  | Var                                      | Description                               | Default (light)                                              | Default (dark)                                     |
  | ---------------------------------------- | ----------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- |
  | --search-local-modal-background          | The search modal background               | `#f5f6f7`                                                    | `var(--ifm-background-color)`                      |
  | --search-local-modal-shadow              | The search modal box-shadow               | `inset 1px 1px 0 0 hsla(0, 0%, 100%, 0.5),` `0 3px 8px 0 #555a64` | `inset 1px 1px 0 0 #2c2e40,` `0 3px 8px 0 #000309` |
  | --search-local-modal-width               | The width of search modal by default      | `560px`                                                      | -                                                  |
  | --search-local-modal-width-sm            | The width of search modal on small screen | `340px`                                                      | -                                                  |
  | --search-local-spacing                   | The padding fo search modal               | `12px`                                                       | -                                                  |
  | --search-local-hit-background            | The background of each suggestion         | `#fff`                                                       | `var(--ifm-color-emphasis-100)`                    |
  | --search-local-hit-shadow                | The box-shadow of each suggestion         | `0 1px 3px 0 #d4d9e1`                                        | `none`                                             |
  | --search-local-hit-color                 | The text color of suggestions             | `#444950`                                                    | `var(--ifm-font-color-base)`                       |
  | --search-local-hit-height                | The height of each suggestion             | `56px`                                                       | -                                                  |
  | --search-local-highlight-color           | The highlight text color of suggestions   | `var(--ifm-color-primary)`                                   | -                                                  |
  | --search-local-muted-color               | The text color of some secondary content  | `#969faf`                                                    | `var(--ifm-color-secondary-darkest)`               |
  | --search-local-icon-stroke-width         | The icon stroke width of suggestions      | `1.4`                                                        | -                                                  |
  | --search-local-hit-active-color          | The text color of selected suggestion     | `var(--ifm-color-white)`                                     | -                                                  |
  | --search-local-input-active-border-color | The border color of input box when active | `var(--ifm-color-primary)`                                   | -                                                  |

### 下载PDF

#### 插件方案

目前的插件方案都是将所有文档汇总为一篇PDF，且是在项目文件夹中执行命令行生成PDF的形式，而非我们期望的自行在网页上下载单篇PDF。

1. 安装PDF插件，以docs-to-pdf为例。
   ```powershell
   $ npm install -g docs-to-pdf
   ```

2. 执行下载PDF的命令。

   > 说明：不同Docusaurus版本的网站使用的tag存在差异，下载时需要指定Docusaurus的版本。

   - 默认选择器下载。
   
     ```powershell
     $ npx docs-to-pdf docusaurus --initialDocURLs="https://your-docusaurus-v3-site.com/docs/" --version=3
     $ npx docs-to-pdf docusaurus --initialDocURLs="https://stream-computing.github.io/AI%E5%8A%A0%E9%80%9F%E5%8D%A1/%E5%B8%8C%E5%A7%86%E8%AE%A1%E7%AE%97%E6%9C%AF%E8%AF%AD%E8%A1%A8" --version=3
     ```
   
   - 自定义选择器下载。
   
     ```powershell
     $ npx docs-to-pdf --initialDocURLs="https://stream-computing.github.io/AI%E5%8A%A0%E9%80%9F%E5%8D%A1/%E5%B8%8C%E5%A7%86%E8%AE%A1%E7%AE%97%E6%9C%AF%E8%AF%AD%E8%A1%A8" --contentSelector="main" --paginationSelector="a.pagination-nav__link.pagination-nav__link--next" --excludeSelectors=".margin-vert--xl a,[class^='tocCollapsible'],.breadcrumbs,.theme-edit-this-page" --coverImage="https://your-docusaurus-v3-site.com/img/logo.png" --coverTitle="Your Docs"
     $ npx docs-to-pdf --initialDocURLs="https://stream-computing.github.io/AI%E5%8A%A0%E9%80%9F%E5%8D%A1/%E5%B8%8C%E5%A7%86%E8%AE%A1%E7%AE%97%E6%9C%AF%E8%AF%AD%E8%A1%A8" --contentSelector="main" --paginationSelector="a.pagination-nav__link.pagination-nav__link--next" --excludeSelectors=".margin-vert--xl a,[class^='tocCollapsible'],.breadcrumbs,.theme-edit-this-page" --outputPDFFilename="AI加速卡产品文档.pdf" --coverImage="https://stream-computing.github.io/img/stc_logo.png" --coverTitle="AI加速卡产品文档" --coverSub="STCP920/STCP950L/STCP950P" --tocTitle="目录"
     ```

docs-to-pdf项目相关的信息如下：

- 项目地址：https://github.com/jean-humann/docs-to-pdf

- 支持的CLI Global Options：

| Option                 | Required | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| `--initialDocURLs`     | Yes      | set URL to start generating PDF from.                        |
| `--contentSelector`    | No       | used to find the part of main content                        |
| `--paginationSelector` | No       | CSS Selector used to find next page to be printed for looping. |
| `--excludeURLs`        | No       | URLs to be excluded in PDF                                   |
| `--excludeSelectors`   | No       | exclude selectors from PDF. Separate each selector **with comma and no space**. But you can use space in each selector. ex: `--excludeSelectors=".nav,.next > a"` |
| `--cssStyle`           | No       | CSS style to adjust PDF output ex: `--cssStyle="body{padding-top: 0;}"` *If you're project owner you can use `@media print { }` to edit CSS for PDF. |
| `--outputPDFFilename`  | No       | name of the output PDF file. Default is `docs-to-pdf.pdf`    |
| `--pdfMargin`          | No       | set margin around PDF file. Separate each margin **with comma and no space**. ex: `--pdfMargin="10,20,30,40"`. This sets margin `top: 10px, right: 20px, bottom: 30px, left: 40px` |
| `--paperFormat`        | No       | pdf format ex: `--paperFormat="A3"`. Please check this link for available formats [Puppeteer document](https://pptr.dev/api/puppeteer.paperformat) |
| `--coverTitle`         | No       | Title for the PDF cover.                                     |
| `--coverImage`         | No       | `<src>` Image for PDF cover (does not support SVG)           |
| `--coverSub`           | No       | Subtitle the for PDF cover. Add `<br/>` tags for multiple lines. |
| `--tocTitle`           | No       | Title for the table of contents.                             |
| `--disableCover`       | No       | Optional toggle to show the PDF cover or not                 |
| `--disableTOC`         | No       | Optional toggle to show the table of contents or not         |
| `--headerTemplate`     | No       | HTML template for the print header. Please check this link for details of injecting values [Puppeteer document](https://pptr.dev/#?product=Puppeteer&show=api-pagepdfoptions) |
| `--footerTemplate`     | No       | HTML template for the print footer. Please check this link for details of injecting values [Puppeteer document](https://pptr.dev/#?product=Puppeteer&show=api-pagepdfoptions) |
| `--puppeteerArgs`      | No       | Add puppeteer BrowserLaunchArgumentOptions arguments ex: --sandbox [Puppeteer document](https://pptr.dev/api/puppeteer.browserlaunchargumentoptions) |
| `--protocolTimeout`    | No       | Timeout setting for individual protocol calls in milliseconds. If omitted, the default value of 180000 ms (3 min) is used |
| `--filterKeyword`      | No       | Only adds pages to the PDF containing a given meta keywords. Makes it possible to generate PDFs of selected pages |
| `--baseUrl`            | No       | Base URL for all relative URLs. Allows to render the pdf on localhost (ci/Github Actions) while referencing the deployed page. |
| `--excludePaths`       | No       | URL Paths to be excluded                                     |
| `--restrictPaths`      | No       | Keep Only URL Path with the same rootPath as `--initialDocURLs` |
| `--extractIframes`     | No       | Extract and inline content from iframes (only same-origin or accessible iframes). Default is `false` |
| `--httpAuthUser`       | No       | HTTP Basic Auth username for protected documentation sites   |
| `--httpAuthPassword`   | No       | HTTP Basic Auth password for protected documentation sites   |

- 支持的Docusaurus Options：

| Option      | Required | Description                                                  |
| ----------- | -------- | ------------------------------------------------------------ |
| `--version` | No       | Docusaurus version. Default is 2. Supported versions: 1, 2, and 3. |
| `--docsDir` | No       | Path to Docusaurus build dir. Either absolute or relative from path of the shell. The local server will automatically find an available port if 3000 is occupied. |

#### Workaround方案

有个Workaround方案是借助打印功能将HTML页面另存为PDF。

1. 安装Ant Design UI框架。

   > 说明：Ant Design融合了CSS-in-JS的能力，所以无需额外在CSS文件中配置样式信息。

   ```powershell
   $ npm install antd --save
   ```

2. 添加悬浮按钮，实现返回顶部、另存为PDF、打印文档、分享等功能。

   1. 添加Swizzle，添加后在`src/theme`文件夹下自动生成代码`/DocItem/Layout/index.tsx`和`/DocItem/Layout/styles.module.css`。

      > 说明：创建Swizzle时会询问使用哪种语言，和创建本Docusaurus项目时一致选择Typescript即可。本次示例的Swizzle需要使用`DocItem/Layout`并且使用`eject`模式。

      ```powershell
      $ npm run swizzle @docusaurus/theme-classic DocItem/Layout -- --eject
      ```

   2. 修改`/DocItem/Layout/index.tsx`，增加返回顶部的悬浮按钮。

      ```tsx
      //...
      
      // 需要导入下方一个组件
      import {FloatButton} from 'antd';
      //...
      
      //...
      
      export default function DocItemLayout({children}) {
          const docTOC = useDocTOC();
          const {
              metadata: {unlisted},
          } = useDoc();
          return (
              <div className="row">
                  <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
                      {unlisted && <Unlisted/>}
                      <DocVersionBanner/>
                      <div className={styles.docItemContainer}>
                          <article>
                              <DocBreadcrumbs/>
                              <DocVersionBadge/>
                              {docTOC.mobile}
                              <DocItemContent>{children}</DocItemContent>
                              <DocItemFooter/>
                          </article>
                          <DocItemPaginator/>
                      </div>
                  </div>
                  {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
                  // 需要增加下方三行代码
                  <FloatButton.Group shape="circle" style={{right: 24}} className="article-float-buttons">
                      <FloatButton.BackTop visibilityHeight={0}/>
                  </FloatButton.Group>
              </div>
          );
      }
      ```

   3. 修改`/DocItem/Layout/index.tsx`，增加另存为PDF的悬浮按钮。

      ```tsx
      import React from 'react';
      import clsx from 'clsx';
      import {useWindowSize} from '@docusaurus/theme-common';
      import {useDoc} from '@docusaurus/plugin-content-docs/client';
      import DocItemPaginator from '@theme/DocItem/Paginator';
      import DocVersionBanner from '@theme/DocVersionBanner';
      import DocVersionBadge from '@theme/DocVersionBadge';
      import DocItemFooter from '@theme/DocItem/Footer';
      import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
      import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
      import DocItemContent from '@theme/DocItem/Content';
      import DocBreadcrumbs from '@theme/DocBreadcrumbs';
      import ContentVisibility from '@theme/ContentVisibility';
      import styles from './styles.module.css';
      import GiscusComment from '@site/src/components/GiscusComment';
      // 需要导入下方两个组件
      import { FloatButton, Modal } from 'antd';
      import { FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
      /**
       * Decide if the toc should be rendered, on mobile or desktop viewports
       */
      function useDocTOC() {
        const {frontMatter, toc} = useDoc();
        const windowSize = useWindowSize();
        const hidden = frontMatter.hide_table_of_contents;
        const canRender = !hidden && toc.length > 0;
        const mobile = canRender ? <DocItemTOCMobile /> : undefined;
        const desktop =
          canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
            <DocItemTOCDesktop />
          ) : undefined;
        return {
          hidden,
          mobile,
          desktop,
        };
      }
      export default function DocItemLayout({children}) {
        const docTOC = useDocTOC();
        const {metadata} = useDoc();
      
        // 需要增加下方两个const
        const downloadPDF = (): void => {
          // 检查浏览器是否支持打印
          if (typeof window.print !== 'function') {
            Modal.error({
              title: '浏览器不支持',
              content: '您的浏览器不支持直接打印功能，请使用Chrome、Firefox等现代浏览器。'
            });
            return;
          }
          else {
            window.print();
          }
      
          // 这段代码运行异常，没有出现弹窗
          // Modal.info({
          //   title: '下载PDF',
          //   width: 500,
          //   content: (
          //     <div>
          //       <p>如何下载PDF：</p>
          //       <ol>
          //         <li>点击<strong>确定</strong>打开打印对话框。</li>
          //         <li>在<strong>目标打印机</strong>中选择：
          //           <ul>
          //             <li>Chrome/Edge: <strong>另存为PDF</strong>。</li>
          //             <li>Firefox: <strong>Microsoft Print to PDF</strong>。</li>
          //             <li>Safari: <strong>存储为PDF</strong>。</li>
          //           </ul>
          //         </li>
          //         <li>选择保存位置并点击<strong>保存</strong>。</li>
          //       </ol>
          //     </div>
          //   ),
          //   onOk(): void {
          //     window.print();
          //     //setTimeout(()=>window.print(), 1000);
          //   },
          //   okText: '打开打印对话框',
          //   cancelText: '取消'
          // });
        };
        // const printArticle = () => {
        //   window.print();
        // };
      
        return (
          <div className="row">
            <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
              <ContentVisibility metadata={metadata} />
              <DocVersionBanner />
              <div className={styles.docItemContainer}>
                <article>
                  <DocBreadcrumbs />
                  <DocVersionBadge />
                  {docTOC.mobile}
                  <DocItemContent>{children}</DocItemContent>
                  <DocItemFooter />
                </article>
                <DocItemPaginator />
              </div>
              <GiscusComment class="giscus-comment"/>
            </div>
            {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
            <FloatButton.Group shape="circle" style={{right: 24}} className="article-float-buttons">
               // 需要增加下方两行定义
              <FloatButton icon={<FilePdfOutlined/>} title="下载PDF" onClick={downloadPDF}/>
              <FloatButton icon={<PrinterOutlined/>} title="打印文档" onClick={printArticle}/>
              <FloatButton.BackTop visibilityHeight={0}/>
            </FloatButton.Group>
          </div>
        );
      }
      ```

该Workaround方案相关的信息：

- 方案地址：https://jdocs.wiki/docusaurus-site/site-creation-guide/add-download-pdf-button
- 需要基于Docusaurus的Swizzle功能，有一定风险。Swizzle最终还是意味着你必须维护一些额外的React代码，这些代码会与Docusaurus的内部API交互，尽量使用CSS、包装组件，而非弹出组件。
- 需要了解Ant Design UI框架（Docusaurus默认的是Infima UI框架）。
- 导出PDF功能依赖悬浮按钮组件。

### 显示文档关系图

1. 安装显示文档关系图的插件，以docusaurus-graph为例。

   ```powershell
   $ yarn add docusaurus-graph
   ```

2. 启用搜索功能，按README在`docusaurus.config.js`中添加字段。

   ```js
   module.exports = {
     // Other Docusaurus configurations...
     plugins: ['docusaurus-graph'],
   };
   ```

docusaurus-graph项目相关的信息如下：

> 说明：需要改造原文，用front matter手动添加相关文档链接，而非根据引用自动生成关系图。

- 项目地址：https://github.com/Arsero/docusaurus-graph

- 支持的目录路径配置：
  ```js
  module.exports = {
    // Other Docusaurus configurations...
    plugins: [
      [
        'docusaurus-graph',
        {
           docsDir: "docs",
           buildDir: "build",
           sourcesTag: "sources",
           referencesTag: "references",
        },
      ],
    ],
  };
  ```

  - `docsDir [default: docs]`: Specifies the path of the folder containing your documentation files.
  - `buildDir [default: build]`: Specifies the path of the output build folder.
  - `sourcesTag [default: sources]`: Specifies the sources tag name for .md files.
  - `referencesTag [default: references]`: Specifies the references tag name for .md files.

## 进阶操作（Phase 2）



## 进阶操作（Phase 3）



## 问题排查

