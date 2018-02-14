<template>
  <div class="menu-wrapper">
    <el-menu
    :default-active="activeIndex"
    class="container el-menu-nav"
    mode="horizontal"
    @select="handleSelect"
    background-color="#F5DF00"
    text-color="#0A2F88"
    active-text-color="#0A2F88">
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2"><a href="">Indonesia Baik</a></el-menu-item>
      <el-menu-item index="3"><a href="">Indonesia Membangun</a></el-menu-item>
      <el-menu-item index="4"><a href="">Indonesia Bangga</a></el-menu-item>
      <el-menu-item index="5"><a href="">Melancong</a></el-menu-item>
      <el-menu-item index="6"><a href="">Teknologi</a></el-menu-item>
      <el-menu-item index="7"><a href="">Panggung</a></el-menu-item>
      <el-menu-item index="8"><a href="">Citra</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
console.log('home navbar')
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/home.scss";
.menu-wrapper {
  background-color: $bb-yellow;
  font-weight: 700;

  .el-menu-nav{
    
  }
}
</style>

