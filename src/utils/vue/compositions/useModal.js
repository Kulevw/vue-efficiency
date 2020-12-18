import { ref, watch } from 'vue'

const modalCounter = ref(0)

export const useModal = (props, ctx) => {
  const number = ref(0)
  const setOpened = opened => ctx.emit('update:opened', opened)
  const show = () => setOpened(true)
  const hide = () => setOpened(false)
  watch(
    () => props.opened,
    opened => {
      if (opened) {
        number.value = ++modalCounter.value
      } else {
        --modalCounter.value
      }
    },
    { immediate: true }
  )
  return {
    number,
    setOpened,
    show,
    hide,
  }
}
