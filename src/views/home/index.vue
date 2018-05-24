<template>
<div class="app-wrapper">
  <el-row class="slider-wrapper">    
    <div class="container">
      <top-slider></top-slider>
      <div class="m-t-20"></div>
      <headline-slider></headline-slider>
    </div>    
  </el-row>
  <div class="container">
    <el-row :gutter="20">    
      <el-col :xs="24" :sm="24">
        <ads-banner :showTitle=true position="Home : Atas"></ads-banner>        
      </el-col>
      <el-col :xs="24" :sm="16">        
          <articles-card :title="'Berita Baik Terbaru'" :limit="4"></articles-card>
          <div class="side-separator">
            <router-link  :to="{ name: 'editorial-menu', params: { 'editorialSlug':'indonesia-baik'} }" >
              <span> Buka lebih banyak lagi </span>
            </router-link>
          </div>
          <div class="m-t-20"></div>
          <articles-card :title="'Indonesia Bangga'" :editorialSlug="'indonesia-bangga'" :editorialType="'p'" :limit=2 ></articles-card>
          <div class="side-separator">
            <router-link  :to="{ name: 'editorial-by-type-menu', params: { 'editorialType': 'p', 'editorialSlug':'indonesia-membangun'} }" >
              <span> Buka lebih banyak lagi </span>
            </router-link>
          </div>
          <div class="m-t-20"></div>
          <articles-card :title="'Indonesia Membangun'" :editorialSlug="'indonesia-membangun'" :limit=2 ></articles-card>
          <div class="side-separator">
            <router-link  :to="{ name: 'editorial-menu', params: { 'editorialSlug':'indonesia-membangun'} }" >
              <span> Buka lebih banyak lagi </span>
            </router-link>
          </div>
      </el-col>    
      <el-col :xs="24" :sm="8">      
          <popular-news-side></popular-news-side>
          
          <div class="side-separator">
            <router-link :to="{ name: 'content-more', params: { 'editorialSlug': 'none',  } }">
              <span> Buka lebih banyak lagi </span>
            </router-link>
          </div>
          <div class="m-t-10"></div>
          <infografis-side :editorialSlug="'infografis'"  > </infografis-side>      
          <div class="m-t-10"></div>
          <div class="side-separator">
            <router-link  :to="{ name: 'editorial-image', params: { 'editorialSlug': 'infografis' } }" >
              <span> Buka lebih banyak lagi </span>
            </router-link>
          </div>
          <div class="m-t-10"></div>
          <!-- <advertisement-side></advertisement-side> -->
          <ads-banner :showTitle=true position="Home : Kanan"></ads-banner>
      </el-col>
    </el-row>
    <el-row>    
      <el-col :xs="24" :sm="16"><gallery></gallery></el-col>
      <el-col :xs="24" :sm="8">
        <div class="ads">
          <ads-banner :showTitle=true position="Home : Galeri"></ads-banner>
        </div>
      </el-col>    
    </el-row>
    <div class="gray-separator"><span></span> </div> 
    <home-youtube-video></home-youtube-video>
    <div class="gray-separator"><span></span></div>
    <ads-banner :showTitle=false position="Home : Tengah"></ads-banner>
    <el-row >    
      <el-col :xs="24" :sm="24">
        <events></events>
      </el-col>
    </el-row>    
    <div class="gray-separator"><span></span></div>    
    <el-row >    
      <el-col :xs="24" :sm="24"><subscribe></subscribe></el-col>    
    </el-row>
  </div>
</div>    
</template>

<script>
import { TopSlider, HeadlineSlider, LatestNews, HomeYoutubeVideo, Gallery } from '@/views/home/components'
import { PopularNewsSide, Subscribe, Events, ArticlesCard, InfografisSide, SocialFeed, InstagramFeed, AdvertisementSide, AdsBanner } from '@/views/portal/components'

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
    ArticlesCard,
    InfografisSide,
    SocialFeed,
    InstagramFeed,
    AdvertisementSide,
    AdsBanner,
    Gallery
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

.el-row {
  margin-bottom: 20px;
  &:last-child {
    // margin-bottom: 0;
  }
}

.ads{
  background-color: $black-2;
  min-height: 420px;
  text-align: center;
  padding: 10px;
  small{
    color: #666;
  }
}

</style>
