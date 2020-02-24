import { Auth } from 'aws-amplify'
import { Logger } from 'aws-amplify';

const logger = new Logger('foo');

const userModule = {
  state: {
    data: {
      'id': '',
      'name': '',
      'nickname': '',
      'address': '',
      'tel': '',
      'email': '',
      'settlement_info': '*************',
    },
    isLoggedIn : false,
    // data: {
    //   'id': '1',
    //   'name': 'hoge',
    //   'nickname': 'fuga',
    //   'address': '東京都台東区上野1-17-6',
    //   'tel': '03-3833-0733',
    //   'email': 'asdjdahaj@aksj.jp',
    //   'settlement_info': '*************',
    // },
  },
  mutations: {
    signIn(state) {
      state.isLoggedIn = true;
    },
    notSignIn(state) {
      state.isLoggedIn = false;
    },
    signOut(state) {
      state.isLoggedIn = false;
    },
    getUserInfo(state, payload) {
      const userInfo = payload
      state.data = {
        'id': '1',
        'name': userInfo.username,
        'nickname': '未登録',
        'address': userInfo.attributes.address,
        'tel': userInfo.attributes.phone_number,
        'email': userInfo.attributes.email,
        'settlement_info': '*************',
      }
      state.loading = false
    },
    startUserLoading(state) {
      state.loading = true
    },
  },
  actions: {
    async getUserInfoFromCognito(context) {
      context.commit('startUserLoading')
      const cognitoUser = await Auth.currentAuthenticatedUser()
        .catch(() => {
          context.commit('notSignIn');
        })
      logger.debug(cognitoUser);
      if (!cognitoUser) {
        context.commit('notSignIn');
        return
      }
      context.commit('signIn');
      context.commit('getUserInfo', cognitoUser);
    }
  }
}

export default userModule
