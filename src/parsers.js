import _ from 'lodash';
import ini from 'ini';
import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parser = (data, format) => {
  if (!_.has(parsers, format)) {
    throw new Error(`${format} is unknown data format.`);
  }
  const parse = parsers[format];
  return parse(data);
};

export default parser;
