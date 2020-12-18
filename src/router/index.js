import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/examples',
    name: 'examples',
    component: () => import('@/views/examples/ExamplesPage.vue'),
  },
  {
    path: '/examples/profile',
    name: 'examples.profile',
    component: () => import('@/views/examples/exampleProfile/ExampleProfilePage.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})
