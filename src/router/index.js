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
      return import('../views/Buildings.vue')
    }
  },
  {
    path: '/buildings/:id',
    name: "BuildingDetails",
    component: () => import('../views/BuildingDetails.vue')
  },
  {
    path: '/lists',
    name: 'Lists', 
    component: () => import('../views/Lists.vue')
  },
  {
    path: '/lists/:id',
    name: 'ListDetails',
    component: () => import('../views/ListDetails.vue')
  },
  {
    path: '/maps',
    name: 'Maps',
    component: () => import('../views/Maps.vue'), 
    meta: {
      requiresAuth: true
    }
  }, 
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'), 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
