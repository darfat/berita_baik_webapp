<template>
<div class="article-nav">
  <el-row :gutter="20" >
    <el-col :span="12">
      <el-button type="text" @click="prev()"> <span class="article-nav"> &lt; {{navTitle}} Sebelumnya </span> </el-button>
    </el-col>
    <el-col :span="12" class="align-right">
      <el-button type="text" @click="next()"> <span class="article-nav"> {{navTitle}} Selanjutnya &gt; </span> </el-button>
    </el-col>
  </el-row>
</div>
</template>


<script>
import { getNextArticle, getPreviousArticle } from '@/api/article'

export default {
  name: 'ArticleNav',
  props: {
    articleID: { type: String },
    editorialSlug: { type: String },
    type: { type: String },
    navTitle: { type: String, default: 'Berita' }
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
    },
    next() {
      getNextArticle({
        editorialSlug: this.editorialSlug,
        articleID: this.articleID
      }).then(response => {
        if (response && response.data) {
          const article = response.data
          if (this.type === 'news') {
            // EventBus.$emit('SET_NEWS_ARTICLE', { 'slug': article.slug, 'article_id': article.id })
            this.$router.push({
              name: 'article-detail-route',
              params: {
                'editorialSlug': article.editorial.slug,
                'slug': article.slug,
                'articleID': article.id
              }
            })
          } else if (this.type === 'image') {
            this.$router.push({
              name: 'editorial-image-detail',
              params: {
                'editorialSlug': article.editorial.slug,
                'slug': article.slug
              }
            })
          } else if (this.type === 'video') {
            this.$router.push({
              name: 'editorial-video-detail',
              params: {
                'editorialSlug': article.editorial.slug,
                'slug': article.slug
              }
            })
          }
        }
      })
    },
    prev() {
      getPreviousArticle({
        editorialSlug: this.editorialSlug,
        articleID: this.articleID
      }).then(response => {
        if (response && response.data) {
          const article = response.data
          if (this.type === 'news') {
            // EventBus.$emit('SET_NEWS_ARTICLE', { 'slug': article.slug, 'article_id': article.id })
            this.$router.push({
              name: 'article-detail-route',
              params: {
                'editorialSlug': article.editorial.slug,
                'slug': article.slug,
                'articleID': article.id
              }
            })
          } else if (this.type === 'image') {
            this.$router.push({
              name: 'editorial-image-detail',
              params: {
                'editorialSlug': article.editorial.slug,
                'slug': article.slug
              }
            })
          } else if (this.type === 'video') {
            this.$router.push({
              name: 'editorial-video-detail',
              params: {
                'editorialSlug': article.editorial.slug,
                'slug': article.slug
              }
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
  font-family: 'Neosans';
}
</style>