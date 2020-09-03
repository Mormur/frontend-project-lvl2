import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';

const parser = (file) => {
  const extension = path.extname(file).toLowerCase();
  if (extension === '.json') {
    return JSON.parse;
  }
  if (extension === '.ini') {
    return ini.parse;
  }
  return yaml.safeLoad;
};

export default parser;
