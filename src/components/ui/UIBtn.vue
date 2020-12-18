<template>
  <button v-bind="$attrs" class="ui-btn" :class="buttonClass" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const buttonClass = computed(() => ({
      'ui-btn--outlined': props.outlined,
      'ui-btn--flat': props.flat,
    }))
    return {
      buttonClass,
    }
  },
}
</script>
