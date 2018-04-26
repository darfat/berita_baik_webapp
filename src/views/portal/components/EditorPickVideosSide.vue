<template>
  <div class="editor-pick-video">
    <div class="section-title" v-if="showTitle"> {{title}} </div>
    <div class="m-t-10">
      <el-row :gutter="20" v-for="(video) in videos_list" :key="video.id" class="side-row">
        <el-col :span="24" class="side-video">
          <div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EditorPickVideosSide',
  props: {
    limit: { default: 1, type: Number },
    page: { default: 1, type: Number },
    showTitle: { default: true, type: Boolean },
    title: { default: 'Video Pilihan', type: String }
  },
  data() {
    return {
      videos_list: [
        {
          id: 1,
          main_image: 'static/images/ads1.jpg'
        }
      ],
      loading: {
        videos_list: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/editor-pick-videos-side.scss";

</style>