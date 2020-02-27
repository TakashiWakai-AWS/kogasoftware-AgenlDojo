import axios from 'axios'

const needsModule = {
  state: {
    dataList : [],
    data: {},
    loading: false
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
    }
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
        context.commit('getNeeds', payload);
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', 'ニーズ一覧の取得に失敗しました。');
        }
      )
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
        context.commit('getNeeds', payload);
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', 'ニーズの検索に取得に失敗しました。');
        }
      )
    },
    async getNeedById(context, { id }) {
      context.commit('startNeedsLoading')
      let payload = {
        data: {}
      }
      const need = context.rootState.needs.dataList.find((c) => c.id === id)
      // const need = false
      if (need) {
        payload.data = need;
      } else {
        const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs';
        await axios.get(`${url}/${id}`)
        .then(response => {
          payload.data = response.data[0];
        }).catch(
          function(err) {
            console.log({err})
            context.commit('getError', 'ニーズの取得に失敗しました。');
          }
        )
      }
      context.commit('getNeed', payload);
    },
    async getNeedsByUserId(context) {
      context.commit('startNeedsLoading')
      const payload = {
        dataList: [],
      };
      const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs/user';
      const user_id = context.rootState.user.data.id
      await axios.get(`${url}/${user_id}`)
      .then(response => {
        payload.dataList = response.data;
      }).catch(
        function(err) {
          console.log({err})
          context.commit('getError', 'ニーズ一覧の取得に失敗しました。');
        }
      )
      context.commit('getNeeds', payload);
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
      await axios.post(url, data)
      .then(() => {
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
      if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            let image_content_type = reader.result.split(',')[0].split(';')[0].split(':')[1];
            let binary_data = reader.result.split(',')[1];
            data['image'] = binary_data;
            data['image_content_type'] = image_content_type;
        };
        reader.onerror = function() {
          console.log(reader.error);
        };
      }
      await axios.put(url, data)
      .then(() => {
        context.dispatch('getLatestsNeeds')
      })
      .catch(err => {
        console.log({err})
        context.commit('getError', 'ニーズ登録に失敗しました。');
      });
    },
  }
}

export default needsModule
