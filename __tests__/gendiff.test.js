import path from 'path'
import genDiff from '../index.js'

test('gendiff flat json', () => {
  const filepath1 = path.join(process.cwd(), '__fixtures__', 'file1.json')
  const filepath2 = path.join(process.cwd(), '__fixtures__', 'file2.json')

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

  expect(genDiff(filepath1, filepath2)).toBe(expected)
})
