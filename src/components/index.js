
// 注册所有的组件

import textComp from './textComp.vue'
import picComp from './picComp.vue'
import tabList from './tabList.vue'
let obj = {
  textComp,
  picComp,
  tabList
}

// 依次调用注册所有的组件
function install(Vue) {
  Object.keys(obj).forEach(key => {
    Vue.component(key, obj[key])
  })
}

let API  = {
  version: '1.0',
  install
}

export default API