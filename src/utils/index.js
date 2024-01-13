import Vue from 'vue'

export let getAttrStr = (attrs) => {
  let attrStr = ''
  attrs.forEach(item => {
    attrStr += item.key + '=' + item.value + " "
  })
  return attrStr
}

export const genId = () => { // 获取随机Id
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
  }
  return s4() + s4() + '-' + s4()
  // 0x10000：以0x开头的16进制数10000转成十进制数就是65536，
  // 实际上这是为了后面获取四位随机数所以乘10000
  // 而为了获取包含字母在内的字符就用了16进制
}

// 挂载组件的函数
export const mountedComponent = (component) => {
  
  let data = {}
  let id = component.info.id

  let compWidth = 0
  let compHeight = 0
  // 遍历所有的属性
  if(component.attribute) {
    
    component.attribute.forEach(item => {
      data[item.key] = item.value

      if(item.key === 'width') {
        compWidth = item.value
      }
      if(item.key === 'height') {
        compHeight = item.value
      }
    })
    
  }

  // 之所以setTimeout的原因是等调用该函数外面的组件先渲染了再找id进行挂载
  setTimeout(() => {
    new Vue({
      name: id.toString(),
      data() {
        return data
      },
      template: component.template,
      el: document.getElementById(id),
      mounted() {
        this.$el.id = id
        this.$el.style.position = "absolute"
        this.$el.style.cursor = "pointer"
        this.$el.style.left = `${component.position.left}px`
        this.$el.style.top = `${component.position.top}px`
        this.$el.style.zIndex = `${component.position.zIndex}`
        this.$el.style.width = `${compWidth}px`
        this.$el.style.height = `${compHeight}px`
      }
  
    })
  }, 500)
  
}