import { ref, watch, onMounted } from 'vue'

export const useRefFocusManagement = () => {
  const refElement = ref(null)
  const focused = ref(null)
  onMounted(() => {
    if (refElement.value) {
      refElement.value.addEventListener('focus', () => (focused.value = true))
      refElement.value.addEventListener('blur', () => (focused.value = false))
    }
  })
  watch(
    () => focused.value,
    () => {}
  )
  return {
    ref: refElement,
    focused,
    focus: () => refElement.value.focus(),
    blur: () => refElement.value.blur(),
  }
}
