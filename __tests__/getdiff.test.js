import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname, resolve } from 'path';
import parser from '../src/parsers.js';
import getDiff from '../src/getdiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

const getFile = (filepath) => {
  const wholePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(wholePath, 'utf8');
};

const getDataOfFile = (filepath) => {
  const file = getFile(filepath);
  const parse = parser(filepath);
  return parse(file);
};

test('getDiff', () => {
  expect(getDiff(getDataOfFile(getFixturePath('file1.json')), getDataOfFile(getFixturePath('file2.json')))).toEqual(getDataOfFile(getFixturePath('expectedJsonTree.json')));
});
