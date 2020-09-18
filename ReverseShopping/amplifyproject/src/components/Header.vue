<template>
  <div class="header fixed-top">
    <b-navbar id="header" toggleable="lg" type="dark" variant="#333">
      <b-navbar-brand to="/"><img src="" alt="">
        Reverse Shopping<img src="../assets/reverse.png" alt="logo" class="logo">
      </b-navbar-brand>
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
    <LoadingModal/>
  </div>
</template>

<script>
import { Auth, Logger } from 'aws-amplify'
import { mapState } from 'vuex'
import ConfirmModal from '../components/ConfirmModal.vue'
import CompleteModal from '../components/CompleteModal.vue'
import ErrorModal from '../components/ErrorModal.vue'
import LoadingModal from '../components/LoadingModal.vue'
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
      this.$router.push('/')
    },
    confirm() {
      this.$store.commit('showConfirmModal', {
        text: 'ログアウトしますか？',
        action: this.signOut,
      })
    }
  },
  components: { ConfirmModal, CompleteModal, ErrorModal, LoadingModal }
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
.logo {
  height: 40px;
  width: 40px;
  margin-left: 5px;
}
</style>
