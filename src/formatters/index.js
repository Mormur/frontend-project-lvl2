import makeStylish from './stylish.js';
import makePlain from './plain.js';

// const formatters = { stylish: makeStylish, plain: makePlain };
// const makeFormat = (data, format) => formatters[format](data);

const makeFormat = (data, format) => {
  if (format === 'plain') {
    return makePlain(data);
  }
  if (format === 'json') {
    return JSON.stringify(data);
  }
  return makeStylish(data);
};

export default makeFormat;
