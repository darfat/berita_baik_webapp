<template>
<div class="gf-slider">
  <el-carousel :interval=9000 v-loading="loading.images">
    <el-carousel-item v-for="item in images" :key="item.id">
      <div class="item-wrapper-hl">
          <img :src="item.url" class="image-hl">
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import { getArticleImages } from '@/api/article'

export default {
  name: 'ImagesSlider',
  components: {},
  props: {
    articleID: { default: null, type: String },
    article: {}
  },
  data() {
    return {
      images: [],
      loading: {
        images: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getImages(this.article.id)
    },
    getImages(articleID) {
      this.loading.images = true
      getArticleImages({ article_id: articleID }).then(response => {
        this.loading.images = false
        if (response) {
          this.images = response.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.el-carousel{
  z-index: 1;
}
.el-carousel__item{
  background-color: #FFF;
  height: auto;
}
.image-hl{
  width: 100%;
  max-height: 560px;
  object-fit: cover;  
}

h3{
  position: absolute;
  top: 3%;
  left: 3%;
  text-align: center;
  color: #FFF;
  background-color: $main-blue;
  padding: 8px 10px 5px 10px;
  text-transform: uppercase;
}

.title{	
	width: 100%;
  padding: 0 15px 15px 15px;
  color: $black-2;
}

.title h2{    
  line-height: 0.03em;
  color: $black-1;
  font-family: 'Neosans-Black';  
  line-height: 1.2em;
}

.separator {
    background-color: $main-red;
    width: 1.5em;
    height: 0.8em;
    margin-top: 5px;
    margin-bottom: 5px;
}

.loveshare{
  padding: 10px 15px 0 15px;
}
</style>