<template>
  <div class="good mx-2">
    <div class="d-flex justify-content-between">
      <router-link tag="div" class="mr-0" :to="{name: 'goods-detail', params: {id: good.id}}"><img :src="good.image_path" alt="写真"></router-link>
      <div class="detail">
        <p class="mt-3">状態：{{ good.item_status | itemStatus }}</p>
        <b-button size="sm" class="button d-inline mr-3" @click="confirm" v-if="isNeedsUser && good.deal_status === 0">
          購入
        </b-button>
        <router-link class="d-inline" :to="{name: 'goods-detail', params: {id: good.id}}">詳細</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Good',
  props: {
    'good': Object
  },
  data() {
    return {
      isNeedsUser: this.$store.state.isLoggedIn && (this.$store.state.user.data.id == this.good.needs_user),
      path: this.good.image_path || 'https://kogasoft-reverse-shopping-assets.s3-ap-northeast-1.amazonaws.com/no_Image.jpg'
    }
  },
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
    }
  },
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
