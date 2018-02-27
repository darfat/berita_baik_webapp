<template>
  <div class="video-wrapper">
    <div class="video-main">  
      <div class="container">
        <video-g></video-g>
      </div>
    </div>
    <div class="section-wrapper">
      <div class="container">
        <el-row>
          <el-col :span="18">
            <articles-card></articles-card>
          </el-col>
          <el-col :span="6">
            <popular-news-side></popular-news-side>
          </el-col>
        </el-row>
        <hr style="margin:20px 0" />
        <events></events>
        <hr style="margin:20px 0" />
        <subscribe></subscribe>
      </div>
    </div>
    
  </div>
    
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { VideoG, PopularNewsSide, ArticlesCard, Subscribe, Events } from '@/views/portal/components'

export default {
  name: 'VideoLayout',
  components: {
    ArticleSeparator,
    VideoG, PopularNewsSide, ArticlesCard, Subscribe, Events
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
  height: auto;
  background-color: #FFF;
}
.video-main{
  background-color: #222;
  padding: 20px 0; 
}
.container{
  // background-color: #FFF;
}
.section-wrapper{  
  padding: 20px 0; 
}

</style>