<template>
  <div id="app">
    <!-- 認証していない時はログイン画面を表示 -->
    <div v-if="!$store.state.isLoggedIn">
      <amplify-authenticator v-bind:auth-config="authConfig" />
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'

window.LOG_LEVEL = 'VERBOSE';

export default {
  name: 'app',
  data(){
    return {
      signedIn: false,
      // username: '',
      authConfig: {
        usernameAttributes: 'email',
        //signInConfig: {
        //   header: 'サインイン'
        // },
        signUpConfig: {
          hideAllDefaults: true,
          defaultCountryCode: '81',
          signUpFields: [
            { label: 'Name', key: 'name', required: true, type: 'text', displayOrder: 0 },
            { label: 'Nickname', key: 'nickname', required: true, type: 'string', displayOrder: 1 },
            { label: 'Password', key: 'password', required: true, type: 'password', displayOrder: 2 },
            { label: 'Adress', key: 'address', required: true, type: 'string', displayOrder: 3 },
            { label: 'Phone Number', key: 'phone_number', required: true, type: 'string', displayOrder: 4 },
            // { label: '電話', key: 'local_phone_number', required: true, type: 'string', displayOrder: 4 },
            { label: 'Email', key: 'email', required: true, type: 'email', displayOrder: 5 },
            { label: 'Settlement', key: 'custom:settlement_info', required: true, type: 'string', displayOrder: 6 },
          ]
        },
        //confirmSignUpConfig: {},
        //forgotPasswordConfig: {},
        //confirmSignInConfig: {}
      },
    }
  },

  async beforeCreate() {

    // 認証ステータスが変わった時に呼び出されるイベントを登録
    AmplifyEventBus.$on('authState', async  info => {
      if (info === 'signedIn') {
        this.$store.dispatch('getUserInfoFromCognito', { isLoginProcess: true });
      }
      const processToLogin = ['signUp', 'confirmSignUp', 'signIn'] 
      if (processToLogin.every(item => item !== info) && this.$route.path !== '/') {
        this.$router.push('/')
      }
    });
  },
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
