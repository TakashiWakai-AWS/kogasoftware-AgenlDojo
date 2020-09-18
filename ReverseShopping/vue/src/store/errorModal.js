const errorModalModule = {
  state: {
    isShow: false,
    text: '',
    next: {},
    nextButton: ''
  },
  mutations: {
    showErrorModal (state, params) {
      state.isShow = true
      state.text = params.text
      state.next = params.next
      state.nextButton = params.nextButton
    },
    hideErrorModal (state) {
      state.isShow = false
      state.text = ''
      state.nextButton = ''
      state.next = {}
    },
    getError(state, text) {
      state.isShow = true
      state.text = text
      state.next = { name: 'top' }
      state.nextButton = 'TOPへ戻る'
    },
    notLogedInError(state) {
      state.isShow = true
      state.text = '未ログインです。'
      state.next = { name: 'sign-in' }
      state.nextButton = 'ログイン画面へ'
    }
  }
}

export default errorModalModule
