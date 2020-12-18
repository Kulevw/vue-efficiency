export const removeByPredicate = (array, item, predicate = (x, y) => x === y) => {
  const index = array.findIndex(v => predicate(v, item))
  if (index === -1) {
    return array
  }
  return [...array.slice(0, index), ...array.slice(index + 1)]
}
