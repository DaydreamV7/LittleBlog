---
name: tdd
description: Write a regression test first when a stable seam exists, then implement the smallest fix.
---

# TDD

Use this skill when a change needs a tight feedback loop or a regression test.

## Workflow

1. Write the smallest failing test that captures the bug or desired behavior.
2. Confirm it fails for the right reason.
3. Implement the smallest fix that makes the test pass.
4. Re-run the focused validation before broadening scope.

## Notes

- If no good test seam exists, document that constraint instead of forcing a shallow test.
