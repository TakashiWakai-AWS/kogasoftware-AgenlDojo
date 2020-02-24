<template>
  <div id="app">
    <div v-if="$store.state.isLoggedIn">
      <!-- <div class="amplify-sign-out"> -->
        <!-- Amplify UIのSign Out用コンポーネント -->
        <!-- <amplify-sign-out/> -->
      <!-- </div> -->
      <router-link to="/">TOPへ</router-link>
    </div>
    <!-- 認証していない時はログイン画面を表示 -->
    <div v-else>
      <amplify-sign-in username='' v-bind:signInConfig="signInConfig"/>
    </div>
  </div>
</template>

<script>
// import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'

window.LOG_LEVEL = 'VERBOSE';

export default {
  name: 'app',
  data(){
    return {
      signInConfig: {
        usernameAttributes: 'UserName',
        signInFields: [
          {
            label: 'UserName',
            key: 'username',
            required: true,
            displayOrder: 0,
            type: 'string',
          }
        ]
      }
    }
  },
  async beforeCreate() {
    // Auth.currentAuthenticatedUser()でユーザ情報を取得する。
    // 取得できなければ認証ステータスをfalseに設定する
    try {
      this.$store.dispatch('getUserInfoFromCognito');
      this.$store.commit('signIn');
      // let cognitoUser = await Auth.currentAuthenticatedUser()
      // this.signedIn = true
      // this.username = cognitoUser.username
    } catch (err) {
      this.$store.commit('notSignIn');
      // this.signedIn = false
    }
    // 認証ステータスが変わった時に呼び出されるイベントを登録
    AmplifyEventBus.$on('authState', async  info => {
      if (info === 'signedIn') {
        this.$store.commit('signIn');
        // let cognitoUser = await Auth.currentAuthenticatedUser()
        // this.signedIn = true
        // this.username = cognitoUser.username
      } else {
        this.$store.commit('notSignIn');
        // this.signedIn = false
      }
    });
  }
};
</script>

<style scoped>

#sign-in {
  margin-top: 50px;
}
.amplify-sign-out {
  float: right;
}

</style>
