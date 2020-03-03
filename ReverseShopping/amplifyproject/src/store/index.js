import Vue from 'vue'
import Vuex from 'vuex'
import needsModule from './needs.js'
import goodsModule from './goods.js'
import userModule from './user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn : false,
  },
  mutations: {
    signIn(state) {
      state.isLoggedIn = true;
    },
    cancelSignIn(state) {
      state.isLoggedIn = false;
    },
    signOut(state) {
      state.isLoggedIn = false;
    },
  },
  modules: {
    needs: needsModule,
    goods: goodsModule,
    user: userModule
  }
})
