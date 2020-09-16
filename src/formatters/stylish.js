import _ from 'lodash';

const gap = (level) => '  '.repeat(level);

const formatValue = (value, level) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const formatedValue = keys.map((key) => `${key}: ${formatValue(value[key], level + 2)}`);
  return `{\n${gap(level + 3)}${formatedValue.join(`\n${gap(level + 3)}`)}\n${gap(level + 1)}}`;
};

const makeStylish = (diff) => {
  const dataFormat = (data, level = 1) => data.map(({
    key, type, sameValue, oldValue, newValue, objects,
  }) => {
    switch (type) {
      case 'added':
        return `${gap(level)}+ ${key}: ${formatValue(newValue, level)}`;
      case 'changed':
        return `${gap(level)}- ${key}: ${formatValue(oldValue, level)}\n${gap(level)}+ ${key}: ${formatValue(newValue, level)}`;
      case 'deleted':
        return `${gap(level)}- ${key}: ${formatValue(oldValue, level)}`;
      case 'tree':
        return `${gap(level + 1)}${key}: {\n${dataFormat(objects, level + 2)}\n${gap(level + 1)}}`;
      case 'unchanged':
        return `${gap(level)}  ${key}: ${formatValue(sameValue, level)}`;
      default:
        throw new Error(`${type} is unknown type!`);
    }
  }).join('\n');
  return `{\n${dataFormat(diff)}\n}`;
};

export default makeStylish;
