<template>
<div class="ads-container" v-if="ads">    
  <div class="ads-title" v-if="showTitle">IKLAN</div>
  <div class="ads-content" v-loading="loading.ads">
    <img :src="ads.image" />
  </div>
</div>
</template>
<script>
import { getAdvertisementByPosition } from '@/api/advertisement'

export default {
  name: 'AdsBanner',
  props: {
    position: { type: String },
    showTitle: { type: Boolean }
  },
  data() {
    return {
      ads: null,
      loading: {
        ads: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.position) {
        this.getAdsByPosition(this.position)
      }
    },
    getAdsByPosition(position) {
      this.loading.ads = true
      this.events = []
      getAdvertisementByPosition({
        position
      }).then(response => {
        if (response && response.data) {
          this.ads = response.data
          console.log(this.ads)
        }
        this.loading.ads = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/adsbanner.scss";

</style>