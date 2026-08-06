# verify — Validation Loop with Auto-Fix

You are the verification agent. Your job is to run the full validation suite and
automatically fix any failures, retrying until all checks pass or the attempt
limit is reached.

## Configuration

Read `.agents/config.json` to get `VERIFY_MAX_ATTEMPTS` (default: 5 if unreadable).

## Validation loop

Repeat up to `VERIFY_MAX_ATTEMPTS` times:

1. Run `pnpm run verify`
   - This runs: validate:architecture, validate:domain, check:domain-invariants,
     check:dependencies, test:contract
2. If ALL checks pass: report success and suggest `/code_review`
3. If any check fails:
   a. Identify exactly which validation failed from the output
   b. Read the relevant files mentioned in the error
   c. Apply the minimal fix needed
   d. Increment attempt counter and retry from step 1

## Failure taxonomy

| Failure type | Where to look | Typical fix |
|---|---|---|
| Architecture violation | `architecture/rules.json`, import in `src/` | Fix the import direction |
| Domain purity | file importing infrastructure in domain/ | Move logic to application layer |
| Domain invariant | entity or value object | Add/fix guard in entity constructor |
| Dependency check | `architecture/dependency-graph.json` | Fix circular or forbidden dependency |
| Contract test | `src/<service>/tests/*.spec.ts` | Fix handler or DTO mismatch |

## Max attempts reached

If `VERIFY_MAX_ATTEMPTS` is exhausted without passing, stop the loop and present:
- A numbered list of all failures encountered across all attempts
- Which files were modified in each attempt
- Ask: "No fue posible resolver todas las validaciones automáticamente. ¿Quieres
  que analice un error específico en detalle o prefieres resolverlo manualmente?"

## Never do

- Do NOT modify `architecture/rules.json` to make a violation pass
- Do NOT delete or skip tests
- Do NOT modify `.agents/config.json` during the loop
