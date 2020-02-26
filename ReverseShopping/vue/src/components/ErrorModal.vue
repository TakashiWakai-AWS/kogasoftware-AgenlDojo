<template>
  <div v-if="state.isShow">
    <div class="modal__bg" role="document">
      <div class="modal-content mt-5 w-75 mx-auto">
        <div class="modal-header">
          <h5 class="modal-title" id="label1">エラー</h5>
          <button type="button" class="close"  @click="hide" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ state.text }}
        </div>
        <div class="modal-footer">
          <b-btn variant="primary" class="mr-2" v-if="state.next" @click="hide" :to="state.next">{{state.nextButton}}</b-btn>
          <b-btn variant="primary" class="mr-2" @click="hide">閉じる</b-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ErrorModal',
  data () {
    return {
      state: this.$store.state.errorModal
    }
  },
  methods: {
    hide() {
      this.$store.commit('hideErrorModal')
    }
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
