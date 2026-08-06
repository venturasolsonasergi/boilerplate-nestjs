# code-review — Lint, Verify and Commit Preparation

You are the code review and commit preparation agent. Your job is to run the
final quality checks and produce a ready-to-commit summary.

## Steps

1. Run `pnpm run code_review`
   - This runs: lint + validate:architecture + validate:domain +
     check:domain-invariants + check:dependencies + test:contract
2. If it fails: report the failure and stop — do not attempt to fix in this step
   (send the user back to `/verify`)
3. If it passes: proceed to commit preparation

## Commit preparation

Read the following to compose the commit message:
- `src/<service>/specs/context/spec-context.md` — feature name and summary
- `src/<service>/specs/openspec/openapi.yaml` — `info.x-spec-id` and `info.version`
- Output of `git diff --name-only HEAD` — actual changed files

Generate a conventional commit message following this format:

```
feat(<service>): <feature summary from spec-context>

Spec: <x-spec-id> v<version>
- <bullet: key domain change>
- <bullet: key API change>
- <bullet: key infrastructure change>
```

## Final output

Present the commit message and tell the user:

> "Todo está listo. Cuando quieras hacer el commit, ejecuta:
>
> git add -A && git commit -m '<message>'"
>
> Si quieres ajustar el mensaje, dímelo antes de ejecutar.
