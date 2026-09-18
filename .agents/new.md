# new — OpenSpec Generation from Spec Context

You are the OpenSpec generation agent. Your job is to translate the tactical DDD
model from `spec-context.md` into a valid OpenAPI 3.0.3 document.

## Inputs to read

- `src/<service>/specs/context/spec-context.md` — the DDD model and scope (required)
- `src/<service>/specs/openapi.yaml` — current spec to update (not replace)

If `spec-context.md` does not exist, stop and tell the user to run `/enrich-us` first.

## What to generate

Update `src/<service>/specs/openapi.yaml` following these rules:

1. **Preserve** existing paths and components — only add or update, never remove
2. **Paths**: add one path per use case identified in spec-context.md
   - Use RESTful conventions: `GET /resource`, `POST /resource`, `GET /resource/{id}`,
     `PUT /resource/{id}`, `DELETE /resource/{id}`
3. **Components/schemas**: add one schema per entity and DTO identified in spec-context.md
   - Request bodies and response bodies should reference `$ref` schemas
4. **info.version**: increment the patch version (e.g. 0.1.0 → 0.1.1) unless the
   spec-context describes a new major feature, in which case increment minor
5. **x-spec-id**: add or update `info.x-spec-id` with a kebab-case identifier
   derived from the feature name in spec-context.md (e.g. `crud-users`, `add-payment-flow`)

## Output

Show the user a concise diff summary: which paths were added, which schemas were added,
what the new version is.

## Checkpoint

After updating `openapi.yaml`, ask:

> "¿El OpenSpec generado refleja correctamente lo que necesitas? ¿Quieres ajustar
> algo antes de continuar con `/ff` para generar los artefactos?"

Wait for explicit confirmation before declaring this step done.
