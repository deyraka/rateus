import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import Login from '@/views/Login.vue'
import RankBoard from '@/views/RankBoard.vue'
import Profile from '@/views/Profile.vue'
import ListGuest from '@/views/ListGuest.vue'
import GuestHome from '@/views/GuestHome.vue'
import Ticket from '@/views/Ticket.vue'
import Rating from '@/views/Rating.vue'
import Tracking from '@/views/Tracking.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import TicketAdmin from '@/views/TicketAdmin.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'root',
    component: GuestLayout,
    children: [
      {
        path: '',
        name: 'guesthome',
        component: GuestHome,
        meta: { guest: true }
      },
      {
        path: 'ticket',
        name: 'ticket',
        component: Ticket,
        meta: { guest: true }
      },
      {
        path: 'tracking/:noticket',
        name: 'tracking',
        component: Tracking,
        meta: { guest: true }
      },
      {
        path: 'rating/:noticket',
        name: 'rating',
        component: Rating,
        meta: { guest: true },
        props: true
      }
    ]
  },
  {
    path: '/h/',
    // name: 'admin',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'home',
        component: RankBoard
      },
      {
        path: 'ticket',
        name: 'openticket',
        component: TicketAdmin
      },
      {
        path: 'admin-ticket',
        name: 'adminticket',
        component: Ticket
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile
      },
      {
        path: 'list-guest',
        name: 'list-guest',
        component: ListGuest,
        meta: { requiresAuth: true }
      },
      {
        path: 'about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },
  {
    path: '/auth',
    // name: 'auth',
    component: LoginLayout,
    meta: { guest: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      }
    ]
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if user is authenticated
    // if not, redirect to login page.
    if (store.getters['userAuth/isAuthenticated']) {
      next()
    } else {
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next() // make sure to always call next()!
  }
})
router.beforeEach((to, from, next) => {
  // this route requires no auth (alias guest), then check if user is authenticated
  // if yes, redirect to admin homepage. If no, redirect to destination route
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters['userAuth/isAuthenticated']) {
      next({
        path: '/h/list-guest',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
