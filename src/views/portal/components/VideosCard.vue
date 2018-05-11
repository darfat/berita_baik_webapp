<template>
  <div class="card-content">
    <el-row>
      <div class="section-title"> {{title}}</div>
    </el-row>
    <div class="m-t-10">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" v-for="(video, index) in videos" :key="video.id">
        <div class="vid-thumb">
          <el-card :body-style="{ padding: '0px' }" class="news-card">
            <div class="videoWrapper">
              <!--<youtube :video-id="$youtube.getIdFromURL(video.sources_path)" :player-vars="{ showinfo: 0 }" @ready="ready" @playing="playing" ></youtube>-->
              <iframe 
                  width="640"
                  height="390"
                  :src="'http://www.youtube.com/embed/'+$youtube.getIdFromURL(video.sources_path)+'?rel=0&amp;fs=0&amp;showinfo=0'"
                  frameborder="0"
                  allowfullscreen></iframe>
            </div>
            <div class="ac-bottom-content">
              <div class="bottom clearfix">
                
              </div>
              <el-row >
                  <el-col :span="4" v-if="video.id">
                      <span> <bb-love></bb-love> </span>
                      <span> <share-pop :article="video"></share-pop>   </span>
                  </el-col>
              </el-row>
              <el-row class="ac-title">
                <div>
                  <router-link v-if="video.editorial" :to="{ name: 'editorial-video-detail', params: { 'editorialSlug':video.editorial.slug, 'slug': video.slug} }">
                    <h2 class="headline" v-html="subString(video.title,80)" ></h2>
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
                  <div class="author">
                    {{ video.reporter_name }} |
                    <timeago :auto-update="60" :since="video.publish_date | formatDate"></timeago>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    </div>
    <div class="ac-paging" v-if="showPaging">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="Sebelumnya" next-text="Selanjutnya"
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
    getVideosByEditorialSlug
  } from '@/api/article'

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
      title: {
        type: String,
        default: 'VIDEO LAINNYA'
      },
      limit: {
        default: 8,
        type: Number
      },
      showPaging: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        videos: [],
        loading: {
          list: false
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
          this.getVideos(this.editorialSlug, this.page)
        }
      },
      subString(str, len) {
        if (str.length < len) {
          return str
        } else {
          return str.substring(0, (len - 3)) + '...'
        }
      },
      getVideos(editorialSlug, page) {
        this.loading.list = true
        getVideosByEditorialSlug({ editorialSlug, page, per_page: this.per_page }).then(response => {
          if (response) {
            this.videos = response.data.data
            this.per_page = response.data.per_page
            this.total_pages = response.data.total_pages
            this.total_entries_size = response.data.total_entries_size
            this.page = response.data.page
          }
          this.loading.list = false
        })
      },
      handleCurrentChange(page) {
        this.getArticles(this.editorialSlug, page)
      },
      infiniteHandler($state) {
        const editorialSlug = this.editorialSlug
        const page = Math.floor(this.videos.length / this.per_page) + 1
        if (editorialSlug) {
          getVideosByEditorialSlug({ editorialSlug, page, per_page: this.per_page }).then(response => {
            if (response) {
              // this.videos = response.data.data
              this.per_page = response.data.per_page
              this.total_pages = response.data.total_pages
              this.total_entries_size = response.data.total_entries_size
              this.page = response.data.page
              if (response.data.data && response.data.data.length) {
                this.videos = this.videos.concat(response.data.data)
                $state.loaded()
                if (Math.ceil(this.videos.length / this.per_page) === this.total_pages) {
                  $state.complete()
                }
              } else {
                $state.complete()
              }
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
    } // end method
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/videos-card.scss";

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
