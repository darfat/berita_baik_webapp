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
    <el-col :xs="24" :sm="24">
      <ads-banner :showTitle=true :id="1"></ads-banner>
      <div class="spacer"></div>
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
        <div class="spacer"></div>
        <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
        </div>
        <div class="spacer m-t-10"></div>
        <infografis-side :editorialSlug="'infografis'"  > </infografis-side>      
        <div class="spacer m-t-10"></div>
        <div class="side-separator">
          <router-link  :to="{ name: 'infografis-menu', params: {} }" >
            <span> Buka lebih banyak lagi </span>
          </router-link>
        </div>
        <div class="spacer m-t-10"></div>
        <advertisement-side></advertisement-side>
    </el-col>
    </div>    
  </el-row>

  <el-row>
    <div class="container">
    <el-col :xs="24" :sm="16"><gallery></gallery></el-col>
    <el-col :xs="24" :sm="8">
      <div class="ads">
        <ads-banner :showTitle=true :id="3"></ads-banner>
      </div>
    </el-col>
    </div>
  </el-row> 

  <div class="container m-b-20"> 
      <div class="gray-separator"> <span> </span>  </div>
  </div>
  <div class="spacer"></div>

  <div class="container m-b-20">
    <home-youtube-video></home-youtube-video>
  </div>
  <div class="spacer"></div>
  
  <div class="container m-b-20"> 
      <div class="gray-separator"> <span> </span>  </div>
  </div>
  <div class="spacer"></div>

  <el-row :gutter="10">
    <div class="container">
      <el-col :xs="24" :sm="24">
        <ads-banner :showTitle=true :id="2"></ads-banner>
      </el-col>
    </div>
  </el-row>
  <div class="container m-b-20"> 
      <div class="gray-separator"> <span> </span>  </div>
  </div>
  <div class="spacer"></div>
  <el-row :gutter="10">
    <div class="container">
      <el-col :xs="24" :sm="24">
        <events></events>
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
  <el-button icon="el-icon-edit" class="main-button" @click="changeTitle()">Test</el-button>
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
  },
  data() {
    return {
      title: 'My Title Custom',
      metaParams: {
        title: 'website name',
        ogImage: false,
        siteName: false,
        description: false,
        url: false
      }
    }
  },
  methods: {
    changeTitle() {
      console.log('changeTitle')
      var self = this
      this.metaParams.ogImage = 'http://localhost:9528/static/upload/images/5.jpg'
      this.metaParams.siteName = 'http://beritabaik.id'
      this.metaParams.url = 'http://beritabaik.id'
      this.metaParams.description = 'desc test'
      this.metaParams.title = 'change title'
      // http://localhost:9528/static/upload/images/5.jpg
      self.$emit('updateHead')
      // window.setTimeout(function() {
      // }, 1000)
    }
  },
  // Usage with context the component
  head: {
    // To use "this" in the component, it is necessary to return the object through a function
    meta() {
      return [
        // { name: 'description', content: this.metaParams.description, id: 'metaDesc' },
        { name: 'twitter:title', content: this.metaParams.title, id: 'metaTwTitle' },
        { n: 'twitter:description', c: this.metaParams.description, id: 'metaTwDesc' },
        { p: 'og:image', c: this.metaParams.ogImage, id: 'metaOgImage' },
        { p: 'og:site_name', c: this.metaParams.siteName, id: 'metaOgSiteName' },
        { p: 'og:description', c: this.metaParams.description, id: 'metaOgDesc' },
        { p: 'og:url', c: this.metaParams.url, id: 'metaOgUrl' }
      ]
    }
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
  min-height: 420px;
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
