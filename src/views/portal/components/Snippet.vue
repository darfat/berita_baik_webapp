<template>
  <div class="snippet">      
    <div class="snippet-header"> </div>
    <div class="snippet-content"> 
        <el-row :gutter="20" v-loading="loading.snippet" >
            <el-col :span="22" class="snippet-col">
                  
            </el-col>
        </el-row>    
    </div>
    
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
// import { getArticle } from '@/api/article'

export default {
  name: 'Snippet',
  components: {
    ArticleSeparator
  },
  props: {
    param: { type: String }
  },
  data() {
    return {
      title: {},
      loading: {
        snippet: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import "src/styles/snippet.scss";

</style>