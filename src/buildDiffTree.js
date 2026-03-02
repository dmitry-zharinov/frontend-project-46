import _ from 'lodash'

const isPlainObject = value => _.isPlainObject(value)

const buildDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))

  return keys.map((key) => {
    const has1 = Object.hasOwn(obj1, key)
    const has2 = Object.hasOwn(obj2, key)

    if (!has1 && has2) {
      return { key, type: 'added', value: obj2[key] }
    }
    if (has1 && !has2) {
      return { key, type: 'removed', value: obj1[key] }
    }

    const v1 = obj1[key]
    const v2 = obj2[key]

    if (isPlainObject(v1) && isPlainObject(v2)) {
      return { key, type: 'nested', children: buildDiffTree(v1, v2) }
    }

    if (_.isEqual(v1, v2)) {
      return { key, type: 'unchanged', value: v1 }
    }

    return { key, type: 'changed', oldValue: v1, newValue: v2 }
  })
}

export default buildDiffTree
