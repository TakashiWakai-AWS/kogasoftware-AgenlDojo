import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn : false,
    needsDataList : [],
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
    },
    getNeeds(state, payload) {
      state.needsDataList = payload.needsDataList 
    }
  },
  actions: {
    async getNeeds(context) {
      const payload = {
        needsDataList: [],
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/home-screen';
      await axios.get(url)
      .then(response => {
        payload.needsDataList = response.data;
      });
      context.commit('getNeeds', payload);
    }
  },
  modules: {
  }
})
