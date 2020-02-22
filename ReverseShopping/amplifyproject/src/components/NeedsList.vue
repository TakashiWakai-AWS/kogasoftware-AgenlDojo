<template>
  <div class="d-frex flex-column">
    <Need v-for="need in $store.state.needs.dataList"
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

</style>
