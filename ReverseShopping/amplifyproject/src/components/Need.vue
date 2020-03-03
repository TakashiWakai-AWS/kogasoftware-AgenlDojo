<template>
  <div class="need w-75">
    <div class="needs-info d-flex justify-content-between">
      <ul>
        <li>名前: {{ need.item_name }}</li>
        <li>希望価格: {{ need.price | addComma }}円</li>
        <li>個数: {{ need.quantity }}個</li>
        <li>期限： {{ need.end_at | moment("YYYY/MM/DD") }}</li>
        <li>詳細： {{ need.note }}</li>
        <li><router-link :to="{name: 'needs-detail', params: {id: need.id}}">詳細画面へ</router-link></li>
      </ul>
      <router-link tag="div" class="needs-image mr-0" :to="{name: 'needs-detail', params: {id: need.id}}">
        <img :src="path" alt="写真">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Need',
  props: {'need': Object},
  data () {
    return {
      path: this.need.image_path
        || 'https://kogasoft-reverse-shopping-assets.s3-ap-northeast-1.amazonaws.com/no_Image.jpg'
    }
  }
}
</script>

<style scoped>
.need {
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

.needs-image {
  display: inline-block;
  border-left: 1px solid #354B5E;
}

.needs-image :hover {
  cursor: pointer;
}
</style>
