<template>
  <FocusLock :enabled="opened" @beforeLock="beforeFocusLock" @afterUnlock="afterFocusUnlock">
    <div ref="refContainer" class="base-modal-container" :style="containerStyle" :inert="!opened">
      <Transition appear name="t-fade">
        <div v-if="opened" class="base-modal-container__background"></div>
      </Transition>
      <div
        ref="refInner"
        :tabindex="innerTabIndex"
        v-bind="$attrs"
        v-click-self="hide"
        class="base-modal-container__inner"
        @focusin="focusIn"
        @keydown="keyDownHandler"
      >
        <slot />
      </div>
    </div>
  </FocusLock>
</template>

<script>
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { useModal } from '@/utils/vue/compositions/useModal'
import FocusLock from '@/components/common/FocusLock'

export default {
  components: {
    FocusLock,
  },
  props: {
    opened: {
      required: true,
      type: Boolean,
    },
    noDismissRoute: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const { number, hide } = useModal(props, ctx)
    const refContainer = ref(null)
    const refInner = ref(null)
    const innerTabIndex = ref(-1)
    const router = useRouter()

    const containerStyle = computed(() => {
      return {
        pointerEvents: props.opened ? 'auto' : 'none',
        zIndex: 1000 + number.value,
        overflowX: 'hidden',
      }
    })

    const focusIn = () => (innerTabIndex.value = -1)
    const beforeFocusLock = () => refInner.value.focus()
    const afterFocusUnlock = () => refInner.value.focus()
    const keyDownHandler = e => {
      if (e.key === 'Escape' && !e.defaultPrevented) {
        hide()
      }
    }
    const toggleBodyScroll = enabled => {
      enabled ? enableBodyScroll(refContainer.value) : disableBodyScroll(refContainer.value)
    }
    watch(
      () => props.opened,
      opened => {
        if (opened) {
          innerTabIndex.value = 0
          nextTick(() => toggleBodyScroll(false))
        } else {
          innerTabIndex.value = -1
          nextTick(() => toggleBodyScroll(true))
        }
      },
      { immediate: true }
    )
    watch(
      () => router.currentRoute.value,
      () => {
        if (!props.noDismissRoute) {
          hide()
        }
      }
    )
    onBeforeUnmount(() => toggleBodyScroll(false))
    return {
      refContainer,
      refInner,
      innerTabIndex,
      containerStyle,
      focusIn,
      keyDownHandler,
      beforeFocusLock,
      afterFocusUnlock,
      hide,
    }
  },
}
</script>
