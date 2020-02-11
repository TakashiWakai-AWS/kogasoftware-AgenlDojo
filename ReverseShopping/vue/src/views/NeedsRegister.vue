<template>
  <div class="needs-register mx-5">
    <h1 class="my-5" v-if="id">ニーズ編集画面</h1>
    <h1 class="my-5" v-else>ニーズ登録画面</h1>

    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-input v-model="need.item_name" placeholder="名前" class="mt-3"></b-form-input>
      <b-form-input v-model="need.price" placeholder="金額" class="mt-3"></b-form-input>
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
        <b-form-file v-model="need.image_path" class="d-inline" plain></b-form-file>
      </div>
      <div class="form-group row mt-3" v-else>
        <label for="image_path" class="col-sm-2 col-form-label text-left">画像：</label>
        <b-form-file v-model="need.image_path" class="col-sm-10" plain></b-form-file>
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
            <b-btn variant="primary" class="mr-2" to="/">はい</b-btn>
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
export default {
  data: function () {
    return {
      need: this.id ? this.$store.state.needsDataList.find((c) => c.id = this.id) : {}
    }
  },
  props: {
    'id': String
  }
}
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
}
</style>
