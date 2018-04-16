<template>
  <div class="search-wrapper">
    <search-home :keyword="keyword"></search-home>
    <div class="container">
     
    </div>
  </div>
</template>

<script>
import { SearchHome } from '@/views/portal/components'

export default {
  name: 'SEARCHLayout',
  components: {
    SearchHome
  },
  data() {
    return {
      keyword: ''
    }
  },
  created() {
    this.keyword = this.$route.params.keyword
    console.log('seach layout main : ')
    console.log(this.keyword)
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