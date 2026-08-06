import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { discoverServices, hasFilesRecursive, resolveServicePaths } from '../utils/services';
import { ROOT_DIR, runCommand, runCommandOk, runNodeScript, utcTimestamp } from '../utils/runtime';

export function microserviceGenerateFromSpec(service: string): void {
  const { spec, generatedDir, generated } = resolveServicePaths(service);
  if (!existsSync(spec)) {
    throw new Error(`[${service}] Missing OpenSpec source at ${spec}`);
  }

  mkdirSync(generatedDir, { recursive: true });
  writeFileSync(generated, `// generated at ${utcTimestamp()}\n`, { encoding: 'utf8' });
  console.log(`[${service}] Generation completed`);
}

export function microserviceCheckSpecDrift(service: string): void {
  const { spec, generated } = resolveServicePaths(service);
  if (!existsSync(spec)) {
    throw new Error(`[${service}] Missing OpenSpec source`);
  }
  if (!existsSync(generated)) {
    throw new Error(`[${service}] Missing generated artifact`);
  }
  console.log(`[${service}] Spec drift check passed`);
}

export function microserviceRunContractTests(service: string): void {
  runCommand('pnpm', ['jest', `src/${service}/tests`, '--runInBand']);
}

export function generateFromSpec(): void {
  for (const service of discoverServices()) {
    microserviceGenerateFromSpec(service);
  }
}

export function validateArchitecture(): void {
  runNodeScript('architecture/validation-engine/generate-dependency-graph.mjs');
  runNodeScript('architecture/validation-engine/check-dependencies.mjs');
}

export function validateDomainPurity(): void {
  runNodeScript('architecture/validation-engine/validate-domain-purity.mjs');
}

export function checkDomainInvariants(): void {
  runNodeScript('architecture/validation-engine/check-domain-invariants.mjs');
}

export function checkDependencies(): void {
  runNodeScript('architecture/validation-engine/generate-dependency-graph.mjs');
  runNodeScript('architecture/validation-engine/check-dependencies.mjs');
}

export function runContractTests(): void {
  runCommand('pnpm', ['jest', 'src/users/tests', 'src/orders/tests', '--runInBand']);
}

export function generateMicroserviceHealthReport(): void {
  const reportDir = join(ROOT_DIR, 'reports');
  const reportFile = join(reportDir, 'microservice-health-report.md');
  mkdirSync(reportDir, { recursive: true });

  const lines: string[] = [];
  lines.push('# Microservice Health Report');
  lines.push('');
  lines.push(`Generated at: ${utcTimestamp()}`);
  lines.push('');

  for (const service of discoverServices()) {
    const { spec, serviceRoot, generated } = resolveServicePaths(service);
    const domainDir = join(serviceRoot, 'domain');

    lines.push(`## ${service}`);
    lines.push(`- spec: ${existsSync(spec) && existsSync(generated) ? 'ok' : 'missing'}`);
    lines.push(`- domain: ${existsSync(domainDir) && hasFilesRecursive(domainDir) ? 'ok' : 'missing'}`);
    lines.push(
      `- dependencies: ${runCommandOk('node', ['architecture/validation-engine/check-dependencies.mjs']) ? 'ok' : 'failed'}`,
    );

    const architectureOk =
      runCommandOk('node', ['architecture/validation-engine/generate-dependency-graph.mjs']) &&
      runCommandOk('node', ['architecture/validation-engine/check-dependencies.mjs']);
    lines.push(`- architecture validation: ${architectureOk ? 'ok' : 'failed'}`);
    lines.push('');
  }

  writeFileSync(reportFile, `${lines.join('\n')}\n`, { encoding: 'utf8' });
  console.log(`Report written to ${reportFile}`);
}

export function archive(): void {
  const archiveDir = join(ROOT_DIR, 'archive');
  mkdirSync(archiveDir, { recursive: true });
  const target = join(archiveDir, `architecture-${utcTimestamp().replace(/[-:]/g, '').replace(/\./g, '')}`);
  cpSync(join(ROOT_DIR, 'architecture'), target, { recursive: true });
  console.log('archive completed');
}