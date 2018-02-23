<template>
    <div class="frontpage-wrapper">
        <top-slider></top-slider>
        <headline-slider></headline-slider>    
        <div class="container">
          <el-row :gutter="20">
            <el-col :span="16">
              <latest-news></latest-news>
            </el-col>
            <el-col :span="8">
              TERPOPULAR
            </el-col>
          </el-row>
        </div>
        <div>BOX LATEST</div><div>BOX TERPOPULAR</div>
        <div>BOX SECTION</div><div>SIDEBAR</div>
        <div>BOX SECTION</div><div>SIDEBAR</div>
        <div>CITRA</div>
        <div>MEDSOS</div>
        <div>AGENDA</div>
        
    </div>    
</template>

<script>
import { TopSlider, HeadlineSlider, LatestNews } from '@/views/home/components'

export default {
  name: 'frontpage',
  components: {
    TopSlider,
    HeadlineSlider,
    LatestNews
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
