import axios from 'axios'
import route from '../router/index.js'

const goodsModule = {
  state: {
    dataList : [],
    data: {},
    loading: false,
    dealingDataList: [],
    dealdataLoading: false,
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
    getDealingGoods(state, payload) {
      state.dealingDataList = payload.dataList
      state.loading = false
    },
    startGoodsDealDataLoading(state) {
      state.dealdataLoading = true
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
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', '出品の取得に失敗しました。');
        }
      )
      context.commit('getGoods', payload);
    },
    async getGoodById(context, params) {
      context.commit('startGoodsLoading')
      let payload = {
        data: {}
      }
      const good = context.rootState.goods.dataList.find((c) => c.id === params.id)
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
      await axios.get(`${url}/${user_id}`, { params: { deal_status: 0 } })
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
    async getDealingGoods(context) {
      context.commit('startGoodsDealDataLoading')
      const payload = {
        dataList: [],
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods/user';
      const user_id = context.rootState.user.data.id
      await axios.get(`${url}/${user_id}`, { params: { deal_status: 1 } })
      .then(response => {
        payload.dataList = response.data;
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', '取引中出品一覧の取得に失敗しました。');
        }
      )
      context.commit('getDealingGoods', payload);
    },
    async insertGoods(context, { good, file, needs_id }) {
      context.commit('showLoadingModal');
      const user_id = context.rootState.user.data.id
      const data = {
        user_id: user_id,
        needs_id: needs_id,
        item_status: good.item_status,
        quantity: 1,
        image: '',
        image_content_type: '',
        note: good.note,
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods';

      const alter_image_to_base64 = () => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function() {
            let image_content_type = reader.result.split(',')[0].split(';')[0].split(':')[1];
            let binary_data = reader.result.split(',')[1];
            data['image'] = binary_data;
            data['image_content_type'] = image_content_type;
            resolve(data);
          }
          reader.readAsDataURL(file);
          reader.onerror = function() {
            console.log(reader.error);
          };
        })
      }
      await alter_image_to_base64();
      await axios.post(url, data)
      .then(() => {
        context.commit('hideLoadingModal');
        route.push('/')
      })
      .catch(
        function(err) {
          console.log({err})
          context.commit('hideLoadingModal');
          context.commit('getError', '出品登録に失敗しました。');
        }
      )
    },
    async updateGoods(context, { good, file, needs_id, goods_id }) {
      context.commit('showLoadingModal');
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods';
      const user_id = context.rootState.user.data.id
      const data = {
        user_id: user_id,
        needs_id: needs_id,
        item_status: good.item_status,
        quantity: 1,
        image: '',
        image_content_type: '',
        note: good.note,
      };
      const alter_image_to_base64 = () => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function() {
            let image_content_type = reader.result.split(',')[0].split(';')[0].split(':')[1];
            let binary_data = reader.result.split(',')[1];
            data['image'] = binary_data;
            data['image_content_type'] = image_content_type;
            resolve(data);
          }
          reader.readAsDataURL(file);
          reader.onerror = function() {
            console.log(reader.error);
          };
        })
      }
      if (file) await alter_image_to_base64()
      await axios.put(`${url}/${goods_id}`, data)
      .then(() => {
        context.commit('hideLoadingModal');
        route.push('/')
      })
      .catch(
        function(err) {
          console.log({err})
          context.commit('hideLoadingModal');
          context.commit('getError', '出品登録に失敗しました。');
        }
      )
    },
    async purchase(context, { needs_id, goods_id }) {
      context.commit('hideConfirmModal');
      context.commit('showLoadingModal');
      const needsUrl = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/status/${needs_id}`;
      const goodsUrl = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods/status/${goods_id}`;
      const data = { deal_status: 1 }
      await axios.put(needsUrl, data)
      .then((response) => {
        if (response.data.errorMessage) throw Error(response.data.errorMessage)
        axios.put(goodsUrl, data)
        .then(() => {
          context.commit('hideLoadingModal');
          context.commit('showCompleteModal', {
            text: '購入が完了しました。'
          })
        })
        .catch(err => {
          throw Error(err)
        });
      })
      .catch(err => {
        console.log({err})
        context.commit('hideLoadingModal');
        context.commit('getError', '購入に失敗しました。');
      });
    },
    async deleteGood(context, { id }) {
      context.commit('showLoadingModal');
      const url = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods/status/${id}`;
      await axios.put(url, { deal_status: 3 })
      .then(() => {
        context.commit('hideLoadingModal');
        route.push('/')
        // context.dispatch('getLatestsNeeds')
      })
      .catch(err => {
        console.log({err})
        context.commit('hideLoadingModal');
        context.commit('getError', '出品の削除に失敗しました。');
      });
    },
    async insertGoodsEvaluation(context, { goods_id, evaluation }) {
      context.commit('showLoadingModal');
      const user_id = context.rootState.user.data.id
      const url = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/evaluation/goods`;
      await axios.post(url, {
        goods_id,
        evaluation,
        user_id
      })
      .then(() => {
        context.commit('hideLoadingModal');
        context.commit('showCompleteModal', {
          text: '評価が完了しました。'
        })
      })
      .catch(err => {
        console.log({err})
        context.commit('hideLoadingModal');
        context.commit('getError', '評価に失敗しました。');
      });
    },
  }
}

export default goodsModule
