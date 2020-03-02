const userModule = {
  state: {
    data: {},
    loading: false,
    needs_user: {},
    goods_user: {}
  },
  mutations: {
    getUser(state, payload) {
      state.data = payload.data
      state.loading = false
    },
    clearUser(state) {
      state.data = {}
    },
    startUserLoading(state) {
      state.loading = true
    }
  },
  actions: {
    getUserTest(context) {
      context.commit('startUserLoading')
      const payload = {
        data: {
          'id': 2,
          'name': 'hoge',
          'nickname': 'fuga',
          'address': '東京都台東区上野1-17-6',
          'tel': '03-3833-0733',
          'email': 'asdjdahaj@aksj.jp',
          'settlement_info': '*************',
        }
      }
      context.commit('getUser', payload)
    },
    getGoodsUserTest(context) {
      context.commit('startUserLoading')
      const payload = {
        data: {
          'id': '2',
          'name': 'hoge',
          'nickname': 'fuga',
          'address': '東京都台東区上野1-17-6',
          'tel': '03-3833-0733',
          'email': 'asdjdahaj@aksj.jp',
          'settlement_info': '*************',
        }
      }
      context.commit('getUser', payload)
    },
    getNeedsUserTest(context) {
      context.commit('startUserLoading')
      const payload = {
        data: {
          'id': '2',
          'name': 'hoge',
          'nickname': 'fuga',
          'address': '東京都台東区上野1-17-6',
          'tel': '03-3833-0733',
          'email': 'asdjdahaj@aksj.jp',
          'settlement_info': '*************',
        }
      }
      context.commit('getUser', payload)
    }
  }
}

export default userModule
