<template>
  <div class="search-wrapper">
    <div >
      <div class="container">
        <h2> {{title}} </h2>
        <div class="search-result">
          <el-row :gutter="20" >
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="(article) in articles" :key="article.id">              
              <el-card :body-style="{ padding: '0px' }" v-if="article">
              <div class="mini-thumbnail">
                  <router-link v-if="article.article_type === 'news'" :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }">                  
                    <img :src="article.main_image" class="image">
                  </router-link>
                  <router-link   v-if="article.article_type === 'image'" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug } }" >                      
                    <img :src="article.main_image" class="image">
                  </router-link>
                  <router-link v-if="article.article_type === 'video'" :to="{ name: 'editorial-video-detail', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug} }">
                    <div class="videoWrapper">
                    <iframe 
                        width="640"
                        height="390"
                        :src="'https://www.youtube.com/embed/'+$youtube.getIdFromURL(article.sources_path)+'?rel=0&amp;fs=0&amp;showinfo=0'"
                        frameborder="0"
                        allowfullscreen></iframe>
                    </div>
                  </router-link>
                  <router-link v-if="article.article_type === 'y-news'" :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }">                  
                    <img :src="article.main_image" class="image">
                  </router-link>
                  <router-link   v-if="article.article_type === 'y-image'" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug } }" >                      
                    <img :src="article.main_image" class="image">
                  </router-link>
                
                <div class="editorial-type-img" v-if="article.editorial">
                  <h3>{{ article.editorial.name }}</h3>
                </div>
              </div>
              <div class="info">
                  <bb-love :articleID="article.id" :type="'article'" ></bb-love>
                  <share-pop :article="article"></share-pop>
                <div class="bottom clearfix">
                  <router-link v-if="article.article_type === 'news'" :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }">                  
                    <h2 class="headline" v-html="subString(article.title,70)"  ></h2>
                  </router-link>
                  <router-link   v-if="article.article_type === 'image'" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug } }" >                      
                    <h2 class="headline" v-html="subString(article.title,70)"  ></h2>
                  </router-link>
                  <router-link v-if="article.article_type === 'video'" :to="{ name: 'editorial-video-detail', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug} }">
                    <h2 class="headline" v-html="subString(article.title,70)"  ></h2>
                  </router-link>
                  <router-link v-if="article.article_type === 'y-news'" :to="{ name: 'article-detail-route', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug,  'articleID': article.id} }">                  
                    <h2 class="headline" v-html="subString(article.title,70)"  ></h2>
                  </router-link>
                  <router-link   v-if="article.article_type === 'y-image'" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':article.editorial.slug, 'slug': article.slug } }" >                      
                    <h2 class="headline" v-html="subString(article.title,70)"  ></h2>
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
  </div>
</template>

<script>
import BbLove from '@/views/portal/components/BbLove'
import SharePop from '@/views/portal/components/SharePop'
import ArticleSeparator from '@/components/ArticleSeparator'
import { getPopularArticles } from '@/api/popular_article'
import { getEditorialIdBySlug } from '@/api/editorial'

// import moment from 'moment'
export default {
  name: 'ContentCards',
  components: {
    BbLove,
    ArticleSeparator,
    SharePop
  },
  props: {
    editorialSlug: { type: String, default: null },
    title: { type: String, default: 'BERITA BAIK TERPOPULER' },
    editorialType: { type: String }
  },
  data() {
    return {
      articles: [],
      per_page: 9,
      page: 1,
      total_pages: 1,
      total_entries_size: 0,
      distance: -Infinity,
      loading: {
        list: false
      }
    }
  },
  created() {},
  methods: {
    infiniteHandler($state) {
      const page = Math.floor(this.articles.length / this.per_page) + 1
      if (this.editorialType && this.editorialType !== null && this.editorialType.length) {
        getEditorialIdBySlug({
          slug: this.editorialSlug
        }).then(editorialResponse => {
          if (editorialResponse) {
            getPopularArticles({
              editorialType: this.editorialType,
              editorialSlugID: editorialResponse.data.id,
              editorialSlug: this.editorialSlug,
              page: page,
              per_page: this.limit
            }).then(response => {
              if (response) {
                this.per_page = response.data.per_page
                this.total_pages = response.data.total_pages
                this.total_entries_size = response.data.total_entries_size
                this.page = response.data.page
                if (response.data.data && response.data.data.length) {
                  this.articles = this.articles.concat(response.data.data)
                  $state.loaded()
                  if (Math.ceil(this.articles.length / this.per_page) === this.total_pages) {
                    $state.complete()
                  }
                } else {
                  $state.complete()
                }
              }
            })
          }
        })
      } else {
        let eSlug = this.editorialSlug
        if (this.editorialSlug === 'none') {
          eSlug = null
        }
        getPopularArticles({
          editorialSlug: eSlug,
          page: page,
          per_page: this.limit
        }).then(response => {
          if (response) {
            this.per_page = response.data.per_page
            this.total_pages = response.data.total_pages
            this.total_entries_size = response.data.total_entries_size
            this.page = response.data.page
            if (response.data.data && response.data.data.length) {
              this.articles = this.articles.concat(response.data.data)
              $state.loaded()
              if (Math.ceil(this.articles.length / this.per_page) === this.total_pages) {
                $state.complete()
              }
            } else {
              $state.complete()
            }
          }
        })
      }
    },
    subString(str, len) {
      if (str.length < len) {
        return str
      } else {
        return str.substring(0, (len - 3)) + '...'
      }
    },
    ready(player) {
      this.player = player
    },
    playing(player) {},
    change() {
      this.latestVideo.sources = 'another video id'
    },
    stop() {
      this.player.stopVideo()
    },
    pause() {
      this.player.pauseVideo()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/search-home.scss";
.search-wrapper {
  margin-top: 0px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;  
  width: 100%;
  height: auto;
  background-color: #FFF;
}

.container{
  padding: 40px 0;
}

hr{
  margin: 20px 0;
}
.videoWrapper {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 0;
        height: 0;
        overflow: hidden;    
    }
    .videoWrapper iframe,
    .videoWrapper object,
    .videoWrapper embed{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>