<template>
  <div class="base-layout">
    <BaseHeader :menu-opened="menuOpened" @update:menu-opened="setMenuOpened" />
    <BaseModalContainer
      :opened="menuOpened"
      class="base-layout__menu-container"
      no-dismiss-route
      @update:opened="setMenuOpened"
    >
      <Transition name="t-base-menu">
        <BaseMenu v-show="menuOpened" @close="setMenuOpened(false)" />
      </Transition>
    </BaseModalContainer>
    <div class="base-layout__content">
      <slot />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseHeader from '@/components/base/BaseHeader'
import BaseMenu from '@/components/base/BaseMenu'
import BaseModalContainer from '@/components/base/BaseModalContainer'

export default {
  components: { BaseHeader, BaseMenu, BaseModalContainer },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const previousRoute = ref(null)
    const menuOpened = computed(() => route.hash === '#menu')
    const setMenuOpened = opened => {
      if (opened) {
        router.push({
          ...route.value,
          hash: '#menu',
        })
      } else {
        if (previousRoute.value) {
          router.back()
        } else {
          router.push({
            ...route,
            hash: '',
          })
        }
      }
    }
    watch(
      () => route,
      (newRoute, oldRoute) => {
        console.log(oldRoute)
        if (!oldRoute.matched.length) {
          previousRoute.value = oldRoute
        }
      }
    )
    return {
      menuOpened,
      setMenuOpened,
    }
  },
}
</script>
