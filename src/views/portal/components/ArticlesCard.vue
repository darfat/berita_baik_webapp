<template>
  <div class="card-content">
    <el-row>
      <div class="section-title"> {{title}}</div>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" v-for="(article) in articles" :key="article.id">
        <div class="news-col">
          <el-card :body-style="{ padding: '0px' }" class="news-card">
            <div>
              <div class="mini-thumbnail">
                <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }">
                  <img :src="article.main_image" class="card-image" />
                  <div class="editorial-type-img">
                    <h3>{{ article.editorial.name }}</h3>
                  </div>
                </router-link>
              </div>
            </div>
            <div class="ac-bottom-content">
              <div class="bottom clearfix">
                <el-row>
                  <el-col :span="4">
                    <span>
                      <bb-love></bb-love>
                    </span>
                    <a @click="centerDialogVisible = true">
                      <fa-icon name="share-alt" scale="1.3"></fa-icon>
                    </a>
                  </el-col>
                </el-row>
              </div>
              <el-row class="ac-title">
                <div>
                  <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }">
                    <span>{{ article.title}}</span>
                  </router-link>
                </div>
              </el-row>
              <el-row>
                <el-col :span="2">
                  <article-separator></article-separator>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="ac-footer">
                  <div>
                    {{ article.reporter_name }} |
                    <timeago :auto-update="60" :since="article.publish_date"></timeago>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <el-dialog title="" :visible.sync="centerDialogVisible" width="30%" center>
          <span @click="centerDialogVisible = false" v-if="article">
            <social-sharing  v-if="article.editorial"  :url="'http://beritabaik.id/#/home/a/'+article.editorial.slug+'/'+article.slug" :title="article.title" :description="article.teaser" :quote="article.title"
              :hashtags="'beritabaik,'+article.article_tags" inline-template>
              <div>
                <network network="facebook">
                  <fa-icon name="facebook-f" scale="1.8" class="network-icon"></fa-icon>
                </network>
                <network network="twitter" class="network-icon">
                  <fa-icon name="twitter" scale="1.8"></fa-icon>
                </network>
                <network network="email">
                  <fa-icon name="envelope" scale="1.8"></fa-icon>
                </network>
                <network network="googleplus">
                  <fa-icon name="google-plus" scale="1.8"></fa-icon>
                </network>
                <!-- <network network="whatsapp">
                                  <fa-icon name="whatsapp" scale="2" ></fa-icon>
                                </network> -->
              </div>
            </social-sharing>
          </span>
        </el-dialog>
      </el-col>
    </el-row>

    <div class="ac-paging">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="Pertama" next-text="Terakhir"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="per_page"
        :total="total_entries_size"  
      >
      </el-pagination>
    </div>

  </div>
</template>


<script>
  import ArticleSeparator from '@/components/ArticleSeparator'
  import BbLove from '@/views/portal/components/BbLove'
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
      BbLove
    },
    props: {
      editorialSlug: {
        type: String
      },
      editorialType: {
        type: String
      },
      title: {
        type: String,
        default: 'BACA LAINNYA'
      },
      limit: {
        default: 9,
        type: Number
      }
    },
    data() {
      return {
        articles: [],
        loading: {
          articles: false
        },
        centerDialogVisible: false,
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
        this.getArticles(this.editorialSlug, this.page)
      },
      getArticles(editorialSlug, page) {
        this.loading.articles = true
        if (editorialSlug) {
          let params = {
            editorialSlug,
            page,
            per_page: this.per_page
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
                  per_page: this.per_page
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
        console.log(`${page} page`)
        this.getArticles(this.editorialSlug, page)
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
    margin-bottom: 2px;
    &:last-child {
      margin-bottom: 5px;
    }
  }

  .el-col {
    border-radius: 0px;
  }

</style>
