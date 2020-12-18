<template>
  <header class="base-header">
    <div class="container">
      <div class="base-header__inner row align-items-center">
        <div class="col"></div>
        <div class="col-auto">
          <UIBtn class="base-header__button-menu" @click="setMenuOpened(!menuOpened)">
            <BurgerSVG />
          </UIBtn>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import BurgerSVG from '@/components/svg/BurgerMenuSVG'
import UIBtn from '@/components/ui/UIBtn'
import { useSync } from '@/utils/vue/compositions/useSync'

export default {
  components: {
    UIBtn,
    BurgerSVG,
  },
  props: {
    menuOpened: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, ctx) {
    const setMenuOpened = useSync('menuOpened', ctx)
    return {
      setMenuOpened,
    }
  },
}
</script>
