<template>
  <div v-if="state.isShow">
    <div class="modal__bg" role="document">
      <div class="modal-content mt-5 w-75 mx-auto">
        <div class="modal-header">
          <h5 class="modal-title" id="label1">確認</h5>
          <button type="button" class="close"  @click="hide" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ state.text }}
        </div>
        <div class="modal-footer">
          <b-btn variant="primary" class="mr-2" to="/" @click="state.action" v-if="state.transition === true">はい</b-btn>
          <b-btn variant="primary" class="mr-2" @click="state.action" v-else>はい</b-btn>
          <b-btn @click="hide" class="button">いいえ</b-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfirmModal',
  data () {
    return {
      state: this.$store.state.confirmModal
    }
  },
  methods: {
    hide() {
      this.$store.commit('hideConfirmModal')
    },
  }
}
</script>
<style scoped>
.wrapper {
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100%;
}
.modal__bg{
  background: rgba(0,0,0,0.8);
  height: 100vh;
  position: absolute;
  width: 100%;
}
.modal__content{
  background: #fff;
  position: absolute;
  transform: translate(-50%,-50%);
}
</style>
