import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const makePlain = (diff) => {
  const dataFormat = (data, path = []) => {
    const result = data.flatMap((item) => {
      const actualPath = [...path, item.key];
      const fullPath = actualPath.join('.');
      switch (item.status) {
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(item.newValue)}`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.newValue)}`;
        case 'tree':
          return dataFormat(item.objects, actualPath);
        case 'unchanged':
          return [];
        default:
          throw new Error(`${item.status} is unknown status!`);
      }
    });
    return result.join('\n');
  };
  return dataFormat(diff);
};

export default makePlain;
