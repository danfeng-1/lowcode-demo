
// 整合处理器
import textComp from './textComp.js'
import picComp from './picComp.js'
import tabList from './tabList.js'
let obj = {
  textComp,
  picComp,
  tabList
}

// 通过组件名,获取组件的数据
export const getComponent = (info, attr, dataStr) => {
  let component = obj[info.type](attr, dataStr) // attr传递给某一个组件的处理器hanlder
  component.info = info
  return component
}
