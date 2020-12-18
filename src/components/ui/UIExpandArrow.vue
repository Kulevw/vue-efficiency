<template>
  <ArrowSVG class="ui-expand-arrow" :class="arrowClass" />
</template>

<script>
import { computed } from 'vue'
import ArrowSVG from '@/components/svg/ToggleArrowSVG'

export default {
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ArrowSVG,
  },
  setup(props) {
    const arrowClass = computed(() => ({
      'ui-expand-arrow--expanded': props.expanded,
    }))
    return {
      arrowClass,
    }
  },
}
</script>
