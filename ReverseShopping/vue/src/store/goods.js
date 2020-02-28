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
      // const good = context.rootState.goods.dataList.find((c) => c.id === params.id)
      const good = false
      if (good) {
        payload.data = good
      } else {
        const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods';
        await axios.get(`${url}/${params.id}`)
        .then(response => {
          console.log({getGoodById: response})
          payload.data = response.data[0];
          context.commit('getGood', payload);
        }).catch(
          function(err) {
            console.log({err})
            context.commit('getError', '出品の取得に失敗しました。');
          }
        )
      }
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
        context.commit('getGoods', payload);
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', '出品一覧の取得に失敗しました。');
        }
      )
    },
    async insertGoods(context, { good, file, needs_id }) {
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

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        let image_content_type = reader.result.split(',')[0].split(';')[0].split(':')[1];
        let binary_data = reader.result.split(',')[1];
        data['image'] = binary_data;
        data['image_content_type'] = image_content_type;
      }
      reader.onerror = function() {
        console.log(reader.error);
      };
      console.log({goods: data})

      await axios.post(url, data)
      .then(() => console.log('insert goods'))
      .catch(
        function(err) {
          console.log({err})
          context.commit('getError', '出品登録に失敗しました。');
        }
      )
    },
    async updateGoods(context, { good, file, needs_id, goods_id }) {
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
      console.log({updateGoodsData: data})
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          let image_content_type = reader.result.split(',')[0].split(';')[0].split(':')[1];
          let binary_data = reader.result.split(',')[1];
          data['image'] = binary_data;
          data['image_content_type'] = image_content_type;
        }
        reader.onerror = function() {
          console.log(reader.error);
        };
      }
      await axios.put(`${url}/${goods_id}`, data)
      .catch(
        function(err) {
          console.log({err})
          context.commit('getError', '出品登録に失敗しました。');
        }
      )
    },
    async purchase(context, { needs_id, goods_id }) {
      const needsUrl = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/status`;
      const goodsUrl = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods/status/${goods_id}`;
      const data = { deal_status: 1 }
      await axios.put(needsUrl,  {
        id: needs_id,
        deal_status: 1
      })
      .then((response) => {
        if (response.data.errorMessage) throw Error(response.data.errorMessage)
        console.log('needs')
        console.log(response)

        axios.put(goodsUrl, data)
        .then((response) => {
          console.log('goods')
          console.log(response)
          context.commit('hideConfirmModal');
          context.commit('showCompleteModal', {
            text: '購入が完了しました。'
          })
        })
        .catch(err => {
          console.log('good error')
          throw Error(err)
        });
      })
      .catch(err => {
        console.log({err})
        context.commit('hideConfirmModal');
        context.commit('getError', '購入に失敗しました。');
      });
    },
  }
}

export default goodsModule
