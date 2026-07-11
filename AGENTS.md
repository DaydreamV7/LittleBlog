## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Agent skills

### Installed workflows

The workspace now exposes project-specific skills under [.github/skills](.github/skills). Use them for Astro builds, bug diagnosis, interface design, and TDD-style fixes.

### MCP

The workspace also configures Playwright in [.vscode/mcp.json](.vscode/mcp.json) for browser-based verification.

## Behavioural Guidelines (Karpathy Principles)

Derived from Andrej Karpathy's observations on LLM coding pitfalls.
These bias toward caution over speed; for trivial tasks use judgment.

### 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**
- State assumptions explicitly — if uncertain, ask rather than guess.
- Present multiple interpretations — don't pick silently when ambiguity exists.
- Push back when warranted — if a simpler approach exists, say so.
- Stop when confused — name what's unclear and ask for clarification.

### 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If 200 lines could be 50, rewrite it.
- The test: "Would a senior engineer say this is overcomplicated?"

### 3. Surgical Changes
**Touch only what you must. Clean up only your own mess.**
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Remove imports/variables/functions that YOUR changes made unused.
- Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution
**Define success criteria. Loop until verified.**
- Transform tasks into verifiable goals (e.g. "Write tests for invalid inputs, then make them pass").
- For multi-step tasks, state a brief plan with verification checkpoints.
- Strong success criteria let the agent loop independently.
