import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn : false,
    needsDataList : [
      {
        'id': '1',
        'name': 'good1',
        'price': 10000,
        'number': '1',
        'deadline': '2020/3/31',
        'description': 'good1です。',
        'image': require('../assets/image001.jpg')
      },
      {
        'id': '2',
        'name': 'good2',
        'price': 20000,
        'number': '1',
        'deadline': '2020/3/31',
        'description': 'good2です。',
        'image': require('../assets/image002.jpg')
      },
      {
        'id': '3',
        'name': 'good3',
        'price': 30000,
        'number': '1',
        'deadline': '2020/3/31',
        'description': 'good3です。',
        'image': require('../assets/image003.jpg')
      },
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
