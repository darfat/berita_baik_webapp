<template>
  <div class="about-wrapper">
    <about-us></about-us>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { AboutUs, PopularNewsSide, ArticlesCard, Subscribe, Events } from '@/views/portal/components'

export default {
  name: 'GalleryLayout',
  components: {
    ArticleSeparator,
    AboutUs, PopularNewsSide, ArticlesCard, Subscribe, Events
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
.about-wrapper{  
  margin: 0;
  width: 100%;
  height: auto;
  background-color: #e6e6e6;
  padding: 20px 0 0 0;
}
</style>