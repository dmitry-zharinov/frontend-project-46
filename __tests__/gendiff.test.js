import path from 'path';
import genDiff from '../index.js';

const getFixturePath = (name) => path.join(process.cwd(), '__fixtures__', name);

const expectedStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('gendiff stylish nested json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expectedStylish);
});

test('gendiff stylish nested yaml', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(expectedStylish);
});

test('gendiff plain nested json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(expectedPlain);
});

test('gendiff plain nested yaml', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toBe(expectedPlain);
});

test('gendiff json formatter returns diff tree', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  const parsed = JSON.parse(result);

  expect(parsed).toEqual(expect.any(Array));

  const commonNode = parsed.find((n) => n.key === 'common');
  expect(commonNode).toMatchObject({ type: 'nested' });

  const group2Node = parsed.find((n) => n.key === 'group2');
  expect(group2Node).toMatchObject({ type: 'removed' });

  const group3Node = parsed.find((n) => n.key === 'group3');
  expect(group3Node).toMatchObject({ type: 'added' });
});

test('gendiff json formatter snapshot', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(JSON.parse(result)).toMatchSnapshot();
});