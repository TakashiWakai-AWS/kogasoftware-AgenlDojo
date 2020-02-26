const confirmModalModule = {
  state: {
    isShow: false,
    text: '',
    action: () => {},
    transition: true,
  },
  mutations: {
    showConfirmModal (state, params) {
      state.isShow = true
      state.text = params.text
      state.action = params.action
      if (typeof params.transition !== 'undefined') state.transition = params.transition
    },
    hideConfirmModal (state) {
      state.isShow = false
      state.text = ''
      state.action = () => {}
      state.transition = true
    }
  }
}

export default confirmModalModule
