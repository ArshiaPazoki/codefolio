#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const IGNORE = new Set(['node_modules', '.next', '.git']);

function printTree(dir, prefix = '') {
  const entries = fs.readdirSync(dir)
    .filter(name => !IGNORE.has(name))
    .sort((a, b) => a.localeCompare(b));

  entries.forEach((name, idx) => {
    const fullPath = path.join(dir, name);
    const isLast = idx === entries.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    console.log(prefix + pointer + name);

    if (fs.statSync(fullPath).isDirectory()) {
      const nextPrefix = prefix + (isLast ? '    ' : '│   ');
      printTree(fullPath, nextPrefix);
    }
  });
}

// start from current dir (or a passed-in path)
const start = process.argv[2] || '.';
console.log(path.basename(path.resolve(start)));
printTree(start);
