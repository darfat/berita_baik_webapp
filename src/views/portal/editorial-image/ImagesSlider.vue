<template>
<div class="gf-slider">
  <el-carousel :interval=9000 v-loading="loading.images" indicator-position="none">
    <el-carousel-item v-for="item in images" :key="item.id">
      <div class="item-wrapper-hl">
          <img v-lazy="item.url" class="img-hl">
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
}
.img-hl{
  width: 100%;  
  height: 100%;
}
</style>