<template>
  <div class="infografis-detail-main">      
    <div class="main-container">
        <infografis></infografis>
    </div>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { Infografis, PopularNewsSide, ArticlesCard, Subscribe, Events } from '@/views/portal/components'

export default {
  name: 'InfografisLayout',
  components: {
    ArticleSeparator,
    Infografis, PopularNewsSide, ArticlesCard, Subscribe, Events
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
@import "src/styles/infografis-detail-main.scss";

</style>