<template>
  <div id="app">
    <head-view></head-view>
    <div class="content-box">
      <left-view></left-view>
      <center-view @currComp="getCurrComp" :mycurrentComp="mycurrentComp"></center-view>
      <right-view :currentComp="mycurrentComp" @updateComp="updateComp"></right-view>
    </div>
    
  </div>
</template>

<script>
import headView from './views/headView.vue'
import centerView from './views/centerView.vue'
import leftView from './views/leftView.vue'
import rightView from './views/rightView.vue'

export default {
  name: 'App',
  components: {
    headView,
    centerView,
    leftView,
    rightView
  },
  data() {
    return {
      mycurrentComp: null // 当前选中的组件
    }
  },
  methods: {
    getCurrComp(comp) {
      this.mycurrentComp = comp // 接收currentComp
    },
    updateComp(comp) {
      this.mycurrentComp = comp
    }
  }
}
</script>

<style lang="less">
.content-box{
  display: flex;
  height: calc(100vh - 80px);
}
</style>
