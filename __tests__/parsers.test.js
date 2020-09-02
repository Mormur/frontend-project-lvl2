import yaml from 'js-yaml';
import parser from '../src/parsers.js';

test('parser', () => {
  expect(parser('file.json')).toBe(JSON.parse);
  expect(parser('file.JSON')).toBe(JSON.parse);
  expect(parser('file.yml')).toBe(yaml.safeLoad);
});
