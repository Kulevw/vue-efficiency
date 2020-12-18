import { emptyInputDate } from '@/utils/dateHelpers'
import { factoryUseModule } from '@/utils/vuexHelpers'

const ExampleProfileStore = {
  namespaced: true,
  state: {
    profile: {
      firstName: '',
      middleName: '',
      lastName: '',
      male: null,
      birthDate: emptyInputDate(),
    },
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile
    },
  },
}

export const useExampleProfileStore = factoryUseModule('exampleProfile', ExampleProfileStore)
