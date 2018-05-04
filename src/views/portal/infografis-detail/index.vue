<template>
  <div class="infografis-detail">  
    <el-row :gutter="20" class="headline-container" v-if="slug">
      <el-row :gutter="20" class="content" >
        <div class="container">
          <el-col :xs="24">
            <div class="grid-content latest-news" v-loading="loading.infografis" v-if="infografis.id">
                  <el-row :gutter="20">
                    <el-col >
                      <div>
                          <div class="background">
                              <img :src="infografis.main_image" />                           
                          </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="content"> 
                    <el-col>
                      <el-row :gutter="20">
                          <el-col :span="4" v-if="infografis.id">
                              <span> <bb-love></bb-love> </span>
                              <span><share-pop :article="infografis"></share-pop>  </span>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20" class="ln-title">
                        <el-col >
                          <div class="headline"> 
                              {{ infografis.title }}
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col class="sub-headline">
                            <div v-html="infografis.teaser" class="article-content">
                            </div>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="1"><article-separator></article-separator></el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col class="footer">
                            <div class="author">
                              {{ infografis.reporter_name }} | <timeago :auto-update="60" :since="infografis.publish_date"></timeago>
                            </div>
                          </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="m-t-10" v-if="infografis" >
                    <el-col >
                      <comment-box :articleID="infografis.id"></comment-box>
                    </el-col>
                  </el-row>
            </div>
          </el-col>
        </div>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="comments-container" v-if="infografis" >
      <el-row :gutter="20" >
        <div class="container">
        <el-col :xs="24" :sm="24"  class="comments-content">
          <comment-list :articleID="infografis.id"></comment-list>
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
            <popular-news-side :editorialSlug="editorialSlug"> </popular-news-side>
            </div>
            <div class="side-separator">
              <span> Buka lebih banyak lagi </span>
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
    <div class="m-t-10"></div>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { BbLove, SharePop, CommentBox, PopularNewsSide, ArticlesCard, Subscribe, Events, AdvertisementSide, CommentList } from '@/views/portal/components'
import { getArticle } from '@/api/article'
import EventBus from '@/utils/event-bus'

export default {
  name: 'InfografisDetailLayout',
  props: {
    articleID: { type: String },
    editorialSlug: { type: String, default: 'infografis' },
    editorialType: { type: String },
    slug: { type: String }
  },
  components: {
    ArticleSeparator, SharePop, CommentBox, CommentList,
    BbLove, PopularNewsSide, ArticlesCard, Subscribe, Events, AdvertisementSide
  },
  data() {
    return {
      infografis: {},
      loading: {
        infografis: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.slug)
      this.getMainArticle(this.slug)
    },
    getMainArticle(slug) {
      this.loading.infografis = true
      getArticle({ slug }).then(response => {
        if (response) {
          this.infografis = response.data
          EventBus.$emit('SET_ARTICLE_ID_COMMENTS_EVENT', { 'articleID': this.infografis.id })
          this.loading.infografis = false
        }
      })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/infografis-detail-main.scss";

</style>