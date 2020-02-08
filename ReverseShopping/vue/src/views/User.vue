<template>
  <div class="user">
    <h2>ユーザー情報</h2>
    <img class="img-thumbnail rounded mt-4" :src="userData.image">
    <table class="table mx-auto mt-4" style="width: 50%">
      <tr>
        <th>氏名</th>
        <td>{{ userData.name }}</td>
      </tr>
      <tr>
        <th>ニックネーム</th>
        <td>{{ userData.nickname }}</td>
      </tr>
      <tr>
        <th>住所</th>
        <td>{{ userData.address }}</td>
      </tr>
      <tr>
        <th>TEL</th>
        <td>{{ userData.tel }}</td>
      </tr>
      <tr>
        <th>メールアドレス</th>
        <td>{{ userData.email }}</td>
      </tr>
      <tr>
        <th>決済情報</th>
        <td>{{ userData.settlement_info }}</td>
      </tr>
    </table>
    <h2>募集中一覧</h2>
    <NeedsList></NeedsList>
  </div>
</template>

<script>
import NeedsList from "../components/NeedsList.vue"

export default {
  name: 'User',
  components: { NeedsList },
  data() {
    return {
      userData: this.$store.state.loginUserData
    }
  }
}
</script>

<style scoped>
h2 {
  margin-top: 50px;
}

img {
  width:200px;
  height:200px;
}
</style>
