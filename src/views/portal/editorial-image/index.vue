<template>
  <div class="editoral-container">
    <div class="headline-container" v-if="latestNews">
      <div class="container">

        <div class="grid-content latest-news" v-loading="loading.latestNews" v-if="latestNews.id">              
          <div class="image-hl" v-if="editorialSlug === 'infografis'">
              <img v-lazy="latestNews.main_image" />
          </div>              
          <!--<div class="image-hl" v-if="editorialSlug !== 'infografis'">-->
          <div class="image-hl" v-else>
            <images-slider :articleID="latestNews.id" :article="latestNews"></images-slider>
          </div>
          <div class="info">            
            <div class="share" v-if="latestNews.id">
              <span> <bb-love :articleID="latestNews.id" :type="'article'" ></bb-love> </span>
              <span><share-pop :article="latestNews"></share-pop>  </span>                      
            </div>
            <h1 class="headline" v-html="latestNews.title"></h1>                    
            <div class="" v-if="latestNews.content && latestNews.content !=='-' && editorialSlug !== 'infografis'">                      
              <div v-html="latestNews.content" class="article-content"></div>                      
            </div>
            <div class="" v-if="latestNews.teaser && latestNews.teaser !=='-' && editorialSlug === 'infografis'">                      
              <div v-html="latestNews.teaser" class="article-content"></div>                      
            </div>
            <p class="red-line"></p>
            <p class="author">
              {{ latestNews.reporter_name }} | <timeago :auto-update="60" :since="latestNews.publish_date | formatUTC"></timeago>
            </p>
          </div>

          <div class="comment" v-if="latestNews" >                
            <comment-box :articleID="latestNews.id"></comment-box>                
          </div>
        </div>

        <div v-if="latestNews" class="navigasi">
          <article-nav :editorialSlug="editorialSlug" :articleID="latestNews.id" type="image" navTitle="Gallery"></article-nav>
        </div>

      </div>  
    </div>

    <el-row class="comments-container" v-if="latestNews.id" >
      <el-row :gutter="20" >
        <div class="container">
        <el-col :xs="24" :sm="24"  class="comments-content">
          <comment-list :articleID="this.latestNews.id"></comment-list>
        </el-col>
        </div>
      </el-row>
    </el-row>
    <div class="container">
      <el-row :gutter="20" class="list-container">        
        <el-col class="content">
          <div class="grid-content">
              <articles-card :editorialSlug="editorialSlug" :editorialType="editorialType" :limit=10 :showPaging="false" :articleType="'image'"></articles-card>
          </div>
        </el-col>
        <el-col class="side-content">
          <div class="grid-content a-side">
            <div>
            <popular-news-side v-if="editorialSlug === 'infografis'" :editorialSlug="editorialSlug" title="INFOGRAFIS TERPOPULER"> </popular-news-side>
            <popular-news-side v-else :editorialSlug="editorialSlug" title="GALERI TERPOPULER"> </popular-news-side>
            </div>
            <div class="side-separator">
              <router-link v-if="editorialSlug === 'infografis'" :to="{ name: 'content-more', params: { 'editorialSlug': editorialSlug, 'title': 'INFOGRAFIS TERPOPULER' } }">
                <span> Buka lebih banyak lagi </span>
              </router-link>
              <router-link v-else :to="{ name: 'content-more', params: { 'editorialSlug': editorialSlug, 'title': 'GALERI TERPOPULER' } }">
                <span> Buka lebih banyak lagi </span>
              </router-link>
            </div>
            <div class="spacer m-t-20"></div>
            <div v-if="editorialSlug !== 'infografis'">
            <infografis-side  :editorialSlug="'infografis'"  > </infografis-side>
            </div>
            <div class="side-separator" v-if="editorialSlug !== 'infografis'">
              <router-link  :to="{ name: 'editorial-image', params: { 'editorialSlug': 'infografis' } }" >
                <span> Buka lebih banyak lagi </span>
              </router-link>
            </div>
            <div class="spacer m-t-20"></div>
            <!-- <advertisement-side></advertisement-side> -->
          </div>
        </el-col>        
      </el-row>
    </div>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import BbLove from '@/views/portal/components/BbLove'
import { PopularNewsSide, ArticlesCard, InfografisSide, AdvertisementSide, CommentBox, CommentList, SharePop, ArticleNav } from '@/views/portal/components'
import { getEditorialLabelBySlug } from '@/api/editorial'
import { getLatestImageByEditorial, getArticle } from '@/api/article'
import EventBus from '@/utils/event-bus'
import ImagesSlider from './ImagesSlider'

export default {
  name: 'editorialImage',
  components: {
    ArticleSeparator,
    PopularNewsSide,
    ArticlesCard,
    BbLove,
    InfografisSide,
    AdvertisementSide,
    CommentBox,
    CommentList,
    ImagesSlider,
    SharePop,
    ArticleNav
  },
  data() {
    return {
      latestNews: {},
      editorialTitle: '',
      editorialSlug: null,
      editorialType: null,
      slug: null,
      editorialObj: null,
      loading: {
        latestNews: false
      },
      centerDialogVisible: false
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.initMounted()
  },
  methods: {
    init() {
      this.editorialTitle = getEditorialLabelBySlug(this.$route.params.editorialSlug)
      this.editorialSlug = this.$route.params.editorialSlug
      this.slug = this.$route.params.slug
    },
    initMounted() {
      if (this.slug) {
        this.getImage(this.slug)
      } else {
        this.getLatestImage(this.editorialSlug)
      }
    },
    getLatestImage(editorialSlug) {
      this.loading.latestNews = true
      const params = {
        editorialSlug
      }
      if (editorialSlug) {
        getLatestImageByEditorial(params).then(response => {
          if (response) {
            this.latestNews = response.data
            EventBus.$emit('SET_ARTICLE_ID_COMMENTS_EVENT', { 'articleID': this.latestNews.id })
          }
          this.loading.latestNews = false
        })
      }
    },
    getImage(slug) {
      this.loading.latestNews = true
      const params = {
        slug
      }
      if (slug) {
        getArticle(params).then(response => {
          if (response) {
            this.latestNews = response.data
            EventBus.$emit('SET_ARTICLE_ID_COMMENTS_EVENT', { 'articleID': this.latestNews.id })
          }
          this.loading.latestNews = false
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/editorial-image-list.scss";
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