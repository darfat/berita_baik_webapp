<template>
    <div class="frontpage-wrapper">
        <div class="slider-wrapper"  style="background-color: #e6e6e6; margin-bottom: 20px;">
          <div class="container">
            <top-slider></top-slider>
            <headline-slider></headline-slider>
          </div>
        </div>
        <div class="container">
          <el-row :gutter="20">
            <el-col :span="16">
              <latest-news></latest-news>
            </el-col>
            <el-col :span="8">
              <popular-news-side></popular-news-side>
            </el-col>
          </el-row>
        </div>
       <div class="video-container">
          <citra></citra>   
       </div>
        <div class="container">            
            <hr/>
            <social-feed></social-feed>   
            <hr/>
            <events></events>   
        </div>
        
        <div>
          <hr/>
          <subscribe></subscribe>
        </div> 
    </div>    
</template>

<script>
import { TopSlider, HeadlineSlider, LatestNews, Citra } from '@/views/home/components'
import { PopularNewsSide, Subscribe, Events, SocialFeed } from '@/views/portal/components'

export default {
  name: 'frontpage',
  components: {
    TopSlider,
    HeadlineSlider,
    LatestNews,
    PopularNewsSide,
    Citra,
    Subscribe,
    Events,
    SocialFeed
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
