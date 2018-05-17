<template>
<div class="ads-container">    
  <div class="ads-title" v-if="showTitle">IKLAN</div>
  <div class="ads-content" v-if="advertisement.id == id" v-for="(advertisement) in advertisement_list" :key="advertisement.id">
    <img :src="advertisement.main_image" />
  </div>
</div>
</template>
<script>

export default {
  name: 'AdsBanner',
  props: {
    id: { default: 1, type: Number },
    name: { default: 'home-1', type: String },
    limit: { default: 1, type: Number },
    page: { default: 1, type: Number },
    showTitle: { default: true, type: Boolean }
  },
  data() {
    return {
      advertisement_list: [
        {
          id: 1,
          name: 'home-1',
          main_image: 'static/images/music-02.png'
        },
        {
          id: 2,
          name: 'home-2',
          main_image: 'static/images/music-03.png'
        },
        {
          id: 3,
          name: 'home-3',
          main_image: 'static/images/ads1.jpg'
        }
      ],
      loading: {
        advertisement_list: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {}
  },
  computed: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/adsbanner.scss";

</style>