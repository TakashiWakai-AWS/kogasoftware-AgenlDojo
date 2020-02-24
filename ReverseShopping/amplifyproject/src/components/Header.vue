<template>
  <div class="header fixed-top">
    <b-navbar id="header" toggleable="lg" type="dark" variant="#333">
      <b-navbar-brand to="/">Reverse Shopping</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <template v-if="$store.state.user.isLoggedIn">
            <div id="user-link-wrapper" class="mr-4">
                ようこそ<b-link id="user-link" to="/user">
                          {{ $store.state.user.data.name }}
                        </b-link>さん
            </div>
            <!-- <b-button
              v-b-modal.modal-logout
              size="sm"
              class="button my-2 mr-2 my-sm-0"
            >ログアウト</b-button> -->
            <amplify-sign-out v-b-modal.modal-logout/>
          </template>
          <template v-else>
            <b-button  to="/sign-in" size="sm" class="button my-2 mr-2 my-sm-0">
              ログイン
            </b-button>
            <!-- <b-button to="/sign-up" size="sm" class="button my-2 my-sm-0">
              新規登録
            </b-button> -->
          </template>
        </b-navbar-nav>
    </b-navbar>
    <ConfirmModal id="modal-logout" text="ログアウトしますか？" :action="signOut"/>
  </div>
</template>

<script>
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
  name: 'Header',
  async beforeCreate() {
    this.$store.dispatch('getUserInfoFromCognito');
  },
  methods: {
    signOut() {
      this.$store.commit('signOut');
      this.$bvModal.hide('modal-logout');
    }
  },
  components: { ConfirmModal }
}
</script>

<style scoped>
#header {
  color: #FFF;
  background-color: #D74B4B;
}

#user-link-wrapper {
  height: 30px;
}

#user-link {
  line-height: 30px;
}
</style>
