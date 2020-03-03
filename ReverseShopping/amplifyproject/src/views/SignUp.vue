<template>
  <div id="sign-up">
      <h3>新規登録</h3>
      <b-form-input class="w-50 mx-auto mt-4" type="text" placeholder="氏名"></b-form-input>
      <b-form-input class="w-50 mx-auto mt-4" type="text" placeholder="ニックネーム"></b-form-input>
      <b-form-input class="w-50 mx-auto mt-4" type="password" placeholder="パスワード"></b-form-input>
      <b-form-input class="w-50 mx-auto mt-4" type="password" placeholder="パスワード確認"></b-form-input>
      <b-form-input class="w-50 mx-auto mt-4" type="text" placeholder="住所"></b-form-input>
      <b-form-input class="w-50 mx-auto mt-4" type="text" placeholder="TEL"></b-form-input>
      <b-form-input class="w-50 mx-auto mt-4" type="email" placeholder="メールアドレス"></b-form-input>
      <b-form-input class="w-50 mx-auto mt-4" type="text" placeholder="決済情報"></b-form-input>
      <b-button id="sign-up-button" class="button mt-4">登録</b-button>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
}
</script>

<style scoped>
#sign-up {
  margin-top: 50px;
}

#sign-up-button {
  margin-bottom: 50px;
}
</style>