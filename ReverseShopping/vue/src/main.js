import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMoment from 'vue-moment'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)
Vue.use(VueMoment);

Vue.config.productionTip = false

Vue.filter('addComma', function(val) {
  if (!val) return val
  return val.toLocaleString();
});

Vue.filter('itemStatus', function(val) {
  switch (val) {
    case 0:
      return 'ほぼ新品'
    case 1:
      return '非常に良い'
    case 2:
      return '良い'
    default: return '可'
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
