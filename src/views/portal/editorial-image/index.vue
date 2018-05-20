<template>
  <div class="editoral-container">
    <el-row :gutter="20" class="headline-container" v-if="latestNews">
      <div class="container">
        <el-row :gutter="20" >
          
          <el-col :xs="24">
            <div class="grid-content latest-news" v-loading="loading.latestNews" v-if="latestNews.id">
                  <el-row :gutter="20" v-if="editorialSlug === 'infografis'">
                    <el-col >
                      <div>
                          <div class="background">
                              <img :src="latestNews.main_image" />
                              <!-- <div class="editorial-type-img" v-if="latestNews.id">
                                  <h2>{{ latestNews.editorial.name }}</h2>
                              </div> -->
                          </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" v-if="editorialSlug !== 'infografis'">
                    <el-col >
                      <div v-if="latestNews">
                          <images-slider :articleID="latestNews.id" :article="latestNews"></images-slider>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="content"> 
                    <el-col>
                      <el-row :gutter="20" class="ln-share">
                          <el-col :span="4" v-if="latestNews.id">
                              <span> <bb-love :articleID="latestNews.id" :type="'article'" ></bb-love> </span>
                              <span><share-pop :article="latestNews"></share-pop>  </span>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20" class="ln-title">
                        <el-col >
                          <h1 class="headline"> 
                              {{ latestNews.title }}
                          </h1>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20" class="ln-teaser" v-if="latestNews.content && latestNews.content !=='-'">
                          <el-col class="sub-headline">
                            <div v-html="latestNews.content" class="article-content">
                            </div>
                          </el-col>
                      </el-row>                      
                      <el-row :gutter="20">
                          <el-col class="footer">
                            <p class="red-line"></p>
                            <div class="author">
                              {{ latestNews.reporter_name }} | <timeago :auto-update="60" :since="latestNews.publish_date"></timeago>
                            </div>
                          </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="m-t-10" v-if="latestNews" >
                    <el-col >
                      <comment-box :articleID="latestNews.id"></comment-box>
                    </el-col>
                  </el-row>
            </div>
            <div>
              <el-row :gutter="20">
                <el-col v-if="latestNews">
                  <article-nav :editorialSlug="editorialSlug" :articleID="latestNews.id" type="image" navTitle="Gallery"></article-nav>
                </el-col>
              </el-row>
            </div>
          </el-col>          
        </el-row>
      </div>  
    </el-row>
    <el-row :gutter="20" class="comments-container" v-if="latestNews.id" >
      <el-row :gutter="20" >
        <div class="container">
        <el-col :xs="24" :sm="24"  class="comments-content">
          <comment-list :articleID="this.latestNews.id"></comment-list>
        </el-col>
        </div>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="list-container">
      <div class="container">
        <el-col :xs="24" :sm="16" class="content">
          <div class="grid-content">
              <articles-card :editorialSlug="editorialSlug" :editorialType="editorialType" :limit=10 :showPaging="false" :articleType="'image'"></articles-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" class="side-content">
          <div class="grid-content a-side">
            <div>

            <popular-news-side v-if="editorialSlug === 'infografis'" :editorialSlug="editorialSlug" title="INFOGRAFIS TERPOPULER"> </popular-news-side>
            <popular-news-side v-else :editorialSlug="editorialSlug" title="GALLERY TERPOPULER"> </popular-news-side>
            </div>
            <div class="side-separator">
              <span> Buka lebih banyak lagi </span>
            </div>
            <div>
            <infografis-side :editorialSlug="'infografis'"  > </infografis-side>
            </div>
            <div class="side-separator">
              <span> Buka lebih banyak lagi </span>
            </div>
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