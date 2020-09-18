<template>
  <div class="home mt-5">
    <Loading v-if="this.$store.state.needs.loading"/>
    <div v-else>
      <b-form>
        <b-form-input
          id="search"
          class="w-50 mx-auto"
          placeholder="ニーズを検索してください"
          v-model="item_name"
        ></b-form-input>
        <b-button class="button mt-4" size="sm" @click="search">検索</b-button>
        <b-button
          to="/needs-register"
          class="red-button mt-4 ml-2"
          size="sm"
        >ニーズを登録する</b-button>
      </b-form>
      <b-button class="button mt-4" size="sm" @click="getAll">検索クリア</b-button>
      <h2>ニーズ一覧</h2>
      <NeedsList></NeedsList>
    </div>
  </div>
</template>

<script>
import NeedsList from "../components/NeedsList.vue"
import Loading from "../components/Loading.vue"

export default {
  name: 'Top',
  data () {
    return {
      item_name: ''
    }
  },
  components: { NeedsList, Loading },
  mounted() {
    this.getAll();
  },
  methods: {
    search() {
      if(this.item_name) this.$store.dispatch('searchNeedsByItemName', { item_name: this.item_name});
    },
    getAll() {
      // this.$store.dispatch('getNeedsTest');
      this.$store.dispatch('getLatestsNeeds');
    }
  }
}
</script>

<style scoped>
h2 {
  margin-top: 100px;
}
</style>
