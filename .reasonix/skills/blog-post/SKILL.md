---
name: blog-post
description: 用正确 frontmatter 和样式新建一篇 DMBlog 博客文章
---

# blog-post — 创建新博客文章

根据用户提供的参数（标题、分类、标签等），在 `user/posts/` 目录下创建一篇新的 Markdown 文章。

## 数据来源

先读取以下文件获取项目上下文：
- `config/siteConfig.ts` — 站点名称/语言
- `src/utils/userData.ts` — 现有文章分类/标签列表（用于建议）

## Frontmatter 模板

```yaml
---
title: "文章标题"                 # 必填
description: "文章摘要"           # 可选，列表页显示
pubDate: "2026-07-10"            # 必填，YYYY-MM-DD 格式
category: "分类"                  # 可选，单分类
tags: ["标签1", "标签2"]          # 可选，多标签
heroImage: "/user/assets/images/..." # 可选，封面图路径
font: "pixel"                    # 可选，设置为 "pixel" 启用像素字体
---
```

## 文件命名

使用中横线连接的英文 slug：如 `my-new-post.md`
嵌套目录支持：如 `game/my-game-review.md`

## 文件路径

写入 `user/posts/` 目录下。

## 双语文档问题

注意 `user/posts/` 下的 Markdown 可能存在中英双语内容（用 `---` 分隔两个 frontmatter 块）。新建文章时默认只用中文 frontmatter 和内容。

## 分类建议

从现有分类中建议用户可用的分类列表（用 `getCategories()` 获取或用 glob 扫描）。
