<template>
  <b-modal
    :id="id"
    title="完了"
  >
    <p class="my-4">{{ text }}</p>
    <div slot="modal-footer">
        <b-btn variant="primary" class="mr-2" to="/">TOPへ戻る</b-btn>
    </div>
  </b-modal>
</template>
<script>
export default {
  name: 'ConfirmModal',
  props: {
    'text': String,
    'id': String
  }
}
</script>
