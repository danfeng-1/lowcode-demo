<template>
  <div class="wrapper" :style="setStyle">
    <div
    @click="tabIndex = index"
    :class="{'active': tabIndex === index }"
    class="tabItem"
    :style="itemStyle"
    v-for="(item, index) in dataList"
    :key="index"
    >
    {{item}}
    </div>
  </div>
</template>
<script>
export default {
  // 传进来的参数：宽高、颜色字体颜色、文本
  props: {
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    itemWidth: { // 条目的宽度
      type: [String, Number]
    },
    data: {
      type: String
    }
  },
  data() {
    return {
      dataList: JSON.parse(this.data).list,
      tabIndex: 0, // 选中的tab项
    }
  },
  computed: {
    // 大的style
    setStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
      }
    },
    // 小的style, 只有一个宽度
    itemStyle() {
      return {
        width: this.itemWidth + 'px'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .tabItem{
    background: #b5b6ba;
    color: #444;
    border-radius: 5px;
    text-align: center;
    &.active{
      background: #e68342;
      color: #fff
    }

  }
}
</style>
