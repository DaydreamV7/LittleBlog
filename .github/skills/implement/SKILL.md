---
name: implement
description: Implement a piece of work from a spec or ticket, using TDD and focused validation where possible.
---

# Implement

Use this skill when the user has asked you to build or change something in the repo.

## Workflow

1. Start from the closest concrete anchor: a file, a failing command, or a user-visible behavior.
2. Prefer the smallest change that fixes the real cause.
3. Run type checks or the narrowest useful validation as you go.
4. Use the existing repo conventions and reuse nearby patterns.

## Notes

- Reach for `tdd` when the change has a stable seam and a good regression test target.
- Keep scope tight; do not widen the change without a reason.
