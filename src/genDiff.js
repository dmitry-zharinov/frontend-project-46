const fs = require('fs');
const path = require('path');
const parse = require('./parse');

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFormat = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const parsed1 = parse(data1, getFormat(filepath1));
  const parsed2 = parse(data2, getFormat(filepath2));

  const result = {
    format: formatName,
    file1: parsed1,
    file2: parsed2,
  };

  return JSON.stringify(result, null, 2);
};

module.exports = genDiff;