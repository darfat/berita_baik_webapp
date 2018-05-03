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
                          <div class="editorial-type-img" v-if="mainArticle.editorial">
                              <h2>{{ mainArticle.editorial.name }}</h2>
                          </div>
                        </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="content">
                  <el-row :gutter="20" class="a-title">
                    <el-col >
                      <h2 class="headline">{{ mainArticle.title }}</h2>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                      <el-col :span="1"><article-separator></article-separator></el-col>
                  </el-row>
                  <el-row :gutter="20">
                      <el-col class="footer">
                        <div class="author">
                        <timeago :auto-update="60" :since="mainArticle.publish_date"> </timeago>
                        </div>
                      </el-col>
                  </el-row>
                  <el-row :gutter="20">
                      <el-col class="teks">
                        <div v-html="mainArticle.content" class="content" ></div>
                        <div class="bacajuga" v-if="mainArticle.article_relates">
                          <h4>Baca Juga</h4>
                          <ul> 
                            <li v-for="(relate) in mainArticle.article_relates" :key="relate.id" ><a href="">{{ relate.title}}</a></li>
                            <!-- <li><a href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></li>
                            <li><a href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec mattis elit. In hac habitasse platea dictumst. Suspendisse eget luctus quam, et suscipit elit. Ut.</a></li> -->
                          </ul>
                        </div>
                      </el-col>
                  </el-row>
                  <el-row >
                    <el-col>
                      <div class="h-divider m-tb-10"></div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="m-t-10 article-option">
                      <el-col :xs="24" :sm="2">
                        <span  > 
                          Editorial Team :
                        </span>
                      </el-col>
                      <el-col :xs="24" :sm="16" v-loading="loading.authors">
                        <div v-for="(author) in mainArticleAuthors" :key="author.id" class="team">
                          <img :src="author.user.image" class="img-circle img-mini v-align-middle"/>
                          <span> {{ author.user.name }} </span>
                          <span class="follow-user">                            
                            <v-icon name="user" base-class="icon-20 v-align-middle"></v-icon>
                            <span  > 
                              <a title="" href="http://instagram.com/beritabaik.id">Follow</a>
                            </span>
                          </span>
                        </div>
                        
                      </el-col>                      
                      <el-col :xs="24" :sm="6">
                        <div class="icons">
                        <bb-love :articleID="mainArticle.id" :type="'article'" :scale="2"></bb-love>
                        <social-sharing url="http://beritabaik.id/"
                        :title="mainArticle.title"
                        :description="mainArticle.teaser"
                        :quote="mainArticle.title"
                        hashtags="beritabaik,news"
                        inline-template>
                          <div class="icon-network">                          
                              <network network="facebook">
                                <fa-icon name="facebook-f" scale="1.8" class="network-icon"></fa-icon>
                              </network>
                              <network network="twitter">
                                <fa-icon name="twitter" scale="1.8" class="network-icon"></fa-icon>
                              </network>
                              <network network="email">
                                <fa-icon name="envelope" scale="1.8" class="network-icon"></fa-icon>
                              </network>
                              <network network="googleplus">
                                <fa-icon name="google-plus" scale="1.8" class="network-icon"></fa-icon>
                              </network>
                              <!-- <network network="whatsapp">
                                <fa-icon name="whatsapp" scale="2" class="network-icon"></fa-icon>
                              </network> -->
                          </div>
                        </social-sharing>                        
                        <v-icon name="more-horizontal" base-class="icon-30"></v-icon>
                        </div>
                      </el-col>                      
                  </el-row>
                </el-row>
                <el-row :gutter="20" class="m-t-10" >
              <el-col v-if="mainArticle">
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
    <el-row :gutter="20" class="comments-container">
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
          <popular-news-side> </popular-news-side>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
          </div>
          <infografis-side :editorialSlug="'infografis'"  > </infografis-side>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
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
import { PopularNewsSide, ArticlesCard, CommentBox, ArticleNav, CommentList, Subscribe, Events, AdvertisementSide, InfografisSide } from '@/views/portal/components'
import BbLove from '@/views/portal/components/BbLove'
import EventBus from '@/utils/event-bus'
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
    BbLove,
    AdvertisementSide,
    InfografisSide
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
          EventBus.$emit('SET_ARTICLE_ID_COMMENTS_EVENT', { 'articleID': this.mainArticle.id })
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
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}

</style>