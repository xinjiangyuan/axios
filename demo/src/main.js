import Vue from 'vue'
import App from './App.vue'
import api from './api'

Vue.config.productionTip = false

Vue.use(api)

new Vue({
  render: h => h(App),
}).$mount('#app')
