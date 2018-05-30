<template>
  <div class="editoral-container">
    <div class="headline-container">
      <div class="container">
        <el-row :gutter=20 v-if="latestNews">
          <el-col :xs="24" :sm="16" class="headline-container-l">
            <div class="grid-content latest-news" v-loading="loading.latestNews" v-if="latestNews.id">
              <div  v-loading="loading.latestNews" class="videoWrapper">
                <!--<youtube :video-id="$youtube.getIdFromURL(latestNews.sources_path)" :player-vars="{ showinfo: 0 }" @ready="ready" @playing="playing" ></youtube>-->
                <iframe 
                  width="640"
                  height="390"
                  :src="'https://www.youtube.com/embed/'+$youtube.getIdFromURL(latestNews.sources_path)+'?rel=0&amp;fs=0&amp;showinfo=0'"
                  frameborder="0"
                  allowfullscreen></iframe>
              </div>
              <div class="info">
                <div class="share" v-if="latestNews.id">
                  <span><bb-love  :articleID="latestNews.id" :type="'article'" ></bb-love></span>
                  <span><share-pop :article="latestNews"></share-pop></span>
                </div>
                <h1 class="headline" v-html="latestNews.title,101"></h1>
                <p class="red-line"></p>
                <p class="author">{{ latestNews.reporter_name }} | <timeago :auto-update="60" :since="latestNews.publish_date | formatUTC"></timeago></p>
              </div>
              <div class="comment" v-if="latestNews" >              
                <comment-box :articleID="latestNews.id"></comment-box>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" class="headline-container-r">
            <div class="grid-content">
              <div >
                <ads-banner :showTitle=false position="Video : Headline"></ads-banner>
              </div>
              <div >
                <editor-pick-videos-side ></editor-pick-videos-side>
              </div>
            </div>
          </el-col>
        </el-row>
        
      </div>
    </div>   
    
    <div class="container">
      <el-row :gutter=20 class="comments-container">
        <el-col class="comments-content">          
          <comment-list :articleID="this.latestNews.id"></comment-list>
          <div class="gray-separator"></div>
        </el-col>
      </el-row>

      <el-row :gutter=20 class="list-container" v-if="latestNews" >        
          <el-col class="content">
            <div class="grid-content video-content">
              <videos-card :editorialSlug="editorialSlug" :editorialType="editorialType" :limit=10 :showPaging="false"></videos-card>
            </div>
          </el-col>        
          <el-col class="side-content">
            <div class="grid-content a-side">
              <div>
              <popular-video-side :editorialSlug="editorialSlug"> </popular-video-side>
              </div>
              <div class="side-separator">
                <router-link :to="{ name: 'content-more', params: { 'editorialSlug': editorialSlug, 'title': 'VIDEO TERPOPULER' } }">
                <span> Buka lebih banyak lagi </span>
                </router-link>
              </div>
              <div class=" spacer m-t-20">
              <infografis-side :editorialSlug="'infografis'"  > </infografis-side>
              </div>
              <div class="side-separator">
                <router-link  :to="{ name: 'editorial-image', params: { 'editorialSlug': 'infografis' } }" >
                  <span> Buka lebih banyak lagi </span>
                </router-link>
              </div>
              <div class="spacer m-t-20"></div>
              <ads-banner :showTitle=true position="Kanal : Kanan"></ads-banner>
            </div>
          </el-col>        
      </el-row>
    </div>
    
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import BbLove from '@/views/portal/components/BbLove'
import { PopularNewsSide, VideosCard, InfografisSide, AdvertisementSide, CommentBox, CommentList, EditorPickVideosSide, SharePop, ArticleNav, PopularVideoSide, AdsBanner } from '@/views/portal/components'
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
    PopularVideoSide,
    AdsBanner
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
  },
  metaInfo() {
    return {
      title: 'Video'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/editorial-video-list.scss";
.el-row {
  margin-bottom: 0;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
    border-radius: 0px;
}

</style>