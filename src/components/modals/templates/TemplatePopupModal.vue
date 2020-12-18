<template>
  <div class="template-popup-modal">
    <div class="template-popup-modal__head">
      <UIBtn class="template-popup-modal__close" @click="close">
        <CloseSVG />
      </UIBtn>
      <slot name="title" />
    </div>
    <slot />
  </div>
</template>
<script>
import UIBtn from '@/components/ui/UIBtn'
import CloseSVG from '@/components/svg/CrossSVG'

export default {
  components: {
    UIBtn,
    CloseSVG,
  },
  setup(props, ctx) {
    const close = () => ctx.emit('close')
    return {
      close,
    }
  },
}
</script>
