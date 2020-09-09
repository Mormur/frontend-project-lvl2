import _ from 'lodash';

const getDiff = (dataOfFile1, dataOfFile2) => {
  const keysOfFile1 = Object.keys(dataOfFile1);
  const keysOfFile2 = Object.keys(dataOfFile2);

  const allSortedKeys = _.uniq([...keysOfFile1, ...keysOfFile2].sort());

  const result = allSortedKeys.map((key) => {
    if (_.isObject(dataOfFile1[key]) && _.isObject(dataOfFile2[key])) {
      return {
        key,
        status: 'tree',
        objects: getDiff(dataOfFile1[key], dataOfFile2[key]),
      };
    }
    if (!_.has(dataOfFile1, key)) {
      return {
        key,
        status: 'added',
        newValue: dataOfFile2[key],
      };
    }
    if (!_.has(dataOfFile2, key)) {
      return {
        key,
        status: 'deleted',
        oldValue: dataOfFile1[key],
      };
    }
    if (dataOfFile1[key] !== dataOfFile2[key]) {
      return {
        key,
        status: 'changed',
        oldValue: dataOfFile1[key],
        newValue: dataOfFile2[key],
      };
    }
    return {
      key,
      status: 'unchanged',
      sameValue: dataOfFile1[key],
    };
  });
  return result;
};

export default getDiff;
