# DMBlog — 基于 Astro 的个人博客

一个基于 Astro 7 + Tailwind CSS v4 构建的现代化个人博客，采用 Firefly 风格设计语言，支持双主题色切换、三栏响应式布局、分类标签筛选、全文搜索等功能。

## 功能特性

- **双主题色系统** — 晴空蓝（默认）+ 机甲灰（备选），亮色/暗色模式自由切换
- **三栏响应式布局** — 宽屏三栏、平板两栏、手机单栏，呼吸感十足
- **分类标签系统** — 文章支持分类和标签，筛选导航栏一键切换
- **归档筛选中枢** — `/archive` 页面支持按分类、标签、日期多维筛选
- **全文搜索** — Ctrl+K 唤起搜索遮罩，实时匹配文章标题和描述
- **日历组件** — 标记有文章发布的日期，点击跳转对应文章
- **站点统计** — 文章数、分类数、标签数、总字数、运行时长一目了然
- **公告系统** — 可配置的公告卡片，支持"了解更多"CTA 按钮
- **Moments 动态** — 短文/想法展示，独立于文章体系
- **暗色模式** — 完整的暗色模式支持，防闪烁脚本确保体验流畅
- **RSS & Sitemap** — 开箱即用的 SEO 和订阅支持

## 技术栈

- **Astro 7** — 静态站点生成器
- **Tailwind CSS v4** — 通过 `@tailwindcss/vite` Vite 插件集成
- **MDX** — 文章内容支持 Markdown + JSX
- **TypeScript** — 类型安全
- **Pagefind**（可选） — 构建后全文搜索索引

## 快速开始

```sh
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 构建搜索索引（可选，需在 build 之后执行）
npm run build:search

# 本地预览构建结果
npm run preview
```

## 目录结构

```text
DMBlog/
├── config/                 # 行为配置
│   ├── index.ts            # 配置聚合导出
│   ├── siteConfig.ts       # 站点名称、描述、语言、起始日期
│   ├── themeConfig.ts      # 主题色（晴空蓝/机甲灰）色值定义
│   ├── profileConfig.ts    # 昵称、Bio、社交链接、头像路径
│   ├── navConfig.ts        # 导航栏链接列表
│   └── announcementConfig.ts # 公告配置
├── user/                   # 内容数据
│   ├── assets/             # 图片、头像等资源
│   ├── Fonts/              # 自定义字体文件
│   ├── posts/              # 文章（支持嵌套目录）
│   ├── pages/              # 静态页面（about.md 等）
│   └── moments.json        # 动态/短文数据
├── functions/              # 工具页面
├── src/
│   ├── components/         # Astro 组件
│   ├── layouts/            # 布局文件
│   ├── pages/              # 页面路由
│   ├── styles/             # 全局样式（CSS 变量主题系统）
│   └── utils/              # 数据读取层
├── docs/                   # 项目文档
├── astro.config.mjs        # Astro 配置
└── package.json
```

## 个性化配置

所有个性化配置集中在 `config/` 目录，每个文件都有详细的中文注释：

- 修改站点名称和描述 → `config/siteConfig.ts`
- 修改主题色 → `config/themeConfig.ts`
- 修改个人信息 → `config/profileConfig.ts`
- 修改导航栏 → `config/navConfig.ts`
- 修改公告 → `config/announcementConfig.ts`

详细内容请参阅 [用户指南](docs/USER_GUIDE.md)。

## 文档

- [用户指南](docs/USER_GUIDE.md) — 面向博客作者的配置和操作指南
- [开发教程](docs/TUTORIAL.md) — 架构设计、核心代码解析
- [开发日志](docs/DEVELOPMENT_LOG.md) — 每次重要变更的详细记录

## 许可证

MIT
