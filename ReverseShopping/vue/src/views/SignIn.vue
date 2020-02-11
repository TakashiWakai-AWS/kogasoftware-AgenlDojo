<template>
  <div id="sign-in">
      <h3>ログイン</h3>
      <b-form-input class="w-50 mx-auto mt-4" type="email" placeholder="メールアドレス"></b-form-input>
      <b-form-input class="w-50 mx-auto mt-4" type="password" placeholder="パスワード"></b-form-input>
      <b-button to="/" @click="signIn" class="button mt-4" type="button">ログイン</b-button>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  methods: {
    signIn() {
      this.$store.commit('signIn');
    }
  }
}
</script>

<style scoped>

#sign-in {
  margin-top: 50px;
}

</style>
