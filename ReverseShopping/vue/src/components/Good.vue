<template>
  <div class="good mx-2">
    <div class="d-flex justify-content-between">
      <router-link tag="div" class="mr-0" :to="{name: 'goods-detail', params: {id: good.id}}"><img :src="good.image_path" alt="写真"></router-link>
      <div class="detail">
        <p class="mt-3">状態：{{ good.item_status | itemStatus }}</p>
        <b-button size="sm" class="button d-inline mr-3" @click="confirm" v-if="isNeedsUser">
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
    'good': Object,
    'confirm': Function
  },
  data() {
    return {
      isNeedsUser: this.$store.state.user.id === this.good.needs_id
    }
  }
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
