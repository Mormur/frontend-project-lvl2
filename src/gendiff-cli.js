import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getDiff from './getdiff';
import makeFormat from './formatters/stylish.js';

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
  return makeFormat(getDiff(dataOfFile1, dataOfFile2));
};

export default genDiff;
