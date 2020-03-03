const completeModalModule = {
  state: {
    isShow: false,
    text: ''
  },
  mutations: {
    showCompleteModal (state, { text }) {
      state.isShow = true
      state.text = text || '登録が完了しました'
    },
    hideCompleteModal (state) {
      state.isShow = false
      state.text = ''
    }
  }
}

export default completeModalModule
