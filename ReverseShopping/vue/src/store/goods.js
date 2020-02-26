import axios from 'axios'

const goodsModule = {
  state: {
    dataList : [],
    data: {},
    loading: false,
  },
  mutations: {
    getGoods(state, payload) {
      state.dataList = payload.dataList
      state.loading = false
    },
    getGood(state, payload) {
      state.data = payload.data
      state.loading = false
    },
    startGoodsLoading(state) {
      state.loading = true
    },
  },
  actions: {
    async getGoodsTest(context) {
      context.commit('startGoodsLoading')
      const payload = {
        dataList: [
          {
            'id': '1',
            'user_id': '1',
            'needs_id': '1',
            'price': 30000,
            'item_status': 1,
            'note': 'aaa',
            'image_path': require('../assets/image003.jpg')
          },
          {
            'id': '2',
            'user_id': '2',
            'needs_id': '1',
            'price': 40000,
            'item_status': 0,
            'note': 'aaa',
            'image_path': require('../assets/image003.jpg')
          },
          {
            'id': '3',
            'user_id': '2',
            'needs_id': '1',
            'price': 30000,
            'item_status': 1,
            'note': 'aaa',
            'image_path': require('../assets/image003.jpg')
          },
          {
            'id': '4',
            'user_id': '1',
            'needs_id': '2',
            'price': 30000,
            'item_status': 1,
            'note': 'aaa',
            'image_path': require('../assets/image003.jpg')
          },
        ],
      };
      context.commit('getGoods', payload)
    },
    async getGoodsByNeedsId(context, params) {
      context.commit('startGoodsLoading')
      const payload = {
        dataList: [],
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/goods';
      await axios.get(`${url}/${params.id}`)
      .then(response => {
        if (response.data.errorMessage) throw Error()
        payload.dataList = response.data;
        context.commit('getGoods', payload);
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', '出品の取得に失敗しました。');
        }
      )
    },
    async getGoodById(context, params) {
      context.commit('startGoodsLoading')
      let payload = {
        data: {}
      }
      const good = context.rootState.goods.dataList.find((c) => c.id === params.id)
      // const good = false
      if (good) {
        payload.data = good
      } else {
        const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods';
        await axios.get(`${url}/${params.id}`)
        .then(response => {
          payload.data = response.data[0];
        }).catch(
          function(err) {
            console.log({err})
            context.commit('getError', '出品の取得に失敗しました。');
          }
        )
      }
      context.commit('getGood', payload);
    },
    async getGoodsByUserId(context) {
      context.commit('startNeedsLoading')
      const payload = {
        dataList: [],
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods/user';
      const user_id = context.rootState.user.data.id
      await axios.get(`${url}/${user_id}`)
      .then(response => {
        payload.dataList = response.data;
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', '出品一覧の取得に失敗しました。');
        }
      )
      context.commit('getGoods', payload);
    },
    async insertGoods(context, { good, image, needs_id }) {
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods';
      const user_id = context.rootState.user.data.id
      await axios.post(url, {
        "needs_id": needs_id,
        "user_id": user_id,
        "item_status": 1,
        "quantity": 1,
        "note": good.note,
        "image": image
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', '出品登録に失敗しました。');
        }
      )
    },
    async updateGoods(context, { good, image, needs_id, goods_id }) {
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods';
      const user_id = context.rootState.user.data.id
      await axios.post(`${url}/${goods_id}`, {
        "needs_id": needs_id,
        "user_id": user_id,
        "item_status": 1,
        "quantity": 1,
        "note": good.note,
        "image": image
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', '出品登録に失敗しました。');
        }
      )
    },
  }
}

export default goodsModule
