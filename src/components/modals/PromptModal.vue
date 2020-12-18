<template>
  <TemplatePopupModal @close="close">
    <template #title>
      <h2>Есть не сохраненные изменения</h2>
    </template>
    <p class="mt-5">При выходе без сохранения прогресс будет утерян</p>
    <div class="prompt-modal__actions mt-10">
      <UIBtn class="prompt-modal__ok" outlined @click="cancel">Отмена</UIBtn>
      <UIBtn class="prompt-modal__cancel" @click="ok">Ок</UIBtn>
    </div>
  </TemplatePopupModal>
</template>

<script>
import TemplatePopupModal from '@/components/modals/templates/TemplatePopupModal'
import UIBtn from '@/components/ui/UIBtn'
export default {
  components: { UIBtn, TemplatePopupModal },
  setup(props, ctx) {
    const ok = () => ctx.emit('ok')
    const cancel = () => ctx.emit('cancel')
    const close = () => ctx.emit('close')
    return {
      ok,
      cancel,
      close,
    }
  },
}
</script>
