import fs from 'fs'
import path from 'path'
import parse from './parsers.js'
import buildDiffTree from './buildDiffTree.js'
import format from './formatters/index.js'

const getAbsolutePath = filepath => path.resolve(process.cwd(), filepath)
const getFormat = filepath => path.extname(filepath).slice(1)

const readFile = filepath => fs.readFileSync(getAbsolutePath(filepath), 'utf-8')

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)

  const obj1 = parse(data1, getFormat(filepath1))
  const obj2 = parse(data2, getFormat(filepath2))

  const tree = buildDiffTree(obj1, obj2)
  return format(tree, formatName)
}
