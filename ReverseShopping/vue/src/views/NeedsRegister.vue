<template>
  <div class="needs-register mx-5">
    <Loading v-if="this.$store.state.needs.loading"/>
    <div v-else>
      <h1 class="my-5" v-if="id">ニーズ編集画面</h1>
      <h1 class="my-5" v-else>ニーズ登録画面</h1>

      <b-form>
        <b-form-input v-model="need.item_name" placeholder="名前" class="mt-3" required></b-form-input>
        <b-form-input v-model="need.price" placeholder="金額" class="mt-3" required></b-form-input>
        <div class="form-group row mt-3">
          <label for="quantity" class="col-sm-2 col-form-label text-left">個数：</label>
          <b-form-input v-model="need.quantitiy" class="col-sm-5"></b-form-input>
        </div>
        <div class="form-group row mt-3 pull-left">
          <label for="start_at" class="col-sm-2 col-form-label text-left">募集期間：</label>
          <b-form-input v-model="need.start_at" class="col-sm-3" type="date"></b-form-input>
           ～ <b-form-input v-model="need.end_at" class="col-sm-3" type="date"></b-form-input>
        </div>
        <div v-if="need.image_path" class="form-group row mt-3">
          <img :src="need.image_path" alt="needs img">
          <b-form-file v-model="image" class="d-inline" plain></b-form-file>
        </div>
        <div class="form-group row mt-3" v-else>
          <label for="image_path" class="col-sm-2 col-form-label text-left">画像：</label>
          <b-form-file v-model="image" class="col-sm-10" plain></b-form-file>
        </div>
        <b-form-textarea
          id="textarea"
          v-model="need.note"
          placeholder="備考"
          rows="10"
        ></b-form-textarea>

        <b-button class="button my-4 btn-block" @click="register">登録</b-button>
        <b-button class="red-button my-4 btn-block" @click="deleteConfirm" v-if="id">削除</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading.vue"

export default {
  data: function () {
    return {
      need: this.id ? this.$store.state.needs.data : {},
      image: null
    }
  },
  props: {
    'id': [String, Number]
  },
  components: { Loading },
  mounted () {
    if(this.id) this.$store.dispatch('getNeedById', { id: this.id });
  },
  methods: {
    submit() {
      if (this.id) {
        this.$store.dispatch('updateNeeds', {
          needs_id: this.id,
          need: this.need,
          image: this.image
        });
      } else {
        this.$store.dispatch('insertNeeds', {
          need: this.need,
          image: this.image
        });
      }
    },
    register() {
      if (this.$store.state.isLoggedIn) {
        this.$store.commit('showConfirmModal', {
          text: '登録しますか？',
          action: this.submit,
        })
      } else {
        this.$store.commit('notLogedInError');
      }
    },
    deleteConfirm() {
      if (this.$store.state.isLoggedIn) {
        this.$store.commit('showConfirmModal', {
          text: '削除しますか？',
          action: this.submit,
        })
      } else {
        this.$store.commit('notLogedInError');
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
}
</style>
