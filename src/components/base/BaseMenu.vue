<template>
  <div class="base-menu px-3">
    <div class="base-menu__head row align-items-center">
      <div class="col"></div>
      <div class="col-auto">
        <UIBtn class="base-menu__close" @click="close">
          <CloseSVG />
        </UIBtn>
      </div>
    </div>
    <div class="base-menu__body py-2">
      <div class="d-flex justify-content-between">
        <UIRadio
          v-for="[name, value] in themesList"
          :key="`theme-${name}`"
          :option="value"
          :value="theme"
          class="mb-2"
          @update:value="setTheme"
        >
          {{ name }}
        </UIRadio>
      </div>
      <RouterLink class="ui-link" :to="{ name: 'About' }">About</RouterLink>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { store } from '@/store'
import UIBtn from '@/components/ui/UIBtn'
import UIRadio from '@/components/ui/UIRadio'
import CloseSVG from '@/components/svg/CrossSVG'
import { AppThemes } from '@/utils/constants'

export default {
  components: {
    UIBtn,
    UIRadio,
    CloseSVG,
  },
  setup(props, ctx) {
    const checked = ref(null)
    const themesList = ref(Object.entries(AppThemes))
    const theme = computed(() => store.state.theme)
    const setTheme = theme => store.commit('setTheme', theme)
    const close = () => ctx.emit('close')
    return {
      themesList,
      theme,
      checked,
      setTheme,
      close,
    }
  },
}
</script>
