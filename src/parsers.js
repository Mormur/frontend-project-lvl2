import _ from 'lodash';
import ini from 'ini';
import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parser = (data, extension) => {
  if (!_.has(parsers, extension)) {
    throw new Error(`${extension} is unknown extension.`);
  }
  const parse = parsers[extension];
  return parse(data);
};

export default parser;
