<template>
  <div id="app">
    <div v-if="$store.state.user.isLoggedIn">
      <!-- <div class="amplify-sign-out"> -->
        <!-- Amplify UIのSign Out用コンポーネント -->
        <!-- <amplify-sign-out/> -->
      <!-- </div> -->
      <router-link to="/">TOPへ</router-link>
    </div>
    <!-- 認証していない時はログイン画面を表示 -->
    <div v-else>
      <amplify-authenticator v-bind:auth-config="authConfig" />
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
      signedIn: false,
      // username: '',
      authConfig: {
            //signInConfig: {
            //   header: 'サインイン'
            // },
            signUpConfig: {
              hideAllDefaults: true,
              // defaultCountryCode: '81',
              signUpFields: [
                { label: 'ユーザー名', key: 'username', required: true, type: 'text', displayOrder: 0 },
                { label: 'パスワード', key: 'password', required: true, type: 'password', displayOrder: 1 },
                { label: '姓', key: 'family_name', required: true, type: 'string', displayOrder: 2 },
                { label: '名', key: 'given_name', required: true, type: 'string', displayOrder: 3 },
                { label: 'メール', key: 'email', required: true, type: 'email', displayOrder: 4 },
                // { label: '電話', key: 'local_phone_number', required: true, type: 'string', displayOrder: 5 },
                { label: '電話', key: 'phone_number', required: true, type: 'string', displayOrder: 5 },
                { label: '住所', key: 'address', required: true, type: 'string', displayOrder: 6 }
              ]
            },
            //confirmSignUpConfig: {},
            //forgotPasswordConfig: {},
            //confirmSignInConfig: {}
      },
    }
  },
  async beforeCreate() {
    // Auth.currentAuthenticatedUser()でユーザ情報を取得する。
    // 取得できなければ認証ステータスをfalseに設定する
    try {
      this.$store.dispatch('getUserInfoFromCognito');
      // this.$store.commit('signIn');
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
