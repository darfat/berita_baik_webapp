<template>
  <div class="editoral-container">
    <el-row :gutter="20" class="headline-container" v-if="latestNews">
      <el-row :gutter="20" >
        <div class="container">
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
                    <div>
                        <h1>Images</h1>
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
                            {{ latestNews.title }}
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
                <el-row :gutter="20" class="m-t-10" v-if="latestNews" >
                  <el-col >
                    <comment-box :articleID="latestNews.id"></comment-box>
                  </el-col>
                </el-row>
          </div>
        </el-col>
        </div>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="comments-container" v-if="latestNews" >
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
              <articles-card :editorialSlug="editorialSlug" :editorialType="editorialType" :limit=10 :showPaging="false"></articles-card>
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
import { PopularNewsSide, ArticlesCard, InfografisSide, AdvertisementSide, CommentBox, CommentList } from '@/views/portal/components'
import { getEditorialLabelBySlug, getEditorialIdBySlug } from '@/api/editorial'
import { getLatestNewsByEditorial, getArticleImages } from '@/api/article'
import EventBus from '@/utils/event-bus'

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
    CommentList
  },
  data() {
    return {
      latestNews: {},
      articleImages: [],
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
  },
  mounted() {
    this.initMounted()
  },
  methods: {
    init() {
      this.editorialTitle = getEditorialLabelBySlug(this.$route.params.editorialSlug)
      this.editorialSlug = this.$route.params.editorialSlug
      this.editorialType = this.$route.params.editorialType
    },
    initMounted() {
      this.getLatestNews(this.editorialSlug)
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
                EventBus.$emit('SET_ARTICLE_ID_COMMENTS_EVENT', { 'articleID': this.latestNews.id })
                this.loading.latestNews = false
              }
            })
          }
        })
      } else {
        getLatestNewsByEditorial(params).then(response => {
          if (response) {
            this.latestNews = response.data
            EventBus.$emit('SET_ARTICLE_ID_COMMENTS_EVENT', { 'articleID': this.latestNews.id })
            this.loading.latestNews = false

            if (editorialSlug !== 'infografis') {
              getArticleImages({ article_id: this.latestNews.id }).then(responseImages => {
                if (responseImages) {
                  this.articleImages = responseImages.data
                  console.log(responseImages)
                }
              })
            }
          }
        })
      }
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/editorial-image-list.scss";
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