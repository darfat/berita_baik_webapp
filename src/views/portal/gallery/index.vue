<template>
  <div class="gallery-main">      
    <div class="main-container">
        <gallery></gallery>
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
      title: ''
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