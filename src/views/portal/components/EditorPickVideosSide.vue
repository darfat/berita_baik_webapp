<template>
  <div class="editor-pick-video">
    <div class="section-title" v-if="showTitle"> {{title}} </div>
    <div class="m-t-5">
      <el-row :gutter="20" v-for="(video) in videos" :key="video.id" class="side-row">
        <el-col :span="24" class="side-video">
          <div class="vid-thumb">
            <el-card :body-style="{ padding: '0px' }" >
              <div class="videoWrapper" v-if="video">
                <!-- <youtube :video-id="$youtube.getIdFromURL(video.sources_path)" :player-vars="{ showinfo: 0 }" @ready="ready" @playing="playing" ></youtube> -->
                <iframe 
                    width="540"
                    height="290"
                    :src="'https://www.youtube.com/embed/'+$youtube.getIdFromURL(video.sources_path)+'?rel=0&amp;fs=0&amp;showinfo=0'"
                    frameborder="0"
                    allowfullscreen></iframe>
              </div>
              <div>                
                <el-row >
                  <div>
                    <router-link v-if="video.editorial" :to="{ name: 'editorial-video-detail', params: { 'editorialSlug':video.editorial.slug, 'slug': video.slug} }">
                      <span class="headline">{{ video.title}}</span>
                    </router-link>
                  </div>
                </el-row>                
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getEditorsPickVideos } from '@/api/article'
export default {
  name: 'EditorPickVideosSide',
  props: {
    limit: { default: 2, type: Number },
    showTitle: { default: true, type: Boolean },
    title: { default: 'Video Pilihan', type: String },
    editorialSlug: { default: 'video', type: String }
  },
  data() {
    return {
      videos: [],
      loading: {
        videos: false
      },
      per_page: 2,
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
      this.getVideos(this.editorialSlug, this.page)
    },
    getVideos(editorialSlug, page) {
      this.loading.list = true
      getEditorsPickVideos({
        page,
        per_page: this.per_page
      }).then(response => {
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
      // this.latestVideo.sources = 'another video id'
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
@import "src/styles/editor-pick-videos-side.scss";

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