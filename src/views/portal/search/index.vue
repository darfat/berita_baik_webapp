<template>
  <div class="search-wrapper">
    <search-home></search-home>
    <div class="container">
      <SocialFeed></SocialFeed>
      <hr />
      <Events></Events>
      <hr />
      <Subscribe></Subscribe>
    </div>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { SearchHome, Subscribe, Events, SocialFeed } from '@/views/portal/components'

export default {
  name: 'SEARCHLayout',
  components: {
    ArticleSeparator,
    SearchHome, Subscribe, Events, SocialFeed
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

.container{
  padding: 40px 0;
}

hr{
  margin: 20px 0;
}
</style>