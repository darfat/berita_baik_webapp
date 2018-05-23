<template>
<div class="hl-slider">
  <el-carousel v-loading="loading.headlines" :interval=9000 >
    <el-carousel-item v-for="item in headlines" :key="item.id">
      <div class="item-wrapper-hl">
        <el-row>
          <el-col :xs="14" :sm="14">
            <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':item.editorial.slug, 'slug': item.article.slug,  'articleID': item.article.id} }">
              <img :src="item.article.main_image" class="image-hl">
              <h2>{{item.editorial.name}}</h2>
            </router-link>
          </el-col>
          <el-col :xs="10" :sm="10">            
            <div class="info">      
              <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':item.editorial.slug, 'slug': item.article.slug,  'articleID': item.article.id} }">              
              <h1 class="headline" v-html="subString(item.article.title,101)"></h1>              
              </router-link>
              <p v-if="item.article.teaser" v-html="subString(item.article.teaser, 253)" class="teaser" ></p> 
              <!-- <p v-else v-html="subString(item.article.content, 250)" class="teaser" ></p>               -->
              <p class="red-line"></p>
              <p class="author">{{ item.article.reporter_name}} | <timeago :since="item.article.publish_date"></timeago></p>
              <div class="share">
                <bb-love :articleID="item.article.id" :type="'article'" ></bb-love>        
                <share-pop :article="item.article"></share-pop>
              </div>
            </div>
          </el-col>
        </el-row>        
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
    },
    subString(str, len) {
      if (str) {
        if (str.length < len) {
          return str
        } else {
          return str.substring(0, (len - 3)) + '&hellip;'
        }
      }
      return ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/home-headline-slider.scss";
</style>