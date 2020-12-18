import { onMounted } from 'vue'

export const useNotificationProps = {
  timeout: {
    type: Number,
    default: 2000,
  },
}

export const useNotificationEmits = {
  ['time-up']: null,
}

export const useNotification = (props, ctx) => {
  onMounted(() => {
    if (props.timeout) {
      setTimeout(() => ctx.emit('time-up'), props.timeout)
    }
  })
}
