<template>
  <div class="header">
    <b-navbar id="header" toggleable="lg" type="dark" variant="#333">
      <b-navbar-brand to="/">Reverse Shopping</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <template v-if="$store.state.isLoggedIn">
            <div id="user-link-wrapper" class="mr-4">
                ようこそ<b-link id="user-link" to="/user">
                          {{ $store.state.loginUserData.name }}
                        </b-link>さん
            </div>   
            <b-button
              v-b-modal.modal-1
              size="sm"
              class="button my-2 mr-2 my-sm-0"
            >ログアウト</b-button>
          </template>
          <template v-else>
            <b-button  to="/sign-in" size="sm" class="button my-2 mr-2 my-sm-0">
              ログイン
            </b-button>
            <b-button to="/sign-up" size="sm" class="button my-2 my-sm-0">
              新規登録
            </b-button>
          </template>
        </b-navbar-nav>
    </b-navbar>
    <b-modal id="modal-1" title="確認">
      <p class="my-4">ログアウトしますか？</p>
      <div slot="modal-footer">
          <b-btn to="/" @click="signOut" variant="primary" class="mr-2">
            はい
          </b-btn>
          <b-btn @click="$bvModal.hide('modal-1')" class="button">
            いいえ
          </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    signOut() {
      this.$store.commit('signOut');
      this.$bvModal.hide('modal-1');
    }
  }
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
