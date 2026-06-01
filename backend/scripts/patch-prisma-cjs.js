#!/usr/bin/env node
/**
 * Post-build patch: Prisma 7 generates import.meta.url in dist output,
 * which crashes in CommonJS. This script removes the offending lines.
 */
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '../dist/generated/prisma/client.js');

if (!fs.existsSync(target)) {
  process.exit(0);
}

let content = fs.readFileSync(target, 'utf8');

const problematic = /const node_url_1 = require\("node:url"\);\n?globalThis\['__dirname'\] = path\.dirname\(\(0, node_url_1\.fileURLToPath\)\(import\.meta\.url\)\);\n?/;

if (problematic.test(content)) {
  content = content.replace(problematic, '');
  fs.writeFileSync(target, content, 'utf8');
  console.log('Patched dist/generated/prisma/client.js — removed import.meta.url line');
} else {
  console.log('No patch needed for dist/generated/prisma/client.js');
}
