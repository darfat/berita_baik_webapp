<template>
<div class="ads-container" v-if="ads">
  <div class="ads-title" v-if="showTitle">IKLAN</div>
  <div  v-loading="loading.ads">    
    <div class="ads-content">
      <a :href="ads.url" target="_blank"> 
        <img v-lazy="ads.image" />
      </a>
    </div>
  </div>
  <div v-if="position === 'Home : Atas'" class="m-b-20"></div>   
  <div v-if="position === 'Home : Tengah'" class="m-b-20"></div>   
  <div v-if="position === 'Artikel : Atas'" class="m-b-20"></div>   
</div>
</template>
<script>
import { getAdvertisementByPosition } from '@/api/advertisement'
// import EventBus from '@/utils/event-bus'

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
          // eslint-disable-next-line
          // let evt = {
          //   position,
          //   show: false
          // }
          if (response.data.status && response.data.status !== 'notFound') {
            this.ads = response.data
            // evt.show = true
          } else {
            // evt.show = false
          }
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