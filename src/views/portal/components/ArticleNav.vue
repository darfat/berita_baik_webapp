<template>
<div class="article-nav p-b-20">
  <el-row :gutter="20" >
    <el-col :span="12">
      <el-button type="text" @click="prev()"> <span class="article-nav"> &lt; Berita Sebelumnya </span> </el-button>
    </el-col>
    <el-col :span="12" class="align-right">
      <el-button type="text" @click="next()"> <span class="article-nav"> Berita Selanjutnya &gt; </span> </el-button>
    </el-col>
  </el-row>
</div>
</template>


<script>
import { getNextArticle, getPreviousArticle } from '@/api/article'
import EventBus from '@/utils/event-bus'

export default {
  name: 'ArticleNav',
  props: {
    articleID: { type: String },
    editorialSlug: { type: String },
    type: { type: String }
  },
  data() {
    return {
      loading: {
        data: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log('init article nav')
      console.log(this.articleID)
      console.log(this.type)
    },
    next() {
      console.log('next....')
      getNextArticle({ editorialSlug: this.editorialSlug, articleID: this.articleID }).then(response => {
        console.log(response)
        if (response && response.data) {
          const article = response.data
          if (this.type === 'news') {
            // EventBus.$emit('SET_NEWS_ARTICLE', { 'slug': article.slug, 'article_id': article.id })
            this.$router.push({
              name: 'article-detail-route',
              params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} 
            })
          }
        }
      })
    },
    prev() {
      getPreviousArticle({ editorialSlug: this.editorialSlug, articleID: this.articleID }).then(response => {
        if (response && response.data) {
          const article = response.data
          if (this.type === 'news') {
            // EventBus.$emit('SET_NEWS_ARTICLE', { 'slug': article.slug, 'article_id': article.id })
            this.$router.push({
              name: 'article-detail-route',
              params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} 
            })
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.article-nav{
  // font-weight: bold;
  color: #696968;
}
</style>