<template>
<div >
          <el-row>
              <div class="section-title"> BERITA BAIK TERPOPULAR</div>
          </el-row>
          
          <div class="popular-news m-t-20">
            <el-row :gitter="20" v-for="(popular) in popular_articles" :key="popular.id" class="side-row"  >
              <el-col :span="8" class="side-image">
                <div>
                  <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':popular.editorial.slug, 'slug': popular.slug,  'articleID': popular.id} }">
                    <img :src="popular.main_image" class="card-image"/>
                  </router-link>
                </div>
              </el-col>
              <el-col :span="16" class="side-content">
                <div class="content-container">
                   <el-row class="side-title-section">
                      <div>
                        <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':popular.editorial.slug, 'slug': popular.slug,  'articleID': popular.id} }">
                          <span class="headline" v-html="subString(popular.title,70)"  ></span>
                        </router-link>
                      </div>
                    </el-row>                    
                    <el-row >
                        <el-col  class="side-footer">
                         <p class="red-line"></p>
                         <div class="author">
                          {{ popular.reporter_name }} | <timeago :since="popular.publish_date"></timeago>
                        </div>
                        </el-col>
                    </el-row>
                </div>
              </el-col>         
            </el-row>            
          </div>
</div>
</template>
<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { getPopularArticles } from '@/api/popular_article'

export default {
  name: 'PopularNewsSide',
  props: {
    editorialSlug: { type: String },
    limit: { default: 6, type: Number },
    page: { default: 1, type: Number }
  },
  components: {
    ArticleSeparator
  },
  data() {
    return {
      popular_articles: [],
      loading: {
        popular_articles: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getPopularArticles(this.editorialSlug)
    },
    subString(str, len) {
      if (str.length < len) {
        return str
      } else {
        return str.substring(0, (len - 3)) + '...'
      }
    },
    getPopularArticles() {
      this.loading.popular_articles = true
      getPopularArticles({ page: this.page, per_page: this.limit }).then(response => {
        if (response) {
          this.popular_articles = response.data.data
        }
        this.loading.popular_articles = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/popular-news-side.scss";

</style>