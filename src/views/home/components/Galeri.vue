<template>  
  <div class="swiper-container" v-loading="loading.galleries" >    
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop" >
      <swiper-slide :class="'slide-'+index" v-for="(g,index) in galleries" :key="g.id" >        
        <img v-lazy="g.main_image" :alt="g.title">
        <div class="overlay-title" v-if="g" >
          <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >
            <h3 v-if="g.editorial" >{{ g.editorial.name }}</h3>
          </router-link>
        </div>
        <div class="overlay-desc" v-if="g">          
          <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >            
            <h2 v-html="g.title"></h2>
          </router-link>
          <p class="teaser-v">{{ g.teaser }} Teaser Lorem Ipsum Dolor sit Amet : Makarim</p>        
          <p class="red-line"></p>
          <p class="author-v" >{{ g.reporter_name }} |
            <timeago :auto-update="60" :since="g.publish_date | formatUTC"></timeago>
          </p>     
        </div>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>    
    <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
      <swiper-slide :class="'slide-'+idx" v-for="(gt,idx) in galleries" :key="gt.id">
        <img v-lazy="gt.main_image" :alt="gt.title">
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
        galleries: false,
        count: false
      },
      swiperOptionTop: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 5,
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    }
  },
  created() {},
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
            this.galleries = response.data.data
          }
          this.loading.galleries = false
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
  height: 420px;
  width: 100%;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.gallery-top {
  // height: 80%!important;
  // width: 100%;
  img{
    // width: 100%;
    // max-height: 300px;
    // object-fit: none;
    // object-position: 50% 50%;
  }
  .overlay-title {
    position: absolute;
    top: 4%;
    left: 3%;
    h3{
      background-color: $main-blue;
      color: white;
      padding: 6px 10px;
      margin: 0;
      text-transform: uppercase;        
    }      
  }
  .overlay-desc {
    background-color: rgba(0,0,0,0.6);
    width: 100%;
    position: absolute;
    bottom: 80px;
    // top: 50%;
    color: white;        
    padding: 0.8% 3% 0 3%;
    margin: 0;
    h2, h3, p { margin: 0; }   
    h2{
        font-family: 'Neosans-Black';
        font-size: 22px;        
    }       
    .teaser-v{        
        font-size: 14px;
        margin-bottom: 5px;
    }
    .author-v{            
        line-height: 18px;
        font-weight: 900;
        font-size: 12px;          
    }
  }
}

.gallery-thumbs {
  // height: 20%!important;
  // box-sizing: border-box;
  // padding: 5px 0;
  position: absolute;
  bottom: 0;
  height: 80px;
  background-color: rgba(0,0,0,0.6);
  padding: 5px 0;
  
}
.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>

