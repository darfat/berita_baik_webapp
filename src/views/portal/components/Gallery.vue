<template>
  <div class="gallery-detail">      
    <div class="gallery-content" v-loading="loading.mainGallery"> 
        <el-row :gutter="20" >
            <el-col :span="24" class="gallery-col">
                  <div class="gallery-thumbnail">
                      <img :src="mainGallery.main_image" class="gallery-image" />
                      <div class="gallery-image-title">
                        <p >{{ mainGallery.editorial.name }}</p>
                      </div>
                  </div>
                  <div class="gallery-info">
                    <div class="bottom clearfix">
                      <el-row >
                        <el-col :span="4">
                          <span> <bb-love></bb-love> </span>
                          <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="gallery-content-title">
                      <div>
                        <span>{{ mainGallery.title}}</span>
                      </div>
                    </el-row>
                    <el-row class="gallery-content-teaser">
                      <div>
                        <span>{{ mainGallery.subtitle}}</span>
                      </div>
                    </el-row>
                    <el-row class="gallery-content-content">
                      <div>
                        <span>{{ mainGallery.content}}</span>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="gallery-footer">
                        <div>
                          <!-- {{ mainGallery.reporter.name }} | {{ mainGallery.publish_date_counter }} -->
                        </div>
                      </el-col>
                    </el-row>
                  </div>
            </el-col>
        </el-row>            
    </div>
    <div class="gallery-card-container" v-loading="loading.galleries">    
        <el-row :gutter="20" >
            <el-col :span="8" v-for="(g) in galleries" :key="g.id" class="gallery-col">
                <el-card  :body-style="{ padding: '0px' }" class="gallery-card">
                  <div class="gallery-thumbnail">
                      <img :src="g.main_image" class="gallery-image" />
                      <div class="gallery-image-title">
                        <p >{{ g.editorial.name }}</p>
                      </div>
                  </div>
                  <hr/>
                  <div class="gallery-info">
                    <div class="bottom clearfix">
                      <el-row >
                        <el-col :span="4">
                          <span> <bb-love></bb-love> </span>
                          <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="gallery-content-title">
                      <div>
                        <span>{{ g.title}}</span>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="gallery-footer">
                        <div>
                          {{ g.reporter.name }} | {{ g.publish_date_counter }}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
            </el-col>
        </el-row>     
    </div>
    <div class="gallery-paging">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="20"
        prev-text="Pertama" next-text="Terakhir"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import BbLove from '@/views/portal/components/BbLove'
import { getLatestImageByEditorial, getImagesByEditorialSlug } from '@/api/article'
import { getEditorialLabelBySlug } from '@/api/editorial'

export default {
  name: 'Gallery',
  components: {
    ArticleSeparator,
    BbLove
  },
  props: {
    editorialSlug: { type: String },
    limit: { default: 6, type: Number }
  },
  data() {
    return {
      mainGallery: {},
      galleries: [],
      loading: {
        mainGallery: false,
        galleries: false
      }
    }
  },
  created() {
    console.log('gallery')
    console.log(this.editorialSlug)
    this.init()
  },
  methods: {
    init() {
      this.editorialTitle = getEditorialLabelBySlug(this.editorialSlug)
      this.getLatestNews(this.editorialSlug)
      this.getArticles(this.editorialSlug)
    },
    getLatestNews(editorialSlug) {
      this.loading.mainGallery = true
      getLatestImageByEditorial({ editorialSlug }).then(response => {
        if (response) {
          console.log('latest news')
          this.mainGallery = response
          this.loading.mainGallery = false
        }
      })
    },
    getArticles(editorialSlug) {
      this.loading.galleries = true
      if (editorialSlug) {
        getImagesByEditorialSlug({ editorialSlug, page: 1, per_page: this.limit + 1 }).then(response => {
          if (response) {
            console.log('latest article by slug')
            this.galleries = response.slice(1)
            this.loading.galleries = false
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import "src/styles/gallery.scss";

</style>