import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../views/Top.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import User from '../views/User.vue'
import NeedsRegister from '../views/NeedsRegister.vue'
import NeedsDetail from '../views/NeedsDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'top',
    component: Top
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/needs-register',
    name: 'needs-register',
    component: NeedsRegister
  },
  {
    path: '/needs-detail',
    name: 'needs-detail',
    component: NeedsDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
