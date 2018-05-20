<template>  
  <section class="video-container" v-loading="loading.latestVideo">    
    <div class="video-wrapper">
      <!--<youtube :video-id="videoId" @ready="ready" @playing="playing" v-if="latestVideo" ></youtube>-->
      <iframe 
        width="640"
        height="390"
        :src="'https://www.youtube.com/embed/'+videoId+'?rel=0&amp;fs=0&amp;showinfo=0'"
        frameborder="0"
        allowfullscreen></iframe>

      <div class="overlay-desc" v-show="ready"  >        
        <div class="align-center"> <h2 v-if="latestVideo.editorial" >{{ latestVideo.editorial.name }}</h2> </div>
        <h1>{{ latestVideo.title }}</h1>
        <p class="teaser-v">{{ latestVideo.teaser }}</p>        
        <p class="red-line"></p>
        <p class="author-v" >{{ latestVideo.reporter_name }} |
          <timeago :auto-update="60" :since="latestVideo.publish_date"></timeago>
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
      videoId: ''
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
    },
    pause() {
      this.player.pauseVideo()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/home-youtube-video.scss";
</style>