<template>
  <div class="wraper">
    <h3>LowCode平台</h3>
    <div class="btn-box">
      <div class="btn active">预览</div>
      <div class="btn">保存</div>
      <div class="btn">发布</div>
    </div>

  </div>
</template>
<style lang="less" scoped>
.wraper{
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 15px;
  .btn-box{
    width: 300px;
    display: flex;
    justify-content: space-around;
    .btn{
      background: #8B8B00;
      font-size: 15px;
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
      &.active{
        background: #556B2F;
      }
    }
  }
}
</style>