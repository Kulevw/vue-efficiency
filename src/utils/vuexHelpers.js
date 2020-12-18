import { onUnmounted } from 'vue'
import { useStore } from 'vuex'

export const factoryUseModule = (name, module) => {
  return () => {
    const store = useStore()
    store.registerModule(name, module)
    onUnmounted(() => {
      store.unregisterModule(name)
    })
    return store
  }
}
