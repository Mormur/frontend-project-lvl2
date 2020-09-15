import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getDiff from './getdiff.js';
import makeFormat from './formatters/index.js';

const getDataOfFile = (filepath) => {
  const wholePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(wholePath, 'utf8');
};

const getExtension = (filepath) => {
  const extension = path.extname(filepath);
  return extension.slice(1);
};

const genDiff = (path1, path2, format) => {
  const dataOfFile1 = getDataOfFile(path1);
  const extensionOfFile1 = getExtension(path1);
  const parsedData1 = parser(dataOfFile1, extensionOfFile1);

  const dataOfFile2 = getDataOfFile(path2);
  const extensionOfFile2 = getExtension(path2);
  const parsedData2 = parser(dataOfFile2, extensionOfFile2);
  return makeFormat(getDiff(parsedData1, parsedData2), format);
};

export default genDiff;
