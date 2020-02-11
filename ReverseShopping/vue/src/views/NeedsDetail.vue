<template>
  <div class="needs-detail">
    <h1 class="my-5">ニーズ詳細画面</h1>

    <b-container>
      <b-row>
        <b-col>
          <img :src="need.image_path" alt="needs img">
        </b-col>
        <b-col>
          <p>名前：{{need.item_name}}</p>
          <p>希望価格：{{need.price | addComma}}</p>
          <p>個数：{{need.quantitiy}}</p>
          <p>期限：{{need.end_at}}</p>
          <p>備考：{{need.note}}</p>
          <b-button :to="{name: 'needs-edit', params: {id: need.id}}" class="button" size="sm" v-if="user_id === need.user_id">編集</b-button>
          <b-button to="/goods-register" class="button" size="sm" v-else>出品</b-button>
        </b-col>
      </b-row>
    </b-container>
    <div v-if="goods.length > 0" class="nav-tabs-wrap my-5 mx-auto">
      <div class="nav nav-tabs">
        <Good v-for="good in goods" :key="good.id" :good="good"></Good>
      </div>
    </div>
    <p v-else class="mt-5">出品はありません</p>
  </div>
</template>
<script>
import Good from "../components/Good.vue"
export default {
  name: 'NeedsDetail',
  data: function () {
    return {
      need: this.$store.state.needsDataList.find((c) => c.id === this.id),
      user_id: this.$store.state.loginUserData.id,
      goods: this.$store.state.GoodsDataList.filter((c) => c.need_id === this.id),
    }
  },
  props: {
    'id': String
  },
  components: {
    Good
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
