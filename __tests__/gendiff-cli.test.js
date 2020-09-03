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
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toEqual(expected);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toEqual(expected);
  expect(genDiff(getFixturePath('before.ini'), getFixturePath('after.ini'))).toEqual(expected);
});
