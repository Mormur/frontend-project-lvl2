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
        case 'unchanged':
          return `${gap(level)}  ${item.key}: ${formatValue(item.sameValue, level)}`;
        default:
          throw new Error(`${item.status} is unknown status!`);
      }
    });
    return result.join('\n');
  };
  return `{\n${dataFormat(diff)}\n}`;
};

export default makeStylish;
