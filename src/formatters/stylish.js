const dataFormat = (data) => {
  const gap = '  ';
  const result = data.map((item) => {
    if (item.status === 'added') {
      return `${gap}+ ${item.key}: ${item.newValue}`;
    }
    if (item.status === 'changed') {
      return `${gap}- ${item.key}: ${item.oldValue}\n${gap}+ ${item.key}: ${item.newValue}`;
    }
    if (item.status === 'deleted') {
      return `${gap}- ${item.key}: ${item.oldValue}`;
    }
    if (item.status === 'tree') {
      return `${item.key}: {\n${dataFormat(item.objects)}\n}`;
    }
    return `${gap}  ${item.key}: ${item.sameValue}`;
  });

  console.log(result.join('\n'));
  return result.join('\n');
};

const makeFormat = (data) => `{\n${dataFormat(data)}\n}`;

export default makeFormat;
