const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const parse = require('./parse');

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const stringify = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return value;
  return String(value);
};

const buildLines = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.flatMap((key) => {
    const has1 = Object.hasOwn(obj1, key);
    const has2 = Object.hasOwn(obj2, key);

    if (has1 && !has2) {
      return [`  - ${key}: ${stringify(obj1[key])}`];
    }
    if (!has1 && has2) {
      return [`  + ${key}: ${stringify(obj2[key])}`];
    }

    const v1 = obj1[key];
    const v2 = obj2[key];

    if (_.isEqual(v1, v2)) {
      return [`    ${key}: ${stringify(v1)}`];
    }

    return [
      `  - ${key}: ${stringify(v1)}`,
      `  + ${key}: ${stringify(v2)}`,
    ];
  });
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const obj1 = parse(data1, getFormat(filepath1));
  const obj2 = parse(data2, getFormat(filepath2));

  const lines = buildLines(obj1, obj2);

  return `{\n${lines.join('\n')}\n}`;
};

module.exports = genDiff;