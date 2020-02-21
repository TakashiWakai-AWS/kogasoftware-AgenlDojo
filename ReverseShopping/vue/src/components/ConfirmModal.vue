<template>
  <b-modal
    :id="id"
    title="確認"
  >
    <p class="my-4">{{ text }}</p>
    <div slot="modal-footer">
        <b-btn variant="primary" class="mr-2" to="/" @click="action" v-if="transition === true">はい</b-btn>
        <b-btn variant="primary" class="mr-2" @click="action" v-else>はい</b-btn>
        <b-btn @click="$bvModal.hide(id)" class="button">いいえ</b-btn>
    </div>
  </b-modal>
</template>
<script>
export default {
  name: 'ConfirmModal',
  props: {
    'text': String,
    'id': String,
    'action': Function,
    'transition': {
      type: Boolean,
      default: true,
    }
  }
}
</script>
