<template>
  <div class="home">
    <h1>TOP画面</h1>
    <b-form>
      <b-form-input
        id="search"
        class="w-50 mx-auto"
        placeholder="ニーズを検索してください"
      ></b-form-input>
      <b-button class="button mt-4" size="sm">検索</b-button>
      <b-button to="/needs-register" class="red-button mt-4 ml-2" size="sm">ニーズを登録する</b-button>
    </b-form>
    <h2>ニーズ一覧</h2>
    <div class="d-frex flex-column">
      <Need v-for="need in $store.state.needsDataList" :key="need.id" :need="need"></Need>
    </div>
  </div>
</template>

<script>
import Need from "../components/Need.vue"

export default {
  name: 'Top',
  components: {
    Need
  }
}
</script>

<style scoped>
h2 {
  margin-top: 100px;
}

</style>
