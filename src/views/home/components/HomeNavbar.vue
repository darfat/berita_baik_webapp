<template>
  
</template>

<script>

export default {
  data() {
    return {
<<<<<<< HEAD
      x: '1'
=======
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
>>>>>>> c67b334c0ec493b2a1af6faf1b7a5fced5d96fbf
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

