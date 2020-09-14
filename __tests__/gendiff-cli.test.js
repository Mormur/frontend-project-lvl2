import fs, { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname, resolve } from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import parser from '../src/parsers.js';
import getDiff from '../src/getdiff.js';
import genDiff from '../src/gendiff-cli.js';

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

const extensions = ['json', 'yml', 'ini'];
const formats = ['stylish', 'plain', 'json'];

let expectedFunction;

beforeAll(() => {
  expectedFunction = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.parse,
  };
});

describe('parser', () => {
  test.each(extensions)('%s parser', (extension) => {
    const path1 = getFixturePath(`file1.${extension}`);
    const path2 = getFixturePath(`file2.${extension}`);
    expect(parser(path1, path2)).toBe(expectedFunction[extension]);
  });
});

let expectedTree;

beforeAll(() => {
  expectedTree = getDataOfFile(getFixturePath('expectedJsonTree.json'));
});

describe('building diff-tree', () => {
  test.each(extensions)('%s tree', (extension) => {
    const data1 = getDataOfFile(getFixturePath(`file1.${extension}`));
    const data2 = getDataOfFile(getFixturePath(`file2.${extension}`));
    expect(getDiff(data1, data2)).toEqual(expectedTree);
  });
});

let expectedResult;

beforeAll(() => {
  expectedResult = {
    stylish: readFileSync(getFixturePath('expectedStylishFormat.txt'), 'utf-8'),
    plain: readFileSync(getFixturePath('expectedPlainFormat.txt'), 'utf-8'),
    json: readFileSync(getFixturePath('expectedJsonFormat.txt'), 'utf-8'),
  };
});

describe.each(extensions)('gendiff %s file', (extension) => {
  test.each(formats)('%s format result', (format) => {
    const path1 = getFixturePath(`file1.${extension}`);
    const path2 = getFixturePath(`file2.${extension}`);
    expect(genDiff(path1, path2, format)).toEqual(expectedResult[format]);
  });
});
