import path from 'path';
import yaml from 'js-yaml';

const parser = (file) => {
  const extension = path.extname(file).toLowerCase();
  if (extension === '.json') {
    return JSON.parse;
  }
  return yaml.safeLoad;
};

export default parser;
