import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../views/Top.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import User from '../views/User.vue'
import NeedsRegister from '../views/NeedsRegister.vue'
import NeedsDetail from '../views/NeedsDetail.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import GoodsRegister from '../views/GoodsRegister.vue'
// import store from '../store/index.js'

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
    component: User,
    // beforeEnter: (to, from, next) => { // [2]
    //   store.dispatch('getNeedsByUserId');
    //   store.dispatch('getGoodsByUserId');
    //   store.dispatch('getDealingGoods');
    //   store.dispatch('getDealingNeeds');
    //   next();
    // },
  },
  {
    path: '/needs-register',
    name: 'needs-register',
    component: NeedsRegister
  },
  {
    path: '/needs-detail/:id',
    name: 'needs-detail',
    component: NeedsDetail,
    props: true
  },
  {
    path: '/needs-edit/:id',
    name: 'needs-edit',
    component: NeedsRegister,
    props: true
  },
  {
    path: '/goods-detail/:id',
    name: 'goods-detail',
    component: GoodsDetail,
    props: true
  },
  {
    path: '/goods-register',
    name: 'goods-register',
    component: GoodsRegister,
    props: true
  },
  {
    path: '/goods-edit/:id',
    name: 'goods-edit',
    component: GoodsRegister,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
