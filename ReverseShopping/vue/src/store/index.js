import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn : false,
    needsDataList : [
      {
        'id': '1',
        'name': 'need1',
        'price': 10000,
        'number': '1',
        'deadline': '2020/3/31',
        'description': 'need1です。',
        'image': require('../assets/image001.jpg')
      },
      {
        'id': '2',
        'name': 'need2',
        'price': 20000,
        'number': '1',
        'deadline': '2020/3/31',
        'description': 'need2です。',
        'image': require('../assets/image002.jpg')
      },
      {
        'id': '3',
        'name': 'need3',
        'price': 30000,
        'number': '1',
        'deadline': '2020/3/31',
        'description': 'need3です。',
        'image': require('../assets/image003.jpg')
      },
    ],
    loginUserData: {
        'id': '1',
        'name': 'hoge',
        'nickname': 'fuga',
        'address': '東京都台東区上野1-17-6',
        'tel': '03-3833-0733',
        'email': 'asdjdahaj@aksj.jp',
        'settlement_info': '*************',
        'image': require('../assets/user_no_image.jpg')
    }
  },
  mutations: {
    signIn(state) {
      state.isLoggedIn = true;
    },
    signOut(state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
