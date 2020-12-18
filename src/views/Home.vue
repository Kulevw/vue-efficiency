<template>
  <Page>
    <div class="container">
      <h1>Home</h1>
      <UIBtn class="mb-2" @click="btnClick">Open</UIBtn>
      <UIInput class="mb-2" />
      <UIBtn @click="showNotify">
        Open popover
      </UIBtn>
      <UISelect
        v-model:value="theme"
        v-model:query="themeQuery"
        :options="themesList"
        placeholder="Выбери элемент"
      />
      <UISelect
        v-model:value="themess"
        v-model:query="themessQuery"
        class="mt-10 pt-10"
        :options="themesList"
        placeholder="Выбери элемент"
        no-auto-close
      />
      <teleport to="#modals">
        <BaseModalContainer v-model:opened="modalOpened">
          <Transition name="t-modal-popup">
            <TemplatePopupModal v-if="modalOpened" class="modal">
              <RouterLink :to="{ name: 'About' }">
                Go to About
              </RouterLink>
            </TemplatePopupModal>
          </Transition>
        </BaseModalContainer>
      </teleport>
    </div>
  </Page>
</template>

<script>
import { ref } from 'vue'
import { showModal, notify } from '@/App'
import Page from '@/components/common/Page'
import BaseModalContainer from '@/components/base/BaseModalContainer'
import UIBtn from '@/components/ui/UIBtn'
import UIInput from '@/components/ui/UIInput'
import TemplatePopupModal from '@/components/modals/templates/TemplatePopupModal'
import ExampleModal from '@/components/modals/ExampleModal'
import UISelect from '@/components/ui/UISelect'

export default {
  components: {
    UISelect,
    TemplatePopupModal,
    UIBtn,
    UIInput,
    BaseModalContainer,
    Page,
  },
  setup() {
    const modalOpened = ref(false)
    const popoverOpened = ref(false)
    const themesList = ref([
      { label: 'Авто1 Авто1 Авто1 Авто1 Авто1 Авто1 Авто1 Авто1  Авто1 Авто1', key: 1 },
      { label: 'Авто2', key: 2 },
      { label: 'Авто3', key: 3 },
      { label: 'Авто4', key: 4 },
      { label: 'Авто5', key: 5 },
      { label: 'Авто6', key: 6 },
      { label: 'Авто7', key: 7 },
    ])
    const theme = ref(null)
    const themess = ref([])
    const themessQuery = ref('')
    const themeQuery = ref('')
    const btnClick = () => {
      const { hide } = showModal({
        component: {
          is: ExampleModal,
          events: {
            close: () => hide(),
          },
        },
      })
    }
    const showNotify = () => {
      notify({ x: 'left', y: 'top' })
      notify({ x: 'left', y: 'center' })
      notify({ x: 'left', y: 'bottom' })

      notify({ x: 'middle', y: 'top' })
      notify({ x: 'middle', y: 'center' })
      notify({ x: 'middle', y: 'bottom' })

      notify({ x: 'right', y: 'top' })
      notify({ x: 'right', y: 'center' })
      notify({ x: 'right', y: 'bottom' })
    }
    return {
      btnClick,
      modalOpened,
      popoverOpened,
      themesList,
      theme,
      themeQuery,
      themess,
      themessQuery,
      showNotify,
    }
  },
}
</script>
