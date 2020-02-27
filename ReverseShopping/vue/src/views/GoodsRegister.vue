<template>
  <div class="mx-5 mt-5">
    <Loading v-if="this.$store.state.goods.loading || this.$store.state.goods.loading"/>
    <div v-else>
      <b-container>
        <b-row>
          <b-col cols="8">
          <h1 class="mt-5" v-if="id">出品編集</h1>
          <h1 class="mt-5" v-else>出品登録</h1>
            <b-form>
              <b-form-select v-model="good.item_status" :options="item_status" class="mt-5"></b-form-select>
              <div v-if="good.image_path" class="form-group row mt-3">
                <img :src="good.image_path" alt="good img">
                <b-form-file v-model="image" class="d-inline" plain></b-form-file>
              </div>
              <div class="form-group row mt-3" v-else>
                <label for="image_path" class="col-sm-2 col-form-label text-left">画像：</label>
                <b-form-file v-model="image" class="col-sm-10" plain></b-form-file>
              </div>
              <b-form-textarea
                id="textarea"
                v-model="good.note"
                placeholder="備考"
                rows="10"
              ></b-form-textarea>
              <b-button class="button my-4 btn-block" @click="register">登録</b-button>
              <b-button class="red-button my-4 btn-block" @click="deleteConfirm" v-if="id">削除</b-button>
            </b-form>
          </b-col>
          <b-col class="needs">
            <div class="ml-4">
              <h2 class="mt-3">ニーズ詳細</h2>
              <img :src="path" alt="need img" class="my-3">
              <p>名前：{{need.item_name}}</p>
              <p>希望価格：{{need.price | addComma}}</p>
              <p>期限：{{need.end_at | moment("YYYY/MM/DD")}}</p>
              <p>備考：{{need.note}}</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import Loading from "../components/Loading.vue"

export default {
  data: function () {
    return {
      good: this.id
        ? this.$store.state.goods.data
        : { item_status: 0 },
      need: this.$store.state.needs.data,
      item_status: [
        { value: 0, text: 'ほぼ新品' },
        { value: 1, text: '非常に良い' },
        { value: 2, text: '良い' },
        { value: 3, text: '可' },
      ],
      path: '',
      image: null
    }
  },
  props: {
    'id': [String, Number]
  },
  components: { Loading },
  mounted () {
    if(this.id) this.$store.dispatch('getGoodById', { id: this.id });
    this.$store.dispatch('getNeedById', { id: this.$route.query.needs_id });
    this.path = this.need.image_path || 'https://kogasoft-reverse-shopping-assets.s3-ap-northeast-1.amazonaws.com/no_Image.jpg'
  },
  methods: {
    submit() {
      if (this.id) {
        this.$store.dispatch('updateGoods', {
          goods_id: this.id,
          needs_id: this.$route.query.needs_id,
          good: this.good,
          image: this.image
        });
      } else {
        this.$store.dispatch('insertGoods', {
          needs_id: this.$route.query.needs_id,
          good: this.good,
          image: this.image
        });
      }
      this.$store.commit('hideConfirmModal')
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
p {
  font-size: 20px;
  text-align: left;
}
h2 {
  font-size: 25px;
  color: #354B5E;
}
.needs {
  border: 1px solid #354B5E;
  border-radius: 10px;
}
</style>
