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
        <p v-if="isGoodsUser && !good.goods_evaluations_id" class="d-inline">お相手の評価をお待ちください</p>
        <div v-else>
          <p class="d-inline">ユーザー評価</p>
          <div>
            <star-rating
              v-model="evaluation"
              :show-rating="false"
              :star-size=30
              inline
              :read-only="(isNeedsUser && good.goods_evaluation) || (isGoodsUser && good.needs_evaluation)"
              class="my-3"/>
          </div>
          <b-button class="button mb-3" size="sm" @click="evaluate" :disabled="!evaluable">評価する</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading.vue"
import StarRating from 'vue-star-rating'
import { mapState } from "vuex"

export default {
  name: 'GoodsDetail',
  data: function () {
    return {
      good: {},
      evaluation: 0,
    }
  },
  computed: {
    ...mapState({
      user_id: state => state.user.data.id,
      isNeedsUser(state) {
        return state.isLoggedIn && (this.user_id == state.goods.data.needs_user)
      },
      isGoodsUser(state) {
        return state.isLoggedIn && (this.user_id == state.goods.data.user_id)
      },
      evaluable(state) {
        if (this.isNeedsUser) return !state.goods.data.goods_evaluations_id
        if (this.isGoodsUser) return !state.goods.data.needs_evaluations_id
      },
    }),
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
      if (this.isNeedsUser) this.evaluation = this.good.goods_evaluation
      if (this.isGoodsUser) this.evaluation = this.good.needs_evaluation
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
