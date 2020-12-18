<template>
  <div class="ui-select-wrapper">
    <UIPopover v-model:opened="resultOpened">
      <template #toggle>
        <p v-if="label && !hideLabel" class="ui-input-label">
          <label :for="id">{{ label }}</label>
        </p>
        <label class="ui-input ui-select" @mousedown.prevent="focus">
          <span class="ui-input__inner">
            <input
              ref="refInput"
              class="ui-input__input ui-select__input"
              :class="inputClass"
              :id="id"
              :type="type"
              :value="query"
              :placeholder="placeholderQuery"
              @input="inputQuery"
              @mousedown.stop
              @click="setOpened(!resultOpened)"
              @keydown="keyDown"
              @focusout="setOpened(false)"
            />
            <UIExpandArrow :expanded="resultOpened" class="ui-select__toggle" />
            <span class="ui-input__focus ui-select__focus">
              <span class="ui-input__input ui-select__value">
                <span v-if="displayValue">{{ displayValue }}</span>
                <span v-else class="ui-select__placeholder">
                  {{ placeholder }}
                </span>
              </span>
              <UIExpandArrow :expanded="resultOpened" class="ui-select__toggle invisible" />
            </span>
          </span>
        </label>
      </template>
      <Transition name="t-popover" @after-leave="afterLeave">
        <div
          v-show="resultOpened"
          class="ui-popover__content ui-select__popover-content"
          :class="popoverClass"
          :data-opened="resultOpened"
        >
          <ul class="ui-select__list" @mousedown.prevent>
            <UISelectOption
              v-for="(opt, i) in resultOptions"
              :key="keyOfOption(opt)"
              :index="i"
              :arrow-index="arrowIndex"
              :is-selected="isSelected(opt)"
              :ref="el => refOption(el, i)"
              @click="toggleSelectOption(opt, i)"
            >
              {{ labelOfOption(opt) }}
            </UISelectOption>
            <UIListItem v-if="!resultOptions.length">
              НичегонетloxblratНичегонетloxblratНичегонетloxblratНичегонетloxblratНичегонетloxblrat
            </UIListItem>
          </ul>
        </div>
      </Transition>
    </UIPopover>
    <ul v-if="multiple" class="ui-select__selected-options-list">
      <li v-for="s in normalizeValue" :key="s.key" class="ui-select__selected-option">
        <span class="ui-select__selected-option-label">{{ labelOfOption(s) }}</span>
        <button class="ui-select__selected-option-remove" type="button" @click="unselect(s)">
          <CrossSVG />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
import _isNil from 'lodash/isNil'
import { ref, computed, watch, nextTick, onBeforeUpdate } from 'vue'
import { KeysAssociation } from '@/utils/constants'
import UIPopover from '@/components/ui/UIPopover'
import UIListItem from '@/components/ui/UIListItem'
import UIExpandArrow from '@/components/ui/UIExpandArrow'
import CrossSVG from '@/components/svg/CrossSVG'
import { useRefFocusManagement } from '@/utils/vue/compositions/useRefFocusManagement'
import { useSelect } from '@/utils/vue/compositions/useSelect'
import { useSafeIndexManager } from '@/utils/safeIndexManager'
import { useInputProps } from '@/utils/vue/compositions/useInput'
import UISelectOption from '@/components/ui/UISelectOption'

