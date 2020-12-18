<template>
  <TemplatePopupModal v-bind="$attrs" class="example-modal" @close="close">
    <template #title>
      <p>Example modal</p>
    </template>
    <div class="example-modal__actions">
      <button
        v-for="(action, i) in actions"
        :key="i"
        class="example-modal__modal-open"
        @click="showExampleModal(action)"
      ></button>
    </div>
    <RouterLink to="/about">About</RouterLink>
  </TemplatePopupModal>
</template>

<script>
import TemplatePopupModal from '@/components/modals/templates/TemplatePopupModal'
import { showModal } from '@/App'

const ExampleModal = {
  name: 'ExampleModal',
  components: {
    TemplatePopupModal,
  },
  setup(props, ctx) {
    const close = () => ctx.emit('close')
    const actions = [
      ['start', 'start'],
      ['start', 'center'],
      ['start', 'end'],
      ['center', 'start'],
      ['center', 'center'],
      ['center', 'end'],
      ['end', 'start'],
      ['end', 'center'],
      ['end', 'end'],
    ]
    const showExampleModal = ([x, y]) => {
      const { hide, remove } = showModal({
        component: {
          is: ExampleModal,
          events: {
            close: () => hide(),
          },
        },
        container: {
          props: {
            class: [`justify-content-${x}`, `align-items-${y}`],
          },
        },
        transition: {
          props: {
            name: 't-modal-popup',
          },
          events: {
            afterLeave: () => remove(),
          },
        },
      })
    }
    return {
      actions,
      close,
      showExampleModal,
    }
  },
}
export default ExampleModal
</script>
