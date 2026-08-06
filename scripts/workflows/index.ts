import {
  checkDependencies,
  generateFromSpec,
  generateMicroserviceHealthReport,
  runContractTests,
  validateArchitecture,
  validateDomainPurity,
  checkDomainInvariants,
} from '../commands';
import { runCommand } from '../utils/runtime';

export function enrichUs(): void {
  console.log('enrich_us: collecting specification context');
  generateMicroserviceHealthReport();
}

export function propose(): void {
  console.log('propose: preparing proposed changes from specs');
  generateFromSpec();
}

export function applyWorkflow(): void {
  console.log('apply: applying generated artifacts and checks');
  generateFromSpec();
  checkDependencies();
}

export function verify(): void {
  validateArchitecture();
  validateDomainPurity();
  checkDomainInvariants();
  runContractTests();
}

export function codeReview(): void {
  runCommand('pnpm', ['lint']);
  verify();
}

export function commitFlow(): void {
  console.log('commit: stage files and create commit manually after verification');
}

export function publish(): void {
  console.log('publish: placeholder for CI/CD publication');
}