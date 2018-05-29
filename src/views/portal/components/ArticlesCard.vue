<template>
  <div class="card-content">
    <el-row >
      <div class="section-title">{{title}}</div>
    </el-row>
    <div class="m-t-20">
    <el-row :gutter="20" v-loading="loading.articles">
      <el-col :xs="24" :sm="12" v-for="(article) in articles" :key="article.id">
        <div class="news-col">
          <el-card :body-style="{ padding: '0px' }" class="news-card">            
            <div class="mini-thumbnail" >
              <router-link  v-if="article.article_type === 'news' || article.article_type === 'y-news'"  :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }">
                <img v-if="article.thumb_image" v-lazy="article.thumb_image" class="card-image" />
                <img v-else v-lazy="article.main_image" class="card-image" />
                <div class="editorial-type-img">
                  <h3>{{ article.editorial.name }}</h3>
                </div>
              </router-link>
              <!-- <router-link v-if="article.editorial.slug === 'infografis'" :to="{ name: 'infografis-detail-layout', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug} }" >                      
                <img v-lazy="article.main_image" class="card-image" />
                <div class="editorial-type-img">
                  <h3>{{ article.editorial.name }}</h3>
                </div>
              </router-link> -->
              <router-link   v-if="article.article_type === 'image' || article.article_type === 'y-image'" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug } }" >                      
                <img v-if="article.thumb_image" v-lazy="article.thumb_image" class="card-image" />
                <img v-else v-lazy="article.main_image" class="card-image" />
                <div class="editorial-type-img">
                  <h3>{{ article.editorial.name }}</h3>
                </div>
              </router-link>
            </div>            
            <div class="ac-bottom-content">
              <div class="share">
                <bb-love :articleID="article.id" :type="'article'" ></bb-love>
                <share-pop :article="article"></share-pop>              
              </div>
              <el-row class="ac-title">
                <div v-if="article.editorial">
                  <router-link v-if="article.article_type === 'news' || article.article_type === 'y-news'" :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }">
                    <h2 class="headline" v-html="subString(article.title,100)" ></h2>                    
                  </router-link>
                  <router-link   v-if="article.article_type === 'image' || article.article_type === 'y-image'" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug } }" >                      
                    <h2 class="headline" v-html="subString(article.title,100)" ></h2>
                  </router-link>
                </div>
              </el-row>
              <p class="red-line"></p>
              <p class="author">
                    {{ article.reporter_name }} |
                    <timeago :auto-update="60" :since="article.publish_date | formatUTC"></timeago>
              </p>             
            </div>
          </el-card>
        </div>        
      </el-col>
    </el-row>
    </div>
    <div class="ac-paging" v-if="showPaging">
      <el-pagination
        background
        :pager-count="pagerCount"
        layout="prev, pager, next"
        prev-text="<" next-text=">"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="per_page"
        :total="total_entries_size"
      >
      </el-pagination>
    </div>
    <div class="ac-paging" v-if="!showPaging">
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more">
          
        </span>
      </infinite-loading>
    </div>
  </div>
</template>


