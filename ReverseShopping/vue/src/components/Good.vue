<template>
  <div class="good mx-2">
    <div class="d-flex justify-content-between">
      <router-link tag="div" class="mr-0" :to="{name: 'goods-detail', params: {id: good.id}}"><img :src="good.image_path" alt="写真"></router-link>
      <div class="detail">
        <p class="mt-3">価格：{{good.price}}円</p>
        <b-button v-b-modal.modal-goods-purchase size="sm" class="button d-inline mr-3">購入</b-button>
        <router-link class="d-inline" :to="{name: 'goods-detail', params: {id: good.id}}">詳細</router-link>
      </div>
    </div>

    <b-modal
      id="modal-goods-purchase"
      title="確認"
    >
      <p class="my-4">購入しますか？</p>
      <div slot="modal-footer">
          <b-btn variant="primary" class="mr-2" to="/">はい</b-btn>
          <b-btn @click="$bvModal.hide('modal-goods-purchase')" class="button">いいえ</b-btn>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'Good',
  props: { 'good': Object }
}
</script>
<style scoped>
.good {
  border: 1px solid #354B5E;
  border-radius: 10px;
  display: inline-block;
  float: none;
  width: 250px;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 10px 0 0 10px;
}
.detail {
  width: 150px;
}
</style>
