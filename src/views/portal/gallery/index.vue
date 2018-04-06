<template>
  <div class="gallery-main">  
    <div class="gallery-main-container">    
      <div class="content-container">
          <gallery :editorialSlug="editorialSlug" ></gallery>
      </div>
    </div>
    <div class="content-container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <articles-card :editorialSlug="editorialSlug"></articles-card>
        </el-col>
        <el-col :xs="24" :sm="8">
          <popular-news-side></popular-news-side>
        </el-col>
      </el-row>
      <hr/>
      <div class="spacer"><events></events></div>
       
    </div>
    <div class="sub-content-container" >
      <hr/>
       <div class="spacer"><subscribe></subscribe></div>
    </div>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { Gallery, PopularNewsSide, ArticlesCard, Subscribe, Events } from '@/views/portal/components'

export default {
  name: 'GalleryLayout',
  components: {
    ArticleSeparator,
    Gallery, PopularNewsSide, ArticlesCard, Subscribe, Events
  },
  data() {
    return {
      title: '',
      editorialSlug: 'gallery-foto'
    }
  },
  created() {
    console.log('gallery main')
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/gallery-main.scss";

</style>