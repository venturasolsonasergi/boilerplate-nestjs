# SDD Flow

The project follows Spec Driven Development with OpenSpec as source of truth.
Agent definitions live in `.agents/` (tool-agnostic). Tool-specific wrappers in
`.github/prompts/`, `.claude/commands/`, and `.opencode/commands/` reference them.

---

## Option A — Manual flow (full human control)

Each step is invoked explicitly. The agent asks for confirmation before suggesting
the next command. Use this when you want fine-grained control over each transition.

```
/enrich-us
  Reads: health report, openapi.yaml, existing DDD entities
  Asks: feature intent, entities, invariants, use cases, domain events, dependencies
  Writes: src/<service>/specs/context/spec-context.md
  Checkpoint: "¿DDD correcto? ¿Continúo con /new?"

/new
  Reads: spec-context.md
  Updates: src/<service>/specs/openspec/openapi.yaml (paths, schemas, version, x-spec-id)
  Checkpoint: "¿OpenSpec correcto? ¿Continúo con /ff?"

/ff
  Runs: pnpm generate:spec
  Shows: generated artifacts in specs/generated/
  Checkpoint: "¿Artefactos correctos? ¿Continúo con /apply?"

  ── Human validation: review DDD model + OpenAPI before proceeding ──

/apply
  Runs: pnpm apply (generateFromSpec + checkDependencies)

/verify
  Runs: pnpm verify in a loop (up to VERIFY_MAX_ATTEMPTS from .agents/config.json)
  Auto-fixes validation failures; escalates to user if limit reached

/code-review
  Runs: pnpm code_review (lint + verify)
  Produces: conventional commit message from spec-context + git diff
```

---

## Option B — Orchestrated flow (single checkpoint)

One command drives the entire cycle. The only human checkpoint is after the
DDD model is proposed and before any code generation starts.

```
/sdd [--service <name>]

  Phase 1 — Context + DDD (automatic)
    → reads health report, openapi.yaml, existing domain
    → asks 7 DDD questions in one interaction
    → writes spec-context.md

  ── CHECKPOINT: "¿DDD y scope OpenAPI correctos? ¿Continúo?" ──

  Phase 2 — Spec generation (automatic after confirmation)
    → updates openapi.yaml (version, x-spec-id, paths, schemas)
    → runs pnpm generate:spec
    → shows artifact summary

  Phase 3 — Implementation validation (automatic)
    → runs pnpm apply
    → runs pnpm verify with auto-fix loop (VERIFY_MAX_ATTEMPTS)
    → runs pnpm code_review
    → produces commit message
```

---

## Shared state

| File | Written by | Read by |
|---|---|---|
| `src/<service>/specs/context/spec-context.md` | `/enrich-us` | `/new`, `/code-review` |
| `src/<service>/specs/openspec/openapi.yaml` | `/new` | `/ff`, `/apply`, `/verify` |
| `src/<service>/specs/generated/index.ts` | `/ff` | `/apply`, `/verify` |
| `.agents/config.json` | static | `/verify` (loop limit) |

---

## Agent files reference

| Canonical (tool-agnostic) | VS Code Copilot | Claude Code | OpenCode |
|---|---|---|---|
| `.agents/enrich-us.md` | `.github/prompts/enrich-us.prompt.md` | `.claude/commands/enrich-us.md` | `.opencode/commands/enrich-us.md` |
| `.agents/new.md` | `.github/prompts/new.prompt.md` | `.claude/commands/new.md` | `.opencode/commands/new.md` |
| `.agents/ff.md` | `.github/prompts/ff.prompt.md` | `.claude/commands/ff.md` | `.opencode/commands/ff.md` |
| `.agents/apply.md` | `.github/prompts/apply.prompt.md` | `.claude/commands/apply.md` | `.opencode/commands/apply.md` |
| `.agents/verify.md` | `.github/prompts/verify.prompt.md` | `.claude/commands/verify.md` | `.opencode/commands/verify.md` |
| `.agents/code-review.md` | `.github/prompts/code-review.prompt.md` | `.claude/commands/code-review.md` | `.opencode/commands/code-review.md` |
| `.agents/sdd.md` | `.github/prompts/sdd.prompt.md` | `.claude/commands/sdd.md` | `.opencode/commands/sdd.md` |
