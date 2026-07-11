# 开发教程

本文档面向开发者，解析项目的架构设计、核心代码原理和个性化修改方法。

## 架构概览

### 三目录职责分离

```
config/     → 行为配置（主题色、导航栏、公告、社交链接等）
user/       → 内容数据（文章、图片、字体、Moments 动态等）
functions/  → 工具页面（独立的小工具应用）
```

**设计原则**：
- `config/` 决定博客"怎么表现"，`user/` 决定博客"展示什么"
- 三个目录互不耦合，便于维护和迁移
- 框架无关：如果将来迁移到 Hugo/11ty，`user/` 目录可直接复用

### 数据读取层

`src/utils/userData.ts` 是统一的数据读取入口：

- 文章数据通过 `import.meta.glob` 从 `user/posts/` 动态导入（无需 Content Collections 的 Zod schema）
- 配置数据从 `config/` 目录导入
- Moments 数据从 `user/moments.json` 静态导入
- 对外暴露 `getPosts()`、`getCategories()`、`getStats()` 等函数

### 最近一次体验收口说明

这一轮把几个容易让人困惑的点收紧了：

- 站点统计里的字数改为直接统计 `user/posts/` 下所有文章的正文，所以新文章发布后字数会跟着增长，不会再停在 0。
- 文章详情页和关于页的正文不再依赖 `prose-invert`，而是统一走 CSS 变量，因此深色模式下更容易阅读。
- 左右侧栏取消了内部滚动条，页面会更像一个整体内容区，而不是两块独立滚动的贴片。
- 顶部搜索框现在常驻在导航栏里，点击文章后会进入详情页，右侧切换成文章大纲；进入归档、分类和标签页时，右侧仍然是日历和站点统计。

**你会看到的结果**：页面更宽，层级更清楚，阅读时眼睛更省力，功能切换也更可预期。

### 构建流程

```
user/posts/*.md → import.meta.glob → userData.ts → 组件/页面
config/*.ts     → 直接 import      → userData.ts / 组件
user/assets/*   → Vite 插件        → dist/user/assets/
user/assets/fonts/* → Vite 插件    → dist/user/assets/fonts/
```

---

## 主题色系统

### CSS 变量体系

主题色通过 CSS 自定义属性实现，定义在 `src/styles/global.css`：

```css
:root {
  --color-bg: #E6F7FF;          /* 页面背景 */
  --color-bg-card: #F0FAFF;     /* 卡片背景 */
  --color-bg-nav: rgba(230,247,255,0.8);  /* 导航栏（毛玻璃） */
  --color-text: #1a2332;        /* 主文字色 */
  --color-text-secondary: #5a6a7a;  /* 次要文字色 */
  --color-border: #B8DEFF;      /* 边框色 */
  --color-primary: #89C2FF;     /* 主色调 */
  --color-primary-hover: #6BB0FF;
  --color-primary-light: rgba(137,194,255,0.12);  /* 浅主色背景 */
}
```

### 四层覆盖机制

```
:root                          → 晴空蓝 · 亮色（默认）
html.dark                      → 晴空蓝 · 暗色
html[data-theme="mech"]        → 机甲灰 · 亮色
html[data-theme="mech"].dark   → 机甲灰 · 暗色
```

后续层覆盖前面的同名变量，实现主题切换。

### 防闪烁脚本

`BaseHead.astro` 中有一段 `<script is:inline>` 内联脚本，在 HTML 解析前执行：

```javascript
const theme = localStorage.getItem('theme');
const themeName = localStorage.getItem('themeName');
if (theme === 'dark') document.documentElement.classList.add('dark');
if (themeName === 'mech') document.documentElement.setAttribute('data-theme', 'mech');
```

这确保了页面加载时不会出现亮色→暗色的闪烁。

### 组件中使用 CSS 变量

所有组件的颜色都通过内联样式引用 CSS 变量：

```html
<h1 style="color: var(--color-text);">标题</h1>
<a style="color: var(--color-primary);">链接</a>
<div style="background-color: var(--color-primary-light);">卡片</div>
```

这样做的好处是：Tailwind 的 `dark:` 变体无法覆盖内联样式，而 CSS 变量天然支持亮/暗色切换。

---

## 布局系统

### 三栏响应式

`BaseLayout.astro` 使用 CSS Grid 实现三栏布局：

```html
<!-- 宽屏（>=1280px）：三栏 -->
<div class="xl:grid xl:grid-cols-[240px_1fr_260px] xl:gap-8">
  <aside>左栏（固定组件）</aside>
  <main><slot name="main" /></main>
  <aside><slot name="right-sidebar" /></aside>
</div>
```

- 左栏：Profile + 公告 + 分类 + 标签云 + Moments（固定组合）
- 中栏：通过 `slot="main"` 插入页面内容
- 右栏：通过 `slot="right-sidebar"` 插入统计/日历/目录

### 卡片样式

`.card` 类定义在 `global.css`，所有卡片统一风格：

```css
.card {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
  transition: box-shadow 0.2s;
}
.card:hover {
  box-shadow: var(--shadow-card-hover);
}
```

---

## 筛选系统

### URL 参数驱动

所有筛选通过 URL 查询参数实现：

- `/archive?category=技术` — 按分类筛选
- `/archive?tag=Astro` — 按标签筛选
- `/archive?date=2026-07-10` — 按日期筛选

### 数据流

```
URL 参数 → PostList.astro / archive.astro
         → userData.getPostsByCategory() / getPostsByTag() / getPostsByDate()
         → 过滤后的文章列表
```

所有分类/标签链接统一指向 `/archive?xxx`，确保筛选体验一致。

---

## Vite 自定义插件

`astro.config.mjs` 中的 `userAssetsPlugin()` 处理 `user/` 目录的静态资源：

- **开发模式**：通过 Vite 中间件，访问 `/user/assets/xxx.png` 时直接从 `user/assets/` 读取
- **构建模式**：通过 `writeBundle` 钩子，将 `user/assets/` 和 `user/Fonts/` 物理复制到 `dist/`

这样 `user/` 目录的资源不需要经过 Astro 的 Content Collections 或 Vite 的 asset pipeline，保持了简洁性。

---

## 个性化修改指引

| 需求 | 修改文件 | 说明 |
|------|----------|------|
| 换主题色 | `config/themeConfig.ts` | 修改 `activeTheme` 或自定义色值 |
| 加导航链接 | `config/navConfig.ts` | 在 `navLinks` 数组中添加对象 |
| 改个人信息 | `config/profileConfig.ts` | 修改 name/bio/avatar/social |
| 改公告内容 | `config/announcementConfig.ts` | 修改 title/content 或设置 enabled=false |
| 改站点名称 | `config/siteConfig.ts` | 修改 SITE_TITLE 等 |
| 加新组件到侧栏 | `src/layouts/BaseLayout.astro` | 在左栏 `<aside>` 中添加组件 |
| 修改全局样式 | `src/styles/global.css` | 修改 CSS 变量或 .card 等基础类 |
| 添加搜索索引 | 运行 `npm run build:search` | 构建后生成 Pagefind 索引 |
