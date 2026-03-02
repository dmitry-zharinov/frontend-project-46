#!/usr/bin/env node

const { Command } = require('commander');
const genDiff = require('./index');

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    const output = genDiff(filepath1, filepath2, options.format);
    process.stdout.write(`${output}\n`);
  });

program.parse();