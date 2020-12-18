<template>
  <TransitionGroup tag="ul" name="t-notification">
    <component
      v-for="n in notifications"
      :key="`notifications-${n.key}`"
      :is="n.component.is"
      v-bind="n.component.props"
      class="t-notification-item"
      v-on="n.component.props"
      @time-up="n.timeUp"
    >
      {{ x }}, {{ y }}
    </component>
  </TransitionGroup>
</template>

<script>
export default {
  props: {
    notifications: {
      required: true,
      type: Array,
    },
    x: {
      required: true,
    },
    y: {
      required: true,
    },
  },
  setup() {
    return {}
  },
}
</script>
