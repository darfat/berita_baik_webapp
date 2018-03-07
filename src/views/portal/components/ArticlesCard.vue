<template>
<div class="card-content">
  <el-row>
        <div class="section-title"> {{title}}</div>
    </el-row>
          <div>
            <el-row>
              <el-col :span="11" v-for="(article) in articles" :key="article.id" class="news-col">
                <el-card :body-style="{ padding: '0px' }" class="news-card">
                  <div>
                      <div class="mini-thumbnail">
                        <img :src="article.main_image" class="card-image" />
                        <div class="editorial-type-img">
                            <p style="font-size:10px;">{{ article.editorial.name }}</p>
                        </div>
                      </div>
                  </div>
                  <div style="padding: 14px;">
                    <div class="bottom clearfix">
                      <el-row >
                        <el-col :span="4">
                          <span> <v-icon name="heart" base-class="icon-20"></v-icon> </span>
                          <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="ac-title">
                      <div>
                        <router-link  :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }" >
                          <span>{{ article.title}}</span>
                        </router-link>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="footer">
                        <div>
                          <!-- {{ article.reporter.name }} | {{ article.publish_date_counter }} -->
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
</div>
</template>


<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { getNewsByEditorialSlug, getLatestNewsAll } from '@/api/article'

export default {
  name: 'ArticlesCard',
  components: {
    ArticleSeparator
  },
  props: {
    editorialSlug: { type: String },
    title: { type: String, default: 'BACA LAINNYA' },
    limit: { default: 9, type: Number }
  },
  data() {
    return {
      articles: [],
      loading: {
        articles: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getArticles(this.editorialSlug)
    },
    getArticles(editorialSlug) {
      this.loading.articles = true
      if (editorialSlug) {
        getNewsByEditorialSlug({ editorialSlug, page: 1, per_page: this.limit + 1 }).then(response => {
          if (response) {
            this.articles = response.slice(1)
            this.loading.articles = false
          }
        })
      } else {
        getLatestNewsAll({ page: 1, per_page: this.limit }).then(response => {
          if (response) {
            this.articles = response
            this.loading.articles = false
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/articles-card.scss";


</style>