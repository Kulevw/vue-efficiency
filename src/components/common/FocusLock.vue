<template>
  <div>
    <span class="focus-hidden-guard" :tabindex="guardTabIndex"></span>
    <div ref="refLock">
      <slot />
    </div>
    <span class="focus-hidden-guard" :tabindex="guardTabIndex"></span>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useFocusLock } from '@/utils/vue/compositions/useFocusLock'

export default {
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const refLock = ref(null)
    return {
      refLock,
      ...useFocusLock(
        {
          enabled: computed(() => props.enabled),
          refLock,
        },
        ctx
      ),
    }
  },
}
</script>
