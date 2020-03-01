<template>
  <div class="user">
    <h2>ユーザー情報</h2>
    <!-- <img class="img-thumbnail rounded mt-4" :src="userData.image"> -->
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
        <td>{{ maskedPhoneNumber }}</td>
      </tr>
      <tr>
        <th>メールアドレス</th>
        <td>{{ userData.email }}</td>
      </tr>
      <tr>
        <th>決済情報</th>
        <td>{{ maskedsettlementInfo }}</td>
      </tr>
    </table>
    <h2>募集中一覧</h2>
    <NeedsList></NeedsList>
    <h2>出品中一覧</h2>
    <GoodsList v-for="good in goods" :key="good.id" :good="good"/>
  </div>
</template>

<script>
import { mapState } from "vuex"
import NeedsList from "../components/NeedsList.vue"
import GoodsList from "../components/GoodsList.vue"

export default {
  name: 'User',
  components: { NeedsList, GoodsList },
  computed: {
    ...mapState({
      userData: state => state.user.data,
      goods: state => state.goods.dataList
    }),
    maskedPhoneNumber: function () {
      return this.userData.tel.slice(3).replace(/([0-9]{3})([0-9]+)([0-9]{4})/,
        (match, p1, p2, p3) => `${p1}${p2.replace(/./g, '*')}${p3}`
      )
    },
    maskedsettlementInfo: function () {
      return this.userData.settlementInfo.replace(/([0-9]+)([0-9]{1})/,
        (match, p1, p2) => `${p1.replace(/./g, '*')}${p2}`
      )
    },
  },
  mounted() {
    this.$store.dispatch('getNeedsByUserId');
    this.$store.dispatch('getGoodsByUserId');
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
