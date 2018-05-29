<template>
<div class="gallery-wrapper" v-loading="loading.galleries">
  <el-carousel :interval="9999" indicator-position="none" height="420px" :autoplay="false" arrow="never" ref="crsl">    
    <el-carousel-item v-for="(g,index) in galleries" :key="g.id" :name="'slide-'+index" class="crsl-mainimg">
        <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >   
          <img :src="g.main_image" class="crsl-img">
        </router-link>
      <div class="crsl-icon">
        <svg-icon icon-class="camera" class="camera"></svg-icon>
        <span v-if="g.images_count" >{{g.images_count}}</span>
      </div>
      <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >   
      <div class="crsl-overlay"></div>
      <div class="crsl-name"><h2>{{g.editorial.name}}</h2></div>
      <div class="crsl-info">        
        <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >        
          <h1 v-html="subString(g.title,45)"></h1>
        </router-link>
        <!-- <p class="teaser">{{ subString(g.teaser,110) }}</p> -->
        <p class="red-line"></p>
        <p class="author">{{g.reporter_name}} | <timeago :since="g.publish_date | formatUTC"></timeago></p>
      </div>
      </router-link>
    </el-carousel-item>  
    <div class="crsl-thumb hidden-xs-only" ref="crslThumb">
      <button v-for="(gt,idx) in galleries" :key="gt.id" v-on:click="setActiveItem('slide-'+idx)" :name="'slide-'+idx"><img :src="gt.main_image"></button>
    </div>
    <!--
      <button class="el-carousel__arrow el-carousel__arrow--left" v-on:click="setActiveItem('slide-2')"><i class="el-icon-arrow-left"></i></button>
      <button class="el-carousel__arrow el-carousel__arrow--right" v-on:click="setActiveItem('slide-3')"><i class="el-icon-arrow-right"></i></button>    
    -->  
  </el-carousel>
  
</div>

</template>
<script>
import { getImagesByEditorialSlug } from '@/api/article'
import { getAdvertisementByPosition } from '@/api/advertisement'

export default {
  props: {
    editorialSlug: { type: String, default: 'gallery-foto' },
    limit: { type: Number }
  },
  data() {
    return {
      galleries: [],
      loading: {
        galleries: false,
        count: false
      }
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getImages(this.editorialSlug)
    },
    getImages(editorialSlug) {
      this.loading.galleries = true
      if (editorialSlug) {
        const position = 'Home : Galeri'
        getAdvertisementByPosition({
          position
        }).then(response => {
          let limit = 4
          if (response && response.data) {
            if (response.data.status && response.data.status !== 'notFound') {
              limit = 4
            } else {
              limit = 6
            }
          }
          getImagesByEditorialSlug({ editorialSlug, page: 1, per_page: limit }).then(response => {
            if (response) {
              this.galleries = response.data.data
            }
            this.loading.galleries = false
          })
        })
      }
    },
    setActiveItem(index) {
      this.$refs.crsl.setActiveItem(index)
      // this.$refs.crslThumb.setActiveItem(index)
    },
    subString(str, len) {
      if (str) {
        if (str.length < len) {
          return str
        } else {
          return str.substring(0, (len - 3)) + '...'
        }
      }
      return ''
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.gallery-wrapper{

}
.crsl{
  &-overlay{
    position: absolute;
    width: 100%;
    height: 500px;
    background: rgba(5,29,73, .2);        
    top: 0;
  }
  &-mainimg{
    img{
    width: 100%;
    min-height: 500px;
    object-fit: cover;
    }
  }
  &-thumb{
    z-index: 1000;
    width: 100%;
    position: absolute;
    bottom: 0;    
    text-align: center;    
    background-color: rgba(#323232, 0.3);
    // background: rgba(5,29,73, .7);
    // opacity: 0.9;
    padding: 5px 10px;
    button{
      // display: block;
      opacity: .48;      
      //background-color: #fff;
      border: none;
      outline: 0;
      padding: 0;
      margin: 0;
      cursor: pointer;
      -webkit-transition: .3s;
      transition: .3s;
      width: 146px;
      height: 86px;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
      img{
        width: 100%;
        min-height: 80px;
        object-fit: cover;
      }
    }
    button:active, button:focus{
      opacity: 1;
    }
  }
  &-name{
    position: absolute;
    left: 5%; top: 20%;
    width: 100%;
    h2{
      background-color: $main-blue;
      display: table;
      padding: 5px 10px;
      text-transform: uppercase;
      font-family: 'Neosans-Black';
      font-size: 19px;
      color: #fff;
    }
  }
  &-info{            
    position: absolute;
    right:5%; left: 5%; top: 34%;
    display: flex;        
    color: white;  
    flex-direction: column;
    padding: 10px;    
    // background: rgba(5,29,73, .7);    
    h1, h2, p { margin: 0; }
    h1{
      font-family: 'Neosans-Black';            
      margin: 0;
      font-size: 35px;
      color: #fff;
      display: table;
    }    
    .teaser{            
      margin-top: 13px;
      margin-bottom: 13px;
      font-size: 16px;      
    }
    .author{            
      line-height: 18px;
      font-weight: 900;
      font-size: 12px;
      color: #fff;       
    }    
  }
  &-icon{
    padding: 20px;
    color: $main-blue;      
    .svg-icon{
      font-size: 30px;
    }
    span{
      font-weight: 700;
      font-size: 24px;
    }
  }
}

</style>