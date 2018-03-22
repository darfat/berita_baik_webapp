<template>  
  <section class="video-wrapper" v-loading="loading.latestVideo">    
    <youtube :video-id="$youtube.getIdFromURL(latestVideo.sources_path)" @ready="ready" @playing="playing" ></youtube>    
    <div class="container overlay-desc" v-show="ready"  v-loading="loading.latestVideo" >       
        <h2>{{ latestVideo.editorial.name }}</h2>
        <h1>{{ latestVideo.title }}</h1>
        <p>{{ latestVideo.teaser }}</p>        
        <hr style="width:30px;height:5px;background-color:#EB0029; border: none; padding-top:10px; margin-left: 0; clear:both" />
        <div> {{ latestVideo.reporter_name }} | <timeago :since="latestVideo.publish_date"></timeago> </div>
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
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getLatestVideo(this.editorialSlug)
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
      this.videoId = 'another video id'
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


.video-wrapper {
position: relative;
padding-bottom: 35%;
padding-top: 0; height: 0; overflow: hidden;
}

.video-wrapper iframe,
.video-wrapper object,
.video-wrapper embed {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}

.video-wrapper .overlay-desc {
  background-color: rgba(0,0,0,0.3);
  position: absolute;
  right: 60%; left: 5%; top: 30%;
  display: flex;
  //align-items: flex-end;
  // justify-content: flex-end;
  color: white;  
  flex-direction: column;
  padding: 10px;  
}
.video-wrapper .overlay-desc h1,
.video-wrapper .overlay-desc p {   
  margin:0;  
}
.video-wrapper .overlay-desc h2{ background-color: #0A2F88; display:table; padding:.25em;}
</style>