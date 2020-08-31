import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  const wholePath1 = path.resolve(process.cwd(), path1);
  const wholePath2 = path.resolve(process.cwd(), path2);
  
  const fileContent1 = fs.readFileSync(wholePath1, 'utf8');
  const fileContent2 = fs.readFileSync(wholePath2, 'utf8');

  const dataFile1 = JSON.parse(fileContent1);
  const dataFile2 = JSON.parse(fileContent2);

  const keysOfFile1 = Object.keys(dataFile1);
  const keysOfFile2 = Object.keys(dataFile2);

  const allSortedKeys = _.uniq([...keysOfFile1, ...keysOfFile2].sort());

  const result = allSortedKeys.map((key) => {
    if (!_.has(dataFile1, key)) {
        return ` + ${key}: ${dataFile2[key]}`;
    }
    if (!_.has(dataFile2, key)) {
        return ` - ${key}: ${dataFile1[key]}`;
    }
    if (dataFile1[key] !== dataFile2[key]) {
        return ` - ${key}: ${dataFile1[key]}\n + ${key}: ${dataFile2[key]}`;
    }
    if (dataFile1[key] === dataFile2[key]) {
        return `   ${key}: ${dataFile1[key]}`;
    }
  });

  console.log(`{\n${result.join('\n')}\n}`);
};

export default genDiff;
