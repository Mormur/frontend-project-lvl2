import makeStylish from './stylish.js';
import makePlain from './plain.js';

// const formatters = { stylish: makeStylish, plain: makePlain };
// const makeFormat = (data, format) => formatters[format](data);

const makeFormat = (data, format) => {
  switch (format) {
    case 'plain':
      return makePlain(data);
    case 'stylish':
      return makeStylish(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`${format} is unknown format!`);
  }
};

export default makeFormat;
