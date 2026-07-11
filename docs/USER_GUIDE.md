# 用户指南

本指南面向博客作者和管理者，帮助你配置和自定义博客的各项功能。

## 最近一次界面更新

如果你想快速理解这次改了什么，可以先看这里：

- 搜索框现在直接显示在顶部导航栏里，图标是输入框内部的一部分，打开站点后就能直接搜索。
- 点击文章会进入详情页，右侧栏会显示文章大纲；在首页、归档页和工具页，右侧栏则继续显示日历和站点统计。
- 文章详情页和关于页现在有更明确的卡片边框和更宽的内容区，深色模式下正文也更容易阅读。
- 站点统计里的字数会统计 `user/posts/` 下所有文章的正文，所以新增文章后这个数字会自动变化。

**为什么这么改**：让页面更接近 Firefly 的统一感，同时保留一点更明显的个性化布局，不让每个页面都长得一模一样。

**会有什么效果**：你不需要额外操作，刷新页面后这些变化就会直接出现；之后新增文章、分类和标签时，页面结构会继续按同一套规则工作。

## 目录

- [添加新文章](#添加新文章)
- [修改个人信息](#修改个人信息)
- [自定义主题色](#自定义主题色)
- [管理导航栏](#管理导航栏)
- [配置公告](#配置公告)
- [修改站点信息](#修改站点信息)
- [管理 Moments 动态](#管理-moments-动态)
- [自定义字体](#自定义字体)

---

## 添加新文章

在 `user/posts/` 目录下创建 `.md` 或 `.mdx` 文件即可发布新文章。支持嵌套目录来组织文章。

### Frontmatter 字段

```yaml
---
title: "文章标题"           # 必填
description: "文章摘要"     # 可选，显示在文章列表中
pubDate: "2026-07-10"      # 必填，发布日期
category: "技术"            # 可选，文章分类（单选）
tags: ["Astro", "CSS"]     # 可选，标签列表（多选）
heroImage: "/user/assets/hero.jpg"  # 可选，封面图
font: "pixel"              # 可选，使用像素字体渲染
---
```

### 示例

```
user/posts/
├── hello-world.md          # 根目录文章
├── tech/
│   ├── astro-guide.md      # 技术分类下的文章
│   └── css-tips.md
└── life/
    └── travel-notes.md     # 生活分类下的文章
```

---

## 修改个人信息

编辑 `config/profileConfig.ts`：

```typescript
export const name = '你的昵称';
export const bio = '一句话介绍自己';
export const avatar = '/user/assets/avatar.png';  // 头像路径

export const social = {
  github: 'https://github.com/你的用户名',
  twitter: '',        // 留空则不显示
  email: 'your@email.com',
  // 可添加更多社交平台
};
```

修改后保存，开发服务器会自动热更新。

---

## 自定义主题色

编辑 `config/themeConfig.ts` 可以切换两套预设主题：

### 切换预设主题

```typescript
// 将 activeTheme 改为 'mech' 即可切换到机甲灰主题
export const activeTheme: ThemeName = 'sky';  // 'sky' 晴空蓝 | 'mech' 机甲灰
```

### 自定义色值

每套主题的色值都定义在 `skyTheme` 和 `mechTheme` 对象中，包含亮色和暗色两套变量：

```typescript
export const skyTheme: ThemeColors = {
  light: {
    bg: '#E6F7FF',         // 页面背景色（雪雾白）
    bgCard: '#F0FAFF',     // 卡片背景色
    primary: '#89C2FF',    // 主色调（晴空蓝）
    // ...更多色值
  },
  dark: {
    bg: '#0D1B2A',         // 暗色模式背景
    primary: '#89C2FF',    // 暗色模式主色调
    // ...
  },
};
```

修改色值后，所有使用 CSS 变量的组件会自动更新。

---

## 管理导航栏

编辑 `config/navConfig.ts`：

```typescript
export const navLinks = [
  { label: '首页', href: '/' },
  { label: '归档', href: '/archive' },
  { label: '关于', href: '/about' },
  { label: '工具', href: '/tools' },
  // 添加更多链接...
];
```

---

## 配置公告

编辑 `config/announcementConfig.ts`：

```typescript
export const enabled = true;           // 是否显示公告
export const title = '公告标题';
export const content = '公告内容...';

export const learnMore = {
  enabled: true,                       // 是否显示"了解更多"按钮
  label: '了解更多',
  href: '/about',                      // 按钮链接
};
```

设置 `enabled = false` 即可隐藏公告卡片。

---

## 修改站点信息

编辑 `config/siteConfig.ts`：

```typescript
export const SITE_TITLE = '你的博客名称';
export const SITE_DESCRIPTION = '一句话描述你的博客';
export const SITE_LANG = 'zh-CN';
export const SITE_URL = 'https://your-domain.com';
export const START_DATE = '2026-01-01';  // 用于计算运行时长
```

---

## 管理 Moments 动态

编辑 `user/moments.json`：

```json
[
  {
    "id": "1",
    "content": "今天学了一个新技术，感觉很有收获！",
    "date": "2026-07-10"
  },
  {
    "id": "2",
    "content": "周末去爬山，风景真美。",
    "date": "2026-07-08"
  }
]
```

每条动态包含 `id`（唯一标识）、`content`（文本内容）和 `date`（日期）。Moments 组件默认显示最近 3 条。

---

## 自定义字体

将字体文件放入 `user/Fonts/` 目录：

- `Default.woff2` — 默认正文字体
- `Code.woff2` — 代码块字体
- `Pixel.woff2` — 像素风格字体（用于 `font: "pixel"` 的文章）

替换文件后，构建时会自动复制到输出目录。

---

## 修改网站图标（Favicon）

网站图标（导航栏最左侧的图标）文件存放在 `public/` 目录：

| 文件 | 用途 |
|---|---|
| `public/favicon.ico` | 传统浏览器使用的 .ico 图标 |
| `public/favicon.svg` | 现代浏览器使用的 SVG 图标 |

**替换方法**：将你的图标文件覆盖 `public/favicon.ico` 和 `public/favicon.svg` 即可。推荐使用 SVG 格式以获得最佳显示效果。

图标在 `src/components/Header.astro` 中被引用，无需修改代码。

---

## 构建与部署

```sh
# 构建
npm run build

# 构建搜索索引（可选）
npm run build:search
```

构建产物在 `dist/` 目录，可部署到任何静态托管服务（Vercel、Netlify、Cloudflare Pages 等）。

如果启用了 Pagefind 搜索，需要在构建后运行 `npm run build:search` 生成搜索索引。
