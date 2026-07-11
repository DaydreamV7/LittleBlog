---
title: "深层嵌套文章"
description: "演示 user/posts/ 下的无限文件夹嵌套。"
pubDate: "2026-07-08"
category: "技术"
tags: ["Astro", "架构"]
---

## 嵌套文件夹支持

这篇文章位于 `user/posts/nested/deep-post.md`，演示了博客支持任意深度的文件夹嵌套。

路由为 `/blog/nested/deep-post`。

### 为什么嵌套很重要

- 按分类组织文章：`user/posts/gaming/`、`user/posts/code/`、`user/posts/life/`
- 按年份归档：`user/posts/2026/`、`user/posts/2025/`
- 没有 Schema 约束 — 直接创建文件夹然后丢 `.md` 文件进去
---
title: "Deep Nested Post"
description: "This post demonstrates infinite folder nesting under user/posts/."
pubDate: "2026-07-08"
---

## Nested Folder Support

This post lives at `user/posts/nested/deep-post.md`, demonstrating that the blog supports arbitrary folder nesting.

The route for this post is `/blog/nested/deep-post`.

### Why Nesting Matters

- Organize posts by category: `user/posts/gaming/`, `user/posts/code/`, `user/posts/life/`
- Archive by year: `user/posts/2026/`, `user/posts/2025/`
- No schema constraints — just create folders and drop `.md` files
