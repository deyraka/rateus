import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import Login from '@/views/Login.vue'
import RankBoard from '@/views/RankBoard.vue'
import Profile from '@/views/Profile.vue'
import PageNotFound from '@/views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: RankBoard
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginLayout,
    children: [
      {
        path: '',
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
