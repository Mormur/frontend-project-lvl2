import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

test('parser', () => {
  expect(parser(getFixturePath('file1.json'))).toBe(JSON.parse);
  expect(parser(getFixturePath('after.yaml'))).toBe(yaml.safeLoad);
  expect(parser(getFixturePath('after.ini'))).toBe(ini.parse);
});
