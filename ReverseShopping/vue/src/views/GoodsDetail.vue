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
              class="button" size="sm" v-if="user_id == good.user_id">編集</b-button>
            <b-button class="button" size="sm" v-if="isNeedsUser" @click="confirm">購入</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading.vue"

export default {
  name: 'GoodsDetail',
  data: function () {
    return {
      good: {},
      user_id: this.$store.state.user.data.id,
      isNeedsUser: false
    }
  },
  props: {
    'id': [String, Number]
  },
  components: { Loading },
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
  mounted () {
    this.$store.dispatch('getGoodById', { id: this.id });
    this.good = this.$store.state.goods.data
    this.isNeedsUser = this.$store.state.user.id === this.good.needs_id
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
