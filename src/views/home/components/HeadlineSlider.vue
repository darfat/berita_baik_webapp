<template>
  <el-carousel indicator-position="outside" height="560px" v-loading="loading.headlines">
    <el-carousel-item v-for="item in headlines" :key="item.id">
      <div class="item-wrapper-hl">
        <img :src="item.article.main_image" class="image-hl">
        <div class="section-hl">{{item.editorial.name}}</div>        
      </div>
      <div class="bottom-caption">
      <span> <bb-love></bb-love> </span>
      <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
      <h2>{{item.article.title}}</h2>
      <p>{{item.article.teaser}}</p>
      <div class="separator">&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div>
        {{ item.article.reporter_name}} | <timeago :since="item.article.publish_date"></timeago>
      </div>
      </div>
    </el-carousel-item>
  </el-carousel>
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

<style>
.el-carousel{
  z-index: 1;
}
.el-carousel__item{
  background-color: #FFF;  
}
.image-hl{
  width: 100%;
  max-height: 400px;  
}


.section-hl{
  position: absolute;
  top: 5%;
  left: 3%;
  text-align: center;
  color: #FFF;
  font-weight: bold;
  background-color: #0a2f88;
  padding: 5px 15px;
}


.bottom-caption{	
	width:100%;
  padding:10px 15px;	  
}

.bottom-caption h2{    
  line-height: 0.03em;
}

.separator {
    background-color: #fbdd01;
    width: 1.5em;
    height: 0.8em;
    margin-top: 5px;
    margin-bottom: 5px;
}

</style>