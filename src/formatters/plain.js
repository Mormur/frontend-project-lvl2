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
  const dataFormat = (data, path = []) => data.flatMap(({
    key, type, oldValue, newValue, objects,
  }) => {
    const actualPath = [...path, key];
    const fullPath = actualPath.join('.');
    switch (type) {
      case 'deleted':
        return `Property '${fullPath}' was removed`;
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(newValue)}`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      case 'tree':
        return dataFormat(objects, actualPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`${type} is unknown status!`);
    }
  }).join('\n');
  return dataFormat(diff);
};

export default makePlain;
