<template>
  <div class="infografis-main">      
    <div class="infografis-main-container">
      <div class="content-container">
        <infografis-list></infografis-list>
      </div>
    </div>
    <div class="content-container">
      <el-row :gutter="20">
        <el-col :span="16">
          <articles-card></articles-card>
        </el-col>
        <el-col :span="8">
          <popular-news-side></popular-news-side>
        </el-col>
      </el-row>
      <hr/>
      <events></events>
       
    </div>
    <div class="sub-content-container" >
      <hr/>
       <subscribe></subscribe>
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