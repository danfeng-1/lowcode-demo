

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
    key: "itemWidth",
    name: '条目宽度',
    value: '100',
    type: "input",
    placeholder: "请输入条目宽度"
  }]
  // 传了attr则是在更新他，否则就是第一次挂载
  if(attr) {
    attribute = attr
  }

  let data = {list: ['苹果', '橘子', '香蕉', '葡萄']}
  // 传了dataStr则是在更新他，否则就是第一次挂载
  if(dataStr) {
    data = JSON.parse(dataStr)
  }
  let template = `<tabList ${getAttrStr(attribute)} data='${JSON.stringify(data)}'></tabList>`
  return { attribute, data, template}

  }


export default handle