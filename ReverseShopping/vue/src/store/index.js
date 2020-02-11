import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn : false,
    needsDataList : [
      {
        'id': '1',
        'user_id': '1',
        'item_name': 'good1',
        'price': 10000,
        'quantitiy': '1',
        'start_at': '2020-02-01',
        'end_at': '2020-03-31',
        'note': 'good1です。',
        'image_path': require('../assets/image001.jpg')
      },
      {
        'id': '2',
        'user_id': '2',
        'item_name': 'good2',
        'price': 20000,
        'quantitiy': '1',
        'start_at': '2020-02-01',
        'end_at': '2020-03-31',
        'note': 'good2です。',
        'image_path': require('../assets/image002.jpg')
      },
      {
        'id': '3',
        'user_id': '1',
        'item_name': 'good3',
        'price': 30000,
        'quantitiy': '1',
        'start_at': '2020-02-01',
        'end_at': '2020-03-31',
        'note': 'good3です。',
        'image_path': require('../assets/image003.jpg')
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
    },
    GoodsDataList: [
      {
        'id': '1',
        'user_id': '1',
        'need_id': '1',
        'price': 30000,
        'image_path': require('../assets/image003.jpg')
      },
      {
        'id': '2',
        'user_id': '2',
        'need_id': '1',
        'price': 30000,
        'image_path': require('../assets/image003.jpg')
      },
      {
        'id': '3',
        'user_id': '2',
        'need_id': '1',
        'price': 30000,
        'image_path': require('../assets/image003.jpg')
      },
      {
        'id': '4',
        'user_id': '1',
        'need_id': '2',
        'price': 30000,
        'image_path': require('../assets/image003.jpg')
      },
    ]
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
