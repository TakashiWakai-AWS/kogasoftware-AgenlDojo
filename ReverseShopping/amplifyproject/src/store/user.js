import axios from 'axios'
import { Auth, Logger } from 'aws-amplify'

const logger = new Logger('user', 'ERROR');

const userModule = {
  state: {
    data: {
      'id': '',
      'name': '',
      'nickname': '',
      'address': '',
      'tel': '',
      'email': '',
      'settlementInfo': '*************',
    },
  },
  mutations: {
    getUserInfo(state, payload) {
      const userInfo = payload
      state.data = {
        'id': '',
        'name': userInfo.attributes.name,
        'nickname': userInfo.attributes.nickname,
        'address': userInfo.attributes.address,
        'tel': userInfo.attributes.phone_number,
        'email': userInfo.attributes.email,
        'settlementInfo': userInfo.attributes['custom:settlement_info'],
      }
    },
    getUserId(state, userId) {
      state.data.id = userId
    },
    startUserLoading(state) {
      state.loading = true
    },
    clearUser(state) {
      state.data = {}
    },
    endUserLoading(state) {
      state.loading = false
    },
  },
  actions: {
    async getUserInfoFromCognito(context, { isLoginProcess } = { isLoginProcess: false }) {
      context.commit('startUserLoading')
      // Auth.currentAuthenticatedUser()でユーザ情報を取得する。
      const cognitoUser = await Auth.currentAuthenticatedUser()
        // 取得できなければ認証ステータスをfalseに設定する
        .catch(err => {
          logger.error('currentAuthenticatedUser error', err)
          // isLoginProcess ?
            // context.commit('getError', 'ログインに失敗しました。'); :
            // context.commit('getError', 'ユーザー情報の取得に失敗しました。');
          context.commit('cancelSignIn');
        })
      if (!cognitoUser) {
        logger.debug('not authenticated')
        if (isLoginProcess) {
          // context.commit('getError', 'ログインに失敗しました。');
        }
        context.commit('cancelSignIn');
        return
      }
      context.commit('signIn');

      context.commit('getUserInfo', cognitoUser);

      const { id } = await getUserIdByEmail(cognitoUser.attributes.email)
      context.commit('getUserId', id);

      context.commit('endUserLoading')

      // DBのUserテーブルのidを取得する処理
      async function getUserIdByEmail(email) {
        const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/user/id';
        return axios.post(url, { mail: email })
        .then(response => response.data[0])
        .catch(err => {
          logger.error('getUserIdByEmail error', err);
          // context.commit('getError', 'ユーザー情報の取得に失敗しました。');
          context.commit('cancelSignIn');
        })
      }
    },
  }
}

export default userModule
