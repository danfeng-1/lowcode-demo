<template>
  <div class="wrapper">
    <div 
    class="tabItem" 
    :class="{'active': checkIndex === index}" 
    v-for="(item, index) in tabList" :key="index"
    @click="checkTab(index)"
    >
      {{item}}
    </div>
  </div>
  
</template>
<script>
export default {
  props: {
    tabcheckIndex: {
      type: [String, Number]
    }
  },
  data() {
    return {
      tabList: ['样式', '数据'],
      checkIndex: this.tabcheckIndex
    }
  },
  methods: {
    checkTab(index) {
      console.log(index)
      this.checkIndex = index
      this.$emit('checkTabChange', index)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #eee;
  .tabItem{
    padding: 15px;
    cursor: pointer;
  }
  .active{
    border-bottom: 2px solid #00C5CD;
  }
}
</style>