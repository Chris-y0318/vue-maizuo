import Vue from 'vue'
import App from './App.vue'
// 导入router模块
import router from './router'
// 导入store
import store from './store'
// 引入全局过滤器filter
import '@/util/filter.js'
import '@/util/directive'
import '@/util/component'
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })
Vue.config.productionTip = false

new Vue({
  // 使用router模块
  router,
  store,
  render: h => h(App)
}).$mount('#app')
