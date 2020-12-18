import { computed } from 'vue'
import { removeByPredicate } from '@/utils/arrayHelpers'

export const singleSelector = ({ selected, equals, valueOf }) => {
  const isSelected = opt => {
    return equals(selected.value, opt)
  }
  const select = opt => {
    if (!isSelected(opt)) {
      selected.value = valueOf(opt)
    }
  }
  const unselect = opt => {
    if (isSelected(opt)) {
      selected.value = null
    }
  }
  return {
    isSelected,
    select,
    unselect,
  }
}

export const multipleSelector = ({ selected, equals, valueOf }) => {
  const isSelected = opt => {
    return selected.value.some(v => equals(v, opt))
  }
  const select = opt => {
    if (!isSelected(opt)) {
      selected.value = [...selected.value, valueOf(opt)]
    }
  }
  const unselect = opt => {
    if (isSelected(opt)) {
      selected.value = removeByPredicate(selected.value, opt, equals)
    }
  }
  return {
    isSelected,
    select,
    unselect,
  }
}

export const useSelect = (props, ctx) => {
  const multiple = computed(() => Array.isArray(props.value))
  const setValue = value => ctx.emit('update:value', value)
  const equals = (value, opt) => props.equals(value, opt, props)
  const valueOf = opt => props.valueOfOption(opt, props)
  const getIndex = (keyOpt, options = props.options) => {
    return options.findIndex(opt => {
      return equals(keyOpt, opt)
    })
  }
  const normalizeValue = computed(() => {
    if (multiple.value) {
      return props.value.filter(v => {
        return props.options.some(opt => equals(v, opt))
      })
    }
    return props.options.find(opt => equals(props.value, opt))
  })
  const selected = computed({
    get: () => props.value,
    set: value => setValue(value),
  })
  const selectorOptions = {
    selected,
    equals,
    valueOf,
  }
  const selector = computed(() => {
    if (multiple.value) {
      return multipleSelector(selectorOptions)
    }
    return singleSelector(selectorOptions)
  })
  return {
    multiple,
    normalizeValue,
    valueOf,
    equals,
    getIndex,
    setValue,
    isSelected: opt => selector.value.isSelected(opt),
    select: opt => selector.value.select(opt),
    unselect: opt => selector.value.unselect(opt),
  }
}
