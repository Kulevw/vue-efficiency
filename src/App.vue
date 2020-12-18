<template>
  <component :is="layout">
    <RouterView />
  </component>
  <div id="modals">
    <ModalsPresenter :modals="modals" />
  </div>
  <Notifications :notifications="notifications" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useWrapperModals } from '@/utils/vue/compositions/useWrapperModals'
import { useWrapperNotifications } from '@/utils/vue/compositions/useWrapperNotifications'
import BaseModalContainer from '@/components/base/BaseModalContainer'
import ModalsPresenter from '@/components/common/ModalsPresenter'
import Notifications from '@/components/common/Notifications'
import BaseNotification from '@/components/base/BaseNotification'

const wrapperModals = useWrapperModals({
  defaultContainer: BaseModalContainer,
})
export const showModal = wrapperModals.showModal

const wrapperNotifications = useWrapperNotifications({
  defaultComponent: BaseNotification,
})
export const notify = wrapperNotifications.notify

const layouts = {
  BaseLayout: defineAsyncComponent(() => import('@/components/layouts/BaseLayout.vue')),
}

export default {
  components: {
    ModalsPresenter,
    Notifications,
    ...layouts,
  },
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout || 'BaseLayout')
    return {
      layout,
      ...wrapperModals,
      ...wrapperNotifications,
    }
  },
}
</script>
