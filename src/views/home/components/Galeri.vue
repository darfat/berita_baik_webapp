<template>  
  <div style="height: 500px; background-color: #323232"   v-loading="loading.galleries" >    
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop" >
      <swiper-slide :class="'slide-'+index" v-bind:style="{ backgroundImage: 'url(' + g.main_image + ')' }"  v-for="(g,index) in galleries" :key="g.id" >
        <div class="overlay-desc" v-if="g"  >        
          <div class="align-center"> <h3 v-if="g.editorial" >{{ g.editorial.name }}</h3> </div>
          <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >                                       
              <h2>{{ g.title }}</h2>
          </router-link>
          <p class="teaser-v">{{ g.teaser }}</p>        
          <p class="red-line"></p>
          <p class="author-v" >{{ g.reporter_name }} |
            <timeago :auto-update="60" :since="g.publish_date"></timeago>
          </p>     
      </div>
        <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >                                       
          <div class="content-image-bg">
            <div class="icon">
              <svg-icon icon-class="camera" class="camera"></svg-icon>
              <span v-if="g.images_count" >{{g.images_count}}</span>
            </div>
            <!-- <div class="title">
              <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >                                       
                <h2><a>{{g.title}}</a></h2>
              </router-link>
              <p>{{g.subtitle}}</p>
            </div> -->
          </div>
        </router-link>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>    
    <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
      <swiper-slide :class="'slide-'+idx" v-bind:style="{ backgroundImage: 'url(' + gt.main_image + ')' }"  v-for="(gt,idx) in galleries" :key="gt.id">
        <div class="icon">
          <svg-icon icon-class="camera" class="camera"></svg-icon>
          <span v-if="gt.images_count" >{{gt.images_count}}</span>
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
    limit: { default: 6, type: Number }
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
        slidesPerView: 'auto',
        touchRatio: 0.2,
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
    .content-image-bg{
      height:100%
    }
    .overlay-desc {
        // background-color: rgba(0,0,0,0.3);
        position: absolute;
        right: 10%; left: 5%; top: 35%;
        display: flex;
        //align-items: flex-end;
        // justify-content: flex-end;
        color: white;  
        flex-direction: column;
        padding: 10px;
        h2, h3, p { margin: 0; }
        h2{
            font-family: 'Neosans-Black';            
            margin-top: 13px;
            font-size: 25px;
            // font-size: 2.573529411764706vw;
        }
        h3{
            background-color: $main-blue;
            display: table;
            padding: 10px;
            // width: 30%;
            text-transform: uppercase;            
            font-family: 'Neosans-Black';
            font-size: 19px;
            // font-size: 1.397058823529412vw;
        }
        .teaser-v{            
            margin-top: 13px;
            margin-bottom: 13px;
            font-size: 16px;
            // font-size: 1.1764705882352942vw;
        }
        .author-v{            
            line-height: 18px;
            font-weight: 900;
            font-size: 12px;
            //font-size: 0.8823529411764706vw;
        }
    }
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

