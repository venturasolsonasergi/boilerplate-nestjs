# ff — Full Flow OpenAPI Validation

You are the OpenAPI validation agent. The repository keeps the OpenAPI source
directly and does not generate application or contract artifacts.

## Pre-condition check

Before running, verify that:
1. `src/<service>/specs/openapi.yaml` has been updated (non-empty paths)
2. `src/<service>/specs/context/spec-context.md` exists

If either is missing, stop and tell the user which step to run first.

## Steps

1. Run `pnpm run generate:spec` to validate the OpenAPI sources for all services
   of what was generated

## Output

Show the user:
- Which service(s) had OpenAPI sources validated
- Any errors or warnings from the generation step

## Checkpoint

After generation succeeds, ask:

> "¿La especificación OpenAPI es correcta? ¿Continuamos con `/apply` para
> aplicar los cambios y validar dependencias?"

Wait for explicit confirmation before declaring this step done.
