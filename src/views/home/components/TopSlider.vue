<template>
<div class="slidertop-wrapper" >  
  <div class="swiper-nav hidden-xs-only">
    <div class="swiper-button-prev" slot="button-prev"><svg-icon icon-class="arrow_left"></svg-icon></div>  
    <div class="swiper-button-next" slot="button-next"><svg-icon icon-class="arrow_right"></svg-icon></div>
  </div>
  <swiper :options="swiperOption" class="swiper-box" v-loading="loading.topslides">
    <swiper-slide v-for="item in topslides" :key="item.id" class="swiper-item">
      <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':item.editorial.slug, 'slug': item.article.slug,  'articleID': item.article.id} }">
        <!-- <img v-lazy="item.article.main_image"> -->
        <img v-if="item.article.thumb_image" v-lazy="item.article.thumb_image" />
        <img v-else v-lazy="item.article.main_image" />
        <h3>{{item.editorial.name}}</h3>
      </router-link>
    </swiper-slide>
    
  </swiper>
</div>

</template>

<script>
import { getTopslideArticles } from '@/api/topslide_article'

// import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'TopSlider',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    limit: { default: 9, type: Number }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // Responsive breakpoints
        breakpoints: {
          // when window width is <= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // when window width is <= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          // when window width is <= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 10
          }
        }
      },
      topslides: [],
      loading: {
        topslides: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getTopSlides(this.editorialSlug)
    },
    getTopSlides() {
      this.loading.topslides = true
      getTopslideArticles({ page: 1, per_page: this.limit }).then(response => {
        this.loading.topslides = false
        if (response) {
          this.topslides = response.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.slidertop-wrapper{  
  // padding: 20px 0;
  width: 100%;
  margin: 0 auto;  
  z-index: -1;
}
.swiper-box {
  width: 86%;
  height: auto; //267x150
  margin: 0 auto;
  z-index: 1;
  @media all and (max-width : 768px) {
    width: 100%;
  }
}
.swiper-item {
  height: 100%;
  text-align: center;  
  // background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
    img{
      width: 100%;
      height: auto;      
    }
}
.swiper-nav{
  position: relative;  
  
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-button-next, .swiper-button-prev{  
  background-image: none;  
  font-size: 36px;
  margin-top: 50px;
  z-index: 1;
}
.swiper-button-next{  
  right: 20px;
  left: auto; 
}

h3{
  position: absolute;
  top: 0;
  left: 10px;
  text-align: center;
  color: #FFF;  
  background-color: $main-blue;
  padding: 8px 10px 5px 10px;
  font-size: 0.7em;
  text-transform: uppercase;
}
@media all and (max-width : 768px) {
  h3{
    // top: 20px;
  }
}
</style>