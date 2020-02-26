<template>
  <div class="needs-register mx-5">
    <h1 class="my-5" v-if="id">ニーズ編集画面</h1>
    <h1 class="my-5" v-else>ニーズ登録画面</h1>

    <b-form>
      <b-form-input v-model="item_name" placeholder="名前" class="mt-3"></b-form-input>
      <b-form-input v-model="price" placeholder="金額" class="mt-3"></b-form-input>
      <div class="form-group row mt-3">
        <label for="quantity" class="col-sm-2 col-form-label text-left">個数：</label>
        <b-form-input v-model="quantity" class="col-sm-5"></b-form-input>
      </div>
      <div class="form-group row mt-3 pull-left">
        <label for="start_at" class="col-sm-2 col-form-label text-left">募集期間：</label>
        <b-form-input v-model="start_at" class="col-sm-3" type="date"></b-form-input>
         ～ <b-form-input v-model="end_at" class="col-sm-3" type="date"></b-form-input>
      </div>
      <!-- <div v-if="need.image_path" class="form-group row mt-3">
        <img :src="image_path" alt="needs img">
        <b-form-file class="d-inline" @change="selectedFile" plain></b-form-file>
      </div> -->
      <div class="form-group row mt-3">
        <label for="image_path" class="col-sm-2 col-form-label text-left">画像：</label>
        <b-form-file id="image-input" @change="selectedFile" type="file" name="imagefile"></b-form-file>
      </div>
      <b-form-textarea
        id="textarea"
        v-model="note"
        placeholder="備考"
        rows="10"
      ></b-form-textarea>

      <b-button class="button my-4 btn-block" v-b-modal.modal-needs-register>登録</b-button>
      <b-button class="red-button my-4 btn-block" v-b-modal.modal-needs-delete v-if="id">削除</b-button>

      <b-modal
        id="modal-needs-register"
        title="確認"
      >
        <p class="my-4">登録しますか？</p>
        <div slot="modal-footer">
            <b-btn v-if="this.id" variant="primary" class="mr-2" to="/" @click="updateNeeds">はい</b-btn>
            <b-btn v-else variant="primary" class="mr-2" to="/" @click="insertNeeds">はい</b-btn>
            <b-btn @click="$bvModal.hide('modal-needs-register')" class="button">いいえ</b-btn>
        </div>
      </b-modal>

      <b-modal
        id="modal-needs-delete"
        title="確認"
      >
        <p class="my-4">削除しますか？</p>
        <div slot="modal-footer">
            <b-btn variant="primary" class="mr-2" to="/">はい</b-btn>
            <b-btn @click="$bvModal.hide('modal-needs-delete')" class="button">いいえ</b-btn>
        </div>
      </b-modal>
    </b-form>
  </div>
</template>
<script>
import axios from "axios"
import moment from "moment"

export default {
  data: function () {
    return {
      need: this.id ? this.$store.state.needs.dataList.find((c) => c.id == this.id) : {},
      uploadFile: null,
      user_id: 1,
      item_name: '',
      price: 0,
      start_at: null,
      end_at: null,
      quantity: 0,
      note: '' ,
      image_path: ''
    }
  },
  methods: {
    selectedFile() {
        // 選択された File の情報を保存しておく
        const image_input = document.getElementById('image-input');
        const files = image_input.files;
        this.uploadFile = files[0];
    },
    insertNeeds() {
      const file = this.uploadFile;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const data = {
        user_id: this.user_id,
        item_name: this.item_name,
        price: this.price,
        start_at: this.start_at,
        end_at: this.end_at,
        quantity: this.quantity,
        image: '',
        image_content_type: '',
        note: this.note,
      };

      reader.onload = function() {
        const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs';
        let image_content_type = reader.result.split(',')[0].split(';')[0].split(':')[1];
        let binary_data = reader.result.split(',')[1];
        data['image'] = binary_data;
        data['image_content_type'] = image_content_type;
        console.log(data);
        axios.post(url, data)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          alert(err);
        });
      };
      reader.onerror = function() {
        console.log(reader.error);
      };
    },
    updateNeeds() {
      const file = this.uploadFile;
      const reader = new FileReader();
      console.log(file);
      reader.readAsDataURL(file);

      var data = {
        id: this.id,
        item_name: this.item_name,
        price: this.price,
        start_at: this.start_at,
        end_at: this.end_at,
        quantity: this.quantity,
        image: '',
        image_content_type: '',
        note: this.note,
      };

      reader.onload = function() {
        const url = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/${this.id}`;
        let image_content_type = reader.result.split(',')[0].split(';')[0].split(':')[1];
        let binary_data = reader.result.split(',')[1];
        data['image'] = binary_data;
        data['image_content_type'] = image_content_type;
        console.log(data);
        axios.put(url, data)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          alert(err);
        });
      };
      reader.onerror = function() {
        console.log(reader.error);
      };
    },
  },
  created() {
    if(this.id) {
      this.user_id = this.need.user_id;
      this.item_name = this.need.item_name;
      this.price = this.need.price;
      this.start_at = moment(Date(this.need.start_at)).format("YYYY-MM-DD");
      this.end_at = moment(Date(this.need.end_at)).format("YYYY-MM-DD");
      this.quantity = this.need.quantity;
      this.image = this.need.image;
      this.note = this.need.note;
      this.image_path = this.need.image_path;
    }
  },
  props: ['id']
}
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
}
</style>
