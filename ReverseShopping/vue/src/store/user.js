const userModule = {
  state: {
    data: {},
  },
  mutations: {
    getUser(state, payload) {
      state.data = payload.data
    },
    clearUser(state) {
      state.data = {}
    }
  },
  actions: {
    getUserTest(context) {
      const payload = {
        data: {
          'id': '1',
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
