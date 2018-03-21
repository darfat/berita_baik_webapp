<template>
  <div class="app-wrapper">
    <home-header></home-header>
    <home-main></home-main>
    <home-footer></home-footer>    
  </div>
</template>
<script>
import { HomeHeader, HomeMain, HomeFooter } from '@/views/home/components'
export default {
  name: 'HomeLayout',
  components: { HomeHeader, HomeMain, HomeFooter }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper { @include clearfix; position: relative; height: 100%; width: 100%; }
</style>
