<template>
  <div class="app-wrapper">      
      <home-header></home-header>
      <home-navbar></home-navbar>
      <home-main></home-main>      
      <home-footer></home-footer>      

  </div>
</template>

<script>
import { HomeHeader, HomeNavbar, HomeMain, HomeFooter } from '@/views/home/components'

export default {
  name: 'HomeLayout',
  components: {
    HomeHeader,
    HomeNavbar,
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

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

</style>
