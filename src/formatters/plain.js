import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]'
  if (value === null) return 'null'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const plain = (tree) => {
  const iter = (nodes, parentPath) => {
    const lines = nodes.flatMap((node) => {
      const propertyPath = parentPath ? `${parentPath}.${node.key}` : node.key

      switch (node.type) {
        case 'nested':
          return iter(node.children, propertyPath)

        case 'unchanged':
          return []

        case 'added':
          return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`

        case 'removed':
          return `Property '${propertyPath}' was removed`

        case 'changed':
          return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`

        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })

    return lines
  }

  return iter(tree, '').join('\n')
}

export default plain
