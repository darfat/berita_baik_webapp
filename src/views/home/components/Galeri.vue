<template>  
  <div class="swiper-container" v-loading="loading.galleries" >    
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop" >
      <swiper-slide :class="'slide-'+index" v-for="(g,index) in galleries" :key="g.id" >        
        <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >
          <img v-lazy="g.main_image" :alt="g.title">
        </router-link>
        <div class="overlay-title" v-if="g" >
          <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >
            <h3 v-if="g.editorial" >{{ g.editorial.name }}</h3>
          </router-link>
        </div>
        <div class="overlay-desc" v-if="g">          
          <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >            
            <h2 v-html="g.title"></h2>
          </router-link>
          <p class="teaser-v" v-if="g.teaser">{{ g.teaser }}</p>        
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
    limit: { default: 10, type: Number }
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
        freeMode: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        freeMode: true,
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
  height: 500px;
  width: 100%;
}
.swiper-slide {
  // background-size: cover;
  // background-position: center;
}
.gallery-top {
  // height: 80%!important;
  // width: 100%;
  img{
    width: 100%;
    height: 100%;
    max-height: 500px;
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
    background-color: rgba(0,0,0,0.4);
    width: 100%;
    position: absolute;
    bottom: 100px;
    // top: 50%;
    color: white;        
    padding: 0.8% 3% 0 3%;
    margin: 0;
    h2, h3, p { margin: 0; }   
    h2{
        font-family: 'Neosans-Black';
        font-size: 22px;
        color: #fff;
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
  height: 100px;
  background-color: rgba(0,0,0,0.4);
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
/*
 mobile view
*/
@media all and (max-width : 768px) {
  .swiper-container {
    height: 300px;
  }
  .gallery-thumbs {
    height: 60px;
  }
  .gallery-top {
    .overlay-desc {
      bottom: 60px;
    }
  }  
}

@media all and (max-width : 480px) {
  .swiper-container {
    height: 200px;
  }
  .gallery-thumbs {
    height: 30px;
  }
  .gallery-top {
    .overlay-title {    
      h3{
        font-size: 14px;
      }      
    }
    .overlay-desc {
      bottom: 30px;
      h2{        
        font-size: 16px;        
      }       
      .teaser-v{        
        font-size: 12px;            
      }
      .author-v{            
        line-height: 14px;            
        font-size: 10px;          
      }
    }
  }  
}
</style>

