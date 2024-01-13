<template>
  <div class="wrapper">
    <!-- 可拖拽，自定义属性 -->
    <div 
    v-for="(item, index) in menus"
    :key="index"
    class="menuItem"
    draggable="true"
    :data-type="item.type"
    :data-name="item.name"
    @dragstart="dragStart"
    >{{item.name}}</div>

  </div>
</template>
<script>
import menus from '@/data/menuList'
export default {
  data() {
    return {
      menus: menus
    }
  },
  methods: {
    // 拖拽的回调
    dragStart(e) {
      console.log('e----', e.target)
      let info = {
        name: e.target.getAttribute('data-name'),
        type: e.target.getAttribute('data-type'),
      }
      // 把拖拽的属性放进transfer中，以便画布接收到
      e.dataTransfer.setData('info', JSON.stringify(info))
    }
  }
  
}
</script>
<style lang="less" scoped>
.wrapper{
  width: 260px;
  padding: 8px;
  .menuItem{
    background: #eee;
    width: 100px;
    height: 100px;
    float: left;
    margin: 10px;
    text-align: center;
    line-height: 100px;
    cursor: pointer;
  }
}
</style>