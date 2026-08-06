import {
  archive,
  checkDependencies,
  checkDomainInvariants,
  generateFromSpec,
  generateMicroserviceHealthReport,
  microserviceCheckSpecDrift,
  microserviceGenerateFromSpec,
  microserviceRunContractTests,
  runContractTests,
  validateArchitecture,
  validateDomainPurity,
} from './commands';
import { applyWorkflow, codeReview, commitFlow, enrichUs, propose, publish, verify } from './workflows';
import { parseServiceArg, requireServiceArg } from './utils/services';

const command = process.argv[2];
const args = process.argv.slice(3);

const handlers: Record<string, () => void> = {
  'generate:spec': generateFromSpec,
  'validate:architecture': validateArchitecture,
  'validate:domain': validateDomainPurity,
  'check:domain-invariants': checkDomainInvariants,
  'check:dependencies': checkDependencies,
  'test:contract': runContractTests,
  'report:microservice-health': generateMicroserviceHealthReport,
  enrich_us: enrichUs,
  propose,
  apply: applyWorkflow,
  verify,
  code_review: codeReview,
  archive,
  commit_flow: commitFlow,
  publish,
  'microservice:generate-from-spec': () => microserviceGenerateFromSpec(requireServiceArg(parseServiceArg(args))),
  'microservice:check-spec-drift': () => microserviceCheckSpecDrift(requireServiceArg(parseServiceArg(args))),
  'microservice:run-contract-tests': () => microserviceRunContractTests(requireServiceArg(parseServiceArg(args))),
};

function main(): void {
  const handler = command ? handlers[command] : undefined;
  if (!handler) {
    throw new Error(
      `Unknown command: ${command ?? '<none>'}. Use one of ${Object.keys(handlers).join(', ')}.`,
    );
  }

  handler();
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
