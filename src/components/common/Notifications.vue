<template>
  <div class="notifications">
    <div v-for="b in blocks" :key="b.class" class="notifications__block" :class="b.class">
      <NotificationsPresenter :notifications="b.notifications.value" :x="b.x" :y="b.y" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import NotificationsPresenter from '@/components/common/NotificationsPresenter'

export default {
  components: { NotificationsPresenter },
  props: {
    notifications: {
      required: true,
      type: Array,
    },
  },
  setup(props) {
    const byAlignments = (x, y) => {
      return props.notifications.filter(n => {
        return n.x === x && n.y === y
      })
    }
    const positions = [
      ['left', 'top'],
      ['left', 'center'],
      ['left', 'bottom'],

      ['middle', 'top'],
      ['middle', 'center'],
      ['middle', 'bottom'],

      ['right', 'top'],
      ['right', 'center'],
      ['right', 'bottom'],
    ]
    const blocks = positions.map(([x, y]) => {
      return {
        x,
        y,
        class: `notifications__block--${x} notifications__block--${y}`,
        notifications: computed(() => byAlignments(x, y)),
      }
    })
    console.log(blocks)
    return { blocks }
  },
}
</script>
