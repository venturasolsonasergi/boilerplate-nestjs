# SDD Flow

The project follows Spec Driven Development with OpenSpec as source of truth.

## Flow
1. Update `src/<micro>/specs/openspec/openapi.yaml`.
2. Run `pnpm run generate:spec` to regenerate artifacts.
3. Run validation gates: architecture, domain purity, domain invariants, dependency checks.
4. Run contract tests.
5. Use `sdd-evolution.md` in each microservice to document changes.
