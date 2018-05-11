<template>
<div class="hl-slider">
  <el-carousel v-loading="loading.headlines" :interval=9000 >
    <el-carousel-item v-for="item in headlines" :key="item.id">
      <div class="item-wrapper-hl">
        <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':item.editorial.slug, 'slug': item.article.slug,  'articleID': item.article.id} }">
          <img :src="item.article.main_image" class="image-hl">
          <h3>{{item.editorial.name}}</h3>
        </router-link>
      </div>
      <div class="share">
        <bb-love></bb-love>        
        <share-pop :article="item.article"></share-pop>
      </div>
      <div class="text">      
        <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':item.editorial.slug, 'slug': item.article.slug,  'articleID': item.article.id} }">
        <h2 class="headline" >{{item.article.title}}</h2>
        </router-link>
        <p v-html="item.article.teaser" class="sub-headline" ></p>
        <p class="red-line"></p>
        <p class="author">{{ item.article.reporter_name}} | <timeago :since="item.article.publish_date | formatDate"></timeago>
        </p>
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import { getHeadlineArticles } from '@/api/headline_article'
import BbLove from '@/views/portal/components/BbLove'
import SharePop from '@/views/portal/components/SharePop'
export default {
  name: 'HeadlineSlider',
  components: {
    BbLove,
    SharePop
  },
  props: {
    limit: { default: 9, type: Number }
  },
  data() {
    return {
      headlines: [],
      loading: {
        headlines: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getHeadlines()
    },
    getHeadlines() {
      this.loading.headlines = true
      getHeadlineArticles({ page: 1, per_page: this.limit }).then(response => {
        this.loading.headlines = false
        if (response) {
          this.headlines = response.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/home-headline-slider.scss";
</style>