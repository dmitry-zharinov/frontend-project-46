import _ from 'lodash'

const makeIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    if (value === null) return 'null'
    if (typeof value === 'boolean') return String(value)
    return String(value)
  }

  const entries = Object.entries(value)
  const lines = entries.map(([key, val]) => {
    const indent = ' '.repeat(depth * 4)
    return `${indent}${key}: ${stringify(val, depth + 1)}`
  })

  return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`
}

const formatStylish = (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.flatMap((node) => {
      const indent = makeIndent(depth)

      switch (node.type) {
        case 'nested':
          return `${' '.repeat(depth * 4)}${node.key}: {\n${iter(node.children, depth + 1)}\n${' '.repeat(depth * 4)}}`
        case 'unchanged':
          return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`
        case 'removed':
          return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`
        case 'changed':
          return [
            `${indent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
            `${indent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
          ]
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })

    // bracketIndent тут не используется напрямую, оставил переменную как подсказку структуры
    return lines.join('\n')
  }

  return `{\n${iter(tree, 1)}\n}`
}

export default formatStylish
