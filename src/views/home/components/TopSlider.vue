<template>
<div class="slidertop-wrapper">
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
console.log('top slider main')
export default {
  name: 'TopSlider'
}
</script>

<style>
.slidertop-wrapper{
  padding-top: 20px;
  background-color: rgba(238, 238, 238, 0.226);
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>