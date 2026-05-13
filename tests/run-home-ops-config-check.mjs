import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const filePath = resolve('src/prototype/screens/user-home.jsx');
const source = readFileSync(filePath, 'utf8');

const requiredPatterns = [
  'function MU_requestHomeOpsConfig(location)',
  '/home/ops/config?',
  'function useMUHomeOpsConfig(location)',
  'const homePicks = MU_buildHomePicks(opsConfig?.recommend_slots);',
  'const searchTags = MU_buildSearchTags(opsConfig?.search_keywords);',
  'const searchSections = MU_buildSearchSections(opsConfig?.recommend_slots, opsConfig?.search_keywords);',
];

const missing = requiredPatterns.filter((pattern) => !source.includes(pattern));

if (missing.length) {
  console.error('home ops config integration check failed');
  missing.forEach((pattern) => console.error(`missing: ${pattern}`));
  process.exit(1);
}

console.log('home ops config integration check passed');
