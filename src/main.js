import Vue from 'vue'
import App from './App.vue'
import myComps from './components/index.js'

Vue.config.productionTip = false
Vue.use(myComps) // 全局注册所有自定义组件

new Vue({
  render: h => h(App),
}).$mount('#app')
