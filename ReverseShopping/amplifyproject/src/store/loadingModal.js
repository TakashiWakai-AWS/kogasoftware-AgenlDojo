const loadingModalModule = {
  state: {
    isShow: false,
  },
  mutations: {
    showLoadingModal (state) {
      state.isShow = true
    },
    hideLoadingModal (state) {
      state.isShow = false
    }
  }
}

export default loadingModalModule
