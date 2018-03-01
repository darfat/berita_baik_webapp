<template>
  <div class="search-wrapper">
    <search-advanced></search-advanced>    
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { SearchAdvanced, PopularNewsSide, ArticlesCard, Subscribe, Events } from '@/views/portal/components'

export default {
  name: 'SEARCHLayout',
  components: {
    ArticleSeparator,
    SearchAdvanced, PopularNewsSide, ArticlesCard, Subscribe, Events
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
  padding: 20px 0;     
  width: 100%;
  height: auto;
  background-color: #FFF;
}

</style>