<template>
  <UIListItem v-bind="$attrs" class="ui-select__item" :class="optionClass">
    <CheckmarkSVG class="ui-select__item-checkmark" />
    <slot />
  </UIListItem>
</template>

<script>
import { computed } from 'vue'
import UIListItem from '@/components/ui/UIListItem'
import CheckmarkSVG from '@/components/svg/CheckmarkSVG'

export default {
  components: {
    UIListItem,
    CheckmarkSVG,
  },
  props: {
    index: {
      required: true,
      type: Number,
    },
    arrowIndex: {
      required: true,
    },
    isSelected: {
      required: true,
      type: Boolean,
    },
  },
  setup(props) {
    const optionClass = computed(() => {
      return {
        'ui-select__item--arrow': props.index === props.arrowIndex,
        'ui-select__item--selected': props.isSelected,
      }
    })
    return {
      optionClass,
    }
  },
}
</script>
