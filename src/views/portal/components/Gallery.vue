<template>
  <div class="gallery-detail">      
    <div class="gallery-content" v-loading="loading.mainGallery"> 
        <el-row :gutter="20" >
            <el-col :span="24" class="gallery-col">
                  <div class="gallery-thumbnail">
                      <img v-lazy="mainGallery.main_image" class="gallery-image" />
                      <div class="gallery-image-title">
                        <p v-if="mainGallery.editorial" >{{ mainGallery.editorial.name }}</p>
                      </div>
                  </div>
                  <div class="gallery-info">
                    <div class="bottom clearfix">
                      <el-row >
                        <el-col :span="4">
                          <span> <bb-love :articleID="mainGallery.id" :type="'article'"></bb-love> </span>
                          <span> <fa-icon name="share-alt" scale="1.3"  ></fa-icon>  </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="gallery-content-title">
                      <div>
                        <span class="headline">{{ mainGallery.title}}</span>
                      </div>
                    </el-row>
                    <el-row class="gallery-content-teaser">
                      <div class="sub-headline">
                        <div v-html="mainGallery.content"> </div>
                      </div>
                    </el-row>
                    <el-row class="gallery-content-content">
                      <div class="content" >
                        <div v-html="mainGallery.content" ></div>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="gallery-footer">
                        <div class="author" >
                          {{ mainGallery.reporter_name }} | <timeago :since="mainGallery.publish_date"></timeago>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
            </el-col>
        </el-row>            
    </div>
    <div class="gallery-card-container" v-loading="loading.galleries">    
        <el-row :gutter="20" >
            <el-col :xs="24" :sm="8" v-for="(g) in galleries" :key="g.id" class="gallery-col">
                <el-card  :body-style="{ padding: '0px' }" class="gallery-card">
                  <div class="gallery-thumbnail">
                      <!-- <img v-lazy="g.main_image" class="gallery-image" /> -->
                      <img v-if="g.thumb_image" v-lazy="g.thumb_image" class="gallery-image" />
                      <img v-else v-lazy="g.main_image" class="gallery-image" />
                      <div class="gallery-image-title">
                        <p >{{ g.editorial.name }}</p>
                      </div>
                  </div>
                  <hr/>
                  <div class="gallery-info">
                    <div class="bottom clearfix">
                      <el-row >
                        <el-col :span="4">
                          <span> <bb-love :articleID="g.id" :type="'article'"></bb-love> </span>
                          <span> <fa-icon name="share-alt" scale="1.3"  ></fa-icon>  </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="gallery-content-title">
                      <div class="headline">
                        <span>{{ g.title}}</span>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="gallery-footer">
                        <div class="author">
                          {{ g.reporter_name }} | <timeago :since="g.publish_date"></timeago>  
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
            </el-col>
        </el-row>     
    </div>
    <div class="gallery-paging" v-if="showPaging">
        <el-pagination
        background
        layout="prev, pager, next"
        prev-text="Sebelumnya" next-text="Selanjutnya"
        @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="per_page"
          :total="total_entries_size" 
        >
      </el-pagination>
    </div>
    <div class="gallery-paging" v-if="!showPaging">
      <div class="ac-paging" v-if="!showPaging">
        <infinite-loading @infinite="infiniteHandler">
          <span slot="no-more">
          
          </span>
        </infinite-loading>
      </div>
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
    limit: { default: 6, type: Number },
    showPaging: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      mainGallery: {},
      galleries: [],
      loading: {
        mainGallery: false,
        galleries: false
      },
      per_page: 6,
      page: 1,
      total_pages: 1,
      total_entries_size: 0
    }
  },
  created() {
    console.log('galerry')
    console.log(this.showPaging)
    this.init()
  },
  methods: {
    init() {
      this.per_page = this.limit
      this.editorialTitle = getEditorialLabelBySlug(this.editorialSlug)
      this.getLatestNews(this.editorialSlug)
      if (this.showPaging === true) {
        this.getArticles(this.editorialSlug, this.page)
      }
    },
    getLatestNews(editorialSlug) {
      this.loading.mainGallery = true
      getLatestImageByEditorial({ editorialSlug }).then(response => {
        if (response) {
          this.mainGallery = response.data
          this.loading.mainGallery = false
        }
      })
    },
    getArticles(editorialSlug, page) {
      this.loading.galleries = true
      if (editorialSlug) {
        getImagesByEditorialSlug({ editorialSlug, page, per_page: this.per_page }).then(response => {
          if (response) {
            this.galleries = response.data.data
            this.per_page = response.data.per_page
            this.total_pages = response.data.total_pages
            this.total_entries_size = response.data.total_entries_size
            this.page = response.data.page
          }
          this.loading.galleries = false
        })
      }
    },
    handleCurrentChange(page) {
      this.getArticles(this.editorialSlug, this.page)
    },
    infiniteHandler($state) {
      const editorialSlug = this.editorialSlug
      const page = Math.floor(this.galleries.length / this.per_page) + 1
      if (editorialSlug) {
        getImagesByEditorialSlug({ editorialSlug, page, per_page: this.per_page }).then(response => {
          if (response) {
            // this.galleries = response.data.data
            this.per_page = response.data.per_page
            this.total_pages = response.data.total_pages
            this.total_entries_size = response.data.total_entries_size
            this.page = response.data.page
            if (response.data.data && response.data.data.length) {
              this.galleries = this.galleries.concat(response.data.data)
              $state.loaded()
              if (Math.ceil(this.galleries.length / this.per_page) === this.total_pages) {
                $state.complete()
              }
            } else {
              $state.complete()
            }
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