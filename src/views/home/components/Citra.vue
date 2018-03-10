<template>  
  <section class="video-wrapper">    
    <youtube :video-id="videoId" :player-vars="{ autoplay: 0, showinfo: 0, WMode: transparent }" @ready="ready" @playing="playing" ></youtube>    
    <div class="container overlay-desc" v-show="ready">       
        <h2>CITRA</h2>
        <h1>Amazing Indonesia</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</p>
        <hr style="width:30px;height:5px;background-color:#F5DF00; border: none; padding-top:10px; margin-left: 0; clear:both" />
        <div>Boim | 3 Hari yang lalu</div>
     </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      videoId: 'PHs39R0AbRw'
    }
  },
  methods: {
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
padding-bottom: 56.25%;
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
  right: 30%; bottom: 5%; left: 5%;
  display: flex;
  //align-items: flex-end;
  justify-content: flex-end;
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