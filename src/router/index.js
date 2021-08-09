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
    path: '/lists/:id/items/:listing_id',
    name: 'ListingDetails',
    component: () => import('../views/ListingDetails.vue')
  },
  {
    path: '/maps',
    name: 'Maps',
    component: () => import('../views/Maps.vue'), 
    meta: {
      auth: true
    }
  }, 
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'), 
    meta: {
      guest: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  // this protects meta.auth = true routes from users not logged in, 
  // when not logged in, redirects to the /login route
  // additional handling for meta.auth = guest route for login
  // if the user is in fact logged in
  // took from https://bit.ly/3yajiHV
  if (to.matched.some(record => record.meta.auth)) {
    firebase.auth().onAuthStateChanged(user => { //todo: output from userinfo component?
      if (user) {
        next()
      } else {
        next({
          path: "/login",
        })
      }
    })
  } else if (to.matched.some(record => record.meta.guest)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next({
          path: "/", //todo: redirect to profile page?
        })
      } else {
        next()
      }
    })

  } else {
    next()
  }

})



export default router
