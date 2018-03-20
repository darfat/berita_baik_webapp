<template>
<div class="main-home">
  <el-row :gutter="10" class="slider-wrapper">
    <el-col :xs="24" :sm="24">
      <div class="container">
        <top-slider></top-slider>
        <div class="spacer"></div>
        <headline-slider></headline-slider>
      </div>
    </el-col>    
  </el-row>

  <el-row :gutter="10">
    <el-col :xs="24" :sm="18">
      <div class="">
        <!--<articles-card :title="'Berita Baik Terbaru'" :limit=9></articles-card>-->
      </div>
    </el-col>
    <el-col :xs="24" :sm="6">
      <div class="">
        <!--<popular-news-side></popular-news-side>-->
      </div>
      <div class="">
        <!-- <infografis-side :editorialSlug="'infografis'"  > </infografis-side> -->
      </div>
    </el-col>    
  </el-row>

  <el-row :gutter="10">
    <!-- <el-col :xs="24" :sm="24"><home-youtube-video></home-youtube-video></el-col>-->
  </el-row>

  <el-row :gutter="10">
    <!-- <el-col :xs="24" :sm="24"><social-feed></social-feed></el-col>-->
  </el-row>

  <el-row :gutter="10">
    <!-- <el-col :xs="24" :sm="24"><events></events></el-col> -->
  </el-row>

  <el-row :gutter="10">
    <el-col :xs="24" :sm="18"><galeri></galeri></el-col>
    <el-col :xs="24" :sm="6"><div class="grid-content bg-purple-light"></div></el-col>    
  </el-row>

  <el-row :gutter="10">
    <!--<el-col :xs="24" :sm="24"><subscribe></subscribe></el-col>-->
  </el-row>

 

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
  background-color: #E6E6E6;
  padding-top: 20px;
}

.spacer{
  margin-top: 20px; 
}
.el-row {
  margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
