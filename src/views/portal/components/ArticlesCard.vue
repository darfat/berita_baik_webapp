<template>
<div class="card-content">
  <el-row>
    <div class="section-title"> {{title}}</div>
  </el-row>
  
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" v-for="(article) in articles" :key="article.id" >
        <div class="news-col">
        <el-card :body-style="{ padding: '0px' }" class="news-card">
          <div>
              <div class="mini-thumbnail">
                <img :src="article.main_image" class="card-image" />
                <div class="editorial-type-img">
                    <h3>{{ article.editorial.name }}</h3>
                </div>
              </div>
          </div>
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-row >
                <el-col :span="4">
                  <span> <bb-love></bb-love> </span>
                  <span  @click="centerDialogVisible = true"> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                </el-col>
            </el-row>
            </div>
            <el-row class="ac-title">
              <div>
                <router-link  :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }" >
                  <h2>{{ article.title}}</h2>
                </router-link>
              </div>
            </el-row>
            <el-row >
                <el-col :span="2"><article-separator></article-separator></el-col>
            </el-row>
            <el-row >
                <el-col class="footer">
                <div>
                  {{ article.reporter_name }} | <timeago :auto-update="60" :since="article.publish_date"></timeago> 
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="Warning"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>It should be noted that the content will not be aligned in center by default</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

</div>
</template>


<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import BbLove from '@/views/portal/components/BbLove'
import { getNewsByEditorialSlug, getLatestNewsAll } from '@/api/article'
import { getEditorialIdBySlug } from '@/api/editorial'

export default {
  name: 'ArticlesCard',
  components: {
    ArticleSeparator,
    BbLove
  },
  props: {
    editorialSlug: { type: String },
    editorialType: { type: String },
    title: { type: String, default: 'BACA LAINNYA' },
    limit: { default: 9, type: Number }
  },
  data() {
    return {
      articles: [],
      loading: {
        articles: false
      },
      centerDialogVisible: false
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
        let params = {
          editorialSlug,
          page: 1,
          per_page: this.limit + 1
        }
        if (this.editorialType && this.editorialType !== null && this.editorialType.length) {
          getEditorialIdBySlug({
            slug: editorialSlug
          }).then(editorialResponse => {
            if (editorialResponse) {
              params = {
                editorialSlug,
                editorialType: this.editorialType,
                editorialSlugID: editorialResponse.data.id,
                page: 1,
                per_page: this.limit + 1
              }
              console.log('params get by parent')
              console.log(params)
              getNewsByEditorialSlug(params).then(response => {
                if (response) {
                  this.articles = response.data.slice(1)
                  this.loading.articles = false
                }
              })
            }
          })
        } else {
          getNewsByEditorialSlug(params).then(response => {
            if (response) {
              this.articles = response.data.slice(1)
              this.loading.articles = false
            }
          })
        }
      } else {
        getLatestNewsAll({
          page: 1,
          per_page: this.limit
        }).then(response => {
          if (response) {
            this.articles = response.data
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