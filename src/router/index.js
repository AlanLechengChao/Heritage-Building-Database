import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/buildings',
    name: 'Buildings',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Buildings.vue')
    }
  },
  {
    path: '/lists',
    name: 'Lists', 
    component: () => import('../views/Lists.vue')
  },
  {
    path: '/maps',
    name: 'Maps',
    component: () => import('../views/Maps.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
