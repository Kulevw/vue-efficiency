<template>
  <div ref="refPopover" tabindex="-1" v-click-outside="hide" class="ui-popover" @focusout="hide">
    <div class="ui-popover__toggle">
      <slot name="toggle"></slot>
    </div>
    <slot :mousedown="mousedown"></slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useSync } from '@/utils/vue/compositions/useSync'

export default {
  props: {
    opened: {
      required: true,
      type: Boolean,
    },
    contentClass: {
      type: [String, Array, Object],
      default: '',
    },
  },
  setup(props, ctx) {
    const refPopover = ref(null)
    const setOpened = useSync('opened', ctx)
    const show = () => setOpened(true)
    const hide = () => setOpened(false)
    const mousedown = e => e.target.focus()
    return {
      refPopover,
      setOpened,
      show,
      hide,
      mousedown,
    }
  },
}
</script>
