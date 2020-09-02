import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';

export const getFile = (filepath) => {
  const wholePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(wholePath, 'utf8');
};

export const getDataOfFile = (filepath) => {
  const file = getFile(filepath);
  const parse = parser(filepath);
  return parse(file);
};

const genDiff = (path1, path2) => {
  const dataOfFile1 = getDataOfFile(path1);
  const dataOfFile2 = getDataOfFile(path2);

  const keysOfFile1 = Object.keys(dataOfFile1);
  const keysOfFile2 = Object.keys(dataOfFile2);

  const allSortedKeys = _.uniq([...keysOfFile1, ...keysOfFile2].sort());

  const result = allSortedKeys.map((key) => {
    if (!_.has(dataOfFile1, key)) {
      return `  + ${key}: ${dataOfFile2[key]}`;
    }
    if (!_.has(dataOfFile2, key)) {
      return `  - ${key}: ${dataOfFile1[key]}`;
    }
    if (dataOfFile1[key] !== dataOfFile2[key]) {
      return `  - ${key}: ${dataOfFile1[key]}\n  + ${key}: ${dataOfFile2[key]}`;
    }
    return `    ${key}: ${dataOfFile1[key]}`;
  });

  console.log(`{\n${result.join('\n')}\n}`);
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
