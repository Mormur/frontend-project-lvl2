import _ from 'lodash';

const getDiff = (dataOfFile1, dataOfFile2) => {
  const keysOfFile1 = Object.keys(dataOfFile1);
  const keysOfFile2 = Object.keys(dataOfFile2);

  const allSortedKeys = _.sortBy(_.union(keysOfFile1, keysOfFile2));

  const result = allSortedKeys.map((key) => {
    if (_.isObject(dataOfFile1[key]) && _.isObject(dataOfFile2[key])) {
      return {
        key,
        type: 'tree',
        objects: getDiff(dataOfFile1[key], dataOfFile2[key]),
      };
    }
    if (!_.has(dataOfFile1, key)) {
      return {
        key,
        type: 'added',
        newValue: dataOfFile2[key],
      };
    }
    if (!_.has(dataOfFile2, key)) {
      return {
        key,
        type: 'deleted',
        oldValue: dataOfFile1[key],
      };
    }
    if (dataOfFile1[key] !== dataOfFile2[key]) {
      return {
        key,
        type: 'changed',
        oldValue: dataOfFile1[key],
        newValue: dataOfFile2[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      sameValue: dataOfFile1[key],
    };
  });
  return result;
};

export default getDiff;
