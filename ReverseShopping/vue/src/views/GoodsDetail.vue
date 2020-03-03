<template>
  <div>
    <Loading v-if="this.$store.state.goods.loading"/>
    <div v-else>
      <h1 class="my-5">出品詳細</h1>
      <b-container>
        <b-row>
          <b-col>
            <img :src="good.image_path" alt="goods img">
          </b-col>
          <b-col>
            <p>商品状態：{{good.item_status | itemStatus }}</p>
            <p>備考：{{good.note}}</p>
            <b-button
              :to="{
                name: 'goods-edit',
                params: { id: good.id },
                query: { needs_id: good.needs_id }
              }"
              class="button" size="sm" v-if="isGoodsUser && good.deal_status === 0">編集</b-button>
            <b-button class="button" size="sm" v-if="isNeedsUser && good.deal_status === 0" @click="confirm">購入</b-button>
          </b-col>
        </b-row>
      </b-container>
      <div v-show="(isGoodsUser || isNeedsUser) && good.deal_status > 0" class="mx-auto mt-5">
        <p class="d-inline">ユーザー評価</p>
        <div>
          <star-rating
            v-model="evaluation"
            :show-rating="false"
            :star-size=30
            inline
            class="my-3"
            :read-only="good.deal_status == 2"/>
        </div>
        <b-button class="button mb-3" size="sm" @click="evaluate">評価する</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading.vue"
import StarRating from 'vue-star-rating'

export default {
  name: 'GoodsDetail',
  data: function () {
    return {
      good: {},
      user_id: this.$store.state.user.data.id,
      isNeedsUser: false,
      isGoodsUser: false,
      evaluation: 0
    }
  },
  props: {
    'id': [String, Number]
  },
  components: { Loading, StarRating },
  methods: {
    purchase() {
      this.$store.dispatch('purchase', {
        needs_id: this.good.needs_id,
        goods_id: this.good.id,
      })
    },
    confirm() {
      this.$store.commit('showConfirmModal', {
        text: '購入しますか？',
        action: this.purchase,
        transition: false
      })
    },
    evaluate() {
      if(this.isNeedsUser) {
        this.$store.dispatch('insertGoodsEvaluation', {
          goods_id: this.good.id,
          evaluation: this.evaluation,
        })
      }
      if(this.isGoodsUser) {
        this.$store.dispatch('insertNeedsEvaluation', {
          goods_id: this.good.id,
          evaluation: this.evaluation,
          needs_id: this.good.needs_id
        })
      }
    }
  },
  created () {
    this.$store.dispatch('getGoodById', { id: this.id }).then(() => {
      this.good = this.$store.state.goods.data
      this.isNeedsUser = this.$store.state.isLoggedIn && (this.$store.state.user.data.id == this.good.needs_user)
      this.isGoodsUser = this.$store.state.isLoggedIn && (this.user_id == this.good.user_id)
    });
  }
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
</style>
