# DMBlog — Firefly / Material Design 3 设计系统

## Visual Theme & Atmosphere
Material Design 3 (Firefly) 风格，轻量、舒适、专注内容。
亮色模式：晴空蓝·雪雾白（清爽蓝天底色）
暗色模式：机甲灰·电光蓝（深沉工业感）

## Color Palette & Roles

### Light Theme
| 变量 | 色值 | 用途 |
|---|---|---|
| --color-bg | #E6F7FF | 页面背景 |
| --color-bg-card | #F0FAFF | 卡片背景 |
| --color-bg-nav | rgba(230,247,255,0.8) | 导航栏（毛玻璃） |
| --color-text | #1A202C | 主要文字 |
| --color-text-secondary | #5A6A7A | 次要文字 |
| --color-border | #B8DEFF | 边框/分割线（亮蓝） |
| --color-primary | #89C2FF | 主题色/链接（天蓝） |
| --color-primary-hover | #6BB0FF | 主题色悬停 |
| --color-primary-light | rgba(137,194,255,0.12) | 主题色浅色背景 |

### Dark Theme
| 变量 | 色值 | 用途 |
|---|---|---|
| --color-bg | #1A1A22 | 页面背景（深灰） |
| --color-bg-card | #2C2C34 | 卡片背景 |
| --color-bg-nav | rgba(26,26,34,0.85) | 导航栏（毛玻璃） |
| --color-text | #E2E8F0 | 主要文字 |
| --color-text-secondary | #8888A0 | 次要文字 |
| --color-border | #3A3A48 | 边框/分割线 |
| --color-primary | #00D4FF | 主题色/链接（电光蓝） |
| --color-primary-hover | #00B8E0 | 主题色悬停 |
| --color-primary-light | rgba(0,212,255,0.12) | 主题色浅色背景 |

### Shadow Tokens
| 变量 | 亮色值 | 暗色值 | 用途 |
|---|---|---|---|
| --shadow-card | 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02) | 0 1px 3px rgba(0,0,0,0.2) | 卡片默认阴影 |
| --shadow-card-hover | 0 4px 12px rgba(0,0,0,0.08) | 0 4px 12px rgba(0,0,0,0.3) | 卡片悬停阴影 |

## Typography Rules

| 层级 | font-family | 大小 | 字重 | 场景 |
|---|---|---|---|---|
| h1 | var(--font-default) | 1.5rem | Bold | 文章标题 |
| h2 | var(--font-default) | 1.25rem | SemiBold | 章节标题 |
| body | var(--font-default) | 0.875rem | Normal | 正文 |
| small | var(--font-default) | 0.75rem | Normal | 辅助文字 |
| code | var(--font-code) | 0.8em | Normal | 行内代码/代码块 |
| pixel | var(--font-pixel) | 1rem | Normal | 像素字体文章 |

字体文件：/user/assets/fonts/
- UserDefault: DreamHanSansCN-W12.ttf（可变字重 100-900）
- UserCode: DreamHanSansCN-W12.ttf
- UserPixel: fusion-pixel-12px-monospaced-zh_hans.otf

## Component Stylings

### 卡片 (.card)
- 背景: var(--color-bg-card)
- 边框: 1px solid var(--color-border)
- 圆角: 0.75rem
- 阴影: var(--shadow-card)
- 内边距: 1.5rem
- Hover: translateY(-2px) + var(--shadow-card-hover)

### 导航栏 (Header)
- 毛玻璃效果: var(--color-bg-nav) + backdrop-filter: blur
- 水平布局：logo + 导航链接 + 搜索按钮 + 主题切换
- 响应式：移动端收起

### 按钮 (Theme Toggle)
- 长按亮色按钮可切换主题色（Firefly 风格）
- 默认切换亮暗模式
- 圆角: 0.5rem

### 卡片链接点击
- 使用 data-href 属性 + JavaScript 事件委托
- 整个卡片可点击，不包裹 `<a>` 标签

### 搜索遮罩 (SearchOverlay)
- 全屏遮罩，半透明黑色背景
- Ctrl+K 快捷键打开，Esc 关闭
- 300ms 防抖
- 生产环境使用 Pagefind 全文搜索
- 开发模式回退到客户端标题/描述匹配

## Layout Principles
- 三栏 CSS Grid（移动端 → 平板 → 桌面渐进增强）
- 左栏固定 240px: Profile + Announcement + Categories + TagCloud + Moments
- 右栏 260px（桌面端显示）: SiteStats + Calendar 或 TOC（通过 slot name="right-sidebar" 切换）
- 间距: 2rem gap
- CSS Grid: `grid-template-columns: 240px 1fr 260px`（桌面端）
- `<slot>` 在 Astro 中只能出现一次

## Depth & Elevation
- 卡片阴影: var(--shadow-card)
- 卡片 hover: translateY(-2px) + var(--shadow-card-hover)
- 导航栏: backdrop-filter: blur(8px)
- 搜索遮罩: 全屏半透明黑色背景

## Do's and Don'ts
- DO: 使用 CSS 变量内联样式引用颜色
- DO: 使用 `.card` 类作为统一样式容器
- DON'T: 使用 Tailwind `dark:` 前缀（内联 CSS 变量覆盖它）
- DON'T: 在 Astro 组件中使用多个同名 `<slot>`
- DO: 使用 `data-href` 事件委托模式处理卡片点击
- DO: 所有 `config/` 文件使用简体中文注释

## Responsive Behavior
- **<768px**: 单栏 `display: block` 布局，Profile compact 模式
- **≥768px**: 两栏 Grid `240px 1fr`，右栏隐藏
- **≥1280px**: 三栏 Grid `240px 1fr 260px`，右栏显示

## Data Architecture
- `user/posts/`：Markdown 文章，通过 `import.meta.glob` 读取
- `user/pages/`：静态页面（如 about.md）
- `config/`：TypeScript 配置文件，中文注释
- `src/utils/userData.ts`：数据统一读取层
- 自定义 Vite 插件处理 `user/assets/` 静态资源
