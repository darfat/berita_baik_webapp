<template>
<div>
  <el-carousel indicator-position="outside" height="560px" v-loading="loading.headlines">
    <el-carousel-item v-for="item in headlines" :key="item.id">
      <div class="item-wrapper-hl">
        <img :src="item.article.main_image" class="image-hl">
        <h3>{{item.editorial.name}}</h3>
      </div>
      <div class="title">
      <span><bb-love></bb-love></span>
      <span>
           <fa-icon name="share-alt" scale="1.3"  ></fa-icon> 
        </span>
      <h2>{{item.article.title}}</h2>
      <p>{{item.article.teaser}}</p>
      <div class="separator">&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div class="author">
        {{ item.article.reporter_name}} | <timeago :since="item.article.publish_date"></timeago>
      </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import { getHeadlineArticles } from '@/api/headline_article'
import BbLove from '@/views/portal/components/BbLove'
export default {
  name: 'HeadlineSlider',
  components: {
    BbLove
  },
  props: {
    limit: { default: 9, type: Number }
  },
  data() {
    return {
      headlines: [],
      loading: {
        headlines: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getHeadlines()
    },
    getHeadlines() {
      this.loading.headlines = true
      getHeadlineArticles({ page: 1, per_page: this.limit }).then(response => {
        this.loading.headlines = false
        if (response) {
          this.headlines = response.data
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
  max-height: 400px;  
}

h3{
  position: absolute;
  top: 3%;
  left: 3%;
  text-align: center;
  color: #FFF;
  font-weight: bold;
  background-color: $main-blue;
  padding: 5px 15px;
}

.title{	
	width:100%;
  padding:10px 15px;
  color: $black-2;
}

.title h2{    
  line-height: 0.03em;
  color: $black-1;
}
.author{
  color: $black-2;
}

.separator {
    background-color: $main-red;
    width: 1.5em;
    height: 0.8em;
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>