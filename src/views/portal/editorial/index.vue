<template>
  <div class="editoral-container">
    <el-row :gutter="20" class="headline-container" v-if="latestNews">
      <el-row :gutter="20"> 
        <div class="container">         
          <el-col :xs="24" v-if="latestNews.editorial">
            <div class="grid-content title-container" v-if="editorialSlug !== latestNews.editorial.slug">
                <h1 class="main-article-title"> {{ editorialTitle }} </h1> 
            </div>
          </el-col>
        </div>  
      </el-row>
      <el-row :gutter="20">
        <div class="container">
        <el-col :xs="24">
          <div class="grid-content latest-news" v-loading="loading.latestNews" v-if="latestNews.id">
                <el-row :gutter="20" >
                  <el-col >
                    <div>
                        <div class="background">
                          <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':latestNews.editorial.slug, 'slug': latestNews.slug,  'articleID': latestNews.id} }">
                            <img :src="latestNews.main_image" />
                            <div class="editorial-type-img" v-if="latestNews.id">
                                <h2>{{ latestNews.editorial.name }}</h2>
                            </div>
                          </router-link>
                        </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="content"> 
                  <el-col>
                    <el-row :gutter="20">
                        <el-col :span="4" v-if="latestNews.id">
                            <span> <bb-love></bb-love> </span>
                            <span><a @click="centerDialogVisible = true"> <fa-icon name="share-alt" scale="1.3"  ></fa-icon> </a>  </span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="ln-title">
                      <el-col >
                        <div class="headline"> 
                          <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':latestNews.editorial.slug, 'slug': latestNews.slug,  'articleID': latestNews.id} }">
                            {{ latestNews.title }}
                          </router-link>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col class="sub-headline">
                          <div v-html="latestNews.teaser" class="article-content">
                          </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="1"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col class="footer">
                          <div class="author">
                            {{ latestNews.reporter_name }} | <timeago :auto-update="60" :since="latestNews.publish_date"></timeago>
                          </div>
                        </el-col>
                    </el-row>
                  </el-col>
                </el-row>
          </div>
          <el-dialog title="" :visible.sync="centerDialogVisible" width="30%" center>
              <span @click="centerDialogVisible = false" v-if="latestNews">
                <social-sharing  v-if="latestNews.editorial"  :url="'http://beritabaik.id/#/home/a/'+latestNews.editorial.slug+'/'+latestNews.slug" :title="latestNews.title" :description="latestNews.teaser" :quote="latestNews.title"
                  :hashtags="'beritabaik,'+latestNews.article_tags" inline-template>
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
        </div>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="list-container">
      <div class="container">
        <el-col :xs="24" :sm="16" class="content">
          <div class="grid-content">
              <articles-card :editorialSlug="editorialSlug" :editorialType="editorialType" :limit=4 :showPaging="false"></articles-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" class="side-content">
          <div class="grid-content a-side">
            <div>
            <popular-news-side> </popular-news-side>
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
import { PopularNewsSide, ArticlesCard, InfografisSide, AdvertisementSide } from '@/views/portal/components'
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
    AdvertisementSide
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
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/editorial-list.scss";
.el-row {
  margin-bottom: 3px;
  &:last-child {
    margin-bottom: 3px;
  }
}
.el-col {
    border-radius: 0px;
}
</style>