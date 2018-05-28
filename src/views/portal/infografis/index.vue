<template>
  <div class="infografis-main">      
    <div class="infografis-main-container">
      <div class="container">
        <infografis-list></infografis-list>
      </div>
    </div>
    <el-row :gutter="20" class="list-container">
      <div class="container">
        <el-col :xs="24" :sm="16" class="content">
          <div class="grid-content">
            <articles-card></articles-card>
          </div>
         
        </el-col>
        <el-col :xs="24" :sm="8" class="side-content">
          <div class="grid-content a-side">
            <div>
            <popular-news-side :editorialSlug="editorialSlug"> </popular-news-side>
            </div>
            <div class="side-separator">
              <span> Buka lebih banyak lagi </span>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
    <div class="container m-t-20">
      <div class="gray-separator"> <span> </span>  </div>
    </div>
    <el-row :gutter="20" class="events-container">
      <div class="container">
      <el-col :xs="24" :sm="24" class="content">
            <events></events>
      </el-col>
      </div>
    </el-row>  
    <div class="content-container">
      <div class="gray-separator"> <span> </span>  </div>
    </div>
    <el-row :gutter="20" class="subscriber-container">
      <div class="m-t-10"></div>
      <div class="container">
          <el-col :xs="24" :sm="24" class="content">
              <subscribe></subscribe>
          </el-col>
      </div>      
    </el-row>
    <div class="m-t-10"></div>
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
  created() {}
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/infografis-main.scss";

</style>