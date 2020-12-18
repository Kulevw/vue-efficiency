import { useClickSelfDirective } from '@/utils/vue/directives/selfClick'
import { useOutsideClickDirective } from '@/utils/vue/directives/outsideClick'
import { useVisibleDirective } from '@/utils/vue/directives/visible'

export const useDirectives = app => {
  useClickSelfDirective(app)
  useOutsideClickDirective(app)
  useVisibleDirective(app)
}
