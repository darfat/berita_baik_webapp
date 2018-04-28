<template>
  <span class="search-box">      
    <el-input placeholder="Search" suffix-icon="el-icon-search" v-model="searchKeyword"  @keyup.enter.native="onEnterClick" ></el-input>
  </span>
</template>

<script>
// import { getArticle } from '@/api/article'

export default {
  name: 'SearchBox',
  components: {},
  props: {
    param: { type: String }
  },
  data() {
    return {
      searchKeyword: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {},
    onEnterClick() {
      this.$router.push({ name: 'search-home', params: { 'keyword': this.searchKeyword }})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 // @import "src/styles/snippet.scss";

</style>