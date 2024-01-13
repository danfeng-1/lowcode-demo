<template>
  <div class="wrapper" >
    <img :src="picUrl" :style="setStyle">

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
    data: {
      type: String, // {url: 'f01.png'}
    }
  },
  data() {
    return {
      dataString: JSON.parse(this.data).filename
      }
  },
  computed: {
    picUrl() {
      return require('../assets/' + this.dataString)
    },
    setStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
      }
    }
  }
}
</script>