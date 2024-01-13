<template>
  <div class="wrapper">
    <headTab :tabcheckIndex="checkIndex" @checkTabChange="checkTabCh"></headTab>

    <!-- 当前如果选中了组件 -->
    <div v-if="currentComp">
      <!-- 渲染当前组件的样式数据attribute -->
      <div v-if="checkIndex === 0">

        <div 
        class="styleItem"
        v-for="(item, index) in currentComp.attribute"
        :key="index"
        >
        <span class="label">{{item.name}}</span>
        <!-- type == input -->
        <input 
        class="inputStyle" 
        v-if="item.type === 'input'" 
        type="text" 
        v-model="item.value"
        @blur="updateComp"
        >
        <!-- type == color -->
        <input 
        class="inputStyle" 
        v-if="item.type === 'color'" 
        type="color" 
        v-model="item.value"
        @change="updateComp"
        >

        </div>

      </div>

      <!-- 数据 -->
      <div v-if="checkIndex === 1">
        <textarea 
        class="dataBox" 
        v-model="dataStr"
        @change="updateComp"
        ></textarea>
      </div>
    </div>

    
    <!-- 如果当前并未选择 -->
    <div style="padding:15px" v-else>
      当前没有正在编辑的组件
    </div>
  </div>
</template>
<script>
import headTab from './comps/headTab.vue'
import { getComponent } from '@/templates/index.js'
import { mountedComponent } from '@/utils/index.js'
export default {
  props: {
    currentComp: {
      type: Object
    }
  },
  components: {
    headTab
  },
  data() {
    return {
      checkIndex: 0,
      dataStr: ''
    }
  },
  watch: {
    // 当组件发生变化，数据发生改变
    currentComp(val) {
      this.dataStr = JSON.stringify(val.data)
    }
  },
  methods: {
    checkTabCh(index) {
      this.checkIndex = index
    },
    // 更新
    updateComp() {
      console.log('----',this.dataStr)
      // 1. 获取新的组件,当前的组件、传递新的样式属性，传递数据
      let component = getComponent(this.currentComp.info, this.currentComp.attribute, this.dataStr)
      // 2. 设置组件的位置
      component.position = this.currentComp.position
      // 3. 重新挂载组件
      mountedComponent(component)

      // 把右边修改的同步给画布，借助App中转给centerView.vue
      this.$emit('updateComp', component)

    }
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  width: 350px;
  .styleItem{
    margin: 10px 0;
    display: flex;
    .label{
      display: inline-block;
      width: 100px
    }
    .inputStyle{
      flex: 1 0;
    }
  }
  .dataBox{
    width: 90%;
    margin: 15px;
    min-height: 100px;
  }
}
</style>
