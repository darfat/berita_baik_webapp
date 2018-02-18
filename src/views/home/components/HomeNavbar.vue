<template>
  
</template>

<script>

export default {
  data() {
    return {
      x: '1'
    }
  }
}
console.log('home navbar')
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.menu-logo{
  height: 40px;
  width: 40px;
  background-color: rgba(255,255,255  ,0.6 );
  border-radius: 50%;
}
.menu-logo-img{
  height: 30px;
  margin: 5px
}
.menu-wrapper {
  background-color: $bb-yellow;  
  padding: 0;
  margin: 0;
  .el-menu-nav{
    color: #FFF;
  }
}
</style>

