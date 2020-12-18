const clickSelfDirective = {
  mounted(el, binding) {
    const isMe = handler => {
      return e => {
        if (e.target === el) {
          handler(e)
        }
      }
    }
    let state = ''
    el.addEventListener(
      'mouseover',
      isMe(() => (state = 'wait'))
    )
    el.addEventListener(
      'mouseout',
      isMe(() => (state = 'idle'))
    )
    el.addEventListener(
      'mousedown',
      isMe(() => (state = 'down'))
    )
    el.addEventListener(
      'mouseup',
      isMe(e => {
        if (state === 'down') {
          binding.value(e)
        }
      })
    )
  },
}

export const useClickSelfDirective = app => {
  app.directive('click-self', clickSelfDirective)
}
