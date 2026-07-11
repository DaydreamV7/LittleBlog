---
name: firefly-component
description: 按 Firefly/MD3 模式新建 Astro 组件（CSS 变量 + .card 类）
---

# firefly-component — 创建 Firefly (MD3) 风格 Astro 组件

根据用户需求，在 `src/components/` 目录下创建一个符合项目 Firefly/MD3 风格的 Astro 组件。

## 项目约定

### 数据源
- 读取 `config/profileConfig.ts`、`config/navConfig.ts`、`config/announcementConfig.ts` 等获得数据
- 读取 `src/utils/userData.ts` 获得文章数据（`getPosts()`、`getCategories()` 等）
- **不要使用 Content Collections**，项目使用 `import.meta.glob`

### 组件结构

```astro
---
// 顶部文档注释：组件功能描述
// 数据源: config/xxxConfig.ts 或 src/utils/userData.ts
import { ... } from '...';

interface Props {
  // TypeScript 接口定义 props
}

const { ... } = Astro.props;
---

<!-- 模板内容 -->
<div class="card" style="color: var(--color-text);">
  <!-- 默认使用 .card 类（MD3 卡片的统一样式） -->
</div>
```

### 颜色引用
- **禁止**使用 Tailwind `dark:` 变体
- 全部通过内联 `style` 引用 CSS 变量：
  - `var(--color-bg)` — 背景色
  - `var(--color-bg-card)` — 卡片背景
  - `var(--color-bg-nav)` — 导航栏背景（毛玻璃）
  - `var(--color-text)` — 主要文字色
  - `var(--color-text-secondary)` — 次要文字色
  - `var(--color-border)` — 边框色
  - `var(--color-primary)` — 主题色
  - `var(--color-primary-hover)` — 主题色悬停
  - `var(--color-primary-light)` — 主题色浅色

### 字体变量
- `var(--font-default)` — 默认正文字体
- `var(--font-code)` — 等宽代码字体
- `var(--font-pixel)` — 像素字体

### 全局样式类
- `.card` — MD3 卡片（背景+边框+圆角0.75rem+阴影+hover上浮2px）
- `.btn` — 按钮样式

### 响应式断点
- 移动端 <768px：单栏
- 平板 ≥768px：两栏（左栏240px + 主内容1fr）
- 桌面 ≥1280px：三栏（左栏240px + 主内容1fr + 右栏260px）

BaseLayout 已经用 CSS Grid 处理了布局，新组件只需关注自身内容。

### Slot 注意事项
- Astro `<slot>` 只能出现一次，多个同名 slot 会导致内容重复

### 事件处理
- 卡片点击使用 `data-href` 属性 + 事件委托模式
- 搜索使用 `[data-search-open]` 属性绑定

## 生成步骤

1. 询问用户：组件名称（PascalCase）、props 接口、数据源
2. 在 `src/components/` 下创建 `${name}.astro`
3. 写入标准 Astro 组件模板，遵循上述约定
