<template>
  <div v-if="state.isShow">
    <div class="modal__bg" role="document">
      <div class="modal-content mt-5 w-75 mx-auto">
        <div class="modal-body">
          <Loading></Loading>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading.vue"

export default {
  name: 'LoadingModal',
  data () {
    return {
      state: this.$store.state.loadingModal
    }
  },
  components: { Loading }
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
.modal-body {
  height: 200px
}
</style>
