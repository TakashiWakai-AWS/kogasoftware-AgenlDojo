<template>
  <div class="good w-75">
    <div class="goods-info d-flex justify-content-between">
      <ul>
        <li>状態： {{ good.item_status | itemStatus }}</li>
        <li>詳細： {{ good.note }}</li>
        <li><router-link :to="{name: 'goods-detail', params: {id: good.id}}">詳細画面へ</router-link></li>
      </ul>
      <router-link tag="div" class="goods-image mr-0" :to="{name: 'goods-detail', params: {id: good.id}}"><img :src="good.image_path" alt="写真"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Good',
  props: {'good': Object}
}
</script>

<style scoped>
.good {
  margin: 40px auto;
  border: 1px solid #354B5E;
  border-radius: 10px;
}

ul {
  list-style: none;
  text-align: left;
  display: inline-block;
}

li {
  margin-top: 20px;
}

img {
  height: 300px;
  width: 300px;
  border-radius: 0 10px 10px 0;
}

.goods-image {
  display: inline-block;
  border-left: 1px solid #354B5E;
}

.goods-image :hover {
  cursor: pointer;
}
</style>
