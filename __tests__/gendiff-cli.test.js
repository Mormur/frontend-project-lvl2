import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import genDiff from '../src/gendiff-cli.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

const extensions = ['json', 'yml', 'ini'];
const formats = ['stylish', 'plain', 'json'];

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
