<template>  
  <section class="video-container" v-loading="loading.latestVideo">    
    <div class="video-wrapper">
      <youtube :video-id="videoId" @ready="ready" @playing="playing" @paused="paused" v-if="latestVideo" 
      player-width="100%" player-height="565px" 
      class="hidden-xs-only"></youtube>
      <youtube :video-id="videoId" @ready="ready" @playing="playing" @paused="paused" v-if="latestVideo" 
      player-width="100%" player-height="220px" 
      class="hidden-sm-and-up"></youtube>
      <!-- <iframe 
        width="640"
        height="390"
        :src="'https://www.youtube.com/embed/'+videoId+'?rel=0&amp;fs=0&amp;showinfo=0'"
        frameborder="0"
        allowfullscreen @click="clickFrame"></iframe> -->

      <div class="overlay-desc" v-show="showTitle"  >        
        <div class="align-center"> <h2 v-if="latestVideo.editorial" >{{ latestVideo.editorial.name }}</h2> </div>
        <h1>{{ latestVideo.title }}</h1>
        <p class="teaser-v">{{ latestVideo.teaser }}</p>        
        <p class="red-line"></p>
        <p class="author-v" >{{ latestVideo.reporter_name }} |
          <timeago v-if="latestVideo && latestVideo.publish_date" :auto-update="60" :since="latestVideo.publish_date | formatUTC"></timeago>
        </p>     
      </div>
    </div>    
  </section>
</template>

<script>
import { getLatestVideoByEditorial } from '@/api/article'

export default {
  name: 'HomeYoutubeVideo',
  props: {
    editorialSlug: { type: String, default: 'video' }
  },
  data() {
    return {
      latestVideo: {},
      loading: {
        latestVideo: false
      },
      videoId: '',
      showTitle: true
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.getLatestVideo(this.editorialSlug)
    },
    getLatestVideo(editorialSlug) {
      this.loading.latestVideo = true
      getLatestVideoByEditorial({ editorialSlug }).then(response => {
        if (response) {
          this.latestVideo = response.data
          this.videoId = this.$youtube.getIdFromURL(this.latestVideo.sources_path)
        }
        this.loading.latestVideo = false
      })
    },
    ready(player) {
      this.player = player
    },
    playing(player) {
      // The player is playing a video.
      this.showTitle = false
    },
    change() {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.videoId = '-'
    },
    stop() {
      this.player.stopVideo()
      this.showTitle = true
    },
    paused() {
      this.player.pauseVideo()
      this.showTitle = true
    },
    clickFrame() {
      this.showTitle = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/home-youtube-video.scss";
</style>