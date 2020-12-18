import { ref, shallowReactive } from 'vue'

export const useWrapperNotifications = ({ defaultComponent }) => {
  let counter = 0
  const notifications = ref([])
  const notify = ({ is = defaultComponent, props = {}, events = {}, x = 'right', y = 'top' }) => {
    const notification = shallowReactive({
      x,
      y,
      key: counter++,
      timeUp: () => {
        notifications.value = notifications.value.filter(n => n.key !== notification.key)
      },
      component: { is, props, events },
    })
    notifications.value.push(notification)
  }
  return {
    notifications,
    notify,
  }
}
