# Project Context: NestJS SDD Microservices Boilerplate

## Purpose

Backend boilerplate for building microservices with Spec Driven Development (SDD).
OpenSpec (`openapi.yaml`) is the source of truth. No feature code is written before
the spec is defined, reviewed and approved.

## Tech stack

- NestJS + TypeScript
- Prisma (infrastructure repositories only)
- Zod (application/infrastructure validation only)
- pnpm workspaces
- Jest (contract tests)

## Project structure

```
src/
  <service>/            one folder per microservice (discovered via microservice.json)
    specs/
      openapi.yaml             source of truth for this service
      context/spec-context.md enriched DDD context written by /enrich-us agent
    domain/             pure business logic — no framework, no Prisma, no Zod
      *.entity.ts
      *.vo.ts
      *.domain-service.ts
    application/        orchestrates domain — use cases and repository interfaces
      *.use-case.ts
      *.repository.ts   interfaces only — implementations live in infrastructure
    infrastructure/     NestJS + Prisma — implements interfaces from application
      *.controller.ts
      *.module.ts
      *.repository.prisma.ts
      prisma/           schema.prisma
    tests/              contract tests
  shared/
    domain/             shared domain primitives (allowed in domain + application)
    validation/         shared Zod schemas (allowed in application + infrastructure)

architecture/           validation engine and rules
scripts/                workflow CLI (not per-service)
.agents/                canonical agent instruction files (tool-agnostic)
docs/                   architecture and workflow documentation
```

A service is discovered automatically if it has a `microservice.json` file.

## Architecture rules (enforced by validation scripts)

Dependency direction — imports must only flow inward:
```
infrastructure → application → domain
```

Forbidden imports (hard rules — never violate):
- `domain/` must NOT import: `@nestjs/*`, `@prisma/client`, `zod`
- `application/` must NOT import: `@prisma/client`
- One microservice must NOT import from another microservice's `domain/`

Allowed shared usage:
- `domain/` may use: `src/shared/domain`
- `application/` may use: `src/shared/domain`, `src/shared/validation`
- `infrastructure/` may use: `src/shared/domain`, `src/shared/validation`

Controllers must be thin — business logic belongs in use cases, not controllers.
Repository implementations live in `infrastructure/` only; `application/` holds interfaces.

## SDD workflow

Always follow Spec Driven Development. Never write domain or application code before
the OpenAPI spec for that feature has been defined.

### Orchestrated (recommended)
```
/sdd [--service <name>]
```
Full cycle with one human checkpoint after the DDD proposal.

### Manual (step by step)
```
/enrich-us  → gather context, ask DDD questions, write spec-context.md
/new        → update openapi.yaml from spec-context.md
/ff         → run pnpm generate:spec, show artifacts
/apply      → run pnpm apply
/verify     → run pnpm verify with auto-fix loop (see .agents/config.json)
/code-review → run pnpm code_review, produce commit message
```

Full documentation: `docs/sdd-flow.md`

Related skill: `.agents/skills/nestjs-sdd-api-practices/SKILL.md`

## Key conventions

- `microservice.json` — metadata per service (name, version, specVersion, dependencies)
- `sdd-evolution.md` per service — changelog of spec iterations
- `VERIFY_MAX_ATTEMPTS` in `.agents/config.json` — controls verify retry loop

## What NOT to do

- Do NOT write business logic in controllers
- Do NOT import Prisma or NestJS in `domain/`
- Do NOT import across microservice domain boundaries
- Do NOT create generated spec directories; OpenAPI is validated directly from `specs/openapi.yaml`
- Do NOT modify `architecture/rules.json` to silence a validation failure
- Do NOT skip the spec step — always define the OpenAPI before implementing
