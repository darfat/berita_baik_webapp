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
              <img :src="article.main_image" class="image">
              <div class="editorial-type-img" v-if="article.editorial">
                  <h3>{{ article.editorial.name }}</h3>
                </div>
              <div class="desc">
                  <span><bb-love></bb-love> </span>
                  <span><fa-icon name="share-alt" scale="1.3"  ></fa-icon>  </span>
                <div class="bottom clearfix">
                  <router-link v-if="article.editorial" :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }">
                    <h2 class="headline">{{ article.title}}</h2>
                  </router-link>
                </div>
               
                <div class="bottom clearfix">
                  <article-separator></article-separator>
                  {{ article.reporter_name }} |
                    <timeago :auto-update="60" :since="article.publish_date"></timeago>
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
import ArticleSeparator from '@/components/ArticleSeparator'
import { SearchArticles } from '@/api/article'

export default {
  name: 'SearchHome',
  components: {
    BbLove,
    ArticleSeparator
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
@import "src/styles/variables.scss";
.search{
  padding: 40px 0;
  background-color: #e6e6e6;
  &-box{
    &-label{
      color: $main-blue;
      font-size: 1.5em;
      line-height: 1.6em;
      font-weight: 700;
      text-align: center;        
    }
    &-advanced{
      color: $main-blue;
      text-align: right;
    }
  }
  &-advanced{
    margin: 40px 0;
    padding: 20px;
    border: 2px solid $main-blue;
    background-color: #fff;
    min-height: 300px;
    &-info{
      background-color: #BFE2F5;
      padding: 20px 10px;
      width: 100%
    }
    &-input{
      padding: 40px 0;
      span{
        display: inline-block;
        color: $main-blue;
        font-weight: 700;
        padding-right: 10px;
      }      
      .el-input{
        width: 70%;
      }
      .el-button{
        background-color: $main-blue;
        color: #fff;
      }
    }
  }
  &-result{
    width: 100%;    
    margin: 40px 0;
  }

  &-pagination{
    text-align: center;
  }
}

.el-card{
  margin-bottom: 20px;
  background-color: #fff;  
  border: 1px solid #1a1a1a;
  border-radius: none;
  box-shadow: none;
  
  .image{
    display: block;
    width: 100%;
    padding: 10px;    
    min-height: 250px;    
  }

  .desc{
    padding: 14px;    
    border-top: 1px solid #1a1a1a;
  }

  h2{
    margin: 0;    
  }

  hr{
    height: 10px;
    background-color: $main-red;
    border: none;
    width: 10%;    
  }

}
</style>