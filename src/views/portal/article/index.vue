<template>
  <div class="article-container">
    <el-row :gutter="20" class="headline-container">
      <div class="container">        
        <el-col :xs="24">
          <div class="grid-content main" v-loading="loading.mainArticle">

            <el-row :gutter="20">
              <el-col >                
                <div class="thumbnail">
                    <img :src="mainArticle.main_image" />
                  <!-- <div class="editorial-type-img" v-if="mainArticle.editorial">
                      <h2>{{ mainArticle.editorial.name }}</h2>
                  </div> -->
                </div>                
              </el-col>
            </el-row>

            <el-row class="content">
              <el-row :gutter="20" v-if="mainArticle.subtitle">
                <el-col ><h3 v-html="mainArticle.subtitle"></h3></el-col>
              </el-row>              
              <el-row :gutter="20">
                <el-col >
                  <h1 class="headline" v-html="mainArticle.title"></h1>                  
                </el-col>
              </el-row>              
              <el-row :gutter="20">
                  <el-col>
                    <p class="red-line"></p>
                    <p class="author">
                      {{ mainArticle.reporter_name }} |
                      <timeago :auto-update="60" :since="mainArticle.publish_date"> </timeago></p>
                  </el-col>
              </el-row>
              <el-row :gutter="20" class="m-t-10">
                  <el-col class="teks">
                    <div v-if="!isHaveRelatedArticles" v-html="mainArticle.content" class="teks-content" ></div>
                    <!-- <froalaView v-if="!isHaveRelatedArticles" v-model="mainArticle.content" class="teks-content"></froalaView> -->
                    <div v-else class="teks-content" >
                      <span v-html="content1" ></span>
                      <div class="bacajuga" v-if="mainArticle.article_relates">
                        <h4>Baca Juga :</h4>
                        <ul> 
                          <li v-for="(relate) in mainArticle.article_relates" :key="relate.id" > 
                            <router-link v-if="relate.Article.article_type === 'news'" :to="{ name: 'article-detail-route', params: { 'editorialSlug':relate.Article.editorial.slug, 'slug': relate.Article.slug,  'articleID': relate.Article.id} }">                  
                               <span v-html="relate.Article.title">  </span> 
                            </router-link>
                            <router-link   v-if="relate.Article.article_type === 'image'" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':relate.Article.editorial.slug, 'slug': relate.Article.slug } }" >                      
                               <span v-html="relate.Article.title">  </span> 
                            </router-link>
                            <router-link v-if="relate.Article.article_type === 'video'" :to="{ name: 'editorial-video-detail', params: { 'editorialSlug':relate.Article.editorial.slug, 'slug': relate.Article.slug} }">
                               <span v-html="relate.Article.title">  </span>   
                            </router-link>                          
                          </li>
                        </ul>
                      </div>
                      <span v-html="content2" class="teks-content" ></span>
                    </div>
                  </el-col>
                  <el-col>
                    <div class="ads">
                      <ads-banner :showTitle=true position="Berita : Tengah"></ads-banner>
                    </div>
                  </el-col>
              </el-row>
              <el-row >
                <el-col>
                  <div class="h-divider"></div>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="article-option">
                  <el-col :xs="24" :sm="1" class="e-lbl mc">
                    <span class="mc-content" v-if="mainArticleAuthors && mainArticleAuthors.length > 0">Editor:</span>
                  </el-col>
                  <el-col :xs="24" :sm="14" v-loading="loading.authors" class="e-img mc">
                    <div v-for="(author) in mainArticleAuthors" :key="author.id" class="mc-content">
                      <div class="img-mini" v-if="author.notes === 'editor'">
                        <img :src="author.user.image" class="img-circle"/>                        
                      </div>
                      <div class="e-name" v-if="author.notes === 'editor'">
                      <span> {{ author.user.name }} </span>
                      <span class="follow-user">                            
                        <v-icon name="user" base-class="icon-follow"></v-icon> Follow
                      </span>
                      </div>
                    </div>  
                  </el-col>                      
                  <el-col :xs="24" :sm="8" class="e-icn">                    
                    <div class="icons mc">
                      <div class="mc-content">
                        <bb-love v-if="mainArticle && mainArticle.id" :articleID="mainArticle.id" :type="'article'" :scale="2"></bb-love>
                        <social-sharing v-if="mainArticle && mainArticle.editorial" 
                        :url="baseLinkPath+mainArticle.editorial.slug+'/'+mainArticle.slug" 
                        :title="mainArticle.title"
                        :description="mainArticle.teaser"
                        :quote="mainArticle.title"
                        @open="openShare(mainArticle.id, baseLinkPath+mainArticle.editorial.slug+'/'+mainArticle.slug)"
                        hashtags="beritabaik"
                        twitter-user="beritabaik_id"
                        inline-template>
                          <div class="icon-network">                          
                              <network network="facebook">
                                <fa-icon name="facebook-f" scale="1" class="network-icon"></fa-icon>
                              </network>
                              <network network="twitter">
                                <fa-icon name="twitter" scale="1" class="network-icon"></fa-icon>
                              </network>
                              <network network="email">
                                <fa-icon name="envelope" scale="1" class="network-icon"></fa-icon>
                              </network>
                              <network network="googleplus">
                                <fa-icon name="google-plus" scale="1" class="network-icon"></fa-icon>
                              </network>
                              <network network="whatsapp" >
                                <fa-icon name="whatsapp" scale="1" class="network-icon"></fa-icon>
                              </network>
                          </div>
                        </social-sharing> 
                        <el-popover
                          placement="top"
                          width="160"
                          v-model="vmore">
                          <el-button size="mini" type="text" @click="dialogFormVisible = true">
                            <fa-icon name="exclamation-circle" scale="1"></fa-icon> Report
                          </el-button>                          
                          <el-button  type="text" slot="reference" size="mini"><v-icon name="more-horizontal" base-class="icon-20"></v-icon></el-button>
                        </el-popover>
                        <div class="rpt">
                          <el-dialog title="Report" :visible.sync="dialogFormVisible">
                            <span>Why reporting?</span>
                            <div class="rpt-opt">
                              <el-radio-group v-model="report_reason">
                                <el-radio @change="showOtherOption(false)" label="Spam, commercial, or advertising purpose"></el-radio>
                                <el-radio style="margin-left:0px;" @change="showOtherOption(false)" label="Pornography"></el-radio>
                                <el-radio style="margin-left:0px;" @change="showOtherOption(false)" label="Violent content"></el-radio>
                                <el-radio style="margin-left:0px;" @change="showOtherOption(false)" label="Harmful or dangerous act"></el-radio>
                                <el-radio style="margin-left:0px;" @change="showOtherOption(false)" label="Ethnicity, religion, race, inter-group relations"></el-radio>
                                <el-radio  @change="showOtherOption(true)"> Other </el-radio>
                                <el-input v-if="showOther" type="textarea" :rows="2" v-model="report_reason" :maxlength="100" ></el-input>
                              </el-radio-group>
                            </div>
                            <span slot="footer" class="dialog-footer">
                              <el-button size="mini" @click="dialogFormVisible = false">Cancel</el-button>
                              <el-button type="primary" size="mini" @click="reportThis()">Report</el-button>
                            </span>
                          </el-dialog>
                        </div>                                            
                      </div>
                    </div>
                  </el-col>                      
              </el-row>
            </el-row>
                
            <el-row :gutter="20" v-if="mainArticle.is_can_comment" >
              <el-col >
                <comment-box :articleID="mainArticle.id"></comment-box>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col v-if="mainArticle">
                <article-nav :editorialSlug="editorialSlug" :articleID="mainArticle.id" type="news"></article-nav>
              </el-col>
            </el-row>
          </div>
        
        </el-col>
      </div>
    </el-row>
    <el-row :gutter="20" class="comments-container" v-if="mainArticle.is_can_comment" > 
      <el-row :gutter="20" >
        <div class="container">
        <el-col :xs="24" :sm="24"  class="comments-content">
          <comment-list :articleID="mainArticle.id"></comment-list>
        </el-col>
        </div>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="list-container">      
      <div class="container">
      <el-col :xs="24" :sm="16" class="content">
        <div class="grid-content a-content">
              <articles-card :editorialSlug="editorialSlug" :limit=10 :showPaging="false" ></articles-card>
            <el-row >
              <el-col>
              </el-col>
            </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" class="side-content">
        <div class="grid-content a-side">
          <popular-news-side :editorialSlug="editorialSlug"> </popular-news-side>
          <div class="side-separator">
            <router-link :to="{ name: 'content-more', params: { 'editorialSlug': editorialSlug } }">
              <span> Buka lebih banyak lagi </span>
            </router-link>
          </div>
          <infografis-side :editorialSlug="'infografis'"  > </infografis-side>
          <div class="side-separator">
            <router-link  :to="{ name: 'editorial-image', params: { 'editorialSlug': 'infografis' } }" >
              <span> Buka lebih banyak lagi </span>
            </router-link>
          </div>
          <div class="spacer m-t-10"></div>
          <advertisement-side></advertisement-side>
          <div class="side-separator">
            <span>  </span>
          </div>          
        </div>
      </el-col>
      
      </div>
    </el-row>
    
    <!-- <div class="content-container">
      <div class="gray-separator"> <span> </span>  </div>
    </div>
    
    <el-row :gutter="20" class="subscriber-container">
      <div class="m-t-10"></div>
      <div class="container">
          <el-col :xs="24" :sm="24" class="content">
              <subscribe></subscribe>
          </el-col>
      </div>      
    </el-row> -->
    <!-- <div class="m-t-10"></div> -->
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { PopularNewsSide, ArticlesCard, CommentBox, ArticleNav, CommentList, Subscribe, Events, AdvertisementSide, InfografisSide, AdsBanner } from '@/views/portal/components'
import BbLove from '@/views/portal/components/BbLove'
import EventBus from '@/utils/event-bus'
import { getArticle, updateArticleSharedCount } from '@/api/article'
import { getAuthorsByArticleID } from '@/api/author'
import { getRelatesByArticleID } from '@/api/relate'
import { create } from '@/api/reported_article'
import { mapGetters } from 'vuex'

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
    BbLove,
    AdvertisementSide,
    InfografisSide,
    AdsBanner
  },
  props: {
    articleID: { type: String },
    slug: { type: String }
  },
  computed: {
    ...mapGetters([
      'name',
      'user_id',
      'role'
    ])
  },
  data() {
    return {
      mainArticle: {},
      mainArticleAuthors: [],
      reporter: {},
      editorialSlug: null,
      loading: {
        mainArticle: false,
        authors: false,
        relates: false
      },
      content1: null,
      content2: null,
      isHaveRelatedArticles: false,
      report_reason: '',
      vmore: false,
      dialogFormVisible: false,
      radio2: 3,
      showOther: false,
      metaParams: {
        title: 'Berita Baik',
        ogImage: false,
        siteName: false,
        description: false,
        url: false
      },
      basePath: 'http://beritabaik.id/dev/',
      baseLinkPath: ''
    }
  },
  created() {
    this.init()
    this.baseLinkPath = this.basePath + '#/home/a/'
  },
  mounted() {
    this.initMounted()
  },
  methods: {
    init() {
      this.editorialSlug = this.$route.params.editorialSlug
    },
    initMounted() {
      this.getMainArticle(this.slug)
      EventBus.$on('SET_NEWS_ARTICLE', event => {
        if (event) {
          this.getMainArticle(event.slug)
        }
      })
    },
    getMainArticle(slug) {
      this.loading.mainArticle = true
      getArticle({ slug }).then(response => {
        this.loading.mainArticle = false
        if (response) {
          this.mainArticle = response.data
          const relatedKey = '&lt;related/&gt;'
          const idx = this.mainArticle.content.indexOf(relatedKey)
          if (idx > -1) {
            const contents = this.mainArticle.content.split(relatedKey)
            this.content1 = contents[0]
            this.content2 = contents[1]
            this.isHaveRelatedArticles = true
            this.getRelated(this.mainArticle.id)
          } else {
            this.isHaveRelatedArticles = false
          }
          EventBus.$emit('SET_ARTICLE_ID_COMMENTS_EVENT', { 'articleID': this.mainArticle.id })
          this.getAuthors(this.mainArticle.id)
          const url = this.baseLinkPath + this.mainArticle.editorial.slug + '/' + this.mainArticle.slug
          this.changeMeta(this.mainArticle, url)
          // remove br
          this.mainArticle.content = this.mainArticle.content.replace('\u003c!DOCTYPE html\u003e\u003cbr /\u003e\u003chtml\u003e\u003cbr /\u003e\u003chead\u003e\u003cbr /\u003e\u003c/head\u003e\u003cbr /\u003e', '\u003c!DOCTYPE html\u003e\u003chtml\u003e\u003chead\u003e\u003c/head\u003e')
        }
      })
    },
    getAuthors(articleID) {
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
    },
    getRelated(articleID) {
      this.loading.relates = true
      getRelatesByArticleID({ articleID }).then(response => {
        this.loading.relates = false
        if (response) {
          this.mainArticle.article_relates = response.data
        }
      })
    },
    openShare(articleID, url) {
      updateArticleSharedCount({ articleID }).then(response => {
        if (response) {
          console.log('shared success')
        }
      })
    },
    reportThis() {
      if (this.user_id) {
        this.dialogFormVisible = false
        if (this.report_reason && this.report_reason.length > 0) {
          create({ article_id: this.mainArticle.id, user_id: this.user_id, response: this.report_reason, active: true, editorial_id: this.mainArticle.editorial_id }).then(response => {
            if (response) {
              this.$message({
                type: 'success',
                message: 'Terima kasih atas laporan anda'
              })
            }
          })
        }
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    showOtherOption(val) {
      if (val === true) {
        this.report_reason = ''
      }
      this.showOther = val
    },
    changeMeta(article, url) {
      console.log('change Meta')
      var self = this
      this.metaParams.ogImage = this.basePath + article.main_image
      this.metaParams.siteName = 'Berita Baik'
      this.metaParams.url = url
      this.metaParams.description = article.teaser
      this.metaParams.title = article.title
      self.$emit('updateHead')
      // window.setTimeout(function() {
      // }, 1000)
    }
  },
  head: {
    // To use "this" in the component, it is necessary to return the object through a function
    meta() {
      return [
        // { name: 'description', content: this.metaParams.description, id: 'metaDesc' },
        { name: 'twitter:title', content: this.metaParams.title, id: 'metaTwTitle' },
        { n: 'twitter:description', c: this.metaParams.description, id: 'metaTwDesc' },
        { n: 'twitter:image', c: this.metaParams.ogImage, id: 'metaTwImage' },
        { p: 'og:image', c: this.metaParams.ogImage, id: 'metaOgImage' },
        { p: 'og:site_name', c: this.metaParams.siteName, id: 'metaOgSiteName' },
        { p: 'og:description', c: this.metaParams.description, id: 'metaOgDesc' },
        { p: 'og:url', c: this.metaParams.url, id: 'metaOgUrl' }
      ]
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
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>