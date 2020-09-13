import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import genDiff from '../src/gendiff-cli.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff', () => {
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toEqual(expected);
  expect(genDiff(getFixturePath('before.ini'), getFixturePath('after.ini'))).toEqual(expected);
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readFileSync(getFixturePath('expectedStylishFormat.txt'), 'utf-8'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFileSync(getFixturePath('expectedPlainFormat.txt'), 'utf-8'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(readFileSync(getFixturePath('expectedJsonFormat.txt'), 'utf-8'));
});
