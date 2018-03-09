<template>
  <div class="infografis-detail-main">      
    <div class="main-container">
        <infografis :slug="slug" :articleID="articleID"></infografis>
    </div>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { Infografis, PopularNewsSide, ArticlesCard, Subscribe, Events } from '@/views/portal/components'

export default {
  name: 'InfografisDetailLayout',
  props: {
    articleID: { type: String },
    editorialSlug: { type: String },
    slug: { type: String }
  },
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
    console.log(this.slug)
    console.log(this.articleID)
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/infografis-detail-main.scss";

</style>