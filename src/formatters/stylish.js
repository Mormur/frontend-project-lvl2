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
    if (item.status === 'added') {
      return `${gap(level)}+ ${item.key}: ${formatValue(item.newValue, level)}`;
    }
    if (item.status === 'changed') {
      return `${gap(level)}- ${item.key}: ${formatValue(item.oldValue, level)}\n${gap(level)}+ ${item.key}: ${formatValue(item.newValue, level)}`;
    }
    if (item.status === 'deleted') {
      return `${gap(level)}- ${item.key}: ${formatValue(item.oldValue, level)}`;
    }
    if (item.status === 'tree') {
      return `${gap(level + 1)}${item.key}: {\n${dataFormat(item.objects, level + 2)}\n${gap(level + 1)}}`;
    }
    return `${gap(level)}  ${item.key}: ${formatValue(item.sameValue, level)}`;
  });

  return result.join('\n');
};

const makeFormat = (data) => `{\n${dataFormat(data)}\n}`;

export default makeFormat;
