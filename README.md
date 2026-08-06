# NestJS SDD Microservices Boilerplate

Backend boilerplate for microservices with:
- Spec Driven Development (SDD)
- OpenSpec as source of truth
- lidr-specboot integration hooks
- Tactical DDD and clean architecture lite
- Prisma repositories in infrastructure
- Architecture validation harness

## Project Structure
- `src/users/` and `src/orders/` microservices:
  - `specs/`, `domain/`, `application/`, `infrastructure/`, `tests/`
- `src/shared/domain/` and `src/shared/validation/`
- `architecture/` rules, graph and validation engine
- `scripts/` root workflow scripts

## Core Commands
- `pnpm run generate:spec`
- `pnpm run validate:architecture`
- `pnpm run validate:domain`
- `pnpm run check:domain-invariants`
- `pnpm run check:dependencies`
- `pnpm run test:contract`
- `pnpm run report:microservice-health`

## Workflow Commands
- `pnpm run enrich_us`
- `pnpm run propose`
- `pnpm run apply`
- `pnpm run verify`
- `pnpm run code_review`
- `pnpm run archive`
- `pnpm run commit_flow`
- `pnpm run publish`

## Add a New Microservice
1. Copy `src/users/` as a template into `src/<new-service>/`.
2. Update `<new-service>/microservice.json`.
3. Add OpenSpec under `<new-service>/specs/openspec/openapi.yaml`.
4. Reuse global scripts under `scripts/` (no custom per-service scripts required).
5. Register module import in `src/app.module.ts`.
6. Update validation scripts if needed to include the new service.
