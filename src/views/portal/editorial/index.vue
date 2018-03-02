<template>
  <div class="editoral-container">
    <el-row :gutter="20" class="headline-container">
      <el-row :gutter="20">
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="16">
            <div class="grid-content title-container">
                <span class="main-article-title"> {{ editorialTitle }} </span> 
            </div>
          </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2"><div class="grid-content"></div></el-col>
        <el-col :span="20">
          <div class="grid-content latest-news" v-loading="loading.latestNews" v-if="latestNews.id">
                <el-row :gutter="20" >
                  <el-col >
                    <div>
                        <div class="background">
                            <img :src="latestNews.main_image" />
                          <div class="editorial-type-img" v-if="latestNews.id">
                              <p>{{ latestNews.editorial.name }}</p>
                          </div>
                        </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="content"> 
                  <el-col>
                    <el-row :gutter="20">
                        <el-col :span="4" v-if="latestNews.id">
                            <span> <v-icon name="heart" base-class="icon-20"></v-icon> </span>
                            <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="ln-title">
                      <el-col >
                        <div > 
                          <router-link :to="{ path: '/article/'+editorialSlug+'/'+latestNews.slug }"> 
                            {{ latestNews.title }}
                          </router-link>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col >
                          <div v-html="latestNews.teaser" class="article-content">
                          </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="1"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col class="footer">
                          <div>
                            {{ latestNews.reporter.name }} | {{ latestNews.publish_date_counter }}
                          </div>
                        </el-col>
                    </el-row>
                  </el-col>
                </el-row>
          </div>
        </el-col>
        <el-col :span="2"><div class="grid-content"></div></el-col>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="list-container">
      <el-col :span="2"><div class="grid-content"></div></el-col>

      <el-col :span="14" class="content">
        <div class="grid-content">
            <articles-card :editorialSlug="editorialSlug" :limit=6></articles-card>
        </div>
      </el-col>
      <el-col :span="6" class="side-content">
        <div class="grid-content a-side">
          <popular-news-side> </popular-news-side>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
          </div>
          <div><router-link :to="{ path: '/infografis' }"> Infografis </router-link></div>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
          </div>
          <div>iklan</div>
        </div>
      </el-col>
      
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { PopularNewsSide, ArticlesCard } from '@/views/portal/components'
import { getEditorialLabelBySlug } from '@/api/editorial'
import { getLatestNewsByEditorial } from '@/api/article'

export default {
  name: 'editorials',
  components: {
    ArticleSeparator,
    PopularNewsSide,
    ArticlesCard
  },
  data() {
    return {
      latestNews: {},
      editorialTitle: '',
      editorialSlug: null,
      loading: {
        latestNews: false
      }
    }
  },
  created() {
    this.init()
    this.getLatestNews(this.editorialSlug)
  },
  methods: {
    init() {
      this.editorialTitle = getEditorialLabelBySlug(this.$route.params.editorialSlug)
      this.editorialSlug = this.$route.params.editorialSlug
    },
    getLatestNews(editorialSlug) {
      this.loading.latestNews = true
      getLatestNewsByEditorial({ editorialSlug }).then(response => {
        if (response) {
          this.latestNews = response
          this.loading.latestNews = false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/editorial-list.scss";

.el-row {
  margin-bottom: 3px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
    border-radius: 0px;
}
</style>