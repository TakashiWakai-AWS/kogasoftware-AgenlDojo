<template>
  <div class="needs-detail my-5">
    <Loading v-if="this.$store.state.needs.loading || this.$store.state.goods.loading"/>
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
            <b-button :to="{name: 'needs-edit', params: {id: need.id}}" class="button" size="sm" v-if="user_id == need.user_id">編集</b-button>
            <b-button :to="{name: 'goods-register', query: { needs_id: need.id } }" class="button" size="sm" v-else>出品</b-button>
          </b-col>
        </b-row>
      </b-container>
      <div v-if="goods.length > 0" class="nav-tabs-wrap my-5 mx-auto">
        <div class="nav nav-tabs">
          <Good v-for="good in goods" :key="good.id" :good="good" :confirm="confirm" :complete="complete"></Good>
        </div>
      </div>
      <p v-else class="mt-5 text-center">出品はありません</p>
    </div>
  </div>
</template>
<script>
import Good from "../components/Good.vue"
import Loading from "../components/Loading.vue"

export default {
  name: 'NeedsDetail',
  data: function () {
    return {
      need: {},
      user_id: '',
      goods: {},
      path: ''
    }
  },
  props: {
    'id': [String, Number]
  },
  components: {
    Good, Loading
  },
  methods: {
    complete() {
      this.$store.commit('hideConfirmModal')
      this.$store.commit('showCompleteModal', {
        text: '購入が完了しました。'
      })
    },
    confirm() {
      this.$store.commit('showConfirmModal', {
        text: '購入しますか？',
        action: this.complete,
        transition: false
      })
    }
  },
  created () {
    this.$store.dispatch('getGoodsByNeedsId', { id: this.id });
    this.$store.dispatch('getNeedById', { id: this.id });
    // this.$store.dispatch('getGoodsTest');
    this.need = this.$store.state.needs.data;
    this.user_id = this.$store.state.user.data.id;
    this.goods = this.$store.state.goods.dataList;
    this.path = this.need.image_path || 'https://kogasoft-reverse-shopping-assets.s3-ap-northeast-1.amazonaws.com/no_Image.jpg'
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
