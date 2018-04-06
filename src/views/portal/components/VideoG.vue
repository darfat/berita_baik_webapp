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
      <div class="vid-thumb">
        <el-row :gutter="20" v-loading="loading.list"  >
          <el-col :span="8" v-for="(item) in list" :key="item.id" style="margin-bottom:20px">
            <div class="vid-thumb-wrapper">
              <youtube :video-id="$youtube.getIdFromURL(item.sources_path)" :player-vars="{ showinfo: 0 }" @ready="ready" @playing="playing" ></youtube>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="video-paging align-center">
          <el-pagination
          background
          layout="prev, pager, next"
          :total="20"
          prev-text="Pertama" next-text="Terakhir"
          >
        </el-pagination>
      </div>

  </div>
  
  
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { getLatestVideoByEditorial, getVideosByEditorialSlug } from '@/api/article'

export default {
  name: 'VideoG',
  components: {
    ArticleSeparator
  },
  props: {
    editorialSlug: { type: String, default: 'video' },
    limit: { default: 6, type: Number }
  },
  data() {
    return {
      latestVideo: {},
      loading: {
        latestVideo: false,
        list: false
      },
      list: []
    }
  },
  created() {
    console.log('videog')
    this.init()
  },
  methods: {
    init() {
      this.getLatestVideo(this.editorialSlug)
      this.getVideos(this.editorialSlug)
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
    getVideos(editorialSlug) {
      this.loading.list = true
      getVideosByEditorialSlug({ editorialSlug, page: 1, per_page: this.limit }).then(response => {
        if (response) {
          this.list = response.data.data
        }
        this.loading.list = false
      })
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