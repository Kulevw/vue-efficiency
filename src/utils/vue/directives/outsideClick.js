const isOutside = (el, handler) => {
  return e => {
    const path = e.path || (e.composedPath && e.composedPath())
    const isClickOutside = path ? path.indexOf(el) < 0 : !el.contains(e.target)
    if (!isClickOutside) {
      return
    }
    handler(e)
  }
}

const normalizeValue = (el, { value }) => {
  return {
    handler: isOutside(el, value),
  }
}

const outsideClickDirective = {
  beforeMount(el, binding) {
    el.__outsideClick = normalizeValue(el, binding)
  },
  mounted(el) {
    const options = el.__outsideClick
    window.addEventListener('click', options.handler)
  },
  unmounted(el) {
    const options = el.__outsideClick
    window.removeEventListener('click', options.handler)
    delete el.__outsideClick
  },
}

export const useOutsideClickDirective = app => {
  app.directive('click-outside', outsideClickDirective)
}
