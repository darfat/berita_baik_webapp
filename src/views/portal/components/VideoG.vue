<template>
  <div class="vid-wrapper">
      <div class="vid-main" v-loading="loading.latestVideo" >
        <youtube :video-id="$youtube.getIdFromURL(latestVideo.sources_path)" :player-vars="{ showinfo: 0 }" @ready="ready" @playing="playing" ></youtube>
      </div>
      <div class="bottom clearfix"></div>
      <el-row class="vid-main-attr"  >
        <el-col :span="20" v-loading="loading.latestVideo" ><h2>{{ latestVideo.title }}</h2></el-col>
        <el-col :span="4" class="share-icon">
          <a><v-icon name="facebook" base-class="icon-20"></v-icon></a>
          <a><v-icon name="twitter" base-class="icon-20"></v-icon></a>
          <a><v-icon name="instagram" base-class="icon-20"></v-icon></a>
          <a href=""><v-icon name="play" base-class="icon-20"></v-icon></a>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-t-10" v-if="latestVideo" >
        <el-col >
          <comment-box :articleID="latestVideo.id"></comment-box>
        </el-col>
      </el-row>
  </div>
  
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { CommentBox } from '@/views/portal/components'
import { getLatestVideoByEditorial, getVideosByEditorialSlug } from '@/api/article'

export default {
  name: 'VideoG',
  components: {
    ArticleSeparator,
    CommentBox
  },
  props: {
    editorialSlug: { type: String, default: 'video' },
    limit: { default: 6, type: Number },
    showPaging: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      latestVideo: {},
      loading: {
        latestVideo: false,
        list: false
      },
      list: [],
      per_page: 6,
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
      this.getLatestVideo(this.editorialSlug)
      this.per_page = this.limit
      if (this.showPaging === true) {
        this.getVideos(this.editorialSlug, this.page)
      }
    },
    getLatestVideo(editorialSlug) {
      this.loading.latestVideo = true
      getLatestVideoByEditorial({ editorialSlug }).then(response => {
        if (response) {
          this.latestVideo = response.data
        }
        this.loading.latestVideo = false
      })
    },
    getVideos(editorialSlug, page) {
      this.loading.list = true
      getVideosByEditorialSlug({ editorialSlug, page, per_page: this.per_page }).then(response => {
        if (response) {
          this.list = response.data.data
          this.per_page = response.data.per_page
          this.total_pages = response.data.total_pages
          this.total_entries_size = response.data.total_entries_size
          this.page = response.data.page
        }
        this.loading.list = false
      })
    },
    handleCurrentChange(page) {
      this.getVideos(this.editorialSlug, this.page)
    },
    infiniteHandler($state) {
      const editorialSlug = this.editorialSlug
      const page = Math.floor(this.list.length / this.per_page) + 1
      if (editorialSlug) {
        getVideosByEditorialSlug({ editorialSlug, page, per_page: this.per_page }).then(response => {
          if (response) {
            // this.list = response.data.data
            this.per_page = response.data.per_page
            this.total_pages = response.data.total_pages
            this.total_entries_size = response.data.total_entries_size
            this.page = response.data.page
            if (response.data.data && response.data.data.length) {
              this.list = this.list.concat(response.data.data)
              $state.loaded()
              if (Math.ceil(this.list.length / this.per_page) === this.total_pages) {
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
  }
}
</script>

<style>

.vid-main {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 0;
    height: 0;
    overflow: hidden;    
  }
  
  .vid-main iframe,
  .vid-main object,
  .vid-main embed{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
  .vid-main-attr{
    width: 100%;
    color: #FFF;
    line-height: 3em;
  }
  
  .vid-main-attr h2{
    margin: 0;
    padding: 0;
  }
  
  .vid-main-attr .share{
    
  }
  .vid-thumb{  
    margin: 10px 0;
  }
  .vid-thumb .vid-thumb-wrapper {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      padding-top: 25px;
      height: 0;
  }
  .vid-thumb .vid-thumb-wrapper iframe,
  .vid-thumb .vid-thumb-wrapper object,
  .vid-thumb .vid-thumb-wrapper embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    height: 100%;
  }
  
</style>