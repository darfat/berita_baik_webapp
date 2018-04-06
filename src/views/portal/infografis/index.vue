<template>
  <div class="infografis-main">      
    <div class="infografis-main-container">
      <div class="content-container spacer">
        <infografis-list></infografis-list>
      </div>
    </div>
    <div class="content-container spacer">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <articles-card></articles-card>
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
import { InfografisList, PopularNewsSide, ArticlesCard, Subscribe, Events } from '@/views/portal/components'

export default {
  name: 'InfografisListLayout',
  components: {
    ArticleSeparator,
    InfografisList, PopularNewsSide, ArticlesCard, Subscribe, Events
  },
  data() {
    return {
      title: ''
    }
  },
  created() {
    console.log('infografis main')
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/infografis-main.scss";

</style>