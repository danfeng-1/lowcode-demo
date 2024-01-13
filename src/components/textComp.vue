<template>
  <div class="wrapper" :style="setStyle">
    <span>{{dataString}}</span>

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
    color: {
      type: [String]
    },
    fontSize: {
      type: [String, Number]
    },
    data: {
      type: String,
    }
  },
  data() {
    return {
      dataString: JSON.parse(this.data).txt
    }
  },
  computed: {
    setStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        fontSize: this.fontSize + 'px',
        color: this.color,
      }
    }
  },
  mounted() {
    console.log('88888888888',this.props)
  }
}
</script>
