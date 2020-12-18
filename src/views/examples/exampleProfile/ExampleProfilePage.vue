<template>
  <Page>
    <div class="container">
      <h1 class="mb-3">Профиль</h1>
      <ProfileForm
        :original-profile="profile"
        v-model:has-changed="hasChanged"
        @submit="saveProfile"
      />
    </div>
  </Page>
</template>

<script>
import { ref, computed } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { showModal } from '@/App'
import Page from '@/components/common/Page'
import ProfileForm from '@/views/examples/exampleProfile/ProfileForm'
import PromptModal from '@/components/modals/PromptModal'
import { useExampleProfileStore } from '@/views/examples/exampleProfile/store'

export default {
  components: {
    Page,
    ProfileForm,
  },
  setup() {
    onBeforeRouteLeave((to, from, next) => {
      if (hasChanged.value) {
        const { hide } = showModal({
          component: {
            is: PromptModal,
            events: {
              ok: () => {
                next()
                hide()
              },
              cancel: () => {
                next(false)
                hide()
              },
              close: () => {
                next(false)
                hide()
              },
            },
          },
        })
        return
      }
      next()
    })
    const store = useExampleProfileStore()
    const profile = computed(() => store.state.exampleProfile.profile)
    const hasChanged = ref(false)
    const saveProfile = profile => {
      store.commit('exampleProfile/setProfile', profile)
      hasChanged.value = false
    }
    return {
      profile,
      hasChanged,
      saveProfile,
    }
  },
}
</script>
