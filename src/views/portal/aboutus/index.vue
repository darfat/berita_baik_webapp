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
  created() {
    console.log('gallery main')
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.about-wrapper{
  margin-top: 155px;
  margin-bottom: 1px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: auto;
  background-color: #FFF;
  padding-bottom: 20px;
}

</style>