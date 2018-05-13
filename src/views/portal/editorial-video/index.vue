<template>
  <div class="editoral-container">
    <el-row :gutter="20" class="headline-container" v-if="latestNews">      
      <div class="container">
        <el-col :xs="24" :sm="16">
          <div class="grid-content latest-news" v-loading="loading.latestNews" v-if="latestNews.id">
            <el-row class="">
              <el-col >
                <div  v-loading="loading.latestNews" class="videoWrapper">
                  <!--<youtube :video-id="$youtube.getIdFromURL(latestNews.sources_path)" :player-vars="{ showinfo: 0 }" @ready="ready" @playing="playing" ></youtube>-->
                  <iframe 
                    width="640"
                    height="390"
                    :src="'http://www.youtube.com/embed/'+$youtube.getIdFromURL(latestNews.sources_path)+'?rel=0&amp;fs=0&amp;showinfo=0'"
                    frameborder="0"
                    allowfullscreen></iframe>
                </div>
              </el-col>
            </el-row>
            <el-row  class="content"> 
              <el-col>
                <el-row >
                    <el-col :span="4" v-if="latestNews.id">
                        <span> <bb-love  :articleID="latestNews.id" :type="'article'"  ></bb-love> </span>
                        <span> <share-pop :article="latestNews"></share-pop>   </span>
                    </el-col>
                </el-row>
                <el-row class="ln-title">
                  <el-col >
                    <div class="headline"> 
                        {{ latestNews.title }}
                    </div>
                  </el-col>
                </el-row>
                <el-row >
                    <el-col class="sub-headline">
                      <div v-html="latestNews.teaser" class="article-content">
                      </div>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="1"><article-separator></article-separator></el-col>
                </el-row>
                <el-row >
                    <el-col class="footer">
                      <div class="author">
                        {{ latestNews.reporter_name }} | <timeago :auto-update="60" :since="latestNews.publish_date"></timeago>
                      </div>
                    </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="m-t-10" v-if="latestNews" >
              <el-col >
                <comment-box :articleID="latestNews.id"></comment-box>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col v-if="latestNews">
                <article-nav :editorialSlug="editorialSlug" :articleID="latestNews.id" type="video" navTitle="Video"></article-nav>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" class="side-content  m-t-10">
          <div class="grid-content a-side">
            <div class="spacer"></div>
            <div >
              <advertisement-side :showTitle="false"></advertisement-side>
            </div>
            <div >
              <editor-pick-videos-side ></editor-pick-videos-side>
            </div>
          </div>
      </el-col>
      </div>      
    </el-row>
    <el-row :gutter="20" class="list-container" v-if="latestNews" >
      <div class="container">
      <el-row :gutter="20" >        
        <el-col :xs="24" :sm="16"  >
          <div class="comments-content">
            <comment-list :articleID="this.latestNews.id"></comment-list>
          </div>  
          <div class="grid-content video-content">
              <videos-card :editorialSlug="editorialSlug" :editorialType="editorialType" :limit=10 :showPaging="false"></videos-card>
          </div>
        </el-col>        
        <el-col :xs="24" :sm="8" class="side-content">
          <div class="grid-content a-side">
            <div>
            <popular-video-side :editorialSlug="editorialSlug"> </popular-video-side>
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
      </el-row>

      </div>  
    </el-row>
    
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import BbLove from '@/views/portal/components/BbLove'
import { PopularNewsSide, VideosCard, InfografisSide, AdvertisementSide, CommentBox, CommentList, EditorPickVideosSide, SharePop, ArticleNav, PopularVideoSide } from '@/views/portal/components'
import { getEditorialLabelBySlug } from '@/api/editorial'
import { getLatestVideoByEditorial, getArticle } from '@/api/article'
import EventBus from '@/utils/event-bus'

export default {
  name: 'editorialVideo',
  components: {
    ArticleSeparator,
    PopularNewsSide,
    VideosCard,
    BbLove,
    InfografisSide,
    AdvertisementSide,
    CommentBox,
    CommentList,
    EditorPickVideosSide,
    SharePop,
    ArticleNav,
    PopularVideoSide
  },
  data() {
    return {
      latestNews: {},
      editorialTitle: '',
      editorialSlug: null,
      editorialType: null,
      editorialObj: null,
      slug: null,
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
        this.getVideo(this.slug)
      } else {
        this.getLatestVideo(this.editorialSlug)
      }
    },
    getLatestVideo(editorialSlug) {
      this.loading.latestNews = true
      getLatestVideoByEditorial({ editorialSlug }).then(response => {
        if (response) {
          this.latestNews = response.data
          EventBus.$emit('SET_ARTICLE_ID_COMMENTS_EVENT', { 'articleID': this.latestNews.id })
        }
        this.loading.latestNews = false
      })
    },
    getVideo(slug) {
      this.loading.latestNews = true
      const params = {
        slug
      }
      if (slug) {
        getArticle(params).then(response => {
          if (response) {
            this.latestNews = response.data
            EventBus.$emit('SET_ARTICLE_ID_COMMENTS_EVENT', { 'articleID': this.latestNews.id })
            this.loading.latestNews = false
          }
        })
      }
    },
    ready(player) {
      this.player = player
    },
    playing(player) {
      // The player is playing a video.
    },
    change() {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.latestVideo.sources = 'another video id'
    },
    stop() {
      this.player.stopVideo()
    },
    pause() {
      this.player.pauseVideo()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/editorial-video-list.scss";
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