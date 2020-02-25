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
        payload.dataList = response.data;
      });
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
      });
      context.commit('getNeeds', payload);
    },
    async getNeedById(context, params) {
      context.commit('startNeedsLoading')
      let payload = {
        data: {}
      }
      const need = context.rootState.needs.dataList.find((c) => c.id === params.id)
      // const need = false
      if (need) {
        payload.data = need
      } else {
        const url = 'https://v39tpetcnj.execute-api.ap-northeast-1.amazonaws.com/dev/api/v0/needs';
        await axios.get(`${url}/${params.id}`)
        .then(response => {
          payload.data = response.data[0];
        });
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
      });
      context.commit('getNeeds', payload);
    },
  }
}

export default needsModule
