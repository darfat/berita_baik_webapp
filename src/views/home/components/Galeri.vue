<template>  
  <div style="height: 500px; background-color: #323232"   v-loading="loading.galleries" >    
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop" >
      <swiper-slide :class="'slide-'+index" v-bind:style="{ backgroundImage: 'url(' + g.main_image + ')' }"  v-for="(g,index) in galleries" :key="g.id">
        <div class="icon">
          <svg-icon icon-class="camera" class="camera"></svg-icon>
          <span>{{index}}</span>
        </div>
        <div class="title">
          <h2><a>Anyone can steal your idea, but no one can steal your execution.</a></h2>
          <p>Nadiem Makarim | Start-up Founder -  CEO Gojek</p>
        </div>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>    
    <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
      <swiper-slide :class="'slide-'+idx" v-bind:style="{ backgroundImage: 'url(' + gt.main_image + ')' }"  v-for="(gt,idx) in galleries" :key="gt.id">
        <div class="icon">
          <svg-icon icon-class="camera" class="camera"></svg-icon>
          <span>{{idx}}</span>
        </div>
      </swiper-slide>  
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getImagesByEditorialSlug } from '@/api/article'

export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    editorialSlug: { type: String, default: 'gallery-foto' },
    limit: { default: 5, type: Number }
  },
  data() {
    return {
      galleries: [],
      loading: {
        galleries: false
      },
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: this.limit,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: this.limit, // looped slides should be the same
        slideToClickedSlide: true
      }
    }
  },
  created() {
  },
  mounted() {
    this.init()

    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
  methods: {
    init() {
      this.getImages(this.editorialSlug)
    },
    getImages(editorialSlug) {
      this.loading.galleries = true
      if (editorialSlug) {
        getImagesByEditorialSlug({ editorialSlug, page: 1, per_page: this.limit }).then(response => {
          if (response) {
            console.log('latest article by slug')
            this.galleries = response.data
            this.loading.galleries = false
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
  .swiper-container {
    background-color: #323232;
    height: 300px;
    width: 100%;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
    &.slide-1 {
      background-image:url('/static/images/no_image.jpg');
    }
    &.slide-2 {
      background-image:url('/static/images/no_image.jpg');
    }
    &.slide-3 {
      background-image:url('/static/images/no_image.jpg');
    }
    &.slide-4 {
      background-image:url('/static/images/no_image.jpg');
    }
    &.slide-0 {
      background-image:url('/static/images/no_image.jpg');
    }
  }
  .gallery-top {
    height: 80%!important;
    width: 100%;
    .icon{
      padding: 20px;
      color: $main-blue;      
      .svg-icon{
        font-size: 30px;
      }
      span{
        font-weight: 900;
        font-size: 24px;
      }
    }
    .title{
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: rgba($color: #000000, $alpha: 0.3);
      color: $bb-white;
      padding: 10px 20px;
      font-size: 0.8em;
      h2{
        margin: 0;
        
      }
      p{
        margin: 0;
      }
    }
  }
  .gallery-thumbs {
    height: 20%!important;
    box-sizing: border-box;
    padding: 10px 0;
    .icon{
      padding: 0 10px;
      color: $main-blue;      
      .svg-icon{
        font-size: 20px;
      }
      span{
        font-weight: 900;
        font-size: 18px;
      }
    }
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
</style>

