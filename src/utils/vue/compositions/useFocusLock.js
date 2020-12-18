import { ref, computed, watch, onBeforeUnmount, nextTick } from 'vue'
import focusLock from 'dom-focus-lock'

export const useFocusLock = ({ enabled, refLock }, ctx) => {
  let lastFocused = null
  const locked = ref(null)
  const guardTabIndex = computed(() => (enabled.value ? 0 : -1))
  const lockFocus = () => {
    lastFocused = document.activeElement
    nextTick(() => {
      locked.value = true
      ctx.emit('beforeLock')
      focusLock.on(refLock.value)
    })
  }
  const unlockFocus = () => {
    if (!locked.value) {
      return
    }
    locked.value = false
    focusLock.off(refLock.value)
    ctx.emit('afterUnlock')
    nextTick(() => {
      if (lastFocused && lastFocused.focus) {
        lastFocused.focus()
      }
    })
  }
  const toggleLock = enabled => {
    enabled ? lockFocus() : unlockFocus()
  }
  watch(enabled, toggleLock, { immediate: true })
  onBeforeUnmount(() => toggleLock(false))
  return {
    guardTabIndex,
  }
}
