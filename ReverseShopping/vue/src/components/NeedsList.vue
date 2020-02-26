<template>
  <div class="d-frex flex-column">
    <p v-if="$store.state.needs.dataList.length === 0" class="mt-5 nothing">
      該当するニーズがありません
    </p>
    <Need v-else
          v-for="need in $store.state.needs.dataList"
          :key="need.id"
          :need="need"></Need>
  </div>
</template>

<script>
import Need from './Need.vue'

export default {
  name: 'NeedsList',
  components: { Need }
}
</script>

<style scoped>
.nothing {
  font-size: 20px;
}
</style>
