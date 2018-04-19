<template>
<div class="article-nav p-b-20">
  <el-row :gutter="20" >
    <el-col :span="12">
      <span> &lt; Berita Sebelumnya </span>
    </el-col>
    <el-col :span="12" class="align-right">
      <span> Berita Selanjutnya &gt; </span>
    </el-col>
  </el-row>
</div>
</template>


<script>
export default {
  name: 'ArticleNav'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.article-nav{
  font-weight: bold;
  color: #696968;
}

</style>