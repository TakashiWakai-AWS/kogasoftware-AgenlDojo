<template>
  <div class="user">
    <Loading
      v-if="this.$store.state.needs.loading && this.$store.state.needs.dealdataLoading
        && this.$store.state.goods.loading && this.$store.state.user.loading"/>
    <div v-else>
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
      <div v-show="dealingNeeds.length > 0">
        <h2>取引中ニーズ一覧</h2>
        <Need v-for="need in dealingNeeds" :key="need.id" :need="need"></Need>
      </div>
      <div v-show="dealingGoods.length > 0">
        <h2>取引中出品一覧</h2>
        <GoodsList v-for="good in dealingGoods" :key="good.id" :good="good"/>
      </div>
      <h2>募集中一覧</h2>
      <NeedsList></NeedsList>
      <h2>出品中一覧</h2>
      <p v-if="goods.length === 0" class="mt-5 nothing">
        該当する出品がありません
      </p>
      <GoodsList v-for="good in goods" :key="good.id" :good="good" v-else/>
    </div>
  </div>
</template>

<script>
import NeedsList from "../components/NeedsList.vue"
import GoodsList from "../components/GoodsList.vue"
import Loading from "../components/Loading.vue"
import Need from "../components/Need.vue"
import { mapState } from "vuex"

export default {
  name: 'User',
  components: { NeedsList, GoodsList, Loading, Need },
  async beforeCreate() {
    this.$store.dispatch('getUserInfoFromCognito');
  },
  data() {
    return {
      goods: {},
      dealingNeeds: [],
      dealingGoods: [],
    }
  },
  computed: {
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
    ...mapState({
      userData: state => state.user.data,
    })
  },
  created() {
    this.$store.dispatch('getNeedsByUserId');
    this.$store.dispatch('getGoodsByUserId').then(() => {
      this.goods = this.$store.state.goods.dataList;
    });
    this.$store.dispatch('getDealingGoods').then(() => {
      this.dealingGoods = this.$store.state.goods.dealingDataList;
    });
    this.$store.dispatch('getDealingNeeds').then(() => {
      this.dealingNeeds = this.$store.state.needs.dealingDataList;
    });
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
.nothing {
  font-size: 20px;
}
</style>
