#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const services = ['users', 'orders'];
const report = [];
let failed = false;

for (const service of services) {
  const base = path.join(root, 'src', service, 'domain');
  const required = [
    path.join(base, 'value-objects'),
    path.join(base, 'domain-events'),
    path.join(base, 'domain-services'),
  ];

  const serviceResult = { service, checks: [] };
  for (const req of required) {
    const ok = fs.existsSync(req) && fs.readdirSync(req).length > 0;
    serviceResult.checks.push({ check: path.relative(root, req), ok });
    if (!ok) failed = true;
  }

  const voFiles = fs.existsSync(path.join(base, 'value-objects'))
    ? fs.readdirSync(path.join(base, 'value-objects')).filter((f) => f.endsWith('.ts'))
    : [];
  const voOk = voFiles.length > 0;
  serviceResult.checks.push({ check: 'value objects present', ok: voOk });
  if (!voOk) failed = true;

  report.push(serviceResult);
}

if (failed) {
  console.error(JSON.stringify({ status: 'failed', report }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ status: 'passed', report }, null, 2));
