<template>
  <div class="editoral-container">  
    <el-row :gutter="20" class="headline-container" v-if="latestNews">
      <div class="container">
        <div class="grid-content latest-news" v-loading="loading.latestNews" v-if="latestNews.id">              
          <el-row :gutter="0" >
            <el-col :xs="24" :sm="14">              
              <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':latestNews.editorial.slug, 'slug': latestNews.slug,  'articleID': latestNews.id} }">
                <img :src="latestNews.main_image" class="image-hl">                
                <h2 v-if="latestNews.id">{{ latestNews.editorial.name }}</h2>                
              </router-link>
            </el-col>          
            <el-col :xs="24" :sm="10">
              <div class="info">
                <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':latestNews.editorial.slug, 'slug': latestNews.slug,  'articleID': latestNews.id} }">
                  <h1 class="headline" v-html="subString(latestNews.title,101)"></h1>
                </router-link>
                <div v-html="subString(latestNews.teaser,253)" class="teaser"></div>                
                <p class="red-line"></p>
                <div class="author">
                  {{ latestNews.reporter_name }} | <timeago :auto-update="60" :since="latestNews.publish_date"></timeago>
                </div>
                <div class="share">
                <span><bb-love :articleID="latestNews.id" :type="'article'" ></bb-love></span>
                <span><share-pop :article="latestNews"></share-pop></span>
                </div>
              </div>  
            </el-col>                    
          </el-row>
        </div>        
      </div>  
    </el-row>
    
    <el-row :gutter="20" class="list-container">
      <div class="container">
        <el-col :xs="24" :sm="16" class="content">
          <div class="grid-content">
              <articles-card :editorialSlug="editorialSlug" :editorialType="editorialType" :limit=10 :showPaging="false"></articles-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" class="side-content">
          <div class="grid-content a-side">
            <div>
            <popular-news-side :editorialSlug="editorialSlug" :editorialType="editorialType"> </popular-news-side>
            </div>
            <div class="side-separator">
              <router-link :to="{ name: 'content-more', params: { 'editorialSlug': editorialSlug, 'editorialType': editorialType } }">
                <span> Buka lebih banyak lagi </span>
              </router-link>
            </div>
            <!-- <div>
            <infografis-side :editorialSlug="'infografis'"  > </infografis-side>
            </div>
            <div class="side-separator">
              <span> Buka lebih banyak lagi </span>
            </div> -->
            <div class="spacer m-t-10"></div>
            <advertisement-side></advertisement-side>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import BbLove from '@/views/portal/components/BbLove'
import { PopularNewsSide, ArticlesCard, InfografisSide, AdvertisementSide, SharePop } from '@/views/portal/components'
import { getEditorialLabelBySlug, getEditorialIdBySlug } from '@/api/editorial'
import { getLatestNewsByEditorial } from '@/api/article'

export default {
  name: 'editorials',
  components: {
    ArticleSeparator,
    PopularNewsSide,
    ArticlesCard,
    BbLove,
    InfografisSide,
    AdvertisementSide,
    SharePop
  },
  data() {
    return {
      latestNews: {},
      editorialTitle: '',
      editorialSlug: null,
      editorialType: null,
      editorialObj: null,
      loading: {
        latestNews: false
      },
      centerDialogVisible: false
    }
  },
  created() {
    this.init()
    this.getLatestNews(this.editorialSlug)
  },
  methods: {
    init() {
      this.editorialTitle = getEditorialLabelBySlug(this.$route.params.editorialSlug)
      this.editorialSlug = this.$route.params.editorialSlug
      this.editorialType = this.$route.params.editorialType
    },
    getLatestNews(editorialSlug) {
      this.loading.latestNews = true
      let params = {
        editorialSlug
      }
      if (this.editorialType && this.editorialType !== null && this.editorialType.length) {
        getEditorialIdBySlug({
          slug: editorialSlug
        }).then(editorialResponse => {
          if (editorialResponse) {
            params = {
              editorialSlug,
              editorialType: this.editorialType,
              editorialSlugID: editorialResponse.data.id
            }
            getLatestNewsByEditorial(params).then(response => {
              if (response) {
                this.latestNews = response.data
                this.loading.latestNews = false
              }
            })
          }
        })
      } else {
        getLatestNewsByEditorial(params).then(response => {
          if (response) {
            this.latestNews = response.data
            this.loading.latestNews = false
          }
        })
      }
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
@import "src/styles/editorial-list.scss";
.el-row {
  margin-bottom: 0;
  &:last-child {
    margin-bottom: 20px;
  }
}
.el-col {
    border-radius: 0px;
}
</style>