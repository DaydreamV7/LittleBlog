---
name: astro-build
description: Build and verify DMBlog with astro build, pagefind, and page-count checks.
---

# Astro Build

Use this skill when the task is to validate the Astro site end to end.

## Workflow

1. Build the site with `npm run build`.
2. Generate the search index with `npm run build:search` if the task depends on search.
3. Verify that `dist/` exists, `dist/pagefind/` exists when search is enabled, and the generated HTML count matches expectations.
4. If build output fails, inspect the first TypeScript or Astro error before changing anything else.

## Notes

- Keep validation focused on this repository.
- Prefer the existing project scripts over ad hoc commands.
