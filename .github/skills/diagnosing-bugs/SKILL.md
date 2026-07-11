---
name: diagnosing-bugs
description: Diagnosis loop for hard bugs and performance regressions in this Astro frontend project.
---

# Diagnosing Bugs

Use this skill when a bug is unclear, intermittent, or performance-related.

## Workflow

1. Build the tightest possible repro at the seam that exercises the reported symptom.
2. Run the repro until it is deterministic enough to trust.
3. Minimize the repro before changing code.
4. Form a small set of falsifiable hypotheses and test the cheapest one first.
5. Add or update a regression test when there is a correct seam for it.

## Notes

- Read nearby project docs such as `docs/DEVELOPMENT_LOG.md` when they help explain the failure mode.
- Keep instrumentation temporary and remove it after validation.