<script>
  import ArticleSeparator from '@/components/ArticleSeparator'
  import BbLove from '@/views/portal/components/BbLove'
  import SharePop from '@/views/portal/components/SharePop'
  import {
    getNewsByEditorialSlug,
    getLatestNewsAll
  } from '@/api/article'
  import {
    getEditorialIdBySlug
  } from '@/api/editorial'

  export default {
    name: 'ArticlesCard',
    components: {
      ArticleSeparator,
      BbLove,
      SharePop
    },
    props: {
      editorialSlug: {
        type: String
      },
      editorialType: {
        type: String
      },
      articleType: {
        type: String
      },
      title: {
        type: String,
        default: 'BACA LAINNYA'
      },
      limit: {
        default: 8,
        type: Number
      },
      showPaging: {
        default: true,
        type: Boolean
      },
      pagerCount: {
        default: 5,
        type: Number
      }
    },
    data() {
      return {
        articles: [],
        loading: {
          articles: false
        },
        per_page: 10,
        page: 1,
        total_pages: 1,
        total_entries_size: 0
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.per_page = this.limit
        if (this.showPaging === true) {
          this.getArticles(this.editorialSlug, this.page)
        }
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
      getArticles(editorialSlug, page) {
        this.loading.articles = true
        if (editorialSlug) {
          let params = {
            editorialSlug,
            page,
            per_page: this.per_page,
            type: this.articleType
          }
          if (this.editorialType && this.editorialType !== null && this.editorialType.length) {
            getEditorialIdBySlug({
              slug: editorialSlug
            }).then(editorialResponse => {
              if (editorialResponse) {
                params = {
                  editorialSlug,
                  editorialType: this.editorialType,
                  editorialSlugID: editorialResponse.data.id,
                  page,
                  per_page: this.per_page,
                  type: this.articleType
                }
                getNewsByEditorialSlug(params).then(response => {
                  if (response) {
                    this.articles = response.data.data
                    this.per_page = response.data.per_page
                    this.total_pages = response.data.total_pages
                    this.total_entries_size = response.data.total_entries_size
                    this.page = response.data.page
                  }
                  this.loading.articles = false
                })
              }
            })
          } else {
            getNewsByEditorialSlug(params).then(response => {
              if (response) {
                this.articles = response.data.data
                this.per_page = response.data.per_page
                this.total_pages = response.data.total_pages
                this.total_entries_size = response.data.total_entries_size
                this.page = response.data.page
              }
              this.loading.articles = false
            })
          }
        } else {
          getLatestNewsAll({
            page,
            per_page: this.per_page
          }).then(response => {
            if (response) {
              this.articles = response.data.data
              this.per_page = response.data.per_page
              this.total_pages = response.data.total_pages
              this.total_entries_size = response.data.total_entries_size
              this.page = response.data.page
            }
            this.loading.articles = false
          })
        }
      },
      handleCurrentChange(page) {
        this.getArticles(this.editorialSlug, page)
      },
      infiniteHandler($state) {
        const editorialSlug = this.editorialSlug
        const page = Math.floor(this.articles.length / this.per_page) + 1
        if (editorialSlug) {
          let params = {
            editorialSlug,
            page,
            per_page: this.per_page,
            type: this.articleType
          }
          if (this.editorialType && this.editorialType !== null && this.editorialType.length) {
            getEditorialIdBySlug({
              slug: editorialSlug
            }).then(editorialResponse => {
              if (editorialResponse) {
                params = {
                  editorialSlug,
                  editorialType: this.editorialType,
                  editorialSlugID: editorialResponse.data.id,
                  page,
                  per_page: this.per_page,
                  type: this.articleType
                }
                getNewsByEditorialSlug(params).then(response => {
                  if (response) {
                    // this.articles = response.data.data
                    this.per_page = response.data.per_page
                    this.total_pages = response.data.total_pages
                    this.total_entries_size = response.data.total_entries_size
                    this.page = response.data.page
                    if (response.data.data && response.data.data.length) {
                      this.articles = this.articles.concat(response.data.data)
                      $state.loaded()
                      if (Math.ceil(this.articles.length / this.per_page) === this.total_pages) {
                        $state.complete()
                      }
                    } else {
                      $state.complete()
                    }
                  }

                  // this.loading.articles = false
                })
              }
            })
          } else {
            getNewsByEditorialSlug(params).then(response => {
              if (response) {
                // this.articles = response.data.data
                this.per_page = response.data.per_page
                this.total_pages = response.data.total_pages
                this.total_entries_size = response.data.total_entries_size
                this.page = response.data.page
                if (response.data.data && response.data.data.length) {
                  this.articles = this.articles.concat(response.data.data)
                  $state.loaded()
                  if (Math.ceil(this.articles.length / this.per_page) === this.total_pages) {
                    $state.complete()
                  }
                } else {
                  $state.complete()
                }
              }
            })
          }
        } else {
          getLatestNewsAll({
            page,
            per_page: this.per_page
          }).then(response => {
            if (response) {
              this.articles = response.data.data
              this.per_page = response.data.per_page
              this.total_pages = response.data.total_pages
              this.total_entries_size = response.data.total_entries_size
              this.page = response.data.page
              if (response.data.data && response.data.data.length) {
                this.articles = this.articles.concat(response.data.data)
                $state.loaded()
                if (Math.ceil(this.articles.length / this.per_page) === this.total_pages) {
                  $state.complete()
                }
              } else {
                $state.complete()
              }
            }
          })
        }
      }
    } // end method
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/articles-card.scss";

  // remove shadow
  .el-card {
    -webkit-box-shadow: 0 0px 0px 0 #fff;
  }


  .el-row {
    margin-bottom: 1px;
    &:last-child {
      margin-bottom: 5px;
    }
  }

  .el-col {
    border-radius: 0px;
  }

</style>
