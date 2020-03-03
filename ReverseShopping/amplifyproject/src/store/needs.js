import axios from 'axios'

const needsModule = {
  state: {
    dataList : [],
    data: {},
    loading: false,
    dealdataLoading: false,
    dealingDataList: []
  },
  mutations: {
    getNeeds(state, payload) {
      state.dataList = payload.dataList
      state.loading = false
    },
    getNeed(state, payload) {
      state.data = payload.data
      state.loading = false
    },
    startNeedsLoading(state) {
      state.loading = true
    },
    startNeedsDealDataLoading(state) {
      state.dealdataLoading = true
    },
    getDealingNeeds(state, payload) {
      state.dealingDataList = payload.dataList
      state.dealdataLoading = false
    },
  },
  actions: {
    async getNeedsTest(context) {
      context.commit('startNeedsLoading')
      const payload = {
        dataList: [
          {
            'id': '1',
            'user_id': '1',
            'item_name': 'good1',
            'price': 10000,
            'quantitiy': '1',
            'start_at': '2020-02-01',
            'end_at': '2020-03-31',
            'note': 'good1です。',
            'image_path': require('../assets/image001.jpg')
          },
          {
            'id': '2',
            'user_id': '2',
            'item_name': 'good2',
            'price': 20000,
            'quantitiy': '1',
            'start_at': '2020-02-01',
            'end_at': '2020-03-31',
            'note': 'good2です。',
            'image_path': require('../assets/image002.jpg')
          },
        ],
      };
      context.commit('getNeeds', payload);
    },
    async getLatestsNeeds(context) {
      context.commit('startNeedsLoading')
      const payload = {
        dataList: [],
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/latest';
      await axios.get(url)
      .then(response => {
        if (response.data.errorMessage) throw Error()
        payload.dataList = response.data;
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', 'ニーズ一覧の取得に失敗しました。');
        }
      )
      context.commit('getNeeds', payload);
    },
    async searchNeedsByItemName(context, params) {
      context.commit('startNeedsLoading')
      const payload = {
        dataList: [],
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs';
      await axios.get(url, { params })
      .then(response => {
        payload.dataList = response.data;
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', 'ニーズの検索に取得に失敗しました。');
        }
      )
      context.commit('getNeeds', payload);
    },
    async getNeedById(context, { id }) {
      context.commit('startNeedsLoading')
      let payload = {
        data: {}
      }
      let need = context.rootState.needs.dataList.find((c) => c.id === id)
      // const need = false
      if (need) {
        payload.data = need;
      } else {
        const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs';
        await axios.get(`${url}/${id}`)
        .then(response => {
          console.log({response})
          payload.data = response.data[0];
        }).catch(
          function(err) {
            console.log({err})
            context.commit('getError', 'ニーズの取得に失敗しました。');
          }
        )
      }
      console.log({payload})
      context.commit('getNeed', payload);
      console.log({needsbyId: context.state.data})
    },
    async getNeedsByUserId(context) {
      context.commit('startNeedsLoading')
      const payload = {
        dataList: [],
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/user';
      const user_id = context.rootState.user.data.id
      await axios.get(`${url}/${user_id}`, { params: { deal_status: 0 } })
      .then(response => {
        console.log({needs:response})
        payload.dataList = response.data;
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', 'ニーズ一覧の取得に失敗しました。');
        }
      )
      context.commit('getNeeds', payload);
    },
    async getDealingNeeds(context) {
      context.commit('startNeedsDealDataLoading')
      const payload = {
        dataList: [],
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/user';
      const user_id = context.rootState.user.data.id
      await axios.get(`${url}/${user_id}`, { params: { deal_status: 1 } })
      .then(response => {
        console.log({needs:response})
        payload.dataList = response.data;
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', '取引中ニーズ一覧の取得に失敗しました。');
        }
      )
      context.commit('getDealingNeeds', payload);
    },
    async insertNeeds(context, { need, file }) {
      const user_id = context.rootState.user.data.id
      const data = {
        user_id: user_id,
        item_name: need.item_name,
        price: need.price,
        start_at: need.start_at,
        end_at: need.end_at,
        quantity: need.quantity,
        image: '',
        image_content_type: '',
        note: need.note,
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs';
      const alter_image_to_base64 = function() {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function(event) {
            console.log(event);
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
      };
      if (file) await alter_image_to_base64();
      await axios.post(url, data)
      .then((result) => {
        console.log(result);
        context.dispatch('getLatestsNeeds')
      })
      .catch(err => {
        console.log({err})
        context.commit('getError', 'ニーズ登録に失敗しました。');
      });
    },
    async updateNeeds(context, { need, file, needs_id }) {
      const user_id = context.rootState.user.data.id
      const data = {
        user_id: user_id,
        item_name: need.item_name,
        price: need.price,
        start_at: need.start_at,
        end_at: need.end_at,
        quantity: need.quantity,
        image: '',
        image_content_type: '',
        note: need.note,
      };
      const url = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/${needs_id}`;
      const alter_image_to_base64 = () => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function(event) {
            console.log(event);
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
      if (file) await alter_image_to_base64();
      await axios.put(url, data)
      .then(() => {
        context.dispatch('getLatestsNeeds')
      })
      .catch(err => {
        console.log({err})
        context.commit('getError', 'ニーズ登録に失敗しました。');
      });
    },
    async deleteNeed(context, { id }) {
      const url = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/status/${id}`;
      await axios.put(url, { deal_status: 3 })
      .then(() => {
        console.log('delete need')
        context.dispatch('getLatestsNeeds')
      })
      .catch(err => {
        console.log({err})
        context.commit('getError', 'ニーズの削除に失敗しました。');
      });
    },
    async insertNeedsEvaluation(context, { goods_id, evaluation, needs_id }) {
      const user_id = context.rootState.user.data.id
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/evaluation/needs'
      const data = {
        goods_id,
        evaluation,
        user_id
      }
      await axios.post(url, data)
      .then(() => {
        console.log('insert needs evaluation')
        const needsUrl = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/status/${needs_id}`;
        const goodsUrl = `https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/goods/status/${goods_id}`;
        const statusData = { deal_status: 2 }
        axios.put(needsUrl, statusData)
        .then((response) => {
          if (response.data.errorMessage) throw Error(response.data.errorMessage)
          console.log('needs status to 2')
          axios.put(goodsUrl, statusData)
          .then(() => {
            console.log('goods status to 2')
          })
          .catch(err => {
            console.log('good status error')
            throw Error(err)
          });
        }).catch(err => {
          console.log('needs status error')
          throw Error(err)
        })
      })
      .catch(err => {
        console.log({err})
        context.commit('getError', '評価に失敗しました。');
      });
    },
  }
}

export default needsModule
