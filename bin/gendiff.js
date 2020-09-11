#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/gendiff-cli.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2); // when there are new formatters - add a command program.format
  });

program.parse(process.argv);
