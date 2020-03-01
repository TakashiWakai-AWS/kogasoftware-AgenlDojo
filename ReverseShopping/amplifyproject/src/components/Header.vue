<template>
  <div class="header fixed-top">
    <b-navbar id="header" toggleable="lg" type="dark" variant="#333">
      <b-navbar-brand to="/">Reverse Shopping</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <template v-if="isLoggedIn">
            <div id="user-link-wrapper" class="mr-4">
                ようこそ<b-link id="user-link" to="/user">{{ nickname }}</b-link>さん
            </div>
            <b-button
              @click="confirm"
              size="sm"
              class="button my-2 mr-2 my-sm-0"
            >ログアウト</b-button>
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
    <ConfirmModal/>
    <CompleteModal/>
    <ErrorModal/>
  </div>
</template>

<script>
import { Auth, Logger } from 'aws-amplify'
import { mapState } from 'vuex'
import ConfirmModal from '../components/ConfirmModal.vue'
import CompleteModal from '../components/CompleteModal.vue'
import ErrorModal from '../components/ErrorModal.vue'
const logger = new Logger('Header'/*, 'ERROR'*/);

export default {
  name: 'Header',
  async beforeCreate() {
    this.$store.dispatch('getUserInfoFromCognito');
  },
  computed: mapState({
    isLoggedIn: 'isLoggedIn',
    nickname: state => state.user.data.nickname
  }),
  methods: {
    signOut() {
      Auth.signOut()
        .catch((err) => {
          logger.error('sign out error', err);
          // this.$store.commit('getError', 'ログアウトに失敗しました。');
        });
      this.$store.commit('signOut');
      this.$store.commit('clearUser');
      this.$store.commit('hideConfirmModal')
    },
    confirm() {
      this.$store.commit('showConfirmModal', {
        text: 'ログアウトしますか？',
        action: this.signOut,
      })
    }
  },
  components: { ConfirmModal, CompleteModal, ErrorModal }
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
