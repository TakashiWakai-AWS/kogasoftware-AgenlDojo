<template>
  <div class="sign-in">
    <Loading v-if="this.$store.state.goods.loading"/>
    <div v-else>
      <h1 class="my-5">出品詳細</h1>
      <b-container>
        <b-row>
          <b-col>
            <img :src="path" alt="goods img">
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
              class="button" size="sm" v-if="user_id === good.user_id">編集</b-button>
            <b-button class="button" size="sm" v-else v-b-modal.modal-goods-purchase>購入</b-button>
            <ConfirmModal id="modal-goods-purchase" text="購入しますか？" :action="complete" transition="false"/>
            <CompleteModal id="modal-purchase-complete" text="購入が完了しました。"/>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import ConfirmModal from '../components/ConfirmModal.vue'
import CompleteModal from '../components/CompleteModal.vue'
import Loading from "../components/Loading.vue"

export default {
  name: 'GoodsDetail',
  data: function () {
    return {
      good: this.$store.state.goods.data,
      user_id: this.$store.state.user.data.id,
    }
  },
  props: {
    'id': String
  },
  components: { ConfirmModal, CompleteModal, Loading },
  methods: {
    complete() {
      this.$store.commit('showCompleteModal');
    }
  },
  mounted () {
    this.$store.dispatch('getGoodById', { id: this.id });
    this.path = this.good.image_path || 'https://kogasoft-reverse-shopping-assets.s3-ap-northeast-1.amazonaws.com/no_Image.jpg'
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
