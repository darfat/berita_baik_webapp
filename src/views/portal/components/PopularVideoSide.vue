<template>
<div >
          <el-row>
              <div class="section-title"> {{title}}</div>
          </el-row>
          
          <div class="popular-video m-t-20">
            <el-row :gitter="20" v-for="(popular) in popular_articles" :key="popular.id" class="side-row"  >
              <el-col :span="8" class="side-video">
                <div class="vid-thumb">
                  <div class="videoWrapper" v-if="popular">
                    <!-- <youtube :popular-id="$youtube.getIdFromURL(popular.sources_path)" :player-vars="{ showinfo: 0 }" @ready="ready" @playing="playing" ></youtube> -->
                    <iframe 
                        width="540"
                        height="290"
                        :src="'https://www.youtube.com/embed/'+$youtube.getIdFromURL(popular.sources_path)+'?rel=0&amp;fs=0&amp;showinfo=0'"
                        frameborder="0"
                        allowfullscreen></iframe>
                  </div>
                </div>
              </el-col>
              <el-col :span="16" class="side-content">
                <div class="content-container">
                   <el-row class="side-title-section">
                      <div>
                        <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':popular.editorial.slug, 'slug': popular.slug,  'articleID': popular.id} }">
                          <span class="headline" v-html="subString(popular.title,30)"  ></span>
                        </router-link>
                      </div>
                    </el-row>                    
                    <el-row >
                        <el-col  class="side-footer">
                         <p class="red-line"></p>
                         <div class="author">
                          {{ popular.reporter_name }} | <timeago :since="popular.publish_date | formatUTC"></timeago>
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
import { getEditorialIdBySlug } from '@/api/editorial'
export default {
  name: 'PopularNewsSide',
  props: {
    editorialSlug: { type: String, default: null },
    editorialType: { type: String },
    title: { type: String, default: 'VIDEO TERPOPULER' },
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
      if (str) {
        if (str.length < len) {
          return str
        } else {
          return str.substring(0, (len - 3)) + '...'
        }
      }
      return ''
    },
    getPopularArticles(editorialSlug) {
      this.loading.popular_articles = true
      if (this.editorialType && this.editorialType !== null && this.editorialType.length) {
        getEditorialIdBySlug({
          slug: editorialSlug
        }).then(editorialResponse => {
          if (editorialResponse) {
            getPopularArticles({
              editorialType: this.editorialType,
              editorialSlugID: editorialResponse.data.id,
              editorialSlug,
              page: this.page,
              per_page: this.limit
            }).then(response => {
              if (response) {
                this.popular_articles = response.data.data
              }
              this.loading.popular_articles = false
            })
          }
        })
      } else {
        getPopularArticles({
          editorialSlug,
          page: this.page,
          per_page: this.limit
        }).then(response => {
          if (response) {
            this.popular_articles = response.data.data
          }
          this.loading.popular_articles = false
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/popular-video-side.scss";

</style>