<template>
  <div class="mx-5 mt-5">
    <Loading v-if="this.$store.state.needs.loading && this.$store.state.goods.loading"/>
    <div v-else>
      <b-container>
        <b-row>
          <b-col cols="8">
            <h1 class="mt-5" v-if="id">出品編集</h1>
            <h1 class="mt-5" v-else>出品登録</h1>

            <div v-if="error.length > 0" class="error pt-2">
              <p v-for="err in error" :key="err.place">{{err.text}}</p>
            </div>
            <b-form>
              <b-form-select v-model="good.item_status" :options="item_status" class="mt-5"></b-form-select>
              <div v-if="good.image_path" class="form-group row mt-3">
                <img :src="good.image_path" alt="good img">
                <b-form-file id="image-input" @change="selectedFile" type="file" name="imagefile" class="mt-2"></b-form-file>
              </div>
              <div class="form-group row mt-3" v-else>
                <label for="image_path" class="col-sm-2 col-form-label text-left">画像：</label>
                <b-form-file id="image-input" @change="selectedFile" type="file" name="imagefile"></b-form-file>
              </div>
              <b-form-textarea
                id="textarea"
                v-model="good.note"
                placeholder="備考"
                rows="10"
              ></b-form-textarea>
              <b-button class="button my-4 btn-block" @click="check">登録</b-button>
              <b-button class="red-button my-4 btn-block" @click="deleteConfirm" v-if="id">削除</b-button>
            </b-form>
          </b-col>
          <b-col class="needs mb-3">
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
      good: { item_status: 0 },
      need: {},
      item_status: [
        { value: 0, text: 'ほぼ新品' },
        { value: 1, text: '非常に良い' },
        { value: 2, text: '良い' },
        { value: 3, text: '可' },
      ],
      path: '',
      uploadFile: null,
      error: []
    }
  },
  props: {
    'id': [String, Number]
  },
  components: { Loading },
  created () {
    if(this.id) {
      this.$store.dispatch('getGoodById', { id: this.id });
      this.good = this.$store.state.goods.data
    }
    this.$store.dispatch('getNeedById', { id: this.$route.query.needs_id });
    this.need = this.$store.state.needs.data
    this.path = this.need.image_path || 'https://kogasoft-reverse-shopping-assets.s3-ap-northeast-1.amazonaws.com/no_Image.jpg'
  },
  methods: {
    selectedFile() {
        // 選択された File の情報を保存しておく
        const image_input = document.getElementById('image-input');
        const files = image_input.files;
        this.uploadFile = files[0];
    },
    submit() {
      if (this.id) {
        this.$store.dispatch('updateGoods', {
          goods_id: this.id,
          needs_id: this.need.id,
          good: this.good,
          file: this.uploadFile
        });
      } else {
        this.$store.dispatch('insertGoods', {
          needs_id: this.need.id,
          good: this.good,
          file: this.uploadFile
        });
      }
      this.$store.commit('hideConfirmModal')
    },
    register() {
      this.$store.commit('showConfirmModal', {
        text: '登録しますか？',
        action: this.submit,
      })
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
    },

    check() {
      if (!this.$store.state.isLoggedIn) return this.$store.commit('notLogedInError');
      this.error = []
      if (!this.id && !this.uploadFile) {
        this.error.push({ place: 'image', text: '画像を選択してください' })
      }
      if (this.error.length > 0) {
        const duration = 250;  // 移動速度（1秒で終了）
        const interval = 25;    // 0.025秒ごとに移動
        const step = -window.scrollY / Math.ceil(duration / interval); // 1回に移動する距離
        const timer = setInterval(() => {

            window.scrollBy(0, step);   // スクロール位置を移動

            if(window.scrollY <= 0) {

                clearInterval(timer);

            }

        }, interval);
        return
      }
      this.register()
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
.error {
  background-color: rgba(215,75,75,0.2);
}
</style>