export default {
  components: {
    UISelectOption,
    UIExpandArrow,
    UIPopover,
    UIListItem,
    CrossSVG,
  },
  props: {
    ...useInputProps,
    value: {
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    query: {
      type: String,
      default: '',
    },
    placeholderQuery: {
      type: String,
      default: 'Введите наименование',
    },
    noClearQuery: {
      type: Boolean,
      default: false,
    },
    noAutoClose: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Function,
      default(query, update, { options, labelOfOption }) {
        if (query === '') {
          return update(options)
        }
        const regex = `^${query.toLowerCase()}.*`
        const filtered = options.filter(opt => {
          return labelOfOption(opt)
            .toLowerCase()
            .match(regex)
        })
        update(filtered)
      },
    },
    keyOfOption: {
      type: Function,
      default(option) {
        return option.key
      },
    },
    valueOfOption: {
      type: Function,
      default(option) {
        return option
      },
    },
    labelOfOption: {
      type: Function,
      default(option) {
        return option.label
      },
    },
    equals: {
      type: Function,
      default: (value, option, { valueOfOption }) => {
        return valueOfOption(value) === valueOfOption(option)
      },
    },
    label: {
      default: '',
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const arrow = useSafeIndexManager(ref(null))
    const { ref: refInput, focus, focused } = useRefFocusManagement()
    const { multiple, normalizeValue, getIndex, isSelected, select, unselect } = useSelect(
      props,
      ctx
    )
    const refsOptions = ref([])
    const opened = ref(false)
    const filtered = ref(props.options)

    const getIndexFiltered = keyOpt => getIndex(keyOpt, resultOptions.value)
    const filter = (query, setFiltered) => {
      props.filter(query, setFiltered, props)
    }

    const popoverClass = computed(() => {
      return {
        'ui-select__popover-content--opened': opened.value,
      }
    })
    const inputClass = computed(() => {
      return {
        'ui-select__input--opened': opened.value,
      }
    })
    const indexValue = computed(() => {
      if (multiple.value) {
        if (!props.value.length) {
          return -1
        }
        return getIndexFiltered(props.value[0])
      }
      if (!props.value) {
        return -1
      }
      return getIndexFiltered(props.value)
    })
    const searchable = computed(() => !_isNil(props.query))
    const type = computed(() => (searchable.value ? 'text' : 'submit'))
    const resultOptions = computed(() => {
      if (searchable.value) {
        return filtered.value
      }
      return props.options
    })
    const resultOpened = computed({
      get: () => {
        // return true
        return !!focused.value && opened.value
      },
      set: opened => setOpened(opened),
    })
    const displayValue = computed(() => {
      if (multiple.value) {
        return ''
      }
      return normalizeValue.value ? props.labelOfOption(normalizeValue.value) : ''
    })
    const arrowIndex = computed(() => arrow.value())

    const setQuery = v => {
      ctx.emit('update:query', v)
    }
    const setOpened = v => (opened.value = v)
    const setFiltered = v => (filtered.value = v)
    const keyDown = e => {
      switch (e.key) {
        case KeysAssociation.ARROW_DOWN:
          if (!resultOpened.value) {
            e.preventDefault()
            return setOpened(true)
          }
          arrow.inc(resultOptions.value.length)
          e.preventDefault()
          break
        case KeysAssociation.ARROW_UP:
          if (!resultOpened.value) {
            e.preventDefault()
            return setOpened(true)
          }
          arrow.dec(resultOptions.value.length)
          e.preventDefault()
          break
        case KeysAssociation.ENTER:
          if (!arrow.isEmpty() && resultOpened.value) {
            const option = resultOptions.value[arrow.value()]
            toggleSelectOption(option, arrow.value())
            e.preventDefault()
          }
          break
        case KeysAssociation.SPACE:
          if (!resultOpened.value) {
            setOpened(true)
            e.preventDefault()
          }
          break
        case KeysAssociation.ESC:
        case KeysAssociation.ESCAPE:
          setOpened(false)
          e.preventDefault()
          break
      }
    }
    const toggleSelectOption = (opt, index) => {
      const selected = isSelected(opt)
      if (selected) {
        if (multiple.value) {
          unselect(opt)
        }
      } else {
        select(opt)
        arrow.unsafeSet(index)
        if (!props.noAutoClose) {
          nextTick(() => setOpened(false))
        }
      }
    }
    const intoViewOptionByIndex = index => {
      if (index === null) {
        return
      }
      nextTick(() => {
        const node = refsOptions.value[index].$el
        scrollIntoView(node, {
          block: 'center',
          inline: 'nearest',
          behavior: 'auto',
        })
      })
    }
    const afterLeave = () => {
      setQuery('')
    }
    const inputQuery = e => {
      setOpened(true)
      setQuery(e.target.value)
    }

    watch(
      () => arrow.value(),
      index => intoViewOptionByIndex(index)
    )
    watch(
      () => props.query,
      query => filter(query, setFiltered)
    )
    watch(
      () => filtered.value,
      filtered => {
        if (!filtered.length) {
          return arrow.clear()
        }
        const index = indexValue.value === -1 ? 0 : indexValue.value
        arrow.unsafeSet(index)
      }
    )
    watch(
      () => resultOpened.value,
      opened => {
        if (opened) {
          nextTick(() => {
            if (!resultOptions.value.length) {
              return
            }
            const index = indexValue.value === -1 ? 0 : indexValue.value
            if (index !== arrow.value()) {
              arrow.unsafeSet(index)
            } else {
              intoViewOptionByIndex(index)
            }
          })
        }
      }
    )
    watch(
      () => focused.value,
      focused => {
        if (!focused) {
          setOpened(false)
        }
      }
    )
    watch(
      () => props.options,
      () => filter(props.query, setFiltered)
    )

    const refOption = (el, index) => {
      if (el) {
        refsOptions.value[index] = el
      }
    }
    onBeforeUpdate(() => (refsOptions.value = []))

    return {
      refInput,
      refsOptions,
      resultOpened,
      multiple,
      displayValue,
      normalizeValue,
      resultOptions,
      type,
      popoverClass,
      focused,
      inputClass,
      arrowIndex,
      refOption,
      setOpened,
      setQuery,
      isSelected,
      select,
      unselect,
      toggleSelectOption,
      focus,
      keyDown,
      inputQuery,
      afterLeave,
    }
  },
}
</script>
