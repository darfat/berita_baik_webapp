<template>
  <div class="video-main">
    <div class="video-main-container">  
      <div class="container">
        <video-g ></video-g>
      </div>
    </div>
    <el-row :gutter="20" class="list-container">
      <div class="container">
        <el-col :xs="24" :sm="16" class="content">
          <div class="grid-content">
          <videos-card :editorialSlug="'video'"></videos-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" class="side-content">
          <div class="grid-content a-side">
            <div>
            <popular-news-side> </popular-news-side>
            </div>
            <div class="side-separator">
              <span> Buka lebih banyak lagi </span>
            </div>
          </div>
        </el-col>
      </div>
    </el-row> 
    <!-- <div class="content-container">
      <div class="gray-separator"> <span> </span>  </div>
    </div>
    <el-row :gutter="20" class="subscriber-container">
      <div class="m-t-10"></div>
      <div class="container">
          <el-col :xs="24" :sm="24" class="content">
              <subscribe></subscribe>
          </el-col>
      </div>      
    </el-row> -->
    <div class="m-t-10"></div>
  </div>
    
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { VideoG, PopularNewsSide, VideosCard, Subscribe, Events } from '@/views/portal/components'

export default {
  name: 'VideoLayout',
  components: {
    ArticleSeparator,
    VideoG, PopularNewsSide, VideosCard, Subscribe, Events
  },
  data() {
    return {
      title: ''
    }
  },
  created() {
    console.log('videog main')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.video-wrapper {
  margin-top: 155px;
  margin-bottom: 1px;
  margin-left: auto;
  margin-right: auto;
     
  width: 100%;
  height: 100%;
  background-color: #FFF;
}
.video-main{
  // padding-top: 150px
 
}
.video-main-container{
  background-color: #222;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0; 
}
.container{
  // background-color: #FFF;
}
.section-wrapper{  
  padding: 20px 0; 
}

</style>