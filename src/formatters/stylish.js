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

const dataFormat = (data, level = 1) => {
  const result = data.flatMap((item) => {
    switch (item.status) {
      case 'added':
        return `${gap(level)}+ ${item.key}: ${formatValue(item.newValue, level)}`;
      case 'changed':
        return `${gap(level)}- ${item.key}: ${formatValue(item.oldValue, level)}\n${gap(level)}+ ${item.key}: ${formatValue(item.newValue, level)}`;
      case 'deleted':
        return `${gap(level)}- ${item.key}: ${formatValue(item.oldValue, level)}`;
      case 'tree':
        return `${gap(level + 1)}${item.key}: {\n${dataFormat(item.objects, level + 2)}\n${gap(level + 1)}}`;
      default:
        return `${gap(level)}  ${item.key}: ${formatValue(item.sameValue, level)}`;
    }
  });
  return result.join('\n');
};

const makeStylish = (data) => `{\n${dataFormat(data)}\n}`;

export default makeStylish;
