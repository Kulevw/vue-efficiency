<template>
  <li class="base-notification">
    <slot />
  </li>
</template>

<script>
import {
  useNotificationProps,
  useNotificationEmits,
  useNotification,
} from '@/utils/vue/compositions/useNotification'

export default {
  props: {
    ...useNotificationProps,
  },
  emits: {
    ...useNotificationEmits,
  },
  setup(props, ctx) {
    useNotification(props, ctx)
  },
}
</script>
