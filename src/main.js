import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from '@/router'
import { store } from '@/store'
import '@/css/index.css'
import '@/stylus/index.styl'
import { useDirectives } from '@/utils/vue/directives'
import '@/libs'

export const app = createApp(App)
  .use(store)
  .use(router)

useDirectives(app)

app.mount('#app')
