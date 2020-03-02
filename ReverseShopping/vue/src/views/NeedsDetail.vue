<template>
  <div class="needs-detail my-5">
    <Loading v-if="this.$store.state.needs.loading && this.$store.state.goods.loading"/>
    <div v-else>
      <h1>ニーズ詳細画面</h1>

      <b-container>
        <b-row>
          <b-col>
            <img :src="path" alt="needs img">
          </b-col>
          <b-col>
            <p>名前：{{need.item_name}}</p>
            <p>希望価格：{{need.price | addComma}}円</p>
            <p>個数: {{ need.quantity }}個</p>
            <p>期限：{{ need.end_at | moment("YYYY/MM/DD") }}</p>
            <p>備考：{{ need.note }}</p>
            <b-button :to="{name: 'needs-edit', params: {id: need.id}}" class="button" size="sm" v-if="isNeedsUser && this.need.deal_status === 0">編集</b-button>
            <b-button :to="{name: 'goods-register', query: { needs_id: need.id} }" class="button" size="sm" v-if="!isNeedsUser && !isGoodsUser">出品</b-button>
          </b-col>
        </b-row>
      </b-container>
      <div v-if="isNeedsUser && need.deal_status > 0" class="mx-auto mt-5">
        <p>ユーザー評価</p>
        <p class="d-inline">ユーザー評価</p>
        <div>
          <star-rating
            v-model="evaluation"
            :show-rating="false"
            :star-size=30
            inline
            class="my-3"
            :read-only="need.deal_status == 2"/>
        </div>
        <b-button class="button" size="sm" @click="evaluate">評価する</b-button>
      </div>
      <div v-else>
        <div v-if="goods.length > 0" class="nav-tabs-wrap my-5 mx-auto">
          <div class="nav nav-tabs">
            <Good v-for="good in goods" :key="good.id" :good="good"></Good>
          </div>
        </div>
        <p v-else class="mt-5 text-center">出品はありません</p>
      </div>
    </div>
  </div>
</template>
<script>
import Good from "../components/Good.vue"
import Loading from "../components/Loading.vue"
import StarRating from 'vue-star-rating'

export default {
  name: 'NeedsDetail',
  data: function () {
    return {
      need: {},
      user_id: this.$store.state.user.data.id,
      goods: {},
      path: '',
      isGoodsUser: false,
      isNeedsUser: false,
      evaluation: 0
    }
  },
  props: {
    'id': [String, Number]
  },
  components: {
    Good, Loading, StarRating
  },
  created () {
    this.$store.dispatch('getGoodsByNeedsId', { id: this.id }).then(() => {
      this.goods = this.$store.state.goods.dataList;
      this.isGoodsUser = this.$store.state.isLoggedIn && (this.goods.filter(g => g.user_id == this.user_id).length > 0 ? true : false)
    });
    this.$store.dispatch('getNeedById', { id: this.id }).then(() => {
      this.need = this.$store.state.needs.data;
      this.path = this.need.image_path || 'https://kogasoft-reverse-shopping-assets.s3-ap-northeast-1.amazonaws.com/no_Image.jpg'
      this.isNeedsUser = this.$store.state.isLoggedIn && (this.user_id == this.need.user_id)
    });
    // this.$store.dispatch('getGoodsTest');
  },
}
</script>
<style scoped>
img {
  width: 300px;
  height: 300px;
}
p {
  font-size: 20px;
  text-align: left;
}
.nav-tabs-wrap {
  overflow-y: none;
  overflow-x: auto;
  white-space: nowrap;
  width: 80%;
}

.nav-tabs-wrap .nav {
  display: inline-block;
  width: 100%;
}
</style>
