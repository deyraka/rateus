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
import Tracking from '@/views/Tracking.vue'
import PageNotFound from '@/views/PageNotFound.vue'

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
        component: GuestHome
      },
      {
        path: 'ticket',
        name: 'ticket',
        component: Ticket
      },
      {
        path: 'tracking',
        name: 'tracking',
        component: Tracking
      }
    ]
  },
  {
    path: '/h/',
    // name: 'admin',
    component: AppLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: RankBoard
      },
      {
        path: 'ticket',
        name: 'openticket',
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
        component: ListGuest
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

export default router
