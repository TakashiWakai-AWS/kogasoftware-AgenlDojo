<template>
  <div class="needs-register mx-5">
    <Loading v-if="this.$store.state.needs.loading"/>
    <div v-else>
      <h1 class="my-5" v-if="id">ニーズ編集画面</h1>
      <h1 class="my-5" v-else>ニーズ登録画面</h1>

      <div v-if="error.length > 0" class="error pt-2">
        <p v-for="err in error" :key="err.place">{{err.text}}</p>
      </div>
      <b-form>
        <b-form-input v-model="need.item_name" placeholder="名前" class="mt-3" required></b-form-input>
        <b-form-input v-model="need.price" placeholder="金額" class="mt-3" required></b-form-input>
        <div class="form-group row mt-3">
          <label for="quantity" class="col-sm-2 col-form-label text-left">個数：</label>
          <b-form-input v-model="need.quantity" class="col-sm-5"></b-form-input>
        </div>
        <div class="form-group row mt-3 pull-left">
          <label for="start_at" class="col-sm-2 col-form-label text-left">募集期間：</label>
          <b-form-input v-model="need.start_at" class="col-sm-3" type="date"></b-form-input>
           ～ <b-form-input v-model="need.end_at" class="col-sm-3" type="date"></b-form-input>
        </div>
        <div v-if="need.image_path" class="form-group row mt-3">
          <img :src="need.image_path" alt="needs img">
          <b-form-file id="image-input" @change="selectedFile" type="file" name="imagefile" class="mt-2"></b-form-file>
        </div>
        <div class="form-group row mt-3" v-else>
          <label for="image_path" class="col-sm-2 col-form-label text-left">画像：</label>
          <b-form-file id="image-input" @change="selectedFile" type="file" name="imagefile"></b-form-file>
        </div>
        <b-form-textarea
          id="textarea"
          v-model="need.note"
          placeholder="備考"
          rows="10"
        ></b-form-textarea>

        <b-button class="button my-4 btn-block" @click="check">登録</b-button>
        <b-button class="red-button my-4 btn-block" @click="deleteConfirm" v-if="id">削除</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>import moment from "moment"
import Loading from "../components/Loading.vue"

export default {
  data: function () {
    return {
      need: {
        price: 0,
        quantity: 1,
        start_at: moment().format("YYYY-MM-DD"),
        end_at: moment().add(1, 'months').format("YYYY-MM-DD")
      },
      uploadFile: null,
      error: [],
    }
  },
  props: {
    'id': [String, Number]
  },
  components: { Loading },
  created () {
    if(this.id) {
      this.$store.dispatch('getNeedById', { id: this.id }).then(() => {
        this.need = this.$store.state.needs.data
        this.need.start_at = moment(Date(this.need.start_at)).format("YYYY-MM-DD");
        this.need.end_at = moment(Date(this.need.end_at)).format("YYYY-MM-DD");
      });
    }
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
        this.$store.dispatch('updateNeeds', {
          needs_id: this.id,
          need: this.need,
          file: this.uploadFile
        });
      } else {
        this.$store.dispatch('insertNeeds', {
          need: this.need,
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
          action: this.deleted,
        })
      } else {
        this.$store.commit('notLogedInError');
      }
    },
    deleted() {
      this.$store.dispatch('deleteNeed', {
        id: this.need.id,
      })
      this.$store.commit('hideConfirmModal')
    },
    check() {
      if (!this.$store.state.isLoggedIn) return this.$store.commit('notLogedInError');
      this.error = []
      if (!this.need.item_name) {
        this.error.push({ place: 'name', text: '商品名を入力してください' })
      }
      if (isNaN(this.need.price)) {
        this.error.push({ place: 'price', text: '金額を半角数字で入力してください' })
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
  }}
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
}
.error {
  background-color: rgba(215,75,75,0.2);
}
</style>
