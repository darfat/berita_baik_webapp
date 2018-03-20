<template>
  <div class="home">
    <home-header></home-header>
    <home-main></home-main>
    <home-footer></home-footer>    
  </div><!--/.home-->
</template>

<script>
import { HomeHeader, HomeMain, HomeFooter } from '@/views/home/components'

export default {
  name: 'HomeLayout',
  components: {
    HomeHeader,
    HomeMain,
    HomeFooter
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/home.scss";

.home {
  height: 100%;
  width: 100%;
  background-color: #fff;
  margin: 0;
  padding: 0;
}
</style>
