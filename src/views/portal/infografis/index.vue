<template>
  <div class="infografis-main">      
    <div class="main-container">
        <infografis-list></infografis-list>
    </div>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { InfografisList, PopularNewsSide, ArticlesCard, Subscribe, Events } from '@/views/portal/components'

export default {
  name: 'Infografis',
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