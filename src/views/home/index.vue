<template>
<div class="main-home">

  <div class="slider-wrapper">
    <div class="container">
      <top-slider></top-slider>
      <div class="spacer"></div>
      <headline-slider></headline-slider>
    </div>
  </div>

  <div class="container">
    <el-row :gutter="20">
      <el-col :span="16">
        <articles-card :title="'Berita Baik Terbaru'" :limit=9></articles-card>
      </el-col>
      <el-col :span="8">
        <div>
          <popular-news-side></popular-news-side>
        </div>
        <div>
          <infografis-side :editorialSlug="'infografis'"  > </infografis-side>
        </div>
      </el-col>
    </el-row>
  </div>

  <div>
    <hr/>
    <home-youtube-video></home-youtube-video> 
  </div>  
  <div class="container">
    <hr/>
    <social-feed></social-feed> 
  </div>  
  <div class="container">            
    <hr/><events></events>
    <hr/><galeri></galeri>    
  </div>
      
  <div>
    <hr/><subscribe></subscribe>
  </div> 
</div>    
</template>

<script>
import { TopSlider, HeadlineSlider, LatestNews, HomeYoutubeVideo, Galeri } from '@/views/home/components'
import { PopularNewsSide, Subscribe, Events, ArticlesCard, InfografisSide, SocialFeed } from '@/views/portal/components'

export default {
  name: 'frontpage',
  components: {
    TopSlider,
    HeadlineSlider,
    LatestNews,
    PopularNewsSide,
    HomeYoutubeVideo,
    Subscribe,
    Events,
    Galeri,
    ArticlesCard,
    InfografisSide,
    SocialFeed
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/home.scss";

.main-home {
  // padding-top: 160px  
}

.slider-wrapper{
  background-color: #e6e6e6;
  padding: 20px 0;  
}
.spacer{
  margin-top: 20px; 
}
</style>
