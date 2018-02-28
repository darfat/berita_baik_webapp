<template>
  <div class="search-wrapper">
    <search-home></search-home>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { SearchHome, PopularNewsSide, ArticlesCard, Subscribe, Events } from '@/views/portal/components'

export default {
  name: 'SEARCHLayout',
  components: {
    ArticleSeparator,
    SearchHome, PopularNewsSide, ArticlesCard, Subscribe, Events
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
.search-wrapper {
  margin-top: 155px;
  margin-bottom: 1px;
  margin-left: auto;
  margin-right: auto;  
  width: 100%;
  height: auto;
  background-color: #FFF;
}

</style>