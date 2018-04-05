<template>
  <div class="article-container">
    <el-row :gutter="20" class="headline-container">
      <div class="container">        
        <el-col :xs="24">
          <div class="grid-content main" v-loading="loading.mainArticle">
                <el-row :gutter="20">
                  <el-col >
                    <div>
                        <div class="thumbnail">
                            <img :src="mainArticle.main_image" />
                          <div class="editorial-type-img">
                              <h2>{{ mainArticle.editorial.name }}</h2>
                          </div>
                        </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="content">
                  <el-row :gutter="20" class="a-title">
                    <el-col >
                      <h1>{{ mainArticle.title }}</h1>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                      <el-col :span="1"><article-separator></article-separator></el-col>
                  </el-row>
                  <el-row :gutter="20">
                      <el-col class="footer">
                        <div>
                        <timeago :auto-update="60" :since="mainArticle.publish_date"> </timeago>
                        </div>
                      </el-col>
                  </el-row>
                  <el-row :gutter="20">
                      <el-col class="teks">
                        <div v-html="mainArticle.content" ></div>
                      </el-col>
                  </el-row>
                  <el-row >
                    <el-col>
                      <div class="h-divider m-tb-10"></div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="m-t-10 article-option">
                      <el-col :span="2">
                        <span  > 
                          Editorial <br/> Team :
                        </span>
                      </el-col>
                      <el-col :span="5" v-loading="loading.authors" >
                        <div v-for="(author) in mainArticleAuthors" :key="author.id">
                          <img :src="author.user.image" class="img-circle img-mini v-align-middle"/>
                          <span> {{ author.user.name }} </span>
                          <span class="follow-user">
                            <v-icon name="user" base-class="icon-20 v-align-middle"></v-icon>
                            <span  > 
                              Follow
                            </span>
                          </span>
                        </div>
                      </el-col>
                      <el-col :span="9" class="p-tb-5">
                      </el-col>
                      <el-col :span="8" class="align-right" >
                            <bb-love :articleID="mainArticle.id" :type="'article'" :scale="2"></bb-love>
                      </el-col>
                      <el-col :span="4"  class="align-left" >
                        <span>  
                          <social-sharing url="http://beritabaik.id/"
                        :title="mainArticle.title"
                        :description="mainArticle.teaser"
                        :quote="mainArticle.title"
                        hashtags="beritabaik,news"
                        inline-template>
                          <div>
                              <network network="facebook" >
                                <fa-icon name="facebook-f" scale="1.8" class="network-icon" ></fa-icon>
                              </network>
                              <network network="twitter" class="network-icon">
                                <fa-icon name="twitter" scale="1.8" ></fa-icon>
                              </network>
                              <network network="email">
                                <fa-icon name="envelope" scale="1.8" ></fa-icon>
                              </network>
                              <network network="googleplus">
                                <fa-icon name="google-plus" scale="1.8" ></fa-icon>
                              </network>
                              <!-- <network network="whatsapp">
                                <fa-icon name="whatsapp" scale="2" ></fa-icon>
                              </network> -->
                          </div>
                        </social-sharing>   
                        
                        </span>
                      </el-col>
                      <el-col :span="1">                    
                        <span> <v-icon name="more-horizontal" base-class="icon-30"></v-icon> </span>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row :gutter="20" class="m-t-10" >
              <el-col>
                <comment-box :articleID="mainArticle.id"></comment-box>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col>
                <article-nav></article-nav>
              </el-col>
            </el-row>
          </div>
        
        </el-col>
      </div>
    </el-row>
    <el-row :gutter="20" class="comments-container">
      <el-row :gutter="20" >
        <div class="container">
        <el-col :xs="24" :sm="24"  class="comments-content">
          <comment-list :articleID="this.mainArticle.id"></comment-list>
        </el-col>
        </div>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="list-container">
      
      <div class="container">
      <el-col :xs="24" :sm="16" class="content">
        <div class="grid-content a-content">
            <articles-card></articles-card>
            <el-row >
              <el-col>
              </el-col>
            </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" class="side-content">
        <div class="grid-content a-side">
          <popular-news-side> </popular-news-side>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
          </div>
          <div>Infografis</div>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
          </div>
          <div>iklan</div>
          <div class="side-separator">
            <span>  </span>
          </div>
          <div>pilihan editor</div>
        </div>
      </el-col>
      
      </div>
    </el-row>
    <el-row :gutter="20">
      <div class="container">
          <el-col :xs="24" :sm="24" class="content">
              <div class="h-divider m-tb-10"></div>
          </el-col>
      </div>
    </el-row>
    <el-row :gutter="20" class="events-container">
      <div class="container">
      <el-col :xs="24" :sm="24" class="content">
            <events></events>
      </el-col>
      </div>
    </el-row>  
    <el-row :gutter="20">
      <div class="container">
          <el-col :xs="24" :sm="24" class="content">
              <div class="h-divider m-tb-10"></div>
          </el-col>
      </div>
    </el-row>
    <el-row :gutter="20" class="subscriber-container">
      <div class="container">
          <el-col :xs="24" :sm="24" class="content">
              <subscribe></subscribe>
          </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { PopularNewsSide, ArticlesCard, CommentBox, ArticleNav, CommentList, Subscribe, Events } from '@/views/portal/components'
import BbLove from '@/views/portal/components/BbLove'

import { getArticle } from '@/api/article'
import { getAuthorsByArticleID } from '@/api/author'

export default {
  name: 'ArticleDetail',
  components: {
    ArticleSeparator,
    PopularNewsSide,
    ArticlesCard,
    CommentBox,
    ArticleNav,
    CommentList,
    Subscribe,
    Events,
    BbLove
  },
  props: {
    articleID: { type: String },
    slug: { type: String }
  },
  data() {
    return {
      mainArticle: {},
      mainArticleAuthors: [],
      reporter: {},
      editorialSlug: null,
      loading: {
        mainArticle: false,
        authors: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.editorialSlug = this.$route.params.editorialSlug
      this.getMainArticle(this.slug)
    },
    getMainArticle(slug) {
      this.loading.mainArticle = true
      getArticle({ slug }).then(response => {
        this.loading.mainArticle = false
        if (response) {
          this.mainArticle = response.data
          this.getAuthors(this.mainArticle.id)
        }
      })
    },
    getAuthors(articleID) {
      console.log('getAuthors')
      this.loading.authors = true
      getAuthorsByArticleID({ articleID }).then(response => {
        this.loading.authors = false
        if (response) {
          this.mainArticleAuthors = response.data
          this.mainArticleAuthors.forEach(element => {
            if (element.notes === 'reporter') {
              this.reporter = element
            }
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/article.scss";

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
    border-radius: 4px;
}
.fa-icon{
    fill:red;
}
</style>