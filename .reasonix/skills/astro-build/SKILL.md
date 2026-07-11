---
name: astro-build
description: 构建并验证 DMBlog（astro build + pagefind + 页面计数检查）
---

# astro-build — 构建并验证 DMBlog 项目

执行完整的构建流程并验证输出，确保项目无错误。

## 构建流程

### 1. 构建 Astro 静态站点

```powershell
npx astro build
```

期望结果：`astro build` 完成，输出 `dist/` 目录，列出生成的页面数量。
标准输出应显示类似 "Pages built: X" 或列出每个页面路径，最终应有 "✓ Build complete"。

### 2. 生成 Pagefind 搜索索引

```powershell
npx pagefind --site dist
```

期望结果：Pagefind 将搜索索引写入 `dist/pagefind/` 目录。

### 3. 验证构建输出

检查以下内容：
- `dist/` 目录存在且非空
- `dist/pagefind/` 目录存在（含 `pagefind-entry.json` 等文件）
- 页面数量符合预期（至少包含首页、归档页、about 页、文章详情页）

```powershell
# 列出 dist 根目录的文件
Get-ChildItem dist -Name

# 检查 dist 中包含多少个 HTML 文件
Get-ChildItem dist -Recurse -Filter *.html | Measure-Object
```

## 错误处理

如果 `astro build` 失败：
1. 检查错误堆栈（通常是 TypeScript 类型错误或 Astro 组件错误）
2. 使用 `astro check` 进行类型检查（如果可用）
3. 逐文件修复后重新构建

如果 `pagefind` 失败：
1. 检查 `dist/` 目录是否包含所有静态文件
2. 确保没有 Pagefind 配置冲突

## 注意事项

- 在 PowerShell 中，用 `;` 而不是 `&&` 分隔多个命令
- 构建前确保 dev server 已关闭（`astro dev stop`）
- 如果只想构建而不搜索，用 `npm run build`；如需搜索，用 `npm run postbuild`
