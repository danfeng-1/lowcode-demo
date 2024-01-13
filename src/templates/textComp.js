
import { getAttrStr } from '@/utils/index.js'

// 组件处理器，对组件属性和数据的处理封装
let handle = (attr, dataStr) => {

  let attribute = [
  {
    key: "width",
    name: '宽度',
    value: '100',
    type: "input",
    placeholder: "请输入宽度"
  },
  {
    key: "height",
    name: '高度',
    value: '40',
    type: "input",
    placeholder: "请输入高度"
  },
  {
    key: "color",
    name: '字体颜色',
    value: '#ff0000',
    type: "color",
    placeholder: "请选择颜色"
  },
  {
    key: "fontSize",
    name: '字体大小',
    value: '14',
    type: "input",
    placeholder: "请输入字体大小"
  }]
  // 传了attr则是在更新他，否则就是第一次挂载
  if(attr) {
    attribute = attr
  }

  let data = {txt: '这些是文本'}
  // 传了dataStr则是在更新他，否则就是第一次挂载
  if(dataStr) {
    data = JSON.parse(dataStr) // {txt: dataStr}
  }
  // <textComp width=100 height=40 color=#ff0000 fontSize=14  data='{"txt":"这些是文本"}'></textComp>
  let template = `<textComp ${getAttrStr(attribute)} data='${JSON.stringify(data)}'></textComp>`
  console.log('template',template)

  return { attribute, data, template}

  }


export default handle