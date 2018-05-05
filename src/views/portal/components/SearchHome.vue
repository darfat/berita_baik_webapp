<template>
  <div class="search">
      <div class="container">
        <div class="search-box">
          <el-row>
            <el-col :span="4" class="search-box-label">
              Pencarian
            </el-col>
            <el-col :span="20" class="search-box-input">
              <el-input placeholder="Pencarian" v-model="searchAny" class="" @keyup.enter.native="onEnterClick">
              <el-button slot="append" icon="el-icon-search" @click="onEnterClick"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="4">
              &nbsp;  
            </el-col>
            <el-col :span="14" class="search-box-result">
              117 Artikel | Halaman 1 dari 6                
            </el-col>
            <el-col :span="6" class="search-box-advanced">
              <a v-on:click="isShow = !isShow" >Opsi Lanjutan +</a>
            </el-col>
          </el-row>                         
        </div>
        <div class="search-advanced" v-show="isShow">
          <div class="search-advanced-info">
            <b>INFORMASI</b> Nama pengguna/penulis berisi <i>username</i> yang dipakai penulis terkait.
          </div>
          
          <el-row type="flex"  justify="space-between" class="search-advanced-input">
            <el-col :span="6">
              <span>Penulis</span>
              <el-input v-model="input"></el-input>
            </el-col>
            <el-col :span="6">
              <span>Mulai</span>
              <el-input
                placeholder="Pick a date"
                suffix-icon="el-icon-date"
                v-model="input2">
              </el-input>
            </el-col>
            <el-col :span="6">  
              <span>Hingga</span>
              <el-input
                placeholder="Pick a date"
                suffix-icon="el-icon-date"
                v-model="input2">
              </el-input>
            </el-col>            
          </el-row>
          <el-row type="flex" justify="end">            
            <el-col :span="6" style="text-align: right">
              <el-button>Batal</el-button>
              <el-button>Terapkan</el-button>
            </el-col>            
          </el-row>
        </div>
        <div class="search-result">
          <el-row :gutter="20" >
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="(article) in articles" :key="article.id">              
              <el-card :body-style="{ padding: '0px' }">
              <div class="mini-thumbnail">
                <img :src="article.main_image" class="image">
                <div class="editorial-type-img" v-if="article.editorial">
                  <h3>{{ article.editorial.name }}</h3>
                </div>
              </div>
              <div class="info">
                  <bb-love></bb-love>
                  <share-pop :article="article"></share-pop>
                <div class="bottom clearfix">
                  <router-link v-if="article.editorial" :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }">
                    <h2 class="headline">{{ article.title}}</h2>
                  </router-link>
                </div>
               
                <div class="bottom clearfix">
                  <p class="red-line"></p>
                  <p class="author">
                  {{ article.reporter_name }} |
                    <timeago :auto-update="60" :since="article.publish_date"></timeago>
                  </p>  
                </div>
              </div>
            </el-card>

            </el-col>
          </el-row>
        </div>
        <div class="ac-paging">
          <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
            <span slot="no-more">
          
            </span>
          </infinite-loading>
        </div>
      </div>    
  </div>
</template>

<script>
import BbLove from '@/views/portal/components/BbLove'
import SharePop from '@/views/portal/components/SharePop'
import ArticleSeparator from '@/components/ArticleSeparator'
import { SearchArticles } from '@/api/article'

export default {
  name: 'SearchHome',
  components: {
    BbLove,
    ArticleSeparator,
    SharePop
  },
  props: {
    keyword: { type: String }
  },
  data() {
    return {
      searchAny: '',
      input2: '',
      input: '',
      isShow: false,
      articles: [],
      per_page: 3,
      page: 1,
      total_pages: 1,
      total_entries_size: 0,
      distance: -Infinity
    }
  },
  created() {
    console.log('Search Component')
    console.log(this.keyword)
    if (this.keyword) {
      this.changeFilter()
    }
  },
  methods: {
    onEnterClick() {
      console.log('enter....')
      this.changeFilter()
    },
    doSearch(titleParam) {
      SearchArticles({ article_type: 'news', title: titleParam, page: this.page, per_page: this.per_page }).then(response => {
        if (response) {
          this.articles = response.data.data
          this.per_page = response.data.per_page
          this.total_pages = response.data.total_pages
          this.total_entries_size = response.data.total_entries_size
          this.page = response.data.page
        }
      })
    },
    doManualSearch() {
      this.distance = 100
      this.$nextTick(() => {
        this.$refs.infiniteLoading.attemptLoad()
      })
    },
    changeFilter() {
      this.articles = []
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    },
    infiniteHandler($state) {
      console.log(`${this.total_entries_size} this.total_entries_size`)
      const page = Math.floor(this.articles.length / this.per_page) + 1
      SearchArticles({
        article_type: 'news',
        title: this.searchAny,
        page,
        per_page: this.per_page
      }).then(response => {
        if (response) {
          this.per_page = response.data.per_page
          this.total_pages = response.data.total_pages
          this.total_entries_size = response.data.total_entries_size
          this.page = response.data.page
          if (response.data.data && response.data.data.length) {
            this.articles = this.articles.concat(response.data.data)
            $state.loaded()
            console.log(`${Math.ceil(this.articles.length / this.per_page)} is completed`)
            if (Math.ceil(this.articles.length / this.per_page) === this.total_pages) {
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
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/search-home.scss";
</style>