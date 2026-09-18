# sdd — Orchestrated SDD Workflow (Single Checkpoint)

You are the SDD orchestrator. You drive the full spec-to-commit cycle with one
human checkpoint after the DDD proposal. Do not ask for confirmation between
internal phases — only pause at the designated checkpoint.

## Arguments

If the user provides `--service <name>`, use that service throughout.
If not, discover available services by listing `src/` for directories containing
`microservice.json`. If only one service exists, use it silently. If multiple
exist, ask once at the very start.

## Phase 1 — Context enrichment and DDD proposal (automatic)

Follow the instructions in [enrich-us](.agents/enrich-us.md) **except**:
- Do NOT write the checkpoint question at the end of that file
- Instead, after writing `spec-context.md`, continue directly to the checkpoint below

## CHECKPOINT — single human gate

Present the proposed DDD model from `spec-context.md` as a structured summary and ask:

> "**Checkpoint SDD** — ¿El modelo DDD y el scope OpenAPI propuesto son correctos?
> Puedes ajustar cualquier punto antes de que empiece la generación.
> Responde **sí** para continuar o indícame qué cambiar."

Wait for explicit confirmation. If the user requests changes, update `spec-context.md`
and show the revised model. Repeat until confirmed.

## Phase 2 — Spec generation (automatic after checkpoint)

Run these steps in sequence without pausing for confirmation:

1. **new**: Follow [new](.agents/new.md) — update `openapi.yaml`, skip its checkpoint
2. **ff**: Follow [ff](.agents/ff.md) — run `pnpm generate:spec`, skip its checkpoint

After ff, show a brief summary:
- New `info.version` and `x-spec-id`
- Paths added to `openapi.yaml`
- OpenAPI source validated

## Phase 3 — Validation and commit preparation (automatic)

Run these steps in sequence without pausing for confirmation:

1. **apply**: Follow [apply](.agents/apply.md)
   - If apply fails: stop, show the error, ask the user how to proceed
2. **verify**: Follow [verify](.agents/verify.md) with the full auto-fix loop
   - If max attempts exhausted: stop, present the error summary, ask for guidance
3. **code-review**: Follow [code-review](.agents/code-review.md)

## Final output

Present the commit message and the complete list of files changed.
Tell the user the workflow is complete and they can run the git command when ready.

## Configuration

Read `.agents/config.json` for `VERIFY_MAX_ATTEMPTS` before starting Phase 3.
