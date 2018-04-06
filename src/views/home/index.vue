<template>
<div class="app-wrapper">
  <el-row :gutter="10" class="slider-wrapper">    
    <div class="container">
      <top-slider></top-slider>
      <div class="spacer"></div>
      <headline-slider></headline-slider>
    </div>    
  </el-row>

  <el-row :gutter="20">
    <div class="container">
    <el-col :xs="24" :sm="16">      
        <articles-card :title="'Berita Baik Terbaru'" :limit="4"></articles-card>
        <div class="side-separator">
          <router-link  :to="{ name: 'editorial-menu', params: { 'editorialSlug':'indonesia-baik'} }" >
            <span> Buka lebih banyak lagi </span>
          </router-link>
        </div>
        <articles-card :title="'Indonesia Bangga'" :editorialSlug="'indonesia-bangga'" :editorialType="'p'" :limit=2 ></articles-card>
        <div class="side-separator">
          <router-link  :to="{ name: 'editorial-by-type-menu', params: { 'editorialType': 'p', 'editorialSlug':'indonesia-membangun'} }" >
            <span> Buka lebih banyak lagi </span>
          </router-link>
        </div>
        <articles-card :title="'Indonesia Membangun'" :editorialSlug="'indonesia-membangun'" :limit=2 ></articles-card>
        <div class="side-separator">
          <router-link  :to="{ name: 'editorial-menu', params: { 'editorialSlug':'indonesia-membangun'} }" >
            <span> Buka lebih banyak lagi </span>
          </router-link>
        </div>
    </el-col>    
    <el-col :xs="24" :sm="8">      
        <popular-news-side></popular-news-side>
        <div class="spacer"></div>
        <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
        </div>
        <infografis-side :editorialSlug="'infografis'"  > </infografis-side>      
        <div class="spacer m-t-10"></div>
        <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
        </div>
        <div class="spacer m-t-10"></div>
        <advertisement-side></advertisement-side>
    </el-col>
    </div>    
  </el-row>
  
  <el-row :gutter="10">
    <el-col :xs="24" :sm="24"><home-youtube-video></home-youtube-video></el-col>
  </el-row>
  
  <el-row :gutter="10">
    <div class="container">    
      <el-col :xs="24" :sm="24">
        <social-feed></social-feed>
      </el-col>
    </div>
  </el-row>


  <el-row :gutter="10">
    <div class="container">
      <div class="gray-separator"> <span> </span>  </div>
            <div class="spacer"></div>
        <el-col :xs="24" :sm="24">
          
              <events></events>
            <div class="spacer"></div>
            <div class="gray-separator"> <span> </span>  </div>
        </el-col>
      
    </div>
  </el-row>

  <el-row>
    <div class="container">
    <el-col :xs="24" :sm="16"><galeri></galeri></el-col>
    <el-col :xs="24" :sm="8">
      <div class="ads"><small>advertisement</small></div>
    </el-col>
    </div>
  </el-row>
  <div class="content-container">
    <div class="gray-separator"> <span> </span>  </div>
  </div>
  <el-row :gutter="10">
    <div class="container">
      <el-col :xs="24" :sm="24"><subscribe></subscribe></el-col>
    </div>
  </el-row>

 <div class="spacer"></div>

</div>    
</template>

<script>
import { TopSlider, HeadlineSlider, LatestNews, HomeYoutubeVideo, Galeri } from '@/views/home/components'
import { PopularNewsSide, Subscribe, Events, ArticlesCard, InfografisSide, SocialFeed, InstagramFeed, AdvertisementSide } from '@/views/portal/components'

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
    SocialFeed,
    InstagramFeed,
    AdvertisementSide
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
@import "src/styles/home.scss";
.app-wrapper { @include clearfix; position: relative; height: 100%; width: 100%; }

.slider-wrapper{
  background-color: #E6E6E6;
  padding: 20px 0;
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
  // background-color: red;
}

.ads{
  background-color: $black-2;
  height: 500px;
  text-align: center;
  padding: 10px;
  small{
    color: #666;
  }
}

hr{
  border: 0;
  height: 1px;
  background: #656565;
  margin-top: 10px;
}
</style>
