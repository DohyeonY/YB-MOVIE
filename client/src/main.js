import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'

import router from './router'
import store from './store'

import VueSession from 'vue-session'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueSession);
Vue.use(VueGlide)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
