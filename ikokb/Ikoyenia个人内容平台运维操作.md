# Ikoyenia个人内容平台运维操作（Windows）

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
   ```

## 初始化Docusaurus项目

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

## 本地调试预览

在本地完成调试和预览工作，包括但不限于添加待发布的文档以及所需的图片、图标等静态资源文件，按需编辑`docusaurus.config.ts`、`\src\components\HomepageFeatures\index.tsx`、`\src\pages\index.tsx`、`sidebars.ts`等配置文件。

1. 进入项目文件夹，安装编译所需的依赖，以使用yarn为例。其中`yarn`命令等同于`yarn install`命令。

   ```powershell
   $ cd stc-docuhub
   $ yarn
   ```

2. 运行开发服务器。

   ```powershell
   $ yarn run start
   ```

3. 本地调试预览时，访问`http://localhost:3000/`或者`http://127.0.0.1:3000/`，而非机器的内网IP。

## 构建和部署静态站点

在GitHub中操作：

1. 创建部署到GitHub Pages所需的GitHub repo，具体操作请参见[创建Github Pages站点](https://docs.github.com/zh/pages/getting-started-with-github-pages/creating-a-github-pages-site)。

   > 说明：GitHub repo所有者为组织。

2. 在GitHub repo的**Settings**页面，修改**Code and automation** > **Pages**中的Build and deployment配置，将Source配置为Deploy from a branch，将Branch配置为待发布文档所在的分支，例如`main`，并指定静态站点文件的根目录`/(root)`，而非`docs`。

3. 生成GitHub私有凭证，具体操作请参见[Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)。

   > 说明：为个人账户生成凭证，并且为个人账户添加GitHub repo的Admin权限即可。

在本地操作：

1. 进入项目文件夹，生成静态站点的文件，以使用yarn为例。

   ```powershell
   $ cd stc-docuhub
   $ yarn build
   ```

2. 将静态站点文件部署到GitHub Pages，或者按需选择其他渠道。

   ```powershell
   $ cmd /C 'set "GIT_USER=streamcomputinger" && set "DEPLOYMENT_BRANCH=main" && yarn deploy'
   ```

## 其他操作

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

### 启用搜索功能

1. 添加搜索插件安装包，以orama为例：

   ```powershell
   $ yarn add @orama/plugin-docusaurus-v3
   $ yarn remove @orama/plugin-docusaurus-v3
   ```

2. 启用搜索功能，在`docusaurus.config.js`中添加字段。

   ```powershell
   plugins: ["@orama/plugin-docusaurus-v3"],
   ```

## 问题排查

