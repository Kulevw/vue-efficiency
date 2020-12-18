import { createStore } from 'vuex'
import { AppThemes } from '@/utils/constants'

const currentTheme = localStorage.getItem('theme') || AppThemes.Auto

const html = document.querySelector('html')
if (currentTheme) {
  html.classList.add(currentTheme)
}

export const store = createStore({
  state: {
    theme: currentTheme,
  },
  mutations: {
    setTheme(state, theme) {
      localStorage.setItem('theme', theme)
      state.theme = theme
    },
  },
  actions: {},
  modules: {},
})

store.watch(
  state => state.theme,
  (theme, oldTheme) => {
    if (oldTheme) {
      html.classList.remove(oldTheme)
    }
    if (theme) {
      html.classList.add(theme)
    }
  }
)
