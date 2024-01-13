<template>
  <!-- drapOver 是移动过来时候的事件回调， drop是松开鼠标的回调 -->
  <div class="wrapper" id="canvasBox" @dragover="dragOver" @drop="drop" @click="checkComp">
    <!-- 根据components里面的组件挂载组件，挂载点 -->
    <div
    :id="item.info.id"
    v-for="(item, index) in components"
    :key="index"
    >
    </div>
    <!-- 选中的时候渲染出来, 右键点击删除 -->
    <div 
    v-if="currentComp" 
    class="borderStyle" 
    @mousedown="mouseDownStart"
    id="borderBox"
    :style="setBorderStyle"
    @contextmenu.prevent="rightClick"

    ></div>
  </div>
</template>
<script>
import { genId, mountedComponent } from '@/utils/index.js'
import { getComponent } from '@/templates/index.js'
export default {
  props: {
    mycurrentComp: {
      type: Object
    }
  },
  components: {

  },

  data() {
    return {
      components: [], // 每拖拽一次就有一个组件
      zIndex: 0,
      currentComp: null,
      startPosition: {x: 0, y: 0}
    }
  },
  computed: {
    setBorderStyle() {
      let compWidth = 0
      let compHeight = 0
      if(this.currentComp) {
        this.currentComp.attribute.forEach(item => {

          if(item.key === 'width') {
            compWidth = item.value
          }
          if(item.key === 'height') {
            compHeight = item.value
          }
        })
        return {
          width: `${compWidth}px`,
          height: `${compHeight}px`,
          left: `${this.currentComp.position.left}px`,
          top: `${this.currentComp.position.top}px`,
          zIndex: `${this.currentComp.position.zIndex}`
        }
      } else {
        return {}
      }

    }
  },
  methods: {
        
    // 拖拽到画布的回调
    dragOver(e) {
      e.preventDefault() // 阻止到画布的默认行为
    },
    // 鼠标松开的回调
    drop(e) {
      e.preventDefault()
      // 获取transfer 传递过来的参数
      let info = JSON.parse(e.dataTransfer.getData("info"))
      console.log('画布获取到了 info', info)
      info.id = genId() // 拖拽过来回设置一个唯一的Id
      
      // 组件的设置：甚至只需要传入info的type 传入得到基本模板组件
      let component = getComponent(info)  
      console.log('component', component)

      // 松开鼠标的时候默认层级++
      this.zIndex++

      // 找到组件的宽高
      let compWidth = 0
      let compHeight = 0
      // 在当前组件的属性中计算组件宽高
      component.attribute.forEach(item => {
        console.log('item', item)
        if(item.key === 'width') {
          compWidth = item.value
        }
        if(item.key === 'height') {
          compHeight = item.value
        }
      })
      // 计算组件距离画布左边和上面的距离
      let left = e.offsetX - (compWidth / 2)
      let top = e.offsetY - (compHeight / 2)
      if(left < 0 ) left = 0
      if(top < 0) top = 0

      // 为组件绑定位置信息
      component.position = {left, top, zIndex: this.zIndex}

      // 把当前组件存进组件数组中
      this.components.push(component)

      // 挂载组件
      mountedComponent(component)
    },
    checkComp(e) {
      
      // 设定id的正则判断条件
      let reg = /\w{8}-\w{4}/
      let node = e.target
      let count = 0
      while(node && !reg.test(node.id)) {
        count++
        if(count > 20) return // 防止死循环，当超过20个标签
        node = node.parentNode // 没有找到id就往父级元素找
      }
      // 更新当前的组件
      if(node && node.id) {
        this.currentComp = this.components.find(item => {
          if(item.info.id === node.id) {
            
            return item // 就是当前这一集的组件画边框
          }
        })
      } else {
        this.currentComp = null 
      }

      // 当选定组件的时候，把数据传给右边(通过App.vue这个父组件)，展示当前选定组件的属性
      this.$emit('currComp', this.currentComp)
      
    },
    // 鼠标按下的回调
    mouseDownStart(e) {
      // 记录按下瞬间的位置
      this.startPosition.x = e.clientX
      this.startPosition.y = e.clientY
      // 注册移动鼠标和松开鼠标的事件
      document.addEventListener('mousemove', this.mouseMove, true)
      document.addEventListener('mouseup', this.mouseUp, true)

    },
    // 鼠标移动的回调
    mouseMove(e) {
      // 计算偏移量
      let offsetX = e.clientX - this.startPosition.x
      let offsetY = e.clientY - this.startPosition.y

      // 组件的当前位置（原先的位置+偏移量）
      console.log('this.currentComp', this.currentComp)
      let comp = document.getElementById(this.currentComp.info.id)
      // 组件之前的style和现在的style
      Object.assign(comp.style, {
        left: this.boundaryLimit('x', this.currentComp.position.left + offsetX, this.currentComp) + 'px',
        // left: this.currentComp.position.left + offsetX + 'px',
        top: this.boundaryLimit('y', this.currentComp.position.top + offsetY, this.currentComp) + 'px'
        // top:this.currentComp.position.top + offsetY + 'px'
      })
      // 设置选中框的位置
      let borderComp = document.getElementById('borderBox')
      Object.assign(borderComp.style, {
        left: this.boundaryLimit('x', this.currentComp.position.left + offsetX, this.currentComp) + 'px',
        // left: this.currentComp.position.left + offsetX + 'px',
        top: this.boundaryLimit('y', this.currentComp.position.top + offsetY, this.currentComp) + 'px'
        // top: this.currentComp.position.top + offsetY + 'px'
      })
    },

    // 鼠标松开的回调
    mouseUp(e) {
      
      // 移出事件
      document.removeEventListener('mousemove', this.mouseMove, true)
      document.removeEventListener('mouseup', this.mouseUp, true)
      console.log('oooooooooooooo', this.currentComp)
      // 更新组件的数据
      this.currentComp.position.left = this.boundaryLimit('x', this.currentComp.position.left + (e.clientX - this.startPosition.x) , this.currentComp)
      this.currentComp.position.top = this.boundaryLimit('y', this.currentComp.position.top + (e.clientY - this.startPosition.y) , this.currentComp)
      // this.currentComp.position.left = this.currentComp.position.left + (e.clientX - this.startPosition.x)      
      // this.currentComp.position.top = this.currentComp.position.top + (e.clientY - this.startPosition.y)
    },

    // 边界限定
    boundaryLimit(type, num, comp) {
      // 画布的宽高
      let canvas = document.getElementById('canvasBox')
      let canvasWidth = canvas.clientWidth
      let canvasHeight = canvas.clientHeight

      // 组件的宽高
      let compWidth = 0
      let compHeight = 0
      comp.attribute.forEach(item => {
        if(item.key === 'width') {
          compWidth = item.value
        }
        if(item.key === 'height') {
          compHeight = item.value
        }
      })
      // 边界值
      let maxX = canvasWidth - compWidth
      let maxY = canvasHeight - compHeight

      // 对边界的判断
      let lastNum = 0
      if(type === 'x') {
        if(num < 0) {
          lastNum = 0
        } else if(num > maxX) {
          lastNum = maxX
        } else {
          lastNum = num
        }
      } else if(type === 'y') {
        if(num < 0) {
          lastNum = 0
        } else if(num > maxY) {
          lastNum = maxY
        } else {
          lastNum = num
        }
      }
      return lastNum

    },

    // 右击的回调
    rightClick() {
      if(confirm('你确定要删除当前这个组件吗？')) {
        document.getElementById(this.currentComp.info.id).remove()
      }
    },

    // 更新当前的数组
    updateArrayList(val) {
      this.components.forEach(item => {
        if(item.info.id === val.info.id) {
          item.attribute = val.attribute
          item.data = val.data
          item.template = val.template
          // item = val 是不行的哦
        }
        
      })

    }
  },
  watch: {
    // 监听当前画布的组件传过来的组件发生改变，重新渲染
    mycurrentComp(val) {
      this.currentComp = val
      this.updateArrayList(val) // 调用方法更新组件总数组 
    }

  }
}
</script>
<style lang="less" scoped>
.wrapper{
  flex: 1;
  background: #eee;
  position: relative;

  .borderStyle{
    border: 3px solid red;
    position: absolute;
  }
}
</style>