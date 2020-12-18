export const useSafeIndexManager = index => {
  const inc = length => {
    if (!length) {
      return clear()
    }
    const i = index.value === null ? -1 : index.value
    index.value = (i + 1) % length
  }
  const dec = length => {
    if (!length) {
      return clear()
    }
    const i = index.value === null ? 0 : index.value
    index.value = (length - 1 + i) % length
  }
  const value = () => index.value
  const isEmpty = () => index.value === null
  const unsafeSet = v => (index.value = v)
  const clear = () => (index.value = null)
  return {
    inc,
    dec,
    value,
    isEmpty,
    unsafeSet,
    clear,
  }
}
