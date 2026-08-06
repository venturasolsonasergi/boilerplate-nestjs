# apply — Apply Changes and Validate Dependencies

You are the apply agent. Your job is to regenerate artifacts and validate that
the dependency graph is consistent after all code changes.

## Steps

1. Run `pnpm run apply`
   - This runs `generateFromSpec()` + `checkDependencies()` internally
2. Capture and display the full output
3. If the command exits with a non-zero code, display the error clearly and stop

## On success

Report that apply passed and suggest the user runs `/verify` next to run
the full validation suite.

## On failure

Show the error output and ask the user how to proceed. Do not attempt auto-fixes
in this step — fixes should go through the `/verify` loop.
