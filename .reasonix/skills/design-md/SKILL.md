---
name: design-md
description: 创建/更新 DMBlog 的 DESIGN.md（Firefly/MD3 设计系统文档）
---

# design-md — 创建/更新 DMBlog 的 DESIGN.md 设计系统文档

在项目根目录创建 `DESIGN.md` 文件，记录 DMBlog 的 Firefly (Material Design 3) 设计系统。Agent 读取此文件后能生成视觉一致的 UI。

## 数据来源

读取以下文件来提取当前设计 token：
- `src/styles/global.css` — CSS 变量定义（颜色、字体）
- `config/theme.json` — 主题色值
- `src/layouts/BaseLayout.astro` — 布局结构

## DESIGN.md 模板

```markdown
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
- 阴影: 0 1px 3px rgba(0,0,0,0.06)
- Hover: translateY(-2px) + 增强阴影

### 导航栏 (Header)
- 毛玻璃效果: rgba 背景 + backdrop-filter: blur
- 水平布局：logo + 导航链接 + 搜索按钮 + 主题切换
- 响应式：移动端收起

### 按钮
- 主题色按钮：background=var(--color-primary), color=white
- 文字按钮：color=var(--color-primary)
- 圆角: 0.5rem

### 卡片链接点击
- 使用 data-href 属性 + JavaScript 事件委托
- 整个卡片可点击，不包裹 <a> 标签

## Layout Principles
- 三栏 CSS Grid（移动端→平板→桌面渐进增强）
- 左栏固定 240px: Profile + Announcement + Categories + TagCloud + Moments
- 右栏 260px（桌面端显示）: SiteStats + Calendar 或 TOC
- 间距: 2rem gap
- 主内容区最大宽度灵活

## Depth & Elevation
- 卡片阴影: 0 1px 3px rgba(0,0,0,0.06)
- 卡片 hover: translateY(-2px) + 0 4px 12px rgba(0,0,0,0.1)
- 导航栏: backdrop-filter: blur(8px)
- 搜索遮罩: 全屏半透明黑色背景

## Do's and Don'ts
- DO: 使用 CSS 变量内联样式引用颜色
- DO: 使用 .card 类作为统一样式容器
- DON'T: 使用 Tailwind dark: 前缀（内联 CSS 变量覆盖它）
- DON'T: 在 Astro 组件中使用多个同名 <slot>
- DO: 使用 data-href 事件委托模式处理卡片点击

## Responsive Behavior
- <768px: 单栏 block 布局，Profile compact 模式
- ≥768px: 两栏 Grid，左栏 240px，右栏隐藏
- ≥1280px: 三栏 Grid，右栏显示
```

## 生成步骤

1. 读取 `src/styles/global.css` 提取最新颜色值
2. 读取 `config/theme.json` 确认色值
3. 写入 `DESIGN.md` 到项目根目录
4. 提示用户 DESIGN.md 已创建/更新
