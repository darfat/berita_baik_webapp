<template>
<div class="gallery-wrapper" v-loading="loading.galleries">
  <el-carousel :interval="9999" indicator-position="none" height="420px" arrow="never" :autoplay="false" ref="crsl">  
    <el-carousel-item v-for="(g,index) in galleries" :key="g.id" :name="'slide-'+index" class="crsl-mainimg">
      <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >   
        <img :src="g.main_image" class="crsl-img">
      </router-link>
      <div class="crsl-icon">
        <svg-icon icon-class="camera" class="camera"></svg-icon>
        <span v-if="g.images_count" >{{g.images_count}}</span>
      </div>
      <div class="crsl-info">
        <h2>{{g.editorial.name}}</h2>
        <router-link v-if="g && g.editorial" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':g.editorial.slug, 'slug': g.slug } }" >                                       
        <h1><a>{{ subString(g.title,45) }}</a></h1>
        </router-link>
        <!-- <p class="teaser">{{ subString(g.teaser,110) }}</p> -->
        <p class="red-line"></p>
        <p class="author">{{g.reporter_name}} | <timeago :since="g.publish_date"></timeago></p>
      </div>
    </el-carousel-item>  
    <div class="crsl-thumb hidden-xs-only" ref="crsl-thumb">
      <button v-for="(gt,idx) in galleries" :key="gt.id" v-on:click="setActiveItem('slide-'+idx)"><img :src="gt.main_image"></button>
    </div>
    
  </el-carousel>
  
</div>

</template>
<script>
import { getImagesByEditorialSlug } from '@/api/article'
export default {
  props: {
    editorialSlug: { type: String, default: 'gallery-foto' },
    limit: { default: 4, type: Number }
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
        getImagesByEditorialSlug({ editorialSlug, page: 1, per_page: this.limit }).then(response => {
          if (response) {
            this.galleries = response.data.data
          }
          this.loading.galleries = false
        })
      }
    },
    setActiveItem(index) {
      this.$refs.crsl.setActiveItem(index)
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
    background-color: #323232;
    opacity: 0.9;
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
  &-info{            
    position: absolute;
    right: 30%; left: 5%; top: 20%;
    display: flex;        
    color: white;  
    flex-direction: column;
    padding: 10px;
    h1, h2, p { margin: 0; }
    h1{
      font-family: 'Neosans-Black';            
      margin-top: 13px;
      font-size: 35px;      
    }
    h2{
      background-color: $main-blue;
      display: table;
      padding: 5px;
      width: 36%;
      text-transform: uppercase;            
      font-family: 'Neosans-Black';
      font-size: 19px;        
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