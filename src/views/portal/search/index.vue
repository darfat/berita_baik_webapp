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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.search-wrapper {  
  margin-left: auto;
  margin-right: auto;  
  width: 100%;
  height: auto;
  background-color: #FFF;
}

.container{
  // padding: 40px 0;
}

hr{
  // margin: 20px 0;
}
</style>