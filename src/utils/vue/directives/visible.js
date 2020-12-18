const visibleDirective = {
  mounted(el, binding) {
    el.style.visibility = binding.value ? 'visible' : 'hidden'
  },
  updated(el, binding) {
    el.style.visibility = binding.value ? 'visible' : 'hidden'
  },
}

export const useVisibleDirective = app => {
  app.directive('visible', visibleDirective)
}
