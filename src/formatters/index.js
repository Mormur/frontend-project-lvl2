import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatters = { stylish: makeStylish, plain: makePlain, json: JSON.stringify };
const makeFormat = (data, format) => formatters[format](data);

export default makeFormat;
