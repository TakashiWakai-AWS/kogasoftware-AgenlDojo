import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMoment from 'vue-moment'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueMoment);

Vue.config.productionTip = false

Vue.filter('addComma', function(val) {
  return val.toLocaleString();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
