<template>
  <div class="article-container">
    <el-row :gutter="20" class="headline-container">
      <el-row :gutter="20">
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="16">
            <div class="grid-content title-container">
            </div>
          </el-col>
      </el-row>
      <el-col :span="2"><div class="grid-content"></div></el-col>
      <el-col :span="20">
        <div class="grid-content main" v-loading="loading.mainArticle">
              <el-row :gutter="20">
                <el-col >
                  <div>
                      <div class="thumbnail">
                          <img :src="mainArticle.main_image" />
                        <div class="editorial-type-img">
                            <p>{{ mainArticle.editorial.name }}</p>
                        </div>
                      </div>
                  </div>
                </el-col>
              </el-row>
              <el-row class="content">
                <el-row :gutter="20" class="a-title">
                  <el-col >
                    <div > 
                      {{ mainArticle.title }}
                    </div>
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
                    <el-col >
                      <div v-html="mainArticle.content">
                        
                      </div>
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
                    <el-col :span="7" class="align-right" >
                      <span> <bb-love :articleID="mainArticle.id" :type="'article'" ></bb-love> </span>
                      <span>  <social-sharing url="http://beritabaik.id/"
                      :title="mainArticle.title"
                      :description="mainArticle.teaser"
                      :quote="mainArticle.title"
                      hashtags="beritabaik,news"
                      inline-template>
                        <div>
                            <network network="facebook">
                              <fa-icon name="facebook-official" scale="2" ></fa-icon>
                            </network>
                            <network network="twitter">
                              <fa-icon name="twitter" scale="2" ></fa-icon>
                            </network>
                            <network network="email">
                              <fa-icon name="envelope" scale="2" ></fa-icon>
                            </network>
                            <network network="googleplus">
                              <fa-icon name="google-plus" scale="2" ></fa-icon>
                            </network>
                            <network network="whatsapp">
                              <fa-icon name="whatsapp" scale="2" ></fa-icon>
                            </network>
                        </div>
                      </social-sharing>   
                      </span>
                    </el-col>
                    <el-col :span="1">                    
                      <span> <v-icon name="more-horizontal" base-class="icon-20"></v-icon> </span>
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
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row :gutter="20" class="comments-container">
      <el-row :gutter="20" >
        <el-col :span="2"><div class="grid-content"></div></el-col>
        <el-col :span="20"  class="comments-content">
          <comment-list :articleID="this.mainArticle.id"></comment-list>
        </el-col>
        <el-col :span="2"><div class="grid-content"></div></el-col>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="list-container">
      <el-col :span="2"><div class="grid-content"></div></el-col>

      <el-col :span="14" class="content">
        <div class="grid-content a-content">
            <articles-card></articles-card>
            <el-row >
              <el-col>
              </el-col>
            </el-row>
        </div>
      </el-col>
      <el-col :span="6" class="side-content">
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
      
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="20" class="content">
              <div class="h-divider m-tb-10"></div>
          </el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row :gutter="20" class="events-container">
      <el-col :span="2"><div class="grid-content"></div></el-col>
      <el-col :span="20" class="content">
            <events></events>
      </el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>  
    <el-row :gutter="20">
      <el-col :span="1"><div class="grid-content"></div></el-col>
          <el-col :span="22" class="content">
              <div class="h-divider m-tb-10"></div>
          </el-col>
      <el-col :span="1"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row :gutter="20" class="subscriber-container">
      <el-col :span="1"><div class="grid-content"></div></el-col>
          <el-col :span="22" class="content">
              <subscribe></subscribe>
          </el-col>
      <el-col :span="1"><div class="grid-content"></div></el-col>
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
  name: 'article-detail',
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
</style>