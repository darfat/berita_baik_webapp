<template>
    <div class="frontpage-wrapper">
        <top-slider></top-slider>
        <headline-slider></headline-slider>    
    
        <h3>This is FrontPage </h3>        
        <h3>This is FrontPage </h3>
        <h3>This is FrontPage </h3>
        <h3>This is FrontPage </h3>
        <h3>This is FrontPage </h3>
        <h3>This is FrontPage </h3>
    </div>
    

    
</template>

<script>
import { TopSlider, HeadlineSlider } from '@/views/home/components'

export default {
  name: 'frontpage',
  components: {
    TopSlider,
    HeadlineSlider
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/home.scss";

.frontpage-wrapper {
  padding-top: 150px
  
}
</style>
