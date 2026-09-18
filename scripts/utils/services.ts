import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { ROOT_DIR } from './runtime';

export function discoverServices(): string[] {
  const srcDir = join(ROOT_DIR, 'src');
  const services: string[] = [];

  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const serviceConfig = join(srcDir, entry.name, 'microservice.json');
    if (existsSync(serviceConfig)) {
      services.push(entry.name);
    }
  }

  return services.sort((left, right) => left.localeCompare(right));
}

export function resolveServicePaths(service: string): {
  serviceRoot: string;
  spec: string;
} {
  const serviceRoot = join(ROOT_DIR, 'src', service);
  const spec = join(serviceRoot, 'specs', 'openapi.yaml');

  return { serviceRoot, spec };
}

export function requireServiceArg(value?: string): string {
  if (!value) {
    throw new Error('Missing service name. Use --service <name>');
  }

  return value;
}

export function parseServiceArg(args: string[]): string | undefined {
  const serviceFlagIndex = args.indexOf('--service');
  if (serviceFlagIndex >= 0) {
    return args[serviceFlagIndex + 1];
  }

  const serviceEqualsArg = args.find((arg) => arg.startsWith('--service='));
  if (serviceEqualsArg) {
    return serviceEqualsArg.split('=')[1];
  }

  return args[0];
}

export function hasFilesRecursive(directory: string): boolean {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isFile()) {
      return true;
    }
    if (entry.isDirectory() && hasFilesRecursive(fullPath)) {
      return true;
    }
  }

  return false;
}